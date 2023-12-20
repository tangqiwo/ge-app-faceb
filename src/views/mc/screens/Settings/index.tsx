/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-27 12:20:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Settings/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, Image } from 'react-native';
import Header from '@this/components/Header';
import Icon from '@icon/index';
import usePublicState from '@core/hooks/usePublicState';
import useHotUpdate, { UPDATE_STATUS } from '@core/hooks/useHotUpdate';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import usePopups from '@core/hooks/componentController/usePopups';
import useLogout from '@core/hooks/useLogout';
import storage from '@helpers/storage';
import { LS as styles, GS } from './style';

export default () => {

  const { startUpdateCheck, total, received, state, setState } = useHotUpdate();
  const { openPopups } = usePopups();
  const { logout } = useLogout();
  const { dispatch, ACTIONS, infos } = usePublicState();
  const updateTimerRef = React.useRef<any>();
  const [updateTimer, setUpdateTimer] = React.useState<number>(0)

  const handleLogout = () => {
    dispatch(ACTIONS.BASE.openConfirm({
      title: '确认',
      content: '确认要退出登录吗？',
      actions: [
        {
          text: '确认退出',
          type: 'destructive',
          cb: () => logout()
        }
      ]
    }))
  }

  const clearCache = () => {
    dispatch(ACTIONS.BASE.openConfirm({
      title: '确认',
      content: '确认要清空所有APP缓存吗？',
      actions: [
        {
          text: '确认删除',
          type: 'destructive',
          cb: async () => {
            dispatch(ACTIONS.BASE.openLoading({text: '清理缓存中...'}));
            await storage.clear();
            setTimeout(() => {
              dispatch(ACTIONS.BASE.closeLoading());
              dispatch(ACTIONS.BASE.openToast({text: '清理缓存完成', types: 'success'}))
            }, 2000);
          }
        }
      ]
    }))
  }

  React.useEffect(() => {
    if(updateTimer > 0 && updateTimer === 30){
      dispatch(ACTIONS.BASE.openConfirm({
        content: '当前版本更新较慢\n是否放弃本次更新检查？',
        actions: [
          {
            text: '放弃',
            cb: () => setState(UPDATE_STATUS.CANCEL)
          },
          {
            text: '继续等待',
            type: 'destructive',
            cb: () => setUpdateTimer(0)
          }
        ]
      }))
    }
  }, [updateTimer])

  React.useEffect(() => {
    if(state === UPDATE_STATUS.INIT){
      setUpdateTimer(0);
      if(updateTimerRef.current){
        clearInterval(updateTimerRef.current)
      }
      return;
    }
    switch(state){
      case UPDATE_STATUS.PENDING: {
        dispatch(ACTIONS.BASE.openLoading({text: '版本更新检查中...'}))
        updateTimerRef.current = setInterval(() => {
          setUpdateTimer((state: number) => state + 1);
        }, 1000)
      }; break;
      case UPDATE_STATUS.DOWNLOADING: dispatch(ACTIONS.BASE.openLoading({text: `${received}/${total}`})); break;
      case UPDATE_STATUS.DONE: {
        dispatch(ACTIONS.BASE.closeLoading());
        dispatch(ACTIONS.BASE.openAlert({content: '当前已是最新版本'}));
        setState(UPDATE_STATUS.INIT);
      }; break;
      default: {
        dispatch(ACTIONS.BASE.closeLoading());
        setState(UPDATE_STATUS.INIT);
      }
    }
  }, [state])

  return (
    <View style={styles.container}>
      <Header title='系统设置' />
      <View style={styles.menusView}>
        <MyTouchableOpacity style={styles.menuItem} onPress={startUpdateCheck}>
          <View style={styles.menuItemContent}>
            <Image source={require('./i/icon-1.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(15)}} />
            <Text style={{...styles.buttonText, color: '#2A2A2A'}}>版本检测（1.1.2）</Text>
          </View>
          <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
        </MyTouchableOpacity>
        <MyTouchableOpacity style={styles.menuItem} onPress={clearCache}>
          <View style={styles.menuItemContent}>
            <Image source={require('./i/icon-2.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(15)}} />
            <Text style={{...styles.buttonText, color: '#2A2A2A'}}>清除缓存</Text>
          </View>
          <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
        </MyTouchableOpacity>
        <MyTouchableOpacity style={styles.menuItem} onPress={() => openPopups('USER_AGREEMENT')}>
          <View style={styles.menuItemContent}>
            <Image source={require('./i/icon-3.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(14)}} />
            <Text style={{...styles.buttonText, color: '#2A2A2A'}}>用户协议</Text>
          </View>
          <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
        </MyTouchableOpacity>
        <MyTouchableOpacity style={styles.menuItem} onPress={() => openPopups('USER_PRIVACY')} >
          <View style={styles.menuItemContent}>
            <Image source={require('./i/icon-4.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(16)}} />
            <Text style={{...styles.buttonText, color: '#2A2A2A'}}>隐私政策</Text>
          </View>
          <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
        </MyTouchableOpacity>
      </View>
      {
       !_.isEmpty(infos) &&
        <MyTouchableOpacity style={styles.submitView} onPress={handleLogout} >
          <Text style={styles.submitText}>退出登录</Text>
        </MyTouchableOpacity>
      }
     </View>
  )

}