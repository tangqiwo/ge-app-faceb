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

  // 修改昵称
  const updateNickName = (nickName: string, callback: Function) => {
    if(!nickName){
      dispatch(ACTIONS.BASE.openToast({text: '请输入昵称'}));
      return;
    }
    if(nickName === info.Nickname){
      dispatch(ACTIONS.BASE.openToast({text: '昵称未变更'}));
      return;
    }
    dispatch(ACTIONS.USER.updateNickname({Nickname: nickName, cb: () => {
      dispatch(ACTIONS.USER.updateUserInfo({...info, Nickname: nickName}));
      callback();
    }}))
  }

  // 修改邮箱地址
  const updateEmail = (email: string, callback: Function) => {
    if(!email){
      dispatch(ACTIONS.BASE.openToast({text: '请输入邮箱地址'}));
      return;
    }
    if(email === info.Email){
      dispatch(ACTIONS.BASE.openToast({text: '邮箱地址未变更'}));
      return;
    }
    // 校验邮箱格式
    if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)){
      dispatch(ACTIONS.BASE.openToast({text: '邮箱格式不正确'}));
      return;
    }
    dispatch(ACTIONS.USER.updateEmail({Email: email, cb: () => {
      dispatch(ACTIONS.USER.updateUserInfo({...info, Email: email}));
      callback();
    }}))
  }

  // 修改地址
  const updateAddress = (address: string, callback: Function) => {
    if(!address){
      dispatch(ACTIONS.BASE.openToast({text: '请输入地址'}));
      return;
    }
    if(address === info.Address){
      dispatch(ACTIONS.BASE.openToast({text: '地址未变更'}));
      return;
    }
    dispatch(ACTIONS.USER.updateAddress({Address: address, cb: () => {
      dispatch(ACTIONS.USER.updateUserInfo({...info, Address: address}));
      callback();
    }}))
  }

  // 修改密码
  interface IUpdatePassword {
    oldPassword?: string;
    newPassword: string;
    confirmPassword: string;
    code?: string;
    callback: Function;
  }
  const updatePassword = ({oldPassword, newPassword, confirmPassword, callback}: IUpdatePassword) => {
    if(!oldPassword){
      dispatch(ACTIONS.BASE.openToast({text: '请输入旧密码'}));
      return;
    }
    if(!newPassword){
      dispatch(ACTIONS.BASE.openToast({text: '请输入新密码'}));
      return;
    }
    if(newPassword !== confirmPassword){
      dispatch(ACTIONS.BASE.openToast({text: '两次密码输入不一致'}));
      return;
    }
    dispatch(ACTIONS.USER.updateGeUserPassword({
      data: {
        OldPassword: oldPassword,
        NewPassword: newPassword,
      },
      cb: () => {
        dispatch(ACTIONS.BASE.openToast({text: '修改成功'}));
        callback();
      }
    }))
  }

  // 修改MT4密码
  const updateMt4Password = ({code, newPassword, confirmPassword, callback}: IUpdatePassword) => {
    if(!newPassword){
      dispatch(ACTIONS.BASE.openToast({text: '请输入新密码'}));
      return;
    }
    if(newPassword !== confirmPassword){
      dispatch(ACTIONS.BASE.openToast({text: '两次密码输入不一致'}));
      return;
    }
    if(!code){
      dispatch(ACTIONS.BASE.openToast({text: '请输入验证码'}));
      return;
    }
    dispatch(ACTIONS.USER.updateMT4Password({
      data: {
        Password: newPassword,
        AuthCode: code,
      },
      cb: () => {
        dispatch(ACTIONS.BASE.openToast({text: '修改成功'}));
        callback();
      }
    }))
  }

  return {
    improveIdCardImage,
    updateAvatar,
    updateNickName,
    updateEmail,
    updateAddress,
    updatePassword,
    updateMt4Password
  }

}