/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 16:31:36
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/Loader/index.tsx
 * @Description: 全局Loading 等
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { ActivityIndicator, Modal, View, Text, StyleSheet, Image } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import GS from '@views/mc/styles/index';

export default () => {

  const loading = useSelector((state: any) => state.base.loading);

  if(!loading.display){
    return <></>
  }


  return (
    <Modal visible={true} transparent={true} style={{width:"100%", height: '100%'}} >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <ActivityIndicator color={GS.var.colors.white} />
          {
            loading.text && <Text style={styles.text}>{loading.text}</Text>
          }
        </View>
      </View>
    </Modal>
  )

}

export const SkeletonLoader = () => {
  return (
    <SkeletonPlaceholder speed={2000}>
      <View style={{width: 200, paddingLeft: 15, paddingRight: 15}}>
        <View style={{ width: GS.mixin.rem(300), height: 20, borderRadius: 4, marginTop:15 }} />
        <View style={{ width: GS.mixin.rem(230), height: 20, borderRadius: 4, marginTop:15 }} />
        <View style={{ width: GS.mixin.rem(210), height: 20, borderRadius: 4, marginTop:15 }} />
        <View style={{ width: GS.mixin.rem(260), height: 20, borderRadius: 4, marginTop:15 }} />
        <View style={{ width: GS.mixin.rem(200), height: 20, borderRadius: 4, marginTop:15 }} />
      </View>
    </SkeletonPlaceholder>
  )
}

export const WaitSearch = () => {
  return (
    <View style={{flex: 1, paddingTop: 50, alignItems: 'center'}}>
      <Image source={require('./i/search.png')} style={{width: GS.mixin.rem(200), height: GS.mixin.rem(150)}} />
      <Text style={{marginTop: 15, fontSize: 12, color: GS.var.colors.gray[400]}}>点击右上角查询数据</Text>
    </View>
  )
}

export const NoData = () => {
  return (
    <View style={{flex: 1, paddingTop: 50, alignItems: 'center'}}>
      <Image source={require('./i/no-data.png')} style={{width: GS.mixin.rem(147), height: GS.mixin.rem(152)}} />
      <Text style={{marginTop: 15, fontSize: 12, color: GS.var.colors.gray[400]}}>暂无数据</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    ...GS.mixin.padding(10, 10, 10, 10),
    maxWidth: '90%',
    minWidth: GS.mixin.rem(80),
    minHeight: GS.mixin.rem(80),
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: 10,
    color: 'white'
  }
})