/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-10 19:20:15
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/Error/index.tsx
 * @Description: 容错页面
 */

import React from 'react';
import { Text, Image, ImageBackground, View } from 'react-native';
import { Layout, Button } from '@ui-base/index';
import { errorHandler } from '@hooks/useLogs';
import RNRestart from 'react-native-restart';
import { LS, GS } from './style';


export default ({ log }: any) => {

  React.useEffect(() => {
    errorHandler({ type: '程序界面崩溃', msg: log.message, key: log.name })
    console.log(log)
  }, [])

  return (
    <ImageBackground style={GS.style.background} source={require('./i/bg.png')}>
      <Layout.Center style={LS.frame}>
        <Image source={require('./i/img-sorry.png')}  style={{marginTop: 130}} />
        <Text style={LS.message}>程序竟然崩溃了！(⋟﹏⋞)</Text>
        <Button
          text='重新启动APP'
          style={LS.reload}
          textStyle={LS.reloadText}
          action={() => RNRestart.Restart()}
        />
        <View style={{marginTop: 20, height: 100, alignItems: 'center'}}>
          <Text style={{...GS.style.font12}}>错误信息</Text>
          <Text style={{...GS.style.font12, marginTop: 5}}>{log.message}</Text>
        </View>
      </Layout.Center>
    </ImageBackground>
  )

}
