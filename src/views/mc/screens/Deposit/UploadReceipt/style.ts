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
      backgroundColor:'#fff',
      flex: 1
    },
    box:{
      paddingLeft:G.mixin.rem(15),
      paddingRight:G.mixin.rem(15),
      paddingTop:G.mixin.rem(15),
      paddingBottom:G.mixin.rem(15),
      marginHorizontal: 'auto',
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
      color: '#E3262A',
      fontSize: G.mixin.rem(14),
    },
    upload:{
      backgroundColor:'#FFFAEB',
      paddingLeft:G.mixin.rem(15),
      paddingRight:G.mixin.rem(15),
      paddingTop:G.mixin.rem(15),
      paddingBottom:G.mixin.rem(15),
    },
    uploadbg:{
      backgroundColor:'#fff',
      borderRadius:G.mixin.rem(10),
      width:'100%',
      height:G.mixin.rem(160),
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadtips:{
      color: '#646464',
      fontSize: G.mixin.rem(14),
      marginTop: G.mixin.rem(15),
      textAlign:'center',
    },
    subheading:{
      color: '#000000',
      fontSize: G.mixin.rem(16),
      fontWeight: '500',
      marginBottom:G.mixin.rem(15),
    },
    itemBox:{
      borderRadius:G.mixin.rem(10),
      paddingLeft:G.mixin.rem(10),
      paddingRight:G.mixin.rem(10),
      paddingTop:G.mixin.rem(10),
      marginBottom:G.mixin.rem(10),
      width:'100%',
      height:'auto',
      borderColor:'#EBEBEB',
      borderWidth:G.mixin.rem(1),
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
      marginRight:G.mixin.rem(6),
    },
    between:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    icon:{
      height:G.mixin.rem(30),
      width:G.mixin.rem(30),
    },
    button:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop:G.mixin.rem(25),
      marginBottom:G.mixin.rem(50),
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
