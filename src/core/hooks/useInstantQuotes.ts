/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-30 10:29:55
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useInstantQuotes.ts
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { IStore } from '@schemas/redux-store';
import { useLatest } from 'react-use';
import { useSelector } from 'react-redux';
import useWebsocket from './useWebsocket';
import usePublicState from './usePublicState';
import { toUpperCaseObj } from '@helpers/unit';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const { symbols } = useSelector((state: IStore) => state.quotes);
  const Mt4ChartQuoteGateway = useSelector((state: any) => state.base.faceBConfig?.Mt4ChartQuoteGateway);
  const [instantQuotes, setInstantQuotes] = React.useState<any>(['XAGUSDpro', 'XAUUSDpro'].map(i => ({
    Symbol: i,
    Ask: 0,
    Bid: 0,
    changeValue: 0,
    changePercent: 0,
    askStatus: 'FLAT',
    bidStatus: 'FLAT'
  })));
  const latestInstant = useLatest(instantQuotes);

  const { messages, socket } = useWebsocket({
    url: Mt4ChartQuoteGateway?.Path,
    protocol: 'quotes',
    onOpen: (ws: any) => {
      const data = {
        Symbol: 'SymbolList',
        Timeframe: 'Realtime',
      }
      ws.send(JSON.stringify(data));
    },
  });

  React.useEffect(() => {
    getInstantQuotes();
    return () => {
      if (typeof socket?.close === 'function') {
        socket?.close();
      }
    }
  }, [])

  React.useEffect(() => {
    if(messages) {
      const res = toUpperCaseObj(JSON.parse(messages));
      let newInstant: any = [];
      _.each(res.SymbolList, (symbolData: any) => {
        if(_.find(symbols, {Key: symbolData.Symbol})){
          const closePrice = _.find(symbols, {Key: symbolData.Symbol})?.Close;
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
      setInstantQuotes(_.orderBy([...oldInstant, ...newInstant], 'Symbol'));
    }
  }, [messages])

  const getInstantQuotes = () => {
    dispatch(ACTIONS.QUOTES.getInstantQuotes({}));
  }

  return {
    instantQuotes,
    getInstantQuotes
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