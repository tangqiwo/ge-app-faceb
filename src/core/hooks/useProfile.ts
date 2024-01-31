/*
 * @Author: Galen.GE
 * @Date: 2024-01-30 19:28:18
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useProfile.ts
 * @Description:
 */
import React from "react";
import usePublicState from "./usePublicState";

export default () => {

  const { dispatch, ACTIONS } = usePublicState();

  // 上传身份证
  const improveIdCardImage = React.useCallback((IdCardUrlOne: string, IdCardUrTwo: string): any => {
    if(!IdCardUrlOne || !IdCardUrTwo){
      dispatch(ACTIONS.BASE.openToast({text: '请上传身份证正反面'}));
      return false;
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

  return {
    improveIdCardImage
  }

}