/*
 * @Author: Galen.GE
 * @Date: 2023-07-26 15:22:49
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useListener.ts
 * @Description: 监听所有的事件，全局监听
 */
import _ from 'lodash';
import React from 'react';
import usePublicState from './usePublicState';
import usePromotion from './usePromotion';


export default () => {

  const { infos } = usePublicState();
  const { getPromotionCenterList } = usePromotion();

  React.useEffect(() => {
    if(!infos?.Mt4Id || infos?.Mt4Id === 0) {
      return;
    }
    getPromotionCenterList();
  }, [infos?.Mt4Id])

  return {

  }

}
