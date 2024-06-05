/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-29 17:37:49
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/Base/Selector/index.tsx
 * @Description: 报表页面下拉
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CommonPicker } from "@yz1311/react-native-wheel-picker";
import Icon from '@icon/index';
import { GS } from './style';
interface IProps{
  value: any,
  title: string,
  options: Array<{key: string, value: string}>
  copy?: boolean,
  cb: Function,
  style?:any,
  textStyle?:any
}
export default React.memo(({ value, title, options, style, textStyle, cb}: IProps) => {

  const [showSelector, setShowSelector] = React.useState(false);

  return (
    <>
      <TouchableOpacity style={style} onPress={() => setShowSelector(true)} >
        <Text style={textStyle}>{ _.find(options, {key: value}).value }</Text>
        <View style={{flexDirection: 'row', justifyContent:'flex-end', alignItems:'center',height:'auto'}}>
          <Icon.Font type={Icon.T.MaterialIcons} name='keyboard-arrow-down' style={{fontSize: 18, color: GS.var.colors.gray[500]}} />
        </View>
      </TouchableOpacity>
      <CommonPicker
        pickerData={_.map(options, 'value')}
        selectedValue={[_.find(options, {key: value}).value]}
        isModal={true}
        modalVisible={showSelector}
        onPickerCancel={() => setShowSelector(false)}
        onPickerConfirm={(data: any) => {cb(_.find(options, {value: data[0]}).key), setShowSelector(false)}}
        pickerTitle={title}
      />
    </>
  )

})
