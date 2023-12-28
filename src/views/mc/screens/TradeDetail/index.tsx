/*
 * @Author: Galen.GE
 * @Date: 2023-12-19 23:15:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, Image } from 'react-native';
import usePublicState from '@core/hooks/usePublicState';
import useTradeManager, {
  TRADE_TYPE,
  LIMIT_TYPE,
  LIMIT_TYPE_LIST,
  TRADE_TYPE_LIST,
  ALL_TYPE_LIST,
  EXPIRATION,
  STOPLOSS_TAKEPROFIT,
  LIMIT_PRICE,
} from '@core/hooks/trade/useTradeManager';
import Selector from '@core/templates/components/Base/Selector';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { CommonPicker } from "@yz1311/react-native-wheel-picker";
import Input from '@core/templates/components/Base/Input';
import { LS as styles } from './style';

export default () => {

  const { navigation, dispatch, ACTIONS } = usePublicState();
  const {
    mt4Info,
    payload,
    setPayload,
    instant,
    changeVolume,
    referPayment,
    changeStoploss,
    changeTakeprofit,
    openMarketOrder,
    changeLimitPrice,
    openPendingOrder,
    limitInput
  } = useTradeManager();
  const [ currentTab, setCurrentTab ] = React.useState(0);
  const [ showSelector, setShowSelector ] = React.useState<'' | 'Expiration' | 'OperationType'>('');

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Selector
          style={{flexDirection: 'row', alignItems: 'center',}}
          title='交易品种'
          value={payload.Symbol}
          options={_.map(mt4Info?.Symbols, (item: any) => ({key: item, value: item}))}
          cb={(value: string) => setPayload({...payload, Symbol: value})}
        />
      ),
      headerShown: true
    });
  }, [payload.Symbol])

  React.useEffect(() => {
    if(_.find(instant, { Symbol: payload.Symbol })){
      dispatch(ACTIONS.BASE.closeLoading());
      return;
    }
    dispatch(ACTIONS.BASE.openLoading());
  }, [_.find(instant, { Symbol: payload.Symbol })])

  React.useEffect(() => {
    if(currentTab === 0){
      setPayload((state) => ({...state, Operation: 'Buy'}));
    }else{
      setPayload((state) => ({...state, Operation: 'BuyLimit'}));
    }
  }, [currentTab])

  const handleSelectOP = (data: any) => {
    setPayload({...payload, Operation: _.find(ALL_TYPE_LIST, {value: data[0]}).key});
    setShowSelector('')
  }

  const handleSelectExpiration = (data: any) => {
    setPayload({...payload, Expiration: _.find(EXPIRATION, {value: data[0]}).key});
    setShowSelector('')
  }

  const handleSubmit = () => {
    if (currentTab === 0) {
      openMarketOrder();
      return;
    }
    openPendingOrder();
  };

  console.log(payload.Volume)

  return (
    <View style={styles.container}>
      <View style={styles.pendingBox}>
        <View style={{...styles.pendingItem, backgroundColor: _.find(instant, { Symbol: payload.Symbol })?.bidStatus === 'UP' ? '#00A010' : '#FF0000'}} >
          <View style={styles.pendingText}>
            {
              _.find(instant, { Symbol: payload.Symbol })?.bidStatus === 'UP' ?
              <Image source={require('./i/ic-up.png')} style={styles.pendingIcon} /> :
              <Image source={require('./i/ic-down.png')} style={styles.pendingIcon} />
            }
            <Text style={{color: '#fff'}}>卖出</Text>
          </View>
          <Text style={styles.pendingAmount}>{_.find(instant, { Symbol: payload.Symbol })?.Bid || 0.00}</Text>
        </View>
        <View style={{...styles.pendingItem, backgroundColor: _.find(instant, { Symbol: payload.Symbol })?.askStatus === 'UP' ? '#00A010' : '#FF0000'}} >
          <View style={styles.pendingText}>
            {
              _.find(instant, { Symbol: payload.Symbol })?.askStatus === 'UP' ?
              <Image source={require('./i/ic-up.png')} style={styles.pendingIcon} /> :
              <Image source={require('./i/ic-down.png')} style={styles.pendingIcon} />
            }
            <Text style={{color: '#fff'}}>买入</Text>
          </View>
          <Text style={styles.pendingAmount}>{_.find(instant, { Symbol: payload.Symbol })?.Ask || 0.00}</Text>
        </View>
      </View>
      <View style={styles.tabsVeiw}>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 0 && styles.tabsItemActive]} onPress={() => setCurrentTab(0)}>
          <Text style={[styles.tabsItemText, currentTab === 0 && styles.tabsItemTextActive]}>建仓</Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 1 && styles.tabsItemActive]} onPress={() => setCurrentTab(1)}>
          <Text style={[styles.tabsItemText, currentTab === 1 && styles.tabsItemTextActive]}>挂单</Text>
        </MyTouchableOpacity>
      </View>
      <View style={styles.dropItem} >
        <Text>{ currentTab === 0 ? '建仓类型' : '挂单类型' }</Text>
        <MyTouchableOpacity style={[styles.dropMenu, styles.dropWireframe]} onPress={() => setShowSelector('OperationType')}>
          <Text style={styles.dropText}>{ {...TRADE_TYPE, ...LIMIT_TYPE}[payload.Operation] }</Text>
          <Image source={require('./i/ic-drop.png')} style={styles.dropIcon} />
        </MyTouchableOpacity>
      </View>
      {
        currentTab === 1 &&
        <>
          <MyTouchableOpacity style={styles.dropItem} onPress={() => setShowSelector('Expiration')}>
            <Text>有效期</Text>
            <View style={[styles.dropMenu, styles.dropWireframe]}>
              <Text style={styles.dropText}>{ payload.Expiration ? '今日有效' : '撤单前有效' }</Text>
              <Image source={require('./i/ic-drop.png')} style={styles.dropIcon} />
            </View>
          </MyTouchableOpacity>
          <View style={styles.optionsItem}>
            <Text>价格 {LIMIT_PRICE[payload.Operation]}</Text>
            <View style={styles.optionsMenu}>
              <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
              <Input
                keyboardType='decimal-pad'
                style={styles.inputNumber}
                value={payload.Price.toFixed(2)}
                onChangeText={(value: string) => changeLimitPrice(value)}
              />
              <Text style={styles.optionsNumber}>{payload.Price}</Text>
              <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
              <Text style={styles.optionsText} onPress={() => changeLimitPrice('reset')}>重置</Text>
            </View>
          </View>
        </>
      }
      <View style={styles.optionsItem}>
        <Text>交易手数</Text>
        <View style={styles.optionsMenu}>
          <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeVolume('sub')}>
            <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
          </MyTouchableOpacity>
          <Input
            keyboardType='decimal-pad'
            style={styles.inputNumber}
            value={payload.Volume.toFixed(2)}
            onChangeText={(value: string) => changeVolume(value)}
          />
          <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeVolume('add')}>
            <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
          </MyTouchableOpacity>
          <Text style={styles.optionsText} onPress={() => changeVolume('reset')}>重置</Text>
        </View>
      </View>
      <View style={styles.optionsItem}>
      {
        [0.1, 0.3, 0.5, 1, 2].map((item) =>
          <MyTouchableOpacity
            key={item}
            style={[styles.frequency, payload.Volume == item && styles.frequencyActive]}
            onPress={() => setPayload({...payload, Volume: item})}
          >
            <Text style={[payload.Volume == item && styles.frequencyActiveText]}>{item}手</Text>
            { payload.Volume == item && <Image source={require('./i/ic-check.png')} style={styles.checkIcon} /> }
          </MyTouchableOpacity>
        )
      }
      </View>
      <View style={styles.dropItem}>
        <View style={styles.refer}>
          <Text>参考预付款：</Text>
          <Text>{referPayment}</Text>
        </View>
        <View style={styles.refer}>
          <Text>可用预付款：</Text>
          <Text>{mt4Info?.AccountSummary?.freeMargin}</Text>
        </View>
      </View>
      <View style={{...styles.optionsItem, borderBottomWidth: 1,borderBottomColor: '#EBEBEB',}}>
        <Text>止损{STOPLOSS_TAKEPROFIT[payload.Operation]?.Stoploss} {limitInput?.Stoploss[payload.Operation]}</Text>
        <View style={styles.optionsMenu}>
          <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeStoploss('sub')}>
            <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
          </MyTouchableOpacity>
          <Input
            keyboardType='decimal-pad'
            style={styles.inputNumber}
            value={payload.Stoploss == 0 ? '' : payload.Stoploss.toFixed(2)}
            onChangeText={(value: string) => changeStoploss(value)}
          />
          <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeStoploss('add')}>
            <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
          </MyTouchableOpacity>
          <Text onPress={() => setPayload({...payload, Stoploss: 0})} style={styles.optionsText}>清空</Text>
        </View>
      </View>
      <View style={{...styles.optionsItem, borderBottomWidth: 1,borderBottomColor: '#EBEBEB',}}>
        <Text>止盈 {STOPLOSS_TAKEPROFIT[payload.Operation]?.Takeprofit} {limitInput?.Takeprofit[payload.Operation]}</Text>
        <View style={styles.optionsMenu}>
          <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeTakeprofit('sub')}>
            <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
          </MyTouchableOpacity>
          <Input
            keyboardType='decimal-pad'
            style={styles.inputNumber}
            value={payload.Takeprofit == 0 ? '' : payload.Takeprofit.toFixed(2)}
            onChangeText={(value: string) => changeTakeprofit(value)}
          />
          <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeTakeprofit('add')}>
            <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
          </MyTouchableOpacity>
          <Text onPress={() => setPayload({...payload, Takeprofit: 0})} style={styles.optionsText}>清空</Text>
        </View>
      </View>
      <MyTouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>提交</Text>
      </MyTouchableOpacity>
      <Text style={styles.submitTips}>*市价模式下是成交价格，可能会与请求价格有一定差异</Text>
      {
        <CommonPicker
          pickerData={_.map(EXPIRATION, 'value')}
          selectedValue={_.find(EXPIRATION, { key: payload.Expiration })?.value}
          isModal={true}
          modalVisible={showSelector === 'Expiration'}
          onPickerCancel={() => setShowSelector('')}
          onPickerConfirm={(data: any) => handleSelectExpiration(data)}
          pickerTitle={'请选择有效期'}
        />
      }
      {
        <CommonPicker
          pickerData={_.map((currentTab === 0 ? TRADE_TYPE_LIST : LIMIT_TYPE_LIST), 'value')}
          selectedValue={_.find(ALL_TYPE_LIST, { key: payload.Operation })?.value}
          isModal={true}
          modalVisible={showSelector === 'OperationType'}
          onPickerCancel={() => setShowSelector('')}
          onPickerConfirm={(data: any) => handleSelectOP(data)}
          pickerTitle={'请选择交易类型'}
        />
      }
    </View>
  );
};
