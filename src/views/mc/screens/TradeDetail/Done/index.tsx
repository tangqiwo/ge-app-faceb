/*
 * @Author: Galen.GE
 * @Date: 2023-12-19 23:15:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/Done/index.tsx
 * @Description:
 */
import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { CMD_MAPPING } from '@core/hooks/trade/useTradeConnect';
import { LS as styles } from './style';
import usePublicState from '@core/hooks/usePublicState';

export default () => {

  const {navigation} = usePublicState();
  const route = useRoute<any>();

  const data = route.params?.data || {};

  const date = React.useRef(dayjs(data.OpenTime || _.now()).format('YYYY-MM-DD HH:mm:ss'))

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.data?.Type || '交易详情',
      headerShown: true
    });
  }, [])

  const backToHistory = () => {
    if(route.params?.data?.Type === '查看挂单') {
      navigation.navigate('Root', {screen: 'Trade', params: {tab: 1}})
      return;
    }
    navigation.navigate('Root', {screen: 'Trade', params: {tab: 0}})
  }

  const price = route.params?.data?.Type === '平仓' ? data.ClosePrice : data.OpenPrice

  return (
    <View style={styles.container}>
      <Image source={require('./i/market.png')} style={styles.image}/>
      <View style={styles.main}>
        <View style={styles.date}>
          <Text style={styles.dateText}>{date.current}</Text>
          <Text style={styles.dateText}> GMT+0800 (中国标准时间)</Text>
        </View>
        {
          route.params?.data?.Type === '平仓' &&
          <View style={styles.content}>
            <View style={styles.left}>
              <View style={styles.item}>
                <Text style={styles.grey}>单号： </Text>
                <Text>{data.Ticket}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>方向： </Text>
                <Text>{CMD_MAPPING[data.Cmd]}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>开仓： </Text>
                <Text>{data.OpenPrice}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>手数： </Text>
                <View style={styles.item}>
                  <Text>{data.Volume}</Text>
                  <Text>手</Text>
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>止盈： </Text>
                <Text>
                  {
                    data.Symbol.includes('XAU') ?
                    Number(data.Tp)?.toFixed(2) :
                    Number(data.Tp)?.toFixed(3)
                  }
                </Text>
              </View>
            </View>
            <View style={styles.right}>
              <View style={styles.item}>
                <Text style={styles.grey}>类型： </Text>
                <Text>{route.params?.data?.Type === '查看挂单' ? '创建挂单' : route.params?.data?.Type}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>产品： </Text>
                <Text>{data.Symbol}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>平仓： </Text>
                <Text>{data.ClosePrice}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>盈亏： </Text>
                <Text>
                  {
                    Number(data.Profit)?.toFixed(2)
                  }
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>止损： </Text>
                <Text>
                  {
                    data.Symbol.includes('XAU') ?
                    Number(data.Sl)?.toFixed(2) :
                    Number(data.Sl)?.toFixed(3)
                  }
                </Text>
              </View>
            </View>
          </View>
        }
        {
          route.params?.data?.Type !== '平仓' &&
          <View style={styles.content}>
            <View style={styles.left}>
              <View style={styles.item}>
                <Text style={styles.grey}>单号： </Text>
                <Text>{data.Ticket}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>价格： </Text>
                <Text>
                  {
                    data.Symbol.includes('XAU') ?
                    Number(price)?.toFixed(2) :
                    Number(price)?.toFixed(3)
                  }
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>方向： </Text>
                <Text>{CMD_MAPPING[data.Cmd]}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>止盈： </Text>
                <Text>
                  {
                    data.Symbol.includes('XAU') ?
                    Number(data.Tp)?.toFixed(2) :
                    Number(data.Tp)?.toFixed(3)
                  }
                </Text>
              </View>
            </View>
            <View style={styles.right}>
              <View style={styles.item}>
                <Text style={styles.grey}>类型： </Text>
                <Text>{route.params?.data?.Type === '查看挂单' ? '创建挂单' : route.params?.data?.Type}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>产品： </Text>
                <Text>{data.Symbol}</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>手数： </Text>
                <View style={styles.item}>
                  <Text>{data.Volume}</Text>
                  <Text>手</Text>
                </View>
              </View>
              <View style={styles.item}>
                <Text style={styles.grey}>止损： </Text>
                <Text>
                  {
                    data.Symbol.includes('XAU') ?
                    Number(data.Sl)?.toFixed(2) :
                    Number(data.Sl)?.toFixed(3)
                  }
                </Text>
              </View>
            </View>
          </View>
        }

      </View>
      <View style={styles.button}>
        <MyTouchableOpacity style={styles.buttonBlack} onPress={backToHistory}>
          <Text style={styles.buttonTextYellow}>
            {
              route.params?.data?.Type === '查看挂单' ? '查看挂单' : '查看持仓'
            }
          </Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity style={styles.buttonYellow} onPress={() => navigation.navigate('TradeDetail')}>
          <Text style={styles.buttonText}>继续交易</Text>
        </MyTouchableOpacity>
      </View>
    </View>
  );
};
