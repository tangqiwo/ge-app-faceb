/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-31 14:45:45
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Base/Center/index.tsx
 * @Description: 自带居中效果的View
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';

interface IProps{
  style?: ViewStyle,
  [key: string]: any
}
export default ({style={}, isFull=false, ...props}: IProps) => {

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: isFull ? 1 : 0, ...style }} {...props} >
      { props.children }
    </View>
  )

}
