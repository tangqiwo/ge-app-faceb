/*
 * @Author: Galen.GE
 * @Date: 2024-03-25 14:30:41
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useQuotesQuery.ts
 * @Description:
 */

import useWebsocket from './useWebsocket';
import { useSelector } from 'react-redux';

export default () => {

  const Mt4ChartQuoteGateway = useSelector((state: any) => state.base.faceBConfig?.Mt4ChartQuoteGateway);

  useWebsocket({
    url: Mt4ChartQuoteGateway?.Path,
    protocol: 'quotes-query',
    onOpen: (ws: any) => {
      const data = {
        Symbol: 'SymbolList',
        Timeframe: 'Realtime',
      }
      ws.send(JSON.stringify(data));
    },
  });

}