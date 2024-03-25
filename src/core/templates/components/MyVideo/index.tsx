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

interface IProps {
  source: any,
  close: Function
  title: string
}
export default ({ source, close, title }: IProps) => {

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