import Foundation
import FoundationModels

@objc(LocalLLMBridge)
public class LocalLLMBridge: NSObject { // <--- Added "public"

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(generateResponse:resolver:rejecter:)
  func generateResponse(_ prompt: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    
    // Check system availability
    guard SystemLanguageModel.default.availability == .available else {
        reject("no_model", "Apple Intelligence is not available on this device", nil)
        return
    }

    Task {
      do {
        // Create session
        let session = try await LanguageModelSession()
        
        // Generate response
        let response = try await session.respond(to: prompt)
        
        // Return content
        resolve(response.content)
      } catch {
        reject("model_error", error.localizedDescription, error)
      }
    }
  }
}

