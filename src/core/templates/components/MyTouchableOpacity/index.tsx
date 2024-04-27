/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-10-12 19:30:51
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/MyTouchableOpacity/index.tsx
 * @Description:
 */
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { handlePress } from '@helpers/unit';

export default ({ onPress, ...props }: TouchableOpacityProps) => {

  const activeOpacity = props.activeOpacity || 0.8

  return (
    <TouchableOpacity {...props} onPress={handlePress(onPress)} activeOpacity={activeOpacity} />
  )

}