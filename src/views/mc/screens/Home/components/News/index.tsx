/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 20:33:44
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/News/index.tsx
 * @Description:
 */
import _ from 'lodash';
import dayjs from 'dayjs';
import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native';
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
  const { ossDomain, navigation } = usePublicState();

  const [currentPlay, setCurrentPlay] = React.useState<{Video: string, Title: string}>();

  if(_.isEmpty(videos)){
    return <></>
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.title}>
        <Text style={styles.titleText}>巨象头条</Text>
        <Text style={styles.titleMore} onPress={() => navigation.navigate('Videos', { type: 'news' })}>{`更多 >`}</Text>
      </View>
      <MyTouchableOpacity style={styles.banner01} onPress={() => setCurrentPlay(videos.Data[0])}>
        <Image source={{ uri: `${ossDomain}${videos.Data[0].Image}` }} style={{...styles.banner01, marginTop: 0}} resizeMode='contain' />
      </MyTouchableOpacity>
      <View style={styles.banner01Text}>
        <Image style={styles.playImage} source={require('./i/title-play.png')} /><Text numberOfLines={1}>{videos.Data[0].Title}</Text>
      </View>
      <View style={styles.updateTime}>
        <Text style={styles.updateTimeText}>更新时间：{dayjs(videos.Data[0].UpdatedAt).format('YYYY-MM-DD')}</Text>
        <View style={styles.playNumberView}>
          <Image style={styles.playNumberImage} source={require('./i/icon-play.png')} />
          <Text style={styles.updateTimeText}>{videos.Data[0].Views}</Text>
        </View>
      </View>
      <View style={styles.liveView}>
        <MyTouchableOpacity style={styles.liveViewImage} onPress={() => setCurrentPlay(videos.Data[1])}>
          <Image source={{ uri: `${ossDomain}${videos.Data[1].Image}` }} style={styles.liveViewImage} resizeMode='contain' />
        </MyTouchableOpacity>
        <MyTouchableOpacity style={styles.liveViewImage} onPress={() => setCurrentPlay(videos.Data[2])}>
          <Image source={{ uri: `${ossDomain}${videos.Data[2].Image}` }} style={styles.liveViewImage} resizeMode='contain' />
        </MyTouchableOpacity>
      </View>
      <View style={styles.pointView}>
        <View style={styles.pointViewItem}>
          <Text style={styles.pointViewItemText} numberOfLines={2} ellipsizeMode={'tail'}>{videos.Data[1].Title}</Text>
        </View>
        <View style={styles.pointViewItem}>
          <Text style={styles.pointViewItemText} numberOfLines={2} ellipsizeMode={'tail'}>{videos.Data[2].Title}</Text>
        </View>
      </View>
      <View style={{...styles.pointView}} >
        <View style={{...styles.updateTime, width: '48%', marginTop: 0}}>
          <Text style={styles.updateTimeText}>{dayjs(videos.Data[1].UpdatedAt).format('YYYY-MM-DD')}</Text>
          <View style={styles.playNumberView}>
            <Image style={styles.playNumberImage} source={require('./i/icon-play.png')} />
            <Text style={styles.updateTimeText}>{videos.Data[1].Views}</Text>
          </View>
        </View>
        <View style={{...styles.updateTime, width: '48%',  marginTop: 0}}>
          <Text style={styles.updateTimeText}>{dayjs(videos.Data[2].UpdatedAt).format('YYYY-MM-DD')}</Text>
          <View style={styles.playNumberView}>
            <Image style={styles.playNumberImage} source={require('./i/icon-play.png')} />
            <Text style={styles.updateTimeText}>{videos.Data[2].Views}</Text>
          </View>
        </View>
      </View>
      {
        currentPlay &&
        <MyVideo
          title={currentPlay.Title}
          source={{uri: `${ossDomain}${currentPlay.Video}`}}
          close={() => setCurrentPlay(null)}
        />
      }
    </View>
  )

}