/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/News/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    height: G.mixin.rem(497),
    marginTop: G.mixin.rem(15),
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(5),
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
  banner01: {
    marginTop: G.mixin.rem(15),
    width: G.mixin.rem(319),
    height: G.mixin.rem(179),
    borderRadius: G.mixin.rem(5),
  },
  playImage: {
    width: G.mixin.rem(9),
    height: G.mixin.rem(10),
    marginRight: G.mixin.rem(5),
  },
  banner01Text: {
    marginTop: G.mixin.rem(15),
    flexDirection: 'row',
    alignItems: 'center',
  },
  playNumberView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playNumberImage: {
    width: G.mixin.rem(10),
    height: G.mixin.rem(10),
    marginRight : G.mixin.rem(5),
  },
  updateTime: {
    marginTop: G.mixin.rem(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  updateTimeText: {
    color: '#94938F',
  },
  updateTimeIcon: {
    color: '#94938F',
    fontSize: G.mixin.rem(14),
    marginLeft: G.mixin.rem(5),
  },
  liveView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: G.mixin.rem(20),
    height: G.mixin.rem(86),
  },
  liveViewImage: {
    width: G.mixin.rem(153),
    height: G.mixin.rem(86),
    borderRadius: G.mixin.rem(5),
  },
  pointView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: G.mixin.rem(15),
    flexWrap: 'wrap',
  },
  pointViewItem: {
    width: G.mixin.rem(153),
  },
  pointViewItemText: {
    lineHeight: G.mixin.rem(18),
    fontSize: G.mixin.rem(11),
    height: G.mixin.rem(36),
  },
})

// 固定导出
export const GS = G;
export default { GS, LS };
