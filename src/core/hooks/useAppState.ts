/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2024-04-24 15:22:56
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/src/core/hooks/useAppState.ts
 * @Description:
 */
import React from 'react';
import { AppState } from 'react-native';

export default () => {

  const [appState, setAppState] = React.useState(AppState.currentState);

  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppState(nextAppState);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {

  }, [])

  return {
    appState
  }

}