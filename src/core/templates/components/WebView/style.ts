/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-03-12 16:04:35
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/WebView/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

export const LS = {
  error: StyleSheet.create({
    content: {
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    contentBox: {
      borderRadius: 20,
      width: G.mixin.rem(300),
      height: G.mixin.rem(560),
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      ...G.mixin.padding(0, 10, 0, 10),
    },
    icon: {
      marginTop: G.mixin.rem(40),
      width: G.mixin.rem(110),
      height: G.mixin.rem(100)
    },
    title: {
      width: '100%',
      textAlign: 'center',
      marginTop: G.mixin.rem(40),
      marginBottom: G.mixin.rem(10),
      fontSize: 20,
      fontWeight: '600',
      color: G.var.colors.white
    },
    errorText:{
      width: '100%',
      textAlign: 'center',
      color: G.var.colors.white,
      marginTop: 5
    },
    errorLink: {
      width: '100%',
      textAlign: 'center',
      color: G.var.colors.white,
      textDecorationLine: 'underline',
      marginTop: G.mixin.rem(20),
    }
  })
}

// 固定导出
export const GS = G;
export default { GS, LS };
