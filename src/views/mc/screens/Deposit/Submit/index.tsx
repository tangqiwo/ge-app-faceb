/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/Submit/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Image, Text, TextInput} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Button from '@this/components/Button'
import { LS } from './style';

const styles = LS.main;


export default () => {

  const { params } = useRoute<any>();

  console.log(params);
  React.useEffect(() => {
    params.submitDeposit();
  }, [])

  return (
    <View style={styles.contenBox}>
      <Text style={styles.declare}>已选支付方式</Text>
      {/* 支付方式 */}
      <View style={styles.item}>
        <Image source={require('../i/unionpay.png')} style={styles.leftIcon} />
        <View style={styles.middleBox}>
          <Text style={styles.middleTitle}>银联支付</Text>
          <Text style={styles.middleTips}>1000 {'<'} 单笔 {'<'} 30000人民币，不限笔数</Text>
        </View>
      </View>
      {/* 注资金额 */}
      <Text style={styles.declare}>注资金额</Text>
      <View style={styles.money}>
        <View style={styles.moneyItem}><Text style={styles.moneyText}>￥1,500</Text></View>
        <View style={styles.moneyItem}><Text style={styles.moneyText}>￥3,000</Text></View>
        <View style={styles.moneyItem}><Text style={styles.moneyText}>￥6,000</Text></View>
        <View style={styles.moneyItem}><Text style={styles.moneyText}>￥15,000</Text></View>
      </View>
      <View style={styles.inputMoney}>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='请输入金额'
          placeholderTextColor='#94938F'
        />
        <Text style={styles.inputRMB}>¥</Text>
      </View>
      <Text style={styles.tips}>
        今日汇率<Text style={styles.tipsBlack}> 1 </Text>美元
         ≈<Text style={styles.tipsBlack}> 7.2059 </Text>人民币
         ≈<Text style={styles.tipsBlack}> 7.8000 </Text>港币
      </Text>
      <Text style={styles.result}>
        兑换后约到账<Text style={styles.tipsRed}> 0.00 </Text>美元
      </Text>
      <Button
        text='提交注资'
      />
    </View>
  )

}