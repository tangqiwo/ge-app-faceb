/*
 * @Author: Galen.GE
 * @Date: 2023-08-05 01:39:24
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useValidateCode.ts
 * @Description: 验证码
 */
import React from 'react';
import usePublicState from "./usePublicState";

type TValidateCode = {
  type: 'register' | 'login' | 'reset'
}
export default ({ type }: TValidateCode) => {

  const { dispatch, ACTIONS } = usePublicState();
  const [ validateCode, setValidateCode ] = React.useState<string>('');
  const [ countDown, setCountDown ] = React.useState<number>(0);
  const [ apiType, setApiType ] = React.useState<string>();
  const timer = React.useRef<any>(null);

  React.useEffect(() => {
    switch(type){
      case 'register':
        setApiType('auth_code_for_register_by_phone_number');
        break;
      case 'login':
        setApiType('AuthCodeForLogin');
        break;
      case 'reset':
        setApiType('auth_code_for_reset_password_by_phone_number');
        break;
      default:
        break;
    }
  }, [type])

  // 销毁定时器
  React.useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    }
  }, []);


  interface TValidateCode {
    CountryCode: string;
    PhoneNumber: string;
  }
  const getValidateCode = ({CountryCode, PhoneNumber}: TValidateCode): void => {
    if(countDown > 0){
      return;
    }
    if(!/^[0-9]{8,20}$/.test(PhoneNumber) || !PhoneNumber){
      dispatch(ACTIONS.BASE.openToast({text: '请输入正确的手机号'}));
      return;
    }
    dispatch(ACTIONS.BASE.getVerifyCode({data: { CountryCode, PhoneNumber }, apiType, cb: () => {
      dispatch(ACTIONS.BASE.openToast({text: '验证码已发送', types: 'success'}));
      setCountDown(60);
      timer.current = setInterval(() => {
        setCountDown(countDown => {
          if (countDown === 0) {
            clearInterval(timer.current);
            return 0;
          }
          return countDown - 1;
        })
      }, 1000)
    }}));
  }

  return {
    countDown,
    validateCode,
    setValidateCode,
    getValidateCode
  }

}
