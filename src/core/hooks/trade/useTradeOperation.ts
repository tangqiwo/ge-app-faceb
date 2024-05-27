/*
 * @Author: Galen.GE
 * @Date: 2023-12-29 10:40:22
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/trade/useTradeOperation.ts
 * @Description:
 */
import React from 'react';
import { useSelector } from 'react-redux';
import usePublicState from '@hooks/usePublicState';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [ data, setData ] = React.useState<any>();
  const [ date, setDate ] = React.useState<'today' | '7days' | '30days' | 'others'>('today');
  const Mt4ClientApiToken = useSelector((state: any) => state.trade.mt4Info?.Mt4ClientApiToken);
  const accountType = useSelector((state: any) => state.trade.accountType);
  const [ count, setCount ] = React.useState<number>(0);
  const [startDate, setStartDate] = React.useState<string>();
  const [endDate, setEndDate] = React.useState<string>();

  // 历史订单
  const getHistoryOrders = (Range: Array<any>, PageNo = 1, cb?: Function) => {
    const data: any = {
      Symbol: "",
      Range,
      Page: PageNo,
      PageSize: 40,
    }
    dispatch(ACTIONS.TRADE.getHistoryOrders({ type: accountType.type, data, cb: (res: any) => {
      setData(res?.Data?.Data);
      setCount(res?.Data?.Count);
      cb();
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
          dispatch(ACTIONS.TRADE.cancelPendingOrder({ type: accountType.type, data: { Ticket: tiketId, Mt4ClientApiToken}, cb: (res: any) => {
            dispatch(ACTIONS.BASE.openToast({ text: '撤单成功' }));
          }}));
        }
      }]
    }))
  }


  return {
    data,
    count,
    date,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setDate,
    getHistoryOrders,
    cancelPendingOrder
  }

}