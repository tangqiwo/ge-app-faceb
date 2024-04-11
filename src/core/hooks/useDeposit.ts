/*
 * @Author: Galen.GE
 * @Date: 2024-04-09 01:42:39
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useDeposit.ts
 * @Description: 注资
 */
import _ from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import usePublicState from "./usePublicState"

export default () => {

  const { dispatch, ACTIONS, isFocused, navigation } = usePublicState();
  const infos = useSelector((state: any) => state.user.info);
  const [ channels, setChannels ] = React.useState(null);
  const [ showTips, setShowTips ] = React.useState(null);
  const [ bankCards, setBankCards ] = React.useState(null);
  const [ currentChannel, setCurrentChannel ] = React.useState(null);
  // 汇率
  const [rate, setRate] = React.useState({});

  React.useEffect(() => {
    if (isFocused) {
      getBankCards();
      getAllChannels();
    }
  }, [isFocused])

  React.useEffect(() => {
    dispatch(ACTIONS.BASE.openLoading());
    if(bankCards && channels){
      dispatch(ACTIONS.BASE.closeLoading());
    }
  }, [bankCards, channels])

  const getBankCards = () => {
    dispatch(ACTIONS.PAYMENT.getBankAcc({cb: (res: any) => {
      setBankCards(res.Data || []);
    }}))
  }

  const getAllChannels = () => {
    dispatch(ACTIONS.PAYMENT.getAllChannels({cb: (res: any) => {
      setRate({
        CnyToUsd: Number(res.Data?.CnyToUsd),
        UsdToCny: Number(res.Data?.UsdToCny),
      });
      setChannels(res.Data?.ChannelsOfDeposit.filter((i: any) => _.includes(PAYMENT_TYPE, i.PaymentType)));
    }}))
  }

  // 选择通道
  const selectChannel = (channel: any) => {
    // 渠道是否需要绑定身份证
    if(channel.UserActivateIdCardImage && infos.BindPrivateInformation?.ValidationStateOfManager != 3){
      if (infos.BindPrivateInformation?.validationStateOfManager === 1) {
        setShowTips(TIPS_TYPE.PENDING_TO_APPROVE)
        return;
      }
      setShowTips(TIPS_TYPE.NOT_BIND_ID_CARD)
    }
    // 渠道是否需要绑定银行卡
    if(channel.UserActivateBankCard && bankCards.length === 0){
      setShowTips(TIPS_TYPE.NOT_BIND_BANK_CARD)
      return;
    }
    setCurrentChannel(channel);
    navigation.navigate('Deposit-2', { submitDeposit  });
  }

  const submitDeposit = (data: any) => {
    console.log(channels);
  }

  return {
    channels,
    showTips,
    getAllChannels,
    selectChannel
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

// TIPS 类型
export enum TIPS_TYPE {
  //  等待身份证审批
  PENDING_TO_APPROVE= 'PENDING_TO_APPROVE',
  // 未绑定身份证
  NOT_BIND_ID_CARD= 'NOT_BIND_ID_CARD',
  // 未绑定银行卡
  NOT_BIND_BANK_CARD= 'NOT_BIND_BANK_CARD',
  // 正在处理订单
  PROCESSING_ORDER= 'PROCESSING_ORDER',
  // 联系客服
  CONTACT_CUSTOMER_SERVICE= 'CONTACT_CUSTOMER_SERVICE',
  // 提交失败
  SUBMIT_FAILED= 'SUBMIT_FAILED',
}