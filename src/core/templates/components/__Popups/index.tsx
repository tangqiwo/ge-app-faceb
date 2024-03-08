/*
 * @Author: Galen.GE
 * @Date: 2023-06-11 16:39:15
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/components/__Popups/index.tsx
 * @Description: 弹出的各种提示
*/
import React from 'react';
import usePopups from '@core/hooks/componentController/usePopups';
import Popup from '@this/shadow/Popup';

export default () => {

  const { display, closePopups, title, content } = usePopups();

  if(!display) return <></>

  return (
    <Popup zIndex={200} title={title} top={10} close={closePopups} display >
      { content() }
    </Popup>
  )

}
