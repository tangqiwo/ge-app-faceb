/*
 * @Author: Galen.GE
 * @Date: 2023-07-08 11:31:22
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/reducers/promotionReducer.ts
 * @Description:
 *
 */
import _ from 'lodash';
import TYPES from '@core/constants/types';
import initialState from './redux-store';

export default function user(state = initialState.promotion, action: any) {
  switch (action.type) {
    // 获取prmotion中心列表
    case TYPES.PROMOTION.GET_PROMOTION_CENTER_LIST: {
      // 临时只显示以下几种活动类型
      const types = [8, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16]
      // 屏蔽以下MainID对应的活动
      const mainIds = ['D002'];
      // 自动参与的活动
      const hasJoinedTypes = [10, 15];
      // 克隆一份数据
      let data = _.cloneDeep(action.res.data);
      // 推荐人活动特殊处理
      const recommend = _.find(action.res.data, {type: 9});
      if(recommend) {
        recommend.hasJoined = recommend.hasQualifyVolumesOfCloseTime && recommend.isGroupProfessional;
        data = _.map(data, item => item.type === 9 ? recommend : item);
      }
      return {
        ...state,
        promotionCenterList: action.res.count > 0 ?
                            _.chain(data)
                             .filter(item => _.includes(types, item.type))
                             .filter(item => !_.includes(mainIds, item.mainId))
                            //  不用stopAtOfDisplay过滤活动
                            //  .filter(item => dayjs().isBefore(dayjs(item.stopAtOfDisplay)))
                             .map(item => ({
                                ...item,
                                hasJoined: _.includes(hasJoinedTypes, item.type) ? true : item.hasJoined,
                             }))
                             .reject(item => item.type === 10 && !item.hasJoined)
                             .reject(item => item.type === 13 && !item.hasJoined)
                             .orderBy('hasJoined')
                             .value()
                             : []
      }
    }
    case TYPES.USER.LOGOUT: {
      return {...initialState.promotion };
    }
    default:
      return state;
  }

}

