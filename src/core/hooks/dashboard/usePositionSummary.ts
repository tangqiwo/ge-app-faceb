/*
 * @Author: Galen.GE
 * @Date: 2023-07-25 01:17:33
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/hooks/dashboard/usePositionSummary.ts
 * @Description: 下级仓位总结
*/
import dayjs from 'dayjs';
import usePublicState from '@core/hooks/usePublicState';
import useCommon, { IQuery } from './common';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [ myQuery, setMyQuery ] = React.useState<{
    accoutType: number,
    value: string,
    start: string,
    end: string
  }>({
    accoutType: 1,
    value: '',
    start: dayjs().add(-7, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD')
  });

  // 切换查询类型时，清空查询条件
  React.useEffect(() => setMyQuery({...myQuery, value: ''}), [myQuery.accoutType]);

  // 同步查询条件实际值
  React.useEffect(() => {
    var conditions: {
      Mt4IdOfMember: number | string,
      RealNameOfMember: string,
      Range: string[]
    } = {
      Mt4IdOfMember: Number(myQuery.value),
      RealNameOfMember: '',
      Range: [
        dayjs(myQuery.start).startOf('days').format('YYYY-MM-DD HH:mm:ss'),
        dayjs(myQuery.end).endOf('days').format('YYYY-MM-DD HH:mm:ss')
      ]
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
    dispatch(ACTIONS.DASHBOARD.getPositionSummary({data: querys, cb: (res: any) => {
      queryCommon.setData(res.Data.Data);
      queryCommon.setRecordsCount(res.Data.Count || 0);
    }}))
  }

  // 获取仓位总结总计
  const getPositionSummaryTotal = (querys?: any) => {
    dispatch(ACTIONS.DASHBOARD.getPositionSummaryTotal({
      cb: (res: any) => {
        queryCommon.setTotal(res.Data);
      }
    }))
  }

  // 初始化
  const init: IQuery = {
    conditions: {
      Mt4IdOfMember: 0,
      RealNameOfMember: '',
      Range: [
        dayjs().add(-7, 'day').startOf('days').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('days').format('YYYY-MM-DD HH:mm:ss')
      ]
    },
    search
  }
  const queryCommon = useCommon(init);

  React.useEffect(() => {
    queryCommon.doQuery();
    getPositionSummaryTotal();
  }, [])

  return {
    ...queryCommon,
    myQuery,
    setMyQuery
  }

}

