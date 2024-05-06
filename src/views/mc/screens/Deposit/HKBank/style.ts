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
      paddingBottom:G.mixin.rem(30),
      marginBottom:G.mixin.rem(30),
      marginHorizontal: 'auto',
      backgroundColor:'#fff',
    },
    mainTitle:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(20),
      fontWeight: 'bold',
      marginTop:G.mixin.rem(25),
      marginBottom:G.mixin.rem(10),
    },
    title:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(18),
      fontWeight: 'bold',
      marginTop:G.mixin.rem(25),
      marginBottom:G.mixin.rem(10),
    },
    redTips:{
      color: '#E3262A',
      fontSize: G.mixin.rem(12),
      lineHeight:G.mixin.rem(17),
    },
    raw:{
      flexDirection: 'row',
    },
    itemBox:{
      borderRadius:G.mixin.rem(4),
      paddingLeft:G.mixin.rem(10),
      paddingRight:G.mixin.rem(10),
      paddingBottom:G.mixin.rem(10),
      paddingTop:G.mixin.rem(10),
      marginBottom:G.mixin.rem(10),
      backgroundColor:'#FAFAFA',
      width:'100%',
      height:'auto',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    item:{
      width:'80%',
    },
    copyIcon:{
      width:G.mixin.rem(18),
      height:G.mixin.rem(18),
    },
    itemTitle:{
      color: '#94938F',
      fontSize: G.mixin.rem(12),
      lineHeight:G.mixin.rem(20),
    },
    itemContent:{
      color: '#000000',
      fontSize: G.mixin.rem(14),
      lineHeight:G.mixin.rem(22),
    },
    itemTips:{
      color: '#E3262A',
      fontSize: G.mixin.rem(12),
      lineHeight:G.mixin.rem(20),
    },
    button:{
      marginTop:G.mixin.rem(20),
    },
    buttonTips:{
      color: '#E3262A',
      fontSize: G.mixin.rem(12),
      lineHeight:G.mixin.rem(22),
      marginTop:G.mixin.rem(15),
      textAlign:'center',
    },
    infoTitle:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(16),
      fontWeight: 'bold',
      marginTop:G.mixin.rem(20),
    },
    info:{
      color: '#646464',
      fontSize: G.mixin.rem(14),
      lineHeight:G.mixin.rem(22),
    },
  }),
}

// 固定导出
export const GS = G;
export default { GS, LS };
