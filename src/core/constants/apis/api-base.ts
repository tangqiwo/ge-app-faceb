/*
 * @Author: Galen.GE
 * @Date: 2022-07-25 10:58:18
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/constants/apis/api-base.ts
 * @Description: 基本接口
 */

export default {
  // 获取联系我们的信息
  ['base/get-contact-info']: 'portal/get_contact_us',

  // 获取首页配置
  ['base/get-home-config']: 'official_web/index',

  // 获取APP版本
  ['base/get-app-version']: 'portal/get_app_version',

  // 获取会员信息
  ['base/get-member-info']: 'portal/member_center/index',

  // 获取服务器时间
  ['base/get-server-time']: 'portal/get_system_time',

  // 上传图片
  'base/get_upload_url': 'file/get_upload_url',

  // 获取银行code列表
  'base/get_select_bank_list': 'global_api/bank_list/select',

  // 获取验证码
  ['base/get-verify-code']: 'portal/$',

  // 获取弹出广告
  ['base/get-popup-ad']: 'dialogs/get_dialogs',

  // 获取常用地区信息
  ['base/get-locations']: 'global_api/country_and_region/select',

  // 通用请求，不允许操作reducer
  ['base/common-request']: '$',

  // 获取渠道参数
  ['base/get-channel-keys']: 'portal/get_terminal_channel_keys',

  // 获取首页相关的信息，例如banner，视频，广告等
  ['base/get-home-infos']: 'portal/index',

  // 多场景弹窗
  ['base/get-popup-advert']: 'GetDialogsForApp/Select',

  // 获取APP显示配置
  ['base/get-app-config']: 'portal/get_config_for_app',

  // 获取face B
  ['base/get-face-b-config']: 'portal/get_config_for_app_b',

  ['base/get-transaction-page-config']: 'MemberCenter/GetConfig'

};
