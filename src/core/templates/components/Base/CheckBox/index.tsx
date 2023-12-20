/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-01 14:54:05
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Base/CheckBox/index.tsx
 * @Description: 复选框
 */

import _ from 'lodash';
import React from 'react';
import { View, Text, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import Icon from '@icon/index';
import GS from '@views/mc/styles/index'

interface IProps{
  checked: boolean,
  icon?: {
    unchecked: React.ReactNode,
    checked: React.ReactNode,
  },
  onPress?: Function,
  style?: ViewStyle,
  size?: number,
  title?: string,
  color?: string,
  children?: React.ReactNode,
  circleIcon?:boolean,
  leftChildren?:boolean,
  [key: string]: any,

}
export default ({ style, checked, icon, title="", size=GS.mixin.rem(12), color=GS.var.colors.primary[500], onPress=_.noop, children,circleIcon=false,leftChildren=false, ...props }: IProps) => {

  // 获取图标
  const getIcon = () => {
    if(!icon && !checked){
      return <Icon.Font type={Icon.T.FontAwesome} name={circleIcon ? "circle-o" : "square-o"} color={color} size={size} style={{width: GS.mixin.rem(14)}} />
    }
    if(!icon && checked){
      return <Icon.Font type={Icon.T.FontAwesome} name={circleIcon ? "check-circle" : "check-square"} color={color} size={size} style={{width: GS.mixin.rem(14)}} />
    }
    if(!checked){
      return icon.unchecked
    }
    return icon.checked;
  }

  return (
    <TouchableWithoutFeedback onPress={() => onPress()} style={{width: '100%'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}} {...props}>
        <>
          {leftChildren && children}
          { getIcon() }
          { title && <Text style={{paddingLeft: 2, fontSize: size, color}} >{ title }</Text> }
          { !leftChildren && children }
        </>
      </View>
    </TouchableWithoutFeedback>
  )

}