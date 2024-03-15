/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-30 10:40:02
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/reducers/quotesReducer.ts
 * @Description:
 */
import _ from 'lodash';
import TYPES from '@constants/types';
import initialState from './redux-store';

export default function user(state = initialState.quotes, action: any) {
  switch (action.type) {
    // 获取实时行情数据
    case TYPES.QUOTES.GET_GET_INSTANT_QUOTES: {
      const data = {
        wsLink: action.res.OnQuoteLink,
        symbols: action.res.Symbols.map((item: any) => ({
          Key: item.Key + 'pro',
          Title: item.Title,
          ...item.QuoteHistory,
          Open: _.floor(item.QuoteHistory.Open, 3),
          High: _.floor(item.QuoteHistory.High, 3),
          Low: _.floor(item.QuoteHistory.Low, 3),
          Close: _.floor(item.QuoteHistory.Close, 3),
        }))
      }
      return { ...state, ...data };
    }
    // 设置来自ws的实时行情数据
    case TYPES.QUOTES.SET_INSTANT_QUOTES: {
      return { ...state, instant: action.data };
    }
    // 设置当前的symbol
    case TYPES.QUOTES.CHANGE_SYMBOL: {
      return { ...state, symbol: action.symbol };
    }
    default:
      return state;
  }
}
