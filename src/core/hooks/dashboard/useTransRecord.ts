/*
 * @Author: Galen.GE
 * @Date: 2023-08-02 16:45:24
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/hooks/dashboard/useTransRecord.ts
 * @Description: 交易记录
 */
import dayjs from "dayjs";
import { $t } from '@hooks/useI18n';
import usePublicState from "../usePublicState";
import useCommon, { IQuery } from './common';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();

  // 查询
  const search = (querys?: any) => {
    var Ticket = querys.Ticket;
    if(Ticket === ''){
      Ticket = 0;
    }else{
      Ticket = Number(Ticket);
      if(_.isNaN(Ticket)){
        Ticket = 0;
      }
    }
    dispatch(ACTIONS.DASHBOARD.getTransactionRecord({
      data: {...querys, Ticket, Cmd: Number(querys.Cmd) }, cb: (res: any) => {
      queryCommon.setData(res.Data.Data);
      queryCommon.setRecordsCount(res.Data.Count || 0);
    }}))
  }

  // 初始化
  const init: IQuery = {
    conditions: {
      Cmd: -1,
      Range: [
        dayjs().add(-180, 'day').startOf('days').format('YYYY-MM-DD'),
        dayjs().endOf('days').format('YYYY-MM-DD')
      ],
      Symbol: "",
      Ticket: ""
    },
    search
  }
  const queryCommon = useCommon(init);

  React.useEffect(queryCommon.doQuery, [])

  return {
    ...queryCommon,
    MT4_PRODUCT_TYPE,
    PRODUCT_DIRECTION
  }

}


// MT4 产品类型
export const MT4_PRODUCT_TYPE = [
  { text: $t('全部'), value: '' },
  { text: 'XAUUSD', value: 'XAUUSD' },
  { text: 'XAUUSDpro', value: 'XAUUSDpro' },
  { text: 'XAGUSD', value: 'XAGUSD' },
  { text: 'XAGUSDpro', value: 'XAGUSDpro' },
]

// 产品方向
export const PRODUCT_DIRECTION = [
  { text: $t('全部'), value: -1 },
  { text: $t('买入'), value: 0 },
  { text: $t('卖出'), value: 1 },
]
