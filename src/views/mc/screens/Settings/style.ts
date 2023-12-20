/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Settings/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1,
  },
  menusView: {
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    marginTop: G.mixin.rem(15),
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(10),
  },
  menuItem: {
    height: G.mixin.rem(51),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  buttonText: {
    color: '#E7CC8F',
    marginLeft: G.mixin.rem(5),
    fontSize: G.mixin.rem(15),
  },
  submitView: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(50),
    width: G.mixin.rem(320),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(20),
  },
  submitText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
})

// 固定导出
export const GS = G;
export default { GS, LS };
