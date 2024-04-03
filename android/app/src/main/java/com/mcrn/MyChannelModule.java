package com.mcrn;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.tencent.vasdolly.helper.ChannelReaderUtil;
import android.app.Application.ActivityLifecycleCallbacks;
import org.wonday.orientation.OrientationPackage;
import org.wonday.orientation.OrientationActivityLifecycle;

public class MyChannelModule extends ReactContextBaseJavaModule implements ActivityLifecycleCallbacks {

    private static final String TAG = "MyChannelModule";

    // 构造函数
    public MyChannelModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // 返回模块名，用于在 JavaScript 中引用
    @NonNull
    @Override
    public String getName() {
        return "MyChannelModule";
    }

    // 创建一个方法来暴露原生变量
    @ReactMethod
    public void getChannels(Callback callback) {
        this.registerActivityLifecycleCallbacks(OrientationActivityLifecycle.getInstance());
        String channel = ChannelReaderUtil.getChannel(this.getReactApplicationContext());
        callback.invoke(channel);
    }

    @Override
    public void onActivityDestroyed(Activity activity) {
        // 如果需要在 Activity 销毁时执行一些操作，可以在此处编写相关逻辑
    }

}
