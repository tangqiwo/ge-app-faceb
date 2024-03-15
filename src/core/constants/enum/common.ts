/*
 * @Author: Galen.GE
 * @Date: 2023-08-05 00:30:05
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/constants/enum/common.ts
 * @Description: 公共的枚举
 */

// 国际电话号码编号
export const ECountryCode = [
  {
    name: '中国',
    code: '86'
  },
  {
    name: '香港',
    code: '852'
  },
  {
    name: '澳门',
    code: '853'
  },
  {
    name: '韩国',
    code: '82'
  },
  {
    name: '日本',
    code: '81'
  },
  {
    name: '马来西亚',
    code: '60'
  },
  {
    name: '泰国',
    code: '66'
  },
  {
    name: '新加坡',
    code: '65'
  }
]

// 国际电话号码编号
export enum ECountryCodeEnum {
  CHINA = '86',
  HONGKONG = '852',
  MACAO = '853',
  KOREA = '82',
  JAPAN = '81',
  MALAYSIA = '60',
  THAILAND = '66',
  SINGAPORE = '65',
}

// 国家编号
export enum ECountryEnum {
  CHINA = 'CN',
  HONGKONG = 'HK',
  MACAO = 'MO',
  KOREA = 'KR',
  JAPAN = 'JP',
  MALAYSIA = 'MY',
  THAILAND = 'TH',
  SINGAPORE = 'SG',
}

// 国家语言编号
export enum ELanguageCodeEnum {
  CHINA = 'zh-CN',
  HONGKONG = 'zh-HK',
  MACAO = 'zh-MO',
  KOREA = 'ko-KR',
  JAPAN = 'ja-JP',
  MALAYSIA = 'ms-MY',
  THAILAND = 'th-TH',
  SINGAPORE = 'zh-SG',
}

// 语言名称
export enum ELanguageNameEnum {
  CHINA = '简体中文',
  HONGKONG = '繁體中文',
  MACAO = '繁體中文',
  KOREA = '한국어',
  JAPAN = '日本語',
  MALAYSIA = 'Bahasa Melayu',
  THAILAND = 'ภาษาไทย',
  SINGAPORE = '简体中文',
}

// ELanguageCodeEnum 和 ELanguageNameEnum 的映射
export const LanguageMap = [
  {text: ELanguageNameEnum.CHINA, value: ELanguageCodeEnum.CHINA},
  {text: ELanguageNameEnum.HONGKONG, value: ELanguageCodeEnum.HONGKONG},
  {text: ELanguageNameEnum.MACAO, value: ELanguageCodeEnum.MACAO},
  {text: ELanguageNameEnum.KOREA, value: ELanguageCodeEnum.KOREA},
  {text: ELanguageNameEnum.JAPAN, value: ELanguageCodeEnum.JAPAN},
  {text: ELanguageNameEnum.MALAYSIA, value: ELanguageCodeEnum.MALAYSIA},
  {text: ELanguageNameEnum.THAILAND, value: ELanguageCodeEnum.THAILAND},
  {text: ELanguageNameEnum.SINGAPORE, value: ELanguageCodeEnum.SINGAPORE},
];