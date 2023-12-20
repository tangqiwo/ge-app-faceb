/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/components/Header/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  header: {
    height: G.mixin.rem(50),
    backgroundColor: '#2A2A2A',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerText: {
    color: '#E7CC8F',
    fontWeight: '600',
    fontSize: G.mixin.rem(18),
  },
  goBack: {
    position: 'absolute',
    left: G.mixin.rem(4),
    ...G.mixin.padding(16, 10, 10, 10),
  },
  goBackIcon: {
    fontSize: G.mixin.rem(18),
    color: '#2A2A2A',
  },
  email: {
    position: 'absolute',
    right: G.mixin.rem(4),
    ...G.mixin.padding(16, 10, 10, 10),
  },
})

// 固定导出
export const GS = G;
export default { GS, LS };
