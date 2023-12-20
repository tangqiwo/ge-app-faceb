/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-12 01:04:13
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/views/mc/screens/Home/components/Banner/index.tsx
 * @Description: 动态BANNER图
 */
import React from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import useBanner from '@hooks/useBanner';
import useRouteWebCommon, { FORWARD_TYPES } from '@core/hooks/useRouteWebCommon';
import { GS, LS } from './style';


export default () => {

  const { banners, ossDomain } = useBanner();
  const [ activeSlide, setActiveSlide ] = React.useState(0);
  const { forward } = useRouteWebCommon();
  const { width } = Dimensions.get('window');

  return (
    <View style={LS.banner.box}>
      {
        (ossDomain && banners) ?
        <Carousel
          style={{width: '100%', height: GS.mixin.rem(211), backgroundColor: 'red'}}
          vertical={false}
          inactiveSlideScale={1}
          firstItem={0}
          loop
          autoplay
          sliderWidth={width}
          itemWidth={width}
          data={banners}
          onSnapToItem={(index) => setActiveSlide(index) }
          renderItem={({ item }: any) =>
            <TouchableWithoutFeedback onPress={() => forward({...FORWARD_TYPES['PROMOTIONS'], uri: item.link})}>
              <Image style={{width: '100%', height: GS.mixin.rem(211)}} source={{uri: `${ossDomain}${item.image}`}} />
            </TouchableWithoutFeedback>
          }
        /> :
        <Image source={require('./i/default.png')} style={LS.banner.image} />
      }
      {
        (ossDomain && banners) &&
        <MyPagination activeSlide={activeSlide} dotsLength={banners.length} />
      }
    </View>
  )
}

interface IEntry {
  activeSlide: number;
  dotsLength: number;
}
const MyPagination = ({ activeSlide, dotsLength }: IEntry) => {

  return(
    <Pagination
      dotsLength={dotsLength}
      activeDotIndex={activeSlide}
      containerStyle={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}
      dotStyle={{
        width: GS.mixin.rem(13),
        height: GS.mixin.rem(5),
        backgroundColor: '#FFC600'
      }}
      inactiveDotStyle={{
        width: GS.mixin.rem(5),
        height: GS.mixin.rem(5),
        borderRadius: GS.mixin.rem(5),
        marginHorizontal: 8,
        backgroundColor: 'white',
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  )
}