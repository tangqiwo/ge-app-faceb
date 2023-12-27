/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-10-10 20:10:46
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/components/DebugModal/DataAnalyzer.tsx
 * @Description: 用户发送的 BUG 信息解析
 */
import React from "react";
import useFeedback from "@core/hooks/useFeedback";
import { Text, StyleSheet, ScrollView } from 'react-native';
import { Input, Button } from '@ui-base/index';
import Popup, { PopupContent, PopupActions } from '@views/mc/shadow/Popup';
import GS from '@views/mc/styles/index';

interface IProps{
  close: Function
}
export default ({ close }: IProps) => {

  const [userData, setUserData] = React.useState('');
  const { decodeUserData, decode } = useFeedback();

  return (
    <Popup display={true} title="数据反向解析" close={close} isFull wrapperType="View">
      <PopupContent isFull>
        <Text style={style.headerText}>填写用户数据特征码</Text>
        <Input
          placeholder="请粘贴用户的数据特征码"
          style={style.input}
          value={userData}
          onChange={(value: string) => setUserData(value)}
          multiline
        />
        {
          decode &&
          <ScrollView showsVerticalScrollIndicator={false}  style={{flex: 1, marginTop: 10, paddingTop: 10, borderTopColor: GS.var.colors.gray[200], borderTopWidth: 1}}>
            <Text style={style.headerText}>解析数据内容</Text>
            <Text style={style.text} selectable>
              {decode}
            </Text>
          </ScrollView>
        }
      </PopupContent>
      <PopupActions>
        <Button
          style={style.button}
          textStyle={{letterSpacing: 0, fontSize: 14}}
          text="分析数据"
          action={() => decodeUserData(userData)}
        />
      </PopupActions>
    </Popup>
  )

}


const style = StyleSheet.create({
  headerText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: GS.var.colors.gray[500],
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    fontSize: 12,
    color: GS.var.colors.secondary[600],
    lineHeight: 20
  },
  input:{
    height: 150,
    ...GS.mixin.padding(5,5,5,5)
  },
  button: {
    marginTop: 10,
    minWidth: 200,
    maxHeight: 36,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})