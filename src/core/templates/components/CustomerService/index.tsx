/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-14 23:42:02
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/CustomerService/index.tsx
 * @Description:
 */

import React from 'react';
import { Image } from 'react-native';
import MyTouchableOpacity from '../MyTouchableOpacity';
import MyPortal from '../MyPortal';
import usePublicState from '@core/hooks/usePublicState';
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import { LS as styles } from './style';


export default () => {

  const { customerService } = usePublicState();
  const { forward } = useRouteWebCommon();

  if(!customerService) return (<></>)

  return (
    <MyPortal visible>
      <MyTouchableOpacity style={styles.container} onPress={() => forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService})}>
        <Image source={require('./i/icon.png')} style={styles.icon} />
      </MyTouchableOpacity>
    </MyPortal>
  )

}