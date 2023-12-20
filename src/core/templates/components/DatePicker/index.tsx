/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-29 15:44:07
 * @LastEditors: Galen.GE
 * @FilePath: /NativeAS/src/core/templates/components/DatePicker/index.tsx
 * @Description: 日期选择器
 */

import moment from 'moment';
import React from 'react';
import dayjs from 'dayjs';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import ACTIONS from '@actions/index';
import { DatePicker } from "@yz1311/react-native-wheel-picker";
import RCS from '@template/components/Screens/ReportCommon/style';

interface IProps {
  format?: string;
  minDate?: any;
  start?: any;
  end?: any;
  maxDate?: any;
  maxSpan?: number;
  cb?: Function,
  zIndex?: Number,
  date?: any,
  isSingle?: boolean,
  startText?:string,
  endText?:string
}
export default ({
  format = 'YYYY-MM-DD',
  maxDate=moment().endOf('days').add(1, 'day').format('YYYY-MM-DD'),
  minDate=moment().startOf('days').add(-90, 'day').format('YYYY-MM-DD'),
  start,
  end,
  cb,
  date,
  startText='起始日期',
  endText='截止日期'
}: IProps) => {

  const dispatch = useDispatch();
  const [showSelector, setShowSelector] = React.useState(false);
  const [type, setType] = React.useState('');
  const [value, setValue] = React.useState();

  const handleShowDate = (type: string) => {
    if(type === 'start'){
      setType(type);
      setValue(start);
      setShowSelector(true)
      return;
    }
    if(type === 'end'){
      setType(type);
      setValue(end);
      setShowSelector(true)
      return;
    }
  }

  const handleConfirm = (value: any)  => {
    const valueTimeStmap = new Date(dayjs(value).format('YYYY-MM-DD')).getTime();
    if((type == 'start' && new Date(end).getTime() < valueTimeStmap) || (type == 'end' && new Date(start).getTime() > valueTimeStmap)){
      dispatch(ACTIONS.BASE.openToast({text: '结束时间不可小于起始时间'}))
      return;
    }
    if(type === 'start'){
      cb({start: moment(value).format(format), end});
    }
    if(type === 'end'){
      cb({start, end: moment(value).format(format)});
    }
    setShowSelector(false);
  }

  return(
    <>
      <View>
        <View style={[RCS.searchBox.item]}>
          <Text style={RCS.searchBox.text}>{startText}</Text>
          <TouchableOpacity style={[RCS.searchBox.value]} onPress={() => handleShowDate('start')}>
            <Text style={RCS.searchBox.valueText}>{ start }</Text>
          </TouchableOpacity>
        </View>
        <View style={[RCS.searchBox.item]}>
          <Text style={RCS.searchBox.text}>{endText}</Text>
          <TouchableOpacity style={[ RCS.searchBox.value]} onPress={() => handleShowDate('end')}>
            <Text style={RCS.searchBox.valueText}>{ end }</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DatePicker
        pickerTitle={type === 'start' ? '起始日期' : '截止日期'}
        mode={format === 'YYYY-MM-DD' ? 'date' : 'datetime'}
        date={new Date(value)}
        isModal={true}
        minDate={new Date(minDate)}
        maxDate={new Date(maxDate)}
        modalVisible={showSelector}
        onPickerCancel={() => setShowSelector(false)}
        onPickerConfirm={handleConfirm}
      />
    </>
  )
}