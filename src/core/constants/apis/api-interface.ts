import {
  ActivityItem,
  IBankInfoItem,
  Mt4AccountInfo,
  Mt4AccountItem,
  Mt4TradersRecordNotClosedItem,
} from '@core/schemas/interface';

// 返回参数格式
export interface IBaseResponse {
  Code: number;
  Type: number;
  Desc: string;
}
export interface IPostResponse extends IBaseResponse {
  Data: string;
}
export interface INotificationResponse extends IBaseResponse {
  Data: {
    Count: number;
    Data: {
      Id: number;
      Title: string;
      Content: string;
      CreatedAt: string;
      Type: number;
      Enable: boolean;
    }[];
  };
}

export interface IGetIndexInfoResponse extends IBaseResponse {
  Data: {
    Activity: ActivityItem[];
    Mt4AccountList: Mt4AccountItem[];
    Mt4AccountInfo: Mt4AccountInfo;
    Mt4TradersRecordNotClosed: Mt4TradersRecordNotClosedItem[];
    OssCustomDomain: string;
  };
}

export interface IBankInfoResponse extends IBaseResponse {
  Data: IBankInfoItem[];
}

export interface IVirtualAcc extends IBaseResponse {
  Data: {
    List: {
      ChainType: string;
      Address: string;
      Status: 'Enable';
    }[];
  };
}
