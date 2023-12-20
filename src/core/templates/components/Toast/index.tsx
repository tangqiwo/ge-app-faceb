/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 21:57:21
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Toast/index.tsx
 * @Description: TIPS 提示条
 */
import React from 'react';
import Toast, { InfoToast, SuccessToast, ErrorToast } from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from '@icon/index';
import GS from '@views/mc/styles/index'
import ACTIONS from '@actions/index';

export default () => {

  const { display, text, types } = useSelector((state: any) => state.base.toast);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    if(display){
      dispatch(ACTIONS.BASE.closeToast());
      Toast.show({
        type: types,
        text2: text,
        topOffset: Platform.OS === 'android' ? insets.top + 10 : insets.top
      });
    }
  }, [display])

  return (
    <></>
  )
}


export const MyToast = () => {
  return (
    <Toast config={toastConfig} />
  )
}

const toastConfig = {
  info: (props: any) => (
    <InfoToast
      {...props}
      text1Style={{display: 'none'}}
      text2Style={style.text}
      style={{...props.style, ...style.wrapper, borderLeftColor: GS.var.colors.blue[400] }}
      renderLeadingIcon={() => <Icon.Font type={Icon.T.FontAwesome} name="info-circle" color={GS.var.colors.blue[400]} size={16} />}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{display: 'none'}}
      text2Style={style.text}
      style={{...props.style, ...style.wrapper, borderLeftColor: GS.var.colors.red[400] }}
      renderLeadingIcon={() => <Icon.Font type={Icon.T.AntDesign} name="closecircle" color={GS.var.colors.red[400]} size={16} />}
    />
  ),
  success: (props: any) => (
    <SuccessToast
      {...props}
      text1Style={{display: 'none'}}
      text2Style={style.text}
      style={{...props.style, ...style.wrapper, borderLeftColor: GS.var.colors.green[400] }}
      renderLeadingIcon={() => <Icon.Font type={Icon.T.FontAwesome5} name="check" color={GS.var.colors.green[400]} size={16} />}
    />
  )
};

const style = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: -20,
    color: GS.var.colors.gray[600]
  },
  wrapper: {
    height: 40,
    zIndex: 100,
    alignItems: 'center',
    paddingLeft: 10
  }
})