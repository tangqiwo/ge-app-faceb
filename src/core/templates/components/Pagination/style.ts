/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-24 03:40:22
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Pagination/style.ts
 * @Description:
 */
import G from '@views/mc/styles/index';
import { StyleSheet } from 'react-native';

export const LS = StyleSheet.create({
  box: {
    flex: 1,
    marginTop: 15,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 25,
  },
  nextPrev: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%'
  },
  next: {
    justifyContent: 'flex-end'
  },
  prev: {
    justifyContent: 'flex-start'
  },
  goPage: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4
  },
  text: {
    fontSize: 12,
    marginLeft: 5,
    marginRight: 5,
    color: G.var.colors.secondary[400]
  },
  page: {
    ...G.mixin.padding(2, 6, 2, 6),
    backgroundColor: G.var.colors.gray[100],
    color: G.var.colors.gray[400],
    fontSize: 14,
    ...G.mixin.shadow({offset: {width: 2, height: 2}})
  }
})

// 固定导出
export const GS = G;
export default { GS, LS };
