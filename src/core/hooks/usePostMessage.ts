/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-14 14:20:14
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/usePostMessage.ts
 * @Description: web 与 RN 的通讯
 */
import React from "react"
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux"
import ACTIONS from '@actions/index';

export default () => {

  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  // 接收 web 端信息
  const onMessage = React.useCallback((event:any) => {
    var data = JSON.parse(event.nativeEvent.data);
    if(!data || !data.type){
      return;
    }
    const { type, params } = data;
    switch(type){
      case TYPES.NAVIGATE: {
        dispatch(ACTIONS.BASE.closeWebFrame());
        navigation.navigate(params.name, params.params)
      }
      break;
      case TYPES.ALERT: {
        const { title, content } = params;
        dispatch(ACTIONS.BASE.openAlert({title, content}))
      }
      break;
      case TYPES.OPEN_WEBSITE: {
        Linking.openURL(params.url);
      }
      break;
    }
  }, [])

  return  {
    onMessage
  }

}


const TYPES = {
  LOGOUT: 'LOGOUT',
  NAVIGATE: 'NAVIGATE',
  ALERT: 'ALERT',
  OPEN_WEBSITE: 'OPEN_WEBSITE',
  OPEN_DEPOSIT: 'OPEN_DEPOSIT',
  OPEN_BINDCARD: 'OPEN_BINDCARD',
  OPEN_BINDUSDT: 'OPEN_BINDUSDT',
  OPEN_BINDPHONE: 'OPEN_BINDPHONE',
  OPEN_BINDEBPAY: 'OPEN_BINDEBPAY'
}