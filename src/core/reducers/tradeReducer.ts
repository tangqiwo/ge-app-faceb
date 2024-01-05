/*
 * @Author: Passion.KMG
 * @Date: 2023-12-18 11:41:34
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/reducers/tradeReducer.ts
 * @Description:
 */
import _ from 'lodash';
import TYPES from '@constants/types';
import initialState from './redux-store';
import store from '@helpers/storage';

export default function user(state = initialState.trade, action: any) {
  switch (action.type) {
    // 链接MT4
    case TYPES.TRADE.CONNECT_MT4: {
      if(action.response.Code != 0) {
        return state;
      }
      store.set('MT4-PASS', action.password)
      return {...state, mt4Info: {...action.res, Password: action.password}, instantOrders: action.res.TradesNotClose};
    }
    // 设置来自ws的实时行情数据
    case TYPES.TRADE.SET_INSTANT_QUOTES: {
      return {
        ...state,
        instant: action.data
      };
    }
    // 设置来自ws的实时订单数据
    case TYPES.TRADE.SET_INSTANT_ORDERS: {
      const data = action.data.Data;
      // 更新金额，订单
      var AccountSummary = _.cloneDeep(state.mt4Info.AccountSummary);
      AccountSummary = {
        ...AccountSummary,
        ..._.chain(data).omit(['Orders', 'Currency', 'Type']).mapValues((i) => Number(i).toFixed(2)).value()
      }
      const orders = data.Orders || data.OpenedOrders;
      const instantOrders = orders.map((item: any) => ({
        Ticket: item.Ticket,
        Symbol: item.Symbol,
        Cmd: item.Ex.Cmd,
        Volume: item.Ex.Volume,
        OpenTime: item.OpenTime,
        OpenPrice: item.Ex.Open_price,
        Sl: item.Ex.Sl,
        Tp: item.Ex.Tp,
        CloseTime: item.CloseTime,
        Swaps: item.Swap,
        ClosePrice: item.Ex.Close_price,
        Profit: item.Ex.Profit,
        Commission: item.Commission,
        Expiration: item.Expiration
      }))
      // 更新已存在的订单，且顺序不变
      // const newOrders = _.chain((state as any).instantOrders).map((item: any) => {
      //   const newOrder = _.find(instantOrders, {Ticket: item.Ticket})
      //   if(newOrder) {
      //     return newOrder
      //   }
      //   return item
      // }).value()
      const oldOrders = _.cloneDeep(state.instantOrders);
      const newOrders = oldOrders.map((item: any) => {
        const newOrder = _.find(instantOrders, {Ticket: item.Ticket})
        if(newOrder) {
          return newOrder
        }
        return item
      });
      return {
        ...state,
        mt4Info: {
          ...state.mt4Info,
          AccountSummary,
        },
        instantOrders: action.isUpdate ? instantOrders : newOrders
      };
    }
    case TYPES.USER.LOGOUT: {
      return {...initialState.trade };
    }
    default:
      return state;
  }
}

