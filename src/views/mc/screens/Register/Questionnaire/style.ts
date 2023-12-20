/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Questionnaire/style.ts
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
    color: '#EE0A24',
  },
  formScorllViewBox: {
    marginTop: G.mixin.rem(-90),
    backgroundColor: '#fff',
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    marginLeft: G.mixin.rem(14),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formScorllView: {
    backgroundColor: '#FFFFFF',
    borderRadius: G.mixin.rem(5),
    paddingTop: G.mixin.rem(20),
  },
  scorllContent: {
    paddingBottom: G.mixin.rem(20),
  },
  questionsTitleView: {
    marginTop: G.mixin.rem(15),
    borderLeftColor: '#FFC600',
    borderLeftWidth: G.mixin.rem(4),
    paddingLeft: G.mixin.rem(10),
  },
  questionsTitleText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
    fontWeight: '600',
  },
  questionsView: {
    marginTop: G.mixin.rem(15),
    paddingBottom: G.mixin.rem(15),
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: G.mixin.rem(1),
  },
  qText: {
    fontSize: G.mixin.rem(12),
    color: '#2A2A2A',
  },
  aView:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  aItem: {
    width: G.mixin.rem(150),
    paddingLeft: G.mixin.rem(20),
    paddingRight: G.mixin.rem(20),
    paddingTop: G.mixin.rem(7),
    paddingBottom: G.mixin.rem(7),
    marginTop: G.mixin.rem(10),
    backgroundColor: '#D9D9D9',
    borderRadius: G.mixin.rem(5),
  },
  submitView: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(50),
    position: 'absolute',
    left: G.mixin.rem(14),
    bottom: G.mixin.rem(30),
    width: '100%',
  },
  submitText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
  banner: {
    marginLeft: G.mixin.rem(14),
    marginRight: G.mixin.rem(14),
    marginTop: G.mixin.rem(20),
    height: G.mixin.rem(195),
    width: G.mixin.rem(347),
    borderRadius: G.mixin.rem(5),
  },
  rateView: {
    height: G.mixin.rem(5),
    position: 'absolute',
    bottom: G.mixin.rem(15),
    left: G.mixin.rem(14),
    width: G.mixin.rem(260),
    backgroundColor: '#D9D9D9',
    borderRadius: G.mixin.rem(5),
  },
  rate: {
    height: G.mixin.rem(5),
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(5),
    width: '50%'
  },
  rateText: {
    width: G.mixin.rem(50),
    fontSize: G.mixin.rem(10),
    color: '#2A2A2A',
    position: 'absolute',
    right: G.mixin.rem(14),
    bottom: G.mixin.rem(12),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
