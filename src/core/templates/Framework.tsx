/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-22 18:06:16
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/Framework.tsx
 * @Description: 框架（公共组件）
 */

import React from 'react';
import Loading from '@views/mc/shadow/Loader';
import Alert from '@views/mc/shadow/Alert';
import Toast from '@views/mc/shadow/Toast';
import Popups from '@core/templates/components/__Popups'
import useStateKeeper from '@core/hooks/useStateKeeper';
import useRouteHelper from '@core/hooks/useRouteHelper';
import useListener from '@core/hooks/useListener';
import useStart from '@hooks/useStart';
import usePopupAdvert from '@core/hooks/usePopupAdvert';
// import useQuotesQuery from '@core/hooks/useQuotesQuery';


export default () => {

  useRouteHelper();
  useStateKeeper();
  usePopupAdvert();
  useListener();
  // useQuotesQuery();

  const { init } = useStart();

  React.useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Loading />
      <Alert />
      <Toast />
      <Popups />
    </>
  )

}