/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-23 15:43:48
 * @LastEditors: ammo@xyzzdev.com
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
import ProfileScreen from '@this/screens/Profile'
import ScreenHOC from '@views/mc/shadow/ScreenHOC';
import KLine from '@this/screens/Trade/Kline';
import WebView from '@this/screens/WebFrame';
import CONFIG from '@this/configs';

const Root = ScreenHOC(RootNavigations);
const Profile = ScreenHOC(ProfileScreen);
const Login = ScreenHOC(LoginScreen);
const Forgot = ScreenHOC(ForgotPass);
const Register = ScreenHOC(RegisterScreen);
const Realname = ScreenHOC(RealnameAuthenticationScreen);
const Questionnaire = ScreenHOC(QuestionnaireScreen);
const DoneForRegister = ScreenHOC(DoneForRegisterScreen);
const RegisterGuide = ScreenHOC(RegisterGuideScreen);
const Settings = ScreenHOC(SettingsScreen);
const MessageCenter = ScreenHOC(MessageCenterScreen);
const About = ScreenHOC(AboutUs);
const Strategy = ScreenHOC(StrategyDetail);
const VideosScreen = ScreenHOC(Videos);
const TradeDetailScreen = ScreenHOC(TradeDetail);
const TradeDoneScreen = ScreenHOC(TradeDone);
const KLineScreen = ScreenHOC(KLine);
const WebFrame = ScreenHOC(WebView);

const MainStack = createNativeStackNavigator();

export default () => {

  return (
    <MainStack.Navigator
      initialRouteName="Root"
      // initialRouteName="DoneForRegister"
      screenOptions={{
        headerBackTitle: '返回',
        animation: CONFIG.ENABLE_ANIMATION ? 'slide_from_right' : 'none',
        animationDuration: 100,
        headerRight: () => (<HeaderRight marginRight={0} />),
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white'
        },
        headerTitleAlign: 'center'
      }}>
      <MainStack.Screen name="Root" component={Root} />
      <MainStack.Screen name="Profile" component={Profile} options={{headerShown: true, title: '个人信息'}} />
      <MainStack.Screen name='Login' component={Login} />
      <MainStack.Screen name='ForgotPass' component={Forgot} />
      <MainStack.Screen name='Register' component={Register} />
      <MainStack.Screen name='RealnameAuthentication' component={Realname} />
      <MainStack.Screen name='Questionnaire' component={Questionnaire} />
      <MainStack.Screen name='DoneForRegister' component={DoneForRegister} />
      <MainStack.Screen name='RegisterGuide' component={RegisterGuide} />
      <MainStack.Screen name='Settings' component={Settings} />
      <MainStack.Screen name='MessageCenter' component={MessageCenter} />
      <MainStack.Screen name='AboutUs' component={About}  />
      <MainStack.Screen name='StrategyDetail' component={Strategy} options={{headerShown: true}} />
      <MainStack.Screen name='Videos' component={VideosScreen} />
      <MainStack.Screen name='TradeDetail' component={TradeDetailScreen} />
      <MainStack.Screen name='TradeDone' component={TradeDoneScreen}  />
      <MainStack.Screen name='KLine' component={KLineScreen} />
      <MainStack.Screen name='WEB-COMMON' component={WebFrame} />
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