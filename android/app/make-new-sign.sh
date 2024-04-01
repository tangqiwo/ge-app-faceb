#!/bin/bash

# 设置密钥库文件名、别名和密码
KEYSTORE_FILE="mc-release-key.keystore"
ALIAS_NAME="mc-release-alias"
STORE_PASSWORD="UsWspc2HB1QatYtD"
KEY_PASSWORD="UsWspc2HB1QatYtD"

keytool -delete -alias mc-release-alias -keystore mc-release-key.keystore -storepass UsWspc2HB1QatYtD

# 使用 keytool 生成密钥库
keytool -genkeypair -v \
        -keystore $KEYSTORE_FILE \
        -alias $ALIAS_NAME \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -storepass $STORE_PASSWORD \
        -keypass $KEY_PASSWORD \
        -dname "CN=MC, OU=GE, O=TIM, L=MACO, S=MA, C=CHINA"

echo "Keystore $KEYSTORE_FILE generated successfully."
