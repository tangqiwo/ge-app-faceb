/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 11:45:44
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/trade/useTradeConnect.ts
 * @Description: 连接保持 MT4 TOKEN
 */
import _ from 'lodash';
import React from 'react';
import usePublicState from "../usePublicState";
import { useSelector } from 'react-redux';
import useWebsocket from '../useWebsocket';
import { INSTANT_QUOTES_STATUS } from '../useInstantQuotes';
import { toUpperCaseObj } from '@helpers/unit';
import store from '@helpers/storage';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const mt4Info = useSelector((state: any) => state.trade.mt4Info);
  const { messages } = useWebsocket({url: mt4Info?.Url, protocol: 'mt4'});
  const symbols = mt4Info?.Symbols
  const instant = useSelector((state: any) => state.trade.instant);

  React.useEffect(() => {
    if(messages && symbols && symbols.length > 0) {
      try{
        const res = toUpperCaseObj(JSON.parse(messages))
        if(res.Type === 'Quote') {
          handleQuotes(res);
          return;
        }
        if(res.Type === 'OrderProfit') {
          handleOrders(res, false);
          return;
        }
        if(res.Type == 'OrderUpdate'){
          console.log(res.Type, res)
          handleOrders(res, true);
        }
      }
      catch(e){
        console.log(e);
      }
    }
  }, [messages])

  // 处理报价
  const handleQuotes = (res: any) => {
    if(_.includes(symbols, res?.Data?.Symbol)) {
      const currentInstant = _.find(instant, {Symbol: res.Data.Symbol}) || { Ask: 0, Bid: 0 };
      // 上一口和下一口一样，不更新
      if(currentInstant.Ask === res.Data.Ask && currentInstant.Bid === res.Data.Bid) return;
      var newInstant = _.chain(instant || [])
                        .cloneDeep()
                        .filter(i => i.Symbol !== res.Data.Symbol)
                        .concat({
                          ...res.Data,
                          askStatus: currentInstant.Ask > res.Data.Ask ? INSTANT_QUOTES_STATUS.DOWN :
                                     currentInstant.Ask === res.Data.Ask ? INSTANT_QUOTES_STATUS.FLAT :
                                      INSTANT_QUOTES_STATUS.UP,
                          bidStatus: currentInstant.Bid > res.Data.Bid ? INSTANT_QUOTES_STATUS.DOWN :
                                      currentInstant.Bid === res.Data.Bid ? INSTANT_QUOTES_STATUS.FLAT :
                                      INSTANT_QUOTES_STATUS.UP,
                        })
                        .orderBy('Symbol')
                        .value();
      dispatch(ACTIONS.TRADE.setInstantQuotes({data: newInstant}));
    }
  }

  // 处理订单
  const handleOrders = React.useCallback((res: any, isUpdate: boolean) => {
    dispatch(ACTIONS.TRADE.setInstantOrders({data: res, isUpdate}));
  }, [])


  // 组装第一口价格
  const makeFirstInstant = React.useCallback((SymbolsQuote: any) => {
    const newInstant = _.chain(SymbolsQuote)
                        .map(i => {
                          return {
                            Symbol: i.Symbol,
                            Ask: Number(i.Ask),
                            Bid: Number(i.Bid),
                            askStatus: INSTANT_QUOTES_STATUS.FLAT,
                            bidStatus: INSTANT_QUOTES_STATUS.FLAT,
                          }
                        })
                        .orderBy('Symbol')
                        .value();
    dispatch(ACTIONS.TRADE.setInstantQuotes({data: newInstant}));
  }, [])

  // 链接MT4
  const authToMt4 = React.useCallback(({ password, callback }: { password: string, callback: Function }) => {
    if (!password) {
      dispatch(ACTIONS.BASE.openToast({ text: '请输入MT4密码' }));
      return;
    }
    dispatch(ACTIONS.TRADE.connetMt4({ data: { password }, cb: (res: any) => {
      if(res.Code !== 0){
        store.remove('MT4-PASS');
        dispatch(ACTIONS.BASE.openToast({ text: res.Desc }));
        return;
      }
      console.log(callback, res);
      callback(res);
    }}))
  }, [])


  return {
    authToMt4,
    makeFirstInstant
  }

}


export const CMD_MAPPING: any = {
  0: '买入',
  1: '卖出',
  2: '买入限价',
  3: '卖出限价',
  4: '买入止损',
  5: '卖出止损',
  6: '余额',
  7: '信用'
}