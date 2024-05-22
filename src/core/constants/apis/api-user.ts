/*
 * @Author: Galen.GE
 * @Date: 2022-07-25 10:58:18
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/constants/apis/api-user.ts
 * @Description: 用户 & 权限相关接口
 */
export default {
  // 登录
  ['user/login']: 'portal/login_by_phone_number',

  // 退出提示
  'user/logoutDialog': 'GetDialogTypeByDeposit/Select?Platform=GePlatformOnPc',

  // 使用验证码登录
  ['user/login-by-verify-code']: 'portal/LoginByPhoneNumberAndAuthCode',

  // 获取用户信息
  ['user/get-user-info']: 'operator/get_info',

  // 获取验证码
  ['user/get-verify-code']: 'portal/auth_code_for_register_by_phone_number',

  // 注册
  ['user/register']: 'portal/register_by_phone_number',

  // 用户消息
  'user/messages': 'messages/public_messages',

  // 用户信息
  'user/member_center_home': 'member_center_home/index?Platform=BannerPlatformOnPc',

  // 上传身份证
  'user/submitIdCardImage': 'MemberPrivateInfo/ImproveIdCardImage',

  // 补充资料
  'user/submitImproveDocument': 'MemberPrivateInfo/ImproveDocument',

  // 变更头像
  'user/update_avatar': 'member_center_home/update_avatar',

  // 修改昵称
  'user/update_nickname': 'member_center_home/update_nickname',

  // 修改邮箱
  'user/update_email': 'member_center_home/update_email',

  // 修改地址
  'user/update_address': 'member_center_home/update_address',

  // 获取注册手机验证码
  'user/get_uth_code': 'member_center_home/auth_code_for_update_mt4_login_password',

  // 修改会员中心密码
  'user/update_ge_user_password': 'member_center_home/update_ge_user_login_password',

  // 修改MT4密码
  'user/update_mt4_password': 'member_center_home/update_mt4_user_login_password',

  // 获取用户银行卡列表
  'user/select_my_bank_list': 'member_center_my_account/select_my_bank_card',

  // 新增银行卡
  'user/bind_bank_card': 'member_center_my_account/request_bind_bank_card',

  // 删除银行卡
  'user/delete_bank_card': 'member_center_my_account/request_delete_bank_card',

  // 开户流程引导状态
  'user/getRegisterGuideStatus': 'member_center_my_account/RegisterGuide',

  // 获取开户链接和注册码
  ['user/get-promotion-link']: 'MC/Agent/GetIntroducerLinksAndCode',

  // 签署介绍人协议
  ['user/sign-introducer-agreement']: 'MC/Agent/SignAsIntroducer',

  // 按类型获取不同的信息列表
  ['user/get-messages']: 'messages/$_messages?Page=$&PageSize=$',

  // 重置密码
  ['user/reset-password']: 'portal/reset_password_by_phone_number',

  // 获取用户注册进度
  ['user/get-register-progress']: 'member_center_my_account/RegisterGuide',

  // 实名认证
  ['user/verify-real-name']: 'member_center_my_account/request_bind_private_info/set',

  // 提交问卷调查
  ['user/submit-questionnaire']: 'member_center_my_account/kyc_v2',

  // 获取mt4 demo账号
  ['user/get-mt4-demo-account']: 'member_center_my_account/index',

  // 获取kyc限时充值信息
  'user/deposit_activity_config': 'deposit_activity/get_config',

  // 注销账号
  'user/del-account': 'operator/DestroyUser',

  // 获取 MT4 账号
  'user/get-mt4-account': 'Mt4/GetMt4Accounts',

}
