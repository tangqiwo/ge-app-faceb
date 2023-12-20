/*
 * @Description: 日志，错误等追踪
 * @Author: ammo@xyzzdev.com
 * @Date: 2020-04-06 22:22:56
 * @LastEditors: ammo@xyzzdev.com
 * @LastEditTime: 2023-03-16 15:07:11
 */
import _ from 'lodash';
import store from '@helpers/storage';

// 记录两天报错信息
export const errorHandler = ({type, key, msg}: any) => {
  let errors: any = store.get('EXCEPTION') || [];
  errors = _.chain(errors)
            .concat({key, msg, date: new Date().toString(), type})
            .value()
  store.set('EXCEPTION', errors, 3600 * 48);
}

// 记录两天网络慢问题
export const networkHandler = ({type, key, auth, msg}: any) => {
  let errors: any = store.get('NETWORK-RECORD') || [];
  errors = _.chain(errors)
            .concat({key, auth, msg, date: new Date().toString(), type})
            .value()
  store.set('NETWORK-RECORD', errors, 3600 * 48);
}

// 记录6小时网络请求（仅用于调试）
export const requestHandler = ({uri, data, auth, res}: any) => {
  let record: any = store.get('REQUEST-RECORD') || [];
  record = _.chain(record)
            .takeRight(50)
            .concat({uri, auth, data: data ? JSON.stringify(data) : 'NULL', date: new Date().toString(), res: JSON.stringify(res)})
            .value()
  store.set('REQUEST-RECORD', record, 3600 * 6);
}

// 记录最近100次的网络请求
export const recordRecentlyRequest = ({uri, data, auth, res}: any) => {
  let record: any = store.get('RECENTLY-REQUEST') || [];
  record = _.chain(record)
            .takeRight(50)
            .concat({uri, auth, data: data ? JSON.stringify(data) : 'NULL', date: new Date().toString(), res: JSON.stringify(res)})
            .value()
  store.set('RECENTLY-REQUEST', record, 3600 * 6);
}

// 记录最近100次测速
export const recordRecentlySpeedTest = ({data, res}: any) => {
  let record: any = store.get('SPEED_TEST-RECORD') || [];
  record = _.chain(record)
            .takeRight(100)
            .concat({data, date: new Date().toString(), res: JSON.stringify(res)})
            .value()
  store.set('SPEED_TEST-RECORD', record, 3600 * 6);
}

// 记录最近崩溃
export const recordRecentlyCrash = ({error, type}: any) => {
  let record: any = store.get('CRASH-RECORD') || [];
  record = _.chain(record)
            .takeRight(100)
            .concat({error, date: new Date().toString(), type})
            .value()
  store.set('CRASH-RECORD', record, 3600 * 6);
}

interface IDevConsole{
  key: string,
  content: any
}
export const devConsole = {
  log: ({key, content}: IDevConsole) => {
    if(__DEV__){
      console.log(`======${key}======`, content)
    }
  }
}