/*
 * @Author: Galen.GE
 * @Date: 2024-01-29 12:46:01
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/BootScreen/index.tsx
 * @Description: 启动页
 */
import _ from 'lodash';
import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import usePublicState from '@core/hooks/usePublicState';
import Overlay from '@core/templates/components/Overlay';
import Privacy from '../Privacy';
import G from '@constants/global'
import store from '@helpers/storage'

interface IProps {
  close: () => void;
}
export default ({close}: IProps) => {

  const appDisplayConfig = useSelector((state: any) => state.base.appDisplayConfig);
  const {ossDomain, cacheReady} = usePublicState();
  const ref = React.useRef<any>(null);
  const [ realPath, setRealPath ] = React.useState<string>('');
  const [ showPrivacy, setShowPrivacy ] = React.useState(false);
  const [ isClose, setIsClose ] = React.useState(false);

  React.useEffect(() => {
    if(G.GET('INIT_BOOT_SCREEN')){
      setIsClose(true)
    }
    return () => {
      if(ref.current) clearTimeout(ref.current);
    }
  }, [])

  React.useEffect(() => {
    if(isClose && !showPrivacy){
      close();
    }
  }, [isClose, showPrivacy])

  React.useEffect(() => {
    if(cacheReady){
      const isAgreePrivacy = store.get('IS_AGREE_PRIVACY');
      if(!isAgreePrivacy){
        setShowPrivacy(true)
      }
    }
  }, [cacheReady])

  React.useEffect(() => {
    if(_.isEmpty(appDisplayConfig) || !ossDomain || G.GET('INIT_BOOT_SCREEN')){
      return;
    }
    setRealPath(ossDomain + appDisplayConfig?.LaunchImages[0]?.Image)
    if(ref.current) clearTimeout(ref.current);
    ref.current = _.delay(() => {
      G.SET('INIT_BOOT_SCREEN', true);
      setIsClose(true);
    }, 3000)
  }, [appDisplayConfig, ossDomain])

  if(!realPath){
    return <></>
  }

  return (
    <Overlay display zIndex={100}>
      {
        !_.isEmpty(appDisplayConfig) &&
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: realPath}}
        />
      }
      {
        showPrivacy &&
        <Privacy setShowPrivacy={setShowPrivacy} />
      }
    </Overlay>
  )
}