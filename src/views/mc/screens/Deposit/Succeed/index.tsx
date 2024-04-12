/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Image, Text} from 'react-native';
import Button from '@this/components/Button'
import { LS } from './style';

const styles = LS.main;

export default () => {


  return (
    <View style={styles.contenBox}>
      <View style={styles.raw}>
        <Image source={require('./i/done.png')} style={styles.leftIcon} />
        <Text style={styles.title}>提交成功</Text>
      </View>
      <Text style={styles.tips}>
        注资正处理中{'\n'}
        您已成功提交注资，请耐心等待短信通知{'\n'}
        如有任何疑问,请联系在线客服{'\n'}
      </Text>
      {/* 确认按鈕 */}
      <Button
        text='确认'
      />
      <View style={styles.service}>
        <Image source={require('./i/service.png')} style={styles.icon} />
        <Text style={styles.serviceText}>在线客服</Text>
      </View>
      {/* logo */}
      <Image source={require('./i/logo.png')} style={styles.logo} />

    </View>
  )

}