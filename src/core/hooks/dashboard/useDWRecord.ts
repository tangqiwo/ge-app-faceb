/*
 * @Author: Galen.GE
 * @Date: 2023-07-25 12:05:57
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/hooks/dashboard/useDWRecord.ts
 * @Description: 下级存取记录
*/

import dayjs from 'dayjs';
import { $t } from '@hooks/useI18n';
import usePublicState from '@core/hooks/usePublicState';
import useCommon, { IQuery } from './common';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const [ myQuery, setMyQuery ] = React.useState<{
    accoutType: number,
    queryType: number,
    value: string,
    start: string,
    end: string
  }>({
    accoutType: 1,
    queryType: 1,
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
      Type: number,
      Range: string[]
    } = {
      Mt4IdOfMember: Number(myQuery.value),
      RealNameOfMember: '',
      Type: myQuery.queryType,
      Range: [
        dayjs(myQuery.start).startOf('days').format('YYYY-MM-DD'),
        dayjs(myQuery.end).endOf('days').format('YYYY-MM-DD')
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
    dispatch(ACTIONS.DASHBOARD.getSubordinateDepositWithdrawal({data: querys, cb: (res: any) => {
      queryCommon.setData(res.Data.Data);
      queryCommon.setRecordsCount(res.Data.Count || 0);
    }}))
  }

  // 获取存取记录总计
  const getSubordinateDepositWithdrawalTotal = (querys?: any) => {
    dispatch(ACTIONS.DASHBOARD.getDepositWithdrawalTotal({data: querys, cb: (res: any) => {
      queryCommon.setTotal(res.Data);
    }}))
  }
  // 初始化
  const init: IQuery = {
    conditions: {
      Mt4IdOfMember: 0,
      RealNameOfMember: '',
      Type: 1,
      Range: [
        dayjs().add(-7, 'day').startOf('days').format('YYYY-MM-DD'),
        dayjs().endOf('days').format('YYYY-MM-DD')
      ]
    },
    search
  }
  const queryCommon = useCommon(init);

  React.useEffect(() => {
    getSubordinateDepositWithdrawalTotal();
    queryCommon.doQuery();
  }, [])

  return {
    ...queryCommon,
    myQuery,
    setMyQuery,
    getSubordinateDepositWithdrawalTotal,
    QUERY_TYPE: [
      { text: $t('注资'), value: 1 },
      { text: $t('取款'), value: 2 },
    ]
  }

}

