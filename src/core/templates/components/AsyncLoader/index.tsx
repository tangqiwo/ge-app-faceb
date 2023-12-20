/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-31 00:24:57
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/AsyncLoader/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  _default: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

interface IProps{
  name?: string,
  Loder?: React.ReactNode | any,
  hiddenLoader?: boolean,
  height?: number
  children: React.ReactNode
}
export default ({name="not set yet", hiddenLoader = false, Loder=() => <ActivityIndicator size="large" />, height = 200, children}: IProps) => {

  const [ load, setLoad ] = React.useState(false);
  const recorder = React.useRef(0);

  // 异步加载组件
  React.useEffect(() => {setTimeout(() => {setLoad(true)}, 0)}, []);

  // 日志
  React.useLayoutEffect(() => {
    // 打印当前组件实际渲染时间
    if(recorder.current !== 0 && recorder.current !== -1 && __DEV__){
      let consoleColor = "\x1b[31m%s\x1b[0m";
      if(_.now() - recorder.current <= 100){
        consoleColor = "\x1b[32m%s\x1b[0m";
      }
      if(_.now() - recorder.current > 100 && _.now() - recorder.current <= 500){
        consoleColor = "\x1b[33m%s\x1b[0m";
      }
      console.log(consoleColor, `component【${name}】render time:【${_.now() - recorder.current}】`);
      recorder.current = -1;
    }
    // 首次开始空组件渲染时间点
    if(recorder.current === 0 && __DEV__){
      recorder.current = _.now();
    }
  }, [load])

  // 显示 Loader
  if(!load){
    return (
      <View style={{...styles._default, height}}>
        {
          hiddenLoader ? null : <Loder />
        }
      </View>
    )
  }
  return (<>{ children }</>)

}



