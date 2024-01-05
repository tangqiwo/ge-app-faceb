/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:31
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Login/index.tsx
 * @Description: 登录
 */
import _ from 'lodash';
import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '@ui-base/index';
import BackgroundView from "@core/templates/components/BackgroundView";
import Selector from '@core/templates/components/Base/Selector';
import usePublicState from '@core/hooks/usePublicState';
import useAds from '@core/hooks/useAds';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useLogin from '@core/hooks/useLogin';
import Icon from '@icon/index';
import { LS as styles, GS } from './style';


export default () => {

  const insets = useSafeAreaInsets();
  const { navigation } = usePublicState();
  const { LoginPageAd } = useAds();

  const {
    login,
    payload,
    setPayload,
    countryCodeList,
    validate,
    showPassword,
    setShowPassword,
    getValidateCode,
    countDown
  } = useLogin();
  const [ currentTab, setCurrentTab ] = React.useState(0);

  return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={{...styles.titleView, marginTop: insets.top}}>
          <MyTouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <Icon.Font style={styles.goBackIcon} type={Icon.T.SimpleLineIcons} name='arrow-left' />
          </MyTouchableOpacity>
          <Text style={styles.titleText}>登录</Text>
        </View>
        <Text style={styles.welcome}>欢迎您回到巨象！</Text>
      </BackgroundView>
      <View style={styles.formView}>
        <View style={styles.tabs}>
          <MyTouchableOpacity style={styles.tabsItem} onPress={() => setCurrentTab(0)}>
            <View style={{borderBottomColor: '#FFC600', borderBottomWidth: currentTab === 0 ? GS.mixin.rem(2) : 0 }}>
              <Text style={{...styles.tabsItemText, color: currentTab === 0 ? '#2A2A2A' : '#646464'}}>密码登录</Text>
            </View>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={styles.tabsItem} onPress={() => setCurrentTab(1)}>
            <View style={{borderBottomColor: '#FFC600', borderBottomWidth: currentTab === 1 ? GS.mixin.rem(2) : 0 }}>
              <Text style={{...styles.tabsItemText, color: currentTab === 1 ? '#2A2A2A' : '#646464'}}>验证码登录</Text>
            </View>
          </MyTouchableOpacity>
        </View>
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
        {
          currentTab === 0 &&
          <View style={styles.input} >
            <Image source={require('./i/icon-pass.png')} style={styles.inputIcon} />
            <Input
              autoComplete="off"
              value={payload.Password}
              placeholder="请输入登录密码"
              onBlur={() => validate('Password')}
              onChangeText={(value: string) => setPayload({...payload, Password: value})}
              style={{...styles.inputText, width: GS.mixin.rem(200)}} type={showPassword ? 'text' : 'password'}
            />
            <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowPassword(!showPassword)}>
              <Icon.Font type={Icon.T.Feather}  name={!showPassword ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
            </MyTouchableOpacity>
          </View>
        }
        {
          currentTab === 1 &&
          <View style={styles.input} >
            <Image source={require('./i/icon-email.png')} style={{...styles.inputIcon, width: GS.mixin.rem(19), height: GS.mixin.rem(15)}} />
            <Input
              autoComplete="off"
              value={payload.AuthCode}
              placeholder="请输入短信验证码"
              keyboardType='numeric'
              onBlur={() => validate('Token')}
              onChangeText={(value: string) => setPayload({...payload, AuthCode: value})}
              style={{...styles.inputText, width: GS.mixin.rem(200), marginLeft: GS.mixin.rem(6)} }
            />
            <MyTouchableOpacity style={styles.validateCode} onPress={() => getValidateCode({ CountryCode: payload.CountryCode, PhoneNumber: payload.PhoneNumber })}>
              <Text style={{fontSize: GS.mixin.rem(10), color: '#2A2A2A'}}>
                { countDown > 0 ? `${countDown}秒后重试` : '获取验证码' }
              </Text>
            </MyTouchableOpacity>
          </View>
        }
        <MyTouchableOpacity style={styles.submitView} onPress={() => login(currentTab === 0 ? 'Password' : 'Token')}>
          <Text style={styles.submitText}>立即提交</Text>
        </MyTouchableOpacity>
        <View style={styles.actionsView}>
          <MyTouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Register')}>
            <Image source={require('./i/icon-user.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(14)}} />
            <Text style={styles.buttonText}>立即开户</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('ForgotPass')}>
            <Image source={require('./i/icon-user2.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(15)}} />
            <Text style={styles.buttonText}>找回密码</Text>
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
