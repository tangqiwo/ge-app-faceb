/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-27 12:20:08
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/MessageCenter/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import dayjs from 'dayjs';
import { View, Text, ScrollView } from 'react-native';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Header from '@this/components/Header';
import { NoData, SkeletonLoader } from '@template/components/Loader'
import Popup from '@template/components/Popup';
import Button from '@this/components/Button';
import useMessage from '@core/hooks/dashboard/useMessage';
import usePublicState from '@core/hooks/usePublicState';

import { LS as styles, GS } from './style';
import { useSelector } from 'react-redux';

export default () => {

  const [ currentTab, setCurrentTab ] = React.useState(1);
  const { data, doQuery, querys } = useMessage();
  const { infos, navigation, dispatch, ACTIONS } = usePublicState();
  const [ details, setDetails ] = React.useState<any>(null);
  const unreadMessage = useSelector((state: any) => state.user.unreadMessage);
  const [ dataType, setDataType ] = React.useState('MessageGroupMemberMessage');

  React.useEffect(() => {
    if(currentTab === 0){
      return;
    }
    if(currentTab === 1 && !_.isEmpty(infos)){
      doQuery({...querys, type: 'member'});
      setDataType('MessageGroupMemberMessage')
    }
    if(currentTab === 2 && !_.isEmpty(infos)){
      doQuery({...querys, type: 'public'});
      setDataType('MessageGroupPublicMessage')
    }

  }, [currentTab, infos])

  React.useEffect(() => {
    // 是否已读
    if(details && unreadMessage[dataType].includes(details.Id)){
      dispatch(ACTIONS.USER.readMessage({
        data: {
          Group: dataType,
          MessageId: details.Id
        },
        cb: () => {
          dispatch(ACTIONS.USER.getUnreadMessage({}))
        }
      }))
    }
  }, [details])


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
            {
              unreadMessage.MessageGroupMemberMessage.length > 0 &&
              <View style={styles.tabsItemBadge}>
                <Text style={styles.tabsItemBadgeText}>{unreadMessage.MessageGroupMemberMessage.length}</Text>
              </View>
            }
          </MyTouchableOpacity>
          <MyTouchableOpacity style={[styles.tabsItem, currentTab === 2 && styles.tabsItemActive]} onPress={() => setCurrentTab(2)}>
            <Text style={[styles.tabsItemText, currentTab === 2 && styles.tabsItemTextActive]}>推广信息</Text>
            {
              unreadMessage.MessageGroupPublicMessage.length > 0 &&
              <View style={styles.tabsItemBadge}>
                <Text style={styles.tabsItemBadgeText}>{unreadMessage.MessageGroupPublicMessage.length}</Text>
              </View>
            }
          </MyTouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
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
                  <Text style={styles.messageItemTitleText} numberOfLines={1}>{item.Title}</Text>
                  <Text style={styles.messageItemContentText}>{dayjs(item.CreatedAt).format('YYYY-MM-DD')}</Text>
                </View>
                <Text
                  style={{
                    ...styles.messageItemContentText,
                    marginTop: GS.mixin.rem(10),
                    color: unreadMessage[dataType].includes(item.Id) ? 'black' : styles.messageItemContentText.color,
                    fontWeight: unreadMessage[dataType].includes(item.Id) ? 'bold' : 'normal'
                  }}
                  numberOfLines={3}
                >
                  {item.Content}
                </Text>
              </MyTouchableOpacity>
            )
          }
        </ScrollView>
      </View>
      <Popup display={details} title={details?.Title} close={() => setDetails(null)}>
        <View style={{...GS.mixin.padding(20,14,20,14)}}>
          <Text style={{marginBottom: 10}}>
            {details?.Title}
          </Text>
          <Text>
            创建时间：{ dayjs(details?.CreatedAt).format('YYYY-MM-DD') }
          </Text>
          <Text style={{...styles.messageItemContentText, marginTop: GS.mixin.rem(10)}}>{details?.Content}</Text>
        </View>
      </Popup>
    </View>
  )

}