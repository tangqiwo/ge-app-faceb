/*
 * @Author: Tom.GE
 * @Date: 2023-07-26 09:17:48
 * @LastEditors: ammo@xyzzdev.com
 * @LastEditTime: 2023-11-15 00:35:20
 * @FilePath: /app_face_b/src/core/schemas/interface.ts
 * @Description:
 */
export interface UserInfo {
  CreatedAt: any;
  Avatar: string;
  iconImg?: string;
  CreateTime?: string;
  AvatarLarge: string;
  AvatarSmall: string;
  Balance: string;
  // KycScore: number,
  Email: string;
  Gender: number;
  Mt4Id: number;
  Mt4IdDemo: number;
  KycScore?: number;
  Nationality: string;
  Nickname: string;
  RealName: string;
  WasActiveMt4: boolean;
  Username: string;
  WasBoundBankCard: boolean;
  WasVerifiedDocument: boolean;
  regStatus?: number;
  Address?: string;
  Password?: string;
  BindPrivateInformation?: {
    Comment: string;
    ValidationStateOfManager: number; // 0:未审核 1:待审批 2:审核不通过 3:审批通过
  };
  GuideStep: number;
  PhoneNumber: string;
  PhoneNumberCountryCode?: string;
  referrer?: string | null;
  isProfessional?: boolean;
  WasDoneKyc?: boolean;
  UserGroupMappingMt4Group: 'normal' | 'Professional';
  UserStatus: number; // 0、未提交身份证 1、已提交身份证但未审批 2、已提交身份证并审批拒绝 3、已提交身份证并审批通过
  [key: string]: any;
}

export interface RegisterGuide {
  Mt4Id: number;
  Password: string;
  Server: string;
  tips: {
    Url: string;
    Content: string;
  };
}

export interface ActivityItem {
  CreatedAt: string;
  Enable: boolean;
  Group: string;
  Id: number;
  ImageOnDesktop: string;
  ImageOnDesktopAtlContent: string;
  ImageOnPhone: string;
  ImageOnPhoneAltContent: string;
  Link: string;
  Name: string;
  OpenLinkMode: number;
  OperatedBy: string;
  Sort: number;
  UpdatedAt: string;
}

export interface Mt4AccountItem {
  Balance: string;
  Currency: string;
  Enable: boolean;
  Mt4Id: number;
  Server: string;
  Symbol: string;
  Type: string;
}

export interface Mt4AccountInfo {
  Login: number;
  Group: string;
  Equity: number; //淨值
  Margin: number; //已使用预付额
  MarginLevel: number;
  MarginFree: number;
}

export interface Mt4TradersRecordNotClosedItem {
  ClosePrice: number;
  CloseTime: string;
  Cmd: number;
  OpenPrice: string;
  OpenTime: string;
  OtcCodeForBuild: string;
  OtcCodeForClose: string;
  Sl: number;
  Swaps: number;
  Symbol: string;
  Ticket: number;
  Profit: number;
  Tp: number;
  ValidKeyForBuild: string;
  ValidKeyForClose: string;
  Volume: number;
}

export interface IBankInfoItem {
  BankCardNo: string,
  Id: number,
  BankName: string,
  BankInProvince: string,
  BankAddress: string,
  BankInCity: string,
  BankInArea: string,
  BankCardImage: Blob | File | string,
  Currency: string
}

export interface IBanks {
  Id: number,
  Name: string,
}

export interface IBankValues {
  BankCardNo: string,
  BankCardImage: string,
  BankName: string,
  BankInProvince: string,
  BankInCity: string,
  BankInArea: string,
  BankAddress: string,
}

export interface IDAConfig {
  ShowType: number;
  LeftTime: number;
  CurrentImage: string;
  NextImage: string;
  NextText: string;
  WindowsLink: string;
  IosLink: string;
  AndroidLink: string;
}
