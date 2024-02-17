/*
 * @Author: Galen.GE
 * @Date: 2024-02-06 10:21:08
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Register/DoneForRegister/Agreement.tsx
 * @Description:
 */

import React from 'react'
import Popup, {PopupContent} from '@core/templates/components/Popup';
import { WebView } from 'react-native-webview';
import Rule from './rule';

interface IProps {
  onClose: () => void;
}
export default ({onClose}: IProps) => {

  return (
    <Popup display isFull close={onClose} title='专业投资者客户协议'>
      <PopupContent isFull>
        <WebView
          style={{ flex: 1 }}
          source={{html: Rule}}
          allowFileAccess={true}
        />
      </PopupContent>
    </Popup>
  )

}