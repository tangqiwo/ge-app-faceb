/*
 * @Author: Galen.GE
 * @Date: 2024-01-30 11:05:46
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/components/ExitPopup/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Text, Image } from 'react-native';
import Overlay from '@this/shadow/Overlay';
import Button from '../Button';

import { LS as styles } from './style';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';

interface IProps {
  display?: boolean;
  exit: () => void;
  text: string;
  children?: React.ReactNode;
  close?: () => void;
  okText?: string;
  cancelText: string;
}
export default ({ display, exit, close, text, children, okText="残忍退出", cancelText }: IProps) => {

  if(!display){
    return <></>
  }

  return (
    <Overlay display>
      <View style={styles.content}>
        <View style={styles.imageContent}>
          { children }
        </View>
        <View style={styles.textContent}>
          <Text style={styles.contentText}>{text}</Text>
        </View>
        <View style={styles.actions}>
          <Button style={styles.cancelButton} text={okText} onPress={exit} />
          <Button style={styles.button} text={cancelText} onPress={close} />
        </View>
      </View>
      <MyTouchableOpacity onPress={close}>
        <Image source={require('./i/close.png')} style={{width: 35, height: 35, marginTop: 20}} />
      </MyTouchableOpacity>
    </Overlay>
  )

}