/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-13 12:43:59
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/WebView/postJsCode.js
 * @Description: 注入到 web 中回调
 */

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
    OPEN_BINDEBPAY: 'OPEN_BINDEBPAY'
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
  const openDeposit = () => {
    postMessage(TYPES.OPEN_DEPOSIT, {});
  }
  const openBindCard = (checkcode) => {
    postMessage(TYPES.OPEN_BINDCARD, { checkcode })
  }
  const openBindUSDT = (checkcode) => {
    postMessage(TYPES.OPEN_BINDUSDT, { checkcode })
  }
  const openBindPhone = (checkcode) => {
    postMessage(TYPES.OPEN_BINDPHONE, {});
  }
  const openBindEBPay = (checkcode) => {
    postMessage(TYPES.OPEN_BINDEBPAY, { checkcode })
  }
  window._RN_ = {
    postMessage,
    logout,
    navigate,
    alert,
    openUrl,
    openDeposit,
    openBindCard,
    openBindUSDT,
    openBindPhone,
    openBindEBPay
  };
}

export default `(${postJsCode})();`