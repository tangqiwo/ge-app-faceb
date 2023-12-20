/*
 * @Author: Galen.GE
 * @Date: 2023-07-28 16:44:04
 * @LastEditors: Galen.GE
 * @FilePath: /react_projects/src/core/constants/enum/agent.ts
 * @Description: 代理相关的枚举
 */

export enum EAgentStatus {
  // 未申请
  NOT_APPLIED = 0,
  // 待申请
  PENDING_APPLICATION = 1,
  // 待审核
  PENDING_APPROVAL = 2,
  // 审核通过
  APPROVED = 3,
  // 审核拒绝
  REJECTED = 4,
}
