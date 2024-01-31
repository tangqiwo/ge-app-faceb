/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-23 15:43:48
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/navigations/AppNavigations.tsx
 * @Description: 主导航器（路由）
 */
import _ from 'lodash';
import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RootNavigations from './RootNavigations';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import RealnameAuthenticationScreen from '../screens/Register/RealnameAuthentication';
import QuestionnaireScreen from '../screens/Register/Questionnaire';
import ForgotPass from '../screens/Login/ForgotPass';
import DoneForRegisterScreen from '@this/screens/Register/DoneForRegister';
import RegisterGuideScreen from '@this/screens/Register/Guide';
import SettingsScreen from '@this/screens/Settings';
import MessageCenterScreen from '@this/screens/MessageCenter';
import { StrategyDetail } from '@this/screens/Home/components/Strategy';
import AboutUs from '@this/screens/AboutUs';
import Videos from '@this/screens/Videos';
import TradeDetail from '@this/screens/TradeDetail';
import TradeDone from '@this/screens/TradeDetail/Done';
import BootScreen from '@this/screens/Home/components/BootScreen';
import ProfileScreen from '@this/screens/Profile'
import ScreenHOC from '@views/mc/shadow/ScreenHOC';
import WebView from '@this/screens/WebFrame';

const MainStack = createNativeStackNavigator();

export default () => {

  return (
    <MainStack.Navigator
      initialRouteName="Boot"
      // initialRouteName="Login"
      screenOptions={{
        headerBackTitle: '返回',
        animation: 'slide_from_right',
        headerRight: () => (<HeaderRight marginRight={0} />),
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white'
        },
        headerTitleAlign: 'center'
      }}>
      <MainStack.Screen name="Boot" component={ScreenHOC(BootScreen)} />
      <MainStack.Screen name="Root" component={ScreenHOC(RootNavigations)} />
      <MainStack.Screen name="Profile" component={ScreenHOC(ProfileScreen)} options={{headerShown: true, title: '个人信息'}} />
      <MainStack.Screen name='Login' component={ScreenHOC(LoginScreen)} />
      <MainStack.Screen name='ForgotPass' component={ScreenHOC(ForgotPass)} />
      <MainStack.Screen name='Register' component={ScreenHOC(RegisterScreen)} />
      <MainStack.Screen name='RealnameAuthentication' component={ScreenHOC(RealnameAuthenticationScreen)} />
      <MainStack.Screen name='Questionnaire' component={ScreenHOC(QuestionnaireScreen)} />
      <MainStack.Screen name='DoneForRegister' component={ScreenHOC(DoneForRegisterScreen)} />
      <MainStack.Screen name='RegisterGuide' component={ScreenHOC(RegisterGuideScreen)} />
      <MainStack.Screen name='Settings' component={ScreenHOC(SettingsScreen)} />
      <MainStack.Screen name='MessageCenter' component={ScreenHOC(MessageCenterScreen)} />
      <MainStack.Screen name='AboutUs' component={ScreenHOC(AboutUs)}  />
      <MainStack.Screen name='StrategyDetail' component={ScreenHOC(StrategyDetail)} options={{headerShown: true}} />
      <MainStack.Screen name='Videos' component={ScreenHOC(Videos)} />
      <MainStack.Screen name='TradeDetail' component={ScreenHOC(TradeDetail)} />
      <MainStack.Screen name='TradeDone' component={ScreenHOC(TradeDone)} />
      <MainStack.Screen name='WEB-COMMON' component={ScreenHOC(WebView)} />
    </MainStack.Navigator>
  )
}


// 右侧按钮
interface IHeaderRight{
  marginRight?: number,
  children?: any
}
export const HeaderRight = ({marginRight=15, children}: IHeaderRight) => {

  return (
    <View style={{marginRight}}>
      <View style={{flexDirection: 'row'}}>
        { children }
      </View>
    </View>
  )

}