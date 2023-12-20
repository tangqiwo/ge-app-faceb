/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Banner/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = {
  banner: StyleSheet.create({
    box: {
      height: G.mixin.rem(211),
      width : '100%'
    },
    image: {
      height: G.mixin.rem(211),
      width : '100%'
    }
  })
}

// 固定导出
export const GS = G;
export default { GS, LS };
