/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-22 21:41:19
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /MC_RN/index.js
 * @Description:
 */
/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from '@views/mc/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
