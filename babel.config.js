/*
 * @Author: ammo@xyzzdev.com
 * @Date: 2022-07-22 21:41:19
 * @LastEditors: ammo@xyzzdev.com
 * @FilePath: /app_face_b/babel.config.js
 * @Description:
 */

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    "react-native-reanimated/plugin",
    [
      "babel-plugin-root-import",
      {
        "paths": [
          {
            "rootPathSuffix": "./src/views/mc",
            "rootPathPrefix": "@this"
          },
          {
            "rootPathSuffix": "./src/core",
            "rootPathPrefix": "@core"
          },
          {
            "rootPathSuffix": "./src/views",
            "rootPathPrefix": "@views"
          },
          {
            "rootPathSuffix": "./src/core/templates",
            "rootPathPrefix": "@template"
          },
          {
            "rootPathSuffix": "./src/core/constants/configs",
            "rootPathPrefix": "@configs"
          },
          {
            "rootPathSuffix": "./src/core/helpers",
            "rootPathPrefix": "@helpers"
          },
          {
            "rootPathSuffix": "./src/core/constants",
            "rootPathPrefix": "@constants"
          },
          {
            "rootPathSuffix": "./src/core/actions",
            "rootPathPrefix": "@actions"
          },
          {
            "rootPathSuffix": "./src/core/schemas",
            "rootPathPrefix": "@schemas"
          },
          {
            "rootPathSuffix": "./src/core/hooks",
            "rootPathPrefix": "@hooks"
          },
          {
            "rootPathSuffix": "./src/views/mc",
            "rootPathPrefix": "@my"
          },
          {
            "rootPathSuffix": "./src/core/templates/components/Icon",
            "rootPathPrefix": "@icon"
          },
          {
            "rootPathSuffix": "./src/core/templates/components/Base",
            "rootPathPrefix": "@ui-base"
          }
        ]
      }
    ]
  ]
};
