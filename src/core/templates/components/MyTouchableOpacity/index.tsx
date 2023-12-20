/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-10-12 19:30:51
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/MyTouchableOpacity/index.tsx
 * @Description:
 */
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { handlePress } from '@helpers/unit';

export default ({ onPress, ...props }: TouchableOpacityProps) => {

  return (
    <TouchableOpacity {...props} onPress={handlePress(onPress)} />
  )

}