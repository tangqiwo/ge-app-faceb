#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>

static NSString *appKey = @"8723a40ef17cfdacafda5e78";
static NSString *channel = @"developer-default";
static BOOL isProduction = FALSE;


@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end


