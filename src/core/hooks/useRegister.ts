/*
 * @Author: Galen.GE
 * @Date: 2023-06-20 18:41:07
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useRegister.ts
 * @Description: 注册相关
*/
import React from 'react';
import usePublicState from '@core/hooks/usePublicState';
import useVerifyCode from '@core/hooks/useValidateCode';
import { useIsFocused } from "@react-navigation/native";
import storage from '@helpers/storage';
import CONFIG from '@this/configs';

export default () => {

  const VerifyCodeHook = useVerifyCode({ type: 'register' });
  const isFocused = useIsFocused();
  const { dispatch, ACTIONS, navigation } = usePublicState();
  const [ AuthCode, setAuthCode ] = React.useState('');
  const [ Password, setPassword ] = React.useState('');
  const [ showPassword, setShowPassword ] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<any>({});

  // 注册
  const [ payload, setPayload ] = React.useState<{
    CountryCode: string;
    PhoneNumber: string;
    AuthCode: string;
    Agree: boolean;
  }>({
    CountryCode: CONFIG.SUPPORT_PHONE_CODE[0].code,
    PhoneNumber: '',
    AuthCode: '',
    Agree: true
  });

  // 实名验证
  const [ realNameAuth, setRealNameAuth ] = React.useState<{
    IdCardNo: string;
    RealName: string;
    Password: string;
  }>({
    IdCardNo: '',
    RealName: '',
    Password: ''
  });

  // 问卷答案
  const [ questionnaire, setQuestionnaire ] = React.useState<{
    qas: Array<number>,
    risk: Array<boolean>
  }>({
    qas: [],
    risk: []
  });


  // 字段校验
  const validate = (key: 'Password' | 'PhoneNumber' | 'Token' | 'IdCardNo' | 'RealName') => {
    if(!isFocused){
      return;
    }
    // 手机号
    if(key === 'PhoneNumber') {
      if (!/^[0-9]{8,20}$/.test(payload.PhoneNumber)) {
        setErrors({...errors, PhoneNumber: '请输入正确的手机号'});
        dispatch(ACTIONS.BASE.openToast({text: '请输入正确的手机号', types: 'error'}));
        return;
      }
      setErrors({...errors, PhoneNumber: null});
      return;
    }
    // 验证码
    if(key === 'Token'){
      // 6位数字
      if (!/^[0-9]{6}$/.test(payload.AuthCode)) {
        setErrors({...errors, AuthCode: '请输入正确的验证码'});
        dispatch(ACTIONS.BASE.openToast({text: '请输入正确的验证码', types: 'error'}));
        return;
      }
      setErrors({...errors, AuthCode: null});
    }
    // 密码
    if (key === 'Password') {
      // 数字和字母组合，8-20位
      if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(realNameAuth.Password)) {
        setErrors({...errors, Password: '请输入正确的密码格式（数字和字母组合，8-20位） '});
        dispatch(ACTIONS.BASE.openToast({text: '请输入正确的密码格式（数字和字母组合，8-20位）', types: 'error'}));
        return;
      }
      setErrors({...errors, Password: null});
    }
    // 身份证号
    if (key === 'IdCardNo') {
      // 18位数字 或者 17位数字加一个字母
      if (!/^[0-9]{17}[0-9Xx]{1}$/.test(realNameAuth.IdCardNo)) {
        setErrors({...errors, IdCardNo: '请输入正确的身份证号'});
        dispatch(ACTIONS.BASE.openToast({text: '请输入正确的身份证号', types: 'error'}));
        return;
      }
      setErrors({...errors, IdCardNo: null});
    }
    // 姓名
    if (key === 'RealName') {
      if (!realNameAuth.RealName) {
        setErrors({...errors, RealName: '请输入正确的姓名'});
        dispatch(ACTIONS.BASE.openToast({text: '请输入正确的姓名', types: 'error'}));
        return;
      }
      setErrors({...errors, RealName: null});
    }
  }

  const register = () => {
    // 如果还有错误提示，不允许提交
    if (Object.values(errors).some((item) => item) || !payload.PhoneNumber || !payload.AuthCode) {
      dispatch(ACTIONS.BASE.openToast({ text: '请填写正确信息后提交' }));
      return;
    }
    // 没有同意协议
    if (!payload.Agree) {
      dispatch(ACTIONS.BASE.openToast({ text: '请同意用户协议后提交' }));
      return;
    }
    dispatch(ACTIONS.USER.register({ data: {
      ...payload,
      ParentId: 0,
      Password: 'a12345678'
    }, cb: (res: any) => {
      // 该手机号已注册
      if(res.code === 2) {
        dispatch(ACTIONS.BASE.openAlert({
          content: '该手机号已注册，请前往登录',
          cb: () => {
            navigation.replace('Login');
          }
        }));
        return;
      }
      // 其他错误
      if(res.code !== 0) {
        dispatch(ACTIONS.BASE.openToast({ text: res.desc }));
        return;
      }
      storage.set('AUTH', res.data);
      dispatch(ACTIONS.BASE.openToast({ text: '开户成功', types: 'success' }));
      dispatch(ACTIONS.USER.getUserInfo({cb: () => {
        navigation.replace('RealnameAuthentication');
      }}));
    }}))
  }

  // 验证实名
  const validateRealName = () => {
    // 如果还有错误提示，不允许提交
    if (Object.values(errors).some((item) => item) || !realNameAuth.IdCardNo || !realNameAuth.RealName || !realNameAuth.Password) {
      dispatch(ACTIONS.BASE.openToast({ text: '请填写正确信息后提交' }));
      return;
    }
    dispatch(ACTIONS.USER.verifyRealName({ data: {
      ...realNameAuth
    }, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({ text: '实名验证成功' }));
      dispatch(ACTIONS.USER.getUserInfo({cb: () => {
        navigation.replace('Questionnaire');
      }}));
    }}))
  }

  // 提交问卷答案
  const submitQuestionnaire = () => {
    // return;
    var data = {
      // 将0,1,2,3 转换成 A,B,C,D
      ResultList: [...questionnaire.qas.map((item) => String.fromCharCode(item + 65)), 'YES', 'YES', 'YES'],
    }
    dispatch(ACTIONS.USER.submitQuestionnaire({ data, cb: (res: any) => {
      dispatch(ACTIONS.BASE.openToast({ text: '提交成功' }));
      dispatch(ACTIONS.USER.getUserInfo({cb: () => {
        navigation.replace('DoneForRegister');
      }}));
    }}))
  }



  return {
    payload,
    setPayload,
    AuthCode,
    Password,
    setAuthCode,
    setPassword,
    register,
    validate,
    errors,
    setErrors,
    realNameAuth,
    setRealNameAuth,
    showPassword,
    setShowPassword,
    validateRealName,
    questionnaire,
    setQuestionnaire,
    submitQuestionnaire,
    countryCodeList: CONFIG.SUPPORT_PHONE_CODE.map((item) => ({
      value: `${item.name}（+${item.code}）`,
      key: item.code
    })),
    QUESTION_LIST,
    RISKS,
    ...VerifyCodeHook
  }

}


// 问题列表
export const QUESTION_LIST = [
  {
    question: '1.您投资现货黄金/白银的经验年限是',
    answerList: [
      '3年以上',
      '1-3年',
      '1年以内',
      '没有经验'
    ]
  },
  {
    question: '2.您的年收入约为',
    answerList: [
      '0-2万美元',
      '2-5万美元',
      '5-10万美元',
      '10-15万美元',
      '15万美元以上'
    ]
  },
  {
    question: '3. 您计划用作交易的投资金额占您个人收入的比例为',
    answerList: [
      '少于5%',
      '5%-10%',
      '10%-20%',
      '20%-30%',
      '30%-50%',
      '50%以上'
    ]
  },
  {
    question: '4. 您能承受所投资产品的价值出现以下何种程度的波动',
    answerList: [
      '本金无损失，但收益未达到预期',
      '出现轻微的本金损失',
      '出现10%以内的本金损失',
      '出现20%-50%的本金损失',
      '出现50%以上的本金损失'
    ]
  },
  {
    question: '5. 以下哪种描述，最符合您的投资目的及投资意向',
    answerList: [
      '短线投机',
      '中长线财产增长',
      '保本抵御通胀',
      '多元化投资',
    ]
  }
]

// 风险说明
export const RISKS = [
  '6. 您清楚明白所有投资均带有风险，产品价格可升可跌，并且过往投资表现与未来表现没有必然的关联性',
  '7. 您是否愿意接受100倍或以上杠杆的投资产品，并清楚明白投资可能招致您初始保证金的损失',
  '8. 您是否确认您所有投资行为均为个人独立行为，并未随意受他人意见或建议影响，全部真实有效，且本公司及本公司网站内容提供的任何信息仅作为一般资料或参考，并不构成任何投资建议。'
]
