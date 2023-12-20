/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-29 16:54:46
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Popup/style.ts
 * @Description:
 */
import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


export const LS = {

  frame: StyleSheet.create({
    warpper: {
      backgroundColor: 'white',
      width: '100%',
      shadowColor: 'black',
      borderTopLeftRadius:G.mixin.rem(20),
      borderTopRightRadius:G.mixin.rem(20),
      shadowOffset: {
        width: 0,
        height: 0
      },
      flex: 1,
    },
    contents: {
      flex: 1,
    },
    actions: {
      height: 60,
      borderTopWidth: 1,
      borderTopColor: G.var.colors.gray[200],
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    actionHide: {
      borderWidth: 0,
      opacity: 0
    },
    submitFont: {
      fontWeight: "600",
      letterSpacing: 4,
      color: G.var.colors.white,
      fontSize: 16
    },
    cancelFont: {
      color: G.var.colors.secondary[400],
      fontSize: 16
    }
  }),
  header: StyleSheet.create({
    wrapper: {
      paddingLeft: 15,
      paddingRight: 15,
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      height: 45,
      borderBottomWidth: 1,
      borderBottomColor: G.var.colors.gray[200]
    },
    empty: {
      width: 20
    },
    icon: {
      width: 20,
      fontSize: 18,
      color: G.var.colors.secondary[400]
    }
  })

}

// 固定导出
export const GS = G;
export default { GS, LS };
