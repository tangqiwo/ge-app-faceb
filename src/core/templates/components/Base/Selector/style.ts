/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-29 14:16:00
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Screens/ReportCommon/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


export default {
  searchBox: StyleSheet.create({
    box: {
      ...G.mixin.padding(10, 10, 10, 10),
      backgroundColor: G.var.colors.white,
      borderRadius: 5
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
      height: 28
    },
    text: {
      width: '25%',
      fontSize: 12,
      color: G.var.colors.gray[500]
    },
    value: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      width: '75%',
      paddingLeft: 5,
      paddingRight: 5,
      borderBottomWidth: 1,
      borderBottomColor: G.var.colors.gray[100]
    },
    valueText: {
      ontSize: 12,
      color: G.var.colors.gray[500]
    }
  }),
  dataItem: StyleSheet.create({
    box: {
      ...G.mixin.padding(10, 10, 10, 10),
      ...G.mixin.shadow({offset: {height: 2, width: 2}}),
      marginBottom: 10,
      backgroundColor: G.var.colors.white,
      borderRadius: 5
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5
    },
    red: {
      fontSize: 12,
      color: G.var.colors.red[600]
    },
    green: {
      fontSize: 12,
      color: G.var.colors.green[600]
    },
    gray: {
      fontSize: 12,
      color: G.var.colors.gray[500]
    },
    textValue: {
      fontSize: 14,
      color: G.var.colors.primary[600]
    },
    dataSet: {
      width: '33%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      flexWrap: 'wrap'
    },
    dataFull: {
      width: '100%',
      flexDirection: 'row'
    },
    dataFullBetween:{
      width:'100%',
      paddingLeft:10,
      paddingRight:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingBottom:10
    },
    button: {
      ...G.mixin.padding(2, 4, 2, 4),
      minWidth: 0,
      height: 20,
      marginRight: 0,
      marginLeft: 0
    },
    buttonText: {
      fontSize: 12,
      letterSpacing: 0
    },
    line: {
      width: '100%',
      height: 1,
      marginTop: 5,
      marginBottom: 5,
      backgroundColor: G.var.colors.gray[100]
    },
    totalText: {
      width: '100%',
      textAlign: 'center',
      fontWeight: '600',
      color: G.var.colors.primary[600]
    }
  })
}

// 固定导出
export const GS = G;
