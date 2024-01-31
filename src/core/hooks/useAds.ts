/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-12-08 19:11:16
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useAds.ts
 * @Description:
 */
import React from "react";
import { useSelector } from "react-redux";
import usePublicState from "./usePublicState";
import useRouteWebCommon from "./useRouteWebCommon";

export default () => {

  const { ossDomain } = usePublicState();
  const { forward } = useRouteWebCommon();
  const LoginPageAd = useSelector((state: any) => state.base.appDisplayConfig?.LoginPageAd?.Data?.[0]);
  const RegisterPageAd = useSelector((state: any) => state.base.appDisplayConfig?.RegisterPageAd?.Data?.[0]);
  const [loginAd, setLoginAd] = React.useState<any>(null);
  const [registerAd, setRegisterAd] = React.useState<any>(null);

  React.useEffect(() => {
    if(!LoginPageAd){
      return;
    }
    const Content = JSON.parse(LoginPageAd.Content);
    setLoginAd({
      Image: ossDomain + LoginPageAd.BannerImg,
      Content,
      Name: LoginPageAd.Name,
      OnPress: () => forward({ type: 'origin', title: LoginPageAd.Name, uri: Content.RedirectUrl })
    });
  }, [LoginPageAd])

  React.useEffect(() => {
    if(!RegisterPageAd){
      return;
    }
    setRegisterAd({
      Image: ossDomain + RegisterPageAd.BannerImg,
      Content: RegisterPageAd.Content,
      Name: RegisterPageAd.Name,
      OnPress: () => forward({ type: 'origin', title: RegisterPageAd.Name, uri: RegisterPageAd.Content })
    });
  }, [RegisterPageAd])


  return {
    LoginPageAd: loginAd,
    RegisterPageAd: registerAd
  }

}
