/*
 * @Description: ACTION入口，可以通过 import * as Actions from 来一次性导入所有的ACTION
 * @Author: Galen.GE
 * @Date: 2019-12-19 14:28:03
 * @LastEditTime: 2023-12-18 11:49:16
 * @LastEditors: Galen.GE
 */

import * as BASE from './baseAction';
import * as USER from './userAction';
import * as PROMOTION from './promotionAction';
import * as PAYMENT from './paymentAction';
import * as DASHBOARD from './dashboardAction';
import * as QUOTES from './quotesAction';
import * as TRADE from './tradeAction';

export default {
  BASE,
  USER,
  PROMOTION,
  PAYMENT,
  DASHBOARD,
  QUOTES,
  TRADE
}
