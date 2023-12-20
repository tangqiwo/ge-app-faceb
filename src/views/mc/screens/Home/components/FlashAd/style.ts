/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/FlashAd/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS =StyleSheet.create({
  container: {
    width: G.mixin.rem(320),
    height: G.mixin.rem(420),
  },
  countdownView: {
    marginTop: G.mixin.rem(64),
    paddingLeft: G.mixin.rem(34),
    height: G.mixin.rem(24),
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  countdownViewItem: {
    marginRight: G.mixin.rem(25),
    width: G.mixin.rem(24),
    height: G.mixin.rem(24),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownViewText: {
    color: '#7E5200',
    fontSize: G.mixin.rem(16),
  },
  adPic: {
    width: G.mixin.rem(288),
    height: G.mixin.rem(167),
    marginTop: G.mixin.rem(35),
    marginLeft: G.mixin.rem(16),
    borderRadius: G.mixin.rem(5),
  },
  adDesc: {
    marginTop: G.mixin.rem(10),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    height: G.mixin.rem(24),
  },
  adDescText: {
    fontSize: G.mixin.rem(16),
    color: '#7E5200',
  },
  button: {
    width: G.mixin.rem(265),
    height: G.mixin.rem(74),
    marginLeft: G.mixin.rem(23.5),
  },
  close: {
    marginTop: G.mixin.rem(20),
    width: G.mixin.rem(28),
    height: G.mixin.rem(28),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
