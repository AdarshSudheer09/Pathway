#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE (LocalLLMBridge, NSObject)

RCT_EXTERN_METHOD(generateResponse : (NSString *)prompt resolver : (
    RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject)

@end