/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2024-04-12 16:33:42
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/usePayment.ts
 * @Description:
 */
import _ from 'lodash'
import React from "react";
import { Linking } from 'react-native';
import { useLatest } from "react-use";
import usePublicState from "./usePublicState"
import { base64Encode } from '@core/helpers/base64';
import { TIPS_TYPE } from '@hooks/useDeposit'

interface IProps {
  data: any
}
export default ({data}: IProps) => {

  const { dispatch, ACTIONS, isFocused } = usePublicState();
  const [ paymentDomain, setPaymentDomain ] = React.useState<string>('https://pay.getzhj.com/');
  const [ paymentAddress, setPaymentAddress ] = React.useState<string>('');
  const [ countdown, setCountdown ] = React.useState<number>(data.CutDown);
  const leastCountdown = useLatest(countdown);
  const [ countdownLabel, setCountdownLabel ] = React.useState<string>('');
  const [ showTips, setShowTips ] = React.useState<TIPS_TYPE>(null);
  const timer = React.useRef<any>();

  React.useEffect(() => {
    if(!isFocused) {
      clearInterval(timer.current);
    }
  }, [isFocused])

  React.useEffect(() => {
    if(data.ShowTips){
      setShowTips(TIPS_TYPE.GO_TO_UPLOAD_VOUCHER);
    }
    dispatch(
      ACTIONS.BASE.getTransactionPageConfig({
        cb: (res: any) => {
          if (res.Code === 0 && res.Type === 0) {
            setPaymentDomain(res.Data.IndependentPaymentDepositPageUrl);
          }
        },
      }),
    );
    const countdownFn = () => {
      if(leastCountdown.current > 0) {
        setCountdown((state: number) => {
          // 转换成文字 xx 分 xx 秒
          const newCountdown = data.CutDown - Math.floor((_.now() - data.NowTime) / 1000);
          // 剩余分钟, 不够10分钟的时候前面加0
          const minutes = Math.floor(newCountdown / 60);
          // 剩余秒数, 不够10秒的时候前面加0
          const seconds = newCountdown % 60;
          // 不够10分钟的时候前面加0
          const _countdownLabel = ` ${minutes < 10 ? '0' + minutes : minutes}分${seconds < 10 ? '0' + seconds : seconds}秒 `;
          setCountdownLabel(_countdownLabel);
          mankeNewAddress(newCountdown);
          return newCountdown;
        });
        return;
      }
      clearInterval(timer.current);
      setShowTips(TIPS_TYPE.TIMEOUT);
    }
    countdownFn();
    timer.current = setInterval(() => {
      countdownFn();
    }, 1000)
    return () => {
      clearInterval(timer.current);
    }
  }, [])


  const mankeNewAddress = (_countdown: number) => {
    let params: any = {};
    const ext = JSON.parse(data.Extra);
    if (ext.Type === 'JumpUrl') {
      setPaymentAddress(ext.JumpUrl?.Url);
      return;
    }
    if (ext.Type === 'BankCard') {
      params = {
        name: ext.BankCard.RealNameOfPayee,
        account: ext.BankCard.AccountOfPayee,
        bank: ext.BankCard.BankName,
        branch: ext.BankCard.BankBranch,
        order: data.Id,
        money: data.SourceAmount,
        countdown: _countdown,
        returnUrl: ''
      };
      setPaymentAddress(`${paymentDomain}?data=${encodeURIComponent(base64Encode(JSON.stringify(params)))}&channel=bankcard`);
      return;
    }
    if (ext.Type === 'VirtualCurrency') {
      params = {
        address: ext.VirtualCurrency.Address,
        money: data.SourceAmount,
        order: data.Id,
        blockchain: ext.VirtualCurrency.BlockChain,
        countdown: _countdown,
        returnUrl: ''
      };
      setPaymentAddress(`${paymentDomain}?data=${encodeURIComponent(base64Encode(JSON.stringify(params)))}&channel=usdt`);
      return;
    }
  }

  const toPayment = () => {
    if(!paymentAddress) {
      dispatch(ACTIONS.BASE.openToast({ text: '支付方式错误 #0121', types: 'error' }));
      return;
    }
    setShowTips(TIPS_TYPE.GO_TO_UPLOAD_VOUCHER);
    Linking.openURL(paymentAddress);
  }

  return {
    showTips,
    setShowTips,
    toPayment,
    paymentDomain,
    paymentAddress,
    countdownLabel,
  }

}