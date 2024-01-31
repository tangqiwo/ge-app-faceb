/*
 * @Author: Galen.GE
 * @Date: 2024-01-30 19:28:18
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useProfile.ts
 * @Description:
 */
import React from "react";
import { useSelector } from "react-redux";
import usePublicState from "./usePublicState";

export default () => {

  const { dispatch, ACTIONS } = usePublicState();
  const info = useSelector((state: any) => state.user.info);

  // 上传身份证
  const improveIdCardImage = React.useCallback((IdCardUrlOne: string, IdCardUrTwo: string): any => {
    if(!IdCardUrlOne){
      dispatch(ACTIONS.BASE.openToast({text: '请上传身份证正面'}));
      return;
    }
    if(!IdCardUrTwo){
      dispatch(ACTIONS.BASE.openToast({text: '请上传身份证反面'}));
      return;
    }
    dispatch(ACTIONS.USER.submitIdCardImage({
      data: {
        IdCardUrlOne,
        IdCardUrTwo
      },
      cb: () => {
        dispatch(ACTIONS.BASE.openToast({text: '上传成功'}));
        dispatch(ACTIONS.USER.getUserInfo({}));
      }
    }));
  }, [])

  // 变更头像
  const updateAvatar = (avatarId: number | string, callback: Function) => {
    dispatch(ACTIONS.USER.updateAvatar({
      Avatar: `${avatarId}`,
      cb: () => {
        dispatch(ACTIONS.USER.updateUserInfo({ ...info, Avatar: `${avatarId}`}));
        callback();
      }
    }))
  }

  return {
    improveIdCardImage,
    updateAvatar
  }

}