/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    paddingTop: G.mixin.rem(20),
    paddingBottom: G.mixin.rem(20),
  },
  loginImage: {
    width: '100%',
    height: G.mixin.rem(165),
  },
  loginImageContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontalHorizontal: G.mixin.rem(20),
    marginTop: G.mixin.rem(20),
    marginHorizontal: G.mixin.rem(20),
    paddingBottom: G.mixin.rem(15),
    borderBottomColor: '#fff',
    borderBottomWidth: G.mixin.rem(1),
  },
  loginLeftTitle : {
    fontSize: G.mixin.rem(15),
  },
  loginLeftNumber : {
    fontSize: G.mixin.rem(23),
    lineHeight: G.mixin.rem(36),
    fontWeight: '700',
  },
  loginRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginRightTitle: {
    fontSize: G.mixin.rem(12),
    color: '#646464',
    lineHeight: G.mixin.rem(18),
  },
  loginRightNumber: {
    fontSize: G.mixin.rem(12),
    color: '#2a2a2a',
    lineHeight: G.mixin.rem(18),
  },
  tabsVeiw: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  tabsItem: {
    width: '33.3333%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
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
  loginBox: {
    width: G.mixin.rem(295),
    height: G.mixin.rem(226),
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(10),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14)
  },
  loginTitle: {
    fontSize: G.mixin.rem(20),
    width: '100%',
    textAlign: 'center',
    marginTop: G.mixin.rem(30),
    fontWeight: '700',
  },
  input: {
    width: '100%',
    marginTop: G.mixin.rem(15),
    height: G.mixin.rem(40),
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: G.mixin.rem(50),
    paddingLeft: G.mixin.rem(15),
    paddingRight: G.mixin.rem(15),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputError: {
    marginTop: G.mixin.rem(5),
    color: G.var.colors.red[500],
    marginLeft: G.mixin.rem(15),
    height: G.mixin.rem(20),
    fontSize: G.mixin.rem(10),
  },
  inputIcon: {
    width: G.mixin.rem(15),
    height: G.mixin.rem(18),
  },
  inputText: {
    borderWidth: 0,
    width: G.mixin.rem(130),
    marginLeft: G.mixin.rem(10),
  },
  submit: {
    marginTop: G.mixin.rem(15),
    backgroundColor: '#2A2A2A'
  },
  submitText: {
    color: '#FFC600',
    fontWeight: '700',
  },
  forgetPassword: {
    marginTop: G.mixin.rem(15),
    color: '#2A2A2A',
    fontSize: G.mixin.rem(14),
    textAlign: 'center',
    width: '100%',
  },
  close: {
    marginTop: G.mixin.rem(20),
    width: G.mixin.rem(28),
    height: G.mixin.rem(28),
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontalHorizontal: G.mixin.rem(20),
    marginTop: G.mixin.rem(15),
    marginHorizontal: G.mixin.rem(20),
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
})

// 固定导出
export const GS = G;
export default { GS, LS };
