/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-27 12:20:08
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Register/Guide/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Header from '@this/components/Header';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { LS as styles, GS } from './style';

export default () => {

  const { width } = Dimensions.get('window');
  const { navigation } = usePublicState();

  return (
    <View style={styles.container}>
      <Header title='开户' />
      <View style={styles.banner}>
        <Carousel
          layout='default'
          vertical={false}
          sliderWidth={width}
          itemWidth={GS.mixin.rem(319)}
          data={Images}
          enableSnap={true}
          firstItem={1}
          renderItem={({ item }: any) =>
            <Image style={{width: GS.mixin.rem(319), height: GS.mixin.rem(179)}} source={item} />
          }
        />
      </View>
      <View style={styles.contents}>
        <View style={styles.titleView}>
          <Image style={styles.titleIcon} source={require('./i/icon-king.png')} />
          <Text style={styles.titleText}>选择巨象金业五大优势</Text>
        </View>
        <View style={styles.ads}>
          <View style={styles.ad}>
            <Image style={styles.adIcon} source={require('./i/icon-01.png')} />
            <Text style={styles.adText}>{`金银业贸易场\n权威监管`}</Text>
          </View>
          <View style={styles.ad}>
            <Image style={styles.adIcon} source={require('./i/icon-02.png')} />
            <Text style={styles.adText}>{`超低点差\n交易回赠`}</Text>
          </View>
          <View style={styles.ad}>
            <Image style={styles.adIcon} source={require('./i/icon-03.png')} />
            <Text style={styles.adText}>{`金牌分析师\n每日策略`}</Text>
          </View>
        </View>
        <View style={{...styles.ads, justifyContent: 'space-evenly'}}>
          <View style={styles.ad}>
            <Image style={styles.adIcon} source={require('./i/icon-04.png')} />
            <Text style={styles.adText}>{`在线客服\n全年无休`}</Text>
          </View>
          <View style={styles.ad}>
            <Image style={styles.adIcon} source={require('./i/icon-05.png')} />
            <Text style={styles.adText}>{`出入金可靠\n投资无忧`}</Text>
          </View>
        </View>
        <MyTouchableOpacity style={styles.submitView} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.submitText}>极速开户</Text>
        </MyTouchableOpacity>
        <View style={styles.login}>
          <Text style={styles.agreementText}>已有账号？
          </Text>
          <MyTouchableOpacity style={{borderBottomColor: '#FFC600', borderBottomWidth: 1}} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.agreementTextLink}>立即登录</Text>
          </MyTouchableOpacity>
        </View>
      </View>
     </View>
  )

}

const Images = [
  require('./i/banner0.png'),
  require('./i/banner.png'),
  require('./i/banner2.png')
]