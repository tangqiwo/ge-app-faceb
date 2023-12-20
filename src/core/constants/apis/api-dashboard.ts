/*
 * @Author: Galen.GE
 * @Date: 2023-07-21 17:35:46
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/apis/api-dashboard.ts
 * @Description: 报表相关
 */

export default {

  // 获取客户列表
  ['dashboard/getCustomerList']: 'MC/Agent/SelectMyDirectUsers',

  // 获取仓位总结
  ['dashboard/getPositionSummary']: 'MC/AgentReport/SelectPositionOfDirectUsers',

  // 获取仓位总计
  ['dashboard/getPositionSummaryTotal']: 'MC/AgentReport/GetAccurateOfPositionsInfo',

  // 获取下级存取记录
  ['dashboard/getSubordinateDepositWithdrawal']: 'MC/AgentReport/SelectMyDirectUserPaymentRecords',

  // 获取存取记录总计
  ['dashboard/getDepositWithdrawalTotal']: 'MC/AgentReport/GetAccurateOfMyDirectUserPaymentRecords',

  // 查询佣金记录
  ['dashboard/getCommissionRecord']: 'MC/AgentReport/SelectMyRebateDetailsOfMonth',

  // 获取合同内容
  ['dashboard/getContractContent']: 'MC/Agent/GetMySigningInfo',

  // 获取交易记录
  ['dashboard/getTransactionRecord']: 'mt4_trader_record/select',

  // 存取明细
  ['dashboard/getDepositWithdrawalDetail']: 'payment/$',

}
