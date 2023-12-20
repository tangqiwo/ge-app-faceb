/*
 * @Author: Galen.GE
 * @Date: 2023-08-02 14:05:44
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/dashboard/useMessage.ts
 * @Description: 消息中心
 */
import usePublicState from "../usePublicState";
import useCommon, { IQuery } from './common';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();

  // 查询
  const search = (querys?: any) => {
    dispatch(ACTIONS.USER.getMessages({ type: querys.type, page: querys.Page, cb: (res: any) => {
      queryCommon.setData(res.Data.Data);
      queryCommon.setRecordsCount(res.Data.Count || 0);
    }}))
  }

  // 初始化
  const init: IQuery = {
    conditions: {
      type: 'public'
    },
    search
  }
  const queryCommon = useCommon(init);

  return {
    ...queryCommon
  }

}
