/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-01 16:24:44
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Base/Div/index.tsx
 * @Description: 使用 View 将布局默认为 flex - row
 */

import React from "react";
import { View } from "react-native";

export default ({children, ...porps}: any) => {

  return (
    <View style={{justifyContent: 'row', ...porps.style}} {...porps}>
      { children }
    </View>
  )

}
