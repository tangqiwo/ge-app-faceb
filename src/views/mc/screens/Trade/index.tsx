/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 14:00:27
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/index.tsx
 * @Description:
 */
import _ from 'lodash'
import React from "react";
import { View, Image, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from "react-redux";
import usePublicState from "@core/hooks/usePublicState";
import useTradeConnect from "@core/hooks/trade/useTradeConnect";
import MyTouchableOpacity from "@core/templates/components/MyTouchableOpacity";
import Overlay from "@core/templates/components/Overlay";
import BackgroundView from "@core/templates/components/BackgroundView";
import useNativeForward from '@core/hooks/useNativeForward';
import { Input } from '@ui-base/index';
import Icon from '@icon/index';
import Placing from "./Placing";
import Position from "./Position";
import TradeHistory from "./TradeHistory";
import Button from '@this/components/Button'
import useRouteWebCommon from '@core/hooks/useRouteWebCommon';
import ENUM from '@core/constants/enum';
import store from '@helpers/storage'
import { LS as styles, GS } from './style';

export default () => {

  // useMt4ChartQuote();
  const { navigation, isMt4User, rs, isFocused, cacheReady, dispatch, ACTIONS } = usePublicState();
  const mt4Info = useSelector((state: any) => state.trade.mt4Info);
  const route = useRoute<any>();
  const { goDeposit } = useNativeForward();
  const { authToMt4, makeFirstInstant } = useTradeConnect();
  const [ currentTab, setCurrentTab ] = React.useState(0);
  const [ isShowLogin, setIsShowLogin ] = React.useState(false);
  const [ password, setPassword ] = React.useState<any>('');
  const [ showPassword, setShowPassword ] = React.useState(false);

  React.useEffect(() => {
    if(isShowLogin){
      setPassword('');
    }
  }, [isShowLogin])

  React.useEffect(() => {
    if(route.params?.tab){
      setCurrentTab(route.params.tab);
    }
  }, [route?.params?.tab])

  React.useEffect(() => {
    if(isFocused && !mt4Info && cacheReady){
      const pass = store.get('MT4-PASS');
      if(pass){
        authToMt4({password: pass, callback: (res: any) => {
          makeFirstInstant(res.Data.SymbolsQuote);
        }})
      }
    }
  }, [isFocused, mt4Info, cacheReady])

  React.useEffect(() => {
    if(isFocused){
      dispatch(ACTIONS.USER.getUserInfo({loading: false}))
    }
  }, [isFocused])

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
    navigation.navigate('Profile');
  }

  const handleUnlockTrade = () => {
    authToMt4({password, callback: (res: any) => {
      makeFirstInstant(res.Data.SymbolsQuote);
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
                <Text style={styles.loginLeftNumber} numberOfLines={1}>{Number(mt4Info.AccountSummary.Equity)?.toFixed(2)}</Text>
              </View>
              <View style={{width: '50%'}}>
                <View style={styles.loginRight}>
                  <Text style={styles.loginRightTitle}>可用保证金</Text>
                  <Text style={styles.loginRightNumber}>{_.round(Number(mt4Info.AccountSummary.FreeMargin), 2)?.toFixed(2)}</Text>
                </View>
                <View style={styles.loginRight}>
                  <Text style={styles.loginRightTitle}>占用保证金</Text>
                  <Text style={styles.loginRightNumber}>{_.round(Number(mt4Info.AccountSummary.Margin), 2)?.toFixed(2)}</Text>
                </View>
                <View style={styles.loginRight}>
                  <Text style={styles.loginRightTitle}>持仓盈亏</Text>
                  <Text style={styles.loginRightNumber}>{Number(mt4Info.AccountSummary.Profit)?.toFixed(2)}</Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonBox}>
              <MyTouchableOpacity style={styles.buttonItem} onPress={goDeposit}>
                <View style={styles.buttonItem}>
                  <Image source={require('./i/icon-1.png')} style={styles.buttonIcon} resizeMode='contain' />
                  <Text style={styles.buttonText}>注资</Text>
                </View>
              </MyTouchableOpacity>
              <MyTouchableOpacity style={styles.buttonItem} onPress={() => navigation.navigate('TradeDetail')}>
                <View style={{...styles.buttonItem, backgroundColor: '#FFFFFF'}}>
                  <Image source={require('./i/icon-2.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(18)}} resizeMode='contain'/>
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
      { currentTab === 0 && <Position /> }
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
                  placeholder="请输入交易密码"
                  onChangeText={(value: string) => setPassword(value)}
                  style={{...styles.inputText, width: GS.mixin.rem(200)}} type={showPassword ? 'text' : 'password'}
                />
                <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowPassword(!showPassword)}>
                  <Icon.Font type={Icon.T.Feather}  name={!showPassword ? 'eye-off' : 'eye' } size={GS.mixin.rem(20)} color="#94938F" />
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