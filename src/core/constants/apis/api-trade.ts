/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 11:37:38
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/constants/apis/api-trade.ts
 * @Description:
 */
export default {

  ['trade/connect-mt4']: 'Mt4Trading/Connect',

  ['trade/open-market-order']: 'Mt4Trading/OrderOpenMarket',

  ['trade/open-pending-order']: 'Mt4Trading/OrderOpenPending',

  ['trade/get-history-orders']: 'Mt4Trading/OrderHistory',

  ['trade/cancel-pending-order']: 'Mt4Trading/OrderCancelPendingOrder',

  ['trade/get-kline-data']: 'Mt4Trading/QuoteHistory',

  ['trade/close-order']: 'Mt4Trading/OrderCloseMarket',

  ['trade/set-stop-loss-take-profit']: 'Mt4Trading/OrderModifyOpenedOrder',

  ['trade/modify-pending-order']: 'Mt4Trading/OrderModifyPendingOrder'

}