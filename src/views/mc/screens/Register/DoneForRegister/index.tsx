/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:31
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Register/DoneForRegister/index.tsx
 * @Description: 登录
 */
import _ from 'lodash';
import React from 'react';
import { View, Image, Text,  } from 'react-native';
import BackgroundView from "@core/templates/components/BackgroundView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Clipboard from '@react-native-clipboard/clipboard';
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import Agreement from './Agreement';
import ICon from '@template/components/Icon';
import { LS as styles, GS } from './style';


export default () => {

  const insets = useSafeAreaInsets();
  const { rs, dispatch, ACTIONS, ossDomain, navigation, customerService } = usePublicState();
  const [ showArrow, setShowArrow ] = React.useState(true)
  const { forward } = useRouteWebCommon();
  const [ type, setType ] = React.useState(0);

  const ProInvestorConfig = rs.base.appDisplayConfig?.ProInvestorConfig;
  const [showArrge, setShowArrge] = React.useState(false);

  React.useEffect(() => {
    dispatch(ACTIONS.BASE.getPopupAdvert());
  }, [])

  const handleCopy = (copyText: any) => {
    Clipboard.setString(`${copyText}`);
    dispatch(ACTIONS.BASE.openToast({text: '已复制当前选项', types: 'success'}));
  }

  const openAgreement = (e: any) => {
    e.stopPropagation();
    setShowArrge(true);
  }

  const showNormal = () => {
    setShowArrow(false);
    setType(1);
  }

  return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={{...styles.titleView, marginTop: insets.top}}>
          <Text style={styles.titleText}>开户成功</Text>
        </View>
        <Text style={styles.welcome}></Text>
      </BackgroundView>
      <View style={styles.formView}>
        <View style={styles.tips}>
          <Image style={styles.tipImage} source={require('./i/icon-done.png')} />
          <Text style={styles.tipsText}>开户成功</Text>
        </View>
        <Text style={styles.desc}>
          恭喜，您已符合我司对专业投资者级别要求，可享有200倍杠杆，$26/手点差回赠。
        </Text>
        <View style={styles.arrge}>
          <MyTouchableOpacity style={styles.arrgeView} onPress={() => setType(0)}>
            <Text style={styles.arrgeText}>
              {
                type === 0 ?
                <ICon.Font name="checkcircle" type={ICon.T.AntDesign} size={14} color="#FFC600" />:
                <ICon.Font name="circle" type={ICon.T.Entypo} size={14} color="#FFC600" />
              }
              {` `}我已同意<Text style={styles.arrgeText} onPress={openAgreement}>《专业投资者客户协议》</Text>并确认开户</Text>
          </MyTouchableOpacity>
          {
            !showArrow &&
            <MyTouchableOpacity style={styles.arrgeView} onPress={() => setType(1)}>
              {
                type === 1 ?
                <ICon.Font name="checkcircle" type={ICon.T.AntDesign} size={14} color="#FFC600" />:
                <ICon.Font name="circle" type={ICon.T.Entypo} size={14} color="#FFC600" />
              }
              <Text style={styles.arrgeText}>{` `}我想开通普通投资者账户</Text>
            </MyTouchableOpacity>
          }
          {
            showArrow &&
            <MyTouchableOpacity onPress={showNormal}>
              <Image source={require('./i/double-arrow-down.png')} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 5, marginBottom: 5, width: GS.mixin.rem(15), height: GS.mixin.rem(11)}} />
            </MyTouchableOpacity>
          }
        </View>
        {
          type === 0 &&
          <>
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <View style={styles.lableView}>
                  <Text style={{...styles.contentItemText}}>MT4账户号码</Text>
                </View>
                <View style={styles.copyView}>
                  <Text style={{...styles.contentItemText, }}>{rs.user.registerProgress?.data?.Mt4Id}</Text>
                  <MyTouchableOpacity onPress={() => handleCopy(rs.user.registerProgress?.data?.Mt4Id)} >
                    <Image style={styles.copyImage} source={require('./i/icon-copy.png')} />
                  </MyTouchableOpacity>
                </View>
              </View>
              <View style={styles.contentItem}>
                <View style={styles.lableView}>
                  <Text style={{...styles.contentItemText}}>MT4交易密码</Text>
                </View>
                <View style={styles.copyView}>
                  <Text style={{...styles.contentItemText, }}>{rs.user.registerProgress?.data?.Password}</Text>
                  <MyTouchableOpacity onPress={() => handleCopy(rs.user.registerProgress?.data?.Password)}>
                    <Image style={styles.copyImage} source={require('./i/icon-copy.png')} />
                  </MyTouchableOpacity>
                </View>
              </View>
              <View style={{...styles.contentItem, borderBottomWidth: 0}}>
                <View style={styles.lableView}>
                  <Text style={{...styles.contentItemText}}>MT4服务器入口</Text>
                </View>
                <View style={styles.copyView}>
                  <Text style={{...styles.contentItemText, }}>{rs.user.registerProgress?.data?.Server}</Text>
                  <MyTouchableOpacity onPress={() => handleCopy(rs.user.registerProgress?.data?.Server)}>
                    <Image style={styles.copyImage} source={require('./i/icon-copy.png')} resizeMode='contain' />
                  </MyTouchableOpacity>
                </View>
              </View>
            </View>
            <Image source={{uri: `${ossDomain}${ProInvestorConfig?.Image}`}} style={styles.adArrge} />
            <MyTouchableOpacity style={styles.submitView} onPress={() => forward({...FORWARD_TYPES['DEPOSIT'], reset: true})}>
              <Text style={styles.submitText}>确认并前往注资</Text>
            </MyTouchableOpacity>
          </>
        }
        {
          type === 1 &&
          <>
            <Text style={styles.desc}>
              普通投资者账户杠杆为50倍，无点差回赠优惠。如需开通普通投资者账户可以联系我们的在线客服为您服务。
            </Text>
            <View style={styles.actions}>
              <MyTouchableOpacity style={[styles.submitView, styles.actionButton]} onPress={() => navigation.reset({index: 0, routes: [{ name: 'Root', screen: 'Home' }]})} >
                <Text style={styles.submitText}>返回</Text>
              </MyTouchableOpacity>
              <MyTouchableOpacity style={[styles.submitView, styles.actionButton, styles.cs]} onPress={() => forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService})}>
                <Text style={{...styles.submitText}}>在线客服</Text>
              </MyTouchableOpacity>
            </View>
          </>
        }
      </View>
      {
        showArrge && <Agreement onClose={() => setShowArrge(false)} />
      }
    </View>
  )

}
