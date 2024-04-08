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
      paddingBottom:G.mixin.rem(30),
      marginHorizontal: 'auto',
      backgroundColor:'#fff'
    },
    declare:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(18),
      fontWeight: 'bold',
      marginBottom:G.mixin.rem(10),
    },
    item:{
      width:'100%',
      height:G.mixin.rem(74),
      paddingLeft:G.mixin.rem(12),
      paddingRight:G.mixin.rem(12),
      paddingTop:G.mixin.rem(5),
      paddingBottom:G.mixin.rem(5),
      marginTop:G.mixin.rem(6),
      marginBottom:G.mixin.rem(25),
      borderRadius:G.mixin.rem(10),
      backgroundColor:'#F3FEFF',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    leftIcon:{
      height:G.mixin.rem(36),
      width:G.mixin.rem(36),
    },
    middleBox:{
      width:'80%',
      paddingLeft:G.mixin.rem(6),
    },
    middleTitle:{
      color: '#000000',
      fontSize: G.mixin.rem(16),
      fontWeight: '500',
      marginBottom:G.mixin.rem(6),
    },
    middleTips:{
      color: '#94938F',
      fontSize: G.mixin.rem(12),
    },
    money:{
      flexDirection: 'row',
      marginBottom:G.mixin.rem(10),
    },
    moneyItem:{
      borderRadius:G.mixin.rem(4),
      paddingLeft:G.mixin.rem(6),
      paddingRight:G.mixin.rem(6),
      marginRight:G.mixin.rem(6),
      backgroundColor:'#F5F5F5',
      height:G.mixin.rem(20),
    },
    moneyText:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(12),
      lineHeight:G.mixin.rem(20),
    },
    inputMoney:{
      height:G.mixin.rem(50),
      lineHeight:G.mixin.rem(50),
      borderRadius:G.mixin.rem(4),
      paddingLeft:G.mixin.rem(15),
      paddingRight:G.mixin.rem(15),
      backgroundColor:'#F5F5F5',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom:G.mixin.rem(15),
    },
    input:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(16),
      justifyContent: 'center'
    },
    inputRMB:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(18),
      lineHeight:G.mixin.rem(50),
      fontWeight:'700',
    },
    tips:{
      color: '#94938F',
      fontSize: G.mixin.rem(12),
      lineHeight:G.mixin.rem(17),
      marginBottom:G.mixin.rem(15),
    },
    tipsBlack:{
      color: '#2A2A2A',
    },
    result:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(16),
      lineHeight:G.mixin.rem(22),
      marginBottom:G.mixin.rem(20),
    },
    tipsRed:{
      color: '#E3262A',
    },
  }),
}

// 固定导出
export const GS = G;
export default { GS, LS };
