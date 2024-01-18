/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/Position/style.ts
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
  half: {
    width: '45%',
  },
  main: {
    paddingTop: G.mixin.rem(10),
    paddingBottom: G.mixin.rem(10),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: G.mixin.rem(1),
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
    justifyContent: 'flex-end',
  },
  infoBox: {
    flexDirection: 'row',
    height: G.mixin.rem(35),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  money: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 'auto',
    alignItems: 'center'
  },
  moneyText:{
    color: '#E3262A',
    fontSize: G.mixin.rem(16),
    fontWeight: '700',
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
    width: '60%',
    fontSize: G.mixin.rem(12),
    lineHeight: G.mixin.rem(28),
  },
  positionRight: {
    width: '40%',
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
    width: '100%',
    textAlign: 'right',
    color: '#94938F',
    fontSize: G.mixin.rem(12),
    lineHeight: G.mixin.rem(28),
  },
  buttonBox: {
    marginTop: G.mixin.rem(20),
    marginleft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
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
