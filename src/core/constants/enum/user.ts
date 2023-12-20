/*
 * @Author: Galen.GE
 * @Date: 2023-08-08 18:05:08
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/constants/enum/user.ts
 * @Description: 用户相关
 */

// 注册进度
export enum ERegisterProgress {
  // 正常用户
  NORMAL = 0,
  // 错误
  ERROR = 1,
  // 等待实名认证
  WAITING_REAL_NAME_AUTHENTICATION = 201,
  // 等待问卷调查
  WAITING_QUESTIONNAIRE = 202,
  // 等待注资
  WAITING_INVESTMENT = 204,
  // 补充资料
  SUPPLEMENTARY_INFORMATION = 205
}

