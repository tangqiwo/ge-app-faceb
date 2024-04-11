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
  selectChannel: (channel: any) => void
}
export default ({ display, close }: IProps) => {

  const { customerService } = usePublicState();
  const { forward } = useRouteWebCommon();

  const isClose = _.includes([
    TIPS_TYPE.PENDING_TO_APPROVE,
    TIPS_TYPE.NOT_BIND_BANK_CARD
  ], display);

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
              如希望马上入金交易，可改用 <Text style={{color: '#E3262A'}}>微信支付</Text>
            </Text>
          }
          {
            display === TIPS_TYPE.NOT_BIND_BANK_CARD &&
            <Text>
              使用此支付需要绑定银行卡信息，审批完成后即可使用。{`\n`}
              如希望马上入金交易，可改用 <Text style={{color: '#E3262A'}}>微信支付</Text>
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
            display === TIPS_TYPE.SUBMIT_FAILED &&
            <Text>
              原使用 银联支付 存款的用户过多，已为您切换至 微信支付 进行存款支付
            </Text>
          }
        </Text>
        <View style={styles.actions}>
          <Button
            text="取消"
            style={{...styles.button, ...styles.cancel}}
            onPress={close}
          />
          <Button
            text="联系客服"
            style={{...styles.button}}
            onPress={() => forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService})}
          />
        </View>
      </View>
    </Overlay>
  )

}