/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-29 15:41:46
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/AboutUs/index.tsx
 * @Description:
 */

import React from 'react';
import { View, Image, Text } from 'react-native';
import Header from '@this/components/Header';
import { LS as styles, GS } from './style';

export default () => {

  return (
    <View style={styles.container}>
      <Header title='关于我们' />
      <View style={styles.iconShadow}>
        <Image source={require('./i/logo.png')} style={styles.icon} />
      </View>
      <Text style={styles.versionText}>
        【版本 1.0.0】
      </Text>
      <View style={styles.content}>
        <View style={styles.title} >
          <Text style={styles.titleText}>关于巨象金业</Text>
        </View>
        <Text style={styles.contentText}>
          巨象金业有限公司，立足亚洲同时身为中国AAA级信用企业和全国3.15诚信企业，用互联网科技带给您最实时准确的交易报价，所有通过巨象交易的金银合约，建仓时前后1分钟内的成交价均可在汤森路透应产品报价范围内实时查询；独家出品巨象头条视频节目，为您呈现全球第一手财经资讯，助您在每日的交易决策中，抢占市场先机；我们使用亚马逊云、华为云、腾讯云等云端技术，保障所有用户数据安全性的同时，采用全球一流的交易平台-MT4，通过科技让您享有极致优惠的交易成本，让您的交易行为更快速、更简单。
        </Text>
        <Text style={styles.contentText}>
          巨象金业持有金银业贸易场AA类行员，可经营伦敦金、伦敦银、九九金、公斤条港元、人民币公斤条、港币999.9五两黄金及港币999.9十五公斤白银，专注为全球投资者提供全方位、高品质、一站式金融服务。
        </Text>
        <Text style={styles.contentText}>
          我们秉承这些理念，持续致力于付诸实践，希望通过科技为交易赋能，让您更好地享受投资乐趣。
        </Text>
      </View>
    </View>
  )

}