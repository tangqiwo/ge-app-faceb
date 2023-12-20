/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:31
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Register/DoneForRegister/index.tsx
 * @Description: 登录
 */
import _ from 'lodash';
import React from 'react';
import { View, Image, Text,  } from 'react-native';
import BackgroundView from "@core/templates/components/BackgroundView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Clipboard from '@react-native-clipboard/clipboard';
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import { LS as styles, GS } from './style';


export default () => {

  const insets = useSafeAreaInsets();
  const { rs, dispatch, ACTIONS } = usePublicState();
  const { forward } = useRouteWebCommon();

  const handleCopy = (copyText: any) => {
    Clipboard.setString(`${copyText}`);
    dispatch(ACTIONS.BASE.openToast({text: '已复制当前选项', types: 'success'}));
  }

  return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={{...styles.titleView, marginTop: insets.top}}>
          <Text style={styles.titleText}>开户成功</Text>
        </View>
        <Text style={styles.welcome}></Text>
      </BackgroundView>
      <View style={styles.formView}>
        <View style={styles.tips}>
          <Image style={styles.tipImage} source={require('./i/icon.png')} />
          <Text style={styles.tipsText}>开户成功</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.contentItem}>
            <View style={styles.lableView}>
              <Text style={{...styles.contentItemText}}>MT4账户号码</Text>
            </View>
            <View style={styles.copyView}>
              <Text style={{...styles.contentItemText, }}>{rs.user.registerProgress?.data?.Mt4Id}</Text>
              <MyTouchableOpacity onPress={() => handleCopy(rs.user.registerProgress?.data?.Mt4Id)} >
                <Image style={styles.copyImage} source={require('./i/icon-copy.png')} />
              </MyTouchableOpacity>
            </View>
          </View>
          <View style={styles.contentItem}>
            <View style={styles.lableView}>
              <Text style={{...styles.contentItemText}}>MT4交易密码</Text>
            </View>
            <View style={styles.copyView}>
              <Text style={{...styles.contentItemText, }}>{rs.user.registerProgress?.data?.Password}</Text>
              <MyTouchableOpacity onPress={() => handleCopy(rs.user.registerProgress?.data?.Password)}>
                <Image style={styles.copyImage} source={require('./i/icon-copy.png')} />
              </MyTouchableOpacity>
            </View>
          </View>
          <View style={{...styles.contentItem, borderBottomWidth: 0}}>
            <View style={styles.lableView}>
              <Text style={{...styles.contentItemText}}>MT4服务器入口</Text>
            </View>
            <View style={styles.copyView}>
              <Text style={{...styles.contentItemText, }}>{rs.user.registerProgress?.data?.Server}</Text>
              <MyTouchableOpacity onPress={() => handleCopy(rs.user.registerProgress?.data?.Server)}>
                <Image style={styles.copyImage} source={require('./i/icon-copy.png')} />
              </MyTouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.adView}>
          <Text style={styles.adText}>新客充<Text style={styles.adText2}>$200</Text>送<Text style={styles.adText2}>$400</Text>起</Text>
          <Text style={styles.adText}>开户<Text style={styles.adText2}>24</Text>小时注资加送<Text style={styles.adText2}>$100</Text>！</Text>
        </View>
        <MyTouchableOpacity style={styles.submitView} onPress={() => forward(FORWARD_TYPES['DEPOSIT'])}>
          <Text style={styles.submitText}>立即注资</Text>
        </MyTouchableOpacity>
      </View>
    </View>
  )

}
