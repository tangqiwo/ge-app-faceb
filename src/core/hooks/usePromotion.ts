/*
 * @Author: Galen.GE
 * @Date: 2023-07-05 11:27:16
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/usePromotion.ts
 * @Description: 推广活动相关
 */
import usePublicState from './usePublicState';

export default () => {

  const { dispatch, ACTIONS, rs } = usePublicState();

  /**
   * 获取活动中心列表
   */
  const getPromotionCenterList = () => {
    if(!rs.user.info.Mt4Id) return;
    if(rs.user.info.Mt4Id === 0) return;
    dispatch(ACTIONS.PROMOTION.getPromotionCenterList({}));
  };

  // 获取活动参与进度
  const getPromotionProgress = ({ mainId, cb }: { mainId: string; cb: Function }) => {
    dispatch(
      ACTIONS.PROMOTION.getPromotionProgress({
        urlParams: [mainId],
        cb,
      }),
    );
  };

  // 获活动参与进度详情
  const getPromotionDetail = ({ mainId, queryKey, cb }: { mainId: string; queryKey: string; cb: Function }) => {
    dispatch(
      ACTIONS.PROMOTION.getPromotionDetail({
        data: { mainId },
        urlParams: [queryKey],
        cb,
      }),
    );
  };

  // 参加活动
  const applyPromotion = ({
    id,
    subId,
    customSuccessPopup,
  }: {
    id: number;
    subId?: string;
    customSuccessPopup?: (res: any, cb: () => void) => void;
  }) => {
    dispatch(
      ACTIONS.PROMOTION.applyPromotion({
        data: { Id: id, SubId: subId },
        cb: (res: any) => {
          if (customSuccessPopup) {
            customSuccessPopup(res, () => {
              getPromotionCenterList();
            });
          } else {
            dispatch(ACTIONS.BASE.openToast({ text: res.desc, types: 'success' }));
            getPromotionCenterList();
          }
        },
      }),
    );
  };

  // 登记参与推荐人活动
  const applyPromotionAsIntroducer = ({ cb }: { cb: Function }) => {
    dispatch(ACTIONS.PROMOTION.applyPromotionAsIntroducer({ cb }));
  }

  return {
    promotionCenterList: rs.promotion.promotionCenterList,
    getPromotionCenterList,
    applyPromotion,
    getPromotionDetail,
    getPromotionProgress,
    applyPromotionAsIntroducer
  };
};
