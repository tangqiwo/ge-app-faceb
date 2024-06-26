/*
 * @Author: Galen.GE
 * @Date: 2024-02-05 17:29:40
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/HomeAd/index.tsx
 * @Description:
 */
import React from 'react';
import { Image, View } from 'react-native';
import MyImage from '@template/components/Base/Image';
import usePublicState from "@core/hooks/usePublicState";
import Overlay from "@core/templates/components/Overlay";
import useRouteWebCommon from '@core/hooks/useRouteWebCommon';
import G from '@constants/global';
import { LS as styles, GS } from './style';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';

interface IProps {
  showHomeAd: boolean;
  setShowHomeAd: (show: boolean) => void;
}
export default ({showHomeAd, setShowHomeAd}: IProps) => {

  const { isLogined, rs, ossDomain, navigation } = usePublicState();
  const { forward } = useRouteWebCommon();

  React.useEffect(() => {
    if(!showHomeAd && !G.GET('INIT_HOME_AD_UNLOGIN') && !isLogined){
      G.SET('INIT_HOME_AD_UNLOGIN', true);
      return;
    }
    if(!showHomeAd && isLogined && G.GET('INIT_HOME_AD_LOGIN')){
      G.SET('INIT_HOME_AD_LOGIN', true);
      return;
    }
  }, [showHomeAd, isLogined])

  // 关闭
  const handleClick = () => {

    const loginData = rs.base.popupAdvert?.TopDialog?.Data[0]?.Content ? JSON.parse(rs.base.popupAdvert?.TopDialog?.Data[0]?.Content) : null;
    const noLoginData = rs.base.appDisplayConfig?.TopDialog?.Data[0]?.Content ? JSON.parse(rs.base.appDisplayConfig?.TopDialog?.Data[0]?.Content) : null;
    setShowHomeAd(false);

    if(isLogined && rs.base.popupAdvert?.TopDialog?.Data[0].NativeForward){
      navigation.navigate(rs.base.popupAdvert?.TopDialog?.Data[0].NativeForward);
      return;
    }
    if(!isLogined && rs.base.appDisplayConfig?.TopDialog?.Data[0].NativeForward){
      navigation.navigate(rs.base.appDisplayConfig?.TopDialog?.Data[0].NativeForward);
      return;
    }
    forward({
      type: 'origin',
      uri: isLogined ? loginData.RedirectUrl : noLoginData.RedirectUrl,
      title: isLogined ? loginData.RedirectTitle : noLoginData.RedirectTitle
    })
  }

  const uri = isLogined ? rs.base.popupAdvert?.TopDialog?.Data[0]?.BannerImg : rs.base.appDisplayConfig?.TopDialog?.Data[0]?.BannerImg;

  if(!showHomeAd || !uri){
    return <></>
  }

  return (
    <Overlay display close={() => setShowHomeAd(false)}>
      <View>
        <MyTouchableOpacity onPress={handleClick}>
          <MyImage
            source={{uri: ossDomain + uri}}
            width={GS.mixin.rem(300)}
            style={{width: '100%', height: '100%'}}
          />
        </MyTouchableOpacity>
        <MyTouchableOpacity onPress={() => setShowHomeAd(false)}>
          <Image source={require('./i/close.png')} style={{width: 35, height: 35, marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}} />
        </MyTouchableOpacity>
      </View>
    </Overlay>
  )

}