/*
 * @Author: Galen.GE
 * @Date: 2023-12-19 23:15:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import usePublicState from '@core/hooks/usePublicState';
import { useRoute } from '@react-navigation/native';
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
import KeyboardAvoidingView from '@this/shadow/KeyboardAvoidingView';
import Selector from '@core/templates/components/Base/Selector';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import CommonPicker from "@core/templates/components/CommonPicker";
import Input from '@core/templates/components/Base/Input';
import { CMD_MAPPING, CMD_CDOE_MAPPING } from '@core/hooks/trade/useTradeConnect';
import ConfirmSubmit from './Confirm';
import { LS as styles } from './style';

export default () => {

  const { navigation, dispatch, ACTIONS } = usePublicState();
  const params = useRoute<any>().params;
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
    closeOrder,
    setStoplossTakeprofit,
    modifyPendingOrder,
    limitInput
  } = useTradeManager();
  const [ currentTab, setCurrentTab ] = React.useState(0);
  const [ operation, setOperation ] = React.useState('');
  const [ showSelector, setShowSelector ] = React.useState<'' | 'Expiration' | 'OperationType'>('');
  const [ pickTypeData, setPickTypeData ] = React.useState<string[]>([]);
  const pickExpireData = React.useRef<string[]>(_.map(EXPIRATION, 'value'));
  const [ showConfirmSubmit, setShowConfirmSubmit ] = React.useState(false);
  const initTarget = React.useRef<any>(true);

  React.useEffect(() => {
    // 初始化修改值
    if(params?.type === 'buy'){
      setPayload({
        ...payload,
        Operation: 'Buy',
        Symbol: params.symbol,
      })
      return;
    }
    if(params?.type === 'sell'){
      setPayload({
        ...payload,
        Operation: 'Sell',
        Symbol: params.symbol,
      })
      return;
    }
    if(params?.type === 'closePosition'){
      setPayload({
        ...payload,
        Volume: (params.volume / 100).toFixed(2),
        Symbol: params.symbol,
      })
    }
    if(params?.type === 'setStopLoss' && params?.ex){
      setPayload({
        ...payload,
        Symbol: params.symbol,
        Stoploss: params.ex.Sl,
        Takeprofit: params.ex.Tp,
        Operation: CMD_CDOE_MAPPING[params.cmd],
      })
      return;
    }
    if(params?.type === 'updateOrder'){
      setPayload({
        ...payload,
        Symbol: params.symbol,
        Stoploss: params.ex.Sl,
        Takeprofit: params.ex.Tp,
        Price: params.ex.Price,
        Volume: (params.volume / 100).toFixed(2),
        Operation: CMD_CDOE_MAPPING[params.ex.Cmd],
      })
      return;
    }
  }, [])

  React.useEffect(() => {
    if((currentTab === 1 || params?.type === 'updateOrder')){
      setPickTypeData(_.map(LIMIT_TYPE_LIST, 'value'));
      return;
    }
    setPickTypeData(_.map(TRADE_TYPE_LIST, 'value'));
  }, [currentTab, params?.type])

  React.useEffect(() => {
    if(!params ||  params.type === 'sell' || params.type === 'buy'){
      navigation.setOptions({
        headerTitle: () => (
          <Selector
            style={{flexDirection: 'row', alignItems: 'center',}}
            title='交易品种'
            value={payload.Symbol}
            options={_.map(mt4Info?.Symbols, (item: any) => ({key: item, value: item}))}
            cb={(value: string) => setPayload((state: any) => ({...state, Symbol: value}))}
          />
        ),
        headerShown: true
      });
      setOperation('修改订单');
      return;
    }
    let headerTitle = '';
    if(params.type === 'updateOrder'){
      headerTitle = '修改订单';
    }
    if(params.type === 'closePosition'){
      headerTitle = '平仓';
    }
    if(params.type === 'setStopLoss'){
      headerTitle = '设置止损止盈';
    }
    navigation.setOptions({
      headerTitle: headerTitle,
      headerShown: true
    });
    setOperation(headerTitle);
  }, [payload.Symbol, params])

  React.useEffect(() => {
    if(_.find(instant, { Symbol: payload.Symbol })){
      dispatch(ACTIONS.BASE.closeLoading());
      return;
    }
    dispatch(ACTIONS.BASE.openLoading());
  }, [_.find(instant, { Symbol: payload.Symbol })])

  React.useEffect(() => {
    if(params && _.includes(['updateOrder', 'setStopLoss'], params?.type)){
      return;
    }
    if(params && _.includes(['buy', 'sell'], params?.type) && initTarget.current === true){
      initTarget.current = false;
      return;
    }
    if(currentTab === 0){
      setPayload((state) => ({...state, Operation: 'Buy'}));
    }else{
      setPayload((state) => ({...state, Operation: 'BuyLimit'}));
    }
  }, [currentTab])

  const handleSelectOP = React.useCallback((data: any) => {
    setPayload((state => ({...state, Operation: _.find(ALL_TYPE_LIST, {value: data[0]}).key})));
    setShowSelector('')
  }, [])

  const handleSelectExpiration = React.useCallback((data: any) => {
    setPayload((state => ({...state, Expiration: _.find(EXPIRATION, {value: data[0]}).key})));
    setShowSelector('')
  }, [])

  const handleOnBlur = (type: 'Volume' | 'Stoploss' | 'Takeprofit' | 'Price') => {
    if(type === 'Volume'){
      changeVolume('sub', 0)
      return;
    }
    if(type === 'Stoploss'){
      if(STOPLOSS_TAKEPROFIT[payload.Operation]?.Stoploss === '≥'){
        changeStoploss('sub', 0);
      }else{
        changeStoploss('add', 0);
      }
      return;
    }
    if(type === 'Takeprofit'){
      if(STOPLOSS_TAKEPROFIT[payload.Operation]?.Takeprofit === '≥'){
        changeTakeprofit('sub', 0);
      }else{
        changeTakeprofit('add', 0);
      }
      return;
    }
    if(type === 'Price'){
      if(LIMIT_PRICE[payload.Operation] == '≥') {
        changeLimitPrice('sub', 0);
      }else{
        changeLimitPrice('add', 0);
      }
      return;
    }
  }

  const handleSubmit = React.useCallback(_.throttle(() => {
    if(!params || params.type === 'buy' || params.type === 'sell'){
      if (currentTab === 0) {
        setShowConfirmSubmit(true);
        // openMarketOrder();
      }else{
        openPendingOrder();
      }
      return;
    }
    if(params.type === 'updateOrder'){
      modifyPendingOrder(params.id);
      return;
    }
    if(params.type === 'closePosition'){
      closeOrder(params.id);
      return;
    }
    if(params.type === 'setStopLoss'){
      setStoplossTakeprofit(params.id);
      return;
    }
  }, 2000), [params, currentTab, payload]);

  const handleOnPickerCancel = React.useCallback(() => {
    setShowSelector('');
  }, [])


  const goSubmitOpenMarketOrder = React.useCallback(() => {
    setShowConfirmSubmit(false);
    openMarketOrder();
  }, [payload])

  const toFixedBit = payload.Symbol === 'XAUUSDpro' ? 2 : 3;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            params && (params.type !== 'buy' && params.type !== 'sell') &&
            <View style={styles.orderInfo}>
              <Text style={styles.orderInfoText}>{operation} #{params.id}</Text>
              <Text style={styles.orderInfoText}>{params.symbol}</Text>
              <Text style={styles.orderInfoText}>{CMD_MAPPING[params.cmd]} {(params.volume / 100).toFixed(2)}手</Text>
            </View>
          }
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
              <Text style={styles.pendingAmount}>{_.find(instant, { Symbol: payload.Symbol })?.Bid?.toFixed(toFixedBit) || 0.00}</Text>
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
              <Text style={styles.pendingAmount}>{_.find(instant, { Symbol: payload.Symbol })?.Ask?.toFixed(toFixedBit) || 0.00}</Text>
            </View>
          </View>
          {
            (!params || params.type === 'buy' || params.type === 'sell') &&
            <View style={styles.tabsVeiw}>
              <MyTouchableOpacity style={[styles.tabsItem, currentTab === 0 && styles.tabsItemActive]} onPress={() => setCurrentTab(0)}>
                <Text style={[styles.tabsItemText, currentTab === 0 && styles.tabsItemTextActive]}>建仓</Text>
              </MyTouchableOpacity>
              <MyTouchableOpacity style={[styles.tabsItem, currentTab === 1 && styles.tabsItemActive]} onPress={() => setCurrentTab(1)}>
                <Text style={[styles.tabsItemText, currentTab === 1 && styles.tabsItemTextActive]}>挂单</Text>
              </MyTouchableOpacity>
            </View>
          }
          {
            !_.includes(['closePosition', 'setStopLoss'], params?.type) &&
            <View style={styles.dropItem} >
              <Text>{ (currentTab === 1 || params?.type === 'updateOrder') ? '挂单类型' : '建仓类型' }</Text>
              <MyTouchableOpacity style={[styles.dropMenu, styles.dropWireframe]} onPress={() => setShowSelector('OperationType')}>
                <Text style={styles.dropText}>{ {...TRADE_TYPE, ...LIMIT_TYPE}[payload.Operation] }</Text>
                <Image source={require('./i/ic-drop.png')} style={styles.dropIcon} />
              </MyTouchableOpacity>
            </View>
          }
          {
            (currentTab === 1 || (params && !_.includes(['closePosition', 'setStopLoss', 'buy', 'sell'], params?.type))) &&
            <>
              <MyTouchableOpacity style={styles.dropItem} onPress={() => setShowSelector('Expiration')}>
                <Text>有效期</Text>
                <View style={[styles.dropMenu, styles.dropWireframe]}>
                  <Text style={styles.dropText}>{ _.find(EXPIRATION, { key: payload.Expiration }).value }</Text>
                  <Image source={require('./i/ic-drop.png')} style={styles.dropIcon} />
                </View>
              </MyTouchableOpacity>
              <View style={styles.optionsItem}>
                <Text>价格 {LIMIT_PRICE[payload.Operation]} {limitInput?.Price[payload.Operation]?.toFixed(toFixedBit)}</Text>
                <View style={styles.optionsMenu}>
                  <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeLimitPrice('sub')}>
                    <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
                  </MyTouchableOpacity>
                  <Input
                    keyboardType='decimal-pad'
                    onBlur={() => handleOnBlur('Price')}
                    style={styles.inputNumber}
                    value={payload?.Price}
                    onChangeText={(value: string) => changeLimitPrice(value)}
                  />
                  <Text style={styles.optionsNumber}>{payload.Price}</Text>
                  <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeLimitPrice('add')}>
                    <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
                  </MyTouchableOpacity>
                  <Text style={styles.optionsText} onPress={() => changeLimitPrice('reset')}>重置</Text>
                </View>
              </View>
            </>
          }
          {
            !_.includes(['setStopLoss', 'updateOrder'], params?.type) &&
            <>
              <View style={styles.optionsItem}>
                <Text>{params?.type === 'closePosition' ? '平仓' : '交易'}手数</Text>
                <View style={styles.optionsMenu}>
                  <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeVolume('sub')}>
                    <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
                  </MyTouchableOpacity>
                  <Input
                    keyboardType='decimal-pad'
                    style={styles.inputNumber}
                    value={payload.Volume}
                    onBlur={() => handleOnBlur('Volume')}
                    onChangeText={(value: string) => changeVolume(value)}
                  />
                  <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeVolume('add')}>
                    <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
                  </MyTouchableOpacity>
                  <Text style={styles.optionsText} onPress={() => changeVolume('reset')}>重置</Text>
                </View>
              </View>

            </>
          }
          {
            !_.includes(['closePosition', 'setStopLoss', 'updateOrder'], params?.type) &&
            <>
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
                  <Text>{Number(mt4Info?.AccountSummary?.FreeMargin)?.toFixed(2)}</Text>
                </View>
              </View>
            </>
          }
          {
            !_.includes(['closePosition'], params?.type) &&
            <>
              <View style={{...styles.optionsItem, borderBottomWidth: 1,borderBottomColor: '#EBEBEB',}}>
                <Text>止损{STOPLOSS_TAKEPROFIT[payload.Operation]?.Stoploss}
                  {
                    limitInput?.Stoploss[payload.Operation] &&
                    limitInput?.Stoploss[payload.Operation].toFixed(toFixedBit)
                  }
                </Text>
                <View style={styles.optionsMenu}>
                  <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeStoploss('sub')}>
                    <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
                  </MyTouchableOpacity>
                  <Input
                    keyboardType='decimal-pad'
                    style={styles.inputNumber}
                    onBlur={() => handleOnBlur('Stoploss')}
                    value={payload.Stoploss == 0 ? '' : payload.Stoploss}
                    onChangeText={(value: string) => changeStoploss(value)}
                  />
                  <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeStoploss('add')}>
                    <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
                  </MyTouchableOpacity>
                  <Text onPress={() => setPayload({...payload, Stoploss: 0})} style={styles.optionsText}>清空</Text>
                </View>
              </View>
              <View style={{...styles.optionsItem, borderBottomWidth: 1,borderBottomColor: '#EBEBEB',}}>
                <Text>止盈 {STOPLOSS_TAKEPROFIT[payload.Operation]?.Takeprofit}
                  {
                    limitInput?.Takeprofit[payload.Operation] &&
                    limitInput?.Takeprofit[payload.Operation].toFixed(toFixedBit)
                  }
                </Text>
                <View style={styles.optionsMenu}>
                  <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeTakeprofit('sub')}>
                    <Image source={require('./i/ic-reduce.png')} style={styles.optionsIcon} />
                  </MyTouchableOpacity>
                  <Input
                    keyboardType='decimal-pad'
                    style={styles.inputNumber}
                    onBlur={() => handleOnBlur('Takeprofit')}
                    value={payload.Takeprofit == 0 ? '' : payload.Takeprofit}
                    onChangeText={(value: string) => changeTakeprofit(value)}
                  />
                  <MyTouchableOpacity style={styles.optionsIcon} onPress={() => changeTakeprofit('add')}>
                    <Image source={require('./i/ic-add.png')} style={styles.optionsIcon} />
                  </MyTouchableOpacity>
                  <Text onPress={() => setPayload({...payload, Takeprofit: 0})} style={styles.optionsText}>清空</Text>
                </View>
              </View>
            </>
          }
          <MyTouchableOpacity style={styles.submit} onPress={_.throttle(handleSubmit, 1000)}>
            <Text style={styles.submitText}>提交</Text>
          </MyTouchableOpacity>
          <Text style={styles.submitTips}>*市价模式下是成交价格，可能会与请求价格有一定差异</Text>
          <CommonPicker
            pickerData={pickExpireData.current}
            selectedValue={_.find(EXPIRATION, { key: payload.Expiration })?.value}
            isModal={true}
            modalVisible={showSelector === 'Expiration'}
            onPickerCancel={handleOnPickerCancel}
            onPickerConfirm={handleSelectExpiration}
            pickerTitle={'请选择有效期'}
          />
          <CommonPicker
            pickerData={pickTypeData}
            selectedValue={_.find(ALL_TYPE_LIST, { key: payload.Operation })?.value}
            isModal={true}
            modalVisible={showSelector === 'OperationType'}
            onPickerCancel={handleOnPickerCancel}
            onPickerConfirm={handleSelectOP}
            pickerTitle={'请选择交易类型'}
          />
        </ScrollView>
        {
          showConfirmSubmit &&
          <ConfirmSubmit payload={payload} close={() => setShowConfirmSubmit(false)} submit={goSubmitOpenMarketOrder} />
        }
      </KeyboardAvoidingView>
    </View>
  );
};
