/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-22 17:41:56
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/index.tsx
 * @Description: 默认应用入口
 */
import React from 'react';
import { LogBox, StatusBar, Appearance } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Provider } from 'react-redux'
import { configureStore } from '@core/store';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Framework from './Framework';
import ScreenRoute from '@views/mc/navigations/AppNavigations';
import { MyToast } from './components/Toast';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PortalProvider } from '@gorhom/portal';
import JPush from 'jpush-react-native';
import G from '@constants/global';

const store = configureStore();
LogBox.ignoreLogs([""]);

export default () => {

  const [colorScheme, setColorScheme] = React.useState(Appearance.getColorScheme());

  React.useEffect(() => {
    JPushInit();
    Orientation.lockToPortrait();
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription.remove();
  }, [])

  const JPushInit = () => {
    JPush.init({ "appKey":"83e961dc0c0d3b3e8da53006", "channel":"developer-default", "production": true });
    //连接状态
    const connectListener = (result: any) => {
      console.log("connectListener:" + JSON.stringify(result))
    };
    JPush.addConnectEventListener(connectListener);
    //通知回调
    const notificationListener = (result: any) => {
      console.log("notificationListener:" + JSON.stringify(result))
    };
    JPush.addNotificationListener(notificationListener);
    //本地通知回调
    const localNotificationListener = (result: any) => {
      console.log("localNotificationListener:" + JSON.stringify(result))
    };
    JPush.addLocalNotificationListener(localNotificationListener);
    //自定义消息回调
    const tagAliasListener = (result: any) => {
      console.log("tagAliasListener:" + JSON.stringify(result))
    };
    JPush.addTagAliasListener(tagAliasListener);
    //手机号码事件回调
    const mobileNumberListener = (result: any) => {
      console.log("mobileNumberListener:" + JSON.stringify(result))
    };
    JPush.addMobileNumberListener(mobileNumberListener);
  }

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainerWithRedux theme={{...DefaultTheme, dark: colorScheme === 'dark'}} >
            <PortalProvider>
              <ScreenRoute />
              <Framework />
            </PortalProvider>
          </NavigationContainerWithRedux>
        </Provider>
      </SafeAreaProvider>
      <MyToast />
    </>
  )

}


const NavigationContainerWithRedux = ({ children }: any) => {

  const [ routeName, setRouteName ] = React.useState('Root');

  React.useEffect(() => {
    G.SET('CRRENT_ROUTE', routeName);
  }, [routeName])

  const getActiveRouteName = (state: any): any => {
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    setRouteName(route.name);
  }

  return (
    <NavigationContainer
      theme={{...DefaultTheme, dark: false}}
      onStateChange={(state) => getActiveRouteName(state)}
    >
      {children}
    </NavigationContainer>
  )

};