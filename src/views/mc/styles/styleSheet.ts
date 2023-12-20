/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 15:09:19
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/styles/styleSheet.ts
 * @Description:
 */
import { StyleSheet } from 'react-native';
import variables from './variables';
import G from '@template/styles/styleSheet';

export default {
  ...G,
  ...StyleSheet.create({
     // 普通页面包裹（最外层）
     wrapper: {
      flex: 1
    },
    // 通用内容页
    contents: {
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 10,
      paddingBottom: 10,
      flex: 1,
      height: '100%'
    },
    font10: {
      color: variables.colors.primary[600],
      fontSize: 10
    },
    font12: {
      color: variables.colors.primary[600],
      fontSize: 12
    },
    font14: {
      color: variables.colors.primary[600],
      fontSize: 14
    },
    font16: {
      color: variables.colors.primary[600],
      fontSize: 16
    },
    font18: {
      color: variables.colors.primary[600],
      fontSize: 18
    },
    font20: {
      color: variables.colors.primary[600],
      fontSize: 20
    },
    submitBtn: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 120,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10,
      borderColor: '#FFC600',
      backgroundColor: '#FFC600',
      shadowColor: '#FFC600',
      shadowOpacity: 0.5,
      shadowOffset: {
        width: 5,
        height: 5
      }
    },
    cancelBtn: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 120,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10,
      backgroundColor: variables.colors.white,
      borderColor: '#FFC600',
      shadowColor: '#FFC600',
      shadowOpacity: 0.5,
      shadowOffset: {
        width: 5,
        height: 5
      }
    },
    submitFont: {
      fontWeight: "600",
      letterSpacing: 4,
      color: variables.colors.white,
      fontSize: 16
    },
    cancelFont: {
      fontWeight: "600",
      letterSpacing: 2,
      color: '#FFC600',
      fontSize: 16
    }
  })
}
