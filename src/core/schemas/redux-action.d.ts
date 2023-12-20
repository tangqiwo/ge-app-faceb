/*
 * @Author: Galen.GE
 * @Date: 2022-07-24 21:27:59
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/schemas/redux-action.d.ts
 * @Description: 返回值约束
*/
import { IPayload } from '@helpers/http';

export interface IProps {
  data?       : any,
  urlParams?  : Array<string>                                                       // url参数
  cb?         : Function,                                                           // 视图层回调
  loading?    : boolean,                                                            // 是否显示loading
}

export interface IBase {
  type        : string,
  relations?  : Function,                                                           // 联动actoins
  [key        : string]: any
}

export interface IAPI extends IBase {
  payload     : IPayload,
  cb?         : Function,                                                           // 视图层回调
  passError?  : boolean,                                                            // 不由框架处理错误，通过回调处理
  continue?   : Function,                                                           // action 层回调
  [key        : string] : any
}
