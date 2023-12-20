/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 18:40:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/Overlay/index.tsx
 * @Description: 遮罩层
 */
import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import { Portal } from '@gorhom/portal';

interface IProps {
  children: any,
  display: boolean,
  style?: ViewStyle,
  close?: Function,
  freeFocus?: any,
  zIndex?: number
}
export default ({ children = <></>, display, style, zIndex=10, freeFocus, close}: IProps) => {

  const handleStopPropagation= (e: any) => {
    if(freeFocus && freeFocus.current && freeFocus.current.blur){
      freeFocus.current.blur();
    }
    e.stopPropagation()
  }

  if(!display){
    return <></>
  }

  return (
    <Portal>
      {
        typeof close === 'function' ?
        <TouchableWithoutFeedback onPress={() => close()}>
          <View style={{...overlayStyles.wrapper, ...style, zIndex}}>
            <TouchableWithoutFeedback onPress={handleStopPropagation}>
              { children }
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        :
        <View style={{...overlayStyles.wrapper, ...style, zIndex}}>
          { children }
        </View>
      }
    </Portal>
  )

}

export const overlayStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})