/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Update/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg:{
    height: G.mixin.rem(400),
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'flex-end',
  },
  content: {
    height: G.mixin.rem(200),
    paddingLeft: G.mixin.rem(40),
  },
  contentText: {
    lineHeight: G.mixin.rem(25),
    color: '#646464'
  },
  btn: {
    flexDirection: 'row',
    width: G.mixin.rem(143),
    marginLeft: 20,
    marginRight: G.mixin.rem(40),
    fontWeight: '600',
  },
  title: {
    marginBottom: G.mixin.rem(20),
    fontSize: G.mixin.rem(22),
    marginLeft: G.mixin.rem(40),
    fontWeight: '600',
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
