/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2024-05-06 16:04:34
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useNativeForward.ts
 * @Description:
 */
import { useSelector } from "react-redux"
import usePublicState from "./usePublicState"
import useRouteWebCommon, { FORWARD_TYPES} from '@core/hooks/useRouteWebCommon';

export default () => {

  const { forward } = useRouteWebCommon();;
  const NativeForward = useSelector((state: any) => state.base.appDisplayConfig?.NativeForward?.UseNative);
  const { navigation } = usePublicState();

  // 跳转到原生页面
  const goDeposit = (reset = false) => {
    if(NativeForward?.Deposit){
      if(reset){
        navigation.reset({
          index: 0,
          routes: [{name: 'Root', screen: 'Home'}, {name: 'Deposit'}],
        });
      }else{
        navigation.navigate('Deposit');
      }
      return;
    }
    forward({...FORWARD_TYPES['DEPOSIT'], reset})
  }

  return {
    isDepositNative: NativeForward?.Deposit,
    goDeposit
  }

}