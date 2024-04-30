# MC_RN

# 环境安装

# 最佳实践

# 打包发布
打包CLI命令
`npm run build`

## 基准包发布
在执行打包命令后选择【基准版本打包】，再选择相应的打包平台
注意事项：
- 基准版本应同步生成【正式版本】【测试PRE版本】,两个版本的包相同，但基准版本号要有所区别，例如：`v1.0.0(正式版) 和 v1.0.0-PRE(测试版)`
- 新基准版本上传后需到后台 https://pushy-admin.reactnative.cn/ 废弃旧版
### Android
打包环境配置: https://www.react-native.cn/docs/signed-apk-android
基准版本需要先修改 `andoird/app/build.gradle -> versionName` 基准版本号

### IOS
打包环境配置：
- 打开XCODE 导入 `ios/*.xcworkspace` 项目
- 选中根目录 -> 右侧target主项目 -> `Signing & Capabilities`
- 登录开发者账号（向 susu@xyzzdev.com 或 ammo@xyzzdev.com 询问登录账号）

打包步骤
- 根据CLI 命令在基准版本打包中选择 ios（请现在项目根目录下建立 dist 目录）
- 打包完成后，会生成资源文件到 dist 目录中
- 打开XCODE当前项目，将dist目录中的 `assets, main.jsbundle` 拖到项目根目录下（勾选1,3单选框）
- 选中根目录 -> 右侧target主项目 -> General 中修改基准版本号
- 在XCODE导航栏选中 Product选项卡 -> Scheme -> Edit Scheme 将 Archive 的 `Build Configuration` 选项改为 `Release`
- 将顶部运行设备选中为 `build`
- 点击 `Product -> Archive` 进行打包
- 右键点击生成的 *.xcarchive 文件 -> 显示包内容
- 将Products->Applications 目录改名为Payload
- 压缩Payload目录到zip格式后修改后缀名为ipa
- 选中根目录 -> 右侧target主项目 -> General 复制Bundle Identifier
- 将ipa文件更名上一步复制的`【Bundle Identifier.ipa】`发送给签名组同事进行签名以及生成下载链接 sims@hqstech.com

## 热更包推送
在执行打包命令后选择【生成发布热更包】，再选择相应的打包平台
热更包命名规范 `x.y.z.z1`
- x: 基准版本变更，不在热更中变更
- y: 大型功能模块，新页面，新功能上线时变更，变更时 z,z1 重置为0
- z: 小型功能上线，不涉及新页面，变更时 z1 重置为0
- z1: BUG修复，HOTFIX等

<font color="#ff4500">特别注意：</font>
- 版本应参考当前基准版本绑定的热更版本往后添加
- 版本名称与描述参考 git commit 的写法，请填写与当前版本相关内容
- mate info 暂时留空（后续可开发为版本更新日志等功能）
- 应用到原生包时，请先绑定为当前基准版本对应的PRE版本，待测试无误后在后台https://pushy-admin.reactnative.cn/切换热更包绑定生产版


报错汇总

https://github.com/facebook/react-native/issues/43335
https://stackoverflow.com/questions/72729591/fbreactnativespec-h-error-after-upgrading-from-0-68-x-to-0-69-0