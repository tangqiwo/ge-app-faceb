/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 17:43:54
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Subsidy/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from 'react'
import { View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux';
import usePromotion from '@core/hooks/usePromotion';
import BackgroundView from '@core/templates/components/BackgroundView';
import useBanner from '@core/hooks/useBanner';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Button from '@this/components/Button'
import Overlay from '@core/templates/components/Overlay';
import useAuth from '@core/hooks/useAuth';
import useRouteWebCommon from '@core/hooks/useRouteWebCommon';
import ENUM from '@core/constants/enum';
import { toLowerCaseObj } from '@helpers/unit';
import { LS as styles, GS } from './style';

export default () => {

  const promotionTypeId = ENUM.promotion.EPromotionTypes.NEW_USER_30000;
  const { requestAuth } = useAuth();
  const { subsidy } = useBanner();
  const { applyPromotion, getPromotionDetail } = usePromotion();
  const { isLogined, ossDomain, dispatch, ACTIONS, isFocused } = usePublicState();
  const { promotionCenterList } = useSelector((state: any) => state.promotion);
  const Activity = useSelector((state: any) => state.base.homeInfos?.Subsidy100M?.Activity);
  const [ isShow, setIsShow ] = React.useState(true);
  const [ progressData, setProgressData ] = React.useState<any>({});
  const [ progressDetail, setProgressDetail ] = React.useState<any>();
  const { forward } = useRouteWebCommon();
  const [ countdown, setCountdown ] = React.useState<any>();
  const [ applayData, setApplayData ] = React.useState<any>();
  const [ mainId, setMainId ] = React.useState<any>();
  const timer = React.useRef<any>(null);

  React.useEffect(() => {
    if(!isLogined && !Activity){
      setIsShow(false);
      return;
    }
    if(!isLogined && Activity){
      setProgressData({
        id: Number(Activity.Id),
        hasJoined: false,
        stopAt: Activity.StopAt,
        levels: toLowerCaseObj(Activity.Extra?.ExtraOfEquityGiveCash30000)?.levels,
        appLink: Activity.AppLink
      });
      setIsShow(true);
      return;
    }
    if(isLogined && (!promotionCenterList || promotionCenterList?.length === 0)){
      setIsShow(false);
      return;
    }
    const promotion = promotionCenterList.find((item: any) => item.type === promotionTypeId);
    if(!promotion){
      setIsShow(false);
      return;
    }
    setProgressData({
      id: Number(promotion.id),
      hasJoined: promotion.hasJoined,
      stopAt: promotion.stopAt,
      levels:promotion.extra?.extraOfEquityGiveCash30000?.levels,
      appLink: promotion.appLink
    });
    setIsShow(true);
    // 如果已经参加过活动
    if(promotion.hasJoined){
      setMainId(promotion.mainId);
    }
  }, [isLogined, promotionCenterList, Activity]);


  React.useEffect(() => {
    if(!mainId || !isFocused){
      return;
    }
    getPromotionDetail({
      mainId: mainId,
      queryKey: ENUM.promotion.EPromotionQueryKey.NEW_USER_30000,
      cb: (res: any) => {
        setProgressDetail({
          ...res.data,
          isDoneFirstBonus: res.data?.qualifyVolumesOfBonus <= res.data?.currVolumesOfBonus,
          isDoneTradeBonus: res.data?.volumeLimitOfTrading <= res.data?.currVolumesOfTrading,
          rateForBonus: (res.data?.currVolumesOfBonus / res.data?.qualifyVolumesOfBonus) * 100,
          rateForTrade: (res.data?.currVolumesOfTrading / res.data?.volumeLimitOfTrading) * 100,
        })
      },
    });
  }, [isFocused, mainId])

  React.useEffect(() => {
    if(_.isEmpty(progressData)){
      if(timer.current){
        clearInterval(timer.current);
      }
      return;
    }
    if(timer.current){
      clearInterval(timer.current);
    }
    // 计算倒计时
    const calcTime = () => {
      const time = new Date(progressData.stopAt).getTime() - _.now();
      // 小于0，清除定时器
      if(time <= 0){
        clearInterval(timer.current);
        setCountdown({days: 0, hours: 0, minutes: 0, seconds: 0});
        return;
      }
      // 剩余天数
      const days = Math.floor(time / (24 * 3600 * 1000));
      // 剩余小时数，不足10补0
      const hours = Math.floor((time % (24 * 3600 * 1000)) / (3600 * 1000));
      // 剩余分钟数，不足10补0
      const minutes = Math.floor((time % (3600 * 1000)) / (60 * 1000));
      // 剩余秒数，不足10补0
      const seconds = Math.floor((time % (60 * 1000)) / 1000);
      setCountdown({days, hours, minutes, seconds});
    }
    calcTime();
    timer.current = setInterval(() => {
      calcTime();
    }, 1000);
  }, [progressData])

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>百亿补贴，多重好礼等您拿</Text>
      </View>
      {
        isShow &&
        <View style={styles.countdown}>
          <Image source={require('./i/icon.png')} style={styles.countdownIcon} />
          <Text style={styles.countdownText}>新客福利</Text>
          {
            countdown &&
            <View style={styles.countdownItem}>
              <Text style={styles.textCommon}>还剩</Text>
              <View style={styles.textBG}><Text style={styles.textNumber}>{countdown.days}</Text></View>
              <Text style={styles.textCommon}>天</Text>
              <View style={styles.textBG}><Text style={styles.textNumber}>{countdown.hours}</Text></View>
              <Text style={styles.textCommon}>时</Text>
              <View style={styles.textBG}><Text style={styles.textNumber}>{countdown.minutes}</Text></View>
              <Text style={styles.textCommon}>分</Text>
              <View style={styles.textBG}><Text style={styles.textNumber}>{countdown.seconds}</Text></View>
              <Text style={styles.textCommon}>秒</Text>
            </View>
          }
          <Text style={styles.detail} onPress={() => forward({title: '百亿补贴', type: 'origin', uri: progressDetail?.appLink})}>{`详情>`}</Text>
        </View>
      }
      {
        isShow && !progressData?.hasJoined &&
        <View style={styles.prizeView}>
          {
            progressData.levels?.map((item: any) =>
              <BackgroundView source={require('./i/prize.png')} style={styles.prizeItem} key={item.subId} resizeMode='cover'>
                <View style={styles.textContnet}>
                  <Text style={{...styles.prizeItemText, marginTop: GS.mixin.rem(10)}}>首入${item.equity}</Text>
                  <Text style={styles.prizeItemText}>送</Text>
                  <Text style={[styles.prizeItemText, styles.prizeItemTextMoney]}>${item.bonusTotal}</Text>
                </View>
                <MyTouchableOpacity style={styles.button} onPress={requestAuth({fn: () => setApplayData(item)})}>
                  <Text style={styles.buttonText}>领取</Text>
                </MyTouchableOpacity>
              </BackgroundView>
            )
          }
        </View>
      }
      {
        isShow && progressData?.hasJoined && progressDetail &&
        <View style={styles.processContentView}>
          <View style={styles.processTitle}>
            <Text style={styles.processTitleText}>{progressDetail.isDoneFirstBonus ? '交易赠金' : '首笔赠金'}</Text>
            <Text>{!progressDetail.isDoneFirstBonus && '交易赠金待开启'}</Text>
          </View>
          <View style={styles.processView}>
            <Text>当前进行中：{ !progressDetail.isDoneFirstBonus ? progressDetail.currVolumesOfBonus : progressDetail.currVolumesOfTrading}手</Text>
            <Text>{!progressDetail.isDoneFirstBonus ? progressDetail.qualifyVolumesOfBonus : progressDetail.volumeLimitOfTrading}手</Text>
          </View>
          <BackgroundView style={styles.processBarView} source={require('./i/pg-bar.png')}>
            <View style={{
              ...styles.processBarRate,
              marginRight: (!progressDetail.isDoneFirstBonus ? parseInt(progressDetail.rateForBonus) : parseInt(progressDetail.rateForTrade)) < 10 ?
                           GS.mixin.rem(-40) :
                           (!progressDetail.isDoneFirstBonus ? parseInt(progressDetail.rateForBonus) : parseInt(progressDetail.rateForTrade)) > 90 ?
                           GS.mixin.rem(0) : GS.mixin.rem(-20),
            }}>
              <Text>{ !progressDetail.isDoneFirstBonus ? parseInt(progressDetail.rateForBonus) : parseInt(progressDetail.rateForTrade) }%</Text>
            </View>
            <View style={{...styles.processBarRateBG, width: `${100 - (!progressDetail.isDoneFirstBonus ? parseInt(progressDetail.rateForBonus) : parseInt(progressDetail.rateForTrade))}%`}} />
          </BackgroundView>
          <View style={styles.processView}>
            <Text>当前已领取：${!progressDetail.isDoneFirstBonus ? progressDetail.currAwardOfBonus : progressDetail.currAwardOfTrading}</Text>
            <Text>${!progressDetail.isDoneFirstBonus ? progressDetail.awardLimitOfBonus : progressDetail.awardLimitOfTrading}</Text>
          </View>
        </View>
      }
      {
        subsidy && subsidy?.length > 0 &&
        <View style={styles.bannerView}>
          {
            subsidy.map((item, index) =>
              <MyTouchableOpacity style={styles.bannerItem} key={index} onPress={() => forward({ type: 'origin', uri: item.link, title: item.name })}>
                <Image source={{uri: `${ossDomain}${item.image}`}} style={styles.bannerItem} />
              </MyTouchableOpacity>
            )
          }
        </View>
      }
      <Overlay display={!!applayData}>
        <View style={styles.popupContent}>
          <Text style={styles.levelTitle}>已选活动等级</Text>
          <Image source={LEVEL_IMAGES[applayData?.subId]} style={styles.levelImage} />
          <Text style={styles.levelText}>活动详情，请按<Text style={{color: '#FFC600'}}>查阅</Text></Text>
          <Button
            onPress={() => applyPromotion({
              id: progressData.id,
              subId: applayData.subId,
              customSuccessPopup: (res) => {
                setApplayData(null);
                dispatch(ACTIONS.BASE.openToast({ text: res.desc, types: 'success' }));
              }
            })}
            style={styles.levelButton}
            text="确认并同意参加活动"
          />
        </View>
        <MyTouchableOpacity onPress={() => setApplayData(null)}>
          <Image source={require('./i/icon-close.png')} style={styles.iconClose} />
        </MyTouchableOpacity>
      </Overlay>
    </View>
  )

}

const LEVEL_IMAGES: any = {
  B4: require('./i/400.png'),
  B3: require('./i/1600.png'),
  B2: require('./i/4000.png'),
  B1: require('./i/30000.png'),
}