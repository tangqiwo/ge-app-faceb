/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 00:56:42
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useStart.ts
 * @Description: 初始化
 */
import _ from 'lodash'
import React from 'react';
import { Alert, Dimensions, Platform} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import store from '@helpers/storage';
import DeviceInfo from 'react-native-device-info'
import usePublicState from './usePublicState';
import { isActiveAnimation } from '@helpers/unit';
import G from '@constants/global';
import { NativeModules } from 'react-native';

const { width, height } = Dimensions.get('window');

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [ cacheInit, SetCacheInit ] = React.useState(false);
  const [ channelInit, setChannelInit ] = React.useState(false);
  const insets = useSafeAreaInsets();
  const { MyChannelModule } = NativeModules;

  // 框架进入时，初始化缓存，环境变量等
  const init = async () => {
    try{
      MyChannelModule.getChannels((nativeVariable: any) => {
        let channelCode = nativeVariable;
        if(!channelCode){
          channelCode = Platform.OS === 'android' ? 'gegoldhk_android' : 'gegoldhk_ios'
        }
        G.SET('CHANNEL_CODE', channelCode)
      })
    }catch(e){
      G.SET('CHANNEL_CODE', Platform.OS === 'android' ? 'gegoldhk_android' : 'gegoldhk_ios')
    }finally{
      setChannelInit(true)
    }
    G.SET('SCREEN_WIDTH', width > height ? height : width);
    G.SET('SCREEN_HEIGHT', height > width ? height : width);
    G.SET('TOP_HEIGHT', insets.top);
    G.SET('CURRENCY', 'CNY');
    G.SET('COUNTRY', 'China');
    G.SET('ENABLE_ANIMATION', isActiveAnimation());
    G.SET('WEB_SCOKET_DATA', {});
    DeviceInfo.getUniqueId().then((uniqueId) => {
      G.SET('UUID', uniqueId)
    });
    G.SET('PHONE_MODEL', `${DeviceInfo.getBrand()}-${DeviceInfo.getModel()}`)
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
    if(cacheInit && channelInit){
      makeUniqueId();
      dispatch(ACTIONS.BASE.initUI());
      // 网站设置
      dispatch(ACTIONS.BASE.cacheReady());
      dispatch(ACTIONS.BASE.getAppConfig());
      dispatch(ACTIONS.BASE.getHomeInfos());
      dispatch(ACTIONS.BASE.getContactInfo());
      dispatch(ACTIONS.BASE.getConfigs());
      dispatch(ACTIONS.BASE.getAppVersion());
      dispatch(ACTIONS.BASE.getMemberInfo());
      dispatch(ACTIONS.BASE.getChannelKeys());
      dispatch(ACTIONS.BASE.getFaceBConfig());
      if(store.get('AUTH')){
        dispatch(ACTIONS.USER.getUserInfo({passError: true, loading: false, cb: (res: any) => {
          if(res.Code !== 0){
            dispatch(ACTIONS.BASE.openToast({text: res.Desc, types: 'error'}));
          }
        }}));
      }
    }
  }, [cacheInit, channelInit]);

  const makeUniqueId = () => {
    if(store.get('UNIQUE_ID')){
      return;
    }
    // 随机生成一个大写字母和数字的组合 32 位ID
    const uniqueId = _.chain('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789').split('').shuffle().take(32).join('').value();
    store.set('UNIQUE_ID', uniqueId, 3600 * 24 * 365);
  }

  return {
    init
  }

}