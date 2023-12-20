/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 11:45:44
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/trade/useTradeConnect.ts
 * @Description: 连接保持 MT4 TOKEN
 */
import React from 'react';
import usePublicState from "../usePublicState";
import { useSelector } from 'react-redux';
import useWebsocket from '../useWebsocket';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const auth = useSelector((state: any) => state.trade.auth);
  const { messages } = useWebsocket({url: auth?.Url, protocol: 'mt4'});

  console.log(messages.map(item => JSON.parse(item)));

  // 链接MT4
  const authToMt4 = React.useCallback(({ password, callback }: { password: string, callback: Function }) => {
    if (!password) {
      dispatch(ACTIONS.BASE.openToast({ text: '请输入MT4密码' }));
      return;
    }
    dispatch(ACTIONS.TRADE.connetMt4({ data: { password }, cb: () => {
      callback();
    }}))
  }, [])


  return {
    authToMt4
  }

}
