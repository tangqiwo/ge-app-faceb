/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Image, Text} from 'react-native';
import { LS } from './style';

const styles = LS.main;

export default () => {

  return (
    <View style={styles.contenBox}>
      <View>
        <Text style={styles.declare}>请选择支付方式</Text>
        <Text style={styles.declareConetnt}>本平台的交易币种为美元，因此客户如通过网上支付系统进行人民币注资，将依当时的汇率进行支付。</Text>
      </View>
      {/* 支付方式 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Image source={require('./i/unionpay.png')} style={styles.leftIcon} />
          <View style={styles.middleBox}>
            <View style={styles.middle}>   
              <Text style={styles.middleTitle}>银联支付</Text>
              <Image source={require('./i/recommend.png')} style={styles.recommend} />
            </View>
            <Text style={styles.middleTips}>网银转账，15分钟到账</Text>
          </View>
          <Image source={require('./i/arrow.png')} style={styles.rightIcon} />
        </View>
        <View style={styles.item}>
          <Image source={require('./i/alipay.png')} style={styles.leftIcon} />
          <View style={styles.middleBox}>
            <View style={styles.middle}>   
              <Text style={styles.middleTitle}>支付宝支付</Text>
            </View>
            <Text style={styles.middleTips}>扫码转账，方便快捷</Text>
          </View>
          <Image source={require('./i/arrow.png')} style={styles.rightIcon} />
        </View>
      </View>
      {/* 温馨提示 */}
      <View>
        <Text style={styles.middleTitle}>温馨提示</Text>
        <Text style={styles.prompt}>
          1.如需大额注资请事先联系24小时
          <Text style={styles.tips}> 在线客服</Text>
          ，我们将竭诚为您提供专属贵宾支付通道，确保您的大额资金尽快到账。{'\n'}
          2.实际兑换汇率和金额请以支付平台的最终交易结果显示为准。{'\n'}
          3.请在15分钟内完成注资操作，逾时可能导致操作失败，如遇以上情况请联络客服。{'\n'}
        </Text>
      </View>
    </View>
  )

}