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
import { useSelector } from 'react-redux';
import useWebsocket from './useWebsocket';
import usePublicState from './usePublicState';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const { wsLink, symbols, instant } = useSelector((state: IStore) => state.quotes);
  const { messages } = useWebsocket({url: wsLink, protocol: 'quotes'});

  React.useEffect(() => {
    getInstantQuotes();
  }, [])

  React.useEffect(() => {
    if(messages) {
      const res = JSON.parse(messages);
      if(_.includes(_.map(symbols, 'Key'), res.Data.Symbol)) {
        const closePrice = _.find(symbols, {Key: res.Data.Symbol}).Close;
        const currentInstant = _.find(instant, {Symbol: res.Data.Symbol}) || { Ask: 0, Bid: 0 };
        // 上一口和下一口一样，不更新
        if(currentInstant.Ask === res.Data.Ask && currentInstant.Bid === res.Data.Bid) return;
        var newInstant = _.chain(instant || [])
                          .cloneDeep()
                          .filter(i => i.Symbol !== res.Data.Symbol)
                          .concat({
                            ...res.Data,
                            changeValue: _.floor(closePrice - res.Data.Ask, 3),
                            changePercent: _.floor((closePrice - res.Data.Ask) / closePrice * 100, 2),
                            spread: SPREAD[res.Data.Symbol],
                            askStatus: currentInstant.Ask > res.Data.Ask ? INSTANT_QUOTES_STATUS.DOWN :
                                       currentInstant.Ask === res.Data.Ask ? INSTANT_QUOTES_STATUS.FLAT :
                                        INSTANT_QUOTES_STATUS.UP,
                            bidStatus: currentInstant.Bid > res.Data.Bid ? INSTANT_QUOTES_STATUS.DOWN :
                                        currentInstant.Bid === res.Data.Bid ? INSTANT_QUOTES_STATUS.FLAT :
                                        INSTANT_QUOTES_STATUS.UP,
                          })
                          .orderBy('Symbol')
                          .value();
        dispatch(ACTIONS.QUOTES.setInstantQuotes({data: newInstant}));
      }
    }
  }, [messages])

  const getInstantQuotes = () => {
    dispatch(ACTIONS.QUOTES.getInstantQuotes({}));
  }

  return {
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