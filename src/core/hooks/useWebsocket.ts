/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-30 10:29:55
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useWebsocket.ts
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { AppState } from 'react-native';
import { useState, useEffect, useCallback, useRef } from 'react';
import G from '@constants/global';

interface IUseWebsocket {
  url: string;
  protocol: string;
  closeCallback?: Function;
  routeName?: string;
}
export default ({url, protocol, closeCallback, routeName}: IUseWebsocket) => {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState<string>();
  const [error, setError] = useState(null);
  const heartbeatInterval = 30000;
  const heartbeatTimer = useRef(null);
  const ws = useRef(null);
  // 限流 OrderProfit
  const quotesThrottleTimer = useRef(null);
  const orderProfitsThrottleTimer = useRef(null);
  // 数据合并
  const quotes = useRef<any>([]);
  const orderProfits = useRef<any>([]);

  // 创建 WebSocket 连接
  useEffect((): any => {
    if(!url) {
      return;
    }
    const createSocket = () => {
      if(ws.current && typeof ws.current.close === 'function') {
        ws.current?.close();
      }
      ws.current = new WebSocket(url, protocol);
      ws.current.onopen = () => {
        if(heartbeatTimer.current) {
          clearInterval(heartbeatTimer.current);
        }
        // 发送心跳
        heartbeatTimer.current = setInterval(() => {
          ws.current.send('ping');
        }, heartbeatInterval)
      }
      ws.current.onmessage = (event: any) => {
        if(event.data.includes('QuoteHistory')){
          console.log(123123)
        }
        if(protocol === 'chart'){
          console.log(event.data);
          return;
        }
        if(event.data === 'pong' || AppState.currentState !== 'active') {
          return;
        }

        const currentRoute = G.GET('CRRENT_ROUTE');

        if(protocol === 'quotes'){
          if(_.includes(event.data, 'XAUUSD') || _.includes(event.data, 'XAGUSD')) {
            setMessages(event.data);
          }
          return;
        }

        if(_.includes(event.data, `"type":"OrderUpdate"`) || _.includes(event.data, `"type":"QuoteHistory"`)){
          console.log(event.data)
          setMessages(event.data);
          return;
        }

        // 高频限流
        if(protocol === 'mt4'){
          if(!_.includes(['Trade', 'TradeDetail'], currentRoute)){
            return;
          }
        }

        // 以下处理 MT5 的行情和订单
        const data = JSON.parse(event.data);

        if(_.includes(['Trade', 'TradeDetail'], currentRoute) && data.type === 'Quote') {
          quotes.current = [data, ...quotes.current];
          if(quotesThrottleTimer.current) {
            return;
          }
          quotesThrottleTimer.current = setTimeout(() => {
            const data = _.chain(quotes.current)
                          .filter((item: any) => _.includes(['XAUUSDpro', 'XAGUSDpro'], item.data.symbol))
                          .uniqBy('data.symbol')
                          .value();
            if(data.length > 0) {
              _.each(data, (item: any) => {
                requestAnimationFrame(() => {
                  setMessages(JSON.stringify(item));
                })
              });
            }
            quotesThrottleTimer.current = null;
            quotes.current = [];
          }, 500)
          return;
        }

        if(data.Type === 'OrderProfit' && currentRoute === 'Trade') {
          orderProfits.current = [data, ...orderProfits.current];
          if(orderProfitsThrottleTimer.current) {
            return;
          }
          orderProfitsThrottleTimer.current = setTimeout(() => {
            if(orderProfits.current.length > 0){
              const allOrders = _.chain(orderProfits.current)
                                 .map('Data')
                                 .map('Orders')
                                 .flatten()
                                 .uniqBy('Ticket')
                                 .value();
              const data = {
                ...orderProfits.current[0],
                Data: {
                  ...orderProfits.current[0].Data,
                  Orders: allOrders
                }
              }
              setMessages(JSON.stringify(data));
            }
            orderProfitsThrottleTimer.current = null;
            orderProfits.current = [];
          }, 250)
        }

      }
      ws.current.onerror = (event: any, s: any) => {
        console.log(s);
        setError(event);
      }
      ws.current.onclose = () => {
        // 清理 ping pong..
        clearInterval(heartbeatTimer.current);
        // 如果有关闭回调，执行回调
        if(typeof closeCallback === 'function') {
          closeCallback();
          return;
        }
        // 自动使用原来的链接进行链接
        _.delay(createSocket, 30000)
      };
    }
    createSocket();
    setSocket(ws.current);
    // 清理函数
    return () => {
      socket?.close();
    };
  }, [url, protocol]);

  // 发送消息的函数
  const sendMessage = useCallback((message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  }, []);

  React.useEffect(() => {
    if(error) {
      console.log(error);
      // dispatch(ACTIONS.BASE.openToast({types: 'error', text: `ws:` + error}));
    }
  }, [error])

  // 返回 socket 实例、消息列表、错误信息和发送消息的函数
  return {
    socket,
    messages,
    error,
    sendMessage
  };
}

