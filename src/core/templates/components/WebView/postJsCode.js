/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-13 12:43:59
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/components/WebView/postJsCode.js
 * @Description: 注入到 web 中回调
 */
import { getDeviceInfo } from '@/core/utils/device';
import G from '@constants/global';

function postJsCode(){
  const TYPES = {
    LOGOUT: 'LOGOUT',
    NAVIGATE: 'NAVIGATE',
    ALERT: 'ALERT',
    OPEN_WEBSITE: 'OPEN_WEBSITE',
    OPEN_DEPOSIT: 'OPEN_DEPOSIT',
    OPEN_BINDCARD: 'OPEN_BINDCARD',
    OPEN_BINDUSDT: 'OPEN_BINDUSDT',
    OPEN_BINDPHONE: 'OPEN_BINDPHONE',
    OPEN_BINDEBPAY: 'OPEN_BINDEBPAY',
  }
  const postMessage = (type, params) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({type, params: (params || {})}));
  }
  const logout = () => {
    postMessage(TYPES.LOGOUT, {});
  }
  const alert = (message) => {
    postMessage(TYPES.ALERT, { content: message });
  }
  const navigate = (name, params) => {
    postMessage(TYPES.NAVIGATE, {name, params});
  }
  const openUrl = (url) => {
    postMessage(TYPES.OPEN_WEBSITE, {url});
  }
  window._RN_ = {
    postMessage,
    logout,
    navigate,
    alert,
    openUrl,
    uuid: G.GET('UUID')
  };
}

export default `(${postJsCode})();`