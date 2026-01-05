import UIKit

@UIApplicationMain
class AppDelegate: NSObject, UIApplicationDelegate, RCTBridgeDelegate {
  var window: UIWindow?
  var bridge: RCTBridge!

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    
    bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
    let rootView = RCTRootView(bridge: bridge!, moduleName: "PATHWAY", initialProperties: nil)
    
    if #available(iOS 13.0, *) {
      rootView.backgroundColor = UIColor.systemBackground
    } else {
      rootView.backgroundColor = UIColor.white
    }
    
    window = UIWindow(frame: UIScreen.main.bounds)
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    window?.rootViewController = rootViewController
    window?.makeKeyAndVisible()
    
    return true
  }
  
  func sourceURL(for bridge: RCTBridge) -> URL? {
    #if DEBUG
    let metroHost = ProcessInfo.processInfo.environment["RCT_METRO_HOST"] ?? "10.168.168.177"
    let metroPort = ProcessInfo.processInfo.environment["RCT_METRO_PORT"] ?? "8081"
    let urlString = "http://\(metroHost):\(metroPort)/index.bundle?platform=ios&dev=true&minify=false"
    
    print("🔍 [React Native] Loading bundle from: \(urlString)")
    
    return URL(string: urlString) ?? RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
    #else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
    #endif
  }
}
