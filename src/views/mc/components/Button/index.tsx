/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-27 11:25:34
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/components/Button/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { Text } from 'react-native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { LS as styles } from './style';

interface IProps {
  backgroundColor?: string
  titleColor?: string
  style?: any
  textStyle?: any
  text?: string
  onPress?: () => void
}

export default ({ backgroundColor='#FFC600', style={}, textStyle={}, titleColor='#2A2A2A', text, onPress }: IProps) => {

  return (
    <MyTouchableOpacity style={{...styles.submitView, ...style}} onPress={onPress}>
      <Text style={{...styles.submitText, ...textStyle}}>{text}</Text>
    </MyTouchableOpacity>
  )


}