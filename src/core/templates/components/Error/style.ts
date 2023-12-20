/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-10 19:24:33
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Error/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

export const LS = StyleSheet.create({
  frame: {
    flex: 1
  },
  message: {
    color: G.var.colors.gray[600],
    fontSize: 12,
    marginTop: 10
  },
  reload: {
    marginTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    height: 35,
    minWidth: 80
  },
  reloadText: {
    letterSpacing: 0,
    fontSize: 14,
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
