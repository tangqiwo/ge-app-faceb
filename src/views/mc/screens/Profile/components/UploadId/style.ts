/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Profile/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    paddingLeft: G.mixin.rem(15),
    paddingRight: G.mixin.rem(15),
    paddingTop: G.mixin.rem(10),
    paddingBottom: G.mixin.rem(10),
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: G.mixin.rem(16),
    color: '#c09d55',
    fontWeight: 'bold',
  },
  desc: {
    marginTop: G.mixin.rem(10),
    fontSize: G.mixin.rem(12),
    color: '#7f7f7f'
  },
  imageBox: {
    alignItems: 'center',
    marginTop: G.mixin.rem(20),
    paddingTop: G.mixin.rem(20),
    borderTopColor: '#ebebeb',
    borderTopWidth: G.mixin.rem(1),
  },
  image: {
    marginBottom: G.mixin.rem(20),
    width: G.mixin.rem(192),
    height: G.mixin.rem(160),
  },
  demo: {
    width: G.mixin.rem(335),
    height: G.mixin.rem(128),
  },
  button: {
    marginTop: G.mixin.rem(20),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
