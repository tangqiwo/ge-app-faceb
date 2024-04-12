/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/index.tsx
 * @Description:
 */
import _ from 'lodash'
import React from 'react';
import { ScrollView, View, Image, Text} from 'react-native';
import useDeposit from '@core/hooks/useDeposit';
import { useNavigationState } from '@react-navigation/native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import usePublicState from '@core/hooks/usePublicState';
import { HeaderBackButton } from '@react-navigation/elements';
import Tips from './components/Tips';
import { ChannelIcon } from './components/ChannelIcon';
import { LS } from './style';

const styles = LS.main;

export default () => {

  const useDepositHook = useDeposit();
  const { dispatch, ACTIONS, navigation} = usePublicState();
  const { channels, selectChannel, showTips, setShowTips, recommendChannel, tipText } = useDepositHook;
  const routes = useNavigationState(state => state.routes);

  React.useEffect(() => {
    dispatch(ACTIONS.PAYMENT.getPaymentCheck({cb: (res: any) => {
      if(res.Data?.IsHave){
        navigation.navigate('Deposit-3', {...res.Data?.Order, CutDown: res.Data?.CutDown, NowTime: _.now(), ShowTips: true});
      }
    }}))
    const leastRoute = _.last(routes.filter(route => !route.name.includes('Deposit')));
    navigation.setOptions({
      headerLeft: (props: any) => (
        <HeaderBackButton {...props} onPress={() => navigation.navigate(leastRoute.name)} />
      ),
      headerShown: true
    });
  }, [])

  return (
    <ScrollView style={styles.contenBox}>
      <View>
        <Text style={styles.declare}>请选择支付方式</Text>
        <Text style={styles.declareConetnt}>本平台的交易币种为美元，因此客户如通过网上支付系统进行人民币注资，将依当时的汇率进行支付。</Text>
      </View>
      {/* 支付方式 */}
      <View style={styles.itemBox}>
        {
          channels && channels.map((item: any) =>
            <MyTouchableOpacity
              key={item.Id}
              style={styles.item}
              activeOpacity={1}
              onPress={() => selectChannel(item)}
            >
              <Image source={ChannelIcon[item.PaymentType]} style={styles.leftIcon} resizeMode='contain' />
              <View style={styles.middleBox}>
                <View style={styles.middle}>
                  <Text style={styles.middleTitle} numberOfLines={1}>{item.Name}</Text>
                  {
                    item.Recommend && <Image source={require('./i/recommend.png')} style={styles.recommend} />
                  }
                </View>
                <Text style={styles.middleTips}>
                  {
                    `${item.TradingMin} ≤ 单笔 ≤ ${item.TradingMax}，不限笔数`
                  }
                </Text>
              </View>
              <Image source={require('./i/arrow.png')} style={styles.rightIcon} />
            </MyTouchableOpacity>
          )
        }
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
      <Tips
        display={showTips}
        close={() => setShowTips(null)}
        selectChannel={selectChannel}
        channel={recommendChannel}
        tipText={tipText}
      />
    </ScrollView>
  )

}