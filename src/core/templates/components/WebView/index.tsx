/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-09-09 13:21:10
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/templates/components/WebView/index.tsx
 * @Description: 自定义的一些 属性的webview
 */

import React from 'react';
import { WebView, WebViewProps } from 'react-native-webview';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import store from '@helpers/storage';
import usePostMessage from '@core/hooks/usePostMessage';
import INJECT_POST_MESSAGE from './postJsCode';
import LinearGradient from 'react-native-linear-gradient';
import { LS } from './style';
import usePublicState from '@core/hooks/usePublicState';

interface IProps extends WebViewProps {
  styleInject?: string,
  source: any,
  invoke?: string,
  style?: any
}
export default React.memo(({source, invoke='', styleInject='', style={}, ...props}: IProps) => {

  const { dispatch, ACTIONS } = usePublicState();
  const { onMessage } = usePostMessage();
  const [ showError, setShowError ] = React.useState<boolean>(false);
  const [ isLoad, setIsLoad ] = React.useState<boolean>(false);
  const token = store.get('AUTH');
  const webview = React.useRef<any>();

  React.useEffect(() => {
    dispatch(ACTIONS.BASE.openLoading());
    return () => {
      dispatch(ACTIONS.BASE.closeLoading());
    }
  }, [])

  React.useEffect(() => {
    if(isLoad){
      dispatch(ACTIONS.BASE.closeLoading());
    }
  }, [isLoad])

  // 执行 WebView 内的JS代码
  React.useEffect(() => {
    invoke && webview.current.injectJavaScript(invoke);
  }, [invoke])


  const handleError = (errorDomain: string | undefined, errorCode: number, errorDesc: string) => {
    setShowError(true)
    return <ErrorPage errorDomain={errorDomain} errorCode={errorCode} errorDesc={errorDesc} uri={source.uri} />
  }

  const newSource = {
    ...source,
    uri: source.uri + (source.uri.indexOf('?') > -1 ? '&' : '?') + 'token=' + token + '&Terminal=AppWebView'
  }

  return (
    <WebView
      ref={(ref: any) => webview.current = ref}
      style={{display: (showError || style.display === 'none') ? 'none' : 'flex', ...style}}
      onMessage={onMessage}
      renderError={handleError}
      source={{...newSource}}
      injectedJavaScript={INJECT_POST_MESSAGE + styleMaker(defaultStyleCover+styleInject)}
      allowsInlineMediaPlayback={true}
      mediaPlaybackRequiresUserAction={false}
      mixedContentMode={'compatibility'}
      allowsFullscreenVideo={true}
      onLoadEnd={() => setIsLoad(true)}
    />
  )
})


interface IErrorPage{
  errorDomain: string | undefined,
  errorCode: number,
  errorDesc: string,
  uri: string
}
export const ErrorPage = ({errorDomain, errorCode, errorDesc, uri}: IErrorPage) => {
  const style = LS.error;
  return (
    <View>
      <View style={style.content}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#D274FF', '#FF5E60']}
          style={style.contentBox}
        >
          <Image style={style.icon} source={require('./i/error-icon.png')} />
          <Text style={style.title}>Error Loading Page</Text>
          <Text style={style.errorText}>{errorDomain}</Text>
          <Text style={style.errorText}>Error Code:{errorCode}</Text>
          <Text style={style.errorText}>{errorDesc}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(uri)} style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10 }} >
            <Text style={style.errorLink}>{uri}</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}


// 注入样式
const styleMaker = (styles: string) => {
  return `(function(){
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'rn_inject'
    document.head.appendChild(style);
    document.querySelector('#rn_inject').innerHTML = "${styles}";
    localeStorage.setItem('locale', "zh-Hans")
  })()`
}


const defaultStyleCover = [

].join('');

