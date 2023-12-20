/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-05 16:00:14
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useLogout.ts
 * @Description: 登出
 */

import _ from "lodash";
import usePublicState from "./usePublicState";

export default () => {

  const { dispatch, ACTIONS, navigation } = usePublicState();

  return {
    logout: () => {
      dispatch(ACTIONS.USER.logout(false));
      dispatch(ACTIONS.BASE.openToast({ text: '您已经登出当前账号', types: 'success' }))
      navigation.replace('Root');
    }
  }

}