/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-15 17:05:59
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/hooks/useDebugMode.ts
 * @Description: 测试后门
 */

import React from 'react';
import { useDispatch } from "react-redux"
import { useNavigation } from '@react-navigation/native';
import RNRestart from 'react-native-restart';
import ACTIONS from '@actions/index';
import store from '@helpers/storage';

export default () => {

  const _debugSettings = store.get('DEBUG-SETTINGS') || {};
  const dispatch = useDispatch();
  const navigation = useNavigation<any>()
  const [condition, setCondition] = React.useState(0);
  const timer = React.useRef<any>();
  const [api, setApi] = React.useState(store.get('DEBUG-API') ? store.get('DEBUG-API').split('//')[1] : '');
  const [enableRequestLog, setEnableRequestLog] = React.useState(_debugSettings.enableRequestLog);
  const [errorRequestOnly, setErrorRequestOnly] = React.useState(_debugSettings.errorRequestOnly);
  const [protocol, setProtocol] = React.useState(store.get('DEBUG-API') ? store.get('DEBUG-API').split('//')[0] + '//' : 'https://');

  React.useEffect(() => {
    if(!enableRequestLog){
      setErrorRequestOnly(false);
    }
  }, [enableRequestLog])

  React.useEffect(() => {
    if(condition == 5){
      navigation.navigate('Debug');
    }
    if(condition > 0){
      if(timer.current){
        clearInterval(timer.current)
      }
      timer.current = setTimeout(() => setCondition(0), 200);
    }
  }, [condition])

  // 保存设定
  const saveSettings = () => {
    const oldApi = store.get('DEBUG-API');
    if(api){
      if(!/^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/.test(`https://${api}`)){
        dispatch(ACTIONS.BASE.openAlert({title: '格式错误', content: '输入的API格式错误！'}))
        return;
      }
      store.set('DEBUG-API', `${protocol}${api}`, 600)
    }
    if(!api){
      store.remove('DEBUG-API');
    }
    // 日志保存
    let debugSettings = store.get('DEBUG-SETTINGS') || {};
    debugSettings.enableRequestLog = enableRequestLog;
    debugSettings.errorRequestOnly = errorRequestOnly;
    store.set('DEBUG-SETTINGS', debugSettings, 3600 * 24);
    dispatch(ACTIONS.BASE.openToast({ text: '保存DEBUG设置成功！', types: 'success' }));
    if((api || oldApi) && (`${protocol}${api}` != oldApi)){
      dispatch(ACTIONS.BASE.openAlert({
        title: '成功',
        content: '保存DEBUG设置成功, 确定后将重加载应用',
        cb: () => {
          RNRestart.Restart();
        }
      }))
    }
  }

  return {
    enableDebugMode: () => setCondition(condition + 1),
    saveSettings,
    api,
    setApi,
    enableRequestLog,
    errorRequestOnly,
    setEnableRequestLog,
    setErrorRequestOnly,
    protocol,
    setProtocol
  }

}
