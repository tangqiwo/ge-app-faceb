/*
 * @Author: Galen.GE
 * @Date: 2022-07-25 10:49:02
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/schemas/redux-store.d.ts
 * @Description: 初始状态约束
 */

import { UserInfo, RegisterGuide } from './interface';

// base 状态节点
export type IBase = {
  showUI: boolean;
  loading: {
    display: boolean;
    text?: string | null;
  };
  toast: {
    display: boolean;
    text?: string | null;
    now?: any;
    types?: any;
  };
  modal: {
    display: boolean;
    title?: string;
    content?: any;
    actions?: Array<any>;
  };
  popups: {
    display: boolean;
    type: string;
  };
  configs: any;
  appConfigs: any;
  frameModal: { display: boolean; title: null | string; w: null | number; h: null | number; url: null | string };
  exitCode: number | null | undefined;
  contactInfo: any;
  memberInfo: any;
  popupAdvert: any;
  popupAd: {
    CustomDomain?: string;
    CreateUser?: {
      Count: number;
      Data: Array<any>
    };
    KYC?: {
      Count: number;
      Data: Array<any>
    };
  };
  appDisplayConfig: {
    Menus?: {
      Login: Array<{
        Icon: string;
        Id: number;
        Link: string;
        Title: string;
      }>;
      UnLogin: Array<{
        Icon: string;
        Id: number;
        Link: string;
        Title: string;
      }>;
    }
    [key: string]: any
  };
  homeInfos: {}
  channels: string[];
  [key        : string]: any
};

export type IUser = {
  info: UserInfo;
  registerProgress: {
    code: number;
    data: any;
    desc: string;
  };
  leaveModal: {
    display: boolean;
    content?: string;
    img?: string;
    callback?: Function;
  };
};

export type IRegisterGuideStatus = {
  code: number;
  data: RegisterGuide;
};

export type IPromotion = {
  promotionCenterList: Array<any> | null;
};

export type IQuotes = {
  wsLink?: string;
  symbols?: Array<{
    Key: string,
    Title: string,
    Close: number,
    High: number,
    Low: number,
    Open: number,
    RaiseOrFallPercent: number,
    Time: string,
    Volume: number,
  }>;
  instant?: Array<{
    Ask: number,
    Bid: number,
    Symbol: string,
    Time: string,
    changeValue: number,
    changePercent: number,
    spread: number,
    askStatus: 'UP' | 'DOWN' | 'FLAT',
    bidStatus: 'UP' | 'DOWN' | 'FLAT'
  }>;
}

export type ITrade = {
  auth?: {
    Gateway: string;
    Mt4ClientApiToken: string;
    Url: string;
    Password: string;
  },
  instant?: Array<{
    Ask: number,
    Bid: number,
    Symbol: string,
    Time: string,
    askStatus: 'UP' | 'DOWN' | 'FLAT',
    bidStatus: 'UP' | 'DOWN' | 'FLAT'
  }>;
}

// 入口
export type IStore = {
  base: IBase;
  user: IUser;
  promotion: IPromotion;
  registerGuideStatus: IRegisterGuideStatus;
  quotes: IQuotes;
  trade: ITrade;
};
