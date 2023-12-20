/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-22 16:18:45
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/navigations/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = {
  navigator : StyleSheet.create({
    tabBar : {
      paddingBottom: 0
    },
    bg:{
      width:'100%',
      height:'100%',
    }
  }),
  tabIcon: StyleSheet.create({
    common: {
      width: G.mixin.rem(21),
      height: G.mixin.rem(19),
    },
    logDeposit:{
      width: G.mixin.rem(24),
      height: G.mixin.rem(22),
    },
    deposit : {
      width: G.mixin.rem(22),
      height: G.mixin.rem(22),
      marginBottom : -2
    },
    large: {
      width: G.mixin.rem(34),
      height: G.mixin.rem(34),
      marginBottom : G.mixin.rem(15),
    },
    my: {
      width: G.mixin.rem(17),
      height: G.mixin.rem(19),
    }
  })
}

// 固定导出
export const GS = G;
export default { GS, LS };