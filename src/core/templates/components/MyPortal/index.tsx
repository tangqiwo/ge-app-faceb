/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-04-23 11:14:12
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/MyPortal/index.tsx
 * @Description:添加了是否显示的 Portal
 */
import React from 'react';
import { Portal } from '@gorhom/portal';

interface IProps{
  visible: boolean;
  children: any
}
export default ({ visible, children }: IProps) => {

  if(visible){
    return (
      <Portal>
        { children }
      </Portal>
    )
  }

  return (
    <>
      {children}
    </>
  )

}
