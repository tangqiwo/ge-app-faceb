/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Trophy/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    height: G.mixin.rem(320),
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(5),
    marginBottom: G.mixin.rem(15),
    ...G.mixin.padding(14,14,14,14)
  },
  title: {
    height: G.mixin.rem(20),
    borderLeftColor: '#FFC600',
    borderLeftWidth: G.mixin.rem(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    marginLeft: G.mixin.rem(5),
    fontWeight: '600',
    color: '#2A2A2A',
    fontSize: G.mixin.rem(15),
  },
  titleMore: {
    color: '#94938F',
    fontSize: G.mixin.rem(12),
  },
  imageViews: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  imageItemView: {
    marginTop: G.mixin.rem(15),
    width: G.mixin.rem(153),
    flexDirection: 'row',
    flexWrap  : 'wrap',
    justifyContent: 'center',
    borderRadius: G.mixin.rem(10),
  },
  imageItem: {
    width: G.mixin.rem(160),
    height: G.mixin.rem(95),
    borderRadius: G.mixin.rem(10),
  },
  imageItemText: {
    marginTop: G.mixin.rem(10),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
