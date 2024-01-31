/*
 * @Author: Galen.GE
 * @Date: 2024-01-30 12:02:09
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Profile/index.tsx
 * @Description:
 */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Enum from '@constants/enum';
import { useSelector } from 'react-redux';
import usePublicState from '@core/hooks/usePublicState';
import UploadId from './components/UploadId';
import { LS as styles, GS } from './style';

export default () => {

  const { navigation } = usePublicState();
  const registerProgressCode = useSelector((state: any) => state.user.registerProgress.code);

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

  if(registerProgressCode === Enum.user.ERegisterProgress.SUPPLEMENTARY_INFORMATION){
    return (<UploadId />)
  }

  return (
    <ScrollView style={styles.container}>

    </ScrollView>
  )

}