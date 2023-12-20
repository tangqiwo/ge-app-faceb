/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-10-01 01:04:01
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useStateKeeper.ts
 * @Description: 状态保持等
 */

import React from "react";
import store from '@helpers/storage';
import { useSelector } from "react-redux";
import _ from "lodash";

export default () => {

  const info = useSelector((state: any) => state.user.info);

  // 实时保存用户状态
  React.useEffect(() => {
    if(!info.UserId){
      store.remove('USER-PROFILE');
      return;
    }
    store.set('USER-PROFILE', info, 3600 * 24 * 7);
  }, [info?.UserId])

}