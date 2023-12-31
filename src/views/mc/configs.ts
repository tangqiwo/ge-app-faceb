/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 15:14:12
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/configs.ts
 * @Description: 私有配置
 */

import CONFIGS from '@constants/configs';

export const API = 'http://18.166.96.17:16002';

// export const API = 'https://app-api.nqbsr.com'

export const MC_WEB_DOMAIN = 'http://mc.lonsdg.com'

export const OFFICE_WEB_DOMAIN = 'http://www.lonsdg.com'

export default {
  ...CONFIGS,
  MC_WEB_DOMAIN,
  OFFICE_WEB_DOMAIN,
  API
}