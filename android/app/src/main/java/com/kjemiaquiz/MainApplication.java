package com.kjemiaquiz;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.idehub.Billing.InAppBillingBridgePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import com.google.android.gms.ads.MobileAds;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new InAppBillingBridgePackage(),
            new SplashScreenReactPackage(),
            new RNAdMobPackage(),
            new PhotoViewPackage(),
            new RNSoundPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    MobileAds.initialize(this, "ca-app-pub-4545695212875309~8334321259");
  }
}
