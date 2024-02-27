/*
 * @Author: Galen.GE
 * @Date: 2024-02-22 11:27:02
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useMt4ChartQuote.ts
 * @Description:
 */
import React from 'react';
import useWebsocket from "./useWebsocket";
import { useSelector } from "react-redux";

export default () => {

  const Mt4ChartQuoteGateway = useSelector((state: any) => state.base.faceBConfig?.Mt4ChartQuoteGateway);

  const { socket, messages, sendMessage } = useWebsocket({ url: Mt4ChartQuoteGateway?.Path, protocol: 'chart' });

  React.useEffect(() => {
    return () => {
      if (typeof socket?.close === 'function') {
        socket?.close();
      }
    }
  }, [socket]);

  React.useEffect(() => {
    if (!messages) {
      return;
    }
    try {
      const res = JSON.parse(messages);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, [messages])

  React.useEffect(() => {
    setTimeout(() => {
      console.log('发送请求')
      const data = {
        Symbol: 'XAUUSDpro',
        Timeframe: 'M1',
      }
      sendMessage(JSON.stringify(data));
    }, 2000);
  }, [])

  return {

  }

}