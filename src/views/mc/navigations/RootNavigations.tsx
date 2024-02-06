/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-23 18:34:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/navigations/RootNavigations.tsx
 * @Description: APP 首屏
 */
import _ from 'lodash';
import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useBackHandler } from '@react-native-community/hooks'
import SplashScreen from 'react-native-splash-screen';
import { Image, ImageBackground, Platform } from 'react-native';
import usePublicState from '@core/hooks/usePublicState';
import BootScreen from '@this/screens/Home/components/BootScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Quotes from '../screens/Quotes';
import Trade from '@this/screens/Trade';
import Strategy from '@this/screens/Strategy';
import { HeaderRight } from './AppNavigations';
import My from '../screens/My';
import { isActiveAnimation } from '@helpers/unit';
 import { GS, LS } from './style';

const Tab = createBottomTabNavigator();

export default () => {

  const { navigation, infos } = usePublicState();
  const [ showBoot, setShowBoot ] = React.useState(true);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    SplashScreen.hide();
  }, [])

  // 在首页时不允许安卓设备通过返回键关闭应用
  useBackHandler(() => {
    if(isFocused){
      return true;
    }
    return false
  })

  const tabPressCheck = (e: any, name: string) => {
    if(name == 'RegisterGuide'){
      e.preventDefault();
      if(_.isEmpty(infos)){
        navigation.navigate('RegisterGuide');
        return;
      }
      navigation.navigate('Trade');
    }
  }

  if(showBoot){
    return (
      <BootScreen close={() => setShowBoot(false)}/>
    )
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        animation: isActiveAnimation() ? 'slide_from_right' : 'none',
        tabBarIcon: (args) => getTabIcon({...args, route}),
        tabBarActiveTintColor: GS.var.colors.primary[1000],
        tabBarInactiveTintColor: GS.var.colors.disabled,
        tabBarLabel: getTabText({ route, infos }),
        title: getTabText({ route }),
        headerRight: () => (<HeaderRight />),
        headerShown: false,
        headerStyle: {
          backgroundColor: 'white'
        },
        tabBarBackground: () => ( <ImageBackground source={require('./i/bg-tab.png')}  style={LS.navigator.bg} resizeMode='cover' /> ),
        tabBarStyle: {
          backgroundColor:'rgba(178,178,178,0.0)',
          height: GS.mixin.rem(85),
          zIndex:9999,
          position:'absolute',
          borderTopWidth:0,
          elevation:0,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarLabelStyle : {
          marginTop: GS.mixin.rem(15),
        },
        tabBarIconStyle:{
          marginTop: Platform.OS === 'android' ? GS.mixin.rem(20) : GS.mixin.rem(30),
        }
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Home} listeners={{tabPress: (e: any) => tabPressCheck(e, 'Home')}} />
      <Tab.Screen name="Quotes" component={Quotes} listeners={{tabPress: (e: any) => tabPressCheck(e, 'Quotes')}} />
      <Tab.Screen name="Trade" component={Trade} listeners={{tabPress: (e: any) => tabPressCheck(e, 'RegisterGuide')}} />
      <Tab.Screen name="Strategy" component={Strategy} listeners={{tabPress: (e: any) => tabPressCheck(e, 'Strategy')}} />
      <Tab.Screen name="My" component={My} listeners={{tabPress: (e: any) => tabPressCheck(e, 'My')}} />
    </Tab.Navigator>
  )
}


// 获取Tab页面的ICON
const getTabIcon = ({ focused, route }: any): any => {
  switch(route.name){
    case 'Home'       : return <Image source={focused ? require('./i/icon-Home-1.png') : require('./i/icon-Home.png')} style={LS.tabIcon.common} resizeMode='cover' />;
    case 'Quotes'     : return <Image source={focused ? require('./i/icon-Quotes-1.png') : require('./i/icon-Quotes.png')} style={LS.tabIcon.common} resizeMode='cover' />;
    case 'Trade'      : return <Image source={require('./i/icon-Center.png')} style={LS.tabIcon.large} />;
    case 'Strategy'   : return <Image source={focused ? require('./i/icon-Strategy-1.png') : require('./i/icon-Strategy.png')} style={LS.tabIcon.common} resizeMode='cover' />;
    case 'My'         : return <Image source={focused ? require('./i/icon-My-1.png') : require('./i/icon-My.png')} style={LS.tabIcon.my} resizeMode='cover' />;
  }
}

// 获取Tab按钮的文字
const getTabText = ({ route, infos }: any): string => {
  switch(route.name){
    case 'Home'       : return '首页';
    case 'Quotes'     : return '行情';
    case 'Trade'      : return _.isEmpty(infos) ? '开户' : '交易';
    case 'Strategy'   : return '策略';
    case 'My'         : return '我的';
    default           : return '';
  }
}