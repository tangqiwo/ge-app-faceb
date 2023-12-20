/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Strategy/components/Title/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: G.mixin.rem(-14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {
    width: G.mixin.rem(95),
    height: G.mixin.rem(30),
    backgroundColor: '#FFC600',
    borderTopRightRadius: G.mixin.rem(15),
    borderBottomRightRadius: G.mixin.rem(15),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
  more: {
    color: '#2A2A2A',
    marginRight: G.mixin.rem(-14),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
