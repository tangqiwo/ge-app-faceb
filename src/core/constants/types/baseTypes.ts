/*
 * @Description: BASE 的一些 ACTIONS
 * @Author: Galen.GE
 * @Date: 2019-12-17 17:57:05
 * @LastEditTime: 2024-02-21 17:37:02
 * @LastEditors: Galen.GE
 */

// 设置API
export const SET_API = 'SET_API';

// 打开LOADING
export const LOADING_OPEN = 'BASE/LOADING_OPEN';

// 关闭LOADING
export const LOADING_CLOSE = 'BASE/LOADING_CLOSE';

// 打开Toast
export const TOAST_OPEN = 'BASE/TOAST_OPEN';

// 关闭Toast
export const TOAST_CLOSE = 'BASE/TOAST_CLOSE';

// 打开MODAL
export const MODAL_OPEN = 'BASE/MODAL_OPEN';

// 关闭MODAL
export const MODAL_CLOSE = 'BASE/MODAL_CLOSE';

// 仅适用请求后回调函数处理，不再Reducers中产生状态变更
export const HTTP_ONLY = 'BASE/HTTP_ONLY';

// 打开IFRAME弹窗
export const OPEN_FRAME_MODAL = 'BASE/OPEN_FRAME_MODAL';

// 关闭IFRAME弹窗
export const CLOSE_FRAME_MODAL = 'BASE/CLOSE_FRAME_MODAL';

// 什么都不做
export const DO_NOTHING = 'BASE/DO_NOTHING';

// 获取联系我们的信息
export const GET_CONTACT_INFO = 'BASE/GET_CONTACT_INFO';

// 打开POPUP联系框
export const OPEN_POPUPS = 'OPEN_POPUPS';

// 关闭POPUP联系框
export const CLOSE_POPUPS = 'CLOSE_POPUPS';

// 获取首页相关配置（初始化配置）
export const GET_HOME_CONFIG = 'BASE/GET_HOME_CONFIG';

// 获取 APP 版本，OSS 域名等配置
export const GET_APP_CONFIG = 'BASE/GET_APP_CONFIG';

// 获取会员信息等
export const GET_MEMBER_INFO = 'BASE/GET_MEMBER_INFO';

// 重置登出码
export const RESET_EXIT_CODE = 'BASE/RESET_EXIT_CODE';

// 获取上传图片的URL和配置信息
export const GET_UPLOAD_URL = 'BASE/GET_UPLOAD_URL';

// 获取银行code列表
export const GET_SELECT_BANK_LIST = 'BASE/GET_SELECT_BANK_LIST';

// 获取弹出广告
export const GET_POPUP_AD = 'BASE/GET_POPUP_AD';

// 初始化UI
export const INIT_UI = 'BASE/INIT_UI';

// 获取常用地区信息
export const GET_LOCATIONS = 'BASE/GET_LOCATIONS';

// 获取渠道参数数组
export const GET_CHANNEL_KEYS = 'BASE/GET_CHANNEL_KEYS';

// 路由跳转
export const ROUTER_PUSH = 'BASE/ROUTER_PUSH';

// 多场景弹窗广告
export const GET_POPUP_ADVERT = 'BASE/GET_POPUP_ADVERT';

// 获取APP显示配置
export const GET_APP_DISPLAY_CONFIG = 'BASE/GET_APP_DISPLAY_CONFIG';

// 获取首页相关的信息，例如banner，视频，广告等
export const GET_HOME_INFOS = 'BASE/GET_HOME_INFOS';

// 缓存准备就绪
export const CACHE_READY = 'BASE/CACHE_READY';

// 获取弹窗
export const GET_DIALOG = 'BASE/GET_DIALOG';

// 获取FACE B配置
export const GET_FACE_B_CONFIG = 'BASE/GET_FACE_B_CONFIG';