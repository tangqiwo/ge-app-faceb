/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 21:27:09
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Strategy/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import usePublicState from '@core/hooks/usePublicState';
import LinearGradient from 'react-native-linear-gradient';
import { LS as styles, GS } from './style';
import dayjs from 'dayjs';

interface StrategyItemProps {
  type: 'home' | 'list' | 'detail'
}
export default ({ type }: StrategyItemProps) => {

  const { navigation, dispatch, ACTIONS, isFocused } = usePublicState();
  const [ activeSlide, setActiveSlide ] = React.useState(0);
  const [list, setList] = React.useState<any[]>();
  const [max, setMax] = React.useState<any>(3);
  const [isloading, setIsloading] = React.useState(false);
  const { width } = Dimensions.get('window');

  React.useEffect(() => {
    if(isFocused){
      dispatch(ACTIONS.BASE.commonRequest({
        uri: 'transaction_lesson/get_teacher_point?PageSize=100&Page=1',
        cache: {expires: 10, forward: true},
        cb: (res: any) => {
          setMax(3);
          setList(_.map(res.Data.Data, i => ({
            ...i,
            Category: i.Category.includes("gold") ? '现货黄金' : '现货白银',
            Direction: i.Direction == 0 ? '空' : '多',
            key: _.random(999999999) + i.Id
          })));
        }
      }))
    }
  }, [isFocused])

  const nextPage = () => {
    if(isloading || max === list.length){
      return
    }
    setIsloading(true);
    _.delay(() => {
      setIsloading(false);
      setMax(max + 3);
    }, 1000)
  }

  if(!list){
    return <></>
  }

  return (
    <View style={[styles.container, type === 'list' && styles.noPadding]}>
      {
        type === 'home' &&
        <>
          <View style={styles.title}>
            <Text style={styles.titleText}>全时段交易策略</Text>
            <Text style={styles.titleMore} onPress={() => navigation.navigate('Root', { screen: 'Strategy', params: {type: 0} }) }>{`更多 >`}</Text>
          </View>
          <Carousel
            style={{width: '100%', height: GS.mixin.rem(200), backgroundColor: 'red'}}
            vertical={false}
            inactiveSlideScale={1}
            firstItem={0}
            sliderWidth={width - GS.mixin.rem(56)}
            itemWidth={width - GS.mixin.rem(56)}
            data={_.take(list, 3)}
            onSnapToItem={(index) => setActiveSlide(index) }
            renderItem={({ item }: any) =>
              <StrategyItem data={item} key={item.key} isHome />
            }
          />
          <MyPagination activeSlide={activeSlide} dotsLength={3} />
        </>
      }
      {
        type === 'list' &&
        <FlatList
          showsVerticalScrollIndicator={false}
          data={_.take(list, max)}
          renderItem={({ item }: any) => <StrategyItem data={item} key={item.key} />}
          onEndReached={nextPage}
          ListFooterComponent={
            max >= list.length ?
              <ListFooterComponent type='end' /> :
            isloading ?
              <ListFooterComponent type='loading' /> :
              <ListFooterComponent type='none' />
          }
        />
      }
    </View>
  )
}

export const ListFooterComponent = ({ type }: { type?: 'end' | 'loading' | 'none' }) => {
  if (type === 'loading') {
    return (
      <View style={styles.endView}>
        <ActivityIndicator size="small" color={GS.var.colors.gray[400]} /><Text style={styles.endViewText}>加载更多中...</Text>
      </View>
    )
  }
  if (type === 'end') {
    return (
      <View style={styles.endView}>
        <Text style={styles.endViewText}>已经到底啦！</Text>
      </View>
    )
  }
  return <></>
}

// 单个策略
const StrategyItem = ({ data, showDetail, isHome }: { data: any, showDetail?: boolean, isHome?: boolean}) => {

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
        setCountdown(`00时00分00秒`)
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
    <View style={[!isHome && styles.itemCard]}>
      <View style={[styles.personalView, isHome && styles.personalHomeView]}>
        <Image source={{ uri: `${ossDomain}${data.TeacherProfile.Image}` }} style={styles.personalViewImage} />
        <View style={{marginLeft: GS.mixin.rem(10)}}>
          <Text style={styles.personalUpdateTime}>发布时间：{dayjs(data.StartAt).format('YYYY-MM-DD')}</Text>
          <Text style={styles.personalName} numberOfLines={1}>{`${data.TeacherProfile.Name}-${data.TeacherProfile?.Tags?.[0]}`}</Text>
        </View>
        <View style={styles.personalCountdown}>
          <Text style={styles.personalViewText}>{ countdown === '00时00分00秒' ? '策略已失效' : '策略有效期'}</Text>
          <View style={{...styles.countdownView, backgroundColor: countdown === '00时00分00秒' ? '#B2B2B2' : '#FFC600'}}>
            <Text style={{fontSize: GS.mixin.rem(10), color:  countdown === '00时00分00秒' ? '#FFFFFF' : '#2A2A2A'}}>{countdown}</Text>
          </View>
        </View>
      </View>
      {
        !isHome &&
        <Text>{data.Title}</Text>
      }
      {
        !showDetail && !isHome &&
        <Text
          style={{marginTop: GS.mixin.rem(11), color: '#94938F', lineHeight: GS.mixin.rem(20), fontSize: GS.mixin.rem(10)}}
          numberOfLines={3}
          onPress={() => navigation.navigate('StrategyDetail', { data, title: data.Title })}
        >
        {data.Content}
        </Text>
      }
      <View style={styles.progressView}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['#ffc60033', '#ffc60000']}
          style={styles.progressItemView}
        >
          <View style={styles.progressViewText}>
            <Text style={styles.progressViewTextItem}>品种</Text>
            <Text style={styles.progressViewTextItem}>方向</Text>
            <Text style={styles.progressViewTextItem}>建仓价</Text>
            <Text style={styles.progressViewTextItem}>止损价</Text>
            <Text style={styles.progressViewTextItem}>目标价</Text>
          </View>
          <View style={styles.progressViewText}>
            <Text style={styles.prizeText}>{data.Category}</Text>
            <Text style={styles.prizeText}>{data.Direction}</Text>
            <Text style={styles.prizeText}>{Number(data.BuildPositionPrice).toFixed(2)}</Text>
            <Text style={styles.prizeText}>{Number(data.StopLossPrice).toFixed(2)}</Text>
            <Text style={styles.prizeText}>{Number(data.TargetPrice).toFixed(2)}</Text>
          </View>
        </LinearGradient>
        {
          showDetail &&
          <Text style={styles.descText}>
            {data.Content}
          </Text>
        }
      </View>
    </View>
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
    <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={styles.detailView}>
      <StrategyItem data={route.params.data} showDetail />
    </ScrollView>
  )

}

interface IEntry {
  activeSlide: number;
  dotsLength: number;
}
export const MyPagination = ({ activeSlide, dotsLength }: IEntry) => {

  return(
    <Pagination
      dotsLength={dotsLength}
      activeDotIndex={activeSlide}
      containerStyle={{
        width: '100%',
        paddingTop: GS.mixin.rem(10),
        paddingBottom: GS.mixin.rem(10),
      }}
      dotStyle={{
        width: GS.mixin.rem(8),
        height: GS.mixin.rem(8),
        backgroundColor: '#FFC600'
      }}
      inactiveDotStyle={{
        width: GS.mixin.rem(8),
        height: GS.mixin.rem(8),
        borderRadius: GS.mixin.rem(8),
        backgroundColor: '#ccc',
      }}
      inactiveDotOpacity={0.8}
      inactiveDotScale={0.8}
    />
  )
}