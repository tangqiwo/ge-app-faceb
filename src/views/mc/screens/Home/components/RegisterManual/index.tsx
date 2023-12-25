/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 16:47:14
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/RegisterManual/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import usePublicState from '@core/hooks/usePublicState';
import usePromotion from '@core/hooks/usePromotion';
import useAuth from '@hooks/useAuth';
import useRouteWebCommon, { FORWARD_TYPES} from '@core/hooks/useRouteWebCommon';
import ENUM from '@core/constants/enum';
import { LS as styles, GS } from './style';

export default () => {

  const promotionTypeId = ENUM.promotion.EPromotionTypes.RED_ENVELOPE88;
  const { forward } = useRouteWebCommon();
  const { isMt4User, isLogined, navigation, rs, dispatch, ACTIONS, isFocused } = usePublicState();
  const { promotionCenterList } = useSelector((state: any) => state.promotion);
  const { requestAuth } = useAuth();
  const { getPromotionDetail } = usePromotion();
  const [ isShow, setIsShow ] = React.useState(true);
  const [ progressData, setProgressData ] = React.useState<any>({});
  const [ mainId, setMainId ] = React.useState<any>();

  React.useEffect(() => {
    if(!isLogined){
      setIsShow(true);
      return;
    }
    if(!promotionCenterList || promotionCenterList?.length === 0){
      return;
    }
    const promotion = promotionCenterList.find((item: any) => item.type === promotionTypeId);
    if(!promotion){
      setIsShow(false);
      return;
    }
    setMainId(promotion.mainId);

  }, [isLogined, promotionCenterList]);


  React.useEffect(() => {
    if(!mainId || !isFocused){
      return;
    }
    getPromotionDetail({
      mainId: mainId,
      queryKey: ENUM.promotion.EPromotionQueryKey.RED_ENVELOPE88,
      cb: (res: any) => {
        setProgressData(res.data?.record?.extra?.extraOfActivityJoinRecordRegisterExclusive);
      },
    });
  }, [mainId, isFocused])

  // 去实名
  const goRealName = requestAuth(() => {
    if(rs.user.registerProgress.code === ENUM.user.ERegisterProgress.WAITING_REAL_NAME_AUTHENTICATION) {
      navigation.navigate('RealnameAuthentication');
      return;
    }
    if(rs.user.registerProgress.code === ENUM.user.ERegisterProgress.WAITING_QUESTIONNAIRE) {
      navigation.navigate('Questionnaire');
      return;
    }
    navigation.navigate('Register');
  })

  // 去注资
  const goDeposit = requestAuth(() => {
    if(!isMt4User){
      goRealName();
      return;
    }
    forward(FORWARD_TYPES['DEPOSIT'])
  })

  // 去交易
  const goTrade = requestAuth(() => {
    if(!progressData.stateOfFirstDeposit){
      goDeposit();
      return;
    }
    dispatch(ACTIONS.BASE.openToast({ text: '暂未开放'}))
  })


  if(!isShow){
    return <></>
  }

  // 是否注册
  const isRegister = isLogined && progressData.stateOfRegisterGe !== 0;
  // 是否实名
  const isRealName = isLogined && rs.user.registerProgress.code !== ENUM.user.ERegisterProgress.WAITING_REAL_NAME_AUTHENTICATION;
  // 是否首次注资
  const isFirstDeposit = isMt4User && progressData.stateOfFirstDeposit !== 0;
  // 是否交易
  const isTrade = isMt4User && progressData.stateOfTrade !== 0;

  if(isRegister && isRealName && isFirstDeposit && isTrade){
    return <></>
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={require('./i/icon-HOT.png')} style={styles.titleIcon} />
        <Text style={styles.titleText}>炒金开户，四步轻松领取＄88元红包</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.contentItem} >
          <Image source={require('./i/icon-3.png')} style={{...styles.contentItemIcon, width: GS.mixin.rem(26), height: GS.mixin.rem(25)}} />
          <Text style={styles.contentItemText}>免费注册</Text>
          <Text style={styles.contentItemText}>￥8元</Text>
          <View style={{...styles.button, backgroundColor: isRegister ? '#EDEDED' : '#FFC600' }} >
            {
              isRegister ?
              <Text style={styles.buttonText}>已领取</Text> :
              <Text style={styles.buttonText} onPress={() => navigation.navigate('Register')}>去注册</Text>
            }
          </View>
        </View>
        <View style={styles.contentItem} >
          <Image source={require('./i/icon-2.png')} style={{...styles.contentItemIcon, width: GS.mixin.rem(30), height: GS.mixin.rem(25)}} />
          <Text style={styles.contentItemText}>实名认证</Text>
          <Text style={styles.contentItemText}>￥20元</Text>
          <View style={{...styles.button, backgroundColor: isRealName ? '#EDEDED' : '#FFC600' }} >
            {
              isRealName ?
              <Text style={styles.buttonText}>已领取</Text> :
              <Text style={styles.buttonText} onPress={() => goRealName()}>交认证</Text>
            }
          </View>
        </View>
        <View style={styles.contentItem} >
          <Image source={require('./i/icon-4.png')} style={{...styles.contentItemIcon, width: GS.mixin.rem(23), height: GS.mixin.rem(25)}} />
          <Text style={styles.contentItemText}>首次注资</Text>
          <Text style={styles.contentItemText}>￥30元</Text>
          <View style={{...styles.button, backgroundColor: isFirstDeposit ? '#EDEDED' : '#FFC600' }} >
            {
              isFirstDeposit ?
              <Text style={styles.buttonText}>已领取</Text> :
              <Text style={styles.buttonText} onPress={() => goDeposit()}>去注资</Text>
            }
          </View>
        </View>
        <View style={styles.contentItem} >
          <Image source={require('./i/icon-1.png')} style={{...styles.contentItemIcon, width: GS.mixin.rem(24), height: GS.mixin.rem(25)}} />
          <Text style={styles.contentItemText}>交易满0.3手</Text>
          <Text style={styles.contentItemText}>￥30元</Text>
          <View style={{...styles.button, backgroundColor: isTrade ? '#EDEDED' : '#FFC600' }} >
            {
              isTrade ?
              <Text style={styles.buttonText}>已领取</Text> :
              <Text style={styles.buttonText} onPress={() => goTrade()}>做交易</Text>
            }
          </View>
        </View>
      </View>
    </View>
  )

}