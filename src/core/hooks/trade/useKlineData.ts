/*
 * @Author: Galen.GE
 * @Date: 2024-01-02 10:22:23
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/trade/useKlineData.ts
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import dayjs from 'dayjs';
import { useLatest } from 'react-use';
import { useSelector } from 'react-redux';
import usePublicState from '@hooks/usePublicState';
import useWebsocket from '../useWebsocket';

interface IProps{
  Symbol: string;
}
export default ({Symbol}: IProps) => {

  const { dispatch, ACTIONS } = usePublicState();
  const Mt4ChartQuoteGateway = useSelector((state: any) => state.base.faceBConfig?.Mt4ChartQuoteGateway);
  const [newKlineData, setNewKlineData] = React.useState<any>(null);
  const dataInsertTarget = React.useRef<any>(false);
  const queryDoneTarget = React.useRef<any>(true);
  const [data, setData] = React.useState<any>([]); // [open, close, high, low, vol, time, amount
  const latestData = useLatest(data);
  const currentTimeframe = React.useRef<any>('M1');
  const { socket, messages, sendMessage } = useWebsocket({
    url: Mt4ChartQuoteGateway?.Path,
    protocol: 'chart',
    onOpen: (ws: any) => {
      const data = {
        Symbol: Symbol,
        Timeframe: currentTimeframe.current,
      }
      ws.send(JSON.stringify(data));
    },
  });

  // 注销 socket
  React.useEffect(() => {
    return () => {
      if (typeof socket?.close === 'function') {
        socket?.close();
      }
    }
  }, [socket]);

  React.useEffect(() => {
    if(!messages) {
      return;
    }
    const data = JSON.parse(messages)?.ChartQuote;
    if(data.Timeframe !== currentTimeframe.current) {
      return;
    }
    console.log(data);
    const formatData = {
      amount: 0,
      open: _.round(Number(data.Open), 3),
      close: _.round(Number(data.Close), 3),
      high: _.round(Number(data.High), 3),
      //@ts-ignore
      id: parseInt(dayjs(data.Time, 'YYYY-MM-DDTHH:mm:ss').valueOf() / 1000),
      low: _.round(Number(data.Low), 3),
      vol: data.Volume,
      Timeframe: data.Timeframe,
    }
    if(!_.find(latestData.current, {id: formatData.id})) {
      getKlineData(data.Timeframe, data.Time, (res: any) => {
        setData([...res, _.omit(formatData, ['Timeframe'])]);
      })
      return;
    }
    setNewKlineData(formatData);
  }, [messages])

  const getKlineData = (Timeframe = 'M1', fromData = dayjs().format('YYYY-MM-DDTHH:mm:ss'), callback?: Function) => {
    if(!queryDoneTarget.current) {
      return;
    }
    queryDoneTarget.current = false;
    dispatch(ACTIONS.TRADE.getKlineData({
      data: {
        "Symbol": Symbol,
        "Timeframe": Timeframe,
        "From": fromData,
        "Count":1000,
      },
      cb: (res: any) => {
        const data = _.chain(res.Data)
                      .map((item: any) => ({
                        amount: 0,
                        open: _.round(Number(item.Open), 3),
                        close: _.round(Number(item.Close), 3),
                        high: _.round(Number(item.High), 3),
                        // @ts-ignore
                        id: parseInt(dayjs(item.Time, 'YYYY-MM-DDTHH:mm:ss').valueOf() / 1000),
                        low: _.round(Number(item.Low), 3),
                        vol: item.Volume,
                      }))
                      .reverse()
                      .value()
        callback(data);
        // setData(data);
        dataInsertTarget.current = true;
        queryDoneTarget.current = true;
      }
    }))
  }

  return {
    data,
    setData,
    getKlineData,
    sendMessage,
    setNewKlineData,
    dataInsertTarget,
    newKlineData,
    currentTimeframe
  }
}