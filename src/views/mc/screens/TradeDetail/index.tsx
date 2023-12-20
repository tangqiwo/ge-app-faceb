/*
 * @Author: Galen.GE
 * @Date: 2023-12-19 23:15:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/index.tsx
 * @Description:
 */
import React from 'react';
import usePublicState from '@core/hooks/usePublicState';
import { View, Text } from 'react-native';

export default () => {

  const { navigation } = usePublicState();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (<Text>123</Text>),
      headerShown: true
    });
  }, [])

  return (
    <View>

    </View>
  )

}