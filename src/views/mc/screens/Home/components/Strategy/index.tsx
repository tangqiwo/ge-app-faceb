/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 21:27:09
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Strategy/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import usePublicState from '@core/hooks/usePublicState';
import { LS as styles, GS } from './style';
import dayjs from 'dayjs';

interface StrategyItemProps {
  type: 'home' | 'list' | 'detail'
}
export default ({ type }: StrategyItemProps) => {

  const { navigation } = usePublicState();
  const GeTeacherPoint = useSelector((state: any) => state.base.homeInfos?.GeTeacherPoint);
  const data = GeTeacherPoint?.Data;
  const list = GeTeacherPoint?.Datas;

  if(!data){
    return <></>
  }

  return (
    <View style={[styles.container, type === 'list' && styles.noPadding]}>
      {
        type === 'home' &&
        <>
          <View style={styles.title}>
            <Text style={styles.titleText}>全时段交易策略</Text>
          <Text style={styles.titleMore} onPress={() => navigation.navigate('Root', { screen: 'Strategy', params: {type: 1} }) }>{`更多 >`}</Text>
          </View>
          <StrategyItem data={data} />
        </>
      }
      {
        type === 'list' &&
        list.map((item: any, index: number) =>
          <StrategyItem data={item} key={index} />
        )
      }
    </View>
  )
}

// 单个策略
const StrategyItem = ({ data, showDetail }: { data: any, showDetail?: boolean}) => {

  const { ossDomain } = usePublicState();
  const [countdown, setCountdown] = React.useState('');
  const { navigation } = usePublicState();
  const timer = React.useRef<any>();

  React.useEffect(() => {
    return () => {
      if(timer.current){
        clearInterval(timer.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if(!data){
      return
    }
    const calculateCountdown = () => {
      // 当前时间
      const now = dayjs(_.now()).valueOf();
      // 结束时间
      const end = dayjs(data.StopAt).valueOf();
      // 设置时间差格式为 HH时MM分SS秒
      const diff = end - now;
      if(diff <= 0){
        if(timer.current){
          clearInterval(timer.current);
        }
        setCountdown(`已逾期`)
        return
      }
      const hour = Math.floor(diff / (60 * 60 * 1000));
      const minute = Math.floor((diff - hour * 60 * 60 * 1000) / (60 * 1000));
      const second = Math.floor((diff - hour * 60 * 60 * 1000 - minute * 60 * 1000) / 1000);
      setCountdown(`${hour}时${minute}分${second}秒`)
    }
    calculateCountdown();
    timer.current = setInterval(calculateCountdown, 1000);
  }, [data])

  if(!data){
    return <></>
  }

  return (
    <>
      <View style={styles.personalView}>
        <Image source={{ uri: `${ossDomain}${data.TeacherProfile.Image}` }} style={styles.personalViewImage} />
        <View style={{marginLeft: GS.mixin.rem(10)}}>
          <Text style={styles.personalUpdateTime}>更新时间：{dayjs(data.UpdatedAt).format('YYYY-MM-DD')}</Text>
          <Text style={styles.personalName} numberOfLines={1}>{`${data.TeacherProfile.Name}-${data.TeacherProfile?.Tags?.[0]}`}</Text>
        </View>
        <View style={styles.personalCountdown}>
          <Text style={styles.personalViewText}>策略有效期</Text>
          <View style={{...styles.countdownView, backgroundColor: countdown === '已逾期' ? '#F2F2F2' : '#FFC600'}}>
            <Text>{countdown}</Text>
          </View>
        </View>
      </View>
      <Text>{data.Title}</Text>
      {
        !showDetail &&
        <Text
          style={{marginTop: GS.mixin.rem(10), color: '#94938F', lineHeight: GS.mixin.rem(20), fontSize: GS.mixin.rem(10)}}
          numberOfLines={3}
          onPress={() => navigation.navigate('StrategyDetail', { data, title: data.Title })}
        >
        {data.Content}
        </Text>
      }
      <View style={styles.progressView}>
        <View style={styles.progressViewText}>
          <Text style={styles.progressViewTextItem}>品种</Text>
          <Text style={styles.progressViewTextItem}>方向</Text>
          <Text style={styles.progressViewTextItem}>建仓价</Text>
          <Text style={styles.progressViewTextItem}>止损价</Text>
          <Text style={styles.progressViewTextItem}>目标价</Text>
        </View>
        <Image source={require('./i/progress.png')} style={styles.progressViewImage} />
        <View style={styles.progressViewPriceText}>
          <Text style={styles.prizeText}>{data.Category}</Text>
          <Text style={styles.prizeText}>{data.Direction}</Text>
          <Text style={styles.prizeText}>{data.BuildPositionPrice}</Text>
          <Text style={styles.prizeText}>{data.StopLossPrice}</Text>
          <Text style={styles.prizeText}>{data.TargetPrice}</Text>
        </View>
        {
          showDetail &&
          <Text style={styles.descText}>
            {data.Content}
          </Text>
        }
      </View>
    </>
  )

}

// 详情页
export const StrategyDetail = () => {

  const route = useRoute<any>();
  const { navigation } = usePublicState();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
    });
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.detailView}>
      <StrategyItem data={route.params.data} showDetail />
    </ScrollView>
  )

}