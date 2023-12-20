/*
 * @Author: Galen.GE
 * @Date: 2023-07-21 11:16:19
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/hooks/dashboard/useCustomerList.ts
 * @Description: 客户列表
*/
import usePublicState from '@core/hooks/usePublicState';
import useCommon, { IQuery } from './common';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [ myQuery, setMyQuery ] = React.useState<{ accoutType: number, value: string }>({
    accoutType: 1,
    value: ''
  });

  // 切换查询类型时，清空查询条件
  React.useEffect(() => setMyQuery({...myQuery, value: ''}), [myQuery.accoutType]);

  // 同步查询条件实际值
  React.useEffect(() => {
    var conditions: {
      Mt4IdOfMember: number | string,
      RealNameOfMember: string
    } = {
      Mt4IdOfMember: Number(myQuery.value),
      RealNameOfMember: ''
    };
    // 输入姓名时，查询条件为姓名
    if (myQuery.accoutType === 2) {
      conditions.Mt4IdOfMember = 0;
      conditions.RealNameOfMember = myQuery.value;
    }
    queryCommon.setQuerys({ ...conditions });
  }, [myQuery]);


  // 查询
  const search = (querys?: any) => {
    dispatch(ACTIONS.DASHBOARD.getCustomerList({data: querys, cb: (res: any) => {
      queryCommon.setData(res.Data.Data);
      queryCommon.setRecordsCount(res.Data.Count || 0);
    }}))
  }

  // 初始化
  const init: IQuery = {
    conditions: {
      Mt4IdOfMember: 0,
      RealNameOfMember: ''
    },
    search
  }
  const queryCommon = useCommon(init);

  React.useEffect(queryCommon.doQuery, [])

  return {
    ...queryCommon,
    myQuery,
    setMyQuery
  }

}

