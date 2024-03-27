/**
 * Sample React Native App
 *
 * adapted from App.js generated by the following command:
 *
 * react-native init example
 *
 * https://github.com/facebook/react-native
 */
// @ts-nocheck

import _ from 'lodash';
import React from 'react';
import { useLatest } from 'react-use';
import { View, Text, SafeAreaView, StatusBar, Appearance, Platform} from 'react-native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import {useSelector} from 'react-redux';
import { useRoute } from '@react-navigation/native';
import ByronKlineChart from 'react-native-kline';
import {dispatchByronKline, KLineIndicator} from 'react-native-kline';
import usePublicState from '@core/hooks/usePublicState';
import useKlineData from '@core/hooks/trade/useKlineData';
import useInstantQuotes from '@core/hooks/useInstantQuotes';
import useAuth from '@core/hooks/useAuth';
import Icon from '@icon/index';
import {IStore} from '@schemas/redux-store';
import axios from 'axios';
import { LS as styles, GS } from './style';
import dayjs from 'dayjs';

export default () => {

  const route = useRoute<any>();
  const {
    getKlineData,
    sendMessage,
    setNewKlineData,
    dataInsertTarget,
    newKlineData,
    currentTimeframe,
    data
  } = useKlineData({Symbol: route.params?.symbol});
  const dataLatest = useLatest(data);

  const { navigation } = usePublicState();
  const Mt4ClientApiToken = useSelector((state: any) => state.trade?.mt4Info?.Mt4ClientApiToken);
  const [list, setList] = React.useState([]);
  const [viewHeight, setViewHeight] = React.useState(0);
  const symbols = useSelector((state: IStore) => state.quotes.symbols);
  const { instantQuotes } = useInstantQuotes();
  const [currentSymbol, setCurrentSymbol] = React.useState(route.params?.symbol);
  const [currentTimeFrame, setCurrentTimeFrame] = React.useState('M1');
  const [currentChildIndicator, setCurrentChildIndicator] = React.useState(KLineIndicator.ChildKDJ);
  const { requestAuth } = useAuth();
  const wsRef = React.useRef(null);

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle(Appearance.getColorScheme() === 'dark' ? 'light-content' : 'dark-content');
      wsRef.current && wsRef.current.close();
    }
  }, [])

  React.useEffect(() => {
    dataInsertTarget.current = false;
    currentTimeframe.current = currentTimeFrame;
    sendMessage(JSON.stringify({
      Symbol: route.params?.symbol,
      Timeframe: currentTimeFrame
    }))
  }, [currentTimeFrame])

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height)
  };

  React.useEffect(() => {
    if(newKlineData) {
      if(newKlineData.Timeframe !== currentTimeFrame) {
        return;
      }
      dispatchByronKline('update',[_.omit(newKlineData, ['Timeframe'])]);
    }
  }, [newKlineData, currentSymbol])

  const goBuy = requestAuth(() => {
    if(Mt4ClientApiToken){
      navigation.navigate('TradeDetail', { type: 'buy', symbol: route.params?.symbol });
      return;
    }
    navigation.navigate('Root', { screen: 'Trade' });
  })

  const goSell = requestAuth(() => {
    if(Mt4ClientApiToken){
      navigation.navigate('TradeDetail', { type: 'sell', symbol: route.params?.symbol });
      return;
    }
    navigation.navigate('Root', { screen: 'Trade' });
  })

  const symbolPrice = _.find(instantQuotes, {Symbol: currentSymbol});
  const symbolSummary = _.find(symbols, {Key: currentSymbol});

  const toFixedBit = route.params?.symbol === 'XAUUSDpro' ? 2 : 3;

  return (
    <View style={{...styles.container, paddingTop: Platform.OS === 'android' ? 20 : 0}}>
      <SafeAreaView style={[styles.container]}>
        <View style={{...styles.header}}>
          <Icon.Font name='arrow-left' type={Icon.T.FontAwesome5} onPress={() => navigation.goBack()} style={styles.arrowBack} size={GS.mixin.rem(16)} />
          <MyTouchableOpacity style={styles.headerTitleViwe} onPress={() => navigation.goBack()}>
            <Text style={styles.headerTitleViewText}>{currentSymbol}</Text>
          </MyTouchableOpacity>
        </View>
        <View style={styles.infos}>
          <View style={styles.priceNow}>
            <Text style={{...styles.itemTextPrice, color: INSTANT_QUOTES_STATUS_COLOR[symbolPrice?.askStatus]}}>{Number(newKlineData?.close || symbolPrice?.Bid)?.toFixed(toFixedBit) || '0000.00'}</Text>
            <View style={styles.itemTextPriceUnit}>
              <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[symbolPrice?.askStatus]}}>
                {symbolPrice?.changeValue > 0 && '+'}
                {Number(symbolPrice?.changeValue)?.toFixed(toFixedBit) || '0.000'}
              </Text>
              <Text style={{...styles.itemTextPriceUnitText, color: INSTANT_QUOTES_STATUS_COLOR[symbolPrice?.askStatus]}}>
                {symbolPrice?.changeValue > 0 && '+'}
                {symbolPrice?.changePercent ? `${Number(symbolPrice?.changePercent)?.toFixed(2)}%` : '0.00%'}
              </Text>
            </View>
          </View>
          {
            // <View style={styles.priceYestoday}>
            //   <View style={styles.priceYestodayItem}>
            //     <Text style={styles.priceYestodayItemText}>开盘 {symbolSummary.Open.toFixed(toFixedBit)}</Text>
            //     <Text style={styles.priceYestodayItemText}>最高 {symbolSummary.High.toFixed(toFixedBit)}</Text>
            //   </View>
            //   <View style={styles.priceYestodayItem}>
            //     <Text style={styles.priceYestodayItemText}>昨收 {symbolSummary.Close.toFixed(toFixedBit)}</Text>
            //     <Text style={styles.priceYestodayItemText}>最低 {symbolSummary.Low.toFixed(toFixedBit)}</Text>
            //   </View>
            // </View>
          }
        </View>
        <View style={styles.timeFrame}>
          {
            TIMEFRAME_LIST.map((item, index) => (
              <MyTouchableOpacity
                key={index}
                style={[styles.timeFrameItem, currentTimeFrame === item.value && styles.timeFrameActive]}
                onPress={() => setCurrentTimeFrame(item.value)}
              >
                <Text style={[styles.timeFrameItemText, currentTimeFrame === item.value && styles.timeFrameItemTextActive]}>{item.label}</Text>
              </MyTouchableOpacity>
            ))
          }
        </View>
        <View onLayout={onLayout} style={{flex: 1}}>
          {
            data.length > 0 &&
            <ByronKlineChart
              key={viewHeight}
              style={{height: viewHeight}}
              datas={data}
              indicators={[KLineIndicator.MainMA, currentChildIndicator]}
              mainBackgroundColor={'#0f1826'}
              pricePrecision={toFixedBit}
            />
          }
        </View>
        <View style={styles.timeFrame}>
          {
            KLineIndicatorList.map((item, index) => (
              <MyTouchableOpacity
                key={index}
                style={[styles.timeFrameItem]}
                onPress={() => setCurrentChildIndicator(item.value)}
              >
                <Text style={[styles.timeFrameItemText, currentChildIndicator === item.value && styles.timeFrameItemTextActive]}>{item.label}</Text>
              </MyTouchableOpacity>
            ))
          }
        </View>
        <View style={styles.footer}>
          <MyTouchableOpacity style={styles.actionBtn} onPress={goBuy}>
            <Text style={styles.actionBtnText}>买入</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={{...styles.actionBtn, backgroundColor: '#d44b66'}} onPress={goSell}>
            <Text style={styles.actionBtnText}>卖出</Text>
          </MyTouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}


const INSTANT_QUOTES_STATUS_COLOR = {
  UP: '#05ad90',
  DOWN: '#da485e',
  FLAT: '#05ad90',
}


// 时分选择
const TIMEFRAME_LIST = [
  {value: 'M1', label: '1分'},
  {value: 'M5', label: '5分'},
  {value: 'M30', label: '30分'},
  {value: 'H1', label: '1小时'},
  {value: 'D1', label: '日K'},
  {value: 'W1', label: '周K'},
  {value: 'MN1', label: '月K'},
]

// 子图指标
const KLineIndicatorList = [
  {value: KLineIndicator.ChildKDJ, label: 'KDJ'},
  {value: KLineIndicator.ChildMACD, label: 'MACD'},
  {value: KLineIndicator.ChildRSI, label: 'RSI'},
  {value: KLineIndicator.ChildWR, label: 'WR'},
  {value: KLineIndicator.ChildNONE, label: 'NONE'},
]
