/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-08 00:05:17
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useHotUpdate.ts
 * @Description: 热更
 */
import _ from 'lodash';
import React from 'react';
import { Platform, Alert, Linking } from 'react-native';
import storage from '@core/helpers/storage';
import RNExitApp from 'react-native-exit-app';
import RNRestart from 'react-native-restart';
import usePublicState from './usePublicState';
import { checkUpdate, downloadUpdate, switchVersion, isFirstTime, markSuccess, switchVersionLater } from 'react-native-update';
import updateProfile from '../../../update.json'

export const useHotUpdateChecker = () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [state, setState] = React.useState(UPDATE_STATUS.INIT);
  const [received, setReceived] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const { appKey } = (updateProfile as any)[Platform.OS];
  // 这个版本号只用于控制某个包是否在热更前前置可用

  // 更新最后检查更新时间
  React.useEffect(() => {
    if(state === UPDATE_STATUS.PENDING){
      _.delay(() => storage.set('LAST_DATE_FOR_VERSION_CHECK', _.now()), 2000)
    }
  }, [state])

  // 开始检查更新状态
  const startUpdateCheck = async () => {
    // 开始检查
    setState(UPDATE_STATUS.PENDING);
    // 开发模式忽略
    if(__DEV__){
      setState(UPDATE_STATUS.DONE);
      return;
    }
    // 开始热更系统相关
    if(isFirstTime){
      markSuccess();
    }
    let info: any;
    try{
      info = await checkUpdate(appKey);
    }catch (err) {
      Alert.alert('更新检查失败', err.message, [
        {text: '忽略', onPress: () => setState(UPDATE_STATUS.DONE)},
        {text: '重新启动', style:'destructive', onPress: () => RNRestart.Restart()}
      ]);
      return;
    }
    let metaInfo;
    try{
      metaInfo = JSON.parse(info.metaInfo || '{}');
    }catch(e){
      metaInfo = {};
    }
    if(metaInfo.cacheClean){
      _.delay(() => { storage.clear(); }, 1000);
    }
    // 基带版本过期，当前APP不再可用！
    if(!info){
      return;
    }
    if(info.expired){
      targetExpired(info);
      return;
    }
    // 有更新，需要热更
    if(!info.upToDate){
      doHotUpdate(info);
      return;
    }
    // 已经是最新代码
    setState(UPDATE_STATUS.DONE);
  }

  // 过期当前APP不再可用！
  const targetExpired = (info: any) => {
    setState(UPDATE_STATUS.EXPIRED);
    Alert.alert('版本失效', '当前版本已不可用，请点击去下载新版APP', [
      {text: '忽略', onPress: () => setState(UPDATE_STATUS.DONE)},
      {
        text: '立即下载',
        style: 'destructive',
        onPress: () => {
          Linking.openURL(info.downloadUrl);
          setTimeout(() => RNExitApp.exitApp(), 1000);
        }
      }
    ])
  }

  // 热更APP
  const doHotUpdate = async (info: any) => {
    setState(UPDATE_STATUS.DOWNLOADING);
    const hash: any = await downloadUpdate(
      info,
      {
        onDownloadProgress:  ({ received, total }) => {
          setReceived(received);
          setTotal(total);
        }
      }
    )
    setState(UPDATE_STATUS.NEED_RESTART);
    dispatch(ACTIONS.BASE.openConfirm({
      title: '重启应用',
      content: '已更新应用版本\n是否立即重启体验新版APP？',
      actions: [
        {
          text: "稍后",
          cb: () => switchVersionLater(hash)
        },
        {
          text: '立即重启',
          type: 'destructive',
          cb: () => switchVersion(hash)
        }
      ]
    }))
  }

  return {
    startUpdateCheck,
    received,
    total,
    state,
    setState
  }

}

// 定时检查器
export const useHotUpdateLoopChecker = () => {

  const { startUpdateCheck } = useHotUpdateChecker();

  React.useEffect(() => {
    // 每30秒检查一次是否需要启动更新检查
    setInterval(() => {
      const lastCheckDate = storage.get('LAST_DATE_FOR_VERSION_CHECK');
      // 距离上次检查不到4小时
      if(!lastCheckDate || ((_.now() - lastCheckDate) < 4 * 3600 * 1000)){
        return;
      }
      startUpdateCheck();
    }, 30000)
  }, [])

}

export const UPDATE_STATUS = {
  INIT          : 0,  // 初始化
  DONE          : 1,  // 热更完成
  EXPIRED       : 2,  // 版本过期
  PENDING       : 3,  // 等待检查
  DOWNLOADING   : 4,  // 下载新版本，热更中
  CHECK_FAILED  : 5,  // 检查版本失败,
  NEED_RESTART  : 6,  // 等待重启应用
  CANCEL        : 7   // 取消更新
}


export default useHotUpdateChecker;
