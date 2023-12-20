/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-14 15:19:31
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Strategy/components/Title/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text } from 'react-native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { LS as styles, GS } from './style';

interface IProps {
  title: string,
  moreForword?: Function,
}
export default ({title, moreForword}: IProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>{ title }</Text>
      </View>
      <MyTouchableOpacity onPress={() => _.isFunction(moreForword) ? moreForword() : _.noop()}>
        <Text style={styles.more}>{`更多 >`}</Text>
      </MyTouchableOpacity>
    </View>
  )

}