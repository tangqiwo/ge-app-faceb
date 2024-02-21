/*
 * @Author: Galen.GE
 * @Date: 2024-02-20 15:04:21
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/Confirm.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, Image } from "react-native";
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { ALL_TYPE_LIST } from '@core/hooks/trade/useTradeManager';
import Button from '@this/components/Button';
import Overlay from '@core/templates/components/Overlay';
import { LS as styles } from './style';

interface IProps {
  close: () => void;
  submit: () => void;
  payload: any
}
export default ({ close, submit, payload }: IProps) => {

  const {
    Symbol,
    Operation,
    Volume,
    Stoploss,
    Takeprofit,
  } = payload;

  return (
    <Overlay display>
      <View style={styles.confirmView}>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmTitle}>交易产品：</Text>
          <Text style={styles.confirmContent}>{Symbol}</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmTitle}>建仓类型：</Text>
          <Text style={styles.confirmContent}>{_.find(ALL_TYPE_LIST, {key: Operation}).value}</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmTitle}>交易手数：</Text>
          <Text style={styles.confirmContent}>{Volume}手</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmTitle}>止盈：</Text>
          <Text style={styles.confirmContent}>{Takeprofit || '未设置'}</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmTitle}>止损：</Text>
          <Text style={styles.confirmContent}>{Stoploss || '未设置'}</Text>
        </View>
        <Button
          style={styles.submit}
          textStyle={{color: '#E7CC8F'}}
          text="确认提交"
          onPress={submit}
        />
      </View>
      <MyTouchableOpacity onPress={close}>
        <Image source={require('./i/icon-close.png')} style={{width: 35, height: 35, marginTop: 20, marginLeft: 'auto', marginRight: 'auto'}} />
      </MyTouchableOpacity>
    </Overlay>
  )

}