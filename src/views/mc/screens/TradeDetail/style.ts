/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

export const LS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: G.mixin.rem(12),
    color: '#2A2A2A',
  },
  tabsVeiw: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginLeft: '10%',
    marginBottom: G.mixin.rem(10),
  },
  tabsItem: {
    width: '50%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  orderInfo: {
    height: G.mixin.rem(42),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  orderInfoText: {
    fontSize: G.mixin.rem(12),
    color: '#2A2A2A',
  },
  tabsItemActive: {
    borderBottomColor: '#FFC600',
    borderBottomWidth: 2,
  },
  tabsItemText:{
    fontSize: G.mixin.rem(15),
    color: '#646464',
  },
  tabsItemTextActive:{
    color: '#2A2A2A',
    fontWeight: '600',
  },
  pendingBox: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
  },
  pendingItem: {
    width: '49%',
    height: G.mixin.rem(75),
    borderRadius: G.mixin.rem(5),
    marginTop: G.mixin.rem(20),
    alignItems: 'center',
  },
  pendingText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: G.mixin.rem(15),
    fontSize: G.mixin.rem(15),
  },
  pendingIcon: {
    width: G.mixin.rem(12),
    height: G.mixin.rem(12),
    marginRight: G.mixin.rem(8),
  },
  pendingAmount: {
    fontSize: G.mixin.rem(21),
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: G.mixin.rem(5),
  },
  dropItem: {
    height: G.mixin.rem(54),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: G.mixin.rem(1),
    fontSize: G.mixin.rem(12),
  },
  dropMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    lignSelf: 'center',
    width: G.mixin.rem(120),
    height: G.mixin.rem(24),
    backgroundColor: '#EBEBEB',
    borderRadius: G.mixin.rem(50),
  },
  dropWireframe: {
    backgroundColor: '#fff',
    borderColor: '#D9D9D9',
    borderWidth: G.mixin.rem(1),
  },
  dropText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#94938F',
  },
  dropIcon: {
    width: G.mixin.rem(9),
    height: G.mixin.rem(6),
    marginRight: G.mixin.rem(12),
  },
  optionsItem: {
    height: G.mixin.rem(40),
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '5%',
    borderBottomColor: '#EBEBEB',
    fontSize: G.mixin.rem(12),
    color: '#2A2A2A',
  },
  optionsMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    lignSelf: 'center',
    width: '50%',
  },
  optionsNumber: {
    color: '#94938F',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: G.mixin.rem(100),
  },
  inputNumber: {
    borderWidth: 0,
    textAlign: 'center',
    borderBottomColor: '#94938F',
    borderBottomWidth: 1,
    width: G.mixin.rem(60),
    marginLeft: G.mixin.rem(20),
    marginRight: G.mixin.rem(20),
  },
  optionsText: {
    color: '#94938F',
    marginLeft: G.mixin.rem(20),
  },
  optionsIcon: {
    width: G.mixin.rem(15),
    height: G.mixin.rem(20),
  },
  refer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  frequency: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: G.mixin.rem(24),
    marginLeft: G.mixin.rem(5),
    borderRadius: G.mixin.rem(3),
    borderColor: '#AAAAAA',
    borderWidth: G.mixin.rem(1),
    fontSize: G.mixin.rem(10),
  },
  frequencyActive: {
    backgroundColor: '#2A2A2A',
    borderWidth: G.mixin.rem(0),
    marginLeft: G.mixin.rem(0),
  },
  frequencyActiveText: {
    color: '#E7CC8F',
    fontWeight: 'bold',
  },
  checkIcon: {
    width: G.mixin.rem(15),
    height: G.mixin.rem(15),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  submit: {
    width: '80%',
    height: G.mixin.rem(40),
    backgroundColor: '#2A2A2A',
    borderRadius: G.mixin.rem(50),
    marginHorizontal: '10%',
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#E7CC8F',
    fontSize: G.mixin.rem(15),
  },
  submitTips: {
    color: '#94938F',
    fontSize: G.mixin.rem(12),
    textAlign: 'center',
    marginBottom: G.mixin.rem(20),
  },
});

// 固定导出
export const GS = G;
export default { GS, LS };
