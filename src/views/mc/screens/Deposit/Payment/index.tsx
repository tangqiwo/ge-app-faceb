/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/index.tsx
 * @Description:
 */
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity} from 'react-native';
import Button from '@this/components/Button'
import { LS } from './style';

const styles = LS.main;


export default () => {

  const [showContent, setShowContent] = useState(false);

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  return (
    <View style={styles.contenBox}>
      <View style={styles.raw}>
        <Image source={require('./i/pay.png')} style={styles.leftIcon} />
        <Text style={styles.title}>待付款</Text>
      </View>
      <Text style={styles.tips}>请在15分钟内完成支付并上传注资凭证</Text>
      <View style={styles.line}></View>
      {/* 信息确认 */}
      <Text style={styles.subheading}>注资信息确认</Text>
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.left}>订单号</Text>
          <Text style={styles.right}>D-0120240326-00005-CNY</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.left}>注资金额</Text>
          <Text style={styles.right}><Text style={styles.red}>0 </Text>人民币</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.left}>当前汇率</Text>
          <Text style={styles.right}>0.1384</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.left}>兑换后约到账</Text>
          <Text style={styles.right}><Text style={styles.red}>0 </Text>美元</Text>
        </View>
      </View>
      {/* 支付通道 */}
      <View style={styles.between}>
        <Text style={styles.subheading}>支付通道</Text>
        {/* 支付通道icon暫定 */}
        <Image source={require('./i/unionpay.png')} style={styles.rightIcon} />
      </View>
      <Text style={styles.content}>所有通过官网注册进行的投资交易资金，我司一经确认，即统一汇入公司指定对公账户。</Text>
      <View style={styles.line}></View>
      {/* 注意事项 */}
      <View style={styles.between}>
        <Text style={styles.subheading}>注意事项</Text>
        <TouchableOpacity onPress={toggleContent}>
          <Image 
            source={showContent ? require('./i/fold.png') : require('./i/unfold.png')} 
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>
      {showContent && (
        <Text style={styles.content}>
          1.本平台的交易币种为美元，因此客戶如通过网上支付系统进行人民币注资，将依当时的汇率进行支付。{'\n'}
          2.本支付系统只支持中国的银行卡。{'\n'}
          3.仅限使用本人银行卡或账户进行注资，否则资金将被原路退回。{'\n'}
          4.本公司确认到账后会添加款项到客戶的交易账号中。{'\n'}
          5.本公司暂不支持信用卡注资，若客戶使用信用卡支付导致注资不成功或其他直接或间接损失，本公司不承担任何责任。{'\n'}
          6.所有注资需在客戶完全清楚及自愿下作出，并清楚明白其相关之法律规范。{'\n'}
          7.*15分钟为平均到账时间，仅供参考。巨象将不对无法控制因素而导致的延迟负责。{'\n'}
        </Text>
      )}
      {/* 支付按鈕 */}
      <View style={styles.button}>
        <Button
          style={styles.cancel}
          text='取消支付'
        />
        <Button
          style={styles.next}
          text='去支付'
        />
      </View>
    </View>
  )

}