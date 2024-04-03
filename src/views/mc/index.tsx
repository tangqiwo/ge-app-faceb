/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-22 16:16:53
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/index.tsx
 * @Description: 应用主入口
 */
import React from 'react';
import { View } from 'react-native';
import store from '@helpers/storage';
import Privacy from './screens/Home/components/Privacy';
import { PortalProvider } from '@gorhom/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen';
import APP from './app';


// 隐私协议
export default () => {

  const [ isAgreePrivacy, setIsAgreePrivacy ] = React.useState(null);

  React.useEffect(() => {
    SplashScreen.hide();
    store.init(() => {
      setIsAgreePrivacy(store.get('IS_AGREE_PRIVACY') || false);
    })
  }, [])

  if(isAgreePrivacy === null){
    return <></>;
  }

  if(isAgreePrivacy === false){
    return (
      <SafeAreaProvider>
        <View style={{flex: 1}}>
          <PortalProvider>
            <Privacy setShowPrivacy={() => setIsAgreePrivacy(true)} />
          </PortalProvider>
        </View>
      </SafeAreaProvider>
    )
  }

  return <APP />

}
