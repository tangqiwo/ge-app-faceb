/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-18 11:11:17
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useRouteHelper.ts
 * @Description:
 */

import React from 'react';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ACTIONS from '@actions/index';

export default () => {

  const dispatch = useDispatch();
  const rs = useSelector((state: any) => state);
  const navigation = useNavigation<any>();

   // 帮助跳转路由
   React.useEffect(() => {
    if(!rs.base.router || !rs.base.router.name){
      return;
    }
    if(rs.base.router.type === 'goBack'){
      if(typeof navigation.goBack === 'function'){
        navigation.goBack();
      }else{
        navigation.navigate(rs.base.router.name, rs.base.router.params);
      }
      return;
    }
    if(rs.base.router.type === 'replace'){
      if(typeof navigation.replace === 'function'){
        navigation.replace(rs.base.router.name, rs.base.router.params);
      }else{
        navigation.navigate(rs.base.router.name, rs.base.router.params);
      }
      return;
    }
    if(rs.base.router.type === 'reset'){
      navigation.reset({
        index: 0,
        routes: [{ name: rs.base.router.name }],
      });
    }
    navigation.navigate(rs.base.router.name, rs.base.router.params);
    // 还原
    _.delay(() => dispatch(ACTIONS.BASE.routerPush({name: ''})), 500);
  }, [rs.base.router])

}