/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 15:12:00
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/constants/configs/index.tsx
 * @Description: 基础配置
 */
import Enum from '@core/constants/enum';
import { isActiveAnimation } from '@helpers/unit'

export default {

  // 是否启用动画
  ENABLE_ANIMATION: isActiveAnimation(),

  // 国家
  COUNTRY:  'China',

  // 语言
  SUPPORT_LANGUAGES:  ['zh-CN'],

  // 支持的手机短信验证码国家地区
  SUPPORT_PHONE_CODE:  Enum.common.ECountryCode,

  // 平台币种
  CURRENCY:  'CNY',

  // 支持Zalo 二维码
  SUPPORT_ZALO_QR_CODE:  false


}