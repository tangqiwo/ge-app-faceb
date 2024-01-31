/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Profile/style.ts
 * @Description:
 */

import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';


// 本组件样式写到这里
export const LS = StyleSheet.create({
  container: {
    paddingLeft: G.mixin.rem(15),
    paddingRight: G.mixin.rem(15),
    paddingTop: G.mixin.rem(10),
    paddingBottom: G.mixin.rem(10),
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: G.mixin.rem(16),
    color: '#c09d55',
    fontWeight: 'bold',
    marginTop: G.mixin.rem(20),
  },
  avatar: {
    marginTop: G.mixin.rem(15),
    alignItems: 'center',
  },
  avatarImage: {
    width: G.mixin.rem(100),
    height: G.mixin.rem(100),
    borderRadius: G.mixin.rem(50),
    marginBottom: G.mixin.rem(10),
  },
  avatarImageChecked: {
    borderWidth: G.mixin.rem(5),
    borderColor: '#bf9d55',
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: G.mixin.rem(12),
  },
  avatarSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: G.mixin.rem(10),
    marginBottom: G.mixin.rem(10),
  },
  rowData: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    height: G.mixin.rem(40),
    marginTop: G.mixin.rem(10),
  },
  rowLabel: {
    fontWeight: 'bold',
    fontSize: G.mixin.rem(16),
    marginRight: G.mixin.rem(10),
  },
  waitApprove: {
    marginLeft: 'auto',
    width: G.mixin.rem(72),
    height: G.mixin.rem(20),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  waitApproveText: {
    fontSize: G.mixin.rem(10),
    marginRight: G.mixin.rem(10),
    color: '#bf9d55',
  },
  edit: {
    width: G.mixin.rem(24),
    height: G.mixin.rem(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(4),
    marginLeft: 'auto',
    backgroundColor: '#bf9d55',
  },
  cs: {
    paddingLeft: G.mixin.rem(5),
    paddingRight: G.mixin.rem(5),
    height: G.mixin.rem(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: G.mixin.rem(4),
    marginLeft: 'auto',
    backgroundColor: '#bf9d55',
  },
  editIcon: {
    color: 'white',
    fontSize: G.mixin.rem(16),
  },
  editCurrent: {
    paddingLeft: G.mixin.rem(15),
    paddingright: G.mixin.rem(15),
  },
  input: {
    height: G.mixin.rem(40),
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: G.mixin.rem(5),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: G.mixin.rem(10),
    width: G.mixin.rem(346),
    paddingRight: G.mixin.rem(15),
  },
  inputError: {
    marginTop: G.mixin.rem(5),
    color: G.var.colors.red[500],
    marginLeft: G.mixin.rem(15),
    height: G.mixin.rem(20),
    fontSize: G.mixin.rem(10),
  },
  inputIcon: {
    width: G.mixin.rem(15),
    height: G.mixin.rem(18),
  },
  inputText: {
    borderWidth: 0,
    width: G.mixin.rem(260),
    marginLeft: G.mixin.rem(10),
  },
  validateCode: {
    width: G.mixin.rem(80),
    height: G.mixin.rem(24),
    backgroundColor: '#FFC600',
    borderRadius: G.mixin.rem(50),
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selector: {
    width: G.mixin.rem(135),
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

// 固定导出
export const GS = G;
export default { GS, LS };
