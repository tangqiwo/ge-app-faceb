/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/components/Button/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  submitView: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(50),
  },
  submitText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
})

// 固定导出
export const GS = G;
export default { GS, LS };
