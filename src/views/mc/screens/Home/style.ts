/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = {
  main: StyleSheet.create({
    container: {
      backgroundColor: '#F0F0F0',
      marginBottom: G.mixin.rem(70),
      position: 'relative',
    },
    buttons: {
      marginTop: G.mixin.rem(15),
      height: G.mixin.rem(40),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    buttonItem: {
      height: G.mixin.rem(40),
      width: G.mixin.rem(170),
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
    bottomAd: {
      position: 'absolute',
      zIndex: 1,
      width: '100%',
      bottom: G.mixin.rem(70),
      left: 0,
    },
    bottomAdClose: {
      position: 'absolute',
      backgroundColor: '#dedede',
      top: G.mixin.rem(22),
      right: G.mixin.rem(16),
      width: G.mixin.rem(20),
      height: G.mixin.rem(20),
      borderTopRightRadius: G.mixin.rem(10),
      borderBottomLeftRadius: G.mixin.rem(10),
      zIndex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    }
  }),
  contents: StyleSheet.create({
    container: {
      paddingLeft: G.mixin.rem(14),
      paddingRight: G.mixin.rem(14)
    }
  }),
}

// 固定导出
export const GS = G;
export default { GS, LS };
