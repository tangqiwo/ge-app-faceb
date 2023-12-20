/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/__Popups/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  C: {
    ...G.mixin.padding(14, 14, 14, 14),
  },
  V: {
    marginTop: G.mixin.rem(10),
  },
  P: {
    fontSize: G.mixin.rem(14),
    color: '#2A2A2A',
    lineHeight: G.mixin.rem(20),
  },
  PB: {
    fontSize: G.mixin.rem(14),
    color: '#2A2A2A',
    lineHeight: G.mixin.rem(20),
    fontWeight: '600',
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
