#!/usr/bin/env node
const inquirer = require('inquirer');
const spawn = require('child_process').spawn;
const _ = require('lodash');
const fs = require('fs');
const path = require('path')

console.log('\n# 前端自动化构建 CLI #\n');

var saveAnswers = {};

inquirer.prompt([
  {
    type: 'list',
    name: 'todo',
    message: '请选择执行任务',
    choices: ['生成发布热更包', '变更热更包指向', '基准版本打包', '上传基准版本', '影子组件工具'],
  }
]).then(answers => {
  if(answers.todo === '影子组件工具'){
    shadowComponent();
    return;
  }
  if(answers.todo === '基准版本打包'){
    buildBaseVersion();
    return;
  }
  if(answers.todo === '生成发布热更包'){
    buildHotVersion();
  }
  if(answers.todo === '上传基准版本'){
    uploadBaseVersion();
  }
  if(answers.todo === '变更热更包指向'){
    updateHotVersion();
  }
})


const updateHotVersion = () => {
  var child = spawn(`pushy update`, {cwd: '../', shell: true, stdio: [0, 'pipe']});
  child.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
}


const buildHotVersion = () => inquirer.prompt([
  {
    type: 'list',
    name: 'client',
    message: '请选择想要生成热更包的客户端',
    choices: [
      'ios',
      'android'
    ]
  }
]).then(answers => {
  var shell = ''
  if(answers.client === 'android'){
    shell = 'pushy bundle --platform android'
  }else{
    shell = 'pushy bundle --platform ios'
  }
  var child = spawn(`pushy packages --platform ${answers.client} && ${shell}`, {cwd: '../', shell: true, stdio: [0, 'pipe']});
  child.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
})


const buildBaseVersion = () => inquirer.prompt([
  {
    type: 'list',
    name: 'client',
    message: '请选择想要打包的客户端',
    choices: [
      'ios',
      'android'
    ]
  }
]).then(answers => {
  const fontGreen = "\x1b[32m%s\x1b[0m";
  let shell = ``
  if(answers.client === 'ios'){
    shell = `npm run release-ios`;
  }
  if(answers.client === 'android'){
    console.log(fontGreen, `打包新基准版本前请修改 android/app/build.gradle -> versionName 版本号`);
    shell = `npm run release-android`
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'confirm',
      message: '确定开始打包？',
      choices: ['确定', '取消']
    }
  ]).then(ans => {
    if(ans.confirm === '取消'){
      return;
    }
    var child = spawn(shell, {cwd: '../', shell: true, stdio: [0, 'pipe']});
    // 脚本输出
    child.stdout.on('data', function (data) { process.stdout.write(data.toString());  });
    // 结束
    child.on('close', function () {
      console.log(fontGreen, "# 打包结束 #");
      if(answers.client === 'ios'){
        console.log(fontGreen, `打包完成后请按README步骤进行后续包生成`);
        return;
      }
      console.log(fontGreen, `APK生成路径: android/app/build/outputs/apk/release/app=release.apk`);
      uploadBaseVersion(answers.client)
    });
  })
})


const uploadBaseVersion = (client) => {
  const upload = (client) => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'confirm',
        message: '是否确定上传基准包？',
        choices: ['确定', '取消']
      }
    ]).then(ans => {
      if(ans.confirm === '确定'){
        var shell = '';
        if(client === 'android'){
          shell = `npm run publish-base-android`;
        }else{
          shell = `npm run publish-base-ios`;
        }
        var child = spawn(shell, {cwd: '../', shell: true, stdio: [0, 'pipe']});
        child.stdout.on('data', function (data) { process.stdout.write(data.toString());  });
      }
    })
  }
  if(client){
    upload(client);
    return;
  }
  inquirer.prompt([
    {
      type: 'list',
      name: 'client',
      message: '请选择想要上传基准版本的客户端',
      choices: [
        'ios',
        'android'
      ]
    }
  ]).then(answers => {
    upload(answers.client);
  })
}


const shadowComponent = () => inquirer.prompt([
  {
    type: 'list',
    name: 'shadow',
    message: '请选择所想要使用的功能',
    choices: [
      '生成新的影子组件',
      '获取影子组件依赖关系'
    ]
  }
]).then(answers => {
  if(answers.shadow === '生成新的影子组件'){
    createNewShadow();
  }
  if(answers.shadow === '获取影子组件依赖关系'){
    checkShadowState();
  }
})


const checkShadowState = () => inquirer.prompt([
  {
    type: 'input',
    name: 'path',
    message: '请输入目标组件完整路径，可在VS资源管理器中右键点击组件文件，选择复制路径\n例：C:\\git-data\\web-main\\src\\core\\templates\\desktop\\components\\Captcha\\index.tsx\n'
  }
]).then(answers => {
  if(answers.path.search(/MC_RN\\src\\core\\templates\\components\\/) === -1){
    console.error('× 输入的路径有误')
    return;
  }
  fs.exists(answers.path, (result) => {
    if(!result){
      console.error('× 文件不存在');
      return;
    }
    // 所有项目
    const platforms = _.chain(PLATFORM).values().map('alias').value();
    // 客户端类型
    const client = answers.path.split('templates')[1].split('\\')[1];
    // 相对路径
    const basePath = answers.path.split('components\\')[1];
    _.each(platforms, (item) => {
      if(!fs.existsSync(`..\\src\\views\\${item}\\shadow\\${basePath}`)){
        console.log(fontRed, `× ${item}平台文件不存在，请使用CLI工具重新生成影子组件`);
        return;
      }
      const content = fs.readFileSync(`..\\src\\views\\${item}\\shadow\\${basePath}`, 'utf-8');
      if(content.search(/export.*\(.*\).*\=>/) !== -1 || content.length > 500){
        console.log(fontYellow, `× 平台：【${item}】为独立引用，路径：${path.resolve(__dirname, '../src/views/' + item  + '/shadow/' + basePath)}`);
      }else{
        console.log(fontGreen, `√ 平台：【${item}】为引用CORE目录中公共组件`);
      }
    })
  })
})


const createNewShadow = () => inquirer.prompt([
  {
    type: 'input',
    name: 'path',
    message: '请输入目标组件完整路径，可在VS资源管理器中右键点击组件文件，选择复制路径\n例：C:\\git-data\\MC_RN\\src\\core\\templates\\components\\Captcha\\index.tsx\n'
  }
]).then(answers => {
  if(answers.path.search(/MC_RN\/src\/core\/templates\/components\//) === -1){
    console.error(fontRed, '× 输入的路径有误')
    return;
  }
  fs.exists(answers.path, (result) => {
    if(!result){
      console.error(fontRed, '× 文件不存在');
      return;
    }
    inquirer.prompt([
      {
        type: 'list',
        name: 'confirm',
        message: '确定为所有平台对应客户端创建影子组件？',
        choices: [
          '确认生成',
          '取消'
        ]
      }
    ]).then(ans => {
      if(ans.confirm === '确认生成'){
        // 所有项目
        const platforms = _.chain(PLATFORM).values().map('alias').value();
        // 相对路径
        const basePath = answers.path.split('components\/')[1];
        _.each(platforms, (item) => {
          // TSX
          writeFileSyncRecursive(
            `..\/src\/views\/${item}\/shadow\/${basePath}`,
            `${shadowTips}import Ref from '@template/components/${basePath.replace(/\\/g, '/').replace(/\.tsx/g, '')}'; \n\nexport default Ref;`
          )
          // SCSS
          writeFileSyncRecursive(
            `..\/src\/views\/${item}\/shadow\/${basePath.split('\/').filter((item, index) => index != basePath.split('\/').length - 1).join('/')}\/style.ts`,
            `${shadowTips}`
          )
        })
      }
    })
  })
})


// 影子组件TIPS
const shadowTips = `
/**
 * 该文件由CLI自动生成，创建于：${new Date()}
*/
`

const fontRed = "\x1b[31m%s\x1b[0m";
const fontGreen = "\x1b[32m%s\x1b[0m";
const fontYellow = "\x1b[33m%s\x1b[0m";

const writeFileSyncRecursive = (filename, content) => {
  if(fs.existsSync(filename)){
    console.log(fontRed, `× 该文件已存在：${path.resolve(__dirname, filename)}`);
    return;
  }
  const folders = filename.split(path.sep).slice(0, -1);
  if (folders.length) {
    folders.reduce((last, folder) => {
      const folderPath = last ? last + path.sep + folder : folder
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
      }
      return folderPath
    })
  }
  fs.writeFileSync(filename, content);
  console.log(fontGreen, `√ 已生成影子文件： ${path.resolve(__dirname, filename)}`);
}


// 平台
const PLATFORM = {
  ['巨像金业']: {
    alias: 'mc',
    langs: ['中文（简体）']
  },
}