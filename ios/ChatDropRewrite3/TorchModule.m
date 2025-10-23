#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TorchModule, NSObject)

RCT_EXTERN_METHOD(switchState:(BOOL)state)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

@end

