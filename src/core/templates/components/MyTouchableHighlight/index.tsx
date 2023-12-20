/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-10-12 19:30:51
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/MyTouchableHighlight/index.tsx
 * @Description:
 */
import React from 'react';
import { TouchableHighlight, TouchableHighlightProps } from 'react-native';
import { handlePress } from '@helpers/unit';

export default ({ onPress, ...props }: TouchableHighlightProps) => {

  return (
    <TouchableHighlight {...props} onPress={handlePress(onPress)} />
  )

}