/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 12:52:42
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/Placing/index.tsx
 * @Description: 挂单
 */
import _ from 'lodash';
import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text } from "react-native-animatable"
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { NoData } from '@template/components/Loader'
import usePublicState from '@core/hooks/usePublicState';
import { CMD_MAPPING } from '@core/hooks/trade/useTradeConnect';
import useTradeOperation from '@core/hooks/trade/useTradeOperation';
import { LS as styles, GS } from '../Position/style';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

export default () => {

  const { navigation } = usePublicState();
  const { cancelPendingOrder } = useTradeOperation();
  const instantOrders = useSelector((state: any) => state.trade.instantOrders);
  const mt4Info = useSelector((state: any) => state.trade.mt4Info);
  const [showButton, setShowButton] = React.useState(-1);

  const data = _.filter(instantOrders, (item: any) => _.includes([2, 3, 4, 5], item.Cmd))
  const instant = useSelector((state: any) => state.trade.instant);

  // 修改订单
  const handleSetStopLoss = (id: number, volume: number, symbol: string, cmd: number) => {
    navigation.navigate('TradeDetail', { type: 'updateOrder', id, volume, symbol, cmd })
  }

  return (
    <View style={{flex: 1, paddingBottom: GS.mixin.rem(60)}}>
      <ScrollView showsVerticalScrollIndicator={false} >
        { !mt4Info || (data && data.length === 0) && <NoData /> }
        {
          data && data.length > 0 &&
          data.map((item: any, index: number) =>
            <View style={styles.main} key={item.Ticket}>
              <MyTouchableOpacity activeOpacity={1} onPress={() => setShowButton(showButton === index ? -1 : index)}>
                <>
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
                    <Text style={styles.infoRed}>{_.find(instant, { Symbol: item.Symbol })?.Bid}</Text>
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
                      <Text style={styles.positionDate}>
                        { _.includes(item.Expiration, '1970') ? '撤单前有效' : dayjs(item.Expiration).format('YYYY-MM-DD HH:mm:ss') }
                      </Text>
                      <Text style={styles.positionDate}>{dayjs(item.OpenTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                    </View>
                  </View>
                </>
              </MyTouchableOpacity>
              {
                showButton === index &&
                <View style={styles.buttonBox}>
                  <MyTouchableOpacity style={styles.buttonYellow} onPress={() => cancelPendingOrder(item.Ticket)}>
                    <Text style={styles.buttonText}>撤销</Text>
                  </MyTouchableOpacity>
                  <MyTouchableOpacity style={styles.buttonBlack} onPress={() => handleSetStopLoss(item.Ticket, item.Volume, item.Symbol, item.Cmd)}>
                    <Text style={styles.buttonTextYellow}>修改订单</Text>
                  </MyTouchableOpacity>
                </View>
              }
            </View>
          )
        }
      </ScrollView>
    </View>
  )

}