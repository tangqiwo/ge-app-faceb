/*
 * @Author: Galen.GE
 * @Date: 2024-01-02 10:22:23
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/trade/useKlineData.ts
 * @Description:
 */

import React from 'react';
import usePublicState from '@hooks/usePublicState';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();


  React.useEffect(() => {
    dispatch(ACTIONS.TRADE.getKlineData({
      data: {

      },
      cb: (res: any) => {
        console.log(res);
      }
    }))
  }, [])

  return {

  }

}