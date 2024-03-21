/*
 * @Description: REDUX 初始化状态
 * @Author: Galen.GE
 * @Date: 2019-12-19 16:20:56
 * @LastEditTime: 2024-03-21 10:30:04
 * @LastEditors: Galen.GE
 */
import _ from 'lodash'
import { UserInfo, RegisterGuide } from '@core/schemas/interface';
import * as INTERFACE from '../schemas/redux-store.d';
import CONFIGS from '@this/configs';

const base: INTERFACE.IBase = {
  showUI: false,
  loading: { display: false },
  toast: { display: false },
  modal: { display: false },
  popups: { display: false, type: null },
  frameModal: { display: false, title: null, w: null, h: null, url: null },
  configs: {},
  appConfigs: {},
  exitCode: null,
  contactInfo: {},
  memberInfo: {},
  popupAd: {},
  popupAdvert: {},
  channels: [],
  appDisplayConfig: {},
  homeInfos: {},
  api: CONFIGS.API
};

const user: INTERFACE.IUser = {
  info:  {} as UserInfo,
  registerProgress: {
    code: undefined,
    data: {},
    desc: '',
  },
  leaveModal: { display: false, content: '', img: '', callback: null },
};

const registerGuideStatus: INTERFACE.IRegisterGuideStatus = {
  code: 0,
  data: {} as RegisterGuide,
};

const promotion: INTERFACE.IPromotion = {
  promotionCenterList: null,
};

const quotes: INTERFACE.IQuotes = {
  symbol: 'M1'
}

const trade: INTERFACE.ITrade = {
  auth: null,
  mt4Info: null,
  instantOrders: null,
}

const store: INTERFACE.IStore = {
  base,
  user,
  promotion,
  registerGuideStatus,
  quotes,
  trade
};

export default store;
