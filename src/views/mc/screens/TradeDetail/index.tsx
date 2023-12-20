/*
 * @Author: Galen.GE
 * @Date: 2023-12-19 23:15:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Text, Image } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.dropItem}>
        <Text>挂单类型</Text>
        <View style={styles.dropMenu}>
          <Text style={styles.dropText}>买入限价</Text>
          <Image source={require('./i/ic-drop.png')} style={styles.dropIcon} />
        </View>
      </View>
      <View style={styles.dropItem}>
        <Text>有效期</Text>
        <View style={[styles.dropMenu, styles.dropWireframe]}>
          <Text style={styles.dropText}>撤单前有效</Text>
          <Image source={require('./i/ic-drop.png')} style={styles.dropIcon} />
        </View>
      </View>
      <View style={styles.optionsItem}>
        <Text>价格 ≤ 23.40</Text>
        <View style={styles.optionsMenu}>
          <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
          <Text style={styles.optionsNumber}>23.30</Text>
          <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
          <Text style={styles.optionsText}>重置</Text>
        </View>
      </View>
      <View style={styles.optionsItem}>
        <Text>交易手数</Text>
        <View style={styles.optionsMenu}>
          <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
          <Text style={styles.optionsNumber}>0.01</Text>
          <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
          <Text style={styles.optionsText}>重置</Text>
        </View>
      </View>
      <View style={styles.optionsItem}>
        <View style={[styles.frequency, styles.frequencyActive]}>
          <Text style={styles.frequencyActiveText}>0.1手</Text>
          <Image source={require('./i/ic-check.png')} style={styles.checkIcon} />
        </View>
        <View style={styles.frequency}><Text>0.3手</Text></View>
        <View style={styles.frequency}><Text>0.5手</Text></View>
        <View style={styles.frequency}><Text>1手</Text></View>
        <View style={styles.frequency}><Text>2手</Text></View>
      </View>
      <View style={styles.dropItem}>
        <View style={styles.refer}>
          <Text>参考预付款：</Text>
          <Text>9.9</Text>
        </View>
        <View style={styles.refer}>
          <Text>可用预付款：</Text>
          <Text>1000.00</Text>
        </View>
      </View>
      <View style={{...styles.optionsItem, borderBottomWidth: 1,borderBottomColor: '#EBEBEB',}}>
        <Text>止损</Text>
        <View style={styles.optionsMenu}>
          <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
          <Text style={styles.optionsNumber}>0.01</Text>
          <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
          <Text style={styles.optionsText}>清空</Text>
        </View>
      </View>
      <View style={{...styles.optionsItem, borderBottomWidth: 1,borderBottomColor: '#EBEBEB',}}>
        <Text>止盈</Text>
        <View style={styles.optionsMenu}>
          <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
          <Text style={styles.optionsNumber}>未设置</Text>
          <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
          <Text style={styles.optionsText}>清空</Text>
        </View>
      </View>
      <View style={styles.submit}>
        <Text style={styles.submitText}>提交</Text>
      </View>
      <Text style={styles.submitTips}>*市价模式下是成交价格，可能会与请求价格有一定差异</Text>
    </View>
  );
};
