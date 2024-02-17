/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 14:00:27
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Strategy/index.tsx
 * @Description:
 */
import React from "react";
import { ScrollView, View, Text, Image } from 'react-native';
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from "@react-navigation/native";
import WebView from "@core/templates/components/WebView";
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from "@core/templates/components/MyTouchableOpacity";
import News from "../Home/components/News";
import Strategy from "../Home/components/Strategy";
import MyVideo from '@core/templates/components/MyVideo';
import G from '@constants/global';
import { LS as styles, GS } from './style';

export default () => {

  const insets = useSafeAreaInsets();
  const route = useRoute<any>();
  const { ossDomain, navigation } = usePublicState();
  const [ currentTab, setCurrentTab ] = React.useState(route.params?.type || 0);
  const webViewHeight = G.GET('SCREEN_HEIGHT') - GS.mixin.rem(175) - insets.top - insets.bottom;
  // 金十访谈
  const newsCounseling = useSelector((state: any) => state.base.homeInfos.GeNewsCounseling?.Data);
  const [currentPlay, setCurrentPlay] = React.useState<{Video: string, Title: string}>();

  return (
    <View style={{flex: 1}}>
      <View style={{...styles.header, height: GS.mixin.rem(44) + insets.top}} >
        <Text style={{...styles.headerText, marginTop: insets.top}}>策略</Text>
      </View>
      <View style={styles.contentView}>
        <View style={styles.tabsVeiw}>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 0 && styles.tabsItemActive]} onPress={() => setCurrentTab(0)}>
            <Text style={[styles.tabsItemText, currentTab === 0 && styles.tabsItemTextActive]}>巨象财经</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 1 && styles.tabsItemActive]} onPress={() => setCurrentTab(1)}>
            <Text style={[styles.tabsItemText, currentTab === 1 && styles.tabsItemTextActive]}>大咖观点</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 2 && styles.tabsItemActive]} onPress={() => setCurrentTab(2)}>
            <Text style={[styles.tabsItemText, currentTab === 2 && styles.tabsItemTextActive]}>新闻快讯</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 3 && styles.tabsItemActive]} onPress={() => setCurrentTab(3)}>
            <Text style={[styles.tabsItemText, currentTab === 3 && styles.tabsItemTextActive]}>财经日历</Text>
          </MyTouchableOpacity>
        </View>
        {
          currentTab === 0 &&
          <View style={{height: webViewHeight, width: '100%'}}>
            <ScrollView showsVerticalScrollIndicator={false} >
              <News style={{...GS.mixin.padding(0,0,0,0)}} />
              {
                newsCounseling?.length > 0 &&
                <>
                  <View style={styles.title}>
                    <Text style={styles.titleText}>金十访谈</Text>
                    <Text style={styles.titleMore} onPress={() => navigation.navigate('Videos', { type: 'k10' })}>{`更多 >`}</Text>
                  </View>
                  <MyTouchableOpacity style={styles.banner} onPress={() => setCurrentPlay(newsCounseling[0])}>
                    <Image
                      style={{...styles.banner, marginTop: 0, marginBottom: 0}}
                      source={{ uri: `${ossDomain}${newsCounseling[0].Image}` }}
                    />
                  </MyTouchableOpacity>
                </>
              }
            </ScrollView>
          </View>
        }
        {
          currentTab === 1 &&
          <View style={{height: webViewHeight, width: '100%', flex: 1}}>
            <Strategy type="list" />
          </View>
        }
        {
          currentTab === 2 &&
          <View style={{height: webViewHeight, width: '100%'}}>
            <WebView
              source={{uri: 'https://www.jin10.com/example/jin10.com.html?fontSize=14px&theme=white'}}
            />
          </View>
        }
        {
          currentTab === 3 &&
          <View style={{height: webViewHeight, width: '100%'}}>
            <WebView
              source={{uri: 'https://rili-d.jin10.com/open.php?fontSize=14px&theme=primary'}}
            />
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
    </View>
  )

}