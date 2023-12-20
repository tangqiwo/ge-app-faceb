/*
 * @Author: Galen.GE
 * @Date: 2023-07-21 16:55:45
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/actions/dashboardAction.ts
 * @Description: 报表
*/
import * as INTERFACE from '@schemas/redux-action';
import { HTTP } from '@core/helpers/http';
import TYPES from '@core/constants/types';


// 获取客户列表
export const getCustomerList = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getCustomerList',
    method: HTTP.METHODS.POST,
    data
  },
  cb
})

// 查询仓位总结
export const getPositionSummary = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getPositionSummary',
    method: HTTP.METHODS.POST,
    data
  },
  cb
})

// 获取仓位总计
export const getPositionSummaryTotal = ({cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getPositionSummaryTotal',
    method: HTTP.METHODS.GET,
  },
  cb
})


// 查询下级存取记录
export const getSubordinateDepositWithdrawal = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getSubordinateDepositWithdrawal',
    method: HTTP.METHODS.POST,
    data
  },
  cb
})

// 获取存取记录总计
export const getDepositWithdrawalTotal = ({cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getDepositWithdrawalTotal',
    method: HTTP.METHODS.GET,
  },
  cb
})

// 查询佣金记录
export const getCommissionRecord = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getCommissionRecord',
    method: HTTP.METHODS.POST,
    data
  },
  cb
})

// 获取合同内容
export const getContractContent = ({cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getContractContent',
    method: HTTP.METHODS.GET,
  },
  cb
})

// 获取交易记录
export const getTransactionRecord = ({data, cb}: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getTransactionRecord',
    method: HTTP.METHODS.POST,
    data
  },
  cb
})


// 存取明细
interface IGetDepositWithdrawalDetail extends INTERFACE.IProps {
  type: 'select_order_details' | 'select_withdrawal_order_details'
}
export const getDepositWithdrawalDetail = ({data, type, cb}: IGetDepositWithdrawalDetail): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'dashboard/getDepositWithdrawalDetail',
    urlParams: [type],
    method: HTTP.METHODS.POST,
    data
  },
  cb
})
