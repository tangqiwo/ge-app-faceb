/*
 * @Author: Galen.GE
 * @Date: 2024-01-29 13:32:04
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Subsidy/Rule.tsx
 * @Description:
 */
// @ts-nocheck

import dayjs from 'dayjs';
import React from 'react';
import { View, Text } from 'react-native';
import Popup, {PopupContent} from '@core/templates/components/Popup';
import { WebView } from 'react-native-webview';

interface IProps {
  close: () => void;
  start: string;
  end: string;
}
export default ({close, start, end}: IProps) => {

  const injectedJavaScript = `window.startDate = '${dayjs(start).format('YYYY年MM月DD HH:mm')}';window.endDate = '${dayjs(end).format('YYYY年MM月DD HH:mm')}';`;

  return (
    <Popup display isFull close={close} title='活动规则'>
      <PopupContent isFull>
        <WebView
          style={{ flex: 1 }}
          source={require(`./rule.html`)}
          injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        />
      </PopupContent>
    </Popup>
  )
}