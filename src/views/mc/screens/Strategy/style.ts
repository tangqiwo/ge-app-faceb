/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Strategy/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: G.mixin.rem(20),
  },
  headerText: {
    color: '#2A2A2A',
    fontWeight: '600',
    fontSize: G.mixin.rem(18),
  },
  tips: {
    height: G.mixin.rem(105),
    width: G.mixin.rem(347),
    marginTop: G.mixin.rem(10),
    marginBottom: G.mixin.rem(10),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tipsTitle: {
    marginLeft: G.mixin.rem(14),
    marginTop: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    color: '#2A2A2A',
    fontSize: G.mixin.rem(15),
  },
  tipsContent: {
    color: '#646464',
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    fontSize: G.mixin.rem(12),
    marginTop: G.mixin.rem(10),
  },
  contentView: {
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(70),
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    paddingTop: G.mixin.rem(14),
    paddingBottom: G.mixin.rem(14),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    borderRadius: G.mixin.rem(5),
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  tabsVeiw: {
    height: G.mixin.rem(40),
    marginTop: G.mixin.rem(20),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabsItem: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsItemActive: {
    borderBottomColor: '#FFC600',
    borderBottomWidth: 2,
  },
  tabsItemText:{
    fontSize: G.mixin.rem(12),
    color: '#646464',
  },
  tabsItemTextActive:{
    fontSize: G.mixin.rem(14),
    color: '#2A2A2A',
    fontWeight: '600',
  },
  banner: {
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(20),
    height: G.mixin.rem(180),
    width: '100%',
  },
  title: {
    height: G.mixin.rem(20),
    marginTop: G.mixin.rem(15),
    marginLeft: G.mixin.rem(14),
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
  playNumberView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: G.mixin.rem(5),
  },
  playNumberImage: {
    width: G.mixin.rem(10),
    height: G.mixin.rem(10),
    marginRight : G.mixin.rem(2),
  },
  videoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: G.mixin.rem(73),
    alignItems: 'center',
    marginTop: G.mixin.rem(20),
    paddingBottom: G.mixin.rem(20),
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  videoCover: {
    width: G.mixin.rem(129),
    height: G.mixin.rem(73),
  },
  videoInfo:{
    height: G.mixin.rem(73),
    flex: 1,
    paddingLeft: G.mixin.rem(5),
    paddingRight: G.mixin.rem(5),
  },
  videoInfoTitle: {
    marginBottom: 'auto',
    fontSize: G.mixin.rem(12),
  },
  goButton: {
    backgroundColor: '#FFC600',
    width: G.mixin.rem(50),
    height: G.mixin.rem(18),
    borderRadius: G.mixin.rem(9),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateTime: {
    marginTop: G.mixin.rem(10),
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
