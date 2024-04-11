/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/components/Tips/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  content: {
    position: 'relative',
    padding: G.mixin.rem(15),
    paddingTop: G.mixin.rem(20),
    paddingBottom: G.mixin.rem(20),
    backgroundColor: '#fff',
    borderRadius: G.mixin.rem(10),
    width: G.mixin.rem(300),
  },
  close: {
    position: 'absolute',
    top: G.mixin.rem(15),
    right: G.mixin.rem(15),
    width: G.mixin.rem(20),
    height: G.mixin.rem(20),
  },
  closeIcon: {
    width: G.mixin.rem(20),
    height: G.mixin.rem(20),
  },
  title:{
    width: '100%',
    textAlign: 'center',
    fontSize: G.mixin.rem(16),
    fontWeight: 'bold',
    color: '#2A2A2A'
  },
  prompt:{
    marginTop: G.mixin.rem(15),
    fontSize: G.mixin.rem(14),
    lineHeight: G.mixin.rem(20),
    color: '#2A2A2A'
  },
  actions: {
    flexDirection: 'row',
    marginTop: G.mixin.rem(20),
    width: '100%',
    justifyContent: 'space-between',
  },
  actionText: {
    fontSize: G.mixin.rem(14),
    color: '#2A2A2A'
  },
  button: {
    flex: 1,
    marginLeft: G.mixin.rem(5),
    marginRight: G.mixin.rem(5),
  },
  cancel: {
    backgroundColor: '#F5F5F5'
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
