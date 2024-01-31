/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 00:56:42
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useStart.ts
 * @Description: 初始化
 */

import _ from 'lodash'
import React from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import store from '@helpers/storage';
import DeviceInfo from 'react-native-device-info'
import usePublicState from './usePublicState';
import { isActiveAnimation } from '@helpers/unit';
import G from '@constants/global';

const { width, height } = Dimensions.get('window');

export default () => {

  const { dispatch, ACTIONS, infos } = usePublicState();
  const [ cacheInit, SetCacheInit ] = React.useState(false);
  const insets = useSafeAreaInsets();

  // 框架进入时，初始化缓存，环境变量等
  const init = async () => {
    G.SET('SCREEN_WIDTH', width > height ? height : width);
    G.SET('SCREEN_HEIGHT', height > width ? height : width);
    G.SET('TOP_HEIGHT', insets.top);
    G.SET('LANG', 'zh-CN');
    G.SET('CURRENCY', 'CNY');
    G.SET('COUNTRY', 'China');
    G.SET('ENABLE_ANIMATION', isActiveAnimation());
    DeviceInfo.getUniqueId().then((uniqueId) => {
      G.SET('UUID', uniqueId)
    });
    store.init(async () => {
      // store.clearAll();
      if(store.get('USER-PROFILE')){
        dispatch(ACTIONS.USER.setProfile({ data: store.get('USER-PROFILE') }))
      }
      if(!store.get('DEBUG-SETTINGS')){
        store.set('DEBUG-SETTINGS', {}, 3600 * 24)
      }
      SetCacheInit(true)
    })
  }

  React.useEffect(() => {
    if(cacheInit){
      // 网站设置
      dispatch(ACTIONS.BASE.cacheReady());
      dispatch(ACTIONS.BASE.getAppConfig());
      dispatch(ACTIONS.BASE.getHomeInfos());
      dispatch(ACTIONS.BASE.getContactInfo());
      dispatch(ACTIONS.BASE.getConfigs());
      dispatch(ACTIONS.BASE.getAppVersion());
      dispatch(ACTIONS.BASE.getMemberInfo());
      dispatch(ACTIONS.BASE.getChannelKeys());
      dispatch(ACTIONS.BASE.initUI());
      if(store.get('AUTH')){
        dispatch(ACTIONS.USER.getUserInfo({passError: true, cb: (res: any) => {
          if(res.Code !== 0){
            dispatch(ACTIONS.BASE.openToast({text: res.Desc, types: 'error'}));
          }
        }}));
      }
    }
  }, [cacheInit]);

  return {
    init
  }

}