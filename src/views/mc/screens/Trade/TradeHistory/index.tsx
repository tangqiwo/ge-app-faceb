/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 12:52:42
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/TradeHistory/index.tsx
 * @Description: 挂单
 */
import _, { set } from 'lodash';
import React from 'react';
import { FlatList } from 'react-native';
import ACTIONS from '@actions/index';
import { useDispatch } from 'react-redux';
import { View, Text } from "react-native-animatable"
import CommonDatePicker from "@template/components/CommonDatePicker";
import useTradeOperation from '@core/hooks/trade/useTradeOperation';
import { NoData, SkeletonLoader } from '@template/components/Loader'
import { CMD_MAPPING } from '@core/hooks/trade/useTradeConnect';
import { ListFooterComponent } from '@this/screens/Home/components/Strategy'
import { LS as styles, GS } from '../Position/style';
import { LS as localStyles } from './style';
import dayjs from 'dayjs';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';

export default React.memo(() => {

  const dispatch = useDispatch();
  const { getHistoryOrders, data, date, setDate, startDate, endDate, setStartDate, setEndDate, count, } = useTradeOperation();
  const [ pageNo, setPageNo ] = React.useState(1);
  const [ showDatePicker, setShowDatePicker ] = React.useState<'' | 'start' | 'end'>();
  const [ displayData, setDisplayData ] = React.useState<any>([]);
  const [isloading, setIsloading] = React.useState(false);
  const [openInput, setOpenInput] = React.useState(false);

  React.useEffect(() => {
    setIsloading(false);
    if(data){
      setDisplayData((state: any) => {
        return [...state, ...data]
      })
    }
  }, [data])

  const nextPage = () => {
    if(isloading || displayData.length === count){
      return
    }
    requestNewData(date, pageNo + 1)
  }

  React.useEffect(() => {
    setDisplayData([]);
    requestNewData(date, 1)
  }, [date])

  const requestNewData = (date: any, pageNo: number) => {
    setPageNo(pageNo);
    setIsloading(true);
    if(date === 'others'){
      return;
    }
    var range = 0;
    if(date === 'today'){
      setStartDate('');
      setEndDate('');
      range = 0;
    }
    if(date === '7days'){
      setStartDate('');
      setEndDate('');
      range = -7;
    }
    if(date === '30days'){
      setStartDate('');
      setEndDate('');
      range = -30;
    }
    getHistoryOrders([dayjs().startOf('days').add(range, 'day').format('YYYY-MM-DD HH:mm:ss'), dayjs().endOf('days').format('YYYY-MM-DD HH:mm:ss')], pageNo, () => {
      setIsloading(false);
    });
  }

  const handlePickDate = (date: any) => {
    if(showDatePicker === 'start'){
      // 起始时间大于结束时间
      if(endDate && dayjs(date).isAfter(dayjs(endDate))){
        dispatch(ACTIONS.BASE.openToast({text: '起始时间不能大于结束时间', types: 'error'}));
        return;
      }
      setStartDate(dayjs(date).startOf('days').format('YYYY-MM-DD HH:mm:ss'));
    }
    if(showDatePicker === 'end'){
      // 结束时间小于起始时间
      if(startDate && dayjs(date).isBefore(dayjs(startDate))){
        dispatch(ACTIONS.BASE.openToast({text: '结束时间不能小于起始时间', types: 'error'}));
        return;
      }
      setEndDate(dayjs(date).endOf('days').format('YYYY-MM-DD HH:mm:ss'));
    }
    setShowDatePicker('');
  }

  React.useEffect(() => {
    if(startDate && endDate){
      setOpenInput(false);
      getHistoryOrders([startDate, endDate]);
    }
  }, [startDate, endDate])

  const toFixNumber = (symbol: string) => {
    return symbol === 'XAUUSDpro' ? 2 : 3;
  }

  return (
    <View style={{flex: 1, paddingBottom: GS.mixin.rem(60)}}>
      <View style={localStyles.datePicker}>
        {
          date === 'others' && openInput &&
          <View style={localStyles.datePickerWrapper}>
            <MyTouchableOpacity style={[localStyles.datePickerButton, localStyles.dateInput]} onPress={() => setShowDatePicker('start')}>
              {
                startDate &&
                <Text>{dayjs(startDate).format('YYYY/MM/DD')}</Text>
              }
            </MyTouchableOpacity>
            <Text>-</Text>
            <MyTouchableOpacity style={[localStyles.datePickerButton, localStyles.dateInput]} onPress={() => setShowDatePicker('end')}>
              {
                endDate &&
                <Text>{dayjs(endDate).format('YYYY/MM/DD')}</Text>
              }
            </MyTouchableOpacity>
            <MyTouchableOpacity
              onPress={() => setOpenInput(false)}
              style={[localStyles.datePickerButton, localStyles.dateActive]}
            >
              <Text>确定</Text>
            </MyTouchableOpacity>
          </View>
        }
        {
          (date !== 'others' || !openInput) &&
          <View style={localStyles.datePickerWrapper}>
            <MyTouchableOpacity
              style={[localStyles.datePickerButton, date === 'today' && localStyles.dateActive]}
              onPress={() => setDate('today')}
            >
              <Text>今日</Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              style={[localStyles.datePickerButton, date === '7days' && localStyles.dateActive]}
              onPress={() => setDate('7days')}
            >
              <Text>7天</Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              style={[localStyles.datePickerButton, date === '30days' && localStyles.dateActive]}
              onPress={() => setDate('30days')}
            >
              <Text>当月</Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity
              style={[localStyles.datePickerButton, (date as any) === 'others' && localStyles.dateActive]}
              onPress={() => {setDate('others'), setOpenInput(true)}}
            >
              <Text>自定义</Text>
            </MyTouchableOpacity>
          </View>
        }
      </View>
        { !data && <SkeletonLoader /> }
        { data && displayData.length === 0 && <NoData /> }
        {
          displayData.length > 0 &&
          <FlatList
            data={displayData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any, index: number) => `${item.Ticket}-${index}`}
            onEndReached={nextPage}
            windowSize={40}
            ListFooterComponent={
              count == displayData.length ?
                <ListFooterComponent type='end' /> :
              isloading ?
                <ListFooterComponent type='loading' /> :
                <ListFooterComponent type='none' />
            }
            renderItem={({item, index}) => (
              <React.Fragment>
                {
                  item.Cmd == 6 ?
                  <Balance item={item} /> :
                  <View style={styles.main} >
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
                        <Text style={{...styles.moneyText, color: item.Profit >= 0 ? '#00A010' : '#FF0000'}}>{Number(item.Profit).toFixed(toFixNumber(item.Symbol))}</Text>
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
                        <Text style={styles.positionDate}>{dayjs(item.CloseTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.grey}>注释:{item.Comment || '--'}</Text>
                    </View>
                  </View>
                }
              </React.Fragment>
            )}
          />
      }
      <CommonDatePicker
        pickerTitle={showDatePicker === 'start' ? '起始日期' : '截止日期'}
        mode={'date'}
        date={showDatePicker === 'start' ? startDate : endDate}
        isModal={true}
        modalVisible={!!showDatePicker}
        onPickerCancel={() => setShowDatePicker('')}
        onPickerConfirm={(value: any) => handlePickDate(value)}
      />
    </View>
  )

})

const Balance = ({item}: any) => {
  return (
    <View style={styles.main} key={item.Ticket}>
      <View style={styles.spaceBetween}>
        <Text style={styles.grey}>{dayjs(item.OpenTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
        <View style={styles.variety}>
          {
            item.Comment.includes('R-') ?
            <Text style={styles.grey}>{_.chain(item.Comment).split(';').last().value()}</Text> :
            <Text style={styles.grey}>{Number(item.Profit) > 0 ? '注资' : '取款'}</Text>
          }
          <Text style={styles.order}>#{item.Ticket}</Text>
        </View>
      </View>
      <View style={styles.spaceBetween}>
        <Text style={styles.grey}>注释:{item.Comment || '--'}</Text>
        <View style={styles.money}>
           <Text style={{...styles.moneyText, color: item.Profit >= 0 ? '#00A010' : '#FF0000'}}>{Number(item.Profit).toFixed(2)}</Text>
         </View>
      </View>
    </View>
  )

}