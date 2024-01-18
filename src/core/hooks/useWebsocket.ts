/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-30 10:29:55
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useWebsocket.ts
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';

interface IUseWebsocket {
  url: string;
  protocol: string;
  closeCallback?: Function;
}
export default ({url, protocol, closeCallback}: IUseWebsocket) => {

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState();
  const [error, setError] = useState(null);
  const heartbeatInterval = 30000;
  const heartbeatTimer = useRef(null);
  const ws = useRef(null);
  // 限流 OrderProfit
  const throttleTimer = useRef(null);

  // 创建 WebSocket 连接
  useEffect((): any => {
    if(!url) {
      return;
    }
    const createSocket = () => {
      if(ws.current) {
        ws.current.close();
      }
      ws.current = new WebSocket(url, protocol);
      setSocket(ws);
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
        if(event.data === 'pong') {
          return;
        }
        if(!_.includes(event.data, `"type":"OrderProfit"`)) {
          requestAnimationFrame(() => {
            setMessages(event.data)
          })
          return;
        }
        if(throttleTimer.current) {
          return;
        }
        requestAnimationFrame(() => {
          setMessages(event.data)
        })
        throttleTimer.current = setTimeout(() => {
          throttleTimer.current = null;
        }, 2000)
      }
      ws.current.onerror = (event: any) => {
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
    // 清理函数
    return () => {
      socket.close();
    };
  }, [url, protocol]);

  // 发送消息的函数
  const sendMessage = useCallback((message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  }, [socket]);

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

