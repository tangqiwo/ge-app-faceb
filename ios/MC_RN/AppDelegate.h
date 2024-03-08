/*
 * @Author: Galen.GE
 * @Date: 2024-03-07 09:59:42
 * @LastEditors: Galen.GE
 * @FilePath: /app_face_b/ios/MC_RN/AppDelegate.h
 * @Description:
 */
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

static NSString *appKey = @"8723a40ef17cfdacafda5e78";
static NSString *channel = @"developer-default";
static BOOL isProduction = TRUE;


@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end


