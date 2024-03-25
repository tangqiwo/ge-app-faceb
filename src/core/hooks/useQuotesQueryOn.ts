/*
 * @Author: Galen.GE
 * @Date: 2024-03-25 15:39:51
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useQuotesQueryOn.ts
 * @Description:
 */
import _ from 'lodash'
import React from "react";
import ACTIONS from '@actions/index';
import { useLatest } from 'react-use';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '@schemas/redux-store';
import useEventEmitter from "./useEventEmitter";
import {TMitt} from '@core/constants/enum/mitt';
import { toUpperCaseObj } from '@helpers/unit';
import G from '@constants/global';

export default () => {

  const dispatch = useDispatch();
  const { symbols } = useSelector((state: IStore) => state.quotes);
  const [instantQuotes, setInstantQuotes] = React.useState<any>(G.GET('INSTANT_QUOTES') || ['XAGUSDpro', 'XAUUSDpro'].map(i => ({
    Symbol: i,
    Ask: 0,
    Bid: 0,
    changeValue: 0,
    changePercent: 0,
    askStatus: 'FLAT',
    bidStatus: 'FLAT'
  })));
  const latestInstant = useLatest(instantQuotes);
  const latestSymbols = useLatest(symbols);
  const intervalTimer = React.useRef<any>(null);

  React.useEffect(() => {
    intervalTimer.current = setInterval(() => {
      dispatch(ACTIONS.QUOTES.getInstantQuotes({}));
    }, 15000);
    dispatch(ACTIONS.QUOTES.getInstantQuotes({}));
    return () => {
      clearInterval(intervalTimer.current);
    }
  }, [])

  useEventEmitter<TMitt['syncWebServiceData']>({mittName: 'syncWebServiceData', on: (data) => {
    if(data.message){
      const res = toUpperCaseObj(JSON.parse(data.message));
      let newInstant: any = [];
      _.each(res.SymbolList, (symbolData: any) => {
        if(_.find(latestSymbols.current, {Key: symbolData.Symbol})){
          const closePrice = _.find(latestSymbols.current, {Key: symbolData.Symbol})?.Close;
          const currentInstant = _.find(latestInstant.current, {Symbol: symbolData.Symbol}) || { Ask: 0, Bid: 0 };
          newInstant.push({
            ...symbolData,
            Ask: Number(symbolData.Ask),
            Bid: Number(symbolData.Bid),
            changeValue: _.floor(closePrice - symbolData.Ask, 3),
            changePercent: _.floor((closePrice - symbolData.Ask) / closePrice * 100, 2),
            spread: SPREAD[symbolData.Symbol],
            askStatus: currentInstant.Ask > symbolData.Ask ? INSTANT_QUOTES_STATUS.DOWN :
                       currentInstant.Ask === symbolData.Ask ? INSTANT_QUOTES_STATUS.FLAT :
                        INSTANT_QUOTES_STATUS.UP,
            bidStatus: currentInstant.Bid > symbolData.Bid ? INSTANT_QUOTES_STATUS.DOWN :
                        currentInstant.Bid === symbolData.Bid ? INSTANT_QUOTES_STATUS.FLAT :
                        INSTANT_QUOTES_STATUS.UP,
          })
        }
      })
      const oldInstant = _.chain(latestInstant.current || [])
                          .filter(i => !_.map(newInstant, 'Symbol').includes(i.Symbol))
                          .orderBy('Symbol')
                          .value();
      const result = _.orderBy([...oldInstant, ...newInstant], 'Symbol');
      G.SET('INSTANT_QUOTES', result);
      setInstantQuotes(result);
    }
  }});

  return {
    instantQuotes
  }

}



// 涨跌平状态
export const INSTANT_QUOTES_STATUS = {
  UP: 'UP',
  DOWN: 'DOWN',
  FLAT: 'FLAT',
}

// 涨跌平状态对应颜色
export const INSTANT_QUOTES_STATUS_COLOR: any = {
  UP: '#00A010',
  DOWN: '#FF0000',
  FLAT: '#94938F',
}

// 涨跌平状态对应图标
export const INSTANT_QUOTES_STATUS_ICON: any = {
  UP: '↑',
  DOWN: '↓',
  FLAT: '',
}

// 点差
export const SPREAD: any = {
  XAGUSD: 0.03,
  XAUUSD: 0.5,
}