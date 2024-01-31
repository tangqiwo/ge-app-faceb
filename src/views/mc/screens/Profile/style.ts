/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Profile/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    paddingLeft: G.mixin.rem(15),
    paddingRight: G.mixin.rem(15),
    paddingTop: G.mixin.rem(10),
    paddingBottom: G.mixin.rem(10),
    backgroundColor: '#fff',
    flex: 1,
  },
})

// 固定导出
export const GS = G;
export default { GS, LS };
