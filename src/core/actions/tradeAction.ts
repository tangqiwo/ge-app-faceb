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