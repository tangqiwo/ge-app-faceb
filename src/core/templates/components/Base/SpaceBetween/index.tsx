/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-01 17:05:54
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/Base/SpaceBetween/index.tsx
 * @Description: space-between 的横向 view
 */


import React from "react";
import { View } from "react-native";

export default ({children, ...porps}: any) => {

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', ...porps.style}} {...porps}>
      { children }
    </View>
  )

}
