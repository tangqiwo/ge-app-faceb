/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-27 11:07:31
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Register/Questionnaire/index.tsx
 * @Description: 登录
 */
import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, View, Text  } from 'react-native';
import MyImage from '@core/templates/components/Base/Image';
import BackgroundView from "@core/templates/components/BackgroundView";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import usePublicState from '@core/hooks/usePublicState';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import useRegister, { QUESTION_LIST, RISKS, } from "@core/hooks/useRegister";
import PopupAD from '@template/components/PopupAD';
import ExitPopup from '@this/components/ExitPopup';
import Icon from '@icon/index';
import G from '@constants/global';
import { LS as styles, GS } from './style';


export default () => {

  const { rs, dispatch, ACTIONS, isFocused, navigation, ossDomain } = usePublicState();
  const insets = useSafeAreaInsets();
  const exitInfo = useSelector((state: any) => state.base.appDisplayConfig?.RegisterFailedDialog.Data[0]);
  const [ showAd, setShowAd ] = React.useState(false);
  const [ showExitAd, setShowExitAd ] = React.useState(false);
  const { questionnaire, setQuestionnaire, submitQuestionnaire } = useRegister();

  React.useEffect(() => {
    dispatch(ACTIONS.BASE.getPopupAd());
  }, [])

  React.useEffect(() => {
    if(!isFocused){
      return;
    }
    if(!rs.base.popupAd.KYC?.Data || !rs.base.popupAd.KYC.Data.length){
      return;
    }
    setShowAd(true);
  }, [rs.base.popupAd.KYC?.Data])

   // 设置问题答案
   const setAnswer = (index: number, answer: number) => {
    var qas = questionnaire.qas;
    qas[index] = answer;
    setQuestionnaire({...questionnaire, qas});
  }

  // 设置风险问题答案
  const setRiskAnswer = (index: number, answer: boolean) => {
    if(!answer){
      dispatch(ACTIONS.BASE.openAlert({
        title: '风险说明',
        content: '尊敬的客户，若您无法确认或不能接受风险说明中的交易风险，可能导致开户验证失败，请您谨慎填选，谢谢。'
      }))
      return;
    }
    var risk = questionnaire.risk;
    risk[index] = answer;
    setQuestionnaire({...questionnaire, risk});
  }

  // 是否完成问卷调查，同意所有风险
  const isComplete = () => {
    // 如果有未完成的问题
    if(questionnaire.qas.length < QUESTION_LIST.length){
      return false;
    }
    // 如果有未同意的风险
    if(questionnaire.risk.length < RISKS.length){
      return false;
    }
    return true;
  }

  // 去提交
  const toSubmit = () => {
    if(!isComplete()){
      dispatch(ACTIONS.BASE.openToast({ text: '请完成问卷调查' }))
      return;
    }
    submitQuestionnaire();
  }

  return (
    <View>
      <BackgroundView source={require('./i/bg.png')} style={{...styles.header}} resizeMode="contain" >
        <View style={{...styles.titleView, marginTop: insets.top}}>
          <MyTouchableOpacity style={styles.goBack} onPress={() => setShowExitAd(true)}>
            <Icon.Font style={styles.goBackIcon} type={Icon.T.SimpleLineIcons} name='arrow-left' />
          </MyTouchableOpacity>
          <Text style={styles.titleText}>问卷调查</Text>
        </View>
        <Text style={styles.welcome}>立即领取本月限定红包！</Text>
      </BackgroundView>
      <View style={{
        ...styles.formScorllViewBox,
        height: G.GET('SCREEN_HEIGHT') - insets.bottom - GS.mixin.rem(118),
      }}>
        <ScrollView
          style={{...styles.formScorllView, height: G.GET('SCREEN_HEIGHT') - insets.bottom - GS.mixin.rem(200)}}
        >
          <View style={styles.scorllContent}>
            <View style={styles.questionsTitleView}>
              <Text style={styles.questionsTitleText}>{`“专业投资者”认证问卷表`}</Text>
            </View>
            {
              QUESTION_LIST.map((item, index) =>
                <View style={styles.questionsView} key={index}>
                  <Text style={styles.qText}>{item.question}</Text>
                  <View style={styles.aView}>
                    {
                      item.answerList.map((it, idx) =>
                        <MyTouchableOpacity style={{...styles.aItem, backgroundColor: questionnaire.qas[index] === idx ? '#FFC600' : '#D9D9D9'}} key={idx} onPress={() => setAnswer(index, idx)}>
                          <Text>
                            {it}
                          </Text>
                        </MyTouchableOpacity>
                      )
                    }
                  </View>
                </View>
              )
            }
            {
              RISKS.map((item: any, index: number) =>
                <View style={styles.questionsView} key={index}>
                  <Text style={styles.qText}>{item}</Text>
                  <View style={styles.aView}>
                    <MyTouchableOpacity style={{...styles.aItem, backgroundColor: questionnaire.risk[index] ? '#FFC600' : '#D9D9D9'}} onPress={() => setRiskAnswer(index, true)}>
                      <Text style={{width: '100%', textAlign: 'center'}}>是</Text>
                    </MyTouchableOpacity>
                    <MyTouchableOpacity style={styles.aItem} onPress={() => setRiskAnswer(index, false)}>
                      <Text style={{width: '100%', textAlign: 'center'}}>否</Text>
                    </MyTouchableOpacity>
                  </View>
                </View>
              )
            }
          </View>
        </ScrollView>
        <MyTouchableOpacity
          style={{...styles.submitView, backgroundColor: 8 == (questionnaire.qas.filter(i => i || i===0).length + questionnaire.risk.filter(i => i).length) ? '#FFC600' : '#D9D9D9'}}
          onPress={() => toSubmit()}
        >
          <Text style={styles.submitText}>提交</Text>
        </MyTouchableOpacity>
        <View style={styles.rateView}>
          <View style={{...styles.rate, width: `${(questionnaire.qas.filter(i => i || i===0).length + questionnaire.risk.filter(i => i).length) / 8 * 100 }%`}} />
        </View>
        <Text style={styles.rateText}>{`剩余${8 - (questionnaire.qas.filter(i => i || i===0).length + questionnaire.risk.filter(i => i).length)}题`}</Text>
      </View>
      <PopupAD visible={showAd} onClose={() => setShowAd(false)}>
        <MyImage width={GS.mixin.rem(335)} source={{uri: ossDomain + rs.base.popupAd.KYC?.Data[0]?.BannerImg}} />
      </PopupAD>
      <ExitPopup
        display={showExitAd}
        close={() => setShowExitAd(false)}
        exit={() => navigation.goBack()}
        cancelText="继续认证"
        text={JSON.parse(exitInfo?.Content)?.Content}
      >
        <MyImage width={GS.mixin.rem(170)} source={{uri: ossDomain + exitInfo.BannerImg}} />
      </ExitPopup>
    </View>
  )

}
