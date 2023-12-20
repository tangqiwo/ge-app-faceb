/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Strategy/style.ts
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  tabsItem: {
    width: '25%',
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
  banner: {
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(20),
    height: G.mixin.rem(180),
    width: '100%',
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
