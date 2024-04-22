/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/Payment/style.ts
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
      backgroundColor:'#fff',
      flex: 1
    },
    raw:{
      flexDirection: 'row',
      marginBottom:G.mixin.rem(7),
    },
    leftIcon:{
      height:G.mixin.rem(30),
      width:G.mixin.rem(30),
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
    },
    line:{
      width:'100%',
      height:G.mixin.rem(1),
      marginTop:G.mixin.rem(16),
      marginBottom:G.mixin.rem(16),
      backgroundColor:'#EBEBEB',
    },
    subheading:{
      color: '#000000',
      fontSize: G.mixin.rem(16),
      fontWeight: '500',
    },
    itemBox:{
      borderRadius:G.mixin.rem(10),
      paddingLeft:G.mixin.rem(10),
      paddingRight:G.mixin.rem(10),
      paddingBottom:G.mixin.rem(10),
      paddingTop:G.mixin.rem(10),
      marginTop:G.mixin.rem(5),
      marginBottom:G.mixin.rem(10),
      backgroundColor:'#FAFAFA',
      width:'100%',
      height:'auto',
    },
    item:{
      height:G.mixin.rem(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom:G.mixin.rem(15),
    },
    left:{
      color: '#94938F',
      fontSize: G.mixin.rem(14),
      lineHeight:G.mixin.rem(20),
    },
    right:{
      color: '#000000',
      fontSize: G.mixin.rem(14),
      lineHeight:G.mixin.rem(20),
    },
    red:{
      color: '#E3262A',
      fontSize: G.mixin.rem(16),
      lineHeight:G.mixin.rem(20),
    },
    between:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    caption:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: G.mixin.rem(10),
    },
    channelName:{
      height:G.mixin.rem(50),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rightIcon:{
      height:G.mixin.rem(30),
      width:G.mixin.rem(169),
      alignSelf: 'flex-end'
    },
    content:{
      color: '#646464',
      fontSize: G.mixin.rem(14),
      lineHeight:G.mixin.rem(20),
    },
    icon:{
      height:G.mixin.rem(22),
      width:G.mixin.rem(22),
    },
    button:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop:G.mixin.rem(25),
    },
    cancel:{
      backgroundColor:'#F5F5F5',
      width:'34%',
    },
    next:{
      width:'63%',
    }
  }),
}

// 固定导出
export const GS = G;
export default { GS, LS };
