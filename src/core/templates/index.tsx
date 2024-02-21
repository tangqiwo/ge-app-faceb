/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-22 17:41:56
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/index.tsx
 * @Description: 默认应用入口
 */
import React from 'react';
import { LogBox, StatusBar } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { Provider } from 'react-redux'
import { configureStore } from '@core/store';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Framework from './Framework';
import ScreenRoute from '@views/mc/navigations/AppNavigations';
import { MyToast } from './components/Toast';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { PortalProvider } from '@gorhom/portal';
import G from '@constants/global';

const store = configureStore();
LogBox.ignoreLogs([""]);

export default () => {

  React.useEffect(() => {
    Orientation.lockToPortrait();
  }, [])

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainerWithRedux theme={{...DefaultTheme, dark: false}} >
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