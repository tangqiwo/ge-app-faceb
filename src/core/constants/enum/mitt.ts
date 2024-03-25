/*
 * @Author: Passion.KMG
 * @Date: 2024-01-02 13:23:06
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/constants/enum/mitt.ts
 * @Description:
 */

export type TMitt = {
  // 同步 WS 实时行情数据
  syncWebServiceData: {
    protocol: string,
    message: string
  }
}

// 所有的事件 TMitt 的 key，形成
export type TMittEvent = keyof TMitt;
