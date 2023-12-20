/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-25 14:26:17
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/constants/global.ts
 * @Description: 全局变量，所有的全局变量都应该在此！
 * 全局变量由 GLOBAL 关键字支持，但需要再次转换之后才可以使用，不可在工程中直接使用 GLOBAL 关键字
 */


type TKeys =  'API'                         // API
            | 'CURRENCY'                    // 全站货币
            | 'LANG'                        // 语言
            | 'STORE_KEY'                   // 缓存同步化KEY
            | 'MIN_RES_TIME'                // 请求持续最短时间
            | 'SCREEN_WIDTH'                // 屏幕宽度
            | 'SCREEN_HEIGHT'               // 屏幕高度
            | 'UUID'                        // 设备指纹
            | 'ENABLE_ANIMATION'            // 是否启用动画
            | 'COUNTRY'                     // 国家
            | 'TOP_HEIGHT'                  // 顶部高度
            | 'SHOW_INIT_ACCOUNT'           // 是否停止显示初始化账号
            | 'HIDDEN_POPIP_ADVERT'         // 是否显示弹窗广告

// 获取全局变量
const GET = (key: string): any => {
  return (global as any)[key];
}

// 设置全局变量值
const SET = (key: string, value: any) => {
  (global as any)[key] = value;
}


export default {
  GET: (key: TKeys) => GET(key),
  SET: (key: TKeys, value: any) => SET(key, value)
}
