/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-23 18:56:14
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/index.tsx
 * @Description: 首页
 */
import _ from 'lodash';
import React from 'react';
import { ScrollView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import FlashAd from './components/FlashAd';
import Banner from './components/Banner';
import Ad from './components/Ad';
import RegisterManual from './components/RegisterManual';
import Subsidy from './components/Subsidy';
import Shotcut from './components/Shotcut';
import News from './components/News';
import Strategy from './components/Strategy';
import Trophy from './components/Trophy';
import CustomerService from '@core/templates/components/CustomerService';
import useRouteWebCommon, { FORWARD_TYPES} from '@core/hooks/useRouteWebCommon';
import usePromotion from '@core/hooks/usePromotion';
import usePublicState from '@core/hooks/usePublicState';
import MyImage from '@core/templates/components/Base/Image';
import HomeAd from './components/HomeAd';
import { useIsFocused } from "@react-navigation/native";
import { LS, GS } from './style';
import G from '@constants/global';
import { useSelector } from 'react-redux';

const styles = LS.main;

export default () => {

  const isFocused = useIsFocused();
  const { isLogined, navigation, dispatch, ACTIONS, ossDomain } = usePublicState();
  const BottomDialogNoAuth = useSelector((state: any) => state.base.appDisplayConfig?.BottomDialog?.Data);
  const BottomDialogAuth = useSelector((state: any) => state.base.popupAdvert?.BottomDialog?.Data);
  const { forward } = useRouteWebCommon();;
  const [showBottonAd, setShowBottonAd] = React.useState(!G.GET('INIT_BOOT_BOTTOM_AD'));
  const [ showPopup, setShowPopup ] = React.useState<boolean>(false);
  const [ showHomeAd, setShowHomeAd ] = React.useState<boolean>(true);
  const [bottomAd, setBottomAd] = React.useState<any>(null);
  const { promotionCenterList } = usePromotion();

  React.useEffect(() => {
    if(!showBottonAd){
      G.SET('INIT_BOOT_BOTTOM_AD', true);
    }
  }, [showBottonAd])

  React.useEffect(() => {
    if(isLogined){
      setBottomAd(BottomDialogAuth);
    }else{
      setBottomAd(BottomDialogNoAuth);
    }
  }, [BottomDialogNoAuth, BottomDialogAuth, isLogined])

  // 推荐人活动 TYPE ID
  const RECOMMEND_ID = 18;

  // 新人领金
  const handleNewUser = () => {
    const recommend = _.find(promotionCenterList, { type: RECOMMEND_ID });
    if (isLogined) {
      if(recommend){
        forward({...FORWARD_TYPES['PROMOTIONS'], uri: `/promotion-center/${recommend.id}`, type: 'mc'})
        return;
      }
      dispatch(ACTIONS.BASE.openToast({text: '暂无推荐人活动'}));
    } else {
      navigation.navigate('Register')
    }
  }

  // 快速入金
  const handleDeposit = () => {
    if(isLogined) {
      forward(FORWARD_TYPES['DEPOSIT'])
    } else {
      navigation.navigate('Login')
    }
  }

  const handleBottomADClick = () => {
    const content = JSON.parse(bottomAd[0].Content);
    if(content.EnableNative){
      navigation.navigate('Register')
      return;
    }
    forward({type: 'origin', uri: content.RedirectUrl, title: content.RedirectTitle});
  }

  const handleBottomADClose = (e: any) => {
    setShowBottonAd(false);
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} disableScrollViewPanResponder={true}>
        <Banner />
        <View style={LS.contents.container}>
          <Ad />
          {/* <View style={styles.buttons}>
            <MyTouchableOpacity style={styles.buttonItem} onPress={handleNewUser}>
              <View style={styles.buttonItem}>
                <Image source={require('./i/buttons/new-user.png')} style={styles.buttonIcon} />
                <Text style={styles.buttonText}>{isLogined ? '推荐有礼' : '新人领金'}</Text>
              </View>
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.buttonItem} onPress={handleDeposit}>
              <View style={{...styles.buttonItem, backgroundColor: '#FFC600'}}>
                <Image source={require('./i/buttons/deposit.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(18)}} />
                <Text style={{...styles.buttonText, color: 'black'}}>快速入金</Text>
              </View>
            </MyTouchableOpacity>
          </View> */}
          <Shotcut />
          <RegisterManual />
          <Strategy type='home' />
          <News />
          <Subsidy />
          <Trophy />
          {
            isFocused &&
            <CustomerService />
          }
        </View>
        <FlashAd showPopup={showPopup} setShowPopup={setShowPopup} />
        <HomeAd showHomeAd={isFocused && showHomeAd && !showPopup} setShowHomeAd={setShowHomeAd} />
      </ScrollView>
      {
        isFocused && showBottonAd && bottomAd &&
        <View style={{...styles.bottomAd}}>
          <TouchableWithoutFeedback onPress={handleBottomADClick}>
            <View style={{flex: 1, position: 'relative'}}>
              <MyTouchableOpacity style={styles.bottomAdClose} onPress={handleBottomADClose}>
                <Text>X</Text>
              </MyTouchableOpacity>
              <MyImage
                width={GS.mixin.rem(375)}
                source={{uri: `${ossDomain}${bottomAd[0].BannerImg}`}}
                resizeMode='cover'
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      }
    </View>
  )

}