/*
 * @Description: 轮播图逻辑
 * @Author: ammo@xyzzdev.com
 * @Date: 2020-01-01 11:07:44
 * @LastEditTime: 2023-12-08 17:56:04
 * @LastEditors: ammo@xyzzdev.com
 */
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import usePublicState from './usePublicState';

export default () => {

  const { ossDomain } = usePublicState();
  const [ banners, setBanners ] = React.useState<null | Array<{image: string, link: string}>>(null);
  const [ subsidy, setSubsidy ] = React.useState<null | Array<{image: string, link: string, name: string}>>(null);
  const homeInfos = useSelector((state: any) => state.base.homeInfos);

  React.useEffect(() => {
    if(_.isEmpty(homeInfos)){
      return;
    }
    const res = homeInfos;
    setBanners(res.Activity.map((i: any) => ({image: i.ImageOnPhone, link: i.AppLink})));
    if(res.Subsidy100M){
      const one = res.Subsidy100M?.Subsidy100M1?.Data?.[0];
      const two = res.Subsidy100M?.Subsidy100M2?.Data?.[0];
      if(one && two) {
        setSubsidy([
          { image: one.BannerImg, name: JSON.parse(one.Content).RedirectTitle, link: JSON.parse(one.Content).RedirectUrl },
          { image: two.BannerImg, name: JSON.parse(two.Content).RedirectTitle, link: JSON.parse(two.Content).RedirectUrl },
        ])
      }
    }
  }, [homeInfos])

  return {
    ossDomain,
    banners,
    subsidy,
  }

}