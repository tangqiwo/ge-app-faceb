/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-24 02:38:00
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/WebFrame/index.tsx
 * @Description:
 */
import React from 'react';
import WebView from '@core/templates/components/WebView';
import { useRoute, useNavigation } from '@react-navigation/native';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Icon from '@icon/index';
import CONFIG from '@this/configs';
import ExitPopup from '@this/components/ExitPopup';
import MyImage from '@core/templates/components/Base/Image';
import { LS as styles, GS } from './style';

export default () => {

  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const {dispatch, ACTIONS, ossDomain} = usePublicState();
  const [ showExitAd, setShowExitAd ] = React.useState(false);
  const [extInfo, setExtInfo] = React.useState<any>({});
  // 官网
  const domain = route.params.type === 'origin' ? '' : route.params.type === 'official' ? CONFIG.OFFICE_WEB_DOMAIN : CONFIG.MC_WEB_DOMAIN;
  // 样式注入
  const styelInject = [...styleCover, ...(pageStyleCover[route.params.page] || [])].join('');

  const handleBack = () => {
    if(route.params.reset){
      navigation.reset({
        index: 0,
        routes: [{ name: 'Root', screen: 'Home' }],
      });
      dispatch(ACTIONS.USER.getUserInfo({}))
      return;
    }
    if(route.params.title === '注资'){
      setShowExitAd(true);
      return;
    }
    navigation.goBack();
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.title,
      headerShown: route.params.headerShown,
      // 返回按键
      headerLeft: () => (
        <MyTouchableOpacity style={{}} onPress={handleBack}>
          <Icon.Font style={styles.goBackIcon} type={Icon.T.SimpleLineIcons} name='arrow-left' />
        </MyTouchableOpacity>
    )});
    dispatch(ACTIONS.BASE.commonRequest({
      uri: 'GetDialogTypeByDeposit/Select',
      cache: { expires: 1000 * 60 * 60, forward: true },
      cb: (res: any) => {
        console.log(JSON.parse(res.Data.Dialog.Data[0].Content).Content)
        setExtInfo({
          image: res.Data.Dialog.Data[0].BannerImg,
          content: JSON.parse(res.Data.Dialog.Data[0].Content).Content
        })
      }
    }))
  }, [])

  return (
    <>
      <ExitPopup
        display={showExitAd}
        close={() => setShowExitAd(false)}
        exit={() => navigation.goBack()}
        cancelText="继续注资"
        text={extInfo.content}
      >
        <MyImage width={GS.mixin.rem(170)} source={{uri: ossDomain + extInfo.image}} />
      </ExitPopup>
      <WebView
        source={{ uri: `${domain}${route.params.uri}` }}
        style={{ flex: 1 }}
        styleInject={styelInject}
      />
    </>
  )

}

const styleCover = [
  '.lKieKy2pz_0KVBf30fzc{display: none}',
  '.withHeader{margin-top: 0 !important; height: 100% !important}',
  '.kvrzI3f37mBVtBcScidN{display: none}',
  '.jBRdsZTleueo35HNbElF{display: none}',
  '.app > header{display: none !important}',
  '.app > footer{display: none !important}',
  '#m-header{display: none !important}',
  '.customer-mobile{display: none !important}',
  '.p-top-nav{display: none !important}',
  '.bottom-0{display: none !important}',
];


const pageStyleCover: any = {
  ['user-infos']: [
    '.card-box{display: none}',
    '.profile-detail-box{margin-top: 0 !important; box-shadow: none !important}',

  ],
  ['payment-setting']: [
    '.card-box{margin-top: 0 !important; box-shadow: none !important}',
    '.profile-detail-box{display: none}'
  ],
}

