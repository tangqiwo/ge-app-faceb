/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-08 12:07:33
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/My/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from "react";
import { View, Image, Text, ScrollView } from 'react-native';
import Enum from '@constants/enum';
import BackgroundView from "@core/templates/components/BackgroundView";
import MyTouchableOpacity from "@core/templates/components/MyTouchableOpacity";
import Icon from '@icon/index';
import usePublicState from "@core/hooks/usePublicState";
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import Disclaimer from './Disclaimer';
import {Avatar} from '../Profile'
import style, { LS as styles, GS } from './style';

export default () => {

  const { rs, navigation, infos, customerService, isLogined, isFocused, dispatch, ACTIONS } = usePublicState();
  const [ showMoney, setShowMoney ] = React.useState(false);
  const [ isShowDisclaimer, setIsShowDisclaimer ] = React.useState(false);
  const { forward } = useRouteWebCommon();
  const [ order, setOrder ] = React.useState<any>();
  const timer = React.useRef<any>(null);

  React.useEffect(() => {
    if(isFocused && isLogined){
      dispatch(ACTIONS.USER.getUserInfo({loading: false}))
      dispatch(ACTIONS.PAYMENT.getPaymentCheck({cb: (res: any) => {
        clearInterval(timer.current);
        if(res.Data?.IsHave){
          setOrder({...res.Data?.Order, CutDown: res.Data?.CutDown, IconUrl: res.Data?.IconUrl, ShowTips: true, Now: _.now()});
          timer.current = setTimeout(() => {
            setOrder(null);
          }, 1000 * res.Data?.CutDown)
          return;
        }else{
          setOrder(null);
        }
      }}))
    }
  }, [isFocused, isLogined])

  const handleGoToRegister = () => {
    if(_.isUndefined(rs.user.registerProgress.code)) {
      navigation.navigate('Register');
      return;
    }
    if(rs.user.registerProgress.code === Enum.user.ERegisterProgress.WAITING_REAL_NAME_AUTHENTICATION) {
      navigation.navigate('RealnameAuthentication');
      return;
    }
    if(rs.user.registerProgress.code === Enum.user.ERegisterProgress.WAITING_QUESTIONNAIRE) {
      navigation.navigate('Questionnaire');
      return;
    }
  }

  const contineDeposit = () => {
    if(order) {
      navigation.navigate('Deposit-3', { ...order, CutDown: order.CutDown - Math.floor((_.now() - order.Now) / 1000), NowTime: _.now() });
    }
  }

   return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={styles.userInfoView}>
          <Image
            source={infos.Username ? Avatar[infos.Avatar || 1] : require('./i/avatar.png')}
            style={{width: GS.mixin.rem(60), height: GS.mixin.rem(60)}}
            resizeMode='contain'
          />
          <View style={styles.textBox}>
            <View style={styles.settingsView}>
              <Text style={styles.unlogin} >{infos.RealName || '未开户'}</Text>
              {
                infos.RealName &&
                <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 'auto'}}>
                  <BackgroundView source={require('./i/icon-new.png')} style={styles.tips}>
                    <Text style={{color: 'white', marginLeft: GS.mixin.rem(4)}}>
                      {infos.KycScore >= 33 ? '专业投资者' : '一般投资者'}
                    </Text>
                  </BackgroundView>
                </View>
              }
              <View style={{flexDirection: 'row'}}>
                <MyTouchableOpacity onPress={() => navigation.navigate('MessageCenter')}>
                  <Icon.Font style={styles.settingIcon} type={Icon.T.FontAwesome} name='envelope-o' />
                </MyTouchableOpacity>
                <MyTouchableOpacity onPress={() => navigation.navigate('Settings')}>
                  <Icon.Font style={styles.settingIcon} type={Icon.T.Ionicons} name='settings' />
                </MyTouchableOpacity>
              </View>
            </View>
            {
              infos.RealName &&
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: GS.mixin.rem(10), width: '100%'}}>
                <Text style={{fontSize: GS.mixin.rem(14)}}>
                  交易账号：{infos.Mt4Id}
                </Text>
              </View>
            }
            {
              !infos.RealName &&
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: GS.mixin.rem(10)}}>
                <Text style={{fontSize: GS.mixin.rem(14)}}>
                  {rs.base.appDisplayConfig.MemberPageInfo?.NewUserTip}
                </Text>
                <BackgroundView source={require('./i/icon-new.png')} style={styles.tips}>
                  <Text style={{color: 'white', marginLeft: GS.mixin.rem(4)}}>
                    新客专享
                  </Text>
                </BackgroundView>
              </View>
            }
          </View>
        </View>
      </BackgroundView>
      {
        // 继续注册
         !_.includes([
          Enum.user.ERegisterProgress.NORMAL,
          Enum.user.ERegisterProgress.SUPPLEMENTARY_INFORMATION
        ], rs.user.registerProgress.code) && !_.isEmpty(infos) &&
        <MyTouchableOpacity onPress={handleGoToRegister}>
          <Image source={require('./i/continue.png')} style={styles.continueImage} />
        </MyTouchableOpacity>
      }
      {
        (_.isEmpty(infos) || _.includes([
          Enum.user.ERegisterProgress.NORMAL,
          Enum.user.ERegisterProgress.SUPPLEMENTARY_INFORMATION
        ], rs.user.registerProgress.code)) &&
        <View style={styles.infosView}>
          <View style={styles.subscription}>
            <Text style={styles.moneyTitle} onPress={() => forward(FORWARD_TYPES['ATM_DETAIL'])}>资金余额（USD）</Text>
            <MyTouchableOpacity onPress={() => setShowMoney(!showMoney)}>
              <Icon.Font type={Icon.T.Feather} name={!showMoney ? 'eye-off' : 'eye' } size={GS.mixin.rem(16)} style={{marginTop: 10}} color="#94938F" />
            </MyTouchableOpacity>
            {
              isLogined &&
              <Text style={{...styles.moneyTitle, marginLeft: 'auto'}}>取款 {`>`}</Text>
            }
          </View>
          <View style={styles.moneyDetail}>
            <Text style={styles.moneyDetailText}>{showMoney ? (infos.Balance || '0.00') : isLogined ? '****' : '----'}</Text>
          </View>
          {
            // 未登录
            _.isEmpty(infos) &&
            <View style={styles.buttons}>
              <MyTouchableOpacity style={styles.buttonItem} onPress={() => navigation.navigate('Login')}>
                <View style={styles.buttonItem}>
                  <Image source={require('./i/login.png')} style={styles.buttonIcon} resizeMode='contain' />
                  <Text style={styles.buttonText}>登录</Text>
                </View>
              </MyTouchableOpacity>
              <MyTouchableOpacity style={styles.buttonItem} onPress={handleGoToRegister}>
                <View style={{...styles.buttonItem, backgroundColor: '#FFC600'}}>
                  <Image source={require('./i/register.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(18)}} resizeMode='contain'/>
                  <Text style={{...styles.buttonText, color: 'black'}}>开户</Text>
                </View>
              </MyTouchableOpacity>
            </View>
          }
          {
            _.includes([
              Enum.user.ERegisterProgress.NORMAL,
              Enum.user.ERegisterProgress.SUPPLEMENTARY_INFORMATION
            ], rs.user.registerProgress.code) &&
            <View style={styles.buttons}>
              <MyTouchableOpacity style={styles.buttonItem} onPress={() => navigation.navigate('Depoist')}>
                <View style={{...styles.buttonItem, backgroundColor: '#FFC600', width: GS.mixin.rem(190)}}>
                  <Image source={require('./i/zz.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(18)}} resizeMode='contain' />
                  <Text style={{...styles.buttonText, color: 'black'}}>立即注资</Text>
                </View>
              </MyTouchableOpacity>
              <MyTouchableOpacity
                style={{...styles.buttonItem,  backgroundColor: '#F5F5F5', width: GS.mixin.rem(115)}}
                onPress={() => forward(FORWARD_TYPES['ATM_DETAIL'])}
              >
                <View style={{...styles.buttonItem, backgroundColor: '#F5F5F5', width: GS.mixin.rem(115)}}>
                  <Text style={{...styles.buttonText, color: '@2a2a2a'}}>资金明细</Text>
                </View>
              </MyTouchableOpacity>
            </View>
          }
          {
            order &&
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <Text style={{color: '#E3262A'}} onPress={contineDeposit}>
                您有一笔未完成的订单，点击继续操作
              </Text>
            </View>
          }
        </View>
      }
      <View style={styles.adView}>
        <Image source={require('./i/ad.png')} style={{width: GS.mixin.rem(24), height: GS.mixin.rem(24)}} />
        <Text
          style={styles.adViewText}
          onPress={() => forward({
            title: rs.base.appDisplayConfig.MemberPageInfo?.SpreadConfig?.Title,
            type: 'origin',
            uri: rs.base.appDisplayConfig.MemberPageInfo?.SpreadConfig?.JumpLink
          })}
        >
          {rs.base.appDisplayConfig.MemberPageInfo?.SpreadConfig?.Title}
        </Text>
      </View>
      <ScrollView style={styles.menusView} showsVerticalScrollIndicator={false}>
        {
          _.isEmpty(infos) &&
          <>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AboutUs')}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-1.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>关于我们</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['QA'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-2.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>常见问答</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['CMS_INVEST'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-3.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>投资知识</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['PRD_RULES'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-4.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover'/>
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>产品细则</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} resizeMode='cover'/>
            </MyTouchableOpacity>
          </>
        }
        {
          !_.isEmpty(infos) &&
          <>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-6.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>个人信息</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['PAYMENT_SETTING'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-7.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>支付管理</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['ATM_DETAIL'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-9.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>资金明细</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            {/* <MyTouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Root', {screen: 'Trade', params: {tab: 0}})}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-8.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>持仓详情</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity> */}
            <MyTouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Root', {screen: 'Trade', params: {tab: 2}})}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon/icon-10.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>交易记录</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
          </>
        }
        <MyTouchableOpacity style={{...styles.menuItem}} onPress={() => forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService})}>
          <View style={styles.menuItemContent}>
            <Image source={require('./i/icon/icon-5.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
            <Text style={{...styles.buttonText, color: '#2A2A2A'}}>在线客服</Text>
          </View>
          <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
        </MyTouchableOpacity>
        <MyTouchableOpacity style={{...styles.menuItem, borderBottomWidth: 0}} onPress={() => setIsShowDisclaimer(true)}>
          <View style={styles.menuItemContent}>
            <Image source={require('./i/icon/icon-8.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(20)}} resizeMode='cover' />
            <Text style={{...styles.buttonText, color: '#2A2A2A'}}>免责声明</Text>
          </View>
          <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
        </MyTouchableOpacity>
      </ScrollView>
      {
        isShowDisclaimer &&
        <Disclaimer onClose={() => setIsShowDisclaimer(false)} />
      }
    </View>
  )

}