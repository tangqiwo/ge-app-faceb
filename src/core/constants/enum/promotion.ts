/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-12-11 23:33:47
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/constants/enum/promotion.ts
 * @Description:
 */

export enum EPromotionTypes {
  // 开户￥88红包活动
  RED_ENVELOPE88 = 10,
  // 新客30000赠金活动
  NEW_USER_30000 = 8
}


export enum EPromotionQueryKey {
  // 开户￥88红包活动
  RED_ENVELOPE88 = 'select_register_exclusive_record',
  // 新客30000赠金活动
  NEW_USER_30000 = 'select_new_customer_30000_record'
}