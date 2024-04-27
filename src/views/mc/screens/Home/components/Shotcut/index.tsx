/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 20:17:44
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Shotcut/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import usePublicState from '@core/hooks/usePublicState';
import useRouteWebCommon from '@core/hooks/useRouteWebCommon';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import { IStore } from '@core/schemas/redux-store';
import { LS as styles, GS } from './style';

export default () => {

  const menus = useSelector((state: IStore) => state.base.appDisplayConfig?.Menus);
  const { isLogined, ossDomain, navigation } = usePublicState();
  const [displayMenus, setDisplayMenus] = React.useState<Array<any>>();
  const { forward } = useRouteWebCommon();

  React.useEffect(() => {
    if(!menus) return;
    if(isLogined) {
      setDisplayMenus(menus.Login);
      return;
    }
    setDisplayMenus(menus.UnLogin);
  }, [menus, isLogined])

  const handlePress = (item: any) => {
    if(item.NativeForward){
      navigation.navigate(item.NativeForward);
      return;
    }
    forward({
      uri: item.Link,
      title: item.Title,
      type: 'origin'
    })
  }

  if(!displayMenus){
    return <></>
  }

  return (
    <View style={styles.container}>
      {
        displayMenus.map((item) =>
          <MyTouchableOpacity style={styles.item} key={item.Id} onPress={() => handlePress(item)} >
            <Image source={{uri: `${ossDomain}${item.Icon}`}} style={{width: GS.mixin.rem(28), height: GS.mixin.rem(25)}} resizeMode='contain' />
            <Text style={styles.itemText}>{item.Title}</Text>
          </MyTouchableOpacity>
        )
      }
    </View>
  )

}