/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 17:43:54
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Trophy/index.tsx
 * @Description:
 */

import React from 'react'
import { View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useRouteWebCommon from '@core/hooks/useRouteWebCommon';
import { LS as styles, GS } from './style';

export default () => {

  const GeBrand = useSelector((state: any) => state.base.homeInfos?.GeBrand);
  const { forward } = useRouteWebCommon();
  const { ossDomain } = usePublicState();

  if(!GeBrand){
    return <></>
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>巨象品牌 科技为交易护航</Text>
        {/* <Text style={styles.titleMore}>{`更多 >`}</Text> */}
      </View>
      <View style={styles.imageViews}>
        {
          GeBrand.map((item: any, index: number) =>
            <MyTouchableOpacity style={styles.imageItemView} onPress={() => forward({ type: 'official', title: item.Title, uri: item.Link })} >
              <Image source={{ uri: `${ossDomain}${item.Image}` }} style={styles.imageItem} resizeMode='cover' />
              <Text style={styles.imageItemText}>{item.Title}</Text>
            </MyTouchableOpacity>
          )
        }
      </View>
    </View>
  )

}