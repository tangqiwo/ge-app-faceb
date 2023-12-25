/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Subsidy/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    marginTop: G.mixin.rem(15),
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(5),
  },
  title: {
    borderTopLeftRadius: G.mixin.rem(5),
    borderTopRightRadius: G.mixin.rem(5),
    height: G.mixin.rem(42),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
  },
  titleText: {
    fontSize: G.mixin.rem(15),
    fontWeight: '600',
    color: '#E7CC8F',
  },
  countdown: {
    height: G.mixin.rem(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    paddingLeft: G.mixin.rem(10),
    paddingRight: G.mixin.rem(10),
    width: '100%',
  },
  countdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: G.mixin.rem(10)
  },
  countdownIcon: {
    width: G.mixin.rem(17),
    height: G.mixin.rem(17)
  },
  countdownText: {
    fontSize: G.mixin.rem(15),
    fontWeight: '600',
    marginLeft: G.mixin.rem(5)
  },
  textCommon: {
    marginRight: G.mixin.rem(2),
  },
  textBG: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#636363',
    paddingLeft: G.mixin.rem(2),
    paddingRight: G.mixin.rem(2),
    borderRadius: G.mixin.rem(2),
    marginRight: G.mixin.rem(2),
  },
  detail: {
    color: '#646464',
    marginLeft: 'auto'
  },
  textNumber: {
    color: 'white'
  },
  prizeView: {
    height: G.mixin.rem(120),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  prizeItem: {
    width: G.mixin.rem(70),
    height: G.mixin.rem(95),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContnet: {
    height: G.mixin.rem(60),
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  prizeItemText: {
    fontSize: G.mixin.rem(10),
    width:'100%',
    textAlign:'center',
  },
  prizeItemTextMoney: {
    fontSize: G.mixin.rem(14),
    fontWeight: '600',
  },
  button: {
    marginTop: G.mixin.rem(10),
    width: G.mixin.rem(50),
    height: G.mixin.rem(18),
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(10),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: G.mixin.rem(10),
  },
  bannerView: {
    height: G.mixin.rem(90),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bannerItem: {
    width: G.mixin.rem(153),
    height: G.mixin.rem(75),
    justifyContent: 'center',
  },
  bannerItemTextBox: {
    marginLeft: 'auto',
    marginTop: G.mixin.rem(15),
    width: G.mixin.rem(70),
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  bannerItemText: {
    marginBottom: G.mixin.rem(5),
    textAlign: 'center',
    fontSize: G.mixin.rem(10),
  },
  getPrize: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6F4502',
    ...G.mixin.padding(2,2,2,2),
    borderRadius: G.mixin.rem(10),
  },
  popupContent: {
    width: G.mixin.rem(295),
    height: G.mixin.rem(360),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: G.mixin.rem(30),
    paddingBottom: G.mixin.rem(30),
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(8),
  },
  levelTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: G.mixin.rem(15),
    fontWeight: '600',
  },
  levelImage: {
    width: G.mixin.rem(138),
    height: G.mixin.rem(150),
    marginTop: G.mixin.rem(22),
  },
  levelText: {
    width: '100%',
    textAlign: 'center',
    marginTop: G.mixin.rem(22),
    fontSize: G.mixin.rem(15),
  },
  levelButton: {
    marginTop: G.mixin.rem(22),
    width: G.mixin.rem(220),
    height: G.mixin.rem(40),
  },
  iconClose: {
    width: G.mixin.rem(35),
    height: G.mixin.rem(35),
    marginTop: G.mixin.rem(22),
  },
  processTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: G.mixin.rem(12),
    marginBottom: G.mixin.rem(12),
  },
  processTitleText: {
    fontSize: G.mixin.rem(15),
    fontWeight: '600',
  },
  processContentView: {
    paddingLeft: G.mixin.rem(10),
    paddingRight: G.mixin.rem(10),
    paddingBottom: G.mixin.rem(10),
    marginBottom: G.mixin.rem(10),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  processView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  processBarView: {
    width: '100%',
    height: G.mixin.rem(10),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: G.mixin.rem(15),
    marginBottom: G.mixin.rem(15),
    marginLeft: G.mixin.rem(10),
    marginRight: G.mixin.rem(10),
  },
  processBarRate: {
    backgroundColor: '#FEC502',
    height: G.mixin.rem(20),
    width: G.mixin.rem(40),
    borderRadius: G.mixin.rem(10),
    borderColor: 'white',
    broderWidth: 2,
    marginRight: G.mixin.rem(-20),
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processBarRateBG: {
    backgroundColor: '#EBEBEB',
    height: G.mixin.rem(10),
    borderRadius: G.mixin.rem(10),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
