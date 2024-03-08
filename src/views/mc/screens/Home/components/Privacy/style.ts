/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Privacy/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    width: G.mixin.rem(335),
    marginTop: G.mixin.rem(15),
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(10),
    ...G.mixin.padding(20,20,0,20)
  },
  title: {
    paddingBottom: G.mixin.rem(10),
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: G.mixin.rem(1),
  },
  titleText: {
    width: '100%',
    fontSize: G.mixin.rem(18),
    color: '#333333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contents: {

  },
  contentText: {
    color: '#3F4044',
    lineHeight: G.mixin.rem(20),
    marginTop: G.mixin.rem(10),
  },
  actions: {
    height: G.mixin.rem(50),
    marginTop: G.mixin.rem(10),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#E5E5E5',
    borderTopWidth: G.mixin.rem(1),
  },
  actionItem: {
    width: '50%',
    height: '100%',
    flexdirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#E5E5E5',
    borderRightWidth: G.mixin.rem(1),
  },
  actionText: {
    fontSize  : G.mixin.rem(16),
    color: '#3F4044',
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
