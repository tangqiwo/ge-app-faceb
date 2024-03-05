/*
 * @Author: Galen.GE
 * @Date: 2024-01-10 17:00:43
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/core/templates/components/CommonDatePicker/index.tsx
 * @Description:
 */
import { DatePicker } from "@yz1311/react-native-wheel-picker";
import React from 'react';

export default React.memo((...propps: any) => {

  return <DatePicker {...propps[0]} />

})