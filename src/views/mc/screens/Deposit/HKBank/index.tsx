/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/HKBank/index.tsx
 * @Description:
 */
import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import usePublicState from '@core/hooks/usePublicState';
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import Button from '@this/components/Button'
import { LS } from './style';

const styles = LS.main;

export default () => {

  const { dispatch, ACTIONS, customerService } = usePublicState();
  const { forward } = useRouteWebCommon();

  const handleCopy = (content: string) => {
    Clipboard.setString(content);
    dispatch(ACTIONS.BASE.openToast({text: `已复制 ${content}`}))
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.contenBox}>
      <Text style={styles.mainTitle}>香港银行电汇</Text>
      <Text style={styles.redTips}>客户透过所在地区的银行汇款到本公司以下的香港银行户口，在我们的银行账户收到资金后，将会在一个工作日内将资金存入您的交易账户。 单次最低入金550HKD。</Text>
      {/* 收款信息 */}
      <Text style={styles.title}>收款信息</Text>
      {/* 收款账号 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>收款账号</Text>
          <Text style={styles.itemContent}>809-673133-051</Text>
        </View>
        <TouchableOpacity onPress={() => handleCopy('809-673133-051')}>
          <Image source={require('./i/copy.png')} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
      {/* 收款人姓名 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>收款人姓名</Text>
          <Text style={styles.itemContent}>GOLD ELEPHANT LIMITED</Text>
        </View>
        <TouchableOpacity onPress={() => handleCopy('GOLD ELEPHANT LIMITED')}>
          <Image source={require('./i/copy.png')} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
      {/* 转账附言 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <View style={styles.raw}>
            <Text style={styles.itemTitle}>转账附言</Text>
            <Text style={styles.itemTips}>（必填）</Text>
          </View>
          <Text style={styles.itemContent}>提供全名及MT4账号</Text>
        </View>
      </View>
      {/* 收款行SWIFI代码 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>收款行SWIFI代码</Text>
          <Text style={styles.itemContent}>WIHBHKHH</Text>
        </View>
        <TouchableOpacity onPress={() => handleCopy('WIHBHKHH')}>
          <Image source={require('./i/copy.png')} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
      {/* 收款人地址 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>收款人地址</Text>
          <Text style={styles.itemContent}>RM 1004, 10/F, Podium Plaza, 5 Hanoi Road, Tsim Sha Tsui, KL, Hong Kong</Text>
        </View>
        <TouchableOpacity onPress={() => handleCopy('RM 1004, 10/F, Podium Plaza, 5 Hanoi Road, Tsim Sha Tsui, KL, Hong Kong')}>
          <Image source={require('./i/copy.png')} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
      {/* 收款银行 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>收款银行</Text>
          <Text style={styles.itemContent}>OCBC Bank (Hong Kong) Limited</Text>
        </View>
        <TouchableOpacity onPress={() => handleCopy('OCBC Bank (Hong Kong) Limited')}>
          <Image source={require('./i/copy.png')} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
      {/* 银行代码 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>银行代码</Text>
          <Text style={styles.itemContent}>035</Text>
        </View>
        <TouchableOpacity onPress={() => handleCopy('035')}>
          <Image source={require('./i/copy.png')} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
      {/* 银行地址 */}
      <View style={styles.itemBox}>
        <View style={styles.item}>
          <Text style={styles.itemTitle}>银行地址</Text>
          <Text style={styles.itemContent}>161 Queen’s Road Central, Hong Kong</Text>
        </View>
        <TouchableOpacity onPress={() => handleCopy('161 Queen’s Road Central, Hong Kong')}>
          <Image source={require('./i/copy.png')} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>

      <Button
        style={styles.button}
        text='我已汇款'
        onPress={() => forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService})}
      />
      <Text style={styles.buttonTips}>*请联系在线客服上传支付凭证</Text>

      {/* 注意事项 */}
      <Text style={styles.infoTitle}>注意事项</Text>
      <Text style={styles.info}>
        1. 巨象不接受通过现金、支票及未指定的第三方支付平台存入资金。{'\n'}
        2. 巨象不收取电汇手续费。然而您的银行可能会收取一定手续费。{'\n'}
        3.上述收款信息专属于您个人，请勿向他人透露。{'\n'}
      </Text>
      <Text style={styles.infoTitle}>免责声明</Text>
      <Text style={styles.info}>
        1. 不同银行在购汇和汇款中会收取不同的手续费，此等费用需要客户自行承担。{'\n'}
        2. 汇款处理时间供参考，巨象将不对无法控制因素而导致的延迟负责。{'\n'}
        3. 购汇额度及汇款用途请参照国家外汇管理局相关规定。若有任何疑问，请向国家外汇管理局或您的银行查询。{'\n'}
        4. 请确保您本人为账户资金的合法所有人，并保证该资金的来源及用途合法。您亦需确保存入资金、货币兑换等流程符合您所在国家或地区的法律法规。{'\n'}
      </Text>
    </ScrollView>
  )

}