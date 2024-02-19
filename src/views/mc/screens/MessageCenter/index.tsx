/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-27 12:20:08
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/MessageCenter/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import dayjs from 'dayjs';
import { View, Text } from 'react-native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Header from '@this/components/Header';
import { NoData, SkeletonLoader } from '@template/components/Loader'
import Popup from '@template/components/Popup';
import Button from '@this/components/Button';
import useMessage from '@core/hooks/dashboard/useMessage';
import usePublicState from '@core/hooks/usePublicState';

import { LS as styles, GS } from './style';

export default () => {

  const [ currentTab, setCurrentTab ] = React.useState(1);
  const { data, doQuery, querys } = useMessage();
  const { infos, navigation } = usePublicState();
  const [ details, setDetails ] = React.useState<any>(null);

  React.useEffect(() => {
    if(currentTab === 0){
      return;
    }
    if(currentTab === 1 && !_.isEmpty(infos)){
      doQuery({...querys, type: 'member'});
    }
    if(currentTab === 2 && !_.isEmpty(infos)){
      doQuery({...querys, type: 'public'});
    }

  }, [currentTab, infos])

  return (
    <View style={styles.container}>
      <Header title='消息中心' />
      <View style={styles.contentView}>
        <View style={styles.tabsVeiw}>
          {/* <MyTouchableOpacity style={[styles.tabsItem, currentTab === 0 && styles.tabsItemActive]} onPress={() => setCurrentTab(0)}>
            <Text style={[styles.tabsItemText, currentTab === 0 && styles.tabsItemTextActive]}>系统推送</Text>
          </MyTouchableOpacity> */}
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 1 && styles.tabsItemActive]} onPress={() => setCurrentTab(1)}>
            <Text style={[styles.tabsItemText, currentTab === 1 && styles.tabsItemTextActive]}>会员消息</Text>
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 2 && styles.tabsItemActive]} onPress={() => setCurrentTab(2)}>
            <Text style={[styles.tabsItemText, currentTab === 2 && styles.tabsItemTextActive]}>推广信息</Text>
          </MyTouchableOpacity>
        </View>
        <View>
          {
            currentTab === 0 &&
            <NoData />
          }
          {
            _.includes([1, 2], currentTab) && _.isEmpty(infos) &&
            <>
              <Text style={styles.tips}>请登录后查看信息</Text>
              <Button
                text='登录'
                onPress={() => navigation.navigate('Login')}
              />
            </>
          }
          {
            // 加载中
            _.includes([1, 2], currentTab) && !_.isEmpty(infos) && _.isEmpty(data) && <SkeletonLoader />
          }
          {
            // 无数据
            _.includes([1, 2], currentTab) && !_.isEmpty(infos) && data?.length === 0 && <NoData />
          }
          {
            data?.length > 0 && _.includes([1, 2], currentTab) &&
            data.map((item: any) =>
              <MyTouchableOpacity style={styles.messageItem} key={item.Id} onPress={() => setDetails(item)}>
                <View style={styles.messageItemTitle}>
                  <Text style={styles.messageItemTitleText}>{item.Title}</Text>
                  <Text style={styles.messageItemContentText}>{dayjs(item.CreatedAt).format('YYYY-MM-DD')}</Text>
                </View>
                <Text style={{...styles.messageItemContentText, marginTop: GS.mixin.rem(10)}} numberOfLines={3}>{item.Content}</Text>
              </MyTouchableOpacity>
            )
          }
        </View>
      </View>
      <Popup display={details} title={details?.Title} close={() => setDetails(null)}>
        <View style={{...GS.mixin.padding(20,14,20,14)}}>
          <Text>
            创建时间：{ dayjs(details?.CreatedAt).format('YYYY-MM-DD') }
          </Text>
          <Text style={{...styles.messageItemContentText, marginTop: GS.mixin.rem(10)}}>{details?.Content}</Text>
        </View>
      </Popup>
    </View>
  )

}