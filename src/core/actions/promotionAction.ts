/*
 * @Author: Galen.GE
 * @Date: 2023-07-05 11:19:02
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/actions/promotionAction.ts
 * @Description: 推广活动相关
 */
import * as INTERFACE from '@schemas/redux-action';
import { HTTP } from '@core/helpers/http';
import TYPES from '@core/constants/types';

// 获取活动中心列表
export const getPromotionCenterList = (props: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.PROMOTION.GET_PROMOTION_CENTER_LIST,
  payload: {
    key: 'promotion/get-promotion-center-list',
    method: HTTP.METHODS.GET,
    isFormatRes: true,
  },
  cb: props.cb,
});

// 获取参加活动的进度
export const getPromotionProgress = ({ urlParams, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'promotion/get-promotion-progress',
    method: HTTP.METHODS.GET,
    urlParams,
    isFormatRes: true,
  },
  cb,
});

// 参加活动
export const applyPromotion = ({ data, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'promotion/apply-promotion',
    method: HTTP.METHODS.POST,
    data,
    loading: true,
    isFormatRes: true,
  },
  cb,
});

// 参加活动明细
export const getPromotionDetail = ({ data, urlParams, cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'promotion/get-promotion-detail',
    method: HTTP.METHODS.POST,
    data,
    urlParams,
    isFormatRes: true,
  },
  cb,
});

// 登记参与推荐人活动
export const applyPromotionAsIntroducer = ({ cb }: INTERFACE.IProps): INTERFACE.IAPI => ({
  type: TYPES.BASE.HTTP_ONLY,
  payload: {
    key: 'promotion/apply-promotion-as-introducer',
    method: HTTP.METHODS.POST,
    data: {},
    loading: true,
  },
  cb,
});
