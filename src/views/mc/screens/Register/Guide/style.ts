/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Register/Guide/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC600',
  },
  banner: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: G.mixin.rem(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contents: {
    width: G.mixin.rem(347),
    height: G.mixin.rem(400),
    borderRadius: G.mixin.rem(15),
    backgroundColor: '#FFFFFF',
    marginTop: G.mixin.rem(20),
    marginLeft: 'auto',
    marginRight: 'auto',
    ...G.mixin.padding(25, 20, 25, 20),
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleIcon: {
    width: G.mixin.rem(18),
    height: G.mixin.rem(14),
  },
  titleText: {
    fontSize: G.mixin.rem(18),
    color: '#2A2A2A',
    fontWeight: '600',
    marginLeft: G.mixin.rem(10),
  },
  ads: {
    width: '100%',
    height: G.mixin.rem(96),
    marginTop: G.mixin.rem(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ad: {
    justifyContent: 'space-between',
    width: G.mixin.rem(80),
    alignItems: 'center',
  },
  adIcon: {
    width: G.mixin.rem(55),
    height: G.mixin.rem(55),
  },
  adText: {
    fontSize: G.mixin.rem(12),
    color: '#2A2A2A',
    textAlign: 'center',
    lineHeight: G.mixin.rem(16),
  },
  submitView: {
    height: G.mixin.rem(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(50),
    marginTop: G.mixin.rem(20),
  },
  submitText: {
    fontSize: G.mixin.rem(15),
    color: '#2A2A2A',
  },
  login: {
    marginTop: G.mixin.rem(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  agreementText: {
    color: '#949494',
    fontSize: G.mixin.rem(14),
    marginLeft: G.mixin.rem(5),
  },
  agreementTextLink: {
    color: '#FFC600',
    fontSize: G.mixin.rem(14),
  },
})

// 固定导出
export const GS = G;
export default { GS, LS };
