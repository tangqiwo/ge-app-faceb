/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/CustomerService/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS =StyleSheet.create({
  container: {
    width: G.mixin.rem(48),
    height: G.mixin.rem(42),
    position: 'absolute',
    right: G.mixin.rem(0),
    top: '50%',
    backgroundColor: '#FFC600',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: G.mixin.rem(50),
    borderBottomLeftRadius: G.mixin.rem(50),
  },
  icon: {
    width: G.mixin.rem(25),
    height: G.mixin.rem(25),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
