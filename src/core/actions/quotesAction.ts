/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-30 10:57:46
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/actions/quotesAction.ts
 * @Description:
 */
import * as INTERFACE from '@schemas/redux-action';
import { HTTP } from '@core/helpers/http';
import TYPES from '@core/constants/types';

// 获取实时行情数据
export const getInstantQuotes = (props: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.QUOTES.GET_GET_INSTANT_QUOTES,
  payload: {
    key: 'quotes/get-instant-quotes',
    method: HTTP.METHODS.GET,
  },
  cb: props.cb,
});

// 设置来自ws的实时行情数据
export const setInstantQuotes = ({data}: INTERFACE.IProps): INTERFACE.IBase => ({
  type: TYPES.QUOTES.SET_INSTANT_QUOTES,
  data
})