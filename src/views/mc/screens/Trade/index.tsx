/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 14:00:27
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/index.tsx
 * @Description:
 */
import React from "react";
import { View, Image, Text } from 'react-native';
import { useSelector } from "react-redux";
import usePublicState from "@core/hooks/usePublicState";
import useTradeConnect from "@core/hooks/trade/useTradeConnect";
import MyTouchableOpacity from "@core/templates/components/MyTouchableOpacity";
import Overlay from "@core/templates/components/Overlay";
import BackgroundView from "@core/templates/components/BackgroundView";
import { Input } from '@ui-base/index';
import Icon from '@icon/index';
import Placing from "./Placing";
import Position from "./Position";
import TradeHistory from "./TradeHistory";
import Button from '@this/components/Button'
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import ENUM from '@core/constants/enum';
import store from '@helpers/storage'
import { LS as styles, GS } from './style';

export default () => {

  const { navigation, isMt4User, rs, isFocused, cacheReady } = usePublicState();
  const mt4Info = useSelector((state: any) => state.trade.mt4Info);
  const { forward } = useRouteWebCommon();
  const { authToMt4 } = useTradeConnect();
  const [ currentTab, setCurrentTab ] = React.useState(0);
  const [ isShowLogin, setIsShowLogin ] = React.useState(false);
  // const [ password, setPassword ] = React.useState('083413yI');
  const [ password, setPassword ] = React.useState();
  const [ showPassword, setShowPassword ] = React.useState(false);

  React.useEffect(() => {
    if(isFocused && !mt4Info && cacheReady){
      const pass = store.get('MT4-PASS');
      if(pass){
        authToMt4({password: pass, callback: () => {}})
      }
    }
  }, [isFocused, mt4Info, cacheReady])

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: '交易',
      headerShown: true,
    });
  }, [])

  // 未登录 或者 未开户
  React.useEffect(() => {
    if(!isMt4User){
      // 继续注册引导
      if(rs.user.registerProgress.code === ENUM.user.ERegisterProgress.WAITING_REAL_NAME_AUTHENTICATION) {
        navigation.navigate('RealnameAuthentication');
        return;
      }
      if(rs.user.registerProgress.code === ENUM.user.ERegisterProgress.WAITING_QUESTIONNAIRE) {
        navigation.navigate('Questionnaire');
        return;
      }
    }
  }, [isMt4User])

  const handleForgetPassword = () => {
    setIsShowLogin(false);
    forward(FORWARD_TYPES['USER_INFOS'])
  }

  const handleUnlockTrade = () => {
    authToMt4({password, callback: () => {
      setIsShowLogin(false);
      navigation.navigate('TradeDetail');
    }})
  }

  return (
    <View style={styles.container}>
      {
        !mt4Info &&
        <>
          <MyTouchableOpacity onPress={() => setIsShowLogin(true)}>
            <Image style={styles.loginImage} source={require('./i/go-login.png')} resizeMode="contain" />
          </MyTouchableOpacity>
        </>
      }
      {
        mt4Info &&
        <>
          <BackgroundView style={styles.loginImage} source={require('./i/banner.png')} resizeMode="contain">
            <View style={styles.loginImageContent}>
              <View style={{width: '50%'}}>
                <Text style={styles.loginLeftTitle}>资产净值（USD）</Text>
                <Text style={styles.loginLeftNumber}>{mt4Info.AccountSummary.balance}</Text>
              </View>
              <View style={{width: '50%'}}>
                <View style={styles.loginRight}>
                  <Text style={styles.loginRightTitle}>可用保证金</Text>
                  <Text style={styles.loginRightNumber}>{mt4Info.AccountSummary.freeMargin}</Text>
                </View>
                <View style={styles.loginRight}>
                  <Text style={styles.loginRightTitle}>占用保证金</Text>
                  <Text style={styles.loginRightNumber}>{mt4Info.AccountSummary.margin}</Text>
                </View>
                <View style={styles.loginRight}>
                  <Text style={styles.loginRightTitle}>持仓盈亏</Text>
                  <Text style={styles.loginRightNumber}>{mt4Info.AccountSummary.profit}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonBox}>
              <MyTouchableOpacity style={styles.buttonItem} onPress={() => forward(FORWARD_TYPES['DEPOSIT'])}>
                <View style={styles.buttonItem}>
                  <Image source={require('./i/icon-1.png')} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>注资</Text>
                </View>
              </MyTouchableOpacity>
              <MyTouchableOpacity style={styles.buttonItem} onPress={() => navigation.navigate('TradeDetail')}>
                <View style={{...styles.buttonItem, backgroundColor: '#FFFFFF'}}>
                  <Image source={require('./i/icon-2.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(18)}} />
                  <Text style={{...styles.buttonText, color: 'black'}}>开仓</Text>
                </View>
              </MyTouchableOpacity>
            </View>
          </BackgroundView>
        </>
      }
      <View style={styles.tabsVeiw}>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 0 && styles.tabsItemActive]} onPress={() => setCurrentTab(0)}>
          <Text style={[styles.tabsItemText, currentTab === 0 && styles.tabsItemTextActive]}>持仓</Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 1 && styles.tabsItemActive]} onPress={() => setCurrentTab(1)}>
          <Text style={[styles.tabsItemText, currentTab === 1 && styles.tabsItemTextActive]}>挂单</Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 2 && styles.tabsItemActive]} onPress={() => setCurrentTab(2)}>
          <Text style={[styles.tabsItemText, currentTab === 2 && styles.tabsItemTextActive]}>交易记录</Text>
        </MyTouchableOpacity>
      </View>
      { currentTab === 0 && mt4Info && <Position /> }
      { currentTab === 1 && <Placing /> }
      { currentTab === 2 && <TradeHistory /> }
      {
        isShowLogin &&
        <Overlay display>
          <>
            <View style={styles.loginBox}>
              <Text style={styles.loginTitle}>解锁交易</Text>
              <View style={styles.input} >
                <Image source={require('./i/icon-pass.png')} style={styles.inputIcon} />
                <Input
                  value={password}
                  placeholder="请输入登录密码"
                  onChangeText={(value: string) => setPassword(value)}
                  style={{...styles.inputText, width: GS.mixin.rem(200)}} type={showPassword ? 'text' : 'password'}
                />
                <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowPassword(!showPassword)}>
                  <Icon.Font type={Icon.T.Feather}  name={!showPassword ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
                </MyTouchableOpacity>
              </View>
              <Button
                style={styles.submit}
                textStyle={styles.submitText}
                onPress={handleUnlockTrade}
                text="提交"
              />
              <Text style={styles.forgetPassword} onPress={handleForgetPassword}>忘记交易密码？</Text>
            </View>
            <MyTouchableOpacity onPress={() => setIsShowLogin(false)}>
              <Image source={require('./i/icon-close.png')} style={styles.close} />
            </MyTouchableOpacity>
          </>
        </Overlay>
      }
    </View>
  )

}