/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2024-06-06 23:36:29
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Forward/index.tsx
 * @Description:
 */

import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';

export default () => {

  const route = useRoute();
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    if(route.name === 'Trade-Demo'){
      navigation.replace('Root', { screen: 'Trade', params: { type: 'demo' } });
      return;
    }
  }, [])

  return (<></>)

}