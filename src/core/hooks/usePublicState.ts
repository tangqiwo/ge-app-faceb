/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-10-01 17:07:29
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/usePublicState.ts
 * @Description: 简易的获取一些常见的状态
 */
import _ from 'lodash';
import React from 'react';
import ACTIONS from '@actions/index';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import * as INTERFACE from '../schemas/redux-store.d';

export default () => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const rs = useSelector((state: INTERFACE.IStore) => state);
  const navigation = useNavigation<any>();
  const [ isLogined, setIsLogined ] = React.useState(!_.isEmpty(rs.user.info));

  React.useEffect(() => {
    setIsLogined(!_.isEmpty(rs.user.info));
  }, [rs.user.info])

  // @ts-ignore
  const customerService = _.chain(rs.base.contactInfo).find({ Key: 'H5' }).get('Params').value();

  return {
    rs,
    isLogined,
    cacheReady: rs.base.cacheReady,
    isMt4User: rs.user.info.Mt4Id && rs.user.info.Mt4Id !== 0,
    infos: rs.user.info,
    api: rs.base.api,
    dispatch,
    ACTIONS,
    navigation,
    isFocused,
    customerService,
    // @ts-ignore
    qqSerivce: _.chain(rs.base.contactInfo).find({ Key: 'QQ' }).get('Params').value(),
    // @ts-ignore
    ossDomain: _.get(rs.base.appConfigs, 'CustomDomain'),
    // @ts-ignore
    mt4DownloadURL: _.get(rs.base.memberInfo, 'Mt4ClientTerminalDownloadUrl'),
  };
};
