/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-16 12:43:18
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/constants/menus/reportMenu.ts
 * @Description: 报表菜单
 */
import _ from 'lodash';

export const REPORT_MENUS = [
  {
    id: 344359,
    name: '体育返水',
    userType: [1, 3]
  },
  {
    id: 344351,
    name: '真人返水',
    userType: [1, 3]
  },
  {
    id: 401884,
    name: '棋牌返水',
    userType: [1, 3]
  },
  {
    id: 403229,
    name: '电竞返水',
    userType: [1, 3]
  },
  {
    id: 344438,
    name: '盈亏报表'
  }

]


interface IGetReportMenus {
  getter: Array<{
    name: string;           // 父级目录
    ids: Array<Number>;     // 这个目录下的菜单项目
    [key: string]: any
  }>;
  menus?: Array<any>
}
export const makeReportMenus = ({getter, menus = REPORT_MENUS}: IGetReportMenus) => {
  return _.map(getter, ({name, ids, ...props}: any) => ({
    name,
    menus: _.chain(menus).filter((it: any) => _.includes(ids, typeof it.id === 'function' ? it.id() : it.id)).map((item: any) => typeof item.id === 'function' ? ({ ...item, id: item.id() }) : item).value(),
    ...props
  }))
};
