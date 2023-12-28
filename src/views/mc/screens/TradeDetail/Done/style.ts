/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/TradeDetail/Done/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

export const LS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontSize: G.mixin.rem(12),
    color: '#2A2A2A',
  },
});

// 固定导出
export const GS = G;
export default { GS, LS };
