/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-23 23:03:17
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/usePopupAdvert.ts
 * @Description:
 */
import React from 'react';
import usePublicState from './usePublicState';

export default () => {

  const { dispatch, ACTIONS, infos } = usePublicState();

  React.useEffect(() => {
    if(!infos?.UserId){
      return;
    }
    dispatch(ACTIONS.BASE.getPopupAdvert())
  }, [infos?.UserId])


}
