/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2024-01-30 13:55:50
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useUploadOss.ts
 * @Description:
 */
import _ from 'lodash';
import usePublicState from "./usePublicState";
import {Platform} from "react-native";

export default () => {

  const { dispatch, ACTIONS } = usePublicState();

  const uploadOss = async (file: any, type: 'font_id' | 'back_id' | 'bank_card', callback?: Function) => {
    dispatch(ACTIONS.BASE.openLoading());
    dispatch(
      ACTIONS.BASE.GET_UPLOAD_URL({
        data: {
          FileName: `${_.now()}-${_.random(99999)}-${file.fileName}`,
          Prefix: Prefix[type],
        },
        cb: async (res: any) => {
          if (res.Code !== 0) {
            dispatch(ACTIONS.BASE.closeLoading());
            dispatch(ACTIONS.BASE.openToast({types: 'error', text: '获取上传链接失败'}));
            return;
          }
          let obj = res.Data;
          if (obj['Data'] != null) {
            obj = obj['Data'];
          }
          let json = JSON.parse(obj);
          let host = json['Host'];
          let policyBase64 = json['Policy'];
          let accessid = json['AccessKeyId'];
          let signature = json['Signature'];
          let callbackbody = json['Callback'];
          let key = json['Directory'].substr(1);
          let formData = new FormData();
          formData.append('key', key);
          formData.append('policy', policyBase64);
          formData.append('OSSAccessKeyId', accessid);
          formData.append('success_action_status', '200');
          formData.append('callback', callbackbody);
          formData.append('signature', signature);
          formData.append('Prefix', Prefix[type]);
          formData.append('File', {
            name: file.fileName,
            type: file.type,
            uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', '')
          });
          fetch(host, {method: 'POST',body: formData})
               .then(res => {
                  if(res.status !== 200){
                    dispatch(ACTIONS.BASE.openToast({types: 'error', text: '上传OSS失败'}));
                    return;
                  }
                  callback && callback(json['Directory']);
               })
               .finally(() => {
                  dispatch(ACTIONS.BASE.closeLoading());
                })

        }
      }),
    )

  }

  return {
    uploadOss
  }

}


const Prefix = {
  'font_id': 'id_one',
  'back_id': 'id_two',
  'bank_card': 'bank_card'
}