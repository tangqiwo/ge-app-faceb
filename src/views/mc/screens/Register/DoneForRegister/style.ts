/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/DoneForRegister/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  header: {
    height: G.mixin.rem(208.5),
  },
  titleView: {
    marginTop: G.mixin.rem(20),
    width: '100%',
    flexDirection: 'row',
    height: G.mixin.rem(50),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  titleText: {
    fontSize: G.mixin.rem(18),
    color: '#2A2A2A',
    fontWeight: '600',
  },
  goBack: {
    position: 'absolute',
    left: G.mixin.rem(4),
    ...G.mixin.padding(10, 10, 10, 10),
  },
  goBackIcon: {
    fontSize: G.mixin.rem(18),
    color: '#2A2A2A',
  },
  welcome: {
    width: '100%',
    textAlign: 'center',
    color: '#2A2A2A',
  },
  formView: {
    marginTop: G.mixin.rem(-90),
    backgroundColor: '#FFFFFF',
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    borderRadius: G.mixin.rem(5),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    paddingTop: G.mixin.rem(20),
    paddingBottom: G.mixin.rem(20),
  },
  tabs: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    marginBottom: G.mixin.rem(10),
  },
  tabsItem: {
    width: '50%',
    height: G.mixin.rem(30),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsItemText: {
    fontSize: G.mixin.rem(15),
    color: '#646464',
  },
  input: {
    width: '100%',
    height: G.mixin.rem(40),
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: G.mixin.rem(50),
    paddingLeft: G.mixin.rem(15),
    paddingRight: G.mixin.rem(15),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: G.mixin.rem(20)
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
  validateCode: {
    width: G.mixin.rem(80),
    height: G.mixin.rem(24),
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(50),
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selector: {
    width: G.mixin.rem(135),
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  submitView: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(50),
  },
  submitText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
  actionsView: {
    marginTop: G.mixin.rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttonText: {
    marginLeft: G.mixin.rem(5),
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
  tips: {
    marginTop: G.mixin.rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexWrap: 'wrap',
  },
  tipImage: {
    width: G.mixin.rem(30),
    height: G.mixin.rem(30),
  },
  tipsText: {
    fontSize: G.mixin.rem(15),
    width: '100%',
    color: '#00A010',
    marginTop: G.mixin.rem(10),
    textAlign: 'center',
  },
  content: {
    marginTop: G.mixin.rem(10),
    backgroundColor: '#2A2A2A',
    borderRadius: G.mixin.rem(10),
    height: G.mixin.rem(105),
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: G.mixin.rem(35),
    borderBottomColor: '#E7CC8F',
    borderBottomWidth: 1,
  },
  contentItemText: {
    fontSize: G.mixin.rem(12),
    color: '#E7CC8F',
    textAlign: 'right',
  },
  lableView: {
    width: G.mixin.rem(105),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  copyView: {
    width: G.mixin.rem(200),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    height: G.mixin.rem(35),
    borderLeftColor: '#E7CC8F',
    borderLeftWidth: 1,
  },
  copyImage: {
    width: G.mixin.rem(12),
    height: G.mixin.rem(13),
  },
  adView: {
    marginTop: G.mixin.rem(15),
    marginBottom: G.mixin.rem(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  adText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
    textAlign: 'center',
    width: '100%',
    marginTop: G.mixin.rem(5),
  },
  adText2: {
    color: G.var.colors.red[500],
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };