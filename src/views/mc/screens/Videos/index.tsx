/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 14:00:27
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Videos/index.tsx
 * @Description:
 */
import React from "react";
import dayjs from 'dayjs';
import { ScrollView, View, Text, Image } from 'react-native';
import { useRoute } from "@react-navigation/native";
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from "@core/templates/components/MyTouchableOpacity";
import MyVideo from '@core/templates/components/MyVideo';
import Icon from '@core/templates/components/Icon';
import Header from '@this/components/Header';
import { LS as styles, GS } from './style';

export default () => {

  const route = useRoute<any>();

  const { ossDomain, dispatch, ACTIONS } = usePublicState();
  const [ currentTab, setCurrentTab ] = React.useState(route.params.type ==='news' ? 0 : 1);
  const [currentPlay, setCurrentPlay] = React.useState<{Video: string, Title: string}>();

  const [currentVideos, setCurrentVideos] = React.useState<any[]>([]);

  const getVideos = React.useCallback((type: 'video' | 'ks') => {
    const uri = type === 'video' ? 'transaction_lesson/get_jinshi_videos?Page=1&PageSize=200' : 'transaction_lesson/get_jinshi_news?Page=1&PageSize=200';
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
    if(currentTab === 0){
      getVideos('video');
      return;
    }
    if(currentTab === 1){
      getVideos('ks');
      return;
    }
  }, [currentTab])

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <Header
        title="影片"
      />
      <View style={styles.contentView}>
        <View style={styles.tabsVeiw}>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 0 && styles.tabsItemActive]} onPress={() => setCurrentTab(0)}>
            <Text style={[styles.tabsItemText, currentTab === 0 && styles.tabsItemTextActive]}>巨象头条</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 1 && styles.tabsItemActive]} onPress={() => setCurrentTab(1)}>
            <Text style={[styles.tabsItemText, currentTab === 1 && styles.tabsItemTextActive]}>金十访谈</Text>
          </MyTouchableOpacity>
        </View>
        {
          currentVideos &&
          <View style={styles.videoView}>
            {
              currentVideos.map((item: any, index: number) =>
                <View style={styles.videoViewItem} key={index}>
                  <MyTouchableOpacity style={styles.liveViewImage} onPress={() => setCurrentPlay(item)}>
                    <Image source={{ uri: `${ossDomain}${item.Image}` }} style={styles.liveViewImage} resizeMode='contain' />
                  </MyTouchableOpacity>
                  <View style={styles.pointViewItem}>
                    <Text style={styles.pointViewItemText} numberOfLines={1} ellipsizeMode={'tail'}>{item.Title}</Text>
                  </View>
                  <View style={{...styles.updateTime}}>
                    <Text style={styles.updateTimeText}>{dayjs(item.UpdatedAt).format('YYYY-MM-DD')}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.updateTimeText}>{item.Views}</Text>
                      <Icon.Font style={styles.updateTimeIcon} type={Icon.T.FontAwesome5} name='eye' />
                    </View>
                  </View>
                </View>
              )
            }
          </View>
        }
      </View>
      {
        currentPlay &&
        <MyVideo
          title={currentPlay.Title}
          source={{uri: `${ossDomain}${currentPlay.Video}`}}
          close={() => setCurrentPlay(null)}
        />
      }
    </ScrollView>
  )

}