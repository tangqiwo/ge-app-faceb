/*
 * @Author: Galen.GE
 * @Date: 2023-07-18 14:37:57
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/hooks/useI18n.ts
 * @Description: 语言国际化服务
 */
import _ from 'lodash';
import React from 'react';
import Cookies from 'js-cookie';
import {LanguageMap} from '@constants/enum/common';
import tt from '@helpers/i18n';
import TT from '@core/templates/public/components/$T';
import CONFIG from '@this/configs';
import G from '@constants/global';
import storage from '@core/helpers/storage';

export default () => {
  const [language, setLanguage] = React.useState(G.GET('LANGUAGE'));

  /**
   * @description 语言切换
   * @param language 语言
   */
  // 只能从LANG value中选择
  type TLanguages = 'zh-CN' | 'vi-VN' | 'en-US' | 'th-TH' | 'id-ID' | 'ko-KR' | 'ja-JP' | 'ru-RU' | 'fr-FR';
  const handleLanguageChange = (language: TLanguages) => {
    if (__DEV__) {
      console.log('语言切换：', language);
    }
    G.SET('LANGUAGE', 'language');
    storage.set('LANGUAGE', language);
    Cookies.set('LANGUAGE', language, {expires: 30, path: '/'});
    setLanguage(language);
  };



  return {
    handleLanguageChange,
    language,
    supportLanguages: _.filter(LanguageMap, (item: any) => _.includes(CONFIG.SUPPORT_LANGUAGES, item.value)),
  };
};

// 翻译组件
export const $T = TT;

// 独立翻译服务
export const $t = tt;
