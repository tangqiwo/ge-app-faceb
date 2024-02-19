/*
 * @Author: Galen.GE
 * @Date: 2023-08-12 00:37:02
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/components/PopupAD/index.tsx
 * @Description: 弹窗广告
 */
import React from 'react';
import { View, TouchableWithoutFeedback, Image} from 'react-native';
import MyTouchableOpacity from '../MyTouchableOpacity';
import Overlay from '@core/templates/components/Overlay';

interface IProps {
  visible: boolean;
  zIndex?: number;
  onClose?: () => void;
  children?: React.ReactNode;
}
export default ({visible, zIndex=10, onClose, children}: IProps) => {

  return (
    <Overlay display={visible} zIndex={zIndex} close={onClose}>
      <View>
        <TouchableWithoutFeedback onPress={onClose}>
          { children }
        </TouchableWithoutFeedback>
        <MyTouchableOpacity onPress={onClose}>
          <Image source={require('./i/close.png')} style={{width: 35, height: 35, marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}} />
        </MyTouchableOpacity>
      </View>
    </Overlay>
  )

}
