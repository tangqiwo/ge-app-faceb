/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 16:47:14
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/RegisterManual/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import usePublicState from '@core/hooks/usePublicState';
import usePromotion from '@core/hooks/usePromotion';
import useAuth from '@hooks/useAuth';
import useRouteWebCommon, { FORWARD_TYPES} from '@core/hooks/useRouteWebCommon';
import Overlay from '@core/templates/components/Overlay';
import Button from '@this/components/Button';
import ENUM from '@core/constants/enum';
import { LS as styles, GS } from './style';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';

export default () => {

  const promotionTypeId = ENUM.promotion.EPromotionTypes.RED_ENVELOPE88;
  const { forward } = useRouteWebCommon();
  const { isMt4User, isLogined, navigation, rs, isFocused } = usePublicState();
  const { promotionCenterList } = useSelector((state: any) => state.promotion);
  const { requestAuth } = useAuth();
  const { getPromotionDetail } = usePromotion();
  const [ isShow, setIsShow ] = React.useState(true);
  const [ progressData, setProgressData ] = React.useState<any>({});
  const [ mainId, setMainId ] = React.useState<any>();
  const [ showGoTrade, setShowGoTrade ] = React.useState(false);
  const [ currentVolume, setCurrentVolume ] = React.useState(0);

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
    setCurrentVolume(Number(promotion.setCurrentVolume || 0));
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
    if(!progressData?.stateOfFirstDeposit){
      goDeposit();
      return;
    }
    setShowGoTrade(true);
  })


  if(!isShow){
    return <></>
  }

  // 是否注册
  const isRegister = isLogined && progressData?.stateOfRegisterGe !== 0;
  // 是否实名
  const isRealName = isLogined && rs.user.registerProgress.code !== ENUM.user.ERegisterProgress.WAITING_REAL_NAME_AUTHENTICATION;
  // 是否首次注资
  const isFirstDeposit = isMt4User && progressData?.stateOfFirstDeposit !== 0;
  // 是否交易
  const isTrade = isMt4User && progressData?.stateOfTrade !== 0;

  if(isRegister && isRealName && isFirstDeposit && isTrade){
    return <></>
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>炒金开户</Text>
        <View style={styles.titleRight}>
          <Image source={require('./i/icon-HOT.png')} style={styles.titleIcon} resizeMode='contain' />
          <Text style={styles.titleRightText}>四步轻松领取￥88元红包</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentItem} >
          <Image source={require('./i/icon-3.png')} style={{...styles.contentItemIcon, width: GS.mixin.rem(26), height: GS.mixin.rem(25)}} />
          <Text style={styles.contentItemText}>￥8元</Text>
          <View style={{...styles.button, backgroundColor: isRegister ? '#EDEDED' : '#FFC600' }} >
            {
              isRegister ?
              <Text style={styles.buttonText}>已领取</Text> :
              <Text style={styles.buttonText} onPress={() => navigation.navigate('Register')}>免费注册</Text>
            }
          </View>
        </View>
        <View style={styles.contentItem} >
          <Image source={require('./i/icon-2.png')} style={{...styles.contentItemIcon, width: GS.mixin.rem(30), height: GS.mixin.rem(25)}} />
          <Text style={styles.contentItemText}>￥20元</Text>
          <View style={{...styles.button, backgroundColor: isRealName ? '#EDEDED' : '#FFC600' }} >
            {
              isRealName ?
              <Text style={styles.buttonText}>已领取</Text> :
              <Text style={styles.buttonText} onPress={() => goRealName()}>实名认证</Text>
            }
          </View>
        </View>
        <View style={styles.contentItem} >
          <Image source={require('./i/icon-4.png')} style={{...styles.contentItemIcon, width: GS.mixin.rem(23), height: GS.mixin.rem(25)}} />
          <Text style={styles.contentItemText}>￥30元</Text>
          <View style={{...styles.button, backgroundColor: isFirstDeposit ? '#EDEDED' : '#FFC600' }} >
            {
              isFirstDeposit ?
              <Text style={styles.buttonText}>已领取</Text> :
              <Text style={styles.buttonText} onPress={() => goDeposit()}>首次注资</Text>
            }
          </View>
        </View>
        <View style={styles.contentItem} >
          <Image source={require('./i/icon-1.png')} style={{...styles.contentItemIcon, width: GS.mixin.rem(24), height: GS.mixin.rem(25)}} />
          <Text style={styles.contentItemText}>￥30元</Text>
          <View style={{...styles.button, backgroundColor: isTrade ? '#EDEDED' : '#FFC600' }} >
            {
              isTrade ?
              <Text style={styles.buttonText}>已领取</Text> :
              <Text style={styles.buttonText} onPress={() => goTrade()}>交易0.3手</Text>
            }
          </View>
        </View>
      </View>
      {
        showGoTrade &&
        <Overlay close={() => setShowGoTrade(false)} display>
          <View style={{alignItems: 'center'}}>
            <View style={styles.tradeContent}>
              <Text style={styles.tradeTitle}>您已完成了{currentVolume}手</Text>
              <Image source={require('./i/trade.png')} style={styles.tradeImage} />
              <Text style={styles.tradeText}>继续交易{_.round(0.3 - currentVolume, 2).toFixed(1)}手</Text>
              <Text style={styles.tradeText}>即可获得30元红包</Text>
              <Button
                text="我知道了"
                style={styles.tradeButton}
                onPress={() => { setShowGoTrade(false); navigation.navigate('Trade')}}
              />
            </View>
            <MyTouchableOpacity onPress={() => setShowGoTrade(false)}>
              <Image source={require('./i/close.png')} style={styles.close} resizeMode='contain' />
            </MyTouchableOpacity>
          </View>
        </Overlay>
      }
    </View>
  )

}