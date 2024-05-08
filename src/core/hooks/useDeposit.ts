/*
 * @Author: Galen.GE
 * @Date: 2024-04-09 01:42:39
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useDeposit.ts
 * @Description: 注资
 */
import _, { set } from "lodash";
import React from "react";
import { useLatest } from "react-use";
import { useSelector } from "react-redux";
import usePublicState from "./usePublicState"

export default () => {

  const { dispatch, ACTIONS, isFocused, navigation } = usePublicState();
  const infos = useSelector((state: any) => state.user.info);
  const [ channels, setChannels ] = React.useState(null);
  const [ showTips, setShowTips ] = React.useState(null);
  const [ bankCards, setBankCards ] = React.useState(null);
  // 虚拟比钱包
  const [ virtualWallet, setVirtualWallet ] = React.useState(null);
  const [ currentChannel, setCurrentChannel ] = React.useState(null);
  const latestCurrentChannel = useLatest(currentChannel);
  const [ recommendChannel, setRecommendChannel ] = React.useState(null);
  const [ tipText, setTipText ] = React.useState('');
  const [rate, setRate] = React.useState<any>({});
  const errorChannel = React.useRef([]);

  React.useEffect(() => {
    if (isFocused) {
      getAllChannels();
      getBankCards();
      getVirtualWallet();
      errorChannel.current = [];
      dispatch(ACTIONS.USER.getUserInfo({loading: false}));
    }
  }, [isFocused])

  React.useEffect(() => {
    dispatch(ACTIONS.BASE.openLoading());
    if(bankCards && channels){
      dispatch(ACTIONS.BASE.closeLoading());
    }
  }, [bankCards, channels, virtualWallet])

  const getBankCards = () => {
    dispatch(ACTIONS.PAYMENT.getBankAcc({cb: (res: any) => {
      setBankCards(res.Data || []);
    }}))
  }

  const getVirtualWallet = () => {
    dispatch(ACTIONS.PAYMENT.getVirtAcc({cb: (res: any) => {
      setVirtualWallet(res.Data?.List || []);
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
    let myWallet = [];
    // 渠道是否需要绑定身份证
    if(channel.UserActivateIdCardImage && infos.BindPrivateInformation?.ValidationStateOfManager != 3){
      if (infos.BindPrivateInformation?.validationStateOfManager === 1) {
        setShowTips(TIPS_TYPE.PENDING_TO_APPROVE)
      }else{
        setShowTips(TIPS_TYPE.NOT_BIND_ID_CARD)
      }
      setRecommendChannel(getQuickPaymentChannels('id'));
      return;
    }
    // 渠道是否需要绑定银行卡
    if(channel.UserActivateBankCard && bankCards.length === 0){
      setShowTips(TIPS_TYPE.NOT_BIND_BANK_CARD);
      setRecommendChannel(getQuickPaymentChannels('card'));
      return;
    }
    // 虚拟币钱包
    if(_.includes(['VirtualCurrency:USDT:TRC20','VirtualCurrency:USDT:ERC20'], channel.PaymentType)){
      const walletType = _.chain(channel.PaymentType).split(':').last().value();
      myWallet = virtualWallet.filter((i: any) => _.chain(i.ChainType).split('-').last().value() === walletType);
      if(myWallet.length === 0){
        setShowTips(TIPS_TYPE.NOT_BIND_VIRTUAL_WALLET);
        return;
      }
    }
    setCurrentChannel(channel);
    navigation.navigate('Deposit-2', {
      submitDeposit,
      currentChannel: channel,
      rate,
      bankCards,
      virtualWallet: myWallet,
      showTips
    });
  }


  // 提交充值
  interface ISubmitDeposit {
    amount: number;
    bankId: number;
    virtualAddress: string;
  }
  const submitDeposit = ({amount, bankId, virtualAddress}: ISubmitDeposit) => {
    const _channel = latestCurrentChannel.current;
    // 限额
    if(amount < Number(_channel.TradingMin) || amount > Number(_channel.TradingMax)){
      dispatch(ACTIONS.BASE.openToast({text: `充值金额范围为${_channel.TradingMin}-${_channel.TradingMax}`}));
      return;
    }
    const data = {
      Amount: _channel.PaymentType.includes('VirtualCurrency') ? `${amount}` : `${_.round(amount * rate.CnyToUsd, 2)}`,
      SourceAmount: `${amount}`,
      ChannelId: _channel.Id,
      DepositPlatform: 'APP',
      ExchangeRate: _channel.PaymentType.includes('VirtualCurrency') ? 1 : rate.CnyToUsd,
      BindBankCardId: bankId || null,
      VirtualAddress: virtualAddress || null,
    }
    // 如果是虚拟币渠道则删除BindBankCardId字段，如果是银行卡渠道则删除VirtualAddress字段
    if(_channel.PaymentType.includes('VirtualCurrency')){
      delete data.BindBankCardId;
    }else{
      delete data.VirtualAddress;
    }
    dispatch(ACTIONS.PAYMENT.createDepositOrder({data, cb: (res: any) => {
      if (res.Type === 0 && _.includes([202, 204], res.Code)){
        const channel = getRecommendChannel(amount, _channel.Id);
        if(channel){
          selectChannel(channel);
          setRecommendChannel(channel);
          setShowTips(TIPS_TYPE.SWITCH_PAYMENT_CHANNEL);
          return;
        }
        setShowTips(TIPS_TYPE.CONTACT_CUSTOMER_SERVICE);
        return;
      }
      if(res.Type === 0 && _.includes([1, 203], res.Code)){
        setTipText(res.Desc);
        setShowTips(TIPS_TYPE.CUSTOM_TIPS);
        return;
      }
      // 成功
      if (res.Code === 0 && res.Type === 0) {
        navigation.navigate('Deposit-3', {...res.Data, IconUrl: _channel.IconUrl, NowTime: _.now()});
        return;
      }
      // 容错
      setTipText(res.Desc);
      setShowTips(TIPS_TYPE.CUSTOM_TIPS);
    }}))
  }

  // 取消充值订单
  const cancelDepositOrder = (orderId: number) => {
    dispatch(ACTIONS.PAYMENT.cancelDepositOrder({data: {Id: orderId}, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({text: '取消充值订单成功！', types: 'success'}));
      navigation.navigate('Deposit-1');
    }}))
  }

  // 获取快捷支付通道
  const getQuickPaymentChannels = (type: 'card' | 'id') => {
    let quickChannels = [];
    // 如果用户又没绑卡又没绑身份证
    if(infos.BindPrivateInformation?.ValidationStateOfManager != 3 && bankCards.length === 0){
      quickChannels = channels.filter((i: any) => !i.UserActivateBankCard && !i.UserActivateIdCardImage)
      return quickChannels[0] || null;
    }
    if(type === 'card'){
      quickChannels = channels.filter((i: any) => !i.UserActivateBankCard)
    }
    if(type === 'id'){
      quickChannels = channels.filter((i: any) => !i.UserActivateIdCardImage)
    }
    return quickChannels[0] || null;
  }

  // 获取推荐支付通道
  const getRecommendChannel = (amount: number, channelId: number): any => {
    let recommendChannels: any = [];
    errorChannel.current.push(channelId);
    // 限额
    channels.filter((i: any) => !_.includes(errorChannel.current, i.Id)).map((i: any) => {
      if(amount >= Number(i.TradingMin) && amount <= Number(i.TradingMax)){
        recommendChannels.push(i);
      }
    })
    // 绑定id
    if(infos.BindPrivateInformation?.ValidationStateOfManager != 3){
      recommendChannels = recommendChannels.filter((i: any) => !i.UserActivateIdCardImage);
    }
    // 绑定银行卡
    if(bankCards.length === 0){
      recommendChannels = recommendChannels.filter((i: any) => !i.UserActivateBankCard);
    }
    // 是否有 ERC20 钱包
    if(virtualWallet.filter((i: any) => i.ChainType === 'USDT-ERC20').length === 0){
      recommendChannels = recommendChannels.filter((i: any) => i.PaymentType !== 'VirtualCurrency:USDT:ERC20');
    }
    // 是否有 TRC20 钱包
    if(virtualWallet.filter((i: any) => i.ChainType === 'USDT-TRC20').length === 0){
      recommendChannels = recommendChannels.filter((i: any) => i.PaymentType !== 'VirtualCurrency:USDT:TRC20');
    }
    return recommendChannels.length === 0 ? null : recommendChannels[0];
  }


  return {
    rate,
    channels,
    showTips,
    getAllChannels,
    selectChannel,
    setShowTips,
    recommendChannel,
    currentChannel,
    cancelDepositOrder,
    tipText
  }

}


//  有效发的支付种类
export const PAYMENT_TYPE = [
  'BankCard',
  'AliPay',
  'WeChat',
  'VirtualCurrency:USDT:TRC20',
  'VirtualCurrency:USDT:ERC20',
  'DigitalRMB'
]

export const PAYMENT_TYPE_NAME: any = {
  'BankCard': '银联支付',
  'AliPay': '支付宝',
  'WeChat': '微信支付',
  'VirtualCurrency:USDT:TRC20': 'USDT-TRC20',
  'VirtualCurrency:USDT:ERC20': 'USDT-ERC20',
  'DigitalRMB': '数字人民币'
}

// TIPS 类型
export enum TIPS_TYPE {
  //  等待身份证审批
  PENDING_TO_APPROVE= 'PENDING_TO_APPROVE',
  // 未绑定身份证
  NOT_BIND_ID_CARD= 'NOT_BIND_ID_CARD',
  // 未绑定银行卡
  NOT_BIND_BANK_CARD= 'NOT_BIND_BANK_CARD',
  // 未绑定虚拟币钱包
  NOT_BIND_VIRTUAL_WALLET= 'NOT_BIND_VIRTUAL_WALLET',
  // 切换支付通道
  SWITCH_PAYMENT_CHANNEL= 'SWITCH_PAYMENT_CHANNEL',
  // 正在处理订单
  PROCESSING_ORDER= 'PROCESSING_ORDER',
  // 联系客服
  CONTACT_CUSTOMER_SERVICE= 'CONTACT_CUSTOMER_SERVICE',
  // 自定义提示
  CUSTOM_TIPS= 'CUSTOM_TIPS',
  // 提交失败
  SUBMIT_FAILED= 'SUBMIT_FAILED',
  // 超时
  TIMEOUT= 'TIMEOUT',
  // 去上传凭证
  GO_TO_UPLOAD_VOUCHER= 'GO_TO_UPLOAD_VOUCHER',
}