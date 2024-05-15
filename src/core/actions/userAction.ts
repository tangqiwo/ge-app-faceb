/*
 * @Author: Galen.GE
 * @Date: 2022-07-24 21:20:42
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/actions/userAction.ts
 * @Description: 用户相关的ACTIONS
 */
import _ from 'lodash';
import * as INTERFACE from '@schemas/redux-action';
import { HTTP } from '@core/helpers/http';
import TYPES from '@core/constants/types';
import { UserInfo } from '@core/schemas/interface';

// 登录
export const login = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.USER.LOGIN,
  payload: {
    key: data.Password ? 'user/login' : 'user/login-by-verify-code',
    data,
    method: HTTP.METHODS.POST,
    loading: true,
  },
  continue: ({ dispatch, res }: any) => {
    dispatch(setToken({ data: res.Data.Token }));
  },
  cb,
});

export const setProfile = ({ data }: any) => ({
  type: TYPES.USER.SET_PROFILE,
  data,
})

// 重置密码
export const resetPassword = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/reset-password',
    data,
    method: HTTP.METHODS.POST,
    loading: true,
  },
  cb,
});

// 设置TOKEN
export const setToken = ({ data }: INTERFACE.IProps): INTERFACE.IBase => ({
  type: TYPES.USER.SET_TOKEN,
  token: data.token,
});

// 获取用户信息
interface IGetUserInfo extends INTERFACE.IProps {
  cb?: Function;
  passError?: boolean;
  loading?: boolean;
}
export const getUserInfo = ({ cb, loading=true, passError=false }: IGetUserInfo): INTERFACE.IAPI => ({
  type: TYPES.USER.GET_USER_INFO,
  payload: {
    key: 'user/get-user-info',
    loading,
  },
  continue: ({ dispatch, res }: any) => {
    dispatch(getRegisterProgress({}));
    dispatch(getUnreadMessage({}))
  },
  passError,
  cb,
});

// 获取未读信息
export const getUnreadMessage = ({  }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.USER.GET_UNREAD_MESSAGE,
  payload: {
    key: 'user/get-unread-message',
    method: HTTP.METHODS.GET,
  },
});

// 获取用户信息
export const updateUserInfo = (res: UserInfo): INTERFACE.IBase => ({
  type: TYPES.USER.GET_USER_INFO,
  res,
});

// 获取用户中心信息
export const getMemberCenterIndex = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.USER.GET_MEMBER_CENTER_INDEX,
  payload: { key: 'user/member_center_home' },
  cb,
});

// 获取用户消息
export const getUserMessage = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.USER.GET_USER_MESSAGE,
  payload: {
    key: 'user/messages',
    data,
  },
  cb,
});

// 注销登出
export const logout = (isAuto = true): INTERFACE.IBase => ({
  type: TYPES.USER.LOGOUT,
  isAuto
});

// 退出提示
export const getLogoutDialog = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/logoutDialog',
  },
  cb,
});
// 更新退出弹框数据
export const updateLogoutDialog = (res: any): INTERFACE.IBase => ({
  type: TYPES.USER.LOGOUT_DIALOG,
  res,
});

// 获取验证码
export const getVerifyCode = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/get-verify-code',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
    isFormatRes: true,
  },
  cb,
});

// 注册
export const register = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/register',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
  },
  passError: true,
  cb,
});

// 上传身份证
export const submitIdCardImage = ({
  data,
  cb,
}: {
  data: any;
  cb: Function;
}): INTERFACE.IAPI => ({
  type: TYPES.USER.SUBMIT_ID_CARD_IMAGE,
  payload: {
    key: 'user/submitIdCardImage',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
  },
  cb,
});

// 补充资料
export const submitImproveDocument = ({
  data,
  cb,
}: {
  data: any;
  cb: Function;
}): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/submitImproveDocument',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
  },
  cb,
});

// 变更头像
export const updateAvatar = ({ Avatar, cb }: { Avatar: string; cb: Function }): INTERFACE.IAPI => ({
  type: TYPES.USER.UPDATE_AVATAR,
  payload: {
    key: 'user/update_avatar',
    method: HTTP.METHODS.POST,
    loading: true,
    data: {
      Avatar,
    },
  },
  cb,
});

// 变更昵称
export const updateNickname = ({ Nickname, cb }: { Nickname: string; cb: Function }): INTERFACE.IAPI => ({
  type: TYPES.USER.UPDATE_NICKNAME,
  payload: {
    key: 'user/update_nickname',
    method: HTTP.METHODS.POST,
    loading: true,
    data: {
      Nickname,
    },
  },
  cb,
});

// 变更邮箱
export const updateEmail = ({ Email, cb }: { Email: string; cb: Function }): INTERFACE.IAPI => ({
  type: TYPES.USER.UPDATE_EMAIL,
  payload: {
    key: 'user/update_email',
    method: HTTP.METHODS.POST,
    loading: true,
    data: {
      Email,
    },
  },
  cb,
});

// 变更地址
export const updateAddress = ({ Address, cb }: { Address: string; cb: Function }): INTERFACE.IAPI => ({
  type: TYPES.USER.UPDATE_ADDRESS,
  payload: {
    key: 'user/update_address',
    method: HTTP.METHODS.POST,
    loading: true,
    data: {
      Address,
    },
  },
  cb,
});

// 获取注册手机验证码
export const getAuthCode = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.USER.GET_AUTH_CODE,
  payload: {
    key: 'user/get_uth_code',
    loading: true,
  },
  cb,
});

// 修改会员中心密码
export const updateGeUserPassword = ({
  data,
  cb,
}: {
  data: {
    OldPassword: string;
    NewPassword: string;
  };
  cb: Function;
}): INTERFACE.IAPI => ({
  type: TYPES.USER.UPDATE_GE_USER_PASSWORD,
  payload: {
    key: 'user/update_ge_user_password',
    method: HTTP.METHODS.POST,
    loading: true,
    data,
  },
  cb,
});

// 修改MT4密码
export const updateMT4Password = ({
  data,
  cb,
}: {
  data: {
    Password: string;
    AuthCode: string;
  };
  cb: Function;
}): INTERFACE.IAPI => ({
  type: TYPES.USER.UPDATE_MT4_PASSWORD,
  payload: {
    key: 'user/update_mt4_password',
    method: HTTP.METHODS.POST,
    loading: true,
    data,
  },
  cb,
});

// 获取用户银行卡列表
export const getMyBankList = ({ cb }: { cb: Function }): INTERFACE.IAPI => ({
  type: TYPES.USER.SELECT_MY_BANK_LIST,
  payload: {
    key: 'user/select_my_bank_list',
  },
  cb,
});

// 新增银行卡
export const bindBankCard = ({
  data,
  cb,
}: {
  data: {
    BankCardNo: string;
    BankCardImage: string;
    BankName: string;
    BankInProvince?: string;
    BankInCity?: string;
    BankInArea?: string;
    BankAddress?: string;
  };
  cb: Function;
}): INTERFACE.IAPI => ({
  type: TYPES.USER.BIND_BANK_CARD,
  payload: {
    key: 'user/bind_bank_card',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
  },
  cb,
});
// 删除银行卡
export const deleteBankCard = ({
  data,
  cb,
}: {
  data: {
    Id: number;
  };
  cb: Function;
}): INTERFACE.IAPI => ({
  type: TYPES.USER.DELETE_BANK_CARD,
  payload: {
    key: 'user/delete_bank_card',
    method: HTTP.METHODS.POST,
    data,
  },
  cb,
});

// 获取开户流程引导状态
// Code: 201实名认证，202(KYC)，203（等待资料审批）204(显示MT4账户信息)  205（补充资料页面）
export const getRegisterGuideStatus = ({ cb }: { cb: Function }): INTERFACE.IAPI => ({
  type: TYPES.USER.GET_REGISTER_GUIDE_STATUS,

  payload: {
    key: 'user/getRegisterGuideStatus',
    method: HTTP.METHODS.GET,
  },
  passError: true,
  continue: ({ dispatch, res }: any) => {
    dispatch(setRegistertGuideStatus({ data: { code: res.Code, data: res.Data } }));
  },
  cb,
});

// 设置开户流程引导状态 将状态码存入redux
export const setRegistertGuideStatus = ({ data }: INTERFACE.IProps): INTERFACE.IBase => ({
  type: TYPES.USER.SET_REGISTER_GUIDE_STATUS,
  registerGuideStatus: data,
});

// 获取开户链接和介绍码
export const getPromotionLink = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/get-promotion-link',
    method: HTTP.METHODS.GET,
  },
  cb,
});

// 签署介绍人协议
export const signIntroducerAgreement = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/sign-introducer-agreement',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
  },
  cb,
});

// 按类型获取不同的信息列表
interface IGetMessages extends INTERFACE.IProps {
  type: 'public' | 'member' | 'active' | 'system';
  page: number;
  pageSize?: number;
}
export const getMessages = ({ type, page, pageSize = 10, cb }: IGetMessages): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/get-messages',
    urlParams: [type, page, pageSize],
    method: HTTP.METHODS.GET,
    cache: { expires: 5, forward: true, isUserBind: true },
  },
  cb,
});

// 获取注册进度
export const getRegisterProgress = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.USER.GET_REGISTER_PROGRESS,
  payload: {
    key: 'user/get-register-progress',
    method: HTTP.METHODS.GET,
  },
  passError: true,
  cb,
});

// 实名验证
export const verifyRealName = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/verify-real-name',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
  },
  cb,
});

// 提交问卷调查
export const submitQuestionnaire = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/submit-questionnaire',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
  },
  cb,
});

// 获取mt4 demo账户
export const getMt4Demo = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/get-mt4-demo-account',
    method: HTTP.METHODS.GET,
    cache: { expires: 5, forward: false, isUserBind: true },
  },
  cb,
});

// 获取kyc限时充值信息
export const getDepositActivityConfig = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/deposit_activity_config',
    cache: { expires: 5, forward: true, isUserBind: true },
  },
  cb,
});


// 注销账号
export const delAccount = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'user/del-account',
    method: HTTP.METHODS.POST,
  },
  cb,
});