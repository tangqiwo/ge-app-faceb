/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 20:33:44
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/News/index.tsx
 * @Description:
 */
import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import MyVideo from '@core/templates/components/MyVideo';
import { LS as styles, GS } from './style';

interface NewsItemProps {
  style?: any
}
export default ({ style=StyleSheet.create({}) }: NewsItemProps) => {

  const videos = useSelector((state: any) => state.base.homeInfos.GeVideoCounseling);
  const { ossDomain, dispatch, ACTIONS, navigation } = usePublicState();
  const [ currentTab, setCurrentTab ] = React.useState(0);
  const [currentPlay, setCurrentPlay] = React.useState<{Video: string, Title: string}>();

  const [currentVideos, setCurrentVideos] = React.useState<any[]>([]);

  const getVideos = React.useCallback((type: 'video' | 'ks' | 'ds' | 'new') => {
    let uri = '';
    if(type === 'video'){
      uri = 'transaction_lesson/get_jinshi_videos?Page=1&PageSize=10';
    }
    if(type === 'ks'){
      uri = 'transaction_lesson/get_jinshi_news?Page=1&PageSize=10';
    }
    if(type === 'ds'){
      uri = 'portal/get_gold_guru?Page=1&PageSize=10&Type=1';
    }
    if(type === 'new'){
      uri = 'portal/get_new_user_guid?Page=1&PageSize=10';
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
      return
    }
    if(currentTab === 2){
      getVideos('video');
      return;
    }
    if(currentTab === 3){
      getVideos('ks');
      return;
    }
    if(currentTab === 0){
      getVideos('ds');
      return;
    }
    if(currentTab === 1){
      getVideos('new');
      return;
    }
  }, [currentTab, currentPlay])

  const handleClickMore = () => {
    navigation.navigate('Root', { screen: 'Strategy', params: {type: currentTab + 1} })
  }

  if(_.isEmpty(videos)){
    return <></>
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.tabsVeiw}>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 0 && styles.tabsItemActive]} onPress={() => setCurrentTab(0)}>
          <Text style={[styles.tabsItemText, currentTab === 0 && styles.tabsItemTextActive]}>黄金大师课</Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 1 && styles.tabsItemActive]} onPress={() => setCurrentTab(1)}>
          <Text style={[styles.tabsItemText, currentTab === 1 && styles.tabsItemTextActive]}>新手教学</Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 2 && styles.tabsItemActive]} onPress={() => setCurrentTab(2)}>
          <Text style={[styles.tabsItemText, currentTab === 2 && styles.tabsItemTextActive]}>AI头条</Text>
        </MyTouchableOpacity>
        <MyTouchableOpacity style={[styles.tabsItem, currentTab === 3 && styles.tabsItemActive]} onPress={() => setCurrentTab(3)}>
          <Text style={[styles.tabsItemText, currentTab === 3 && styles.tabsItemTextActive]}>金十访谈间</Text>
        </MyTouchableOpacity>
        <Text style={styles.titleMore} onPress={handleClickMore}>{`更多 >`}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {
          currentVideos && _.take(currentVideos, 10).map((item: any, index: number) =>
            <View style={styles.videoItem} key={index}>
              <MyTouchableOpacity style={styles.banner01} onPress={() => setCurrentPlay(item)}>
                <Image source={{ uri: `${ossDomain}${item.Image}` }} style={{...styles.banner01, marginTop: 0}} resizeMode='contain' />
              </MyTouchableOpacity>
              <View style={{marginTop: 10}}>
                <Text style={{...GS.style.font12, color: '#2a2a2a'}} numberOfLines={1}>{item.Title}</Text>
              </View>
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
          )
        }
      </ScrollView>
      {
        currentPlay &&
        <MyVideo
          title={currentPlay.Title}
          source={{uri: `${ossDomain}${currentPlay.Video}`}}
          close={() => setCurrentPlay(null)}
          id={currentPlay.Id}
          type={TypeMapping[currentTab]}
        />
      }
    </View>
  )

}

const TypeMapping: any = {
  [0]: 'ds',
  [1]: 'new',
  [2]: 'video',
  [3]: 'ks'
}