/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-01 17:25:01
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/components/Base/Input/index.tsx
 * @Description: 输入框，带有PASSWORD TYPE
 */
import React from 'react';
import { TextInput, ViewStyle, View, StyleSheet } from 'react-native';
import GS from '@views/mc/styles/index';

const colors = GS.var.colors;

const _style = StyleSheet.create({
  baseStyle: {
    position: 'relative',
    height: GS.mixin.rem(30),
    width: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    padd: 'auto',
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 1,
    color: GS.var.colors.primary[500],
  }
})
const { baseStyle } = _style;

export interface InputIprops{
  type?: 'text' | 'password',
  style?: ViewStyle,
  value?: string,
  defaultValue?: string,
  placeholder?: string,
  color?: string,
  borderColor?: string,
  focusBorderColor?: string,
  placeholderTextColor?: string,
  maxLength?: number,
  autoFocus?: boolean,
  LeftNode?: React.ReactNode,
  RightNode?: React.ReactNode,
  onFocus?: Function,
  onBlur?: Function,
  keyboardType?: string
  onChange?: Function,
  editable?: boolean,
  multiline?: boolean,
  myRef?: any,
  [key: string]: any
}
export default React.memo(({
  value,
  defaultValue,
  type,
  style={},
  borderColor=colors.secondary[400],
  color=colors.primary[500],
  focusBorderColor,
  onFocus, onBlur,
  onChange,
  LeftNode,
  RightNode,
  editable=true,
  multiline=false,
  enterKeyHint,
  myRef=React.useRef(null),
  ...props
}: InputIprops) => {

  const [displayBorder, setDisplayBorder] = React.useState(style.borderColor || borderColor);

  React.useEffect(() => {
    myRef.current.setNativeProps({ text: `${value}` });
  }, [value])

  React.useEffect(() => {
    setDisplayBorder(style.borderColor || borderColor)
  }, [style.borderColor, borderColor])

  // 捕获值变更
  const handleOnChange = (e: any) => {
    if(onChange){
      onChange(e.nativeEvent.text);
    }
  }

  // 捕获OnFocus
  const handleOnFocus = () => {
    if(focusBorderColor){
      setDisplayBorder(focusBorderColor);
    }
    if(onFocus){
      onFocus();
    }
  }

  // 捕获OnBlur
  const handleOnBlur = () => {
    if(focusBorderColor){
      setDisplayBorder(style.borderColor || borderColor);
    }
    if(onBlur){
      onBlur();
    }
  }

  // 没有左右节点时
  if(!LeftNode && !RightNode){
    return (
      <View>
        <TextInput
          ref={myRef}
          autoCapitalize="none"
          style={{ ...baseStyle, ...style, color, borderColor: displayBorder}}
          secureTextEntry={type === 'password'}
          placeholderTextColor={GS.var.colors.gray[500]}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          autoComplete="off"
          autoCorrect={false}
          allowFontScaling={false}
          editable={editable}
          multiline={multiline}
          {...props}
        />
      </View>
    )
  }

  return(
    <View style={{flexDirection: 'row', alignItems: 'center', ...baseStyle, ...style, borderColor: displayBorder}}>
      { LeftNode }
      <TextInput
        ref={myRef}
        autoCapitalize="none"
        style={{ ...baseStyle, color, flex: 1, borderWidth:0 }}
        placeholderTextColor={GS.var.colors.gray[500]}
        secureTextEntry={type === 'password'}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autoComplete="off"
        autoCorrect={false}
        allowFontScaling={false}
        editable={editable}
        multiline={multiline}
        {...props}
      />
      { RightNode }
    </View>
  )

})