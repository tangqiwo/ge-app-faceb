/*
 * @Author: Shawn.GE
 * @Date: 2023-07-26 13:33:53
 * @LastEditors: ammo@xyzzdev.com
 * @LastEditTime: 2023-11-09 12:33:45
 * @FilePath: /app_face_b/src/core/actions/paymentAction.ts
 * @Description: 支付相关
 */

import _ from 'lodash';
import * as INTERFACE from '@schemas/redux-action';
import { HTTP } from '@core/helpers/http';
import TYPES from '@core/constants/types';
// 获取充值渠道列表
export const getAllChannels = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/get_all_channels',
    method: HTTP.METHODS.GET,
  },
  cb,
});
// 获取当前在处理的订单
export const getPaymentCheck = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/get_processing_order',
    method: HTTP.METHODS.POST,
    loading: true,
  },
  cb,
});
// 获取银行列表
export const getBankList = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/get_bank_list',
    method: HTTP.METHODS.GET,
  },
  cb,
});

// 获取我的银行卡
export const getBankAcc = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/get_my_bankcard',
    method: HTTP.METHODS.GET,
  },
  cb,
});

// 获取我的虚拟钱包
export const getVirtAcc = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/get_virtual_wallet',
    method: HTTP.METHODS.POST,
  },
  cb,
});

// 绑定虚拟钱包地址
export const bindVirtualWallet = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/bind_virtual_wallet',
    method: HTTP.METHODS.POST,
    loading: true,
    data,
  },
  cb,
});

// 获取银行卡充值支付类型列表
export const getOrderPayTypeList = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/get_order_pay_type_list',
    method: HTTP.METHODS.GET,
  },
  cb,
});

// 创建充值订单
export const createDepositOrder = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/create_deposit_order',
    method: HTTP.METHODS.POST,
    loading: true,
    data,
  },
  cb,
  passError: true,
});

// 上传充值凭证
export const updateDeposit = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/user_payment_doc_update',
    method: HTTP.METHODS.POST,
    loading: true,
    data,
  },
  cb,
});

//取消充值订单
export const cancelDepositOrder = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/cancel_deposit_order',
    method: HTTP.METHODS.POST,
    loading: true,
    data,
  },
  cb,
});

// 创建充值订单
export const createWithdrawOrder = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/create_withdrawal_order',
    method: HTTP.METHODS.POST,
    loading: true,
    data,
  },
  cb,
});

// 获取当前在处理的订单
export const getWithdrawCheck = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'payment/create_withdrawal_order_preview',
    method: HTTP.METHODS.POST,
    loading: true,
    data,
  },
  cb,
});
