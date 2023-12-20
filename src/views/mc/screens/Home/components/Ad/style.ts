/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Ad/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = {
  ad: StyleSheet.create({
    container: {
      height: G.mixin.rem(87),
      marginTop: G.mixin.rem(-15),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    item: {
      backgroundColor: '#fff',
      borderRadius: G.mixin.rem(15),
      height: G.mixin.rem(87),
      width: G.mixin.rem(170),
      paddingLeft: G.mixin.rem(15),
      paddingRight: G.mixin.rem(15),
      paddingTop: G.mixin.rem(10),
      paddingBottom: G.mixin.rem(10),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    itemImage: {
      width: G.mixin.rem(31),
      height: G.mixin.rem(50),
    },
    itemText: {
      width: G.mixin.rem(100),
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    itemTextTitle: {
      width: '100%',
      textAlign: 'center',
      fontSize: G.mixin.rem(12),
    },
    itemTextPrice: {
      marginTop: G.mixin.rem(2),
      width: '100%',
      fontSize: G.mixin.rem(23),
      fontWeight: '700',
      textAlign: 'center',
      color: '#EE0A24',
    },
    itemTextPriceUnit: {
      marginTop: G.mixin.rem(2),
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemTextPriceUnitText: {
      color: '#EE0A24',
      fontSize: G.mixin.rem(10),
    }
  }),
}

// 固定导出
export const GS = G;
export default { GS, LS };
