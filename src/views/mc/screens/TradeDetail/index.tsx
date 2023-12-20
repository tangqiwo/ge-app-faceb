/*
 * @Author: Galen.GE
 * @Date: 2023-12-19 23:15:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Text } from 'react-native';
import usePublicState from '@core/hooks/usePublicState';
import { LS as styles } from './style';

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
      <View>
        <Text style={styles.title}>挂单类型123</Text>
      </View>
    </View>
  );
};
