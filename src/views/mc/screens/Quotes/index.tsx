/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 14:00:27
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Quotes/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from "react";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { INSTANT_QUOTES_STATUS_COLOR, INSTANT_QUOTES_STATUS_ICON } from '@core/hooks/useInstantQuotes';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { IStore } from '@schemas/redux-store';
import { LS as styles, GS } from './style';

export default () => {

  const insets = useSafeAreaInsets();
  const { instant, symbols } = useSelector((state: IStore) => state.quotes);

  return (
    <View style={styles.container}>
      <View style={{...styles.header, height: GS.mixin.rem(50) + insets.top}} >
        <Text style={{...styles.headerText, marginTop: insets.top}}>行情</Text>
      </View>
      <View style={styles.titleView}>
        <View style={styles.column1}>
          <Text style={styles.titleText}>产品</Text>
        </View>
        <View style={styles.column2}>
          <Text style={styles.titleText}>卖价</Text>
        </View>
        <View style={styles.column2}>
          <Text style={styles.titleText}>买价</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >
        {
          instant && instant.map((item) =>
            <View style={styles.contentView} key={item.Symbol}>
              <View style={[styles.column1, styles.contentItemView]}>
                <Text style={styles.contentItemViewText1}>{ _.find(symbols, {Key: item.Symbol}).Title }</Text>
                <Text style={styles.contentItemViewText2}>{item.Symbol}</Text>
              </View>
              <View style={[styles.column2, styles.contentItemView]}>
                <View style={{...styles.contentItemViewBack, backgroundColor: INSTANT_QUOTES_STATUS_COLOR[item.bidStatus]}}>
                  <Text style={styles.contentItemViewText3}>{INSTANT_QUOTES_STATUS_ICON[item.bidStatus]} {item.Bid}</Text>
                </View>
                <Text style={styles.contentItemViewText2}>最高{_.find(symbols, {Key: item.Symbol}).High}</Text>
              </View>
              <View style={[styles.column2, styles.contentItemView]}>
                <View style={{...styles.contentItemViewBack, backgroundColor: INSTANT_QUOTES_STATUS_COLOR[item.askStatus]}}>
                  <Text style={styles.contentItemViewText3}>{INSTANT_QUOTES_STATUS_ICON[item.askStatus]} {item.Ask}</Text>
                </View>
                <Text style={styles.contentItemViewText2}>最低{_.find(symbols, {Key: item.Symbol}).Low}</Text>
              </View>
            </View>
          )
        }
      </ScrollView>
    </View>
  )

}