/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Videos/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  header: {
    backgroundColor: '#FFC600',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#2A2A2A',
    fontWeight: '600',
    fontSize: G.mixin.rem(18),
  },
  contentView: {
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(75),
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
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabsItem: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  tabsItemActive: {
    borderBottomColor: '#FFC600',
    borderBottomWidth: 2,
  },
  tabsItemText:{
    fontSize: G.mixin.rem(15),
    color: '#646464',
  },
  tabsItemTextActive:{
    color: '#2A2A2A',
    fontWeight: '600',
  },
  videoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    flexWrap: 'wrap',
  },
  videoViewItem: {
    width: '48%',
    marginTop: G.mixin.rem(15),
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
  },
  pointView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: G.mixin.rem(15),
    flexWrap: 'wrap',
  },
  pointViewItem: {
    marginTop: G.mixin.rem(5),
    marginBottom: G.mixin.rem(5),
    width: G.mixin.rem(153),
  },
  pointViewItemText: {
    fontSize: G.mixin.rem(11),
  },
  updateTime: {
    marginTop: G.mixin.rem(5),
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
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
