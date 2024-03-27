/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 14:00:27
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Strategy/index.tsx
 * @Description:
 */
import React from "react";
import dayjs from 'dayjs';
import { View, Text, Image, FlatList, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from "@core/templates/components/MyTouchableOpacity";
import Strategy from "../Home/components/Strategy";
import MyVideo from '@core/templates/components/MyVideo';
import G from '@constants/global';
import { LS as styles, GS } from './style';
import BackgroundView from "@core/templates/components/BackgroundView";

export default () => {

  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const { ossDomain, dispatch, ACTIONS, isFocused } = usePublicState();
  const [ currentTab, setCurrentTab ] = React.useState(0);
  const webViewHeight = G.GET('SCREEN_HEIGHT') - GS.mixin.rem(175) - insets.top - insets.bottom;
  const [currentPlay, setCurrentPlay] = React.useState<{Video: string, Title: string, Id: string | number}>();

  const [currentVideos, setCurrentVideos] = React.useState<any[]>([]);

  React.useEffect(() => {
    if(route.params?.type !== undefined){
      setCurrentTab(route.params.type);
    }
  }, [route.params?.type])

  const getVideos = React.useCallback((type: 'video' | 'ks' | 'ds' | 'new') => {
    let uri = '';
    if(type === 'video'){
      uri = 'transaction_lesson/get_jinshi_videos?Page=1&PageSize=100';
    }
    if(type === 'ks'){
      uri = 'transaction_lesson/get_jinshi_news?Page=1&PageSize=10';
    }
    if(type === 'ds'){
      uri = 'portal/get_gold_guru?Page=1&PageSize=100&Type=1';
    }
    if(type === 'new'){
      uri = 'portal/get_new_user_guid?Page=1&PageSize=100';
    }
    dispatch(ACTIONS.BASE.commonRequest({
      uri,
      cache: {
        forward: true,
        expires: 10
      },
      cb: (res: any) => {
        setCurrentVideos(res.Data.Data);
      }
    }))
  }, [])

  React.useEffect(() => {
    if(currentPlay){
      return;
    }
    if(currentTab === 1){
      getVideos('ds');
      return;
    }
    if(currentTab === 2){
      getVideos('new');
      return;
    }
    if(currentTab === 3){
      getVideos('video');
      return;
    }
    if(currentTab === 4){
      getVideos('ks');
      return;
    }
  }, [currentTab, currentPlay])

  return (
    <View style={{flex: 1}}>
      <View style={{...styles.header, height: GS.mixin.rem(40) + insets.top, marginTop: Platform.OS === 'android' ? GS.mixin.rem(15) : 0}} >
        <View style={styles.tabsVeiw}>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 0 && styles.tabsItemActive]} onPress={() => setCurrentTab(0)}>
            <Text style={[styles.tabsItemText, currentTab === 0 && styles.tabsItemTextActive]}>大咖观点</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 1 && styles.tabsItemActive]} onPress={() => setCurrentTab(1)}>
            <Text style={[styles.tabsItemText, currentTab === 1 && styles.tabsItemTextActive]}>黄金大师课</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 2 && styles.tabsItemActive]} onPress={() => setCurrentTab(2)}>
            <Text style={[styles.tabsItemText, currentTab === 2 && styles.tabsItemTextActive]}>新手教学</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 3 && styles.tabsItemActive]} onPress={() => setCurrentTab(3)}>
            <Text style={[styles.tabsItemText, currentTab === 3 && styles.tabsItemTextActive]}>巨象头条</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 4 && styles.tabsItemActive]} onPress={() => setCurrentTab(4)}>
            <Text style={[styles.tabsItemText, currentTab === 4 && styles.tabsItemTextActive]}>金十访谈间</Text>
          </MyTouchableOpacity>
        </View>
      </View>
      {
        currentTab !== 0 &&
        <>
          <BackgroundView style={styles.tips} source={require('./i/bg.png')} resizeMode="contain">
            <Text style={styles.tipsTitle}>{Tips[currentTab].title}</Text>
            <Text style={styles.tipsContent}>{Tips[currentTab].content}</Text>
          </BackgroundView>
          <View style={styles.title}>
            <Text style={styles.titleText}>全部课程</Text>
          </View>
        </>
      }
      <View style={styles.contentView}>
        {
          currentTab === 0 &&
          <View style={{height: webViewHeight, width: '100%', flex: 1}}>
            <Strategy type="list" />
          </View>
        }
        {
          currentTab !== 0 && currentVideos?.length > 0 &&
          <FlatList
            data={currentVideos}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              <View style={styles.videoItem}>
                <MyTouchableOpacity style={styles.videoCover} onPress={() => setCurrentPlay(item)}>
                  <Image style={styles.videoCover} source={{uri: `${ossDomain}${item.Image}`}} />
                </MyTouchableOpacity>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoInfoTitle} numberOfLines={2}>{item.Title}</Text>
                  <View style={styles.updateTime}>
                    <Text style={styles.updateTimeText}>{dayjs(item.UpdatedAt).format('YYYY-MM-DD')}</Text>
                    <View style={styles.playNumberView}>
                      <Image style={styles.playNumberImage} source={require('./i/icon-play.png')} />
                      <Text style={styles.updateTimeText}>{item.Views + item.RealViews}</Text>
                    </View>
                    <MyTouchableOpacity style={styles.goButton} onPress={() => setCurrentPlay(item)}>
                      <Text style={GS.style.font10}>去学习</Text>
                    </MyTouchableOpacity>
                  </View>
                </View>
              </View>
            }
          />
        }
      </View>
      {
        currentPlay &&
        <MyVideo
          title={currentPlay.Title}
          source={{uri: `${ossDomain}${currentPlay.Video}`}}
          close={() => setCurrentPlay(null)}
          type={TypeMapping[currentTab]}
          id={currentPlay.Id}
        />
      }
    </View>
  )

}

const TypeMapping: any = {
  [1]: 'ds',
  [2]: 'new',
  [3]: 'video',
  [4]: 'ks'
}

const Tips: any = {
  [1]: {
    title: '黄金大师课',
    content: '业界大师领路，精讲主流交易手法、交易指标，共享实战技巧。'
  },
  [2]: {
    title: '新手教学',
    content: '黄金投资入门知识，MT4交易基础操作，简单易懂，小白必看。'
  },
  [3]: {
    title: '巨象头条',
    content: '每日全球第一手财经资讯全掌握，金融热点实时播报。'
  },
  [4]: {
    title: '金十访谈间',
    content: '巨象&金十强强联袂，金十访谈间同步热播，独家解析市场焦点！'
  }
}