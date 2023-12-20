/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-27 11:25:34
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/components/Header/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text } from 'react-native';
import usePublicState from '@core/hooks/usePublicState';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Icon from '@icon/index';
import { LS as styles, GS } from './style';

interface IProps {
  isBack?: boolean
  backgroundColor?: string
  titleColor?: string
  title?: string
}

export default ({ isBack=true, backgroundColor='#FFC600', titleColor='#2A2A2A', title }: IProps) => {

  const insets = useSafeAreaInsets();
  const { navigation } = usePublicState();

  return (
    <View style={{...styles.header, backgroundColor, height: GS.mixin.rem(50) + insets.top}} >
      {
        isBack &&
        <MyTouchableOpacity style={{...styles.goBack, top: insets.top}} onPress={() => navigation.goBack()}>
          <Icon.Font style={styles.goBackIcon} type={Icon.T.SimpleLineIcons} name='arrow-left' />
        </MyTouchableOpacity>
      }
      <Text style={{...styles.headerText, marginTop: insets.top, color: titleColor}}>{ title }</Text>
    </View>
  )


}