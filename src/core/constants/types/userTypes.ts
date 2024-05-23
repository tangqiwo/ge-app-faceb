/*
 * @Description: 用户相关
 * @Author: Galen.GE
 * @Date: 2019-12-31 15:50:12
 * @LastEditTime: 2024-05-15 00:25:02
 * @LastEditors: ammo@xyzzdev.com
 */

// 登录
export const LOGIN = 'USER/LOGIN';

// 设置个人信息
export const SET_PROFILE  = 'USER/SET_PROFILE';

// 登出
export const LOGOUT = 'USER/LOGOUT';

// 设置TOKEN
export const SET_TOKEN = 'USER/SET_TOKEN';

// 获取用户信息
export const GET_USER_INFO = 'USER/GET_USER_INFO';

// 获取用户中心信息
export const GET_MEMBER_CENTER_INDEX = 'USER/GET_MEMBER_CENTER_INDEX';

// 获取用户消息
export const GET_USER_MESSAGE = 'USER/GET_USER_MESSAGE';

// 上传身份证
export const SUBMIT_ID_CARD_IMAGE = 'USER/SUBMIT_ID_CARD_IMAGE';

// 变更头像
export const UPDATE_AVATAR = 'USER/UPDATE_AVATAR';

// 变更昵称
export const UPDATE_NICKNAME = 'USER/UPDATE_NICKNAME';

// 变更邮箱
export const UPDATE_EMAIL = 'USER/UPDATE_EMAIL';

// 变更地址
export const UPDATE_ADDRESS = 'USER/UPDATE_ADDRESS';

// 获取注册手机验证码
export const GET_AUTH_CODE = 'USER/GET_AUTH_CODE';

// 修改会员中心密码
export const UPDATE_GE_USER_PASSWORD = 'USER/UPDATE_GE_USER_PASSWORD';

// 修改MT4密码
export const UPDATE_MT4_PASSWORD = 'USER/UPDATE_MT4_PASSWORD';

// 获取用户银行卡列表
export const SELECT_MY_BANK_LIST = 'USER/SELECT_MY_BANK_LIST';

// 新增银行卡
export const BIND_BANK_CARD = 'USER/BIND_BANK_CARD';

// 删除银行卡
export const DELETE_BANK_CARD = 'USER/DELETE_BANK_CARD';

// 获取开户流程引导状态
export const GET_REGISTER_GUIDE_STATUS = 'USER/GET_REGISTER_GUIDE_STATUS';

// 设置开户流程引导状态
export const SET_REGISTER_GUIDE_STATUS = 'USER/SET_REGISTER_GUIDE_STATUS';

// 获取用户注册进度
export const GET_REGISTER_PROGRESS = 'USER/GET_REGISTER_PROGRESS';

// 退出提示
export const LOGOUT_DIALOG = 'USER/LOGOUT_DIALOG';

// 获取未读信息
export const GET_UNREAD_MESSAGE = 'USER/GET_UNREAD_MESSAGE';