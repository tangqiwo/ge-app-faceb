/*
 * @Description: 用户相关状态管理
 * @Author: Galen.GE
 * @Date: 2019-12-31 17:27:08
 * @LastEditTime: 2024-05-23 16:47:34
 * @LastEditors: ammo@xyzzdev.com
 */
import _ from 'lodash';
import TYPES from '@core/constants/types';
import initialState from './redux-store';

export default function user(state = initialState.user, action: any) {
  switch (action.type) {
    // 设置TOKEN
    case TYPES.USER.SET_TOKEN: {
      return { ...state, token: action.token };
    }
    // 设置个人信息
    case TYPES.USER.SET_PROFILE: {
      return {...state, info: action.data}
    }
    // 个人信息
    case TYPES.USER.GET_USER_INFO: {
      return { ...state, info: action.res };
    }
    // 获取用户注册进度
    case TYPES.USER.GET_REGISTER_PROGRESS: {
      return {
        ...state,
        registerProgress: {
          code: action.response.Code,
          data: action.response.Data,
          desc: action.response.Desc
        }
      };
    }
    // 开户引导状态
    case TYPES.USER.SET_REGISTER_GUIDE_STATUS: {
      return { ...state, registerGuideStatus: action.res || {} };
    }
    // 未读信息
    case TYPES.USER.GET_UNREAD_MESSAGE: {
      return { ...state, unreadMessage: _.pick(action.res, ['MessageGroupMemberMessage', 'MessageGroupPublicMessage']) };
    }
    // MT4账户
    case TYPES.USER.GET_MT4_ACCOUNT: {
      return { ...state, mt4Accounts: action.res };
    }
    // 退出提示
    case TYPES.USER.LOGOUT_DIALOG: {
      return { ...state, leaveModal: action.res };
    }
    case TYPES.USER.LOGOUT: {
      return { ...initialState.user };
    }
    default:
      return state;
  }
}
