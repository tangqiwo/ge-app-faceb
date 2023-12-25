/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-30 10:29:55
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useWebsocket.ts
 * @Description:
 */

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
        setMessages(event.data)
      }
      ws.current.onerror = (event: any) => setError(event);
      ws.current.onclose = () => {
        // 清理 ping pong..
        clearInterval(heartbeatTimer.current);
        // 如果有关闭回调，执行回调
        if(typeof closeCallback === 'function') {
          closeCallback();
          return;
        }
        // 自动使用原来的链接进行链接
        createSocket();
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

  // 返回 socket 实例、消息列表、错误信息和发送消息的函数
  return {
    socket,
    messages,
    error,
    sendMessage
  };
}

