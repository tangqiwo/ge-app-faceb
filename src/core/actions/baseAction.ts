/*
 * @Author: Galen.GE
 * @Date: 2022-07-24 21:20:05
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/actions/baseAction.ts
 * @Description: 基础类
 */
import _ from 'lodash'
import * as INTERFACE from '@schemas/redux-action'
import { HTTP, IPayload } from '@core/helpers/http';
import TYPES from '@core/constants/types';

// 打开LOADING
export const openLoading = ({text = ''}: { text?: String } = {}): INTERFACE.IBase => ({
  type: TYPES.BASE.LOADING_OPEN,
  text
})

// set API
export const setAPI = ({api}: {api: string}): INTERFACE.IBase => ({
  type: TYPES.BASE.SET_API,
  api
})

// 关闭LOADING
export const closeLoading = (): INTERFACE.IBase => ({
  type: TYPES.BASE.LOADING_CLOSE
})

// 关闭弹出层
export const closeModal = (): INTERFACE.IBase => ({
  type: TYPES.BASE.MODAL_CLOSE
})

// 打开Toast
interface IOpenToast{
  text: string,
  types?: 'info' | 'success' | 'error'
}
export const openToast = ({text = '', types = 'info'}: IOpenToast): INTERFACE.IBase => ({
  type: TYPES.BASE.TOAST_OPEN,
  types,
  text
})

// 关闭Toast
export const closeToast = (): INTERFACE.IBase => ({
  type: TYPES.BASE.TOAST_CLOSE
})

// 打开弹出层
interface IAlert {
  title?: string,
  content: string | object,  // HTML 文本内容，可以是字符串，也可以是DOM
  btnText?: string,
  keepOpen?: boolean,        // 点击按钮后保持打开
  cb?: Function,
  className?:string
}
export const openAlert = ({ title = '温馨提示', content, className='',  keepOpen=false, btnText = '确定', cb }: IAlert): INTERFACE.IBase => ({
  type: TYPES.BASE.MODAL_OPEN,
  options: {
    title,
    content,
    className,
    actions: [{
      text: btnText,
      keepOpen,
      cb
    }]
  }
})

interface IRouterPush {
  name: string,
  type?: 'push' | 'replace' | 'goBack',
  params?: any,
}
export const routerPush = ({ name, type='push', params }: IRouterPush): INTERFACE.IBase => ({
  type: TYPES.BASE.ROUTER_PUSH,
  name,
  opType: type,
  params
})

// 打开确认框
interface IConfirm extends IAlert{
  actions: Array<{
    text: string,
    type?: 'default' | 'cancel' | 'destructive',
    keepOpen?: boolean     // 点击按钮后保持打开
    cb?: Function
  }>
}
export const openConfirm = ({ title = '确认', content, actions}: IConfirm): INTERFACE.IBase => ({
  type: TYPES.BASE.MODAL_OPEN,
  options: {
    title,
    content,
    actions: actions.length === 1 ? _.concat({ text: '取消', type: 'cancel' }, actions) : actions
  }
})

interface IOpenFrameModal{
  title?: string,
  uri: string,
  close?: Function
}
export const openWebFrame = ({title='巨象金业', ...props}: IOpenFrameModal): INTERFACE.IBase => ({
  type: TYPES.BASE.OPEN_FRAME_MODAL,
  title,
  ...props
})

// 关闭IFRAME弹窗
export const closeWebFrame = (): INTERFACE.IBase => ({
  type: TYPES.BASE.CLOSE_FRAME_MODAL
})

// 获取联系我们的信息
export const getContactInfo = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_CONTACT_INFO,
  payload: { key: 'base/get-contact-info', cache: { expires: 5, forward: true } }
})

// 打开POPUP提示窗（含内容）
export const openPopups = ({type}: { type: string }): INTERFACE.IBase => ({
  type: TYPES.BASE.OPEN_POPUPS,
  popupType: type
})

// 关闭POPUP联系框
export const closePopups = (): INTERFACE.IBase => ({
  type: TYPES.BASE.CLOSE_POPUPS
})

// 获取首页相关配置（初始化配置）
export const getConfigs = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_HOME_CONFIG,
  payload: { key: 'base/get-home-config', cache: { expires: 5, forward: true } }
})

// 获取APP版本OSS域名地址等
export const getAppVersion = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_APP_CONFIG,
  payload: { key: 'base/get-app-version', cache: { expires: 5, forward: true } }
})

// 获取会员信息等
export const getMemberInfo = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_MEMBER_INFO,
  payload: { key: 'base/get-member-info', cache: { expires: 5, forward: true } }
})

// 获取服务器时间
export const getServerTime = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'base/get-server-time'},
  cb
})

// 获取验证码
interface IGetVerifyCode extends INTERFACE.IProps{
  apiType: string;
}
export const getVerifyCode = ({ data, apiType, cb }: IGetVerifyCode): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: 'base/get-verify-code', data, urlParams:[apiType], method: HTTP.METHODS.POST },
  cb
})

// 重置登出码
export const resetExitCode = (): INTERFACE.IBase => ({
  type: TYPES.BASE.RESET_EXIT_CODE
})

// 获取上传图片的URL和配置信息
export const GET_UPLOAD_URL = ({
  data,
  cb,
}: {
  data: {
    FileName: string;
    Prefix: string;
  };
  cb: Function;
}): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'base/get_upload_url',
    data,
  },
  cb,
});

// 获取银行code列表
export const getSelectBankList = ({ cb }: { cb: Function }): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_SELECT_BANK_LIST,
  payload: {
    key: 'base/get_select_bank_list',
  },
  cb,
});

// 获取弹出广告
export const getPopupAd = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_POPUP_AD,
  payload: {
    key: 'base/get-popup-ad',
  }
});
// 修改开户弹框内容
export const setPopupAd = (res: any): INTERFACE.IBase => ({
  type: TYPES.BASE.GET_POPUP_AD,
  res
});

// 初始化UI
export const initUI = (): INTERFACE.IBase => ({
  type: TYPES.BASE.INIT_UI
})


// 获取常用地区信息
export const getLocations =  ({cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_LOCATIONS,
  payload: {
    key: 'base/get-locations',
    loading: true,
    cache: { expires: 5, forward: true }
  },
  cb
})

// 通用请求，不允许操作reducer
interface ICommonRequest extends IPayload {
  uri: string
}
export const commonRequest = ({uri, cache, data, method = HTTP.METHODS.GET, loading=false, ...params}: ICommonRequest): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: { key: `base/common-request`, urlParams:[uri], data, cache, method, loading },
  ...params
})

// 获取渠道参数
export const getChannelKeys = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_CHANNEL_KEYS,
  payload: { key: 'base/get-channel-keys', cache: { expires: 5, forward: true } }
})


// 获取首页相关的信息，例如banner，视频，广告等
export const getHomeInfos = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_HOME_INFOS,
  payload: { key: 'base/get-home-infos', cache: { expires: 5, forward: true } }
})

// 弹窗广告
export const getPopupAdvert = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_POPUP_ADVERT,
  payload: { key: 'base/get-popup-advert'},
})

// 获取APP显示配置
export const getAppConfig = (): INTERFACE.IAPI => ({
  type: TYPES.BASE.GET_APP_DISPLAY_CONFIG,
  payload: { key: 'base/get-app-config', cache: { expires: 5, forward: true } }
})

// 缓存准备就绪
export const cacheReady = (): INTERFACE.IBase => ({
  type: TYPES.BASE.CACHE_READY
})