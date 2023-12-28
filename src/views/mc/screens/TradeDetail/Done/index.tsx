/*
 * @Author: Galen.GE
 * @Date: 2023-12-19 23:15:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/Done/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, Image } from 'react-native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
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
      <Image source={require('./i/market.png')} style={styles.image}/>
      <View style={styles.main}>
        <View style={styles.date}>
          <Text style={styles.dateText}>2023-10-30 23:22:38 GMT+0800</Text>
          <Text style={styles.dateText}> (中国标准时间)</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.left}>
            <View style={styles.item}>
              <Text style={styles.grey}>单号： </Text>
              <Text>10015</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.grey}>价格： </Text>
              <Text>10015</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.grey}>方向： </Text>
              <Text>卖出</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.grey}>止盈： </Text>
              <Text>10015</Text>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.item}>
              <Text style={styles.grey}>类型： </Text>
              <Text>平仓</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.grey}>产品： </Text>
              <Text>XAUUSDpro</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.grey}>手数： </Text>
              <View style={styles.item}>
                <Text>0.01</Text>
                <Text>手</Text>
              </View>
            </View>
            <View style={styles.item}>
              <Text style={styles.grey}>止损： </Text>
              <Text>10015</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <MyTouchableOpacity style={styles.buttonBlack}>
          <Text style={styles.buttonTextYellow}>查看持仓</Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity style={styles.buttonYellow}>
          <Text style={styles.buttonText}>继续交易</Text>
        </MyTouchableOpacity>
      </View> 
    </View>
  );
};
