/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-23 18:56:14
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/index.tsx
 * @Description: 首页
 */
import _ from 'lodash';
import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
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
import { useIsFocused } from "@react-navigation/native";
import { LS, GS } from './style';

const styles = LS.main;

export default () => {

  const isFocused = useIsFocused();
  const { isLogined, navigation } = usePublicState();
  const { forward } = useRouteWebCommon();;
  const { promotionCenterList } = usePromotion();

  // 推荐人活动 TYPE ID
  const RECOMMEND_ID = 9;

  // 新人领金
  const handleNewUser = () => {
    const recommend = _.find(promotionCenterList, { type: RECOMMEND_ID });
    if (isLogined && recommend) {
      forward({...FORWARD_TYPES['PROMOTIONS'], uri: `/promotion-center/${recommend.id}`, type: 'mc'})
    } else {
      navigation.navigate('Login')
    }
  }

  // 快速入金
  const handleDeposit = () => {
    if(isLogined) {
      navigation.navigate('Deposit')
    } else {
      forward(FORWARD_TYPES['DEPOSIT'])
      navigation.navigate('Login')
    }
  }

  return (
    <ScrollView style={styles.container} disableScrollViewPanResponder={true}>
      <Banner />
      <View style={LS.contents.container}>
        <Ad />
        <View style={styles.buttons}>
          <MyTouchableOpacity style={styles.buttonItem} onPress={handleNewUser}>
            <View style={styles.buttonItem}>
              <Image source={require('./i/buttons/new-user.png')} style={styles.buttonIcon} />
              <Text style={styles.buttonText}>新人领金</Text>
            </View>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={styles.buttonItem} onPress={handleDeposit}>
            <View style={{...styles.buttonItem, backgroundColor: '#FFC600'}}>
              <Image source={require('./i/buttons/deposit.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(18)}} />
              <Text style={{...styles.buttonText, color: 'black'}}>快速入金</Text>
            </View>
          </MyTouchableOpacity>
        </View>
        <RegisterManual />
        <Subsidy />
        <Shotcut />
        <News />
        <Strategy type='home' />
        <Trophy />
        {
          isFocused &&
          <CustomerService />
        }
      </View>
      <FlashAd />
    </ScrollView>
  )

}