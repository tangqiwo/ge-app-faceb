/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 15:14:12
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/configs.ts
 * @Description: 私有配置
 */
import { Platform } from 'react-native';
import CONFIGS from '@constants/configs';
import { isActiveAnimation } from '@helpers/unit';

// 生产
export const API = 'http://16.163.191.94:16002';

// 测试
// export const API = 'http://18.166.96.17:16002';

// export const API = 'https://app-api.eydwi.com'

export const MC_WEB_DOMAIN = 'http://mc.lonsdg.com'

export const OFFICE_WEB_DOMAIN = 'http://www.lonsdg.com'

// 渠道编号
export const CHANNEL_CODE = Platform.OS === 'android' ? 'gegoldhk.com-android' : 'gegoldhk.com-ios';

export const IS_ACTIVE_ANIMATION = isActiveAnimation();

export default {
  ...CONFIGS,
  MC_WEB_DOMAIN,
  OFFICE_WEB_DOMAIN,
  API,
  CHANNEL_CODE,
  IS_ACTIVE_ANIMATION
}