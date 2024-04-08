/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = {
  main: StyleSheet.create({
    contenBox:{
      paddingLeft:G.mixin.rem(15),
      paddingRight:G.mixin.rem(15),
      paddingTop:G.mixin.rem(30),
      paddingBottom:G.mixin.rem(5),
      marginHorizontal: 'auto',
      backgroundColor:'#fff'
    },
    declare:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(18),
      fontWeight: 'bold',
      marginBottom:G.mixin.rem(10),
    },
    declareConetnt:{
      color: '#94938F',
      fontSize:G.mixin.rem(12),
      lineHeight:G.mixin.rem(17),
    },
    itemBox:{
      paddingTop:G.mixin.rem(15),
      paddingBottom:G.mixin.rem(20),
    },
    item:{
      height:G.mixin.rem(74),
      paddingLeft:G.mixin.rem(12),
      paddingRight:G.mixin.rem(12),
      paddingTop:G.mixin.rem(5),
      paddingBottom:G.mixin.rem(5),
      marginTop:G.mixin.rem(6),
      marginBottom:G.mixin.rem(6),
      borderRadius:G.mixin.rem(10),
      borderColor:'#EBEBEB',
      borderWidth:G.mixin.rem(1),
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    leftIcon:{
      height:G.mixin.rem(36),
      width:G.mixin.rem(36),
    },
    middleBox:{
      width:'75%',
      paddingLeft:G.mixin.rem(6),
    },
    middle:{
      flexDirection: 'row',
    },
    middleTitle:{
      color: '#000000',
      fontSize: G.mixin.rem(16),
      fontWeight: '500',
      marginBottom:G.mixin.rem(6),
    },
    middleTips:{
      color: '#94938F',
      fontSize: G.mixin.rem(14),
    },
    recommend:{
      height:G.mixin.rem(16),
      width:G.mixin.rem(36),
      marginLeft:G.mixin.rem(5),
    },
    rightIcon:{
      height:G.mixin.rem(18),
      width:G.mixin.rem(18),
    },
    prompt:{
      color: '#646464',
      fontSize: G.mixin.rem(14),
      lineHeight:G.mixin.rem(19),
    },
    tips:{
      color: '#E3262A',
      fontSize: G.mixin.rem(14),
      lineHeight:G.mixin.rem(19),
    }
  }),
}

// 固定导出
export const GS = G;
export default { GS, LS };
