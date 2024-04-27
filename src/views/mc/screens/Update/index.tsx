/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2024-04-27 10:27:29
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Update/index.tsx
 * @Description:
 */
import React from "react";
import { View, Text, Linking, Platform } from 'react-native';
import BackgroundView from "@core/templates/components/BackgroundView";
import usePublicState from "@core/hooks/usePublicState";
import Button from "@this/components/Button";
import { useSelector } from "react-redux";
import { LS as styles, GS } from './style';

export default () => {

  const { navigation } = usePublicState();
  const appVersion = useSelector((state: any) => state.base.appConfigs?.GeAppVersionConfig)

  return (
    <View style={{flex: 1}}>
      <BackgroundView style={styles.bg} source={require('./i/bg.png')}>
        <Text style={styles.title}>新版本 V{appVersion.Version}</Text>
      </BackgroundView>
      <View style={styles.content}>
        <Text style={styles.contentText}>{appVersion?.Content}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', flex: 1}}>
        {
          !appVersion?.ForceToUpdate &&
          <Text onPress={() => navigation.goBack()} style={{color: '#646464'}}>跳过更新</Text>
        }
        <Button
          style={styles.btn}
          text="现在更新"
          onPress={() => Linking.openURL(appVersion?.DownloadUrl[Platform.OS === 'android' ? 'Android' : 'Ios'])}
        />
      </View>
    </View>
  )

}