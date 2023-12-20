/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-10 19:35:54
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/Base/Button/index.tsx
 * @Description: 按钮
 */
import React from 'react';
import { ViewStyle, View, Text, TextStyle } from 'react-native';
import TouchableOpacity from '@template/components/MyTouchableOpacity';
import GS from '@views/mc/styles/index';

interface IPopupActionBtn {
  text: string,
  type?: 'submit' | 'cancel'
  action: Function,
  style?: ViewStyle,
  textStyle?: TextStyle
}
export default ({ text, action, type="submit", style, textStyle }: IPopupActionBtn) => {
  return (
    <TouchableOpacity onPress={() => action()}>
      <View style={{...(type === 'submit' ? GS.style.submitBtn : GS.style.cancelBtn), ...style}}>
        <Text style={{...(type === 'submit' ? GS.style.submitFont : GS.style.cancelFont), ...textStyle}} >{text}</Text>
      </View>
    </TouchableOpacity>
  )
}