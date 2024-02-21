/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 12:52:42
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/Position/index.tsx
 * @Description: 挂单
 */
import _ from 'lodash';
import React from 'react';
import { FlatList } from 'react-native';
import { View, Text } from "react-native-animatable"
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { NoData } from '@template/components/Loader'
import usePublicState from '@core/hooks/usePublicState';
import { CMD_MAPPING } from '@core/hooks/trade/useTradeConnect';
import { ListFooterComponent } from '@this/screens/Home/components/Strategy'
import { LS as styles, GS } from '../Position/style';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

export default () => {

  const { navigation } = usePublicState();
  const instantOrders = useSelector((state: any) => state.trade.instantOrders);
  const instant = useSelector((state: any) => state.trade.instant);
  const mt4Info = useSelector((state: any) => state.trade.mt4Info);
  const [showButton, setShowButton] = React.useState(-1);
  const [max, setMax] = React.useState<any>(5);
  const [isloading, setIsloading] = React.useState(false);

  const data = _.filter(instantOrders, (item: any) => _.includes([0, 1], item.Cmd))

  const nextPage = () => {
    if(isloading || max === data.length){
      return
    }
    setIsloading(true);
    _.delay(() => {
      setIsloading(false);
      setMax(max + 3);
    }, 1000)
  }

  const handleClosePosition = (id: number, volume: number, symbol: string, cmd: number) => {
    setShowButton(-1);
    navigation.navigate('TradeDetail', { type: 'closePosition', id, volume, symbol, cmd })
  }

  // 设置止盈止损
  const handleSetStopLoss = (id: number, volume: number, symbol: string, cmd: number, Sl: string, Tp: string) => {
    setShowButton(-1);
    navigation.navigate('TradeDetail', { type: 'setStopLoss', id, volume, symbol, cmd, ex: {Sl, Tp} })
  }

  return (
    <View style={{flex: 1, paddingBottom: GS.mixin.rem(60)}}>
        { !mt4Info || (data && data.length === 0) && <NoData /> }
        {
          data && data.length > 0 &&
          <FlatList
            data={_.take(data, max)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item.Ticket}
            onEndReached={nextPage}
            ListFooterComponent={
              max >= data.length ?
                <ListFooterComponent type='end' /> :
              isloading ?
                <ListFooterComponent type='loading' /> :
                <ListFooterComponent type='none' />
            }
            renderItem={({item, index}) => (
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
                        {
                          item.Profit != 0 &&
                          <Text style={styles.moneyText}>{Number(item.Profit).toFixed(2)}</Text>
                        }
                      </View>
                    </View>
                    <View style={styles.spaceBetween}>
                      <View style={styles.positionLeft}>
                        <View style={styles.spaceBetween}>
                          <View style={[styles.half]}>
                            <Text style={styles.grey}>利息:{item.Swaps}</Text>
                          </View>
                          <View style={[styles.half]}>
                            <Text style={styles.grey}>手续费:{item.Commission}</Text>
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
                      </View>
                    </View>
                  </>
                </MyTouchableOpacity>
                {
                  showButton === index &&
                  <View style={styles.buttonBox}>
                    <MyTouchableOpacity style={styles.buttonYellow} onPress={() => handleClosePosition(item.Ticket, item.Volume, item.Symbol, item.Cmd)}>
                      <Text style={styles.buttonText}>平仓</Text>
                    </MyTouchableOpacity>
                    <MyTouchableOpacity style={styles.buttonBlack} onPress={() => handleSetStopLoss(item.Ticket, item.Volume, item.Symbol, item.Cmd, item.Sl, item.Tp)}>
                      <Text style={styles.buttonTextYellow}>设置止盈止损</Text>
                    </MyTouchableOpacity>
                    {/* <MyTouchableOpacity style={styles.buttonWhite} onPress={() => navigation.navigate('KLine', { symbol: item.Symbol })}>
                      <Text>图表</Text>
                    </MyTouchableOpacity> */}
                  </View>
                }
              </View>
            )}
          />
        }
    </View>
  )

}