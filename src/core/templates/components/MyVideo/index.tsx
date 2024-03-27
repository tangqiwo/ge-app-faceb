/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-12-07 17:23:04
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/components/MyVideo/index.tsx
 * @Description:
 */
import React from 'react';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Popup from '../Popup';
import usePublicState from '@core/hooks/usePublicState';
import { HTTP } from '@core/helpers/http';

interface IProps {
  source: any,
  close: Function
  title: string,
  id: string | number,
  type: 'ds' | 'new' | 'video' | 'ks'
}
export default ({ source, close, title, id, type }: IProps) => {

  const { dispatch, ACTIONS } = usePublicState()

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

  React.useEffect(() => {
    Orientation.unlockAllOrientations();
    Orientation.lockToLandscape()
    return () => {
      Orientation.lockToPortrait();
    }
  }, [])

  return (
    <Popup display={true} title={title} top={0} close={close} orientation="landscape" isFull >
      <Video
        source={source}
        style={{width: '100%', height: '100%'}}
        controls={true}
        repeat={false}
        fullscreen={true}
        fullscreenAutorotate={true}
        ignoreSilentSwitch="ignore"
        resizeMode="contain"
      />
    </Popup>
  )

}