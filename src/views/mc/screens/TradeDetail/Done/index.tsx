/*
 * @Author: Galen.GE
 * @Date: 2023-12-19 23:15:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/Done/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text } from 'react-native';
import { LS as styles } from './style';
import usePublicState from '@core/hooks/usePublicState';

export default () => {

  const {navigation} = usePublicState();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: '市价',
      headerShown: true
    });
  }, [])

  return (
    <View style={styles.container}>
      <Text>
        DONE !
      </Text>
    </View>
  );
};
