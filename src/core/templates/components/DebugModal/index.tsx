/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-15 17:23:49
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/DebugModal/index.tsx
 * @Description: 调试弹窗
 */
import _ from 'lodash';
import React from 'react';
import moment from 'moment';
import { StyleSheet, View, ScrollView, Switch, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MyText } from '@ui-base/index';
import BackgroundView from '@views/mc/shadow/BackgroundView';
import Icon from '@icon/index';
import Input from '@ui-base/Input';
import Button from '@ui-base/Button';
import useDebugMode from '@core/hooks/useDebugMode';
import Popup, { PopupContent } from '@views/mc/shadow/Popup';
import DataAnalyzer from './DataAnalyzer';
import Webview from '@views/mc/shadow/WebView'
import store from '@helpers/storage';
import GS from '@views/mc/styles/index';
import G from '@constants/global';
import configs from '@this/configs';

export default () => {

  const insets = useSafeAreaInsets();

  const {
    saveSettings,
    api,
    setApi,
    enableRequestLog,
    errorRequestOnly,
    setEnableRequestLog,
    setErrorRequestOnly,
    protocol,
    setProtocol
  } = useDebugMode();

  const [showRequestRecord, setShowRequestRecord] = React.useState(false);
  const [showNetworkRecord, setShowNetworkRecord] = React.useState(false);
  const [showExceptionRecord, setShowExceptionRecord] = React.useState(false);
  const [showCache, setShowCache] = React.useState(false);
  const [requestRecord, setRequestRecord] = React.useState([]);
const [networkRecord, setNetworkRecord] = React.useState([]);
  const [recentlyRequest, setRecentlyRequest] = React.useState([]);
  const [speedTestRecord, setSpeedTestRecord] = React.useState([]);
  const [crashRecord, setCrashRecord] = React.useState([]);
  const [exception, setException] = React.useState([]);
  const [showDetail, setShowDetail] = React.useState();
  const [showUserDebug, setShowUserDebug] = React.useState(false);
  const [showRecentlyRequest, setShowRecentlyRequest] = React.useState(false);
  const [showSpeedTestRecrod, setShowSpeedTestRecord] = React.useState(false);
  const [showWebviewVersion, setShowWebviewVersion] = React.useState(false);
  const [showCrashRecord, setShowCrashRecord] = React.useState(false);

  React.useEffect(() => {
    setRequestRecord((store.get('REQUEST-RECORD') || []).reverse());
    setNetworkRecord((store.get('NETWORK-RECORD') || []).reverse());
    setException((store.get('EXCEPTION') || []).reverse());
    setRecentlyRequest((store.get('RECENTLY-REQUEST') || []).reverse());
    setSpeedTestRecord((store.get('SPEED_TEST-RECORD') || []).reverse());
    setCrashRecord((store.get('CRASH-RECORD') || []).reverse());
  }, [])

  return (
    <BackgroundView style={GS.style.wrapper} source={require('@this/public/images/screen-background.png')} >
      <ScrollView style={{flex: 1, marginBottom: insets.bottom}}>
        <PopupContent>
          <Input
            placeholder='输入调试使用持久化 API 地址'
            value={api}
            onChange={(value: string) => setApi(value)}
            LeftNode={
              <>
                <Icon.Font style={style.icon} type={Icon.T.Ionicons} name="planet" />
                <TouchableOpacity onPress={() => setProtocol(protocol === 'https://' ? 'http://' : 'https://')}>
                  <Text style={GS.style.font14}>{protocol}</Text>
                </TouchableOpacity>
              </>
            }
          />
          <Text style={style.tips}>十分钟后自动失效，填空后保存后失效</Text>
          <View style={style.headerView}>
            <Text style={style.errorHeader}>保留接口日志</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setEnableRequestLog(!enableRequestLog)}
              value={enableRequestLog}
            />
          </View>
          <View style={style.headerView}>
            <Text style={style.errorHeader}>仅保留报错接口日志</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setErrorRequestOnly(!errorRequestOnly)}
              value={errorRequestOnly}
              disabled={!enableRequestLog}
            />
          </View>
          <Button
            text='保存DEBUG设定'
            style={{maxWidth: 200, width: 200, marginTop: 15, maxHeight: 36, marginLeft: 'auto', marginRight: 'auto', backgroundColor: GS.var.colors.green[600], borderColor: GS.var.colors.green[400]}}
            textStyle={{letterSpacing: 0, fontSize: 14}}
            action={saveSettings}
          />
          <View style={{marginTop: 15, borderBottomColor: GS.var.colors.gray[200], borderBottomWidth: 1}} />
          <View style={style.headerView}>
            <Text style={style.errorHeader}>解析特征码数据:</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowUserDebug(!showUserDebug)}
              value={showUserDebug}
            />
          </View>
          <Text style={style.errorHeader}>设备UUID:</Text>
          <MyText.Selectable style={{...style.text}}>{G.GET('UUID')}</MyText.Selectable>
          <Text style={style.errorHeader}>注册代理编号:</Text>
          <MyText.Selectable style={{...style.text}}>{store.get('AGENT-CODE')}</MyText.Selectable>
          <Text style={style.errorHeader}>当前API地址:</Text>
          <MyText.Selectable style={{...style.text}}>{configs.API}</MyText.Selectable>
          <Text style={style.errorHeader}>登录SESSION:</Text>
          <MyText.Selectable style={{...style.text}}>{store.get('COOKIE-SESSION') || '未登录'}</MyText.Selectable>
          <Text style={style.errorHeader}>登录TOKEN:</Text>
          <MyText.Selectable style={{...style.text}}>{store.get('AUTH') || '未登录'}</MyText.Selectable>
          <View style={style.headerView}>
            <Text style={style.errorHeader}>最近100次测速:</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowSpeedTestRecord(!showSpeedTestRecrod)}
              value={showSpeedTestRecrod}
            />
          </View>
          {
            showSpeedTestRecrod &&
            speedTestRecord.map((item: any, index:number) =>
              <View key={index} style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: GS.var.colors.gray[200]}}>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>{item.date}</Text>
                <Text style={{...style.errorMessage, color: GS.var.colors.red[500]}}>Domain: {item.data.domain}</Text>
                <Text style={{...style.errorMessage}}>Status: {item.data.status}</Text>
                <Text style={{...style.errorMessage}}>Delay: {item.data.delay || '30s超时'}</Text>
              </View>
            )
          }
          <View style={style.headerView}>
            <Text style={style.errorHeader}>最近20次请求:</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowRecentlyRequest(!showRecentlyRequest)}
              value={showRecentlyRequest}
            />
          </View>
          {
            showRecentlyRequest &&
            recentlyRequest.map((item: any, index:number) =>
              <View key={index} style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: GS.var.colors.gray[200]}}>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>{item.date}</Text>
                <TouchableOpacity onPress={() => setShowDetail(JSON.parse(item.res))}>
                  <MyText.Selectable style={{...style.errorMessage, color: GS.var.colors.red[500], fontWeight: '600'}}>{item.uri}</MyText.Selectable>
                </TouchableOpacity>
                <Text style={{...style.errorMessage, color: GS.var.colors.red[500]}}>BODY:</Text>
                <Text style={style.errorMessage}>{item.data}</Text>
                <Text style={{...style.errorMessage, color: GS.var.colors.red[500]}}>RESPONSE:</Text>
                <ScrollView style={{maxHeight: 100}}>
                  <MyText.Selectable style={style.errorMessage}>{JSON.stringify(JSON.parse(item.res), null, 4)}</MyText.Selectable>
                </ScrollView>
              </View>
            )
          }
          <View style={style.headerView}>
            <Text style={style.errorHeader}>调试请求日志:</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowRequestRecord(!showRequestRecord)}
              value={showRequestRecord}
            />
          </View>
          {
            showRequestRecord &&
            requestRecord.map((item: any, index:number) =>
              <View key={index} style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: GS.var.colors.gray[200]}}>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>{item.date}</Text>
                <TouchableOpacity onPress={() => setShowDetail(JSON.parse(item.res))}>
                  <MyText.Selectable style={{...style.errorMessage, color: GS.var.colors.red[500], fontWeight: '600'}}>{item.uri}</MyText.Selectable>
                </TouchableOpacity>
                <Text style={{...style.errorMessage, color: GS.var.colors.red[500]}}>BODY:</Text>
                <Text style={style.errorMessage}>{item.data}</Text>
                <Text style={{...style.errorMessage, color: GS.var.colors.red[500]}}>RESPONSE:</Text>
                <ScrollView style={{maxHeight: 100}}>
                  <MyText.Selectable style={style.errorMessage}>{JSON.stringify(JSON.parse(item.res), null, 4)}</MyText.Selectable>
                </ScrollView>
              </View>
            )
          }
          <View style={style.headerView}>
            <Text style={style.errorHeader}>网络异常:</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowNetworkRecord(!showNetworkRecord)}
              value={showNetworkRecord}
            />
          </View>
          {
            showNetworkRecord &&
            networkRecord.map((item: any, index:number) =>
              <View key={index} style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: GS.var.colors.gray[200]}}>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>{item.date}</Text>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>{item.key}</Text>
                <Text style={style.errorMessage}>{item.msg}</Text>
              </View>
            )
          }
          <View style={style.headerView}>
            <Text style={style.errorHeader}>程序异常:</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowExceptionRecord(!showExceptionRecord)}
              value={showExceptionRecord}
            />
          </View>
          {
            showExceptionRecord &&
            exception.map((item: any, index:number) =>
              <View key={index} style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: GS.var.colors.gray[200]}}>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>{item.date}</Text>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>{`${item.key}（${item.type}）`}</Text>
                <MyText.Selectable style={style.errorMessage}>{item.msg}</MyText.Selectable>
              </View>
            )
          }
          <View style={style.headerView}>
            <Text style={style.errorHeader}>程序崩溃:</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowCrashRecord(!showCrashRecord)}
              value={showCrashRecord}
            />
          </View>
          {
            showCrashRecord &&
            crashRecord.map((item: any, index:number) =>
              <View key={index} style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: GS.var.colors.gray[200]}}>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>{item.date}</Text>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5}}>TYPE: {item.type}</Text>
                <MyText.Selectable style={style.errorMessage}>{item.error}</MyText.Selectable>
              </View>
            )
          }
          <View style={style.headerView}>
            <Text style={style.errorHeader}>本地缓存:</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowCache(!showCache)}
              value={showCache}
            />
          </View>
          {
            showCache &&
            _.map(G.GET('STORE_KEY'), (item, key) => ({key, ...item})).map((item: any, index: number) =>
              <View key={index} style={{paddingBottom: 10, borderBottomWidth: 1, borderColor: GS.var.colors.gray[200]}}>
                <TouchableOpacity onPress={() => setShowDetail(item.data)}>
                  <MyText.Selectable style={{...style.text, marginTop: 5, marginBottom: 5, color: GS.var.colors.red[500]}}>KEY: {item.key}</MyText.Selectable>
                </TouchableOpacity>
                <Text style={{...style.text, marginTop: 5, marginBottom: 5, color: GS.var.colors.red[500]}}>过期时间：{moment(item.expires).format('YYYY-MM-DD HH:mm:ss')}</Text>
                <ScrollView style={{maxHeight: 100}}>
                  <MyText.Selectable style={style.errorMessage}>{JSON.stringify(item.data, null, 4)}</MyText.Selectable>
                </ScrollView>
              </View>
            )
          }
          <View style={style.headerView}>
            <Text style={style.errorHeader}>WebView内核</Text>
            <Switch
              trackColor={{ false: "#767577" }}
              onChange={() => setShowWebviewVersion(!showWebviewVersion)}
              value={showWebviewVersion}
            />
          </View>
        </PopupContent>
      </ScrollView>
      <Popup display={showDetail} title='内容详情' top={100} close={() => setShowDetail(null)}>
        <PopupContent>
          <MyText.Selectable style={style.text}>
            { JSON.stringify(showDetail, null, 4) }
          </MyText.Selectable>
        </PopupContent>
      </Popup>
      <Popup display={showWebviewVersion} title="WebView 内核版本" close={() => setShowWebviewVersion(false)} isFull>
        <PopupContent isFull>
          <Webview source={{uri: 'https://ie.icoa.cn/'}} />
        </PopupContent>
      </Popup>
      {
        showUserDebug && <DataAnalyzer close={() => setShowUserDebug(false)} />
      }
    </BackgroundView>
  )

}


const style = StyleSheet.create({
  text: {
    fontSize: 12,
    color: GS.var.colors.primary[600],
    marginTop: 10,
  },
  tips: {
    fontSize: 12,
    color: GS.var.colors.red[500],
    marginTop: 5
  },
  icon: {
    fontSize: 14,
    color: GS.var.colors.secondary[500],
    marginRight: 5,
    marginLeft: 5
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  errorHeader: {
    fontSize: 16,
    marginTop: 20,
    color: GS.var.colors.orange[500]
  },
  errorMessage: {
    fontSize: 12,
    color: GS.var.colors.primary[600],
    marginTop: 5
  }
})