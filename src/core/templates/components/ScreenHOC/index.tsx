/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-10 18:06:15
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/ScreenHOC/index.tsx
 * @Description: 这是包裹页面的一个HOC，主要是封装一些页面所必要的机制
 * 注意！此HOC只包一层screen组件，也就是说当某个页面是二级导航时，按实际情况选择在APP 导航或者二级导航仍选其一进行绑定即可，切勿重复绑定
 */
import React from 'react';
import useLogout from '@hooks/useLogout';
import ErrorScreen from '@views/mc/shadow/Error';

export default (WrappedComponent: any) => {

  return () => {
    return (
      <NavigatorHandler>
        <WrappedComponent />
      </NavigatorHandler>
    )
  }

}

// 导航器
const NavigatorHandler = ({ children }: any) => {

  useLogout();

  return (
    <ErrorHandler>
      { children }
    </ErrorHandler>
  )

}

// 异常捕获器
class ErrorHandler extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any) {
    this.setState({ hasError: error })
  }

  render() {
    if ((this.state as any).hasError) {
      return <ErrorScreen log={(this.state as any).hasError} />
    }
    return (this.props as any).children
  }
}