/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/MessageCenter/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    paddingTop: G.mixin.rem(14),
    paddingBottom: G.mixin.rem(14),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    borderRadius: G.mixin.rem(5),
    backgroundColor: '#FFFFFF',
    minHeight: G.mixin.rem(350),
    flex: 1,
  },
  tabsVeiw: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
  tabsItemBadge: {
    width: G.mixin.rem(14),
    height: G.mixin.rem(14),
    borderRadius: G.mixin.rem(14),
    backgroundColor: '#FF0000',
    marginLeft: G.mixin.rem(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsItemBadgeText: {
    fontSize: G.mixin.rem(10),
    color: '#FFFFFF',
  },
  tips: {
    marginTop: G.mixin.rem(20),
    width: '100%',
    textAlign: 'center',
    fontSize: G.mixin.rem(14),
    color: '#2A2A2A',
    marginBottom: G.mixin.rem(20),
  },
  messageItem: {
    maxHeight: G.mixin.rem(120),
    paddingTop  : G.mixin.rem(16),
    paddingBottom: G.mixin.rem(16),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,

  },
  messageItemTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageItemTitleText: {
    fontSize: G.mixin.rem(12),
    width: G.mixin.rem(260),
    color: '#2A2A2A',
    fontWeight: '600',
  },
  messageItemContentText: {
    fontSize: G.mixin.rem(12),
    color: '#94938F',
    lineHeight: G.mixin.rem(16),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
