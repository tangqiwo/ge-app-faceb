/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-10-10 15:45:50
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/Base/Text/index.tsx
 * @Description: 可控的 Text 组件
 */

import React from "react"
import { Text, TextProps } from 'react-native';

export const Selectable = ({children, ...props}: TextProps) => {
  return (
    <Text {...props} selectable >
      { children }
    </Text>
  )
}


export default {
  Text,
  Selectable
};