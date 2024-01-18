/*
 * @Author: Galen.GE
 * @Date: 2024-01-02 10:22:23
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/trade/useKlineData.ts
 * @Description:
 */

import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import usePublicState from '@hooks/usePublicState';

interface IProps{
  Symbol: string;
}
export default ({Symbol}: IProps) => {

  const { dispatch, ACTIONS } = usePublicState();
  const Mt4ClientApiToken = useSelector((state: any) => state.trade.mt4Info.Mt4ClientApiToken);
  const data = useSelector((state: any) => state.trade.klineData);

  const getKlineData = (Timeframe = 'W1') => {
    dispatch(ACTIONS.TRADE.getKlineData({
      data: {
        Mt4ClientApiToken,
        "Symbol": Symbol,
        "Timeframe": Timeframe,
        "From": dayjs().format('YYYY-MM-DDTHH:mm:ss'),
        "Count":30,
      },
      cb: (res: any) => {
        console.log(res);
      }
    }))
  }

  return {
    getKlineData,
    data
  }
}