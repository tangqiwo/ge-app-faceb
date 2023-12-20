/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/AboutUs/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconShadow:{
    width: G.mixin.rem(100),
    height: G.mixin.rem(100),
    backgroundColor: '#fff',
    borderRadius: G.mixin.rem(10),
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(20),
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: G.mixin.rem(69),
    height: G.mixin.rem(76),
  },
  versionText: {
    fontSize: G.mixin.rem(10),
    color: '#646464',
    width: '100%',
    textAlign: 'center',
  },
  content: {
    marginTop: G.mixin.rem(20),
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(10),
    width: G.mixin.rem(347),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: G.mixin.rem(75),
    ...G.mixin.padding(15,15,15,15)
  },
  title: {
    borderLeftColor: '#FFC600',
    borderLeftWidth: G.mixin.rem(5),
    paddingLeft: G.mixin.rem(10),
  },
  titleText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
    fontWeight: '600',
  },
  contentText: {
    fontSize  : G.mixin.rem(12),
    color     : '#2A2A2A',
    lineHeight: G.mixin.rem(22),
    marginTop : G.mixin.rem(15),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
