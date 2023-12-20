/*
 * @Author: Galen.GE
 * @Date: 2023-06-11 17:36:55
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/componentController/usePopups.ts
 * @Description: POPUP 控制器
 */
import usePublicState from "../usePublicState";
import UserPrivacy from '@core/templates/components/__Popups/UserPrivacy';
import UserAgreement from "@core/templates/components/__Popups/UserAgreement";

export default () => {

  const { rs, dispatch, ACTIONS } = usePublicState();

  type POPUP_TYPES =
    | 'USER_AGREEMENT'
    | 'USER_PRIVACY'

  const openPopups = (type: POPUP_TYPES) => {
    dispatch(ACTIONS.BASE.openPopups({type}));
  }

  const closePopups = () => {
    dispatch(ACTIONS.BASE.closePopups());
  }

  const Mappings: any = {
    ['USER_AGREEMENT']: {
      title: '用户协议',
      content: UserAgreement
    },
    ['USER_PRIVACY']: {
      title:'用户隐私',
      content: UserPrivacy
    },
  }

  return {
    display:  rs.base.popups.display,
    type:  rs.base.popups.type,
    openPopups,
    closePopups,
    title: Mappings[rs.base.popups.type]?.title,
    content: Mappings[rs.base.popups.type]?.content
  }

}
