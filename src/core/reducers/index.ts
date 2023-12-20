/*
 * @Description: reducers 入口
 * @Author: Galen.GE
 * @Date: 2019-12-17 17:45:18
 * @LastEditTime: 2023-12-18 11:59:06
 * @LastEditors: Galen.GE
 */
import { combineReducers } from 'redux'

import base from './baseReducer'
import user from './userReducer'
import promotion from './promotionReducer'
import quotes from './quotesReducer'
import trade from './tradeReducer'

const rootReducer = combineReducers({
  base,
  user,
  promotion,
  quotes,
  trade
})

export default rootReducer
