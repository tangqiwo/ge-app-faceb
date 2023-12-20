/*
 * @Author: Shawn.GE
 * @Date: 2023-07-26 13:25:00
 * @LastEditors: Shawn.GE
 * @LastEditTime: 2023-08-02 16:17:33
 * @FilePath: /react_project/src/core/apis/api-payment.ts
 * @Description: 支付接口
 */
export default {
  // 获取虚拟钱包
  ['payment/get_virtual_wallet']: 'payment/select_virtual_wallet',

  // 绑定虚拟钱包
  ['payment/bind_virtual_wallet']: 'payment/bind_virtual_wallet',

  // 删除虚拟钱包
  ['payment/delete_virtual_wallet']: 'payment/delete_virtual_wallet',

  // 获取所有支付渠道
  ['payment/get_all_channels']: 'payment/get_all_channels',

  // 获取当前处理的充值订单
  ['payment/get_processing_order']: 'payment/select_processing_order',

  // 获取绑定的银行卡
  ['payment/get_my_bankcard']: 'member_center_my_account/select_my_bank_card',

  // 创建充值订单
  ['payment/create_deposit_order']: 'payment/create_deposit_order',

  // 获取银行列表
  ['payment/get_bank_list']: 'global_api/bank_list/select',

  // 上传充值收据
  ['payment/user_payment_doc_update']: 'payment/user_payment_doc_update',

  // 取消充值订单
  ['payment/cancel_deposit_order']: 'payment/cancel_deposit_order',

  // 创建取款订单
  ['payment/create_withdrawal_order']: 'payment/create_withdrawal_order',

  // 创建取款订单预览
  ['payment/create_withdrawal_order_preview']: 'payment/create_withdrawal_order_preview',

  // 获取取款订单type
  ['payment/get_order_pay_type_list']: 'payment/get_order_pay_type_list',
};
