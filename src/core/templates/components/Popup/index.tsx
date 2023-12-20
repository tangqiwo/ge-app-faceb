/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-29 16:54:37
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/Popup/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KeyboardAvoidingView from '@views/mc/shadow/KeyboardAvoidingView';
import Icon from '@icon/index';
import Overlay from '@views/mc/shadow/Overlay';
import G from '@constants/global';
import { GS, LS } from './style';

interface IProps{
  display: boolean,
  zIndex?: number,
  top?: number,
  title?: string,
  close?: Function,
  contentStyle?: ViewStyle,
  isFull?: boolean,
  wrapperType?: 'Keyboard' | 'View',
  header?: React.ReactElement
  children: any,
  hasBg?:boolean,
  bg?:any
  duration?:number,
  // 横屏竖屏
  orientation?: 'portrait' | 'landscape'
}
export default ({ display, zIndex=50, top=50, title, close, header, contentStyle={}, wrapperType='Keyboard', isFull=false, children, hasBg=false, bg='', duration=500, orientation='portrait'}: IProps) => {

  const insets = useSafeAreaInsets();
  const currentHeight = orientation === 'portrait' ? G.GET('SCREEN_HEIGHT'): G.GET('SCREEN_WIDTH');

  return (
    <Overlay display={display} zIndex={zIndex} >
      <TouchableWithoutFeedback onPress={() => close ? close() : _.noop()}>
        <View style={{ height: insets.top + top, width: '100%' }} />
      </TouchableWithoutFeedback>
      <Animatable.View
        style={{...LS.frame.warpper, paddingBottom: insets.bottom, flex: 1,backgroundColor:bg ? 'rgba(255,255,255,0.5)':'#fff'}}
        animation={duration > 0 ? "fadeInUpBig" : ""}
        duration={duration}
      >
        <ImageBackground
          source={hasBg ? require('./i/content-bg.png') : bg ? bg : ''}
          style={{borderTopLeftRadius: GS.mixin.rem(20), borderTopRightRadius: GS.mixin.rem(20), overflow:'hidden'}}
        >
          {
            header ||
            <View style={{...LS.header.wrapper, justifyContent: close ? 'space-between' : 'center', borderBottomWidth:bg ? 0 : 1}}>
              { close && <Text style={LS.header.empty}/> }
              <Text style={{...GS.style.font16, fontWeight: '600', flex: 1, textAlign:'center'}} numberOfLines={1} ellipsizeMode={'tail'} >{ title }</Text>
              {
                close &&
                <TouchableOpacity onPress={() => close()}>
                  <Icon.Font style={LS.header.icon} type={Icon.T.Ionicons} name='ios-close-sharp' />
                </TouchableOpacity>
              }
            </View>
          }
            <WrapperContents type={wrapperType} style={{...contentStyle}}>
              <View style={{height: isFull ? (currentHeight - 45 - insets.top - top) : 'auto', paddingBottom: isFull ? insets.bottom : 0}}>
                  { children }
              </View>
            </WrapperContents>
        </ImageBackground>
      </Animatable.View>
    </Overlay>
  )

}


export const WrapperContents = ({ children, type, ...props }: {children: React.ReactNode, type: 'Keyboard' | 'ScrollView' | 'View', [key: string]: any})  => {
  if(type === 'Keyboard'){
    return (
      <KeyboardAvoidingView {...props}>
        {children}
      </KeyboardAvoidingView>
    )
  }
  return (
    <View>
      {children}
    </View>
  )
}

export const PopupContent = ({ children, isFull=false, wrapperType='View', style, extraHeight, extraScrollHeight }: { children: React.ReactNode, isFull?: boolean, style?: any, wrapperType?: 'Keyboard' | 'View', extraHeight?:any, extraScrollHeight?:any }) => {
  const _style = {...(style || {}), ...(isFull ? { flex: 1 } : {})}
  if(wrapperType === 'View'){
    return (
      <View style={{...LS.frame.contents,  ..._style}}>
        {children}
      </View>
    )
  }
  return (
    <KeyboardAvoidingView style={{...LS.frame.contents,  ..._style}} extraHeight={extraHeight} extraScrollHeight={extraScrollHeight}>
      {children}
    </KeyboardAvoidingView>
  )
}

export const PopupActions = ({ children, style={} }: { children: React.ReactNode, style?: any }) => {

  return (
    <View style={{...LS.frame.actions, ...style}}>
      {children}
    </View>
  )
}

interface IPopupActionBtn {
  text: string,
  type?: 'submit' | 'cancel'
  action: Function,
  style?: ViewStyle
}
export const PopupActionBtn = ({ text, action, type="submit", style }: IPopupActionBtn) => {
  return (
    <TouchableOpacity onPress={() => action()}>
      <View style={{...(type === 'submit' ? GS.style.submitBtn : GS.style.cancelBtn), ...style}}>
        <Text style={type === 'submit' ? GS.style.submitFont : GS.style.cancelFont} >{text}</Text>
      </View>
    </TouchableOpacity>
  )
}