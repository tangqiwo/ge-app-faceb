/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-12 02:50:51
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/helpers/unit.ts
 * @Description: 通用的帮助方法
 */
import _ from 'lodash';
import DeviceInfo from 'react-native-device-info'
import { Platform } from 'react-native';
import G from '@constants/global';



/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-09 17:16:12
 * @description:
 * @param {string} content
 * @return {*} 生成一个用于插入到 webview中的 H5 HTML 模板
 */
export const HTMLMaker = (content: string): any => {
  let injectContents = content;
  injectContents = _.replace(injectContents, /<div> <\/div>/g, '');
  injectContents = _.replace(injectContents, /<br\/>/g, '');
  return `
    <!DOCTYPE html>
    <html lang="zh-CN" style="font-size: ${G.GET('SCREEN_WIDTH') / 375 * 14}px;">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div>
          ${injectContents}
        </div>
      </body>
    </html>
  `
}

/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-12 00:18:57
 * @description:
 * @param {number} money
 * @return {*}
 */
export const formatMoney = (money: number | string): any => {
  if(String(money).includes('.')){
    return String(money).split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + String(money).split('.')[1]
  }
  return String(money).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}


/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-10-27 15:16:31
 * @description: 禁用某些平台型号的动画
 *
 * @return {*}
 */
export const isActiveAnimation = (): any => {

  if(Platform.OS === 'ios'){
    return true;
  }

  if(Platform.OS === 'android'){
    return false;
  }

  return true

  // 屏蔽所有安卓动画
  return Platform.OS !== 'android'

  // 禁用动画设备型号黑名单
  const modelBlackList = [
    'RMX3300',
    'PEQM00',
    'KB2000',
    '22021211RC',
    '22081212C',
    'V2073A',
    'V1955A',
    '2209129SC',
    'V2203A',
    'PDKT00',
    'FNE-AN00',
    '22041211AC',
    '21091116C',
    'LE2110',
    'PFVM10',
    'PFJM10',
    'SM-G9750',
    'PDYM20',
    'M2007J22C',
    'NOH-AL10',
    'Mi 10',
    'M2011K2C',
    'PCRM00'
  ]
  // 禁用动画设备品牌黑名单
  const brandBlackList = [
    'realme',
    'oppo',
    'OnePlus',
    'vivo',
    'HONOR',
    'Redmi'
  ]
  const model = _.chain(DeviceInfo.getModel()).replace(/' '/g, '').toUpper().value()
  const brand = _.chain(DeviceInfo.getBrand()).replace(/' '/g, '').toUpper().value()
  if(_.includes(_.map(modelBlackList, (item) => _.chain(item).replace(/' '/g, '').toUpper().value()), model)){
    return false;
  }
  if(_.includes(_.map(brandBlackList, (item) => _.chain(item).replace(/' '/g, '').toUpper().value()), brand)){
    return false;
  }
  return true;
}

/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-11-02 23:17:20
 * @description: BAN 掉部分机型的横屏锁定
 * 部分机型会在锁定横屏时报错，禁用掉这部分机型
 * @return {*}
 */
export const isOrientation = (): any => {
  // 禁用翻转锁定设备型号黑名单
  const modelBlackList = [
    'MIX 2',
    'MI 5s Plus'
  ]
  // 禁用翻转锁定设备品牌黑名单
  const brandBlackList: any = [

  ]
  const model = _.chain(DeviceInfo.getModel()).replace(/' '/g, '').toUpper().value()
  const brand = _.chain(DeviceInfo.getBrand()).replace(/' '/g, '').toUpper().value()
  if(_.includes(_.map(modelBlackList, (item) => _.chain(item).replace(/' '/g, '').toUpper().value()), model)){
    return false;
  }
  if(_.includes(_.map(brandBlackList, (item) => _.chain(item).replace(/' '/g, '').toUpper().value()), brand)){
    return false;
  }
  return true;
}


// 递归遍历一个对象或数组，将对象所有字段的首字母改为小写
export const toLowerCaseObj = (obj: any): any => {
  if (typeof obj !== 'object' || !obj) return obj;
  // 如果是obj是素组
  if (Array.isArray(obj)) {
    return obj.map((item) => toLowerCaseObj(item));
  }
  const result: any = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      result[_.lowerFirst(key)] = toLowerCaseObj(obj[key]);
    } else {
      result[_.lowerFirst(key)] = obj[key];
    }
  });
  return result;
};

// 递归遍历一个对象或数组，将对象所有字段的首字母改为大写
export const toUpperCaseObj = (obj: any): any => {
  if (typeof obj !== 'object' || !obj) return obj;
  // 如果是obj是素组
  if (Array.isArray(obj)) {
    return obj.map((item) => toUpperCaseObj(item));
  }
  const result: any = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object') {
      result[_.upperFirst(key)] = toUpperCaseObj(obj[key]);
    } else {
      result[_.upperFirst(key)] = obj[key];
    }
  });
  return result;
};


/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-09 17:16:12
 * @description:
 * @return {*} 生成一个用于插入到 webview中的 H5 HTML 模板
 */
export const HTMLMaker1 = (): any => {
  return `
    <!DOCTYPE html>
    <html lang="zh-CN" style="font-size: ${G.GET('SCREEN_WIDTH') / 375 * 14}px;">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div>
          桑老师大刀阔斧；老师的看法；收到了开发；是的看法；开始的；福利开始的；浪费看电视了；开发
        </div>
      </body>
    </html>
  `
}


/**
 * @description: 保留小数 不四舍五入
 * @param {number} value  传入的值
 * @param {number} num  保留位数
 * @return {*}
 */
export const keepDecimal = (value:any, num: number): any => {
  if(parseFloat(value) == value){
    return (Math.floor(value * (10 ** num)) / (10 ** num)).toFixed(2)
  }
  return Math.floor(value * (10 ** num)) / (10 ** num)
}


// 休眠N秒
export const sleep = (time: number): any => {
  return new Promise((resolve) => setTimeout(resolve, time ))
}

// 使用 requestAnimationFrame 实现点击事件

export const handlePress = (fn: Function): any => {
  return ({...args}) => {
    requestAnimationFrame(() => {
      fn(args)
    })
  }
}

