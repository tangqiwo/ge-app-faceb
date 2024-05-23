/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-25 15:26:20
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/helpers/storage.ts
 * @Description: 原生本地存储转换成 web LS 使用方式
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import G from '@constants/global';
import _ from 'lodash';

type TKeys =  'AUTH'                          // 登录 TOKEN
            | 'COOKIE-SESSION'                // 登录 SESSION
            | 'USER-PROFILE'                  // 用户登录信息（PROFILE 接口）
            | 'LOGIN-INFO'                    // 登录保存的用户名密码
            | 'LOGIN-REMEMBER'                // 是否记住登录
            | 'DEBUG-SETTINGS'                // 调试设定
            | 'DEBUG-API'                     // 调试 API
            | 'EXCEPTION'                     // 程序异常记录
            | 'NETWORK-RECORD'                // 网络异常记录
            | 'REQUEST-RECORD'                // 请求日志
            | 'SPEED_TEST-RECORD'             // 测速日志
            | 'SLOW_NETWORK_TIPS'             // 慢请求提示
            | 'NO_NETWORK_TIPS'               // 无网络提示
            | 'AGENT-CODE'                    // 代理编号
            | 'RECENTLY-REQUEST'              // 最近的20条请求
            | 'IMAGE-AUTO-SIZE-CACHE'         // 图片动态高度
            | 'LAST_DATE_FOR_VERSION_CHECK'   // 最后检查更新的日期
            | 'CRASH-RECORD'                  // 崩溃记录
            | 'COUNTRY'                       // 国家
            | 'LANG'                          // 语言
            | 'MT4-PASS'                      // MT4 密码
            | 'INIT_BOOT_SCREEN'              // 是否初始化启动屏幕
            | 'IS_AGREE_PRIVACY'              // 是否同意隐私协议
            | 'LANGUAGE'                      // 语言
            | 'UNIQUE_ID'                     // 设备唯一 ID
            | 'MODE'                          // 设备型号
            | 'HOT_UPDATE_VERSION'            // 热更版本


/**
   * @Author: ammo@xyzzdev.com
   * @Date: 2022-08-02 12:15:08
   * @description: 初始化缓存系统，将异步缓存变为同步缓存
   * 原理是利用全局变量一次性LOAD所有缓存值，在存取过程中先使用全局变量再做异步操作
   * @param {Function} callback
   * @return {*}
   */
 const init = async (callback: Function) => {
  if(G.GET('STORE_KEY')){
    callback();
    return;
  }
  // await AsyncStorage.clear();
  const keys = await AsyncStorage.getAllKeys() || [];
  let cached: any = { };
  _.each(await AsyncStorage.multiGet(keys), (item) => {
    cached[item[0]] = JSON.parse(item[1]);
  })
  G.SET('STORE_KEY', cached);
  if(__DEV__){
    console.log('init cache:', cached);
  }
  callback();
}

/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 12:16:41
 * @description: 获取缓存，由于全局变量中的值与缓存系统中的值保持一致，所以直接使用全局变量即可
 * @param {string} key
 * @return {*}
 */
const getCache = (key: string): any => {
  if(!G.GET('STORE_KEY')){
    if(__DEV__){
      console.log(`Not initialization cache yet, use storage.init() first`)
    }
    return;
  }
  const cache = G.GET('STORE_KEY')[key];
  // 未找到该缓存
  if(!cache){
    return null;
  }
  // 过期缓存
  if(_.now() > cache.expires){
    if(__DEV__){
      console.log(`Cache ${key} expired!`);
    }
    let newCache = G.GET('STORE_KEY');
    delete newCache[key];
    G.SET('STORE_KEY', newCache);
    AsyncStorage.removeItem(key);
    return null;
  }
  return G.GET('STORE_KEY')[key]['data'];
}

/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 12:17:24
 * @description: 设置缓存，先为全局变量添加缓存，再对真缓存进行修改，修改过程中异常，则回滚全局变量
 * @param {string} key
 * @param {any} value
 * @param {number} expires 过期时间，单位 S
 * @return {*}
 */
const setCache = async (key: string, value: any, expires?: number) => {
  if(!G.GET('STORE_KEY')){
    if(__DEV__){
      console.log(`Not initialization cache yet, use storage.init() first`)
    }
    return;
  }
  // 默认60天缓存
  const expiresDate = _.now() + ((expires || (3600 * 24 * 60)) * 1000);
  const oldCache = G.GET('STORE_KEY');
  const newCache = { ...G.GET('STORE_KEY'), [key]: { data: value, expires: expiresDate } }
  G.SET('STORE_KEY', newCache);
  try{
    await AsyncStorage.setItem(key, JSON.stringify({ data: value, expires: expiresDate }))
  }catch(e){
    console.error(`Save ${key} cache error! rollback cache data.`);
    G.SET('STORE_KEY', oldCache);
  }
}

/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 14:40:50
 * @description: 删除某个缓存值
 * @param {string} key
 * @return {*}
 */
const removeCache = async (key: string) => {
  if(!G.GET('STORE_KEY')){
    if(__DEV__){
      console.log(`Not initialization cache yet, use storage.init() first`)
    }
    return;
  }
  const oldCache = G.GET('STORE_KEY');
  let newCache = G.GET('STORE_KEY');
  if(newCache){
    delete newCache[key];
  }
  G.SET('STORE_KEY', newCache);
  try{
    await AsyncStorage.removeItem(key);
  }catch(e){
    G.SET('STORE_KEY', oldCache);
  }
}

/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-02 14:43:13
 * @description: 清空缓存
 * @return {*}
 */
const clearAll = async () => {
  if(!G.GET('STORE_KEY')){
    if(__DEV__){
      console.log(`Not initialization cache yet, use storage.init() first`)
    }
    return;
  }
  const oldCache = G.GET('STORE_KEY');
  G.SET('STORE_KEY', {});
  try{
    await AsyncStorage.clear();
  }catch(e){
    G.SET('STORE_KEY', oldCache);
  }
}

/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-20 13:53:06
 * @description: 清空缓存，但保留白名单
 * @return {*}
 */
const clear = async () => {
  const keys = await AsyncStorage.getAllKeys() || [];
  _.each(keys, async (item: string) => {
    if(!_.includes(CACHE_WHITE_LIST, item)){
      await removeCache(item);
    }
  })
}

// 清空缓存时候的白名单，白名单中的 KEY 不清除
export const CACHE_WHITE_LIST = [
  'AUTH',
  'COOKIE-SESSION',
  'USER-PROFILE',
  'LOGIN-INFO',
  'LOGIN-REMEMBER',
  'IMAGE-AUTO-SIZE-CACHE',
  'IS_AGREE_PRIVACY',
  'MT4-PASS',
  'UNIQUE_ID'
]

export default {
  init,
  get: (key: TKeys) => getCache(key),
  getAny: getCache,
  set: (key: TKeys, value: any, expires?: number) => setCache(key, value, expires),
  setAny: setCache,
  remove: (key: TKeys) => removeCache(key),
  removeAny: removeCache,
  clearAll,
  clear
}