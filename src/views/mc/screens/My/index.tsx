/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-11-08 12:07:33
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/My/index.tsx
 * @Description:
 */
import _ from 'lodash';
import React from "react";
import { View, Image, Text } from 'react-native';
import Enum from '@constants/enum';
import BackgroundView from "@core/templates/components/BackgroundView";
import MyTouchableOpacity from "@core/templates/components/MyTouchableOpacity";
import Icon from '@icon/index';
import usePublicState from "@core/hooks/usePublicState";
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import style, { LS as styles, GS } from './style';

export default () => {

  const { rs, navigation, infos, customerService } = usePublicState();
  const [ showMoney, setShowMoney ] = React.useState(false);
  const { forward } = useRouteWebCommon();

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

   return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={styles.userInfoView}>
          <Image source={require('./i/avatar.png')} style={{width: GS.mixin.rem(60), height: GS.mixin.rem(60)}} />
          <View style={styles.textBox}>
            <View style={styles.settingsView}>
              <Text style={styles.unlogin} >{infos.RealName || '未开户'}</Text>
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
                  {infos.KycScore >= 33 ? '专业投资者' : '一般投资者'}
                </Text>
              </View>
            }
            {
              !infos.RealName &&
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: GS.mixin.rem(10)}}>
                <Text style={{fontSize: GS.mixin.rem(14)}}>
                  开户立即领取88元红包
                </Text>
                <BackgroundView source={require('./i/icon-new.png')} style={styles.tips}>
                  <Text style={{color: 'white'}}>
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
          <Text style={styles.moneyTitle}>资产净值（USD）</Text>
          <View style={styles.moneyDetail}>
            <Text style={styles.moneyDetailText}>{showMoney ? (infos.Balance || '0.00') : '****'}</Text>
            <MyTouchableOpacity onPress={() => setShowMoney(!showMoney)}>
              <Icon.Font type={Icon.T.Feather} name={!showMoney ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} style={{marginTop: 5}} color="#94938F" />
            </MyTouchableOpacity>
          </View>
          {
            // 未登录
            _.isEmpty(infos) &&
            <View style={styles.buttons}>
              <MyTouchableOpacity style={styles.buttonItem} onPress={() => navigation.navigate('Login')}>
                <View style={styles.buttonItem}>
                  <Image source={require('./i/login.png')} style={styles.buttonIcon} />
                  <Text style={styles.buttonText}>登录</Text>
                </View>
              </MyTouchableOpacity>
              <MyTouchableOpacity style={styles.buttonItem} onPress={handleGoToRegister}>
                <View style={{...styles.buttonItem, backgroundColor: '#FFC600'}}>
                  <Image source={require('./i/register.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(18)}} />
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
              <MyTouchableOpacity style={styles.buttonItem} onPress={() => forward(FORWARD_TYPES['ATM'])}>
                <View style={styles.buttonItem}>
                  <Image source={require('./i/qk.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(17)}} resizeMode='contain' />
                  <Text style={styles.buttonText}>取款</Text>
                </View>
              </MyTouchableOpacity>
              <MyTouchableOpacity style={styles.buttonItem} onPress={() => forward(FORWARD_TYPES['DEPOSIT'])}>
                <View style={{...styles.buttonItem, backgroundColor: '#FFC600'}}>
                  <Image source={require('./i/zz.png')} style={{...styles.buttonIcon, width: GS.mixin.rem(20), height: GS.mixin.rem(18)}} resizeMode='contain' />
                  <Text style={{...styles.buttonText, color: 'black'}}>注资</Text>
                </View>
              </MyTouchableOpacity>
            </View>
          }
        </View>
      }
      <View style={styles.adView}>
        <Image source={require('./i/ad.png')} style={{width: GS.mixin.rem(24), height: GS.mixin.rem(24)}} />
        <Text style={styles.adViewText}>最高$30/手点差优惠 全行至优成本</Text>
      </View>
      <View style={styles.menusView}>
        {
          _.isEmpty(infos) &&
          <>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AboutUs')}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-1.png')} style={{width: GS.mixin.rem(20), height: GS.mixin.rem(20)}} resizeMode='contain' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>关于我们</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['QA'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-2.png')} style={{width: GS.mixin.rem(20), height: GS.mixin.rem(20)}} resizeMode='contain' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>常见问答</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['CMS_INVEST'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-3.png')} style={{width: GS.mixin.rem(20), height: GS.mixin.rem(20)}} resizeMode='contain' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>投资知识</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['PRD_RULES'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-4.png')} style={{width: GS.mixin.rem(20), height: GS.mixin.rem(20)}} resizeMode='contain'/>
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>产品细则</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} resizeMode='contain'/>
            </MyTouchableOpacity>
          </>
        }
        {
          !_.isEmpty(infos) &&
          <>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['USER_INFOS'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-6.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(11)}} resizeMode='contain' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>个人信息</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['PAYMENT_SETTING'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-7.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(15)}} resizeMode='contain' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>支付管理</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => {}}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-8.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(13)}} resizeMode='contain' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>持仓详情</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => forward(FORWARD_TYPES['ATM_DETAIL'])}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-9.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(17)}} resizeMode='contain' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>资金明细</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
            <MyTouchableOpacity style={styles.menuItem} onPress={() => {}}>
              <View style={styles.menuItemContent}>
                <Image source={require('./i/icon-10.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(14)}} resizeMode='contain' />
                <Text style={{...styles.buttonText, color: '#2A2A2A'}}>交易记录</Text>
              </View>
              <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
            </MyTouchableOpacity>
          </>
        }
        <MyTouchableOpacity style={styles.menuItem} onPress={() => forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService})}>
          <View style={styles.menuItemContent}>
            <Image source={require('./i/icon-5.png')} style={{width: GS.mixin.rem(15), height: GS.mixin.rem(14)}} resizeMode='contain' />
            <Text style={{...styles.buttonText, color: '#2A2A2A'}}>在线客服</Text>
          </View>
          <Icon.Font type={Icon.T.MaterialIcons} name="keyboard-arrow-right" size={GS.mixin.rem(20)} />
        </MyTouchableOpacity>
      </View>
    </View>
  )

}