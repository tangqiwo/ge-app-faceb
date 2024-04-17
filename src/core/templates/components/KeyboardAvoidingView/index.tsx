/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-18 13:58:53
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/KeyboardAvoidingView/index.tsx
 * @Description: 键盘顶 VIEW
 */
import React from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareProps } from 'react-native-keyboard-aware-scroll-view'

interface IProps extends KeyboardAwareProps{
  android?: 'height' | 'position' | 'padding',
  style?: ViewStyle,
  [key: string]: any
  children: any
}
export default ({ children, ...props }: IProps) => {

  return (
    <KeyboardAwareScrollView {...props} enableOnAndroid keyboardShouldPersistTaps={true}>
      { children }
    </KeyboardAwareScrollView>
  )

}