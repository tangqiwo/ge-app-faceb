/*
 * @Description: 请求中间件
 * @Author: Galen.GE
 * @Date: 2019-12-19 18:03:47
 * @LastEditTime: 2024-03-28 15:47:07
 * @LastEditors: Galen.GE
 */
import _ from 'lodash';
import { Dispatch } from 'redux';
import ACTIONS from '@actions/index';
import axios from 'axios';
import md5 from 'md5';
import RNRestart from 'react-native-restart';
import * as $API from '@core/constants/apis';
import storage from '@helpers/storage';
import { networkHandler } from '@hooks/useLogs';
import { toUpperCaseObj } from '@helpers/unit'
import CONFIGS from '@this/configs'
import G from '@constants/global';
import { Platform } from 'react-native';

// 请求方法枚举
export enum RequestMethods { GET = 'GET', PUT = 'PUT', POST = 'POST', DELETE = 'DELETE' }

// 请求错误枚举
export enum ResponseErrors {
  NO_AUTH = '登录超时，请重新登录',
  KICKED = '账号已在其他地方登录，请重新登录',
  REJECT = '登录受限',
  SAME_REQ = '重复提交',
  TOO_MANY_REQ = '请求太频繁',
  PAYMENT_MAINTENANCE = '支付模块维护中',
}

export class HTTP {

  static readonly METHODS = RequestMethods;
  private request: IRequest;
  private cache: { expires: number; forward: boolean; cacheClear?: boolean; isUserBind?: boolean } | null;
  private loading: boolean | string;
  private key: string;
  private dispatch: Dispatch;
  private timeout: number;
  private timeoutCb: Function;
  private retry: number;
  private maxRetry: number;
  private callback: Function;
  private isFormatReq: boolean;

  constructor(
    {
      key = '',
      urlParams = [],
      data = null,
      method = HTTP.METHODS.GET,
      loading = false,
      cache = null,
      timeout = 30,
      timeoutCb,
      maxRetry = 1000,
      isFormatReq = false,
      prefix = 'ge_app/v1/'
    }: IPayload, dispatch: Dispatch) {
    this.request = {
      url: $API.getURL(key, urlParams, prefix),
      data: data,
      method: method,
      nonce: this.nonceKey(key),
    };
    this.key = key;
    this.loading = loading;
    this.dispatch = dispatch;
    this.cache = cache;
    this.timeout = timeout;
    (this.timeoutCb = timeoutCb), (this.retry = 0);
    this.maxRetry = maxRetry;
    this.isFormatReq = isFormatReq;
  }

  /**
   * 发送请求
   * @param callback 回调函数
   */
  public sendHttp = ({ callback, mock }: { callback: Function; mock?: any }) => {
    // 测试数据
    if (mock) {
      var mockRes = { ...mock };
      try {
        mockRes = this.resCheck(mockRes);
        console.log('#### USING MOCK DATA:', mockRes);
        callback(mockRes);
      } catch (e) {
        console.log('#### MOCK DATA CATCH ERROR! ####');
      }
      return;
    }
    // 正常请求
    this.callback = callback;
    if (this.loading) {
      this.dispatch(ACTIONS.BASE.openLoading({ text: typeof this.loading === 'string' ? this.loading : '' }));
    }
    const startTime = _.now();
    var requestData = null;
    if(_.includes(['POST', 'PUT', 'DELETE'], this.request.method)){
      requestData = this.isFormatReq ? toUpperCaseObj(this.request.data) : this.request.data;
    }
    const headers = {
      'Accept'          : 'application/json',
      'Content-Type'    : 'application/json',
      'Cache-Control'   : 'no-cache',
      'X-Api-Token'     : storage.get('AUTH'),
      'X-Country'       : 'China',
      'X-Lang'          : 'zh-CN',
      'X-Origin'        : '',
      'X-Channel'       : Platform.OS === 'android' ? 'Android' : 'IOS',
      'X-Channel-Code'  : G.GET('CHANNEL_CODE') || '',
      'X-Sem-Device-Id' : storage.get('UNIQUE_ID') || '',
      'X-Idfa'          : G.GET('UUID'),
      'X-Phone-Model'   : G.GET('PHONE_MODEL'),
    }
    const dataBody = this.request.method === 'GET' ? {} : {data: requestData};
    axios(_.merge(
      {
        url: `${CONFIGS.API}/${this.request.url}`,
        method: this.request.method,
        params: this.request.method === 'GET' && (this.request.data || {}),
        headers,
        timeout: this.timeout * 1000,
      },
      dataBody,
    ))
    .then((res: any) => res.data)
    .then(this.resCheck)
    .then((res: any) => {
      if (this.loading) {
        this.dispatch(ACTIONS.BASE.closeLoading());
      }
      // 记录慢请求
      if (_.now() - startTime > 3000) {
        networkHandler({ type: 'slow-network', msg: `慢网络-${_.now() - startTime}ms`, key: this.request.url });
      }
      callback(res);
    })
    .catch(this.errorHandler);
  };

  // 获取是否缓存
  public isCache = () => !!this.cache;

  // 获取缓存对象
  public getCache = () => this.cache;

  // 获取缓存键值
  public cacheKey = () => md5(`${this.request.url}`).substr(0, 16);

  // 获取nonce - 后端防重复请求
  private nonceKey = (api: string) => md5(`${api}-${_.now()}-${_.random(999)}`);

  private resCheck = (res: any) => {
    // 登录超时, 无权限
    if (res.Code != 0 && res.Type == 1) {
      this.dispatch(ACTIONS.BASE.initUI());
      throw new Error(`${ResponseErrors.NO_AUTH}`);
    }
    // 支付模块维护
    if (res.Code != 0 && res.Type == 2) {
      throw new Error(`${ResponseErrors.PAYMENT_MAINTENANCE}`);
    }
    return res;
  };

  // 错误检查
  private errorHandler = (error: any) => {
    // 关闭LOADING
    this.loading && this.dispatch(ACTIONS.BASE.closeLoading());
    // 响应码错误
    if (error.response && error.response.status !== 200) {
      this.dispatch(
        ACTIONS.BASE.openToast({ text: `${'网络错误'} - ${error.response.status} / ${md5(this.key).substr(0, 6)}` }),
      );
      networkHandler({ msg: `${'响应码错误'}-${error.response.status}`, type: 'network-other', key: this.request.url });
      return;
    }
    // 断网或超时，回调优先
    if ((_.includes(error.message, 'Network Error') || _.includes(error.message, 'timeout')) && this.timeoutCb) {
      this.timeoutCb();
      return;
    }
    // 断网
    if (_.includes(error.message, 'Network Error')) {
      this.dispatch(
        ACTIONS.BASE.openAlert({
          title: '网络连接中断',
          content: '网络连接已断开，请检查您的网络',
          btnText: '刷新页面',
          cb: () => RNRestart.Restart()
        }),
      );
      return;
    }
    // 超时
    if (_.includes(error.message, 'timeout')) {
      // GET请求自动重试
      if (this.request.method === 'GET') {
        // 第一次重试提示
        if (this.retry < this.maxRetry) {
          networkHandler({ type: 'bad-network', msg: `${'网络慢，重试'}${this.retry + 1}`, key: this.request.url });
          this.dispatch(ACTIONS.BASE.openToast({ text: `'网络慢，重试中'（${md5(this.key).substr(0, 4)}）` }));
          this.sendHttp({ callback: this.callback });
          this.retry++;
        }
        // 到达最大重试次数
        if (this.retry == this.maxRetry) {
          return;
        }
      }
      // POST, PUT 需要用户自主选择是否重新提交
      if (_.includes(['POST', 'PUT'], this.request.method)) {
        this.dispatch(
          ACTIONS.BASE.openConfirm({
            content: '网络慢未收到服务器应答，是否要重试？',
            actions: [
              {
                text: '重试',
                cb: () => this.sendHttp({ callback: this.callback }),
              },
            ],
          }),
        );
      }
    }
    // 请求太频繁
    if (error.message === ResponseErrors.TOO_MANY_REQ) {
      this.dispatch(ACTIONS.BASE.openToast({ text: `请求太频繁，请稍后再试` }));
      return;
    }
    // 登录超时错误，被踢下线，禁止登录等
    if (
      _.includes(error.message, ResponseErrors.NO_AUTH) ||
      _.includes(error.message, ResponseErrors.KICKED) ||
      _.includes(error.message, ResponseErrors.REJECT)
    ) {
      this.dispatch(ACTIONS.BASE.openToast({ text: `登录已过期，请重新登录` }));
      this.dispatch(ACTIONS.USER.logout());
      return;
    }
    // 重复提交
    if (error.message === ResponseErrors.SAME_REQ) {
      return;
    }
    // 记录
    networkHandler({ msg: error.message, type: 'network-other', key: this.request.url });
    // 其他
    throw Error(error.message);
  };
}

// 请求对象
export interface IRequest {
  url: string;
  method: RequestMethods;
  nonce: string;
  data?: Object | null;
}

/**
 * 请求构造函数
 * @param key 地址对应的KEY
 * @param urlParams URL上的参数
 * @param method 请求方法
 * @param loading 是否需要LOADING
 * @param cache 是否缓存 - expires：缓存有效时间（分钟）forward：使用缓存后，是否仍然发起请求更新最新资源
 * @param timeout 自定义超时时间 单位 s
 * @param timeoutCb 自定义超时回调函数
 * @param maxRetry 最大重试次数
 */
export interface IPayload {
  key?          : string;
  prefix?       : string;
  urlParams?    : Array<string | number>;
  data?         : Object | null;
  isFormatReq?  : boolean;        //  是否格式化请求参数(大写开头)
  isFormatRes?  : boolean;        //  是否格式化响应参数(小写开头)
  method?       : RequestMethods;
  loading?      : boolean | string;
  cache?: {
    expires     : number;
    forward     : boolean;         // 有缓存时，是否在使用缓存后仍然进行请求
    isUserBind? : boolean;         // 缓存是否绑定 USER，切换USER则缓存失效
    cacheClear? : boolean;         // 废弃当前缓存
  };
  timeout?      : number;
  timeoutCb?    : Function;
  maxRetry?     : number;
  mock?         : any;
  cb?           : Function;
}
