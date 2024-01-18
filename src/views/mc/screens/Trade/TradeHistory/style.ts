/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Trade/TradeHistory/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    flex: 1
  },
  datePicker:{
    height: G.mixin.rem(50),
    justifyContent: 'center',
  },
  dateInput: {
    width: G.mixin.rem(100),
  },
  datePickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: G.mixin.rem(300),
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(10),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  dateActive: {
    backgroundColor: '#D9D9D9',
  },
  datePickerButton: {
    width: G.mixin.rem(60),
    height: G.mixin.rem(24),
    borderRadius: G.mixin.rem(3),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: G.mixin.rem(1),
    backgroundColor: '#fff',
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
