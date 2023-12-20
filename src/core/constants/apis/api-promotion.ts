/*
 * @Author: Galen.GE
 * @Date: 2023-07-05 11:24:15
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/apis/api-promotion.ts
 * @Description: 推广活动相关
 */

export default {

  // 获取活动中心列表
  ['promotion/get-promotion-center-list']: 'MC/Activity/GetActivityList',

  // 获取参加活动的进度
  ['promotion/get-promotion-progress']: 'activity/get_join_record?MainId=$',

  // 参加活动
  ['promotion/apply-promotion']: 'activity/join',

  // 参加活动明细
  ['promotion/get-promotion-detail']: 'activity/$',

  // 登记参与推荐人活动
  ['promotion/apply-promotion-as-introducer']: 'activity/enable_referral_state'

};
