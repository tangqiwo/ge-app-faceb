/*
 * @Author: Galen.GE
 * @Date: 2022-07-25 10:45:04
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/reducers/baseReducer.ts
 * @Description: 基础状态
 */
import _ from 'lodash';
import store from '@helpers/storage';
import TYPES from '@core/constants/types';
import initialState from './redux-store';

export default function base(state = initialState.base, action: any) {
  switch (action.type) {
    // 设置 API
    case TYPES.BASE.SET_API: {
      return {...state, api: action.api};
    }
    // 打开 LOADING
    case TYPES.BASE.LOADING_OPEN: {
      const update = {
        display: true,
        text: action.text || null,
      };
      return { ...state, loading: update };
    }
    // 关闭 LOADING
    case TYPES.BASE.LOADING_CLOSE: {
      const update = {
        display: false,
        text: '',
      };
      return { ...state, loading: update };
    }
    // 打开 Toast
    case TYPES.BASE.TOAST_OPEN: {
      const update = {
        display: true,
        types: action.types,
        now: _.now(),
        text: action.text || null,
      };
      return { ...state, toast: update };
    }
    // 关闭 Toast
    case TYPES.BASE.TOAST_CLOSE: {
      const update: any = {
        display: false,
        now: state.toast.now,
        types: action.types,
        text: '',
      };
      return { ...state, toast: update };
    }
    // 打开弹出层 MODAL
    case TYPES.BASE.MODAL_OPEN: {
      const { title, content, actions, type, top } = action.options;
      const update = {
        display: true,
        title,
        content,
        top,
        type,
        actions: actions,
      };
      return { ...state, modal: update };
    }
    // 关闭弹出层 MODAL
    case TYPES.BASE.MODAL_CLOSE: {
      const update = {
        display: false,
      };
      return { ...state, modal: update };
    }
    // 打开iframe弹窗
    case TYPES.BASE.OPEN_FRAME_MODAL: {
      return {
        ...state,
        frameModal: {
          display: true,
          title: action.title,
          uri: action.uri,
          keepSession: action.keepSession,
          close: action.close,
        },
      };
    }
    // 关闭iframe弹窗
    case TYPES.BASE.CLOSE_FRAME_MODAL: {
      return {
        ...state,
        frameModal: { display: false },
      };
    }
    // 重置登出码
    case TYPES.BASE.RESET_EXIT_CODE: {
      return {
        ...state,
        exitCode: null,
      };
    }
    // 获取联系我们的信息
    case TYPES.BASE.GET_CONTACT_INFO: {
      return {
        ...state,
        contactInfo: action.res,
      };
    }
    // 打开POPUP提示窗（含内容）
    case TYPES.BASE.OPEN_POPUPS: {
      return {
        ...state,
        popups: {
          display: true,
          type: action.popupType,
        },
      };
    }
    // 关闭POPUP联系框
    case TYPES.BASE.CLOSE_POPUPS: {
      return {
        ...state,
        popups: {
          display: false,
          type: null,
        },
      };
    }
    // 获取首页相关配置（初始化配置）
    case TYPES.BASE.GET_HOME_CONFIG: {
      return {
        ...state,
        configs: action.res,
      };
    }
    // 获取APP版本信息
    case TYPES.BASE.GET_APP_CONFIG: {
      return {
        ...state,
        appConfigs: action.res,
      };
    }
    // 获取会员信息等
    case TYPES.BASE.GET_MEMBER_INFO: {
      return {
        ...state,
        memberInfo: action.res,
      };
    }
    // 获取弹出广告
    case TYPES.BASE.GET_POPUP_AD: {
      const data = action.res
      return {
        ...state,
        popupAd: {
          CustomDomain: data.CustomDomain,
          CreateUser: {
            Count: data.CreateUser.Count,
            Data: data.CreateUser.Data
          },
          KYC: {
            Count: data.KYC.Count,
            Data: data.KYC.Data
          }
        },
      };
    }
    // 初始化UI
    case TYPES.BASE.INIT_UI: {
      return {
        ...state,
        showUI: true,
      };
    }
    // 获取渠道参数
    case TYPES.BASE.GET_CHANNEL_KEYS: {
      return {
        ...state,
        channels: action.res,
      };
    }

    // 路由跳转
    case TYPES.BASE.ROUTER_PUSH: {
      return {...state, router: { name: action.name, type: action.opType, params: action.params }};
    }

    // 弹窗广告
    case TYPES.BASE.GET_POPUP_AD: {
      return {
        ...state,
        popupAd: action.res,
      };
    }
    // 多场景弹窗广告
    case TYPES.BASE.GET_POPUP_ADVERT: {
      return {
        ...state,
        popupAdvert: action.res,
      };
    }
    // 获取APP显示配置
    case TYPES.BASE.GET_APP_DISPLAY_CONFIG: {
      return {
        ...state,
        appDisplayConfig: action.res,
      };
    }
    // 获取首页相关的信息，例如banner，视频，广告等
    case TYPES.BASE.GET_HOME_INFOS: {
      return {
        ...state,
        homeInfos: action.res,
      };
    }
    // 缓存准备就绪
    case TYPES.BASE.CACHE_READY: {
      return {
        ...state,
        cacheReady: true,
      };
    }
    case TYPES.BASE.GET_FACE_B_CONFIG: {
      return {
        ...state,
        faceBConfig: action.res,
      };
    }
    // 登出
    case TYPES.USER.LOGOUT: {
      store.remove('AUTH');
      store.remove('USER-PROFILE');
      store.remove('MT4-PASS');
      const router = action.isAuto ? { name: 'Login', type: 'replace' } : { };
      let initState = {
        ...initialState.base,
        showUI: state.showUI,
        toast: state.toast,
        contactInfo: state.contactInfo,
        appConfigs: state.appConfigs,
        memberInfo: state.memberInfo,
        configs: state.configs,
        appDisplayConfig: state.appDisplayConfig,
        homeInfos: state.homeInfos,
        router
      };
      return initState;
    }
    // 清空导航数据
    default:
      return state;
  }
}
