/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/Payment/index.tsx
 * @Description:
 */
import _ from 'lodash'
import React, { useState } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity} from 'react-native';
import { useLatest } from 'react-use';
import ExitPopup from '@this/components/ExitPopup';
import MyImage from '@core/templates/components/Base/Image';
import { useNavigationState, useNavigation, useRoute } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import usePublicState from '@core/hooks/usePublicState';
import Button from '@this/components/Button'
import usePayment from '@core/hooks/usePayment';
import { PAYMENT_TYPE_NAME } from '@hooks/useDeposit';
import Tips from '../components/Tips';
import { ChannelIcon, ChannelColor } from '../components/ChannelIcon';
import { LS, GS } from './style';

const styles = LS.main;


export default () => {

  const [ showExitAd, setShowExitAd ] = React.useState(false);
  const [extInfo, setExtInfo] = React.useState<any>({});
  const latestExtInfo = useLatest(extInfo);
  const routes = useNavigationState(state => state.routes);
  const { params } = useRoute<any>();
  const navigation = useNavigation<any>();
  const [showContent, setShowContent] = useState(true);
  const { dispatch, ACTIONS, isFocused, ossDomain } = usePublicState();
  const [ orderData, setOrderData ] = useState<any>(params);
  const { toPayment, showTips, setShowTips, countdownLabel } = usePayment({data: orderData});
  const actionType = React.useRef<'back' | 'cancel' | ''>();

  React.useEffect(() => {
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

  React.useEffect(() => {
    if(isFocused){
      dispatch(ACTIONS.PAYMENT.getPaymentCheck({cb: (res: any) => {
        if(res.Data?.IsHave){
          setOrderData({...res.Data?.Order, CutDown: res.Data?.CutDown, NowTime: _.now()});
        }
      }}))
    }
  }, [isFocused])

  const cancelDepositOrder = (orderId: number) => {
    dispatch(ACTIONS.PAYMENT.cancelDepositOrder({data: {Id: orderId}, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({text: '取消充值订单成功！', types: 'success'}));
      navigation.navigate('Deposit');
    }}))
  }

  const toggleContent = () => {
    setShowContent(!showContent);
  };

  const goBack = () => {
    const leastRoute = _.last(routes.filter(route => !route.name.includes('Deposit')));
    navigation.navigate(leastRoute.name)
  }

  const handleExit = () => {
    actionType.current = 'back'
    if(latestExtInfo.current.content){
      setShowExitAd(true);
      return;
    }
    goBack()
  }

  const handleCancel = () => {
    actionType.current = 'cancel'
    if(latestExtInfo.current.content){
      setShowExitAd(true);
      return;
    }
    cancelDepositOrder(params.Id)
  }

  return (
    <View style={styles.contenBox}>
      <View style={styles.raw}>
        <Image source={require('./i/pay.png')} style={styles.leftIcon} />
        <Text style={styles.title}>待付款</Text>
      </View>
      <Text style={styles.tips}>请在<Text style={{color: '#E3262A', fontWeight: 'bold'}}>{countdownLabel}</Text>内完成支付并上传注资凭证</Text>
      <View style={styles.line}></View>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.subheading}>注资信息确认</Text>
          <View style={styles.itemBox}>
            <View style={styles.item}>
              <Text style={styles.left}>订单号</Text>
              <Text style={styles.right}>{params.Id}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.left}>注资金额</Text>
              <Text style={styles.right}>
                <Text style={styles.red}>
                  { params.SourceAmount }
                </Text>
                { params.SourceCurrency === 'CNY' ? '人民币' : 'USDT' }
              </Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.left}>当前汇率</Text>
              <Text style={styles.right}>{params.ExchangeRate}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.left}>兑换后约到账</Text>
              <Text style={styles.right}><Text style={styles.red}>{params.Amount}</Text>美元</Text>
            </View>
          </View>
          {/* 支付通道 */}
          <View style={styles.channelName}>
            <Text style={styles.subheading}>支付通道</Text>
            {/* 支付通道icon暫定 */}
            <View style={{...styles.channelView, backgroundColor: ChannelColor[params.PaymentType]}}>
              <Image source={ChannelIcon[params.PaymentType]} style={styles.rightIcon} resizeMode='contain' />
              <Text style={styles.right}>{PAYMENT_TYPE_NAME[params.PaymentType]}</Text>
            </View>
          </View>
          <Text style={styles.content}>所有通过官网注册进行的投资交易资金，我司一经确认，即统一汇入公司指定对公账户。</Text>
          <View style={styles.line}></View>
          {/* 注意事项 */}
          <View style={styles.caption}>
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
        </ScrollView>
      </View>
      {/* 信息确认 */}
      {/* 支付按鈕 */}
      <View style={styles.button}>
        <Button
          style={styles.cancel}
          text='取消支付'
          onPress={handleCancel}
        />
        <Button
          style={styles.next}
          text='去支付'
          onPress={toPayment}
        />
      </View>
      <Tips
        display={showTips}
        close={() => setShowTips(null)}
      />
      <ExitPopup
        display={showExitAd}
        close={() => setShowExitAd(false)}
        exit={actionType.current === 'back' ? goBack : () => cancelDepositOrder(params.Id)}
        cancelText="继续注资"
        text={extInfo.content}
      >
        <MyImage width={GS.mixin.rem(170)} source={{uri: ossDomain + extInfo.image}} />
      </ExitPopup>
    </View>
  )

}