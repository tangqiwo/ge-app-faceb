/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/RegisterManual/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    backgroundColor: '#FFFFFF',
    marginTop: G.mixin.rem(15),
    borderRadius: G.mixin.rem(10),
  },
  title: {
    height: G.mixin.rem(42),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 1
  },
  titleIcon: {
    width: G.mixin.rem(28),
    height: G.mixin.rem(14),
  },
  titleText: {
    fontWeight: '600',
    fontSize: G.mixin.rem(15),
    marginLeft: G.mixin.rem(8),
  },
  content: {
    height: G.mixin.rem(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentItem: {
    width: "25%",
    height: G.mixin.rem(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentItemIcon: {
    width: G.mixin.rem(40),
    height: G.mixin.rem(40),
    marginBottom: G.mixin.rem(5)
  },
  contentItemText: {
    textAlign: 'center',
    marginTop: G.mixin.rem(4),
  },
  button: {
    marginTop: G.mixin.rem(6),
    width: G.mixin.rem(60),
    height: G.mixin.rem(18),
    // 灰色
    borderRadius: G.mixin.rem(10),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: G.mixin.rem(10),
  },
  contentTextContent: {
    height: G.mixin.rem(100),
  },
  tradeContent: {
    width: G.mixin.rem(295),
    height: G.mixin.rem(320),
    borderRadius: G.mixin.rem(10),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeTitle: {
    fontSize: G.mixin.rem(20),
    fontWeight: '600',
  },
  tradeImage: {
    width: G.mixin.rem(167),
    height: G.mixin.rem(134),
    marginTop: G.mixin.rem(10),
    marginBottom: G.mixin.rem(10),
  },
  tradeText: {
    mrginTop: G.mixin.rem(5),
    fontSize: G.mixin.rem(15),
  },
  tradeButton: {
    width: G.mixin.rem(200),
    height: G.mixin.rem(40),
    marginTop: G.mixin.rem(20),
  },
  close: {
    width: G.mixin.rem(35),
    height: G.mixin.rem(35),
    marginTop: G.mixin.rem(20),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
