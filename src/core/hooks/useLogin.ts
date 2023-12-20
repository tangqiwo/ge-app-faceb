/*
 * @Author: Galen.GE
 * @Date: 2023-06-07 14:20:59
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useLogin.ts
 * @Description: 登录
 */
import _ from 'lodash';
import React from 'react';
import usePublicState from "./usePublicState";
import storage from '@helpers/storage';
import useValidateCode from "./useValidateCode";
import { useIsFocused } from "@react-navigation/native";
import CONFIG from '@this/configs';

export default () => {

  const isFocused = useIsFocused();
  const { dispatch, ACTIONS, navigation } = usePublicState();
  const validateCode = useValidateCode({ type: 'login' });
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<any>({});
  const [ payload, setPayload ] = React.useState<{
    CountryCode: string;
    Password: string;
    PhoneNumber: string;
    AuthCode: string;
  }>({
    CountryCode: CONFIG.SUPPORT_PHONE_CODE[0].code,
    Password: '',
    PhoneNumber: '',
    AuthCode: ''
  });

  // 字段校验
  const validate = (key: 'Password' | 'PhoneNumber' | 'Token') => {
    if(!isFocused){
      return;
    }
    const { Password, PhoneNumber } = payload;
    if (key === 'Password') {
      setErrors({...errors, Password: Password ? null : '请输入密码'});
      dispatch(ACTIONS.BASE.openToast({text: '请输入密码', types: 'error'}));
      return;
    }
    if(key === 'PhoneNumber') {
      // 8到20位数字
      if (!/^[0-9]{8,20}$/.test(PhoneNumber)) {
        setErrors({...errors, PhoneNumber: '请输入正确的手机号'});
        dispatch(ACTIONS.BASE.openToast({text: '请输入正确的手机号', types: 'error'}));
        return;
      }
      setErrors({...errors, PhoneNumber: null});
      return;
    }
    if(key === 'Token'){
      // 6位数字
      if (!/^[0-9]{6}$/.test(payload.AuthCode)) {
        setErrors({...errors, AuthCode: '请输入正确的验证码'});
        dispatch(ACTIONS.BASE.openToast({text: '请输入正确的验证码', types: 'error'}));
        return;
      }
      setErrors({...errors, AuthCode: null});
    }
  }

  // 登录
  const login = (type: 'Password' | 'Token') => {
    // 如果还有错误提示，不允许提交
    if (Object.values(errors).some((item) => item)) {
      return;
    }
    const data = type === 'Password' ? _.omit(payload, ['AuthCode']) : _.omit(payload, ['Password']);
    dispatch(ACTIONS.USER.login({ data, cb: (res: any) => {
      storage.set('AUTH', res.Data.Token);
      dispatch(ACTIONS.USER.getUserInfo({cb: () => {
        navigation.navigate('Root', { screen: 'Home' })
      }}))
    }}));
  }

  // 重置密码
  const resetPassword = (cb?: () => void) => {
    const { CountryCode, PhoneNumber, AuthCode, Password } = payload;
    // 如果还有错误提示，不允许提交
    if (Object.values(errors).some((item) => item)) {
      return;
    }
    dispatch(ACTIONS.USER.resetPassword({data: { CountryCode, PhoneNumber, AuthCode, Password }, cb: () => {
      dispatch(ACTIONS.BASE.openToast({text: '密码重置成功，请重新登录', types: 'success'}));
      cb();
    }}));
  }

  return {
    ...validateCode,
    payload,
    setPayload,
    showPassword,
    setShowPassword,
    login,
    errors,
    setErrors,
    validate,
    resetPassword,
    countryCodeList: CONFIG.SUPPORT_PHONE_CODE.map((item) => ({
      value: `${item.name}（+${item.code}）`,
      key: item.code
    }))
  }

}
