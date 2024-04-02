/*
 * @Author: Galen.GE
 * @Date: 2024-03-07 15:15:14
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Privacy/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Text } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import Overlay from '@core/templates/components/Overlay';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import UserPrivacy from '@core/templates/components/__Popups/UserPrivacy';
import UserAgreement from "@core/templates/components/__Popups/UserAgreement";
import Popup from '@this/shadow/Popup';
import { LS as styles, GS } from './style';
import store from '@helpers/storage';

interface IProps {
  setShowPrivacy: Function
}
export default ({ setShowPrivacy }: IProps) => {

  const [ title, setTitle ] = React.useState<string>('');
  const [ content, setContent ] = React.useState<any>(() => () => <></>);

  type POPUP_TYPES =
    | 'USER_AGREEMENT'
    | 'USER_PRIVACY'

  const openPopups = (type: POPUP_TYPES) => {
    setTitle(Mappings[type].title);
    setContent(Mappings[type].content);
  }

  const closePopups = () => {
    setTitle('');
    setContent(() => () => <></>);
  }

  const Mappings: any = {
    ['USER_AGREEMENT']: {
      title: '用户协议',
      content: UserAgreement
    },
    ['USER_PRIVACY']: {
      title:'用户隐私',
      content: UserPrivacy
    },
  }

  const agrrement = () => {
    store.set('IS_AGREE_PRIVACY', true);
    setShowPrivacy(false);
  }

  return (
    <>
      <Overlay display zIndex={100}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>隐私政策和服务协议</Text>
          </View>
          <View style={styles.contents}>
            <Text style={styles.contentText}>
              欢迎下载和使用巨象App，在使用我们的服务前，请仔细阅读
              <Text style={{color: '#BF9D55'}} onPress={() => openPopups('USER_PRIVACY')}>《巨象隐私政策》</Text>和
              <Text style={{color: '#BF9D55'}} onPress={() => openPopups('USER_AGREEMENT')}>《巨象服务协议》</Text>。
            </Text>
            <Text style={styles.contentText}>
              《巨象隐私政策》清晰列示了在你使用巨象App的过程中我们需要请求的设备权限及其目的、以及你如何管理这些授权。此外，你还可以通过阅读《巨象隐私政策》的具体条款，了解我们对用户信息的处理规则和用户行使数据隐私权利的具体方式。
              如果你已经阅读并认可上述政策和协议，请点击“同意”按钮。
            </Text>
          </View>
          <View style={styles.actions}>
            <MyTouchableOpacity style={styles.actionItem} onPress={() => RNExitApp.exitApp()}>
              <Text style={styles.actionText}>不同意并退出</Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity style={{...styles.actionItem, borderRightWidth: 0}} onPress={agrrement}>
              <Text style={{...styles.actionText, color: '#BF9D55'}}>同意</Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </Overlay>
      {
        title &&
        <Popup zIndex={200} title={title} top={10} close={closePopups} display >
          { content }
        </Popup>
      }
    </>
  )

}