/*
 * @Author: Galen.GE
 * @Date: 2024-01-30 11:06:16
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/components/ExitPopup/style.ts
 * @Description:
 */
import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  content: {
    width: G.mixin.rem(320),
    paddingLeft: G.mixin.rem(14),
    paddingRight: G.mixin.rem(14),
    paddingTop: G.mixin.rem(14),
    paddingBottom: G.mixin.rem(14),
    backgroundColor: '#fff',
    borderRadius: G.mixin.rem(10),
  },
  imageContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContent: {
    marginTop: G.mixin.rem(20),
    marginBottom: G.mixin.rem(10),
  },
  contentText: {
    fontSize: G.mixin.rem(15),
    textAlign: 'center',
    lineHeight: G.mixin.rem(20),
  },
  actions: {
    marginTop: G.mixin.rem(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    height: G.mixin.rem(40),
    width: G.mixin.rem(130),
    backgroundColor: '#FFC600',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(30),
  },
  cancelButton: {
    height: G.mixin.rem(40),
    width: G.mixin.rem(130),
    backgroundColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(30),
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
