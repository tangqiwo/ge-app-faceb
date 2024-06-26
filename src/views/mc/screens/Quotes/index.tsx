/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 14:00:27
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Quotes/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from "react";
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePublicState from '@core/hooks/usePublicState';
import { INSTANT_QUOTES_STATUS_COLOR, INSTANT_QUOTES_STATUS_ICON } from '@core/hooks/useInstantQuotes';
import { View, Text, ScrollView, TouchableWithoutFeedback, StatusBar, Appearance } from 'react-native';
import { useSelector } from 'react-redux';
import WebView from "@core/templates/components/WebView";
import useInstantQuotes from '@core/hooks/useInstantQuotes';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { IStore } from '@schemas/redux-store';
import { LS as styles, GS } from './style';

export default () => {

  const insets = useSafeAreaInsets();
  const { instantQuotes } = useInstantQuotes();
  const { symbols } = useSelector((state: IStore) => state.quotes);
  const { navigation } = usePublicState();
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle(Appearance.getColorScheme() === 'dark' ? 'light-content' : 'dark-content');
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={{...styles.header, height: GS.mixin.rem(40) + insets.top, marginTop: Platform.OS === 'android' ? GS.mixin.rem(15) : 0}} >
        <View style={styles.tabsVeiw}>
          <MyTouchableOpacity style={[styles.tabsItem, tab === 0 && styles.tabsItemActive]} onPress={() => setTab(0)}>
            <Text style={[styles.tabsItemText, tab === 0 && styles.tabsItemTextActive]}>交易产品</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, tab === 1 && styles.tabsItemActive]} onPress={() => setTab(1)}>
            <Text style={[styles.tabsItemText, tab === 1 && styles.tabsItemTextActive]}>新闻快讯</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, tab === 2 && styles.tabsItemActive]} onPress={() => setTab(2)}>
            <Text style={[styles.tabsItemText, tab === 2 && styles.tabsItemTextActive]}>财经日历</Text>
          </MyTouchableOpacity>
        </View>
      </View>
      {
        tab === 0 && symbols &&
        <>
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
              instantQuotes && instantQuotes.map((item: any) =>
                <TouchableWithoutFeedback style={styles.contentView} key={item.Symbol} onPress={() => navigation.navigate('KLine', { symbol: item.Symbol })}>
                  <View style={styles.contentView}>
                    <View style={[styles.column1, styles.contentItemView]}>
                      <Text style={styles.contentItemViewText1}>{ _.find(symbols, {Key: item.Symbol}).Title }</Text>
                      <Text style={styles.contentItemViewText2}>{item.Symbol}</Text>
                    </View>
                    <View style={[styles.column2, styles.contentItemView]}>
                      <View style={{...styles.contentItemViewBack, backgroundColor: INSTANT_QUOTES_STATUS_COLOR[item.bidStatus]}}>
                        <Text style={styles.contentItemViewText3}>{INSTANT_QUOTES_STATUS_ICON[item.bidStatus]} {item.Bid.toFixed(toFixNumber[item.Symbol])}</Text>
                      </View>
                      {/* <Text style={styles.contentItemViewText2}>最高{_.find(symbols, {Key: item.Symbol}).High.toFixed(toFixNumber[item.Symbol])}</Text> */}
                    </View>
                    <View style={[styles.column2, styles.contentItemView]}>
                      <View style={{...styles.contentItemViewBack, backgroundColor: INSTANT_QUOTES_STATUS_COLOR[item.askStatus]}}>
                        <Text style={styles.contentItemViewText3}>{INSTANT_QUOTES_STATUS_ICON[item.askStatus]} {item.Ask.toFixed(toFixNumber[item.Symbol])}</Text>
                      </View>
                      {/* <Text style={styles.contentItemViewText2}>最低{_.find(symbols, {Key: item.Symbol}).Low.toFixed(toFixNumber[item.Symbol])}</Text> */}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              )
            }
          </ScrollView>
        </>
      }
      {
        tab === 1 &&
        <View style={{flex: 1}}>
          <WebView
            style={{flex: 1}}
            source={{uri: 'https://www.jin10.com/example/jin10.com.html?fontSize=14px&theme=white'}}
          />
        </View>
      }
      {
        tab === 2 &&
        <View style={{flex: 1}}>
          <WebView
            style={{flex: 1}}
            source={{uri: 'https://rili-d.jin10.com/open.php?fontSize=14px&theme=primary'}}
          />
        </View>
      }
    </View>
  )

}

const toFixNumber: any = {
  'XAUUSDpro': 2,
  'XAGUSDpro': 3,
}