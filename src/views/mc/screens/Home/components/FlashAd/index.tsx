/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-09 15:51:39
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/FlashAd/index.tsx
 * @Description:
 */
import _ from 'lodash'
import React from 'react';
import dayjs from 'dayjs';
import { View, Text, Image } from 'react-native'
import Enum from '@constants/enum';
import Overlay from '@core/templates/components/Overlay';
import usePublicState from '@core/hooks/usePublicState';
import BackgroundView from '@core/templates/components/BackgroundView';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useRouteWebCommon from '@core/hooks/useRouteWebCommon';
import G from '@constants/global';
import { GS, LS as styles } from './style';

interface IProps {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}
export default (({showPopup, setShowPopup}: IProps) => {

  const { forward } = useRouteWebCommon();
  const { rs, ossDomain, infos, navigation, isFocused } = usePublicState();
  const [ content, setContent ] = React.useState<any>(null);
  const [ nativeForward, setNativeForward ] = React.useState<any>(null);
  const [ countdown, setCountdown ] = React.useState<any>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  // 计时器
  const timer = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if(timer.current) {
        clearInterval(timer.current);
      }
    }
  }, [])

  React.useEffect(() => {
    if(!isFocused){
      return;
    }
    if(rs.base.popupAdvert?.QuickDialog?.Data?.length > 0) {
      setContent({
        ...rs.base.popupAdvert?.QuickDialog.Data[0],
        Data: JSON.parse(rs.base.popupAdvert?.QuickDialog.Data[0].Content)
      });
      setNativeForward(rs.base.popupAdvert?.QuickDialog.Data[0].NativeForward)
      return;
    }
    if(rs.base.appConfigs?.QuickDialog?.Data?.length > 0 && !infos.UserId) {
      setContent({
        ...rs.base.appConfigs?.QuickDialog.Data[0],
        Data: JSON.parse(rs.base.appConfigs?.QuickDialog.Data[0].Content)
      });
      setNativeForward(rs.base.appConfigs?.QuickDialog.Data[0].NativeForward)
      return;
    }
  }, [
    isFocused,
    infos.UserId,
    rs.base.appConfigs?.QuickDialog?.Data[0]?.Id,
    rs.base.popupAdvert?.QuickDialog?.Data[0]?.Id
  ])

  React.useEffect(() => {
    if(_.isEmpty(content)){
      return;
    }
    if(timer.current) {
      clearInterval(timer.current);
    }
    var hiddenStatus = G.GET('HIDDEN_POPIP_ADVERT') || {};
    if(hiddenStatus[content.Id]) {
      return;
    }
    G.SET('HIDDEN_POPIP_ADVERT', {...hiddenStatus, [content.Id]: true});
    setShowPopup(true)
    const endTime = content.Data.EndTime;
    // 如果小于当前时间，则返回
    if(dayjs(endTime).diff(dayjs(), 'second') <= 0) {
      setShowPopup(false);
      return;
    }
    timer.current = setInterval(() => {
      // 距离现在倒计时的天数，不够10天前面补0
      const days = dayjs(endTime).diff(dayjs(), 'day') < 10 ? `0${dayjs(endTime).diff(dayjs(), 'day')}` : dayjs(endTime).diff(dayjs(), 'day');
      // 距离现在倒计时的小时数，不够10小时前面补0
      const hours = dayjs(endTime).diff(dayjs(), 'hour') % 24 < 10 ? `0${dayjs(endTime).diff(dayjs(), 'hour') % 24}` : dayjs(endTime).diff(dayjs(), 'hour') % 24;
      // 距离现在倒计时的分钟数，不够10分钟前面补0
      const minutes = dayjs(endTime).diff(dayjs(), 'minute') % 60 < 10 ? `0${dayjs(endTime).diff(dayjs(), 'minute') % 60}` : dayjs(endTime).diff(dayjs(), 'minute') % 60;
      // 距离现在倒计时的秒数，不够10秒前面补0
      const seconds = dayjs(endTime).diff(dayjs(), 'second') % 60 < 10 ? `0${dayjs(endTime).diff(dayjs(), 'second') % 60}` : dayjs(endTime).diff(dayjs(), 'second') % 60;
      setCountdown({
        days,
        hours,
        minutes,
        seconds
      })
    }, 1000)
  }, [content])

  React.useEffect(() => {
    if(!isFocused) {
      setShowPopup(false);
    }
  }, [isFocused])


  const handleClick = () => {
    const user = rs.user;
    if(_.includes(content.Data.RedirectUrl, '/register')) {
      setShowPopup(false);
      if(user.registerProgress?.code === 0 || _.isUndefined(user.registerProgress.code)) {
        navigation.navigate('Register');
        return;
      }
      if(user.registerProgress.code === Enum.user.ERegisterProgress.WAITING_REAL_NAME_AUTHENTICATION){
        navigation.navigate('RealnameAuthentication');
        return;
      }
      if(user.registerProgress.code === Enum.user.ERegisterProgress.WAITING_QUESTIONNAIRE){
        navigation.navigate('Questionnaire');
        return;
      }
      navigation.navigate('Register');
      return;
    }
    if(nativeForward){
      navigation.navigate(nativeForward);
      return;
    }
    if(content.Data.EnableNative){
      navigation.navigate('Register');
      return;
    }
    forward({
      type: 'origin',
      uri: content.Data.RedirectUrl,
      title: '活动详情'
    });
  }

  if(!content) return null;

  return (
    <Overlay display={showPopup} >
      <>
        <BackgroundView source={require('./i/bg.png')} style={styles.container}>
          <View style={styles.countdownView}>
            <BackgroundView source={require('./i/countdown.png')} style={styles.countdownViewItem}>
              <Text style={styles.countdownViewText}>{countdown.days}</Text>
            </BackgroundView>
            <BackgroundView source={require('./i/countdown.png')} style={styles.countdownViewItem}>
              <Text style={styles.countdownViewText}>{countdown.hours}</Text>
            </BackgroundView>
            <BackgroundView source={require('./i/countdown.png')} style={styles.countdownViewItem}>
              <Text style={styles.countdownViewText}>{countdown.minutes}</Text>
            </BackgroundView>
            <BackgroundView source={require('./i/countdown.png')} style={styles.countdownViewItem}>
              <Text style={styles.countdownViewText}>{countdown.seconds}</Text>
            </BackgroundView>
          </View>
          <MyTouchableOpacity onPress={handleClick}>
            <Image source={{uri: ossDomain + content.BannerImg}} style={styles.adPic} />
          </MyTouchableOpacity>
          <View style={styles.adDesc}>
            <Text style={styles.adDescText}>
              已有<Text style={{color: GS.var.colors.red[500]}}>{content.Data.Participant}</Text>位客户成功抢到
            </Text>
          </View>
          <MyTouchableOpacity onPress={handleClick}>
            <Image source={require('./i/button.png')} style={styles.button} />
          </MyTouchableOpacity>
        </BackgroundView>
        <MyTouchableOpacity onPress={() => setShowPopup(false)}>
          <Image source={require('./i/icon-close.png')} style={styles.close} />
        </MyTouchableOpacity>
      </>
    </Overlay>
  )

})