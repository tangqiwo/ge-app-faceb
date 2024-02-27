/*
 * @Author: Galen.GE
 * @Date: 2024-01-06 10:03:57
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/Kline/index.tsx
 * @Description:
 */
// @ts-ignore
import _ from "lodash";
import React from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import usePublicState from "@core/hooks/usePublicState";
import useKlineData from "@core/hooks/trade/useKlineData";
import RNEChartsPro from "react-native-echarts-pro";
import dayjs from "dayjs";
import { LS as styles, GS } from '../Position/style';

export default function RNEPDemo() {

  const {navigation} = usePublicState();
  const route = useRoute<any>();
  const { getKlineData, data } = useKlineData({ Symbol: route.params?.symbol });
  const [ chartData, setChartData ] = React.useState<any>(null);

  React.useEffect(() => {
    if(!data){
      return;
    }
    setChartData({
      tooltip: {
        trigger: 'item',
      },
      yAxis: {
        type: 'value',
        position: 'right',
        scale: true,
        splitNumber: 4
      },
      xAxis: {
        data: _.map(data, i => dayjs(i.Time).format('YYYY-MM-DD')),
      },
      dataZoom: [
        {
            type: 'inside', // 使用内置型 dataZoom
            start: 50,       // 初始时显示的数据窗口起始百分比
            end: 100,       // 初始时显示的数据窗口结束百分比
            zoomOnMouseWheel: false, // 禁用鼠标滚轮缩放
            moveOnMouseMove: true,   // 启用鼠标拖动
            moveOnMouseWheel: true   // 也可以选择启用鼠标滚轮平移
        }
      ],
      series: [
        {
          type: "candlestick",
          data: _.map(data, i => [i.Open, i.Close, i.Low, i.High])
        }
      ],
    })
  }, [data]),

  React.useEffect(() => {
    // getKlineData('W1')
  }, [])

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.symbol,
      headerShown: true
    });
  }, [])

  if(!chartData){
    return <></>
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <RNEChartsPro webViewSettings={{bounces: false}} height={GS.mixin.rem(300)} option={chartData} />
    </View>
  );
}