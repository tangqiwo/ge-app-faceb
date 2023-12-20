/*
 * @Author: Galen.GE
 * @Date: 2023-07-21 11:16:19
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/hooks/dashboard/useCommissionRecord.ts
 * @Description: 佣金记录
*/
import dayjs from 'dayjs';

import usePublicState from '@core/hooks/usePublicState';
import useCommon, { IQuery } from './common';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [ myQuery, setMyQuery ] = React.useState<{
    start: string,
    end: string
   }>({
    start: dayjs().add(-7, 'day').format('YYYY-MM-DD'),
    end: dayjs().format('YYYY-MM-DD')
  });

  // 同步查询条件实际值
  React.useEffect(() => {
    var conditions: {
      Range: string[]
    } = {
      Range: [
        dayjs(myQuery.start).startOf('days').format('YYYY-MM-DD HH:mm:ss'),
        dayjs(myQuery.end).endOf('days').format('YYYY-MM-DD HH:mm:ss')
      ]
    };
    queryCommon.setQuerys({ ...conditions });
  }, [myQuery]);


  // 查询
  const search = (querys?: any) => {
    dispatch(ACTIONS.DASHBOARD.getCommissionRecord({data: querys, cb: (res: any) => {
      queryCommon.setData(_.map(res.Data.Data, (item: any) => ({...item, CreatedAt: dayjs(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss')})));
      queryCommon.setRecordsCount(res.Data.Count || 0);
    }}))
  }

  // 初始化
  const init: IQuery = {
    conditions: {
      Range: [
        dayjs().add(-7, 'day').startOf('days').format('YYYY-MM-DD HH:mm:ss'),
        dayjs().endOf('days').format('YYYY-MM-DD HH:mm:ss')
      ]
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

