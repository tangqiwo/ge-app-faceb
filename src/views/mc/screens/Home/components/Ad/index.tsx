/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 15:51:39
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Ad/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { INSTANT_QUOTES_STATUS_COLOR } from '@core/hooks/useInstantQuotes';
import { View, Text, Image } from 'react-native'
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useInstantQuotes from '@core/hooks/useInstantQuotes';
import { LS } from './style';
import usePublicState from '@core/hooks/usePublicState';

const styles = LS.ad;

export default (() => {

  const { instantQuotes } = useInstantQuotes();
  const { navigation } = usePublicState();

  const gold = _.find(instantQuotes, {Symbol: 'XAUUSDpro'});
  const silver = _.find(instantQuotes, {Symbol: 'XAGUSDpro'});

  return (
    <View style={styles.container}>
      <MyTouchableOpacity style={styles.item} onPress={() => navigation.navigate('KLine', { symbol: 'XAUUSDpro' })} >
        <Image source={require('./i/G.png')} style={styles.itemImage} />
        <View style={styles.itemText}>
          <Text style={styles.itemTextTitle}>现货黄金</Text>
          <Text style={{...styles.itemTextPrice, color: INSTANT_QUOTES_STATUS_COLOR[gold?.bidStatus]}}>{gold?.Bid?.toFixed(2) || '0000.00'}</Text>
          <View style={styles.itemTextPriceUnit}>
            <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[gold?.bidStatus]}}>
              {gold?.changeValue > 0 && '+'}
              {gold?.changeValue?.toFixed(2) || '0.00'}
            </Text>
            <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[gold?.bidStatus]}}>
              {gold?.changeValue > 0 && '+'}
              {gold?.changePercent ? `${gold.changePercent}%` : '0.00%'}
            </Text>
          </View>
        </View>
      </MyTouchableOpacity>
      <MyTouchableOpacity style={styles.item} onPress={() => navigation.navigate('KLine', { symbol: 'XAGUSDpro' })}>
        <Image source={require('./i/Y.png')} style={styles.itemImage} />
        <View style={styles.itemText}>
          <Text style={styles.itemTextTitle}>现货白银</Text>
          <Text style={{...styles.itemTextPrice, color: INSTANT_QUOTES_STATUS_COLOR[silver?.bidStatus]}}>{silver?.Bid?.toFixed(3) || '0000.00'}</Text>
          <View style={styles.itemTextPriceUnit}>
            <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[silver?.bidStatus]}}>
              {silver?.changeValue > 0 && '+'}
              {silver?.changeValue?.toFixed(3) || '0.00'}
            </Text>
            <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[silver?.bidStatus]}}>
              {silver?.changeValue > 0 && '+'}
              {silver?.changePercent ? `${silver.changePercent}%` : '0.00%'}
            </Text>
          </View>
        </View>
      </MyTouchableOpacity>
    </View>
  )

})