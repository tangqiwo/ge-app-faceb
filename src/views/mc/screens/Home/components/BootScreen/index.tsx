/*
 * @Author: Galen.GE
 * @Date: 2024-01-29 12:46:01
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/BootScreen/index.tsx
 * @Description: 启动页
 */
import _ from 'lodash';
import React from 'react';
import { Image} from 'react-native';
import { useSelector } from 'react-redux';
import Overlay from '@core/templates/components/Overlay';
import usePublicState from '@core/hooks/usePublicState';

export default () => {

  const appDisplayConfig = useSelector((state: any) => state.base.appDisplayConfig);
  const {ossDomain, navigation} = usePublicState();
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    if(_.isEmpty(appDisplayConfig) || !ossDomain){
      return;
    }
    if(ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Root', screen: 'Home' }],
      });
    }, 3000)
  }, [appDisplayConfig, ossDomain])

  if(_.isEmpty(appDisplayConfig) || !ossDomain){
    return <></>;
  }

  return (
    <Overlay zIndex={1000} display>
      <Image
        source={{uri: ossDomain + appDisplayConfig?.LaunchImages[0].Image}}
        style={{width: '100%', height: '100%'}}
      />
    </Overlay>
  )
}