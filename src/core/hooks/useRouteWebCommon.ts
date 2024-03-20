/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-12-06 16:26:05
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useRouteWebCommon.ts
 * @Description: 跳转去通用的路由
 */
import _ from "lodash";
import usePublicState from "./usePublicState"

export default () => {

  const { navigation } = usePublicState();

  interface IForward {
    uri: string,
    title: string
    type?: 'origin' | 'mc' | 'official',
    headerShown?: boolean,
    page?: string,
    reset?: boolean
  }
  const forward = (params: IForward) => {
    params = {
      ...params,
      type: params.type || 'mc',
      headerShown: _.isUndefined(params.headerShown) || true,
      page: params.page || '',
      reset: params.reset
    }
    navigation.navigate('WEB-COMMON', params);
  }

  return {
    forward
  }

}

enum EForwardTypes {
  DEPOSIT           = 'DEPOSIT',
  ATM               = 'ATM',
  ATM_DETAIL        = 'ATM_DETAIL',
  USER_INFOS        = 'USER_INFOS',
  PAYMENT_SETTING   = 'PAYMENT_SETTING',
  QA                = 'QA',
  CMS_INVEST        = 'CMS_INVEST',
  PRD_RULES         = 'PRD_RULES',
  PROMOTIONS        = 'PROMOTIONS',
  CUSTOMER_SERVICE  = 'CUSTOMER_SERVICE',
}

type IForwardTypes = {
  [key in EForwardTypes]: {
    title   : string,
    uri     : string,
    type?   : 'origin' | 'mc' | 'official',
    page?   : string,
  }
}

export const FORWARD_TYPES: IForwardTypes ={
  DEPOSIT: {
    title   : '注资',
    uri     : '/capital-injection',
  },
  ATM: {
    title   : '取款',
    uri     : '/atm',
  },
  ATM_DETAIL: {
    title   : '存取明细',
    uri     : '/atm-detail',
  },
  USER_INFOS: {
    title   : '个人信息',
    uri     : '/profile',
    page    : 'user-infos',
  },
  PAYMENT_SETTING: {
    title   : '支付管理',
    uri     : '/profile',
    page    : 'payment-setting',
  },
  QA: {
    title   : '常见问答',
    uri     : '/service/qa',
    type    : 'official',
    page    : 'qa',
  },
  CMS_INVEST: {
    title   : '投资知识',
    uri     : '/cms/invest',
    type    : 'official',
    page    : 'cms-invest',
  },
  PRD_RULES: {
    title   : '产品细则',
    uri     : '/trade/prd-rules',
    type    : 'official',
    page    : 'prd-rules',
  },
  PROMOTIONS: {
    title   : '优惠活动',
    uri     : '/promotions',
    type    : 'origin',
    page    : 'promotions',
  },
  CUSTOMER_SERVICE: {
    title   : '在线客服',
    uri     : '/service/customer-service',
    type    : 'origin',
  }
}