/*
 * @Author: Galen.GE
 * @Date: 2022-07-25 10:43:38
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/middleware/request.ts
 * @Description: 请求中间件
 */
import _ from 'lodash'
import { HTTP } from '@helpers/http';
import * as INTERFACE from '@schemas/redux-action'
import storage from '@helpers/storage';
import { toLowerCaseObj } from '@helpers/unit'
import ACTIONS from '@actions/index';

export default (store: any) => (next: any) => (action: INTERFACE.IAPI ) => {

  if (!action.payload || !action.payload.key) {
    return next(action);
  }

  // 请求实例
  const requestIns = new HTTP({ ...action.payload, cb: action.cb }, store.dispatch);

  // 调试使用缓存
  const apiCache4Debug = storage.getAny('api_cache') === '1' ? true : false;

  // 先取缓存
  const resCache = storage.getAny(requestIns.cacheKey());
  if((apiCache4Debug && resCache) || ((requestIns.isCache() && resCache) && !action.payload.mock)){
    // 缓存非绑定用户，或者绑定用户与当前用户一致
    if((apiCache4Debug && resCache) || (!requestIns.getCache()?.isUserBind || (_.get(resCache, '__USERID__') == store.getState().user.info?.UserId) && !requestIns.getCache()?.cacheClear)){
      // reducers
      next({
        ...action,
        res: action.payload.isFormatRes ? resCache['data'] : resCache['Data']
      })
      // callbacks
      typeof action.cb === 'function' && action.cb(storage.getAny(requestIns.cacheKey()), action);
      // 是否追加下一次请求
      if(apiCache4Debug || !requestIns.getCache().forward){
        return;
      }
    }
  }

  // 发送请求
  requestIns.sendHttp({mock: action.payload.mock, callback: (data: any) => {
    // 是否整理 DATA 格式
    const res = action.payload.isFormatRes ? toLowerCaseObj(data) : data;
    // 新版接口 错误处理
    if(data.Code != 0 && !action.passError){
      if(store.getState().base.modal.display){
        store.dispatch(ACTIONS.BASE.openToast({text: data.Desc}));
      }else{
        store.dispatch(ACTIONS.BASE.openAlert({content: data.Desc}));
      }
      return;
    }
    // 缓存（仅支持在新版接口正常情况下缓存数据）
    if((apiCache4Debug || requestIns.isCache()) && data.Code == 0 && !action.payload.mock){
      const extendUserBind = requestIns.getCache()?.isUserBind ? { __USERID__: store.getState().user.info?.UserId } : {};
      storage.setAny(
        requestIns.cacheKey(),
        {...res, ...extendUserBind},
        requestIns.getCache()?.expires * 60 || 3600
      );
    }
    // next
    next({
      ...action,
      res: action.payload.isFormatRes ? res['data'] : res['Data'],
      response: res
    })
    // ACTION层回调
    if(action.continue && typeof action.continue === 'function'){
      action.continue({res, dispatch: store.dispatch})
    }
    // 视图层回调
    if(action.cb && typeof action.cb === 'function'){
      action.cb(res, action, store.dispatch);
    }
  }})
}
