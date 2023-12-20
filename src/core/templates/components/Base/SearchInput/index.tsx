/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2023-05-18 23:38:25
 * @LastEditors: circle && [circle@xyzzdev.com]
 * @FilePath: /NativeAS/src/core/templates/components/Base/SearchInput/index.tsx
 * @Description: 带搜索功能的输入框
 */
import _ from 'lodash';
import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Input, { InputIprops } from '@ui-base/Input';
import Popup from '@views/mc/shadow/Popup'
import Icon from '@icon/index';
import GS from '@views/mc/styles/index';

interface IProps extends InputIprops{
  title: string,
  value: string,
  cb: (value: string) => void,
  placeholder?: string,
  options: Array<{key: string, value: string}>
}
export default ({ placeholder, options, value, cb, title, ...props }: IProps) => {

  const [showSelector, setShowSelector] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(value);
  const [displayValue, setDisplayValue] = React.useState(value);

  const getFilteredOptions = () => {
    const data = _.filter(options, (item) => {
      return _.includes(item.value, searchValue)
    })
    if(data.length === 0) {
      return [{key: '', value: '无匹配项'}]
    }
    return data;
  }

  React.useEffect(() => {
    if(showSelector) {
      setSearchValue('')
    }
  }, [showSelector])

  const handleSelected = (key: any) => {
    if(key === '') {
      setDisplayValue('');
      return;
    }
    setDisplayValue(_.find(options, {key}).value);
    cb(key);
    setShowSelector(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.overlay} onPress={() => setShowSelector(true)} />
      <Input
        {...props}
        value={displayValue}
        placeholder={placeholder}
        RightNode={<Icon.Font type={Icon.T.AntDesign} name='down' size={16} onPress={() => setShowSelector(true)} />}
        editable={false}
      />
      {
        showSelector &&
        <Popup title={placeholder} wrapperType="View" close={() => setShowSelector(false)}  isFull display>
          <View style={styles.popupSearchView}>
            <Input
              LeftNode={<Icon.Font type={Icon.T.AntDesign} name="search1" size={16} />}
              placeholder="请输入关键字"
              autoFocus={true}
              onChange={(value: string) => setSearchValue(value)}
            />
          </View>
          <View style={{flex: 1, padding: GS.mixin.rem(10)}}>
            <FlatList
              data={getFilteredOptions()}
              keyExtractor={(item) => item.key}
              renderItem={({item}) => (
                <TouchableOpacity style={styles.popupBankItem} onPress={() => handleSelected(item.key)}>
                  <Text style={styles.popupBankItemText}>{item.value}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Popup>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: GS.mixin.rem(30),
    width: '100%',
    flexDirection: 'row',
  },
  selector: {
    position: 'absolute',
    top: GS.mixin.rem(30),
    left: 0,
    width: '100%',
    maxHeight: 100,
    height: 100,
    zIndex: 10,
    backgroundColor: 'red'
  },
  selectorItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    width: '100%',
    height: GS.mixin.rem(30),
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectorItemText: {
    fontSize: GS.mixin.rem(12),
  },
  popupSearchView: {
    paddingLeft: GS.mixin.rem(10),
    paddingRight: GS.mixin.rem(10),
    marginTop: GS.mixin.rem(10),
    height: GS.mixin.rem(30),
    justifyContent: 'center',
  },
  popupBankItem: {
    height: GS.mixin.rem(30),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: GS.var.colors.gray[200],
    borderBottomWidth: 1
  },
  popupBankItemText: {
    fontSize: GS.mixin.rem(14),
    color: GS.var.colors.gray[600],
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  }
})