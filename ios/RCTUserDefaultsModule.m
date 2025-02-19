//
//  RCTUserDefaultsModule.m
//  onmyown
//
//  Created by jejemerong on 2/18/25.
//
#import "RCTUserDefaultsModule.h"

@implementation RCTUserDefaultsModule

RCT_EXPORT_MODULE(UserDefaultsModule);

// 데이터 저장
RCT_EXPORT_METHOD(setItem:(NSString *)key value:(NSString *)value resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
      [[[NSUserDefaults alloc] initWithSuiteName:@"group.org.reactjs.native.example.onmyown.Share"] setObject:value forKey:key];
        [[NSUserDefaults standardUserDefaults] synchronize];
        resolve(@YES);
    }
    @catch (NSException *exception) {
        reject(@"userdefaults_set_error", @"Error saving data to UserDefaults", nil);
    }
}

// 데이터 가져오기
RCT_EXPORT_METHOD(getItem:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *value = [[[NSUserDefaults alloc] initWithSuiteName:@"group.org.reactjs.native.example.onmyown.Share"] stringForKey:key];
    if (value) {
        resolve(value);
    } else {
        reject(@"userdefaults_get_error", @"Key not found", nil);
    }
}

// 데이터 삭제
RCT_EXPORT_METHOD(removeItem:(NSString *)key resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    @try {
      [[[NSUserDefaults alloc] initWithSuiteName:@"group.org.reactjs.native.example.onmyown.Share"] removeObjectForKey:key];
        [[NSUserDefaults standardUserDefaults] synchronize];
        resolve(@YES);
    }
    @catch (NSException *exception) {
        reject(@"userdefaults_remove_error", @"Error removing data from UserDefaults", nil);
    }
}

@end
