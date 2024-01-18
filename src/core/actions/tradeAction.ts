/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-12-12 00:47:47
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/actions/tradeAction.ts
 * @Description:
 */
import * as INTERFACE from '@schemas/redux-action';
import { HTTP } from '@core/helpers/http';
import TYPES from '@core/constants/types';

// 链接MT4
export const connetMt4 = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.TRADE.CONNECT_MT4,
  payload: { key: 'trade/connect-mt4', data, method: HTTP.METHODS.POST, loading: true },
  password: data.password,
  passError: true,
  cb
})

// 设置来自ws的实时行情数据
export const setInstantQuotes = ({data}: INTERFACE.IProps): INTERFACE.IBase => ({
  type: TYPES.TRADE.SET_INSTANT_QUOTES,
  data
})

// 建仓市场价
export const openMarketOrder = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'trade/open-market-order', data, method: HTTP.METHODS.POST, loading: true },
  cb
})

// 挂单
export const openPendingOrder = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'trade/open-pending-order', data, method: HTTP.METHODS.POST, loading: true },
  cb
})

// 查询历史注单
export const getHistoryOrders = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'trade/get-history-orders', data, method: HTTP.METHODS.POST },
  cb
})

// 撤销挂单
export const cancelPendingOrder = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'trade/cancel-pending-order', data, method: HTTP.METHODS.POST, loading: true },
  cb
})

// K线数据
export const getKlineData = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'trade/get-kline-data', data, method: HTTP.METHODS.POST },
  cb
})

// 设置实时订单
interface ISetInstantOrders extends INTERFACE.IProps {
  isUpdate: boolean
}
export const setInstantOrders = ({data, isUpdate}: ISetInstantOrders): INTERFACE.IBase => ({
  type: TYPES.TRADE.SET_INSTANT_ORDERS,
  isUpdate,
  data
})

// 平仓
export const closeOrder = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'trade/close-order', data, method: HTTP.METHODS.POST, loading: true },
  cb
})

// 设置止盈止损
export const setStopLossTakeProfit = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'trade/set-stop-loss-take-profit', data, method: HTTP.METHODS.POST, loading: true },
  cb
})

// 修改挂单

export const modifyPendingOrder = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'trade/modify-pending-order', data, method: HTTP.METHODS.POST, loading: true },
  cb
})

// 设置K线数据
export const setKlineData = ({data}: INTERFACE.IProps): INTERFACE.IBase => ({
  type: TYPES.TRADE.GET_KLINE_DATA,
  data
})