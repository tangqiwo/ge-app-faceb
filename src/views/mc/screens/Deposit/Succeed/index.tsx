/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/Succeed/index.tsx
 * @Description:
 */
import _ from 'lodash'
import React from 'react';
import { View, Image, Text} from 'react-native';
import Button from '@this/components/Button';
import usePublicState from '@core/hooks/usePublicState';
import { useNavigationState } from '@react-navigation/native';

import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import { LS } from './style';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';

const styles = LS.main;

export default () => {

  const routes = useNavigationState(state => state.routes);
  const { customerService, navigation } = usePublicState();
  const { forward } = useRouteWebCommon();

  const naviga = () => {
    const leastRoute = _.last(routes.filter(route => !route.name.includes('Deposit')));
    navigation.navigate(leastRoute.name)
  }

  return (
    <View style={styles.contenBox}>
      <View style={{flex: 1}}>
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
          onPress={naviga}
        />
        <MyTouchableOpacity style={styles.service} onPress={() =>  forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService})}>
          <Image source={require('./i/service.png')} style={styles.icon} />
          <Text style={styles.serviceText}>在线客服</Text>
        </MyTouchableOpacity>
      </View>
      {/* logo */}
      <View style={styles.logoBox}>
        <Image source={require('./i/logo.png')} style={styles.logo} />
      </View>
    </View>
  )

}