/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:31
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Register/RealnameAuthentication/index.tsx
 * @Description: 登录
 */
import _ from 'lodash';
import React from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import MyImage from '@core/templates/components/Base/Image';
import { Input } from '@ui-base/index';
import BackgroundView from "@core/templates/components/BackgroundView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useRegister from '@core/hooks/useRegister';
import useAds from '@core/hooks/useAds';
import PopupAD from '@template/components/PopupAD';
import Icon from '@icon/index';
import { LS as styles, GS } from './style';


export default () => {

  const {rs, isFocused, navigation, dispatch, ACTIONS} = usePublicState();
  const insets = useSafeAreaInsets();
  const { LoginPageAd } = useAds();
  const {
    realNameAuth,
    setRealNameAuth,
    validate,
    showPassword,
    setShowPassword,
    validateRealName
  } = useRegister();
  const [ showAd, setShowAd ] = React.useState(false);

  React.useEffect(() => {
    dispatch(ACTIONS.BASE.getPopupAd());
  }, [])

  React.useEffect(() => {
    if(!isFocused){
      return;
    }
    if(!rs.base.popupAd.CreateUser?.Data || !rs.base.popupAd.CreateUser.Data.length){
      return;
    }
    setShowAd(true);
  }, [rs.base.popupAd.CreateUser?.Data])

  return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={{...styles.titleView, marginTop: insets.top}}>
          <MyTouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
            <Icon.Font style={styles.goBackIcon} type={Icon.T.SimpleLineIcons} name='arrow-left' />
          </MyTouchableOpacity>
          <Text style={styles.titleText}>实名认证</Text>
        </View>
        <Text style={styles.welcome}>立即领取本月限定红包！</Text>
      </BackgroundView>
      <View style={styles.formView}>
        <View style={styles.steps}>
          <Image source={require('./i/step.png')} style={styles.stepImage} />
          <View style={styles.texts} >
            <Text style={{...styles.stepText}}>绑定手机</Text>
            <Text style={styles.stepText}>实名认证</Text>
            <Text style={styles.stepText}>开户成功</Text>
          </View>
        </View>
        <View style={styles.input} >
          <Image source={require('./i/icon-user.png')} style={{...styles.inputIcon, width: GS.mixin.rem(15), height: GS.mixin.rem(14)}} />
          <Input
            value={realNameAuth.RealName}
            placeholder="真实姓名（与证件姓名一致）"
            onBlur={() => validate('RealName')}
            onChangeText={(value: string) => setRealNameAuth({...realNameAuth, RealName: value})}
            style={{...styles.inputText, width: GS.mixin.rem(200), marginLeft: GS.mixin.rem(6)}}
          />
        </View>
        <View style={styles.input} >
          <Image source={require('./i/icon-email.png')} style={{...styles.inputIcon, width: GS.mixin.rem(19), height: GS.mixin.rem(15)}} />
          <Input
            value={realNameAuth.IdCardNo}
            placeholder="请输入身份证号码"
            keyboardType='numeric'
            onBlur={() => validate('IdCardNo')}
            onChangeText={(value: string) => setRealNameAuth({ ...realNameAuth, IdCardNo: value })}
            style={{...styles.inputText, width: GS.mixin.rem(200), marginLeft: GS.mixin.rem(6)}}
          />
        </View>
        <View style={styles.input} >
          <Image source={require('./i/icon-pass.png')} style={styles.inputIcon} />
          <Input
            value={realNameAuth.Password}
            placeholder="请设置8-20位含英文字母+数字"
            onBlur={() => validate('Password')}
            onChangeText={(value: string) => setRealNameAuth({ ...realNameAuth, Password: value })}
            style={{...styles.inputText, width: GS.mixin.rem(200)}} type={showPassword ? 'text' : 'password'}
          />
          <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowPassword(!showPassword)}>
            <Icon.Font type={Icon.T.Feather}  name={!showPassword ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
          </MyTouchableOpacity>
        </View>
        <MyTouchableOpacity style={styles.submitView} onPress={validateRealName}>
          <Text style={styles.submitText}>下一步</Text>
        </MyTouchableOpacity>
      </View>
      {
        LoginPageAd &&
        <TouchableWithoutFeedback onPress={LoginPageAd.OnPress}>
          <Image source={{uri: LoginPageAd.Image}} style={styles.banner} />
        </TouchableWithoutFeedback>
      }
      <PopupAD visible={showAd} onClose={() => setShowAd(false)}>
        <MyImage width={GS.mixin.rem(335)} source={{uri: rs.base.popupAd.CustomDomain + rs.base.popupAd.CreateUser?.Data[0]?.BannerImg}} />
      </PopupAD>
    </View>
  )

}
