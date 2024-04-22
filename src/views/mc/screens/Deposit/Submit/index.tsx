/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/Submit/index.tsx
 * @Description:
 */
import _, { set } from 'lodash'
import React from 'react';
import { View, Image, Text, TextInput, ScrollView} from 'react-native';
import usePublicState from '@core/hooks/usePublicState';
import { useRoute } from '@react-navigation/native';
import Selector from '@core/templates/components/Base/Selector';
import Button from '@this/components/Button'
import { LS } from './style';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { ChannelIcon, ChannelColor } from '../components/ChannelIcon';
import { formatMoney } from '@helpers/unit';

const styles = LS.main;

export default () => {

  const { params } = useRoute<any>();
  const { currentChannel } = params;
  const { dispatch, ACTIONS } = usePublicState();
  const [ money, setMoney ] = React.useState('');
  const [ usdt, setUsdt ] = React.useState('');
  const [ wallet, setWallet ] = React.useState(params.virtualWallet[0]?.Address || '');
  const [ BankCard, setBankCard ] = React.useState(params.bankCards[0]?.Id || '');
  const [ agree, setAgree ] = React.useState(false);
  const [ prize, setPrize ] = React.useState({pay: 200, get: 310});

  const unit = currentChannel.PaymentType.includes('VirtualCurrency') ? 'USDT' : '人民币';

  const handleSubmit = () => {
    if(_.includes(['AliPay', 'WeChat'], currentChannel.PaymentType) && !agree){
      dispatch(ACTIONS.BASE.openToast({text: '请先同意上述条款'}));
      return;
    }
    params.submitDeposit({ amount: money || usdt, bankId: BankCard, virtualAddress: wallet })
  }

  React.useEffect(() => {
    if(!money && !usdt){
      setPrize({pay: 200, get: 310});
      return;
    }
    const _money = Number(money) || Number(usdt);
    if(_money < 3000){
      setPrize({pay: 200, get: 310});
      return;
    }
    if(_money < 15000){
      setPrize({pay: 800, get: 1020});
      return;
    }
    setPrize({pay: 2000, get: 2550});
  }, [money, usdt])

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.ad}>
          <Image source={require('./i/ad.png')} style={styles.adImage} />
          <Text style={styles.adText}>24小时内首充 <Text style={styles.tipsRed}>${prize.pay}</Text> 到账 <Text style={styles.tipsRed}>${prize.get}</Text></Text>
        </View>
        <View style={styles.contenBox}>
          <Text style={styles.declare}>已选支付方式</Text>
          {/* 支付方式 */}
          <View style={{...styles.item, backgroundColor: ChannelColor[currentChannel.PaymentType]}}>
            <Image source={ChannelIcon[currentChannel.PaymentType]} style={styles.leftIcon} resizeMode='contain' />
            <View style={styles.middleBox}>
              <Text style={styles.middleTitle}>{currentChannel.Name}</Text>
              <Text style={styles.middleTips}>
                {`${currentChannel.TradingMin} ≤ 单笔 ≤ ${currentChannel.TradingMax} ${unit}，不限笔数`}
              </Text>
            </View>
          </View>
          {/* 注资金额 */}
          <Text style={styles.declare}>注资金额</Text>
          {
            _.includes([
              'BankCard',
              'AliPay',
              'WeChat',
              'DigitalRMB'
            ], currentChannel.PaymentType) &&
            <MoneyInput money={money} setMoney={setMoney} bankCard={BankCard} setBankCard={setBankCard} />
          }
          {
            _.includes([
              'VirtualCurrency:USDT:TRC20',
              'VirtualCurrency:USDT:ERC20'
            ], currentChannel.PaymentType) &&
            <USDTInput usdt={usdt} setUsdt={setUsdt} wallet={wallet} setWallet={setWallet} />
          }
          <View style={{marginBottom: 20}}>
            {
              _.includes([
                'BankCard',
                'DigitalRMB'
              ], currentChannel.PaymentType) &&
              <Text style={styles.descText}>
                *所有通过官网注册进行的投资交易资金，我司一经确认，即统一汇入公司指定对公账户。
              </Text>
            }
            {
              _.includes([
                'AliPay',
                'WeChat'
              ], currentChannel.PaymentType) &&
              <>
                <Text style={styles.descText}>
                  *实名注资提醒：根据国际反洗黑钱条例，请您务必使用本人微信/支付宝账户进行注资，如您使用非本人的第三方账户注资，我司将保留法律追究权利并冻结相关账户不予取款，投资者风险自负。
                </Text>
                <MyTouchableOpacity style={styles.descView} onPress={() => setAgree(!agree)}>
                  {
                    agree ?
                    <Image source={require('./i/checked.png')} style={styles.checkIcon} resizeMode='contain' /> :
                    <Image source={require('./i/uncheck.png')} style={styles.checkIcon} resizeMode='contain' />
                  }
                  <Text>我已阅读并同意上述条款</Text>
                </MyTouchableOpacity>
              </>
            }
          </View>
          <Button
            text='提交注资'
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </View>
  )

}

export const MoneyInput = ({ money, setMoney, bankCard, setBankCard }: any) => {

  const { params } = useRoute<any>();
  const { rate } = params;

  // 快捷金额
  const quickMoney = ['1500', '3000', '6000', '15000'];

  React.useEffect(() => {
    // 必须输入整数
    if(money.split('.')[1]){
      setMoney(money.split('.')[0]);
      return;
    }
  }, [money])


  // 生成显示银行卡的信息
  const makeBankCardInfo = (card: any) => {
    // 保留前四位和后四位，中间用*代替
    const cardNumber = `${card.BankCardNo.slice(0, 4)} **** **** ${card.BankCardNo.slice(-4)}`;
    const bankName = `(${card.BankName})`;
    return `${cardNumber} ${bankName}`;
  }

  return (
    <>
      <View style={styles.money}>
        {
          quickMoney.map((item, index) => (
            <MyTouchableOpacity key={index} style={[styles.moneyItem, item == money && styles.moneyItemActive]} onPress={() => setMoney(item)}>
              <Text style={styles.moneyText}>￥{formatMoney(item)}</Text>
            </MyTouchableOpacity>
          ))
        }
      </View>
      <View style={styles.inputMoney}>
        <TextInput
          value={money}
          onChange={(e: any) => setMoney(e.nativeEvent.text)}
          style={styles.input}
          keyboardType='numeric'
          placeholder='请输入金额'
          placeholderTextColor='#94938F'
        />
        <Text style={styles.inputRMB}>¥</Text>
      </View>
      <Text style={styles.tips}>
        今日汇率<Text style={styles.tipsBlack}> 1 </Text>美元
        ≈<Text style={styles.tipsBlack}> {rate.UsdToCny} </Text>人民币
      </Text>
      <Text style={styles.result}>
        兑换后约到账<Text style={styles.tipsRed}>{formatMoney((money || 0) * rate.CnyToUsd)}</Text>美元
      </Text>
      {
        params.currentChannel.UserActivateBankCard &&
        params.currentChannel.PaymentType === 'BankCard' &&
        <DataSelector
          data={bankCard}
          setData={setBankCard}
          title="请选择银行卡"
          dataset={_.map(params.bankCards, (i: any) => ({key: i.Id, value: makeBankCardInfo(i)}))}
        />
      }
    </>
  )
}

const USDTInput = ({ usdt, setUsdt, wallet, setWallet }: any) => {

  const { params } = useRoute<any>();

  // 快捷金额
  const quickMoney = ['200', '800', '2000', '10000'];

  React.useEffect(() => {
    // 必须输入整数
    if(usdt.split('.')[1]){
      setUsdt(usdt.split('.')[0]);
      return;
    }
  }, [usdt])

  return (
    <>
      <View style={styles.money}>
        {
          quickMoney.map((item, index) => (
            <MyTouchableOpacity key={index} style={[styles.moneyItem, item == usdt && styles.moneyItemActive]} onPress={() => setUsdt(item)}>
              <Text style={styles.moneyText}>${formatMoney(item)}</Text>
            </MyTouchableOpacity>
          ))
        }
      </View>
      <View style={styles.inputMoney}>
        <TextInput
          value={usdt}
          onChange={(e: any) => setUsdt(e.nativeEvent.text)}
          style={styles.input}
          keyboardType='numeric'
          placeholder='请输入数量'
          placeholderTextColor='#94938F'
        />
        <Text style={styles.inputRMB}>USDT</Text>
      </View>
      <Text style={styles.tips}>
        今日汇率<Text style={styles.tipsBlack}> 1 </Text>USDT
        ≈<Text style={styles.tipsBlack}> 1 </Text>美元
      </Text>
      <Text style={styles.result}>
        兑换后约到账<Text style={styles.tipsRed}>{formatMoney(usdt)}</Text>美元
      </Text>
      <DataSelector
        data={wallet}
        setData={setWallet}
        title="请选择钱包地址"
        dataset={_.map(params.virtualWallet, (i: any) => ({key: i.Address, value: i.Address}))}
      />
    </>
  )
}

const DataSelector = ({ dataset, data, setData, title }: any) => {
  return (
    <View>
      <Text style={styles.declare}>{title}</Text>
      <MyTouchableOpacity style={styles.inputMoney}>
        <Selector
          style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}
          title={title}
          value={data}
          options={dataset}
          cb={(value: string) => setData(value)}
        />
      </MyTouchableOpacity>

    </View>
  )

}