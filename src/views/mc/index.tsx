/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-22 16:16:53
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/src/views/mc/index.tsx
 * @Description: 应用主入口
 */
import APP from '@template/index';

// import * as Sentry from "@sentry/react-native";

// Sentry.init({
//   dsn: "https://36fb5a6a6202856c892dd98bc794ae1d@o4506782664294400.ingest.sentry.io/4506782678908928",
//   // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
//   // We recommend adjusting this value in production.
//   tracesSampleRate: 1.0,
// });

export default (() => {
  return APP;
})()