/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/Succeed/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

// 本组件样式写到这里
export const LS = {
  main: StyleSheet.create({
    contenBox:{
      backgroundColor:'#fff',
      paddingLeft:G.mixin.rem(15),
      paddingRight:G.mixin.rem(15),
      paddingTop:G.mixin.rem(100),
      paddingBottom:G.mixin.rem(15),
      marginHorizontal: 'auto',
      flex: 1
    },
    raw:{
      flexDirection: 'row',
      justifyContent:'center',
    },
    leftIcon:{
      height:G.mixin.rem(30),
      width:G.mixin.rem(30),
      marginRight:G.mixin.rem(5),
    },
    icon:{
      height:G.mixin.rem(20),
      width:G.mixin.rem(20),
      marginRight:G.mixin.rem(5),
    },
    title:{
      color: '#000000',
      fontSize: G.mixin.rem(22),
      fontWeight: 'bold',
    },
    tips:{
      color: '#94938F',
      fontSize: G.mixin.rem(14),
      lineHeight:G.mixin.rem(20),
      textAlign:'center',
      marginTop:G.mixin.rem(25),
      marginBottom:G.mixin.rem(50),
    },
    service:{
      flexDirection: 'row',
      justifyContent:'center',
      textAlign:'center',
      marginTop:G.mixin.rem(30),
      marginBottom:G.mixin.rem(30),
    },
    serviceText:{
      color: '#2A2A2A',
      fontSize: G.mixin.rem(14),
    },
    logoBox:{
      flexDirection: 'row',
      justifyContent:'center',
      textAlign:'center',
    },
    logo:{
      height:G.mixin.rem(40),
      width:G.mixin.rem(125),
    },
  }),
}

// 固定导出
export const GS = G;
export default { GS, LS };
