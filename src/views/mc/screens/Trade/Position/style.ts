/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/Placing/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: { 
    marginTop: G.mixin.rem(20),
  },
  title: {
    fontSize: G.mixin.rem(16),
    lineHeight: G.mixin.rem(28),
  },
  grey: {
    color: '#94938F',
    fontSize: G.mixin.rem(12),
    lineHeight: G.mixin.rem(28),
  },
  order: {
    color: '#94938F',
    fontSize: G.mixin.rem(12),
    marginLeft: G.mixin.rem(15),
    lineHeight: G.mixin.rem(28),
  },
  variety: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBox: {
    width: '45%',
    flexDirection: 'row',
    lineHeight: G.mixin.rem(28),
  },
  info: {
    fontSize: G.mixin.rem(12),
    lineHeight: G.mixin.rem(28),
  },
  infoRed: {
    fontSize: G.mixin.rem(12),
    lineHeight: G.mixin.rem(28),
    color:'#E3262A',
  },
  arrow: {
    lineHeight: G.mixin.rem(28),
    marginHorizontal: G.mixin.rem(5),
  },
  positionLeft: {
    width: '45%',
    fontSize: G.mixin.rem(12),
    lineHeight: G.mixin.rem(28),
  },
  positionRight: {
    width: '55%',
    position: 'relative',
  },
  mark: {
    position: 'absolute',
    top: -G.mixin.rem(10),
    right: 0,
    fontSize: G.mixin.rem(24),
    color: '#E3262A',
  },
  positionDate: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: '#94938F',
    fontSize: G.mixin.rem(12),
  },
  buttonBox: {
    marginTop: G.mixin.rem(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonYellow: {
    height: G.mixin.rem(30),
    width: G.mixin.rem(100),
    backgroundColor: '#FFC600',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(30),
  },
  buttonBlack: {
    height: G.mixin.rem(30),
    width: G.mixin.rem(100),
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(30),
    color: '#fff',
  },
  buttonWhite: {
    height: G.mixin.rem(30),
    width: G.mixin.rem(100),
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(30),
    borderWidth: G.mixin.rem(1),
    borderColor: '#94938F',
  },
  buttonText : {
    fontSize: G.mixin.rem(12),
  },
  buttonTextYellow : {
    fontSize: G.mixin.rem(12),
    color: '#E7CC8F',
  },
  }
);

// 固定导出
export const GS = G;
export default { GS, LS };
