/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 12:52:42
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/TradeHistory/index.tsx
 * @Description: 挂单
 */
import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from "react-native-animatable"
import useTradeOperation from '@core/hooks/trade/useTradeOperation';
import { NoData, SkeletonLoader } from '@template/components/Loader'
import { CMD_MAPPING } from '@core/hooks/trade/useTradeConnect';
import { LS as styles, GS } from '../Position/style';
import dayjs from 'dayjs';

export default () => {

  const { getHistoryOrders, data } = useTradeOperation();

  React.useEffect(() => {
    getHistoryOrders()
  }, [])

  return (
    <View style={{flex: 1, paddingBottom: GS.mixin.rem(60)}}>
      <ScrollView showsVerticalScrollIndicator={false} >
        { !data && <SkeletonLoader /> }
        { data && data.length === 0 && <NoData /> }
        {
          data && data.length > 0 &&
          data.map((item: any, index: number) =>
            <View style={styles.main} key={item.Ticket}>
              <View style={styles.spaceBetween}>
                <Text style={styles.title}>{item.Symbol || '----'}</Text>
                <View style={styles.variety}>
                  <Text style={styles.grey}>{CMD_MAPPING[item.Cmd]}</Text>
                  <Text style={styles.grey}>{(item.Volume / 100).toFixed(2)}</Text>
                  <Text style={styles.grey}>手</Text>
                  <Text style={styles.order}>#{item.Ticket}</Text>
                </View>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.info}>{item.OpenPrice}</Text>
                <Text style={styles.arrow}>{'\u2192'}</Text>
                <Text style={styles.infoRed}>{item.ClosePrice}</Text>
                <View style={styles.money}>
                  <Text style={styles.moneyText}>{item.Profit}</Text>
                </View>
              </View>
              <View style={styles.spaceBetween}>
                <View style={styles.positionLeft}>
                  <View style={styles.spaceBetween}>
                    <View style={[styles.half]}>
                      <Text style={styles.grey}>利息:{item.Swaps}</Text>
                    </View>
                    <View style={[styles.half]}>
                      <Text style={styles.grey}>佣金:{item.Commission}</Text>
                    </View>
                  </View>
                  <View style={styles.spaceBetween}>
                    <View style={[styles.half]}>
                      <Text style={styles.grey}>止损:{item.Sl}</Text>
                    </View>
                    <View style={[styles.half]}>
                      <Text style={styles.grey}>止盈:{item.Tp}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.positionRight}>
                  <Text style={styles.positionDate}>{dayjs(item.OpenTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                  <Text style={styles.positionDate}>{dayjs(item.CloseTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </View>
              </View>
            </View>
          )
        }
      </ScrollView>
    </View>
  )

}