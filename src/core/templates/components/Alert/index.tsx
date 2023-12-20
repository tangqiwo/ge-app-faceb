/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 17:47:24
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/Alert/index.tsx
 * @Description: 弹出框系统自带
 */
import _ from 'lodash';
import React from 'react';
import { Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import Popup, { PopupContent, PopupActions } from '@views/mc/shadow/Popup';
import { Button } from '@ui-base/index';
import ACTIONS from '@actions/index';

export default () => {

  const dispatch = useDispatch();
  const close = () => dispatch(ACTIONS.BASE.closeModal());
  const { display, title, content, actions, type, top } = useSelector((state: any) => state.base.modal);

  React.useEffect(() => {
    if(display && type !== 'component'&& type !== 'test'){
      let _actions: any = [];
      _.each(actions, (item: any) => {
        _actions.push({ text: item.text, style: item.type || 'default', onPress: () => { item.cb && item.cb(); close() }})
      })
      Alert.alert(
        title,
        content,
        _actions,
      )
    }
  }, [display])

  if(display && type === 'component'){
    return (
      <Popup display={true} title={title} top={top} close={close} >
        <PopupContent wrapperType={title === '输入资金密码' ? 'Keyboard' : 'View'} extraHeight={100} extraScrollHeight={-300}>
          { content }
        </PopupContent>
        <PopupActions>
          {
            _.map(actions, (item: any) =>
              <Button
                text={item.text}
                type={item.text === '取消' ? 'cancel' : 'submit'}
                action={item.cb || close}
              />
            )
          }
        </PopupActions>
      </Popup>
    )
  }
  return(
   <></>
  )

}