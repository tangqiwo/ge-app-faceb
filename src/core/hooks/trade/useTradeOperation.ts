/*
 * @Author: Galen.GE
 * @Date: 2023-12-29 10:40:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/trade/useTradeOperation.ts
 * @Description:
 */
import React from 'react';
import { useSelector } from 'react-redux';
import usePublicState from '@hooks/usePublicState';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [ data, setData ] = React.useState<any>();

  const Mt4ClientApiToken = useSelector((state: any) => state.trade.mt4Info?.Mt4ClientApiToken);

  // 历史订单
  const getHistoryOrders = () => {
    const data: any = {
      Symbol: "",
      Range: [],
      Page: 1,
      PageSize: 40,
    }
    dispatch(ACTIONS.TRADE.getHistoryOrders({ data, cb: (res: any) => {
      setData(res?.Data?.Data);
    }}));
  }

  //撤销挂单
  const cancelPendingOrder = (tiketId: number | string) => {
    dispatch(ACTIONS.BASE.openConfirm({
      title: '撤单确认',
      content: `是否确认撤销挂单 #${tiketId}`,
      actions: [{
        text: '确认撤销',
        type: 'destructive',
        cb: () => {
          dispatch(ACTIONS.TRADE.cancelPendingOrder({ data: { Ticket: tiketId, Mt4ClientApiToken}, cb: (res: any) => {
            dispatch(ACTIONS.BASE.openToast({ text: '撤单成功' }));
            getHistoryOrders();
          }}));
        }
      }]
    }))
  }


  return {
    data,
    getHistoryOrders,
    cancelPendingOrder
  }

}