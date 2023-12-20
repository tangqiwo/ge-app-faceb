/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 15:07:27
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/styles/styleSheet.ts
 * @Description: 公共的样式，可以理解成引入的 css 文件，可直接使用
 */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  spaceBetween: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  full: {
    width: '100%',
    height: '100%'
  }
})