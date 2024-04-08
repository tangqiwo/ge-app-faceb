/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-12-07 17:23:04
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/components/MyVideo/index.tsx
 * @Description:
 */
import React from 'react';
import Video from 'react-native-video';
// import Orientation from 'react-native-orientation-locker';
import Overlay from '../Overlay';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { View, Image, ActivityIndicator } from 'react-native';
import { HTTP } from '@core/helpers/http';
import G from '@constants/global';

interface IProps {
  source: any,
  close: Function
  title: string,
  id: string | number,
  type: 'ds' | 'new' | 'video' | 'ks'
}
export default ({ source, close, title, id, type }: IProps) => {

  const { dispatch, ACTIONS } = usePublicState();
  const [rate, setRate] = React.useState(null);

  React.useEffect(() => {
    let uri = '';
    if(type === 'ds'){
      uri = 'GeGoldGuruViews/Update'
    }
    if(type === 'new'){
      uri = 'GeNewUserGuidViews/Update'
    }
    if(type === 'video'){
      uri = 'GeVideoCounselingViews/Update'
    }
    if(type === 'ks'){
      uri = 'GeNewsCounselingViews/Update'
    }
    dispatch(ACTIONS.BASE.commonRequest({
      uri,
      data: { id },
      method: HTTP.METHODS.POST
    }))
  }, [])

  // React.useEffect(() => {
  //   Orientation.unlockAllOrientations();
  //   Orientation.lockToLandscape()
  //   return () => {
  //     Orientation.lockToPortrait();
  //   }
  // }, [])
  const handleLoad = (data: any) => {
    setRate(data.naturalSize.height / data.naturalSize.width)
  };

  return (
    <Overlay display={true} style={{backgroundColor: 'rgba(0,0,0, 0.92)'}} >
      <View style={{width: '100%', height: Number(`${(rate || 100/192) * G.GET('SCREEN_WIDTH')}`), justifyContent: 'center'}}>
        <Video
          source={source}
          style={{width: '100%', height: rate ? '100%' : 0}}
          controls={true}
          repeat={false}
          fullscreen={true}
          fullscreenAutorotate={true}
          ignoreSilentSwitch="ignore"
          resizeMode="contain"
          onLoad={handleLoad}
          fullscreenOrientation='landscape'
        />
        {
          !rate &&
          <ActivityIndicator />
        }
      </View>
      <MyTouchableOpacity onPress={() => close()}>
        <Image source={require('./i/close.png')} style={{width: 35, height: 35, marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}} />
      </MyTouchableOpacity>
    </Overlay>
  )

}