/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-26 18:15:05
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/styles/mixin.ts
 * @Description: 混合器
 * !important: 所有计算以设计稿 375 为标准！
 */
import _ from 'lodash';
import colors from './colors';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const base = width > height ? height : width

export default {

  /**
   * @Author: ammo@xyzzdev.com
   * @Date: 2022-07-26 18:22:05
   * @description: 计算自适应值
   * @param {number} value 375设计稿标示值
   * @return {*} 当前设备自适应之后实际值(保留两位小数)
   */  
  rem: (value: number): number => {
    return _.round((base / 375) * value, 2)
  },

  /**
   * @Author: ammo@xyzzdev.com
   * @Date: 2022-07-26 18:28:11
   * @description: 计算某屏幕百分比对应的值
   * @param {number} 百分比，数字
   * @return {*} 实际屏幕对应值
   */  
  percent: (value: number): number => {
    return _.round(base / 100 * value, 2);
  },

  /**
   * @Author: ammo@xyzzdev.com
   * @Date: 2022-07-29 12:36:42
   * @description: 类似CSS PADDING属性
   * @param {*} true
   * @return {*}
   */  
  padding: (top: number, right: number, bottom: number, left: number, isRem: boolean = true) => {
    const rem = (value: number) => _.round((base / 375) * value, 2);
    return {
      paddingTop    : isRem ? rem(top) : top,
      paddingRight  : isRem ? rem(right) : right,
      paddingBottom : isRem ? rem(bottom) : bottom,
      paddingLeft   : isRem ? rem(left) : left,
    }
  },

  /**
   * @Author: ammo@xyzzdev.com
   * @Date: 2022-08-15 14:37:21
   * @description: 类似CSS Margin属性
   * @param {*} true
   * @return {*}
   */  
  margin: (top: number, right: number, bottom: number, left: number, isRem: boolean = true) => {
    const rem = (value: number) => _.round((base / 375) * value, 2);
    return {
      marginTop    : isRem ? rem(top) : top,
      marginRight  : isRem ? rem(right) : right,
      marginBottom : isRem ? rem(bottom) : bottom,
      marginLeft   : isRem ? rem(left) : left,
    }
  },
  /**
   * @Author: ammo@xyzzdev.com
   * @Date: 2022-08-23 02:51:00
   * @description: 阴影
   * @param {*} colors
   * @param {*} opacity
   * @param {*} offset
   * @return {*}
   */  
  shadow: ({color = colors.gray[400], opacity = 0.4, offset = {width: 5, height: 5}}) => {
    return {
      shadowColor: color,
      shadowOpacity: opacity,
      shadowOffset: offset
    }
  }


}
