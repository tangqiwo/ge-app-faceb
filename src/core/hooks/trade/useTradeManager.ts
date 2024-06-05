/*
 * @Author: Galen.GE
 * @Date: 2023-12-27 11:22:53
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/trade/useTradeManager.ts
 * @Description: 交易管理
 */
import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react';
import { useLatest, usePrevious } from 'react-use';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import usePublicState from "../usePublicState"

export default () => {

  const { dispatch, ACTIONS, infos, navigation, isFocused } = usePublicState();
  const params = useRoute<any>().params;
  const mt4Info = useSelector((state: any) => state.trade.mt4Info);
  const instant = useSelector((state: any) => state.trade.instant);
  const Mt4ClientApiToken = useSelector((state: any) => state.trade.mt4Info.Mt4ClientApiToken);
  const [referPayment, setReferPayment] = React.useState('0');
  const accountType = useSelector((state: any) => state.trade.accountType);

  const [limitInput, setLimitInput] = React.useState<any>({
    // 止盈止损
    Stoploss: {
      Buy: '',
      Sell: ''
    },
    Takeprofit: {
      Buy: '',
      Sell: ''
    },
    Price: {
      BuyLimit: '',
      SellLimit: '',
      BuyStop: '',
      SellStop: ''
    }
  })

  type TPayload = {
    Mt4ClientApiToken: string;
    Symbol: string;
    Operation: 'Buy' | 'Sell' | 'BuyLimit' | 'SellLimit' | 'BuyStop' | 'SellStop'
    Volume: any
    Stoploss: any
    Takeprofit: any
    Price?: any;
    Expiration?: string;
  }

  const initData: TPayload = {
    Mt4ClientApiToken,
    Symbol: 'XAUUSDpro',
    Operation: 'Buy',
    Volume: 0.01,
    Stoploss: 0,
    Takeprofit: 0,
    Price: 0,
    Expiration: ''
  }

  const [ payload, setPayload ] = React.useState<TPayload>(initData);
  const prevPayload = usePrevious(payload);
  const latestPayload = useLatest(payload);
  const latestLimitInput: any = useLatest(limitInput);

  React.useEffect(() => {
    if(isFocused) {
      setPayload((state: any) => ({...initData, Operation: state.Operation}));
    }
  }, [isFocused])

  React.useEffect(() => {
    if(!mt4Info || !_.find(instant, {Symbol: payload.Symbol})) {
      return;
    }
    // 单价
    const symbol = _.find(instant, {Symbol: payload.Symbol});
    var price = payload.Operation === 'Buy' ? symbol.Ask : symbol.Bid;
    if(payload.Operation !== 'Buy' && payload.Operation !== 'Sell') {
      price = payload.Price;
    }
    // 单位
    const unit = _.find(mt4Info.SymbolParamsMany, {SymbolName: payload.Symbol}).Symbol.ContractSize;
    // 保证金比例
    const isPro = infos.KycScore >= 33;
    var rate = 0.02;
    if(payload.Symbol === 'XAUUSDpro') {
      rate = isPro ? 0.005 : 0.02;
    }
    if(payload.Symbol === 'XAGUSDpro') {
      rate = isPro ? 0.01 : 0.02;
    }
    const toFixedBit = payload.Symbol === 'XAUUSDpro' ? 2 : 3;
    setReferPayment((Number(payload.Volume) * price * unit * rate).toFixed(toFixedBit));
  }, [payload, mt4Info.SymbolParamsMany, instant])

  React.useEffect(() => {
    if(!instant || !_.find(instant, {Symbol: payload.Symbol})) {
      return;
    }
    // 买价，卖价
    const symbol = _.find(instant, {Symbol: payload.Symbol});
    const ask = symbol.Ask;
    const bid = symbol.Bid;
    // 金银步长
    const step = payload.Symbol === 'XAUUSDpro' ? 2 : 0.2;
    const toFixedBit = payload.Symbol === 'XAUUSDpro' ? 2 : 3;

    const data = {
      // 止盈止损
      Stoploss: {
        Buy: Number((bid - step).toFixed(toFixedBit)),
        Sell: Number((ask + step).toFixed(toFixedBit)),
        BuyLimit: Number(payload.Price) - step <=0 ? 0 : Number((Number(payload.Price) - step).toFixed(toFixedBit)),
        SellLimit: Number((Number(payload.Price) + step).toFixed(toFixedBit)),
        BuyStop: Number(payload.Price) - step <=0 ? 0 : Number((Number(payload.Price) - step).toFixed(toFixedBit)),
        SellStop: Number((Number(payload.Price) + step).toFixed(toFixedBit))
      },
      Takeprofit: {
        Buy: Number((bid + step).toFixed(toFixedBit)),
        Sell: Number((ask - step).toFixed(toFixedBit)),
        BuyLimit: Number((Number(payload.Price) + step).toFixed(toFixedBit)),
        SellLimit: Number(payload.Price) - step <=0 ? 0 : Number((Number(payload.Price) - step).toFixed(toFixedBit)),
        BuyStop: Number((Number(payload.Price) + step).toFixed(toFixedBit)),
        SellStop: Number(payload.Price) - step <=0 ? 0 : Number((Number(payload.Price) - step).toFixed(toFixedBit))
      },
      Price: {
        BuyLimit: Number((ask - step).toFixed(toFixedBit)),
        SellLimit: Number((bid + step).toFixed(toFixedBit)),
        BuyStop: Number((ask + step).toFixed(toFixedBit)),
        SellStop: Number((bid - step).toFixed(toFixedBit))
      }
    }
    latestLimitInput.current = data;
    setLimitInput(data)
    if(prevPayload?.Symbol !== payload.Symbol){
      changeLimitPrice('reset')
    }
  }, [payload.Symbol, instant, payload.Price])

  React.useEffect(() => {
    if(!params?.type || _.includes(['buy', 'sell'], params?.type)){
      setPayload((state: any) => ({
        ...state,
        Price: '',
        Stoploss: '',
        Takeprofit: ''
      }))
      changeLimitPrice('reset')
    }
  }, [payload.Symbol, payload.Operation])

  React.useEffect(() => {
    if(!params?.type || _.includes(['buy', 'sell'], params?.type)){
      if(latestPayload.current.Price === 0){
        changeLimitPrice('reset')
      }
    }
  }, [limitInput])

  // 修改挂单
  const modifyPendingOrder = (Ticket: number) => {
    const data = {
      Ticket,
      Mt4ClientApiToken: payload.Mt4ClientApiToken,
      Price: payload.Price,
      Volume: payload.Volume,
      Expiration: payload.Expiration,
      Stoploss: payload.Stoploss === 0 ? '0' : `${payload.Stoploss}`,
      Takeprofit: payload.Takeprofit === 0 ? '0' : `${payload.Takeprofit}`,
    }
    dispatch(ACTIONS.TRADE.modifyPendingOrder({ type: accountType.type, data, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({ text: '修改挂单成功' }));
      navigation.navigate('TradeDone', { data: {...res.Data, Type: '修改挂单'} });
    }}))
  }

  // 设置止盈止损
  const setStoplossTakeprofit = (Ticket: number) => {
    const data = {
      Ticket,
      Mt4ClientApiToken: payload.Mt4ClientApiToken,
      Stoploss: payload.Stoploss === 0 ? '0' : `${payload.Stoploss}`,
      Takeprofit: payload.Takeprofit === 0 ? '0' : `${payload.Takeprofit}`,
    }
    dispatch(ACTIONS.TRADE.setStopLossTakeProfit({ type: accountType.type, data, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({ text: '设置止盈止损操作成功' }));
      navigation.navigate('TradeDone', { data: {...res.Data, Type: '设置止盈止损'} });
    }}))
  }

  // 加减手数
  const changeVolume = (type: 'add' | 'sub' | 'reset' | any, step=0.01) => {
    const _volume = Number(Number(payload.Volume).toFixed(2));
    if(type !== 'add' && type !== 'sub' && type !== 'reset') {
      setPayload((state: any) => ({
        ...state,
        Volume: type
      }))
      return;
    }
    if(type === 'reset') {
      setPayload((state) => ({
        ...state,
        Volume: 0.01
      }))
      return;
    }
    if(type === 'add') {
      setPayload((state: any) => ({
        ...state,
        Volume: (_volume + step).toFixed(2)
      }))
      return;
    }
    if(_volume < 0.01) {
      dispatch(ACTIONS.BASE.openToast({ text: '手数不能小于0.01' }));
      setPayload((state) => ({
        ...state,
        Volume: 0.01
      }))
      return;
    }
    if(_volume > 20) {
      dispatch(ACTIONS.BASE.openToast({ text: '每次下单手数不得高于20手' }));
      setPayload((state) => ({
        ...state,
        Volume: 20
      }))
      return;
    }
    setPayload((state: any) => ({
      ...state,
      Volume: (_volume - step).toFixed(2)
    }))
  }

  // 加减止损
  const changeStoploss = (type: 'add' | 'sub' | 'reset' | any, step?: number) => {
    if(!step && step !== 0) {
      step = payload.Symbol === 'XAUUSDpro' ? 0.01 : 0.001;
    }
    const toFixedBit = payload.Symbol === 'XAUUSDpro' ? 2 : 3;
    const _stoploss = Number(Number(payload.Stoploss).toFixed(toFixedBit));
    if(type !== 'add' && type !== 'sub' && type !== 'reset') {
      setPayload((state: any) => ({
        ...state,
        Stoploss: type
      }))
      return;
    }
    if(type === 'reset') {
      setPayload((state) =>({
        ...state,
        Stoploss: 0
      }))
      return;
    }
    if(_stoploss === 0){
      setPayload((state: any) => ({...payload, Stoploss: limitInput.Stoploss[payload.Operation].toFixed(toFixedBit)}))
      return;
    }
    if(type === 'add') {
      if(STOPLOSS_TAKEPROFIT[payload.Operation]?.Stoploss == '≤') {
        if(_stoploss + step > limitInput.Stoploss[payload.Operation]) {
          dispatch(ACTIONS.BASE.openToast({ text: '止损不能大于限价' }));
          setPayload((state: any) => ({...state, Stoploss: limitInput.Stoploss[payload.Operation].toFixed(toFixedBit)}))
          return;
        }
      }
      setPayload((state: any) => ({
        ...state,
        Stoploss: (_stoploss + step).toFixed(toFixedBit)
      }))
      return;
    }
    if(STOPLOSS_TAKEPROFIT[payload.Operation]?.Stoploss == '≥') {
      if(_stoploss - step < limitInput.Stoploss[payload.Operation]) {
        dispatch(ACTIONS.BASE.openToast({ text: '止损不能小于限价' }));
        setPayload((state: any) => ({...payload, Stoploss: limitInput.Stoploss[payload.Operation].toFixed(toFixedBit)}))
        return;
      }
    }
    setPayload((state: any) => ({
      ...state,
      Stoploss: (_stoploss - step).toFixed(toFixedBit)
    }))
  }

  // 加减止盈
  const changeTakeprofit = (type: 'add' | 'sub' | 'reset' | any, step?: number) => {
    if(!step && step !== 0) {
      step = payload.Symbol === 'XAUUSDpro' ? 0.01 : 0.001;
    }
    const toFixedBit = payload.Symbol === 'XAUUSDpro' ? 2 : 3;
    const _takeprofit = Number(Number(payload.Takeprofit).toFixed(toFixedBit));
    if(type !== 'add' && type !== 'sub' && type !== 'reset') {
      setPayload((state) =>({
        ...state,
        Takeprofit: type
      }))
      return;
    }
    if(type === 'reset') {
      setPayload((state) =>({
        ...state,
        Takeprofit: 0
      }))
      return;
    }
    if(_takeprofit === 0){
      setPayload({...payload, Takeprofit: limitInput.Takeprofit[payload.Operation].toFixed(toFixedBit)})
      return;
    }
    if(type === 'add') {
      if(STOPLOSS_TAKEPROFIT[payload.Operation]?.Takeprofit == '≤') {
        if(_takeprofit + step > limitInput.Takeprofit[payload.Operation]) {
          dispatch(ACTIONS.BASE.openToast({ text: '止盈不能大于限价' }));
          setPayload((state: any) => ({...state, Takeprofit: limitInput.Takeprofit[payload.Operation].toFixed(toFixedBit)}))
          return;
        }
      }
      setPayload((state: any) => ({
        ...state,
        Takeprofit: Number((_takeprofit + step).toFixed(toFixedBit))
      }))
      return;
    }
    if(STOPLOSS_TAKEPROFIT[payload.Operation]?.Takeprofit == '≥') {
      if(_takeprofit - step < limitInput.Takeprofit[payload.Operation]) {
        dispatch(ACTIONS.BASE.openToast({ text: '止盈不能小于限价' }));
        setPayload((state: any) => ({...payload, Takeprofit: limitInput.Takeprofit[payload.Operation].toFixed(toFixedBit)}))
        return;
      }
    }
    setPayload((state: any) => ({
      ...payload,
      Takeprofit: (_takeprofit - step).toFixed(toFixedBit)
    }))
  }

  // 限价停损
  const changeLimitPrice = (type: 'add' | 'sub' | 'reset' | any, step?: number) => {
    if(!step && step !== 0) {
      step = payload.Symbol === 'XAUUSDpro' ? 0.01 : 0.001;
    }
    const toFixedBit = payload.Symbol === 'XAUUSDpro' ? 2 : 3;
    const _price = Number(Number(payload.Price).toFixed(toFixedBit));
    if(type !== 'add' && type !== 'sub' && type !== 'reset') {
      setPayload((state) => ({
        ...state,
        Price: type
      }))
      return;
    }
    if(type === 'reset') {
      setPayload((state) =>({...state, Price: latestLimitInput.current?.Price[payload.Operation]?.toFixed(toFixedBit) || 0}))
      return;
    }
    if(type === 'add') {
      if(LIMIT_PRICE[payload.Operation] == '≤') {
        if(_price + step > latestLimitInput.current.Price[payload.Operation]) {
          dispatch(ACTIONS.BASE.openToast({ text: '无效的挂单价格' }));
          setPayload((state) =>({...state, Price: latestLimitInput.current?.Price[payload.Operation]?.toFixed(toFixedBit)}))
          return;
        }
        if(_price + step < 0.01) {
          const n = 0.01;
          dispatch(ACTIONS.BASE.openToast({ text: '无效的挂单价格' }));
          setPayload((state) =>({...state, Price: n.toFixed(toFixedBit)}))
          return;
        }
      }
      setPayload((state: any) => ({
        ...state,
        Price: (_price + step).toFixed(toFixedBit)
      }))
      return;
    }
    if(_price - step < 0.01) {
      const n = 0.01;
      dispatch(ACTIONS.BASE.openToast({ text: '无效的挂单价格' }));
      setPayload((state) =>({...state, Price: n.toFixed(toFixedBit)}))
      return;
    }
    if(LIMIT_PRICE[payload.Operation] == '≥') {
      if(_price - step < latestLimitInput.current.Price[payload.Operation]) {
        dispatch(ACTIONS.BASE.openToast({ text: '无效的挂单价格' }));
        setPayload((state) =>({...state, Price: latestLimitInput.current?.Price[payload.Operation]?.toFixed(toFixedBit)}))
        return;
      }
    }
    setPayload((state: any) => ({
      ...state,
      Price: (_price - step).toFixed(toFixedBit)
    }))
  }

   // 平仓
   const closeOrder = (Ticket: number) => {
    const data = {
      Ticket,
      ..._.pick(payload, ['Mt4ClientApiToken', 'Volume']),
      Price: '0',
      Slippage: 0
    }
    dispatch(ACTIONS.TRADE.closeOrder({ type: accountType.type, data, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({ text: '平仓操作成功' }));
      navigation.navigate('TradeDone', { data: {...res.Data, Type: '平仓'} });
    }}))
  }

  // 建仓市场价
  const openMarketOrder = () => {
    const data = {
      ..._.omit(payload, ['Price', 'Expiration']),
      Stoploss: !payload.Stoploss ? '0' : `${payload.Stoploss}`,
      Takeprofit: !payload.Takeprofit ? '0' : `${payload.Takeprofit}`,
      Volume: Number(payload.Volume).toFixed(2),
    }
    dispatch(ACTIONS.TRADE.openMarketOrder({ type: accountType.type, data, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({ text: '建仓成功' }));
      navigation.navigate('TradeDone', { data: {...res.Data, Type: '开仓'} });
    }}))
  }

  // 挂单
  const openPendingOrder = () => {
    if(!payload.Price || payload.Price < 0.01){
      dispatch(ACTIONS.BASE.openToast({ text: '无效的挂单价格' }));
      return;
    }
    const data = {
      ...payload,
      Stoploss: !payload.Stoploss ? '0' : `${payload.Stoploss}`,
      Takeprofit: !payload.Takeprofit ? '0' : `${payload.Takeprofit}`,
      Volume: Number(payload.Volume).toFixed(2),
    }
    dispatch(ACTIONS.TRADE.openPendingOrder({ type: accountType.type, data, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({ text: '创建挂单成功' }));
      navigation.navigate('TradeDone', { data: {...res.Data, Type: '创建挂单'} });
    }}))
  }



  return {
    instant,
    symbols: mt4Info?.SymbolParamsMany.map((item: any) => ({ key: item.symbolName, ...item.symbol })),
    mt4Info,
    payload,
    setPayload,
    openMarketOrder,
    changeVolume,
    referPayment,
    changeStoploss,
    changeTakeprofit,
    changeLimitPrice,
    openPendingOrder,
    limitInput,
    closeOrder,
    setStoplossTakeprofit,
    modifyPendingOrder
  }

}

// 交易类型
export const TRADE_TYPE = {
  Buy: 'Buy(买入)',
  Sell: 'Sell(卖出)'
}

// TRADE_TYPE 转换成 [{key: '买入, value: 'Buy'}]
export const TRADE_TYPE_LIST = _.map(TRADE_TYPE, (value, key) => ({ key, value }));


// 限额类型
export const LIMIT_TYPE = {
  BuyLimit: 'Buy Limit(买入限价)',
  SellLimit: 'Sell Limit(卖出限价)',
  BuyStop: 'Buy Stop(买入停损)',
  SellStop: 'Sell Stop(卖出停损)'
}

// TRADE_TYPE 转换成 [{key: '买入, value: 'Buy'}]
export const LIMIT_TYPE_LIST = _.map(LIMIT_TYPE, (value, key) => ({ key, value }));

// 所有类型
export const ALL_TYPE_LIST: any = [...TRADE_TYPE_LIST, ...LIMIT_TYPE_LIST];

// 有效期
export const EXPIRATION: any = [
  {key: '', value: '撤单前有效'},
  {key: dayjs().add(7, 'day').endOf('day').format('YYYY-MM-DDTHH:mm:ss'), value: '7天有效' },
  { key: dayjs().add(1, 'month').endOf('day').format('YYYY-MM-DDTHH:mm:ss'), value: '1个月有效' },
  { key: dayjs().endOf('day').format('YYYY-MM-DDTHH:mm:ss'), value: '当天有效' }
]

// 止盈止损
export const STOPLOSS_TAKEPROFIT: any = {
  Buy: {
    Stoploss: "≤",
    Takeprofit: "≥",
  },
  Sell: {
    Stoploss: "≥",
    Takeprofit: "≤"
  },
  BuyLimit: {
    Stoploss: "≤",
    Takeprofit: "≥",
  },
  SellLimit: {
    Stoploss: "≥",
    Takeprofit: "≤"
  },
  BuyStop: {
    Stoploss: "≤",
    Takeprofit: "≥"
  },
  SellStop: {
    Stoploss: "≥",
    Takeprofit: "≤"
  }
}

// 限价停损
export const LIMIT_PRICE: any = {
  BuyLimit: "≤",
  SellLimit: "≥",
  BuyStop: "≥",
  SellStop: "≤"
}

