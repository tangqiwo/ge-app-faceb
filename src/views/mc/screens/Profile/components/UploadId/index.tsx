/*
 * @Author: Galen.GE
 * @Date: 2024-01-30 12:02:09
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/screens/Profile/components/uploadId/index.tsx
 * @Description:
 */
import {launchImageLibrary} from 'react-native-image-picker';
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import useUploadOss from '@core/hooks/useUploadOss';
import MyTouchableOpacity from '@core/templates/components/MyTouchableOpacity';
import Button from '@this/components/Button';
import { LS as styles, GS } from './style';

export default () => {

  const { uploadOss } = useUploadOss();

  const [fontImage, setFontImage] = React.useState(null);
  const [backImage, setBackImage] = React.useState(null);

  const selectImage = async (type: 'font_id' | 'back_id') => {
    const options: any = {
    };
    const result = await launchImageLibrary(options);
    uploadOss(result.assets[0], type, (path: string) => {
      if(type === 'font_id'){
        setFontImage({...result.assets[0], path})
      }else{
        setBackImage({...result.assets[0], path})
      }
    })
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>补充资料</Text>
      <Text style={styles.desc}>补充提交资料以完成身份证绑定资料</Text>
      <View style={styles.imageBox}>
        {
          fontImage ? <Image style={styles.image} source={{uri: fontImage.uri}} resizeMode='contain' /> :
                      <MyTouchableOpacity onPress={() => selectImage('font_id')}>
                        <Image style={styles.image} source={require('./i/identity-front.png')} resizeMode='contain' />
                      </MyTouchableOpacity>
        }
        {
          backImage ? <Image style={styles.image} source={{uri: backImage.uri}} resizeMode='contain' /> :
                      <MyTouchableOpacity onPress={() => selectImage('back_id')}>
                        <Image style={styles.image} source={require('./i/identity-back.png')} resizeMode='contain' />
                      </MyTouchableOpacity>
        }
        <Image style={styles.demo} source={require('./i/identity-demo.png')} resizeMode='contain' />
      </View>
      <Button
        text='立即提交'
        style={styles.button}
      />
    </ScrollView>
  )

}