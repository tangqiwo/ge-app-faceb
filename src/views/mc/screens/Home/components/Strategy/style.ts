/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Strategy/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    marginBottom: G.mixin.rem(15),
    marginTop: G.mixin.rem(15),
    backgroundColor: 'white',
    borderRadius: G.mixin.rem(5),
    ...G.mixin.padding(14,14,14,14),
  },
  noPadding: {
    ...G.mixin.padding(0,0,0,0),
  },
  title: {
    marginBottom: G.mixin.rem(15),
    height: G.mixin.rem(20),
    borderLeftColor: '#FFC600',
    borderLeftWidth: G.mixin.rem(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    marginLeft: G.mixin.rem(5),
    fontWeight: '600',
    color: '#2A2A2A',
    fontSize: G.mixin.rem(15),
  },
  titleMore: {
    color: '#94938F',
    fontSize: G.mixin.rem(12),
  },
  personalView: {
    height: G.mixin.rem(80),
    paddingBottom: G.mixin.rem(10),
    marginBottom: G.mixin.rem(15),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
  },
  personalViewImage: {
    width: G.mixin.rem(55),
    height: G.mixin.rem(55),
  },
  personalUpdateTime: {
    marginTop: G.mixin.rem(10),
    color: '#2A2A2A',
    fontSize: G.mixin.rem(12),
  },
  personalName: {
    marginTop: G.mixin.rem(5),
    color: '#94938F',
    fontSize: G.mixin.rem(10),
  },
  personalCountdown: {
    marginLeft: 'auto',
    paddingLeft: G.mixin.rem(5),
  },
  personalViewText: {
    marginTop: G.mixin.rem(15),
    textAlign: 'right'
  },
  countdownView: {
    marginTop: G.mixin.rem(5),
    height: G.mixin.rem(20),
    minWidth: G.mixin.rem(105),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC600',
    borderTopLeftRadius: G.mixin.rem(15),
    borderBottomLeftRadius: G.mixin.rem(15),
  },
  // 进度条
  progressView: {
    marginTop: G.mixin.rem(15),
    marginBottom: G.mixin.rem(5),
    paddingBottom: G.mixin.rem(10),
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1,
    borderStyle: 'dashed'
  },
  progressViewText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressViewTextItem: {
    width: '20%',
    textAlign: 'center',
  },
  progressViewImage: {
    marginTop: G.mixin.rem(10),
    width: '100%',
    height: G.mixin.rem(10),
  },
  progressViewPriceText: {
    marginTop: G.mixin.rem(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prizeText: {
    color: '#E3262A',
    width: '20%',
    textAlign: 'center',
  },
  detailView: {
    backgroundColor: 'white',
    marginBottom: G.mixin.rem(15),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    paddingBottom: G.mixin.rem(14),
  },
  descText: {
    color: '#2A2A2A',
    fontSize: G.mixin.rem(14),
    lineHeight: G.mixin.rem(20),
    marginTop: G.mixin.rem(10),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
