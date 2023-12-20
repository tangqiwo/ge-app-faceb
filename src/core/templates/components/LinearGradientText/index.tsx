import MaskedView from "@react-native-masked-view/masked-view";
import React from "react";
import { View, Text } from "react-native";
import LinearGradient, { LinearGradientProps } from "react-native-linear-gradient";

export interface LinearGradientTextProps extends LinearGradientProps {
  /** 文字 */
  text: string
  /** 高度 */
  height: number
  /** 字号 */
  fontSize?: number
  /** 文字对齐 */
  textAlign?: "left" | "auto" | "right" | "center" | "justify"
  /** 字粗 */
  fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"
}

export default (({
  text,
  height,
  fontSize,
  textAlign,
  fontWeight,
  ...restProps
}) => {
  return (
    <MaskedView
      style={{
        height: height,
        flex: 1,
      }}
      maskElement={(
        <View style={{
          backgroundColor: 'transparent',
        }}>
          <Text style={{
            fontSize: fontSize,
            lineHeight: height,
            fontWeight: fontWeight ?? 'normal',
            textAlign: textAlign ?? 'left',
          }}>{text}</Text>
        </View>
      )}
    >
      <LinearGradient
        style={{
          height: height,
          flex: 1,
        }}
        {...restProps}
      ></LinearGradient>
    </MaskedView>
  )
}) as React.FC<LinearGradientTextProps>