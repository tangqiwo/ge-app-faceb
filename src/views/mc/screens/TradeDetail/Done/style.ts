/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/Done/style.ts
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
    padding: G.mixin.rem(16),
  },
  image: {
    width:'100%',
    height:G.mixin.rem(100),
    resizeMode:'contain',
  },
  main: {
    backgroundColor: '#F2F2F2',
    borderBottomLeftRadius:G.mixin.rem(5),
    borderBottomRightRadius:G.mixin.rem(5),
    width: '100%',
    height: 'auto',
  },
  date: {
    backgroundColor:'#2A2A2A',
    paddingHorizontal:G.mixin.rem(5),
    paddingVertical:G.mixin.rem(5),
    borderTopRightRadius:G.mixin.rem(20),
    borderBottomRightRadius:G.mixin.rem(20),
    marginTop:G.mixin.rem(16),
    flexDirection: 'row',
    width: G.mixin.rem(248),
  },
  dateText: {
    color: '#E7CC8F',
    fontSize: G.mixin.rem(10),
  },
  content: {
    padding: G.mixin.rem(16),
    paddingBottom: G.mixin.rem(0),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
  },
  item: {
    flexDirection: 'row',
    height: G.mixin.rem(32),
  },
  grey: {
    color: '#94938F',
  },
  button: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: G.mixin.rem(30),
  },
  buttonYellow: {
    height: G.mixin.rem(40),
    width: G.mixin.rem(160),
    backgroundColor: '#FFC600',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(20),
  },
  buttonBlack: {
    height: G.mixin.rem(40),
    width: G.mixin.rem(160),
    backgroundColor: '#2A2A2A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(30),
    color: '#fff',
  },
  buttonText : {
    fontSize: G.mixin.rem(15),
  },
  buttonTextYellow : {
    fontSize: G.mixin.rem(15),
    color: '#E7CC8F',
  },

  }
);

// 固定导出
export const GS = G;
export default { GS, LS };
