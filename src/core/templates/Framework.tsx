/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-22 18:06:16
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/Framework.tsx
 * @Description: 框架（公共组件）
 */

import React from 'react';
import Loading from '@views/mc/shadow/Loader';
import Alert from '@views/mc/shadow/Alert';
import Toast from '@views/mc/shadow/Toast';
import Popups from '@core/templates/components/__Popups'
import useHotUpdate from "@core/hooks/useHotUpdate";
import useStateKeeper from '@core/hooks/useStateKeeper';
import useRouteHelper from '@core/hooks/useRouteHelper';
import useListener from '@core/hooks/useListener';
import useStart from '@hooks/useStart';
import usePopupAdvert from '@core/hooks/usePopupAdvert';


export default () => {

  useRouteHelper();
  useStateKeeper();
  usePopupAdvert();
  useListener();

  const { startUpdateCheck } = useHotUpdate();
  const { init } = useStart();

  React.useEffect(() => {
    startUpdateCheck();
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