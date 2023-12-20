/*
 * @Author: Galen.GE
 * @Date: 2023-07-21 11:13:36
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/dashboard/common.ts
 * @Description:
*/
import React from 'react';

export interface IQuery{
  conditions: any;           // 条件
  search: Function;          // 查询函数
}
export default ({ search, conditions }: IQuery) => {

  const PageSize = 10;

  // 初始化查询条件
  const [querys, setQuerys] = React.useState({Page:1, PageSize, ...conditions });
  const [recordsCount, setRecordsCount] = React.useState<any>(0);
  const [data, setData] = React.useState<any>(null);
  const [total, setTotal] = React.useState<any>(null);

  // 手动激活查询方法
  const doQuery = (fields?: any) => {
    setData(null);
    setQuerys({...querys, Page: 1, PageSize, ...fields});
    search({...querys, Page: 1, PageSize, ...fields})
  }

  return {
    recordsCount,
    setRecordsCount,
    setQuerys: (field: any) => setQuerys({...querys,...field}),
    doQuery,
    pageNo: querys.pageNo,
    querys,
    data,
    setData,
    total,
    setTotal,
    QUERY_ACCOUNT_TYPE
  }

}


export const QUERY_ACCOUNT_TYPE = [
  { value: 1, text: '交易账户' },
  { value: 2, text: '姓名' }
]
