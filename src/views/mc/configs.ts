/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 15:14:12
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/configs.ts
 * @Description: 私有配置
 */
import { Platform } from 'react-native';
import CONFIGS from '@constants/configs';
import { isActiveAnimation } from '@helpers/unit';
import DeviceInfo from 'react-native-device-info'

const app_version = DeviceInfo.getVersion();

// 生产
// export const API = 'http://18.166.96.17:16002';

// 测试
export const API = app_version.includes('-rc') ? 'http://18.166.96.17:16002' : 'http://121.37.240.170:8443';

// 测试环境
// export const MC_WEB_DOMAIN = 'http://mc.lonsdg.com'
// export const OFFICE_WEB_DOMAIN = 'http://www.lonsdg.com'

// 生产环境
export const MC_WEB_DOMAIN =  app_version.includes('-rc') ? 'http://mc.lonsdg.com' : 'https://vip.gijvnqh.com'
export const OFFICE_WEB_DOMAIN =  app_version.includes('-rc') ? 'http://mc.lonsdg.com' : 'https://gegoldhk.com'

// 渠道编号
export const CHANNEL_CODE = Platform.OS === 'android' ? 'gegoldhk.com-android' : 'gegoldhk.com-ios';

export const IS_ACTIVE_ANIMATION = isActiveAnimation();

export const VERSION = '1.3.1';

export default {
  ...CONFIGS,
  MC_WEB_DOMAIN,
  OFFICE_WEB_DOMAIN,
  API,
  CHANNEL_CODE,
  IS_ACTIVE_ANIMATION,
  VERSION
}