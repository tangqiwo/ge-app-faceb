/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-28 11:58:37
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/BackgroundView/index.tsx
 * @Description: 带背景图的 VIEW
 */

import React from 'react';
import { ImageBackground,  ImageSourcePropType, View, ViewStyle, ImageBackgroundProps } from 'react-native';
import GS from '@template/styles/styleSheet'

interface IProps extends ImageBackgroundProps{
  style?: ViewStyle | Array<ViewStyle>,
  source: ImageSourcePropType
  children: React.ReactNode,
}
export default ({style, source, children}: IProps) => {

  return(
    <View style={style}>
      <ImageBackground style={[GS.background, style]} source={source} resizeMode='cover'>
        { children }
      </ImageBackground>
    </View>
  )

}