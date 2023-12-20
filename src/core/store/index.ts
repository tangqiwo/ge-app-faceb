/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-25 10:41:25
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/store/index.ts
 * @Description: redux store index
 */
import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

import request from '@core/middleware/request';
import relations from '@core/middleware/relations';

export const configureStore = () => {
  let composeEnhancers = null;
  if(__DEV__ && Platform.OS === 'ios' && (global as any)['window']){
    composeEnhancers = (global as any)['window']['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
  }else{
    composeEnhancers = compose
  }
  const config = composeEnhancers(applyMiddleware(thunk, relations, request));
  return createStore(rootReducer, config);
}

export default configureStore;