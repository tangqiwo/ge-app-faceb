/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-24 03:40:18
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Pagination/index.tsx
 * @Description: 分页
 */
import _ from 'lodash';
import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import ACTIONS from '@actions/index';
import PaginationDot from 'react-native-animated-pagination-dot';
import { CommonPicker } from "@yz1311/react-native-wheel-picker";
import Icon from '@icon/index';
import { LS, GS } from './style';

interface IProps{
  pageNo: number,
  pageSize?: number
  count: number 
  action: Function,
  totalPage?: number
}
export default ({pageNo, pageSize, count, action,totalPage}: IProps) => {

  const dispatch = useDispatch();
  const [showSelector, setShowSelector] = React.useState(false);
  const totalSize = totalPage ? totalPage :_.ceil(count / pageSize);

  const switchPage = (type: 'prev' | 'first' | 'next' | 'last') => {
    if(type === 'first'){
      if(pageNo === 1){
        dispatch(ACTIONS.BASE.openToast({text: '已是第一页', types: 'info'}));
        return;
      }
      action(1);
      return;
    }
    if(type === 'last'){
      if(pageNo === totalSize){
        dispatch(ACTIONS.BASE.openToast({text: '已是最后一页', types: 'info'}));
        return;
      }
      action(totalSize);
      return;
    }
    if(type === 'next'){
      if(pageNo === totalSize){
        dispatch(ACTIONS.BASE.openToast({text: '已是最后一页', types: 'info'}));
        return;
      }
      action(pageNo + 1);
      return;
    }
    if(type === 'prev'){
      if(pageNo === 1){
        dispatch(ACTIONS.BASE.openToast({text: '已是第一页', types: 'info'}));
        return;
      }
      action(pageNo - 1);
      return;
    }
  }

  const handleConfirm = (data: any) => {
    if(data[0] != pageNo){
      action(data[0])
    }
    setShowSelector(false);
  }

  return(
    <View style={LS.box}>
      <View style={{width: GS.mixin.rem(320)}}>
        <View style={LS.goPage}>
          <Text style={LS.text}>
            {/* 共计：{count}条数据 */}
          </Text>
          <TouchableOpacity onPress={() => setShowSelector(true)}>
            <Text style={[LS.text, LS.page]}><Icon.Font type={Icon.T.Octicons} name='list-unordered' /> {pageNo} / {totalSize}</Text>
          </TouchableOpacity>
        </View>
        <View style={LS.infos}>
          <View style={[LS.nextPrev, LS.prev]}>
            <TouchableOpacity onPress={() => switchPage('first')}>
              <Text style={LS.text}>{'<'}首页</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchPage('prev')}>
              <Text style={LS.text}>上一页</Text>
            </TouchableOpacity>
          </View>
          <PaginationDot
            activeDotColor={GS.var.colors.secondary[400]}
            curPage={pageNo-1}
            maxPage={totalSize}
          />
          <View style={[LS.nextPrev, LS.next]}>
            <TouchableOpacity onPress={() => switchPage('next')}>
              <Text style={LS.text}>下一页</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => switchPage('last')}>
              <Text style={LS.text}>尾页{'>'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CommonPicker
        pickerData={_.chain(totalSize).times().map(i => i+ 1).value()}
        selectedValue={[pageNo]} 
        isModal={true}
        modalVisible={showSelector}
        onPickerCancel={() => setShowSelector(false)}
        onPickerConfirm={handleConfirm}
        pickerTitle="页数"
      />
    </View>
  )

}
