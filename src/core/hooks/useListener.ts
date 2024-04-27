/*
 * @Author: Galen.GE
 * @Date: 2023-07-26 15:22:49
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useListener.ts
 * @Description: 监听所有的事件，全局监听
 */
import _ from 'lodash';
import React from 'react';
import usePublicState from './usePublicState';
import { useSelector } from 'react-redux';
import usePromotion from './usePromotion';
import { AppState } from 'react-native';
import CONFIG from '@this/configs'

export default () => {

  const { infos, isLogined, dispatch, ACTIONS, navigation } = usePublicState();
  const { getPromotionCenterList } = usePromotion();
  const [appState, setAppState] = React.useState(AppState.currentState);
  const loginState = React.useRef(isLogined);
  const appVersion = useSelector((state: any) => state.base.appConfigs?.GeAppVersionConfig)

  React.useEffect(() => {
    loginState.current = isLogined;
  }, [isLogined])

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {
    if(!infos?.Mt4Id || infos?.Mt4Id === 0) {
      return;
    }
    getPromotionCenterList();
  }, [infos?.Mt4Id])


  React.useEffect(() => {
    if(!appVersion){
      return;
    }
    const _version = _.chain(CONFIG.VERSION).split('.').join('').value();
    const remoteVersion = _.chain(appVersion?.Version).split('.').join('').value();
    if(parseInt(remoteVersion) > parseInt(_version)){
      navigation.navigate('Update');
    }
  }, [JSON.stringify(appVersion)])

  React.useEffect(() => {
    if(loginState.current && AppState.currentState === 'active') {
      dispatch(ACTIONS.USER.getUserInfo({passError: true, loading: false, cb: (res: any) => {
        if(res.Code !== 0){
          dispatch(ACTIONS.BASE.openToast({text: res.Desc, types: 'error'}));
        }
      }}));
    }
  }, [appState])

  return {

  }

}
