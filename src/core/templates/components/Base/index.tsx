/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-31 14:49:07
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /NativeAS/src/core/templates/components/Base/index.tsx
 * @Description: 基础组件导出(该文件不支持使用CLI工具创建影子组件，如需特殊处理，请手动创建)
 */

/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-01 14:52:04
 * @description: 布局VIEW
 * @return {*}
 */
import Center from '@views/mc/shadow/Base/Center';
import Div from '@views/mc/shadow/Base/Div';
import SpaceBetween from '@views/mc/shadow/Base/SpaceBetween';
export const Layout = {
  Center,
  FlexRow: Div,
  SpaceBetween
};


/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-01 14:52:25
 * @description: CheckBox
 * @return {*}
 */
import _CheckBox from '@views/mc/shadow/Base/CheckBox';
export const CheckBox = _CheckBox;


/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-01 18:54:15
 * @description: 输入框
 * @return {*}
 */
import _Input from '@views/mc/shadow/Base/Input';
export const Input = _Input;


/**
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-08-10 19:37:59
 * @description: Button
 * @return {*}
 */
 import _Button from '@views/mc/shadow/Base/Button';
 export const Button = _Button;

 /**
  * @Author: ammo@xyzzdev.com
  * @Date: 2022-08-23 02:30:46
  * @description: 自适应高度图片
  * @return {*}
  */
import _Image from '@views/mc/shadow/Base/Image';
export const Image = _Image;


import _Text from '@views/mc/shadow/Base/Text';
export const MyText = _Text;