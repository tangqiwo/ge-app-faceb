/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 11:37:38
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/constants/apis/api-trade.ts
 * @Description:
 */
export default {

  ['trade/connect-mt4']: '$/Connect',

  ['trade/open-market-order']: '$/OrderOpenMarket',

  ['trade/open-pending-order']: '$/OrderOpenPending',

  ['trade/get-history-orders']: '$/OrderHistory',

  ['trade/cancel-pending-order']: '$/OrderCancelPendingOrder',

  ['trade/get-kline-data']: 'portal/QuoteHistory',

  ['trade/close-order']: '$/OrderCloseMarket',

  ['trade/set-stop-loss-take-profit']: '$/OrderModifyOpenedOrder',

  ['trade/modify-pending-order']: '$/OrderModifyPendingOrder'

}