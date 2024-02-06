/*
 * @Author: Galen.GE
 * @Date: 2024-01-30 12:02:09
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Profile/index.tsx
 * @Description:
 */
import _, { set } from 'lodash';
import { UserInfo } from '@core/schemas/interface';
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import Enum from '@constants/enum';
import { useSelector } from 'react-redux';
import usePublicState from '@core/hooks/usePublicState';
import useValidateCode from '@core/hooks/useValidateCode';
import useProfile from '@core/hooks/useProfile';
import UploadId from './components/UploadId';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Popup, { PopupContent, PopupActions, PopupActionBtn } from '@core/templates/components/Popup';
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import Icon from '@icon/index';
import BackgroundView from '@core/templates/components/BackgroundView';
import { Input } from '@ui-base/index';
import { LS as styles, GS } from './style';

export default () => {

  const { forward } = useRouteWebCommon();
  const { navigation, customerService} = usePublicState();
  const { getMT4ValidateCode, countDown } = useValidateCode({});
  const {
    updateAvatar,
    updateNickName,
    updateEmail,
    updateAddress,
    updatePassword,
    updateMt4Password
  } = useProfile();
  const registerProgressCode = useSelector((state: any) => state.user.registerProgress.code);
  const info: UserInfo = useSelector((state: any) => state.user.info);
  const [showSelectAvatar, setShowSelectAvatar] = React.useState(false);
  const [checkedAvatar, setCheckedAvatar] = React.useState(info.Avatar || 1);
  const [showEdit, setShowEdit] = React.useState(null);
  const [showOldPass, setShowOldPass] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const textInputRef = React.useRef(null);
  const [editPayload, setEditPayload] = React.useState({
    nickname: '',
    email: '',
    address: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    authCode: ''
  });

  React.useEffect(() => {
    if(registerProgressCode === Enum.user.ERegisterProgress.WAITING_REAL_NAME_AUTHENTICATION) {
      navigation.replace('RealnameAuthentication');
      return;
    }
    if(registerProgressCode === Enum.user.ERegisterProgress.WAITING_QUESTIONNAIRE) {
      navigation.replace('Questionnaire');
      return;
    }
  }, [registerProgressCode])

  const handleEidt = (type: 'nickname' | 'email' | 'address' | 'pass' | 'mt4-pass') => {
    setShowEdit(type);
    setEditPayload({
      nickname: '',
      email: '',
      address: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      authCode: ''
    })
  }

  const handleSubmitEdit = () => {
    const callback = () => {
      setShowEdit(null);
    }
    if(showEdit === 'nickname'){
      updateNickName(editPayload.nickname, callback);
    }
    if(showEdit === 'email'){
      updateEmail(editPayload.email, callback);
    }
    if(showEdit === 'address'){
      updateAddress(editPayload.address, callback);
    }
    if(showEdit === 'pass'){
      updatePassword({
        oldPassword: editPayload.oldPassword,
        newPassword: editPayload.newPassword,
        confirmPassword: editPayload.confirmPassword,
        callback
      });
    };
    if(showEdit === 'mt4-pass'){
      updateMt4Password({
        newPassword: editPayload.newPassword,
        confirmPassword: editPayload.confirmPassword,
        code: editPayload.authCode,
        callback
      });
    }
  }

  if(registerProgressCode === Enum.user.ERegisterProgress.SUPPLEMENTARY_INFORMATION){
    return (<UploadId />)
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.avatar}>
          <Image style={styles.avatarImage} source={Avatar[info.Avatar || 1]} resizeMode='contain' />
          <Text style={styles.avatarText} onPress={() => setShowSelectAvatar(true)}>变更头像</Text>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.rowLabel}>姓名：</Text>
          <Text style={styles.rowLabel}>{info.RealName}</Text>
          {
            [1,3].includes(info.UserStatus) &&
            <BackgroundView style={styles.waitApprove} source={require('./i/authstr.png')} resizeMode='contain'>
              <Text style={styles.waitApproveText}>
                {info.UserStatus === 1 && '待审批'}
                {info.UserStatus === 3 && '已认证'}
              </Text>
            </BackgroundView>
          }
        </View>
        <View style={styles.rowData}>
          <Text style={styles.rowLabel}>昵称：</Text>
          <Text style={styles.rowLabel}>{info.Nickname}</Text>
          <MyTouchableOpacity style={styles.edit} onPress={() => handleEidt('nickname')}>
            <Icon.Font type={Icon.T.MaterialIcons} style={styles.editIcon} name='edit'  />
          </MyTouchableOpacity>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.rowLabel}>手机：</Text>
          <Text style={styles.rowLabel}>{info.PhoneNumber}</Text>
          <MyTouchableOpacity style={styles.cs} onPress={() => forward({...FORWARD_TYPES['CUSTOMER_SERVICE'], uri: customerService})}>
            <Text style={{color: 'white'}}>联系客服</Text>
          </MyTouchableOpacity>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.rowLabel}>邮箱：</Text>
          <Text style={styles.rowLabel}>{info.Email}</Text>
          <MyTouchableOpacity style={styles.edit} onPress={() => handleEidt('email')}>
            <Icon.Font type={Icon.T.MaterialIcons} style={styles.editIcon} name='edit'  />
          </MyTouchableOpacity>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.rowLabel}>地址：</Text>
          <Text style={styles.rowLabel}>{info.Address}</Text>
          <MyTouchableOpacity style={styles.edit} onPress={() => handleEidt('address')}>
            <Icon.Font type={Icon.T.MaterialIcons} style={styles.editIcon} name='edit'  />
          </MyTouchableOpacity>
        </View>
        <Text style={styles.title}>用户设定</Text>
        <View style={styles.rowData}>
          <Text style={styles.rowLabel}>会员中心密码</Text>
          <MyTouchableOpacity style={styles.edit} onPress={() => handleEidt('pass')}>
            <Icon.Font type={Icon.T.MaterialIcons} style={styles.editIcon} name='edit'  />
          </MyTouchableOpacity>
        </View>
        <View style={styles.rowData}>
          <Text style={styles.rowLabel}>MT4密码</Text>
          <MyTouchableOpacity style={styles.edit} onPress={() => handleEidt('mt4-pass')}>
            <Icon.Font type={Icon.T.MaterialIcons} style={styles.editIcon} name='edit'  />
          </MyTouchableOpacity>
        </View>
        <Popup title="变更头像" display={showSelectAvatar} close={() => setShowSelectAvatar(false)} isFull>
          <PopupContent wrapperType='Keyboard' isFull>
            <View style={styles.avatarSelector}>
              {
                _.times(40, (index) =>
                  <MyTouchableOpacity onPress={() => setCheckedAvatar(index + 1)} key={index}>
                    <Image
                      source={Avatar[index + 1]} resizeMode='contain'
                      style={[styles.avatarImage, checkedAvatar === index + 1 && styles.avatarImageChecked]}
                    />
                  </MyTouchableOpacity>
                )
              }
            </View>
          </PopupContent>
          <PopupActions>
            <PopupActionBtn text="确认" action={() => {updateAvatar(checkedAvatar, () => setShowSelectAvatar(false))}} />
          </PopupActions>
        </Popup>
        {
          showEdit &&
          <Popup title={Title[showEdit]} close={() => setShowEdit(null)} display isFull>
            <PopupContent wrapperType='Keyboard' isFull>
              {
                showEdit === 'nickname' &&
                <View style={styles.editCurrent}>
                  <View style={styles.rowData}>
                    <Text style={styles.rowLabel}>当前昵称：</Text>
                    <Text style={styles.rowLabel}>{info.Nickname}</Text>
                  </View>
                  <Text style={styles.title}>新昵称：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      placeholder="昵称"
                      style={styles.inputText}
                      value={editPayload.nickname}
                      onChangeText={(value: string) => setEditPayload({...editPayload, nickname: value})}
                    />
                  </View>
                </View>
              }
              {
                showEdit === 'email' &&
                <View style={styles.editCurrent}>
                  <View style={styles.rowData}>
                    <Text style={styles.rowLabel}>当前邮箱：</Text>
                    <Text style={styles.rowLabel}>{info.Email || '未设置'}</Text>
                  </View>
                  <Text style={styles.title}>新邮箱：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      placeholder="邮箱"
                      style={styles.inputText}
                      value={editPayload.email}
                      onChangeText={(value: string) => setEditPayload({...editPayload, email: value})}
                    />
                  </View>
                </View>
              }
              {
                showEdit === 'address' &&
                <View style={styles.editCurrent}>
                  <View style={styles.rowData}>
                    <Text style={styles.rowLabel}>当前地址：</Text>
                    <Text style={styles.rowLabel}>{info.Address || '未设置'}</Text>
                  </View>
                  <Text style={styles.title}>新地址：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      placeholder="地址"
                      style={styles.inputText}
                      value={editPayload.address}
                      onChangeText={(value: string) => setEditPayload({...editPayload, address: value})}
                    />
                  </View>
                </View>
              }
              {
                showEdit === 'pass' &&
                <View style={styles.editCurrent}>
                  <Text style={styles.title}>旧密码：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      placeholder="旧会员中心密码"
                      style={styles.inputText}
                      value={editPayload.oldPassword}
                      onChangeText={(value: string) => setEditPayload({...editPayload, oldPassword: value})}
                      type={showOldPass ? 'text' : 'password'}
                    />
                    <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowOldPass(!showOldPass)}>
                      <Icon.Font type={Icon.T.Feather}  name={!showOldPass ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
                    </MyTouchableOpacity>
                  </View>
                  <Text style={styles.title}>新密码：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      placeholder="会员中心新密码"
                      style={styles.inputText}
                      value={editPayload.newPassword}
                      onChangeText={(value: string) => setEditPayload({...editPayload, newPassword: value})}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowPassword(!showPassword)}>
                      <Icon.Font type={Icon.T.Feather}  name={!showPassword ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
                    </MyTouchableOpacity>
                  </View>
                  <Text style={styles.title}>确认新密码：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      placeholder="确认会员中心新密码"
                      style={styles.inputText}
                      value={editPayload.confirmPassword}
                      onChangeText={(value: string) => setEditPayload({...editPayload, confirmPassword: value})}
                      type={showConfirmPass ? 'text' : 'password'}
                    />
                    <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowConfirmPass(!showConfirmPass)}>
                      <Icon.Font type={Icon.T.Feather}  name={!showConfirmPass ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
                    </MyTouchableOpacity>
                  </View>
                </View>
              }
              {
                showEdit === 'mt4-pass' &&
                <View style={styles.editCurrent}>
                  <Text style={styles.title}>新密码：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      placeholder="请输入MT4新密码"
                      style={styles.inputText}
                      value={editPayload.newPassword}
                      onChangeText={(value: string) => setEditPayload({...editPayload, newPassword: value})}
                      type={showPassword ? 'text' : 'password'}
                    />
                    <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowPassword(!showPassword)}>
                      <Icon.Font type={Icon.T.Feather}  name={!showPassword ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
                    </MyTouchableOpacity>
                  </View>
                  <Text style={styles.title}>确认新密码：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      placeholder="确认MT4新密码"
                      style={styles.inputText}
                      value={editPayload.confirmPassword}
                      onChangeText={(value: string) => setEditPayload({...editPayload, confirmPassword: value})}
                      type={showConfirmPass ? 'text' : 'password'}
                    />
                    <MyTouchableOpacity style={{marginLeft: 'auto'}} onPress={() => setShowConfirmPass(!showConfirmPass)}>
                      <Icon.Font type={Icon.T.Feather}  name={!showConfirmPass ? 'eye' : 'eye-off'} size={GS.mixin.rem(20)} color="#94938F" />
                    </MyTouchableOpacity>
                  </View>
                  <Text style={styles.title}>短信验证码：</Text>
                  <View style={styles.input} >
                    <Input
                      autoComplete="off"
                      value={editPayload.authCode}
                      placeholder="请输入短信验证码"
                      keyboardType='numeric'
                      onChangeText={(value: string) => setEditPayload({...editPayload, authCode: value})}
                      style={{...styles.inputText, width: GS.mixin.rem(200), marginLeft: GS.mixin.rem(6)} }
                      myRef={textInputRef}
                    />
                    <MyTouchableOpacity style={styles.validateCode} onPress={() => getMT4ValidateCode()}>
                      <Text style={{fontSize: GS.mixin.rem(10), color: '#2A2A2A'}}>
                        { countDown > 0 ? `${countDown}秒后重试` : '获取验证码' }
                      </Text>
                    </MyTouchableOpacity>
                  </View>
                </View>
              }
            </PopupContent>
            <PopupActions>
              <PopupActionBtn text="提交修改" action={handleSubmitEdit} />
            </PopupActions>
          </Popup>
        }
      </ScrollView>
    </>
  )

}

const Title: any = {
  'nickname': '修改昵称',
  'email': '修改邮箱',
  'address': '修改地址',
  'pass': '修改会员中心密码',
  'mt4-pass': '重设MT4密码'
}

const Avatar: any = {
  [1]: require('./i/avatar/user1.png'),
  [2]: require('./i/avatar/user2.png'),
  [3]: require('./i/avatar/user3.png'),
  [4]: require('./i/avatar/user4.png'),
  [5]: require('./i/avatar/user5.png'),
  [6]: require('./i/avatar/user6.png'),
  [7]: require('./i/avatar/user7.png'),
  [8]: require('./i/avatar/user8.png'),
  [9]: require('./i/avatar/user9.png'),
  [10]: require('./i/avatar/user10.png'),
  [11]: require('./i/avatar/user11.png'),
  [12]: require('./i/avatar/user12.png'),
  [13]: require('./i/avatar/user13.png'),
  [14]: require('./i/avatar/user14.png'),
  [15]: require('./i/avatar/user15.png'),
  [16]: require('./i/avatar/user16.png'),
  [17]: require('./i/avatar/user17.png'),
  [18]: require('./i/avatar/user18.png'),
  [19]: require('./i/avatar/user19.png'),
  [20]: require('./i/avatar/user20.png'),
  [21]: require('./i/avatar/user21.png'),
  [22]: require('./i/avatar/user22.png'),
  [23]: require('./i/avatar/user23.png'),
  [24]: require('./i/avatar/user24.png'),
  [25]: require('./i/avatar/user25.png'),
  [26]: require('./i/avatar/user26.png'),
  [27]: require('./i/avatar/user27.png'),
  [28]: require('./i/avatar/user28.png'),
  [29]: require('./i/avatar/user29.png'),
  [30]: require('./i/avatar/user30.png'),
  [31]: require('./i/avatar/user31.png'),
  [32]: require('./i/avatar/user32.png'),
  [33]: require('./i/avatar/user33.png'),
  [34]: require('./i/avatar/user34.png'),
  [35]: require('./i/avatar/user35.png'),
  [36]: require('./i/avatar/user36.png'),
  [37]: require('./i/avatar/user37.png'),
  [38]: require('./i/avatar/user38.png'),
  [39]: require('./i/avatar/user39.png'),
  [40]: require('./i/avatar/user40.png')
}