/*
 * @Author: Galen.GE
 * @Date: 2023-12-18 12:52:42
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/Position/index.tsx
 * @Description: 挂单
 */
import React from 'react';
import { ScrollView } from 'react-native';
import MyTouchableOpacity from "@core/templates/components/MyTouchableOpacity";
import { View, Text } from "react-native-animatable";
import { LS as styles } from './style';

export default () => {

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={styles.main}>
          <View style={styles.spaceBetween}>
            <Text style={styles.title}>XAUUSDpro</Text>
            <View style={styles.variety}>
              <Text style={styles.grey}>买入 </Text>
              <Text style={styles.grey}>0.01</Text>
              <Text style={styles.grey}> 手</Text>
              <Text style={styles.order}>#10016.00</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.info}>1980.21</Text>
            <Text style={styles.arrow}>{'\u2192'}</Text>
            <Text style={styles.infoRed}>1980.21</Text>
          </View>
          <View style={styles.spaceBetween}>
            <View style={styles.positionLeft}>
              <View style={styles.spaceBetween}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.grey}>利息： </Text>
                  <Text style={styles.grey}>0.00</Text>
                </View>
                <View style={styles.spaceBetween}>
                  <Text style={styles.grey}>佣金： </Text>
                  <Text style={styles.grey}>0.00</Text>
                </View>
              </View>
              <View style={styles.spaceBetween}>
                <View style={styles.spaceBetween}>
                  <Text style={styles.grey}>止损： </Text>
                  <Text style={styles.grey}>0.00</Text>
                </View>
                <View style={styles.spaceBetween}>
                  <Text style={styles.grey}>止盈： </Text>
                  <Text style={styles.grey}>0.00</Text>
                </View>
              </View>
            </View>
            <View style={styles.positionRight}>
              <Text style={styles.mark}>0.55</Text>
              <Text style={styles.positionDate}>2023-10-30 23:22:38</Text>
            </View>
          </View>
          <View style={styles.buttonBox}>
            <MyTouchableOpacity style={styles.buttonYellow}>
              <Text style={styles.buttonText}>平仓</Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.buttonBlack}>
              <Text style={styles.buttonTextYellow}>设置止盈止损</Text>
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.buttonWhite}>
              <Text style={styles.buttonText}>图表</Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )

}