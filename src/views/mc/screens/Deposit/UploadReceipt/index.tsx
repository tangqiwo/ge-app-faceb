/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/UploadReceipt/index.tsx
 * @Description:
 */
import _ from 'lodash'
import React from 'react';
import useUploadOss from '@core/hooks/useUploadOss';
import { useLatest } from 'react-use';
import {launchImageLibrary} from 'react-native-image-picker';
import { ScrollView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Button from '@this/components/Button'
import usePublicState from '@core/hooks/usePublicState';
import { TransDemo } from '../components/ChannelIcon';
import Popup from '@core/templates/components/Popup';
import ExitPopup from '@this/components/ExitPopup';
import MyImage from '@core/templates/components/Base/Image';
import { LS, GS } from './style';
import dayjs from 'dayjs';

const styles = LS.main;

export default () => {

  const { uploadOss } = useUploadOss();
  const [ showExitAd, setShowExitAd ] = React.useState(false);
  const { dispatch, ACTIONS, isFocused, navigation, ossDomain } = usePublicState();
  const [ orderData, setOrderData ] = React.useState<any>(null);
  const [ transactionNo, setTransactionNo ] = React.useState('');
  const [ receiptImage, setReceiptImage ] = React.useState(null);
  const [ showDemo, setShowDemo ] = React.useState(false);
  const [extInfo, setExtInfo] = React.useState<any>({});
  const latestExtInfo = useLatest(extInfo);

  React.useEffect(() => {
    if(isFocused){
      dispatch(ACTIONS.BASE.openLoading());
      dispatch(ACTIONS.PAYMENT.getPaymentCheck({cb: (res: any) => {
        dispatch(ACTIONS.BASE.closeLoading());
        if(res.Data?.IsHave){
          setOrderData({...res.Data?.Order, CutDown: res.Data?.CutDown, NowTime: _.now()});
        }else{
          dispatch(ACTIONS.BASE.openToast({text: '暂无订单数据'}));
          navigation.navigate('Deposit');
        }
      }}))
    }
  }, [isFocused])

  React.useEffect(() => {
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

  const selectImage = async () => {
    const options: any = {
    };
    const result = await launchImageLibrary(options);
    uploadOss(result.assets[0], 'bank_card', (path: string) => {
      setReceiptImage({...result.assets[0], path})
    })
  };

  const cancelDepositOrder = (orderId: number) => {
    dispatch(ACTIONS.PAYMENT.cancelDepositOrder({data: {Id: orderId}, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({text: '取消充值订单成功！', types: 'success'}));
      navigation.navigate('Deposit');
    }}))
  }

  const submitReceipt = () => {
    if(!receiptImage){
      dispatch(ACTIONS.BASE.openToast({text: '请上传凭证'}));
      return;
    }
    if(orderData?.SourceCurrency === 'USDT' && !transactionNo){
      dispatch(ACTIONS.BASE.openToast({text: '请输入HASH值'}));
      return;
    }
    const data ={
      Id: orderData.Id,
      PayDoc: receiptImage.path,
      TransactionNo: transactionNo,
    }
    dispatch(ACTIONS.PAYMENT.updateDeposit({data, cb: (res: any) => {
      navigation.replace('Deposit-5');
    }}))
  }

  const handleCancel = () => {
    if(latestExtInfo.current.content){
      setShowExitAd(true);
      return;
    }
    cancelDepositOrder(orderData.Id)
  }

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
        {
          orderData?.SourceCurrency === 'USDT' &&
          <View style={styles.extInfos}>
            <View>
              <Text style={styles.subheading}>已选择钱包地址</Text>
              <View style={styles.inputMoney}>
                <Text>
                 { orderData?.PaymentAddress }
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.subheading}>HASH</Text>
              <View style={styles.inputMoney}>
                <TextInput
                  value={transactionNo}
                  onChange={(e: any) => setTransactionNo(e.nativeEvent.text)}
                  style={styles.input}
                  placeholder='请输入HASH值'
                  placeholderTextColor='#94938F'
                />
              </View>
            </View>
          </View >
        }
        {
          orderData?.PaymentType === 'BankCard' && orderData.PaymentAddress &&
          <View style={styles.extInfos}>
            <View>
              <Text style={styles.subheading}>已选择的银行卡</Text>
              <View style={styles.inputMoney}>
                <Image source={require('./i/icon-bank.png')} style={styles.bankIcon} resizeMode='contain' />
                <Text>
                  { `${orderData.PaymentAddress.slice(0, 4)} **** **** ${orderData?.PaymentAddress.slice(-4)}(${orderData.PaymentName})` }
                </Text>
              </View>
            </View>
          </View>
        }
        {/* 上传注资凭证 */}
        <View style={styles.upload}>
          <Text style={styles.subheading}>上传注资凭证</Text>
          <TouchableOpacity style={styles.uploadbg} onPress={selectImage}>
            {
              receiptImage ?
              <Image style={{width: '100%', height: '100%'}} source={{uri: receiptImage.uri}} resizeMode='contain' /> :
              <Image source={require('./i/upload.png')} style={styles.icon} />
            }
          </TouchableOpacity>
          <Text style={styles.uploadtips} onPress={() => setShowDemo(true)}>查看示例</Text>
        </View>
        {/* 注资信息 */}
        {
          orderData &&
          <View style={styles.box}>
            <Text style={styles.subheading}>注资信息</Text>
              <View style={styles.itemBox}>
                <View style={styles.item}>
                  <Text style={styles.left}>订单号</Text>
                  <Text style={styles.right}>{orderData.Id || '----'}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.left}>支付方式</Text>
                  <Text style={styles.right}>{JSON.parse(orderData.ExtraChannelConfig)?.ChannelName}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.left}>注资金额</Text>
                  <Text style={styles.right}>
                    <Text style={styles.red}>
                      {orderData.SourceAmount}
                    </Text>
                      { orderData.SourceCurrency === 'CNY' ? '人民币' : 'USDT'}
                  </Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.left}>当前汇率</Text>
                  <Text style={styles.right}>{orderData.ExchangeRate}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.left}>兑换后约到账</Text>
                  <Text style={styles.right}><Text style={styles.red}>{orderData.Amount}</Text>美元</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.left}>注资时间</Text>
                  <Text style={styles.right}>{dayjs(orderData.CreatedAt).format('YYYY-MM-DD HH:mm:ss')}</Text>
                </View>
            </View>
          </View>
        }
      </ScrollView>
      {/* 提交按鈕 */}
      <View style={[styles.button, styles.box]}>
        <Button
          style={styles.cancel}
          text='取消支付'
          onPress={handleCancel}
        />
        <Button
          style={styles.next}
          text='提交凭证'
          onPress={submitReceipt}
        />
      </View>
      {
        showDemo && orderData &&
        <Popup display top={0} title='示例' close={() => setShowDemo(false)} isFull>
          <Image source={TransDemo[orderData.PaymentType]} style={{width: '100%', height: '100%'}} resizeMode='contain' />
        </Popup>
      }
      <ExitPopup
        display={showExitAd}
        close={() => setShowExitAd(false)}
        exit={() => cancelDepositOrder(orderData.Id)}
        cancelText="继续注资"
        text={extInfo.content}
      >
        <MyImage width={GS.mixin.rem(170)} source={{uri: ossDomain + extInfo.image}} />
      </ExitPopup>
    </View>
  )

}