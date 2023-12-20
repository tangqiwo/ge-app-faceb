/*
 * @Author: Galen.GE
 * @Date: 2023-08-09 23:45:35
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/hooks/dashboard/useFlowDetail.ts
 * @Description: 资金存取流水明细
 */

import dayjs from 'dayjs';
import usePublicState from '@core/hooks/usePublicState';
import { $t } from '@hooks/useI18n';
import useCommon, { IQuery } from './common';
import { zipString } from '@helpers/unit';

export default () => {

  const { dispatch, ACTIONS } = usePublicState();

  // 查询
  const search = (querys?: any) => {
    dispatch(ACTIONS.DASHBOARD.getDepositWithdrawalDetail({
      type: querys.QueryType,
      data: _.omit(querys, 'QueryType'),
      cb: (res: any) => {
        const data = _.map(res.Data.List, (item: any) => ({
          ...item,
          PaymentType: _.chain(item.PaymentType).split(':').last().value(),
          PaymentAddress: zipString((item.PaymentAddress || item.AccountOfPayee || '')),
          PaymentName: item.PaymentName || getBankInfo(item.ExtraOfPayee)
        }))
        queryCommon.setData(data);
        queryCommon.setRecordsCount(res.Data.Count || 0);
    }}))
  }

  // 通过JSON字符串获取银行卡信息
  const getBankInfo = (json: string) => {
    try {
      const data = JSON.parse(json);
      return data.BankName;
    } catch (error) {
      return '';
    }
  }

  // 初始化
  const init: IQuery = {
    conditions: {
      QueryType: 'select_order_details',
      Range: [
        dayjs().add(-90, 'day').startOf('days').format('YYYY-MM-DD'),
        dayjs().endOf('days').format('YYYY-MM-DD')
      ]
    },
    search
  }

  const queryCommon = useCommon(init);

  React.useEffect(() => {
    queryCommon.doQuery();
  }, [])

  React.useEffect(() => {
    queryCommon.doQuery();
  }, [queryCommon.querys.QueryType])

  return {
    ...queryCommon,
    QUERY_TYPE: [
      { text: $t('注资'), value: 'select_order_details' },
      { text: $t('取款'), value: 'select_withdrawal_order_details' },
    ],
    PAY_TYPE: [
      { text: "TRC20", value: "TRC20" },
      { text: "ERC20", value: "ERC20"},
      { text: $t("支付宝"), value: "AliPay"},
      { text: $t("微信"), value: "WeChat" },
      { text: $t("银行卡"), value: "BankCard"}
    ],
    // 入账类型
    INCOME_TYPE: {
      Member: 'Member',
      Manager: 'Manager'
    }
  }

}
