/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Quotes/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
  },
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
  tabsVeiw: {
    height: G.mixin.rem(40),
    marginTop: G.mixin.rem(20),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabsItem: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: G.mixin.rem(10),
  },
  tabsItemActive: {
    borderBottomColor: '#FFC600',
    borderBottomWidth: 2,
  },
  tabsItemText:{
    fontSize: G.mixin.rem(14),
    color: '#646464',
  },
  tabsItemTextActive:{
    fontSize: G.mixin.rem(16),
    color: '#2A2A2A',
    fontWeight: '600',
  },
  headerTextActive: {
    color: '#2A2A2A',
  },
  titleView: {
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    height: G.mixin.rem(42),
    backgroundColor: '#EBEBEB',
    flexDirection: 'row'
  },
  titleText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
  column1: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  column2: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentView: {
    height: G.mixin.rem(93),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    borderBottomWidth: 1,
    borderColor: '#EBEBEB',
  },
  contentItemView: {
    height: G.mixin.rem(60),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  contentItemViewText1: {
    width: '100%',
    textAlign: 'center',
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
    height: G.mixin.rem(36),
    lineHeight: G.mixin.rem(36),
  },
  contentItemViewText2: {
    width: '100%',
    textAlign: 'center',
    fontSize: G.mixin.rem(12),
    color: '#94938F',
    height: G.mixin.rem(22),
    lineHeight: G.mixin.rem(22),
  },
  contentItemViewText3: {
    width: '100%',
    textAlign: 'center',
    fontSize: G.mixin.rem(15),
    height: G.mixin.rem(36),
    lineHeight: G.mixin.rem(36),
    color: '#fff',
  },
  contentItemViewBack: {
    height: G.mixin.rem(36),
    width: G.mixin.rem(100),
    borderRadius: G.mixin.rem(2),
  },
})

// 固定导出
export const GS = G;
export default { GS, LS };
