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
import store from '@helpers/storage';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const mt4Info = useSelector((state: any) => state.trade.mt4Info);
  const { messages } = useWebsocket({url: mt4Info?.Url, protocol: 'mt4'});

  React.useEffect(() => {
    console.log(messages);
  }, [messages])

  // 链接MT4
  const authToMt4 = React.useCallback(({ password, callback }: { password: string, callback: Function }) => {
    if (!password) {
      dispatch(ACTIONS.BASE.openToast({ text: '请输入MT4密码' }));
      return;
    }
    dispatch(ACTIONS.TRADE.connetMt4({ data: { password }, cb: (res: any) => {
      if(res.Code !== 0){
        store.remove('MT4-PASS');
        dispatch(ACTIONS.BASE.openToast({ text: res.Desc }));
        return;
      }
      callback();
    }}))
  }, [])


  return {
    authToMt4
  }

}
