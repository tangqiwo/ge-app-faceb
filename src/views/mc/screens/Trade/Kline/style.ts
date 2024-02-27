/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/Kline/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121e33'
  },
  safeView: {
    flex: 1,
  },
  header:{
    height: G.mixin.rem(44),
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: G.mixin.rem(14),
    flexWrap: 'nowrap',
    flexDirection: 'row',
  },
  headerTitleViwe: {
    marginLeft: G.mixin.rem(10),
  },
  headerTitleViewText: {
    color: '#c8d4e8',
    fontSize: G.mixin.rem(16),
    fontWeight: 'bold',
  },
  arrowBack: {
    color: '#c8d4e8',
  },
  infos: {
    height: G.mixin.rem(70),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceNow: {
    width: '50%',
    height: '100%'
  },
  itemTextTitle: {
    width: '100%',
    textAlign: 'center',
    fontSize: G.mixin.rem(12),
  },
  itemTextPrice: {
    marginTop: G.mixin.rem(2),
    width: '100%',
    fontSize: G.mixin.rem(26),
    fontWeight: '800',
    textAlign: 'left',
    color: '#EE0A24',
  },
  itemTextPriceUnit: {
    marginTop: G.mixin.rem(2),
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTextPriceUnitText: {
    marginTop: G.mixin.rem(5),
    fontSize: G.mixin.rem(12),
    fontWeight: '600',
  },
  priceYestoday: {
    width: '50%',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceYestodayItem: {
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    marginTop: G.mixin.rem(12),
  },
  priceYestodayItemText: {
    color: '#75859d',
  },
  footer: {
    height: G.mixin.rem(50),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
  },
  actionBtn: {
    width: G.mixin.rem(160),
    height: G.mixin.rem(36),
    borderRadius: G.mixin.rem(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09ae91'
  },
  actionBtnText: {
    color: '#fff',
    fontSize: G.mixin.rem(18),
    fontWeight: 'bold',
  },
  timeFrame: {
    height: G.mixin.rem(36),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: G.mixin.rem(4),
    paddingRight: G.mixin.rem(14),
    gap: G.mixin.rem(10),
  },
  timeFrameItem: {
    paddingLeft: G.mixin.rem(10),
    paddingRight: G.mixin.rem(10),
    height: G.mixin.rem(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeFrameActive: {
    borderBottomColor: '#2584ff',
    borderBottomWidth: G.mixin.rem(2),
  },
  timeFrameItemText: {
    color: '#798ba2',
    fontWeight: '600',
  },
  timeFrameItemTextActive: {
    color: '#2584ff',
  }
});

// 固定导出
export const GS = G;
export default { GS, LS };
