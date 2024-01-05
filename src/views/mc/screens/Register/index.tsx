/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:31
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Register/index.tsx
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
import usePopups from '@core/hooks/componentController/usePopups';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useAds from '@core/hooks/useAds';
import useRegister from '@core/hooks/useRegister';
import Icon from '@icon/index';
import { LS as styles, GS } from './style';


export default () => {

  const insets = useSafeAreaInsets();
  const { navigation } = usePublicState();
  const { openPopups } = usePopups();
  const { LoginPageAd } = useAds();
  const {
    payload,
    setPayload,
    countryCodeList,
    validate,
    getValidateCode,
    countDown,
    register
  } = useRegister();

  return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={{...styles.titleView, marginTop: insets.top}}>
          <MyTouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <Icon.Font style={styles.goBackIcon} type={Icon.T.SimpleLineIcons} name='arrow-left' />
          </MyTouchableOpacity>
          <Text style={styles.titleText}>开户</Text>
        </View>
        <Text style={styles.welcome}>立即领取本月限定红包！</Text>
      </BackgroundView>
      <View style={styles.formView}>
        <View style={styles.input} >
          <Image source={require('./i/icon-phone.png')} style={{...styles.inputIcon, height: GS.mixin.rem(23)}} />
          <Input
            autoComplete="off"
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
            autoComplete="off"
            value={payload.AuthCode}
            placeholder="请输入短信验证码"
            keyboardType='numeric'
            onBlur={() => validate('Token')}
            onChangeText={(value: string) => setPayload({...payload, AuthCode: value})}
            style={{...styles.inputText, width: GS.mixin.rem(200), marginLeft: GS.mixin.rem(6)}}
          />
          <MyTouchableOpacity style={styles.validateCode} onPress={() => getValidateCode({ CountryCode: payload.CountryCode, PhoneNumber: payload.PhoneNumber })}>
            <Text style={{fontSize: GS.mixin.rem(10), color: '#2A2A2A'}}>
              { countDown > 0 ? `${countDown}秒后重试` : '获取验证码' }
            </Text>
          </MyTouchableOpacity>
        </View>
        <View style={styles.agreement} >
          <MyTouchableOpacity style={{flexDirection: 'row'}} onPress={() => setPayload({...payload, Agree: !payload.Agree})}>
            <Icon.Font
              type={Icon.T.AntDesign}
              name={!payload.Agree ? 'checkcircleo' : 'checkcircle'}
              size={GS.mixin.rem(18)}
              color="#FFC600"
            />
            <Text style={styles.agreementText}>注册即表示同意</Text>
          </MyTouchableOpacity>
          <View style={styles.agreementTextContainer}>
            <MyTouchableOpacity onPress={() => openPopups('USER_AGREEMENT')} >
              <Text style={styles.agreementTextLink}>《用户协议》</Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity onPress={() => openPopups('USER_PRIVACY')} >
              <Text style={styles.agreementTextLink}>《隐私条款》</Text>
            </MyTouchableOpacity>
          </View>
        </View>
        <MyTouchableOpacity style={styles.submitView} onPress={register}>
          <Text style={styles.submitText}>注册</Text>
        </MyTouchableOpacity>
        <View style={styles.login}>
          <Text style={styles.agreementText}>已有账号？
          </Text>
          <MyTouchableOpacity style={{borderBottomColor: '#FFC600', borderBottomWidth: 1}} onPress={() => navigation.replace('Login')}>
            <Text style={styles.agreementTextLink}>立即登录</Text>
          </MyTouchableOpacity>
        </View>
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
