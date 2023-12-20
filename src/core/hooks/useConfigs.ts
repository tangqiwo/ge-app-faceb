/*
 * @Description: 拓展动态配置
 * @Author: ammo@xyzzdev.com
 * @Date: 2021-05-07 10:03:11
 * @LastEditors: ammo@xyzzdev.com
 * 该文件主要用于做配置跳板和配置二次封装（主要是和接口动态配置结合）
 * 1.动态结合之后, 原本直接引用需变为函数调用 2.拓展函数需要使用 _.memoize 缓存结果
 */
import CONFIG from '@views/mc/configs';

export default {
  ...CONFIG
}


