/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-28 16:21:27
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /git-data/NativeAS/src/core/templates/components/Icon/index.tsx
 * @Description: ICON 字体整合
 */
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export const T = {
  AntDesign                 : 'AntDesign',
  Entypo                    : 'Entypo',
  Evillcons                 : 'Evillcons',
  Feather                   : 'Feather',
  FontAwesome               : 'FontAwesome',
  FontAwesome5              : 'FontAwesome5',
  Fontisto                  : 'Fontisto',
  Foundation                : 'Foundation',
  Ionicons                  : 'Ionicons',
  MaterialCommunityIcons    : 'MaterialCommunityIcons',
  MaterialIcons             : 'MaterialIcons',
  Octicons                  : 'Octicons',
  SimpleLineIcons           : 'SimpleLineIcons'
}

interface IProps{
  type: string,
  name: string,
  size?: number,
  style?: any,
  color?: string,
  onPress?: () => void,
  [key: string]: any
}
export const Font = ({ type, name, onPress, ...props }: IProps) => {

  const getFontByType = () => {
    switch(type){
      case T.AntDesign                : return (<AntDesign name={name} {...props} />);
      case T.Entypo                   : return (<Entypo name={name} {...props} />);
      case T.Evillcons                : return (<Evillcons name={name} {...props} />);
      case T.Feather                  : return (<Feather name={name} {...props} />);
      case T.FontAwesome              : return (<FontAwesome name={name} {...props} />);
      case T.FontAwesome5             : return (<FontAwesome5 name={name} {...props} />);
      case T.Fontisto                 : return (<Fontisto name={name} {...props} />);
      case T.Foundation               : return (<Foundation name={name} {...props} />);
      case T.Ionicons                 : return (<Ionicons name={name} {...props} />);
      case T.MaterialCommunityIcons   : return (<MaterialCommunityIcons name={name} {...props} />);
      case T.MaterialIcons            : return (<MaterialIcons name={name} {...props} />);
      case T.Octicons                 : return (<Octicons name={name} {...props} />);
      case T.SimpleLineIcons          : return (<SimpleLineIcons name={name} {...props} />);
      default                         : return (<FontAwesome name={name} {...props} />);
    }
  }

  var F: any = getFontByType();

  if(!onPress) return F;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      { F }
    </TouchableWithoutFeedback>
  )

}

export default { T, Font };