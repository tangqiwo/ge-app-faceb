/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:31
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Login/ForgotPass/index.tsx
 * @Description: 登录
 */
import _ from 'lodash';
import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { Input } from '@ui-base/index';
import Selector from '@core/templates/components/Base/Selector';
import BackgroundView from "@core/templates/components/BackgroundView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useLogin from '@core/hooks/useLogin';
import useAds from '@core/hooks/useAds';
import useVerifyCode from '@core/hooks/useValidateCode';
import Icon from '@icon/index';
import { LS as styles, GS } from './style';


export default () => {

  const insets = useSafeAreaInsets();
  const { navigation } = usePublicState();
  const { LoginPageAd } = useAds();
  const textInputRef = React.useRef(null);

  const {
    payload,
    setPayload,
    countryCodeList,
    validate,
    showPassword,
    setShowPassword,
    resetPassword
  } = useLogin();

  const { getValidateCode, countDown } = useVerifyCode({type: 'reset'})

  return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={{...styles.titleView, marginTop: insets.top}}>
          <MyTouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <Icon.Font style={styles.goBackIcon} type={Icon.T.SimpleLineIcons} name='arrow-left' />
          </MyTouchableOpacity>
          <Text style={styles.titleText}>重置密码</Text>
        </View>
        <Text style={styles.welcome}></Text>
      </BackgroundView>
      <View style={styles.formView}>
        <View style={styles.input} >
          <Image source={require('./i/icon-phone.png')} style={{...styles.inputIcon, height: GS.mixin.rem(23)}} />
          <Input
            placeholder="请输入手机号"
            style={styles.inputText}
            onBlur={() => validate('PhoneNumber')}
            keyboardType='numeric'
            value={payload.PhoneNumber}
            onChangeText={(value: string) => setPayload({...payload, PhoneNumber: value})}
          />
          <Selector
            style={styles.selector}
            value={payload.CountryCode}
            title='国家/地区'
            options={countryCodeList}
            cb={(value: string) => setPayload({...payload, CountryCode: value})}
          />
        </View>
        <View style={styles.input} >
          <Image source={require('./i/icon-email.png')} style={{...styles.inputIcon, width: GS.mixin.rem(19), height: GS.mixin.rem(15)}} />
          <Input
            myRef={textInputRef}
            autoComplete="off"
            value={payload.AuthCode}
            placeholder="请输入短信验证码"
            keyboardType='numeric'
            onBlur={() => validate('Token')}
            onChangeText={(value: string) => setPayload({...payload, AuthCode: value})}
            style={{...styles.inputText, width: GS.mixin.rem(200), marginLeft: GS.mixin.rem(6)} }
          />
          <MyTouchableOpacity style={styles.validateCode} onPress={() => getValidateCode({ CountryCode: payload.CountryCode, PhoneNumber: payload.PhoneNumber, focus: textInputRef.current })}>
            <Text style={{fontSize: GS.mixin.rem(10), color: '#2A2A2A'}}>
              { countDown > 0 ? `${countDown}秒后重试` : '获取验证码' }
            </Text>
          </MyTouchableOpacity>
        </View>
        <View style={styles.input} >
          <Image source={require('./i/icon-pass.png')} style={styles.inputIcon} />
          <Input
            autoComplete="off"
            value={payload.Password}
            placeholder="请设置8-20位含英文字母+数字"
            onBlur={() => validate('Password')}
            onChangeText={(value: string) => setPayload({...payload, Password: value})}
            style={{...styles.inputText, width: GS.mixin.rem(200)}} type={showPassword ? 'text' : 'password'}
          />
          <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowPassword(!showPassword)}>
            <Icon.Font type={Icon.T.Feather}  name={!showPassword ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
          </MyTouchableOpacity>
        </View>
        <MyTouchableOpacity style={styles.submitView} onPress={() => resetPassword(() => navigation.goBack())}>
          <Text style={styles.submitText}>立即提交</Text>
        </MyTouchableOpacity>
      </View>
      {
        LoginPageAd &&
        <TouchableWithoutFeedback onPress={LoginPageAd.OnPress}>
          <Image source={{uri: LoginPageAd.Image}} style={styles.banner} />
        </TouchableWithoutFeedback>
      }
    </View>
  )

}
