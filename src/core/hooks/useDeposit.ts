/*
 * @Author: Galen.GE
 * @Date: 2024-04-09 01:42:39
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useDeposit.ts
 * @Description: 注资
 */
import _ from "lodash";
import React from "react";
import usePublicState from "./usePublicState"

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [channels, setChannels] = React.useState([]);
  // 汇率
  const [rate, setRate] = React.useState({});

  const getAllChannels = () => {
    dispatch(ACTIONS.PAYMENT.getAllChannels({cb: (res: any) => {
      console.log(res);
      setRate({
        CnyToUsd: Number(res.Data?.CnyToUsd),
        UsdToCny: Number(res.Data?.UsdToCny),
      });
      setChannels(res.Data?.ChannelsOfDeposit.filter((i: any) => _.includes(PAYMENT_TYPE, i.PaymentType)));
    }}))
  }

  return {
    channels,
    getAllChannels
  }

}


//  有效发的支付种类
export const PAYMENT_TYPE = [
  'BankCard',
  'AliPay',
  'WeChat',
  'VirtualCurrency:USDT:TRC20',
  'VirtualCurrency:USDT:ERC20'
]