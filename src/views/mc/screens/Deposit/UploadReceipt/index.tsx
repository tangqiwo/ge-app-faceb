/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/index.tsx
 * @Description:
 */
import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import Button from '@this/components/Button'
import { LS } from './style';

const styles = LS.main;

export default () => {


  return (
    <View style={styles.contenBox}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.box}>
          <View style={styles.raw}>
            <Image source={require('./i/pay.png')} style={styles.leftIcon} />
            <Text style={styles.title}>待上传凭证</Text>
          </View>
          <Text style={styles.tips}>若您已完成注资，请上传注资凭证</Text>
        </View>
        {/* 上传注资凭证 */}
        <View style={styles.upload}>
          <Text style={styles.subheading}>上传注资凭证</Text>
          <View style={styles.uploadbg}>
            <TouchableOpacity>
              <Image source={require('./i/upload.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.uploadtips}>查看示例</Text>
        </View>
        {/* 注资信息 */}
        <View style={styles.box}>
          <Text style={styles.subheading}>注资信息</Text>
            <View style={styles.itemBox}>
              <View style={styles.item}>
                <Text style={styles.left}>订单号</Text>
                <Text style={styles.right}>111</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.left}>支付方式</Text>
                <Text style={styles.right}>虚拟货币-TRC20</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.left}>注资金额</Text>
                <Text style={styles.right}>
                  <Text style={styles.red}>
                    111
                  </Text>
                    USDT
                </Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.left}>当前汇率</Text>
                <Text style={styles.right}>1</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.left}>兑换后约到账</Text>
                <Text style={styles.right}><Text style={styles.red}>1</Text>美元</Text>
              </View>
              <View style={styles.item}>
                <Text style={styles.left}>注资时间</Text>
                <Text style={styles.right}>2024/03/25 16:53:59</Text>
              </View>
          </View>
        </View>
      </ScrollView>
      {/* 提交按鈕 */}
      <View style={[styles.button, styles.box]}>
        <Button
          style={styles.cancel}
          text='取消支付'
          // onPress={() => cancelDepositOrder()}
        />
        <Button
          style={styles.next}
          text='提交凭证'
          // onPress={}
        />
      </View>

    </View>
  )

}