/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 15:51:39
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Ad/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { INSTANT_QUOTES_STATUS_COLOR } from '@core/hooks/useInstantQuotes';
import {IStore} from '@schemas/redux-store';
import { View, Text, Image } from 'react-native'
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { GS, LS } from './style';
import usePublicState from '@core/hooks/usePublicState';

const styles = LS.ad;

export default (() => {

  const instant = useSelector((state: IStore) => state.quotes.instant);
  const { navigation } = usePublicState();

  const gold = _.find(instant, {Symbol: 'XAUUSD'});
  const silver = _.find(instant, {Symbol: 'XAGUSD'});

  return (
    <View style={styles.container}>
      <MyTouchableOpacity style={styles.item} onPress={() => navigation.navigate('KLine', { symbol: 'XAUUSDpro' })} >
        <Image source={require('./i/G.png')} style={styles.itemImage} />
        <View style={styles.itemText}>
          <Text style={styles.itemTextTitle}>现货黄金</Text>
          <Text style={{...styles.itemTextPrice, color: INSTANT_QUOTES_STATUS_COLOR[gold?.askStatus]}}>{gold?.Ask?.toFixed(2) || '0000.00'}</Text>
          <View style={styles.itemTextPriceUnit}>
            <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[gold?.askStatus]}}>
              {gold?.changeValue?.toFixed(2) || '0.00'}
            </Text>
            <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[gold?.askStatus]}}>
              {gold?.changePercent ? `${gold.changePercent}%` : '0.00%'}
            </Text>
          </View>
        </View>
      </MyTouchableOpacity>
      <MyTouchableOpacity style={styles.item} onPress={() => navigation.navigate('KLine', { symbol: 'XAGUSDpro' })}>
        <Image source={require('./i/Y.png')} style={styles.itemImage} />
        <View style={styles.itemText}>
          <Text style={styles.itemTextTitle}>现货白银</Text>
          <Text style={{...styles.itemTextPrice, color: INSTANT_QUOTES_STATUS_COLOR[silver?.askStatus]}}>{silver?.Ask?.toFixed(3) || '0000.00'}</Text>
          <View style={styles.itemTextPriceUnit}>
            <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[silver?.askStatus]}}>
            {silver?.changeValue?.toFixed(3) || '0.00'}
            </Text>
            <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[silver?.askStatus]}}>
              {silver?.changePercent ? `${silver.changePercent}%` : '0.00%'}
            </Text>
          </View>
        </View>
      </MyTouchableOpacity>
    </View>
  )

})