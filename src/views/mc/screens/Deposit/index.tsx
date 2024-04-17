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
import { useLatest } from 'react-use';
import ExitPopup from '@this/components/ExitPopup';
import useDeposit from '@core/hooks/useDeposit';
import { useNavigationState } from '@react-navigation/native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import usePublicState from '@core/hooks/usePublicState';
import { HeaderBackButton } from '@react-navigation/elements';
import MyImage from '@core/templates/components/Base/Image';
import Tips from './components/Tips';
import { ChannelIcon } from './components/ChannelIcon';
import { LS, GS } from './style';

const styles = LS.main;

export default () => {

  const useDepositHook = useDeposit();
  const { dispatch, ACTIONS, navigation, ossDomain} = usePublicState();
  const { channels, selectChannel, showTips, setShowTips, recommendChannel, tipText } = useDepositHook;
  const [ showExitAd, setShowExitAd ] = React.useState(false);
  const [extInfo, setExtInfo] = React.useState<any>({});
  const latestExtInfo = useLatest(extInfo);
  const routes = useNavigationState(state => state.routes);

  React.useEffect(() => {
    dispatch(ACTIONS.PAYMENT.getPaymentCheck({cb: (res: any) => {
      if(res.Data?.IsHave){
        navigation.navigate('Deposit-3', {...res.Data?.Order, CutDown: res.Data?.CutDown, NowTime: _.now(), ShowTips: true});
      }
    }}))

    navigation.setOptions({
      headerLeft: (props: any) => (
        <HeaderBackButton {...props} onPress={handleExit} />
      ),
      headerShown: true
    });
    dispatch(ACTIONS.BASE.commonRequest({
      uri: 'GetDialogTypeByDeposit/Select',
      cb: (response: any) => {
        if(response.Data.Status === 3 || response.Data.Dialog?.Count === 0){
          return;
        }
        if(response.Desc === '已有订单'){
          return;
        }
        setExtInfo({
          image: response.Data?.Dialog?.Data[0]?.BannerImg,
          content: JSON.parse(response.Data?.Dialog?.Data[0]?.Content)?.Content
        })
      }
    }))
  }, [])

  const goBack = () => {
    const leastRoute = _.last(routes.filter(route => !route.name.includes('Deposit')));
    navigation.navigate(leastRoute.name)
  }

  const handleExit = () => {
    if(latestExtInfo.current.content){
      setShowExitAd(true);
      return;
    }
    goBack()
  }

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
        <MyTouchableOpacity
          style={styles.item}
          activeOpacity={1}
          onPress={() => navigation.navigate('Deposit-hk')}
        >
          <Image source={require('./components/ChannelIcon/i/hkbank.png')} style={styles.leftIcon} resizeMode='contain' />
          <View style={styles.middleBox}>
            <View style={styles.middle}>
              <Text style={styles.middleTitle} numberOfLines={1}>香港银行电汇</Text>
            </View>
            <Text style={styles.middleTips}>
              单次最低入金550HKD
            </Text>
          </View>
          <Image source={require('./i/arrow.png')} style={styles.rightIcon} />
        </MyTouchableOpacity>
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
      <ExitPopup
        display={showExitAd}
        close={() => setShowExitAd(false)}
        exit={goBack}
        cancelText="继续注资"
        text={extInfo.content}
      >
        <MyImage width={GS.mixin.rem(170)} source={{uri: ossDomain + extInfo.image}} />
      </ExitPopup>
    </ScrollView>
  )

}