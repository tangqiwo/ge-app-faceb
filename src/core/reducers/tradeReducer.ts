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
      store.set('MT4-PASS', action.password)
      return {...state, mt4Info: {...action.res, Password: action.password}};
    }
    case TYPES.USER.LOGOUT: {
      return {...initialState.trade };
    }
    default:
      return state;
  }
}
