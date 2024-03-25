/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 17:43:54
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Trophy/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react'
import { View, Text, Image } from 'react-native'
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useRouteWebCommon from '@core/hooks/useRouteWebCommon';
import { LS as styles, GS } from './style';

export default () => {

  const { ossDomain, dispatch, ACTIONS } = usePublicState();
  const [ GeBrand, setGeBrand ] = React.useState<any>(null);
  const { forward } = useRouteWebCommon();

  React.useEffect(() => {
    dispatch(ACTIONS.BASE.commonRequest({
      uri: 'authority/index',
      cb: (res: any) => {
        console.log(res.Data)
        setGeBrand(_.take(res.Data, 4))
      }
    }))
  }, [])

  if(!GeBrand){
    return <></>
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>巨象殊荣</Text>
        {/* <Text style={styles.titleMore}>{`更多 >`}</Text> */}
      </View>
      <View style={styles.imageViews}>
        {
          GeBrand.map((item: any, index: number) =>
            <MyTouchableOpacity style={styles.imageItemView} onPress={() => forward({type: 'origin', uri: item.Link, title: item.Title})}>
              <Image source={{ uri: `${ossDomain}${item.Image}` }} style={styles.imageItem} resizeMode='contain' />
              <Text style={styles.imageItemText}>{item.Title}</Text>
            </MyTouchableOpacity>
          )
        }
      </View>
    </View>
  )

}