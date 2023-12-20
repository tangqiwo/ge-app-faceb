/*
 * @Author: Shawn.GE
 * @Date: 2023-07-27 03:50:44
 * @LastEditors: Shawn.GE
 * @LastEditTime: 2023-08-02 06:02:17
 * @FilePath: /react_project/src/core/schemas/payment.d.ts
 * @Description:
 */
export interface IChannelsOfDepositItem {
  Id: number;
  PaymentType: string;
  ChannelUsingType: string;
  Recommend: boolean;
  Sort: number;
  Name: string;
  Currency: string;
  CurrencyCode: string;
  TradingAmountType: number;
  TradingMin: string;
  TradingMax: string;
  TradingFee: string;
  TradingAmountFixed: string[];
  UserActivateBankCard: boolean;
  UserActivateIdCardImage: boolean;
  MerchantCode: string;
  ExtraOfDepositRebate: string;
  ExtraRebateRate?: string;
  HasBeenFirstDeposit?: boolean;
  isRecommended?: boolean;
}

export interface IGateWayInfo {
  IsHave: boolean;
  Guid: string;
  Id: string;
  PayUrl: string;
  PaymentType: string;
  Extra: {
    Type: string; // QrCodeBase64、VirtualCurrency、JumpUrl、BankCard、QrCodeOssUrl
    PayType: string;
    QrCodeBase64: {
      QrCodeBase64: string;
      QrCodeType: string;
    };
    QrCodeOssUrl: {
      QrCodeOssUrl: string;
      QrCodeType: string;
    };
    BankCard: {
      BankName: string; //银行名字
      BankCode: string; //银行编码
      BankBranch: string; //支行
      AccountOfPayee: string; //收款人
      RealNameOfPayee: string; //收款人账号
    };
    VirtualCurrency: {
      BlockChain: string;
      Address: string;
      Currency: string;
    };
    JumpUrl: {
      Url: string;
    };
  };
  ExtraChannelConfig: {
    MerchantCode: string;
  };
  Amount: string;
  AddressOfPayee?: string;
  BankName?: string;
  CollectionAddress?: string;
  PayType: string;
  Type?: number;
  IsSelf: boolean;
  AccountOfPayee: string;
  PaymentName: string;
  PaymentAddress?: string;
  // holder: string,
  currency?: string;
  SourceAmount?: number;
  depositAmount: string;
}
export interface ICardArray {
  Id: number;
  UserId: number;
  walletType: number;
  currency: string;
  BankCardNo: string;
  bankId: number;
  BankName: string;
  RealName: string;
  bankBranch: string;
  BankCardImage: string;
  CreatedAt: string;
  ValidationStateOfManager: number;
  Currency: string;
}

export interface IBanks {
  Id: number;
  Name: string;
}

export interface IVirtAcc {
  ChainType: string;
  Address: string;
}

export interface ISubmitInfo {
  Id: string;
  PayDoc: string;
  TransactionNo?: string;
  imagePreview?: Blob | File | string;
}

export interface IVirtualAcc {
  List: {
    ChainType: string;
    Address: string;
    Status: 'Enable';
  }[];
}
