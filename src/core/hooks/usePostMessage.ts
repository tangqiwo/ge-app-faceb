/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-14 14:20:14
 * @LastEditors: ammo@xyzzdev.com
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

    }
  }, [])

  return  {
    onMessage
  }

}


const TYPES = {
}