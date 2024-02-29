/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/My/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  header: {
    height: G.mixin.rem(208.5),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14)
  },
  textBox: {
    marginTop: G.mixin.rem(10),
    height: G.mixin.rem(60),
    marginLeft: G.mixin.rem(10),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: G.mixin.rem(270),
  },
  settingsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  settingIcon: {
    fontSize: G.mixin.rem(18),
    marginLeft: G.mixin.rem(8),
  },
  continueImage: {
    width: G.mixin.rem(347),
    height: G.mixin.rem(150),
    marginTop: G.mixin.rem(-60),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  unlogin: {
    fontSize: G.mixin.rem(16),
    color: '#2A2A2A',
    fontWeight: '600'
  },
  tips: {
    width: G.mixin.rem(80),
    height: G.mixin.rem(18),
    marginLeft: G.mixin.rem(5),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infosView: {
    height: G.mixin.rem(170),
    marginTop: G.mixin.rem(-60),
    backgroundColor: '#FFFFFF',
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    borderRadius: G.mixin.rem(5),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    paddingTop: G.mixin.rem(20),
    paddingBottom: G.mixin.rem(20),
  },
  moneyTitle: {
    marginTop: G.mixin.rem(10),
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
  moneyDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: G.mixin.rem(40),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    marginTop: G.mixin.rem(10),
  },
  moneyDetailText: {
    fontSize: G.mixin.rem(23),
    fontWeight: '700',
  },
  buttons: {
    marginTop: G.mixin.rem(15),
    height: G.mixin.rem(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  buttonItem: {
    height: G.mixin.rem(40),
    width: G.mixin.rem(140),
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(30),
  },
  buttonIcon: {
    height: G.mixin.rem(18),
    width: G.mixin.rem(16)
  },
  buttonText: {
    color: '#E7CC8F',
    marginLeft: G.mixin.rem(5),
    fontSize: G.mixin.rem(15),
  },
  adView: {
    marginTop: G.mixin.rem(15),
    backgroundColor: '#2A2A2A',
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    flexDirection: 'row',
    alignItems: 'center',
    height: G.mixin.rem(40),
    borderRadius: G.mixin.rem(5),
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
  },
  adViewText: {
    marginLeft: G.mixin.rem(5),
    color: '#E7CC8F',
    fontSize: G.mixin.rem(15),
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
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
