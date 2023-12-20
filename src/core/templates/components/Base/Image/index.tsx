/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-23 02:29:53
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/Base/Image/index.tsx
 * @Description: 
 */
// import AutoHeightImage from 'react-native-auto-height-image';

// export default AutoHeightImage;

import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { Image } from 'react-native';
import store from '@helpers/storage';

interface IProps extends FastImageProps{
  width: number,
  source: any,
  style?: any
}
export default ({ width, source, style = {}, ...props }: IProps) => {

  const [height, setHeight] = React.useState<number>();

  React.useEffect(() => {
    if(store.get('IMAGE-AUTO-SIZE-CACHE') && store.get('IMAGE-AUTO-SIZE-CACHE')[source.uri]){
      setHeight(store.get('IMAGE-AUTO-SIZE-CACHE')[source.uri]);
      return;
    }
    Image.getSize(source.uri, (w, h) => {
      const rate = width / w;
      setHeight(h * rate);
      var cache = store.get('IMAGE-AUTO-SIZE-CACHE') || {};
      cache = {...cache, [source.uri]: h * rate};
      store.set('IMAGE-AUTO-SIZE-CACHE', cache);
    })
  }, [])

  if(!height){
    return <></>
  }

  return (
    <FastImage 
      {...props}
      source={source}
      style={{...style, width, height}}
    />
  )

}