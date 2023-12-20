/*
 * @Author: Galen.GE
 * @Date: 2022-07-25 10:43:38
 * @LastEditors: Galen.GE
 * @FilePath: /git-data/NativeAS/src/core/middleware/relations.ts
 * @Description: relations 中间件
 */

export default (store:any) => (next:any) => (action:any) => {
  if (!action.relations || typeof action.relations !== 'function') {
    return next(action);
  }
  action.relations(store.dispatch, store.getState());
  return next(action);
};
