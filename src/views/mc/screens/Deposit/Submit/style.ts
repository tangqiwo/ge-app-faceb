/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/Submit/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = {
  main: StyleSheet.create({
    ad: {
      flexDirection: 'row',
      height: G.mixin.rem(52),
      alignItems: 'center',
      backgroundColor: '#FEF6F6',
      paddingLeft: G.mixin.rem(15),
      paddingRight: G.mixin.rem(15),
    },
    adImage: {
      width: G.mixin.rem(120),
      height: G.mixin.rem(40),
    },
    adText: {
      fontSize: G.mixin.rem(12),
      marginLeft: G.mixin.rem(10),
      color: '#2A2A2A ',
      fontWeight: 'bold',
    },
    contenBox:{
      paddingLeft:G.mixin.rem(15),
      paddingRight:G.mixin.rem(15),
      paddingBottom:G.mixin.rem(30),
      marginHorizontal: 'auto',
      backgroundColor:'#fff'
    },
    declare:{
      marginTop:G.mixin.rem(15),
      color: '#2A2A2A',
      fontSize: G.mixin.rem(18),
      fontWeight: 'bold',
      marginBottom:G.mixin.rem(15),
    },
    item:{
      width:'100%',
      height:G.mixin.rem(74),
      paddingLeft:G.mixin.rem(12),
      paddingRight:G.mixin.rem(12),
      paddingTop:G.mixin.rem(5),
      paddingBottom:G.mixin.rem(5),
      marginTop:G.mixin.rem(6),
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
    moneyItemActive: {
      backgroundColor: '#FFC600',
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
    descText: {
      color: '#646464',
    },
    checkIcon: {
      width: G.mixin.rem(20),
      height: G.mixin.rem(20),
      marginRight: G.mixin.rem(5),
    },
    descView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: G.mixin.rem(10),
    }
  }),
}

// 固定导出
export const GS = G;
export default { GS, LS };
