/*
 * @Author: Galen.GE
 * @Date: 2022-07-25 10:58:18
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/constants/apis/index.ts
 * @Description: API地址获取封装
*/
import _ from 'lodash';
import base from './api-base';
import user from './api-user';
import promotion from './api-promotion';
import dashboard from './api-dashboard';
import payment from './api-payment';
import quotes from './api-quotes';
import trade from './api-trade';

export const getURL = (key: string, params: Array<string | number>): string => {

  const apis: any = _.merge(
    { ...base },
    { ...user },
    { ...promotion },
    { ...dashboard },
    { ...payment },
    { ...quotes },
    { ...trade }
  );

  let result = apis[key] || null;

  if (!result) {
    throw new Error(`没有找到API-KEY对应的接口地址：${key}`);
  }

  // URL 上参数的组装
  if (params.length > 0) {
    _.each(params, (value: string) => {
      result = result.replace('$', _.isNull(value) || _.isUndefined(value) ? '' : value);
    });
  }

  return 'ge_app/v1/' + result;

};
