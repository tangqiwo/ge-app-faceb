package com.baidu.appwalle;

import java.io.File;
import java.net.URLDecoder;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.os.Build;
import android.text.TextUtils;
import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

/**
 * 封装读取逻辑
 */
public final class ChannelReader {
    private ChannelReader() {
    }

    /**
     * 读取注入的内容
     * @param context
     * @return
     */
    public static String get(@NonNull Context context) {
        String apkPath = getApkPath(context);
        String raw = TextUtils.isEmpty(apkPath) ? null : getRaw(new File(apkPath));
        if (!TextUtils.isEmpty(raw)) {
            raw = raw.replaceAll("\"", "");
            raw = raw.replaceAll("#", "");
        }

        try {
            if (TextUtils.isEmpty(raw)) {
                return "";
            }
            return new String(Base64.decode(raw.getBytes(), Base64.NO_WRAP));
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public static String getApkPath(@NonNull Context context) {
        String apkPath = null;
        try {
            ApplicationInfo applicationInfo = context.getApplicationInfo();
            if (applicationInfo == null) {
                return null;
            }
            apkPath = applicationInfo.sourceDir;
        } catch (Exception var3) {
            Log.d("异常", var3.getMessage());
        }
        return apkPath;
    }

    public static String getRaw(File apkFile) {
        return PayloadReader.getString(apkFile, 1896449981);
    }
}