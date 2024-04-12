/*
 * @Author: Galen.GE
 * @Date: 2024-04-04 11:04:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Deposit/components/Tips/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { ScrollView, View, Image, Text} from 'react-native';
import Overlay from '@core/templates/components/Overlay';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import usePublicState from '@core/hooks/usePublicState';
import {TIPS_TYPE } from '@hooks/useDeposit';
import Button from '@this/components/Button';
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import { LS as styles } from './style';

interface IProps {
  display: TIPS_TYPE,
  close: () => void,
  channel?: any,
  selectChannel?: (channel: any) => void,
  tipText?: string
}
export default ({ display, close, channel, selectChannel, tipText }: IProps) => {

  const { customerService, navigation } = usePublicState();
  const { forward } = useRouteWebCommon();

  const isClose = _.includes([
    TIPS_TYPE.PENDING_TO_APPROVE,
    TIPS_TYPE.NOT_BIND_BANK_CARD
  ], display);

  const closeHOF = (fn: Function) => () => {
    fn();
    close();
  }

  // 去客服
  const toCustomerService = closeHOF(() => forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService}))

  // 去绑定ID卡
  const toBindIdCard = closeHOF(() => navigation.navigate('Profile'))

  // 去绑定银行卡
  const toBindBankCard = closeHOF(() => forward(FORWARD_TYPES['PAYMENT_SETTING']))

  // 使用推荐通道
  const toRecommendChannel = closeHOF(() => selectChannel(channel))

  return (
    <Overlay display={!!display}>
      <View style={styles.content}>
        {
          isClose &&
          <MyTouchableOpacity style={styles.close} onPress={close}>
            <Image source={require('./i/close.png')} style={styles.closeIcon} resizeMode='contain' />
          </MyTouchableOpacity>
        }
        <Text style={styles.title}>温馨提示</Text>
        <Text style={styles.prompt}>
          {
            display === TIPS_TYPE.PENDING_TO_APPROVE &&
            `已成功提交资料，请联络客服为您进行审批，完成即可使用优选通道进行注资`
          }
          {
            display === TIPS_TYPE.NOT_BIND_ID_CARD &&
            <Text>
              使用此支付需要提交身份证信息，审批完成后即可使用。{`\n`}
              {
                channel &&
                <Text>
                  如希望马上入金交易，可改用 <Text style={{color: '#E3262A'}}>{channel?.Name}</Text>
                </Text>
              }
            </Text>
          }
          {
            display === TIPS_TYPE.NOT_BIND_BANK_CARD &&
            <Text>
              使用此支付需要绑定银行卡信息，审批完成后即可使用。{`\n`}
              {
                channel &&
                <Text>
                  如希望马上入金交易，可改用 <Text style={{color: '#E3262A'}}>{channel?.Name}</Text>
                </Text>
              }
            </Text>
          }
          {
            display === TIPS_TYPE.NOT_BIND_VIRTUAL_WALLET &&
            <Text>
              使用此支付需要绑定相关钱包格式的地址{`\n`}
              绑定完成后即可使用
            </Text>
          }
          {
            display === TIPS_TYPE.SWITCH_PAYMENT_CHANNEL &&
            <Text>
              当前充值渠道存款的用户过多，已为您切换至<Text style={{color: '#E3262A'}}>{channel?.Name}</Text>进行存款支付
            </Text>
          }
          {
            display === TIPS_TYPE.PROCESSING_ORDER &&
            <Text>
              您已经提交过一笔充值订单，我们正在处理中。请稍后再试
            </Text>
          }
          {
            display === TIPS_TYPE.CONTACT_CUSTOMER_SERVICE &&
            <Text>
              尊敬的客户您好，您的注资请求已收到，我们将为您开通VIP贵宾通道专人处理，注资到账速度更快捷。
            </Text>
          }
          {
            display === TIPS_TYPE.CUSTOM_TIPS &&
            <Text>
              {tipText}
            </Text>
          }
          {
            display === TIPS_TYPE.TIMEOUT &&
            <Text>
              当前充值订单已超时，请重新提交充值订单
            </Text>
          }
          {
            display === TIPS_TYPE.GO_TO_UPLOAD_VOUCHER &&
            <Text>
              您有一笔未完成的订单，可点击去支付继续转账。如您已完成支付，请上传注资凭证。
            </Text>
          }
        </Text>
        <View style={styles.actions}>
          {
            _.includes([
              TIPS_TYPE.PENDING_TO_APPROVE,
              TIPS_TYPE.CONTACT_CUSTOMER_SERVICE,
            ], display)
            &&
            <Button text="联系客服" style={{...styles.button}} onPress={toCustomerService} />
          }
          {
            display === TIPS_TYPE.NOT_BIND_ID_CARD &&
            <>
              { channel &&<Button text="确定" style={{...styles.button, ...styles.cancel}} onPress={toRecommendChannel} /> }
              <Button text="立即绑定" style={{...styles.button}} onPress={toBindIdCard} />
            </>
          }
          {
            display === TIPS_TYPE.NOT_BIND_BANK_CARD &&
            <>
              { channel &&<Button text="确定" style={{...styles.button, ...styles.cancel}} onPress={toRecommendChannel} /> }
              <Button text="立即绑定" style={{...styles.button}} onPress={toBindBankCard} />
            </>
          }
          {
            display === TIPS_TYPE.NOT_BIND_VIRTUAL_WALLET &&
            <Button text="立即绑定" style={{...styles.button}} onPress={toBindBankCard} />
          }
          {
            _.includes([TIPS_TYPE.CUSTOM_TIPS, TIPS_TYPE.SWITCH_PAYMENT_CHANNEL], display) &&
            <>
              <Button text="确定" style={{...styles.button}} onPress={close} />
            </>
          }
          {
            _.includes([TIPS_TYPE.TIMEOUT], display) &&
            <>
              <Button text="确定" style={{...styles.button}} onPress={() => {close(), navigation.navigate('Deposit')}} />
            </>
          }
          {
            display === TIPS_TYPE.GO_TO_UPLOAD_VOUCHER &&
            <>
              <Button text="继续支付" style={{...styles.button, ...styles.cancel}} onPress={close} />
              <Button text="上传凭证" style={{...styles.button}} onPress={() => {close(), navigation.navigate('Deposit-4')}} />
            </>
          }
        </View>
      </View>
    </Overlay>
  )

}