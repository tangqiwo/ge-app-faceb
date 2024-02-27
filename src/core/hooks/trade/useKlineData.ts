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
import { useSelector } from 'react-redux';
import usePublicState from '@hooks/usePublicState';
import useWebsocket from '../useWebsocket';

interface IProps{
  Symbol: string;
}
export default ({Symbol}: IProps) => {

  const Mt4ChartQuoteGateway = useSelector((state: any) => state.base.faceBConfig?.Mt4ChartQuoteGateway);
  const { socket, messages, sendMessage } = useWebsocket({ url: Mt4ChartQuoteGateway?.Path, protocol: 'chart' });
  const initTarget = React.useRef(false);

  const { dispatch, ACTIONS } = usePublicState();
  const data = useSelector((state: any) => state.trade.klineData);

  // 注销 socket
  React.useEffect(() => {
    getKlineData();
    return () => {
      if (typeof socket?.close === 'function') {
        socket?.close();
      }
    }
  }, [socket]);

  // 监听 socket 状态
  React.useEffect(() => {
    return;
    if(socket?.readyState !== 0){
      const data = {
        Symbol: 'XAUUSDpro',
        Timeframe: 'M1',
      }
      sendMessage(JSON.stringify(data));
    }
  }, [socket?.readyState]);

  const getKlineData = (Timeframe = 'W1') => {
    dispatch(ACTIONS.TRADE.getKlineData({
      data: {
        "Symbol": Symbol,
        "Timeframe": Timeframe,
        "From": dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        "Count":30,
      },
      cb: (res: any) => {
        dispatch(ACTIONS.TRADE.setKlineData({data: res.Data}));
      }
    }))
  }

  return {
    getKlineData,
    data
  }
}