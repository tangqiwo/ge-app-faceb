/*
 * @Description: 轮播图逻辑
 * @Author: ammo@xyzzdev.com
 * @Date: 2020-01-01 11:07:44
 * @LastEditTime: 2023-12-08 17:56:04
 * @LastEditors: ammo@xyzzdev.com
 */
import usePublicState from '@core/hooks/usePublicState';

export default () => {

  const { isLogined, navigation } = usePublicState();

  interface IRequestAuth {
    fn: Function
  }
  const requestAuth = (pa: IRequestAuth | Function) => (...params: any) => {
    const { fn } = typeof pa === 'function' ? { fn: pa } : pa;
    if(!isLogined){
      navigation.navigate('Login');
      return;
    }
    fn(...params);
  }

  return {
    requestAuth
  }

}