import Foundation
import FoundationModels

@objc(LocalLLMBridge)
public class LocalLLMBridge: NSObject {

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc(generateResponse:resolver:rejecter:)
  func generateResponse(_ prompt: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    
    // Check system availability
    guard SystemLanguageModel.default.availability == .available else {
        // For devices without Apple Intelligence (pre-iPhone 15)
        // Use tier-based logic analysis
        DispatchQueue.global(qos: .userInitiated).async {
            let response = self.tierBasedAnalysis(prompt: prompt)
            // Simulate processing delay for realistic UX
            DispatchQueue.main.asyncAfter(deadline: .now() + 0.9) {
                resolve(response)
            }
        }
        return
    }

    Task {
      do {
        // Create session for iPhone 15+ with Apple Intelligence
        let session = try await LanguageModelSession()
        let response = try await session.respond(to: prompt)
        resolve(response.content)
      } catch {
        reject("model_error", error.localizedDescription, error)
      }
    }
  }
  
  // MARK: - Tier-Based Analysis (Fallback for older devices)
  
  private func tierBasedAnalysis(prompt: String) -> String {
    let promptLower = prompt.lowercased()
    
    // Determine type of analysis
    if promptLower.contains("college") && (promptLower.contains("chances") || promptLower.contains("admissions")) {
        return analyzeCollegeChances(prompt: prompt)
    } else if promptLower.contains("activity") || promptLower.contains("impact") || promptLower.contains("role") {
        return analyzeActivity(prompt: prompt)
    } else {
        // Generic fallback
        return "Analysis completed based on provided information."
    }
  }
  
  // MARK: - Activity Analysis Using Tier System
  
  private func analyzeActivity(prompt: String) -> String {
    // Extract activity details from prompt
    var position = ""
    var organization = ""
    var description = ""
    
    // Parse prompt for activity details
    let lines = prompt.components(separatedBy: "\n")
    for line in lines {
        let lower = line.lowercased()
        if lower.contains("position:") || lower.contains("role:") {
            position = line.replacingOccurrences(of: "position:", with: "", options: .caseInsensitive)
                          .replacingOccurrences(of: "role:", with: "", options: .caseInsensitive)
                          .trimmingCharacters(in: .whitespaces)
        } else if lower.contains("organization:") || lower.contains("club:") {
            organization = line.replacingOccurrences(of: "organization:", with: "", options: .caseInsensitive)
                              .replacingOccurrences(of: "club:", with: "", options: .caseInsensitive)
                              .trimmingCharacters(in: .whitespaces)
        } else if lower.contains("description:") {
            description = line.replacingOccurrences(of: "description:", with: "", options: .caseInsensitive)
                             .trimmingCharacters(in: .whitespaces)
        }
    }
    
    // If parsing failed, use entire prompt as description
    if description.isEmpty {
        description = prompt
    }
    
    // Use ActivityAnalyzer
    let result = ActivityAnalyzer.analyzeActivity(
        description: description,
        position: position,
        organization: organization
    )
    
    return """
    {
      "score": \(result.score),
      "rank_name": "\(result.rankName)",
      "rank_description": "\(result.description)",
      "brutal_feedback": "\(result.feedback)",
      "level_up_action": "\(result.levelUp)"
    }
    """
  }
  
  // MARK: - College Chances Analysis Using Mathematical Formula
  
  private func analyzeCollegeChances(prompt: String) -> String {
    let promptLower = prompt.lowercased()
    
    // Extract college name
    var collegeName = "university"
    let colleges = ["harvard", "stanford", "mit", "yale", "princeton", "columbia", "upenn", "duke", 
                   "brown", "northwestern", "caltech", "dartmouth", "cornell", "usc", "ucla", 
                   "berkeley", "georgetown", "cmu", "notre dame", "umich", "uva"]
    
    for college in colleges {
        if promptLower.contains(college) {
            collegeName = college
            break
        }
    }
    
    // Extract GPA
    var gpa = 3.5
    if let gpaRange = promptLower.range(of: "gpa:?\\s*([0-9.]+)", options: .regularExpression) {
        let gpaStr = String(promptLower[gpaRange])
            .replacingOccurrences(of: "gpa:", with: "")
            .trimmingCharacters(in: .whitespaces)
        gpa = Double(gpaStr) ?? 3.5
    }
    
    // Extract SAT
    var sat = 1300
    if let satRange = promptLower.range(of: "sat:?\\s*([0-9]+)", options: .regularExpression) {
        let satStr = String(promptLower[satRange])
            .replacingOccurrences(of: "sat:", with: "")
            .trimmingCharacters(in: .whitespaces)
        sat = Int(satStr) ?? 1300
    }
    
    // Extract activity tiers
    var activityTiers: [Int] = []
    let tierPattern = "tier\\s*([0-9]+)"
    if let regex = try? NSRegularExpression(pattern: tierPattern, options: .caseInsensitive) {
        let matches = regex.matches(in: promptLower, range: NSRange(promptLower.startIndex..., in: promptLower))
        for match in matches {
            if let range = Range(match.range(at: 1), in: promptLower) {
                if let tier = Int(promptLower[range]) {
                    activityTiers.append(tier)
                }
            }
        }
    }
    
    // If no tiers found, estimate from keywords
    if activityTiers.isEmpty {
        if promptLower.contains("national") || promptLower.contains("international") {
            activityTiers.append(2)
        } else if promptLower.contains("state") || promptLower.contains("regional") {
            activityTiers.append(4)
        } else if promptLower.contains("leadership") || promptLower.contains("president") {
            activityTiers.append(4)
        } else {
            activityTiers.append(5)
        }
    }
    
    // Extract AP/IB count
    var apCount = 0
    if let apRange = promptLower.range(of: "([0-9]+)\\s*ap", options: .regularExpression) {
        let numStr = String(promptLower[apRange]).replacingOccurrences(of: "ap", with: "").trimmingCharacters(in: .whitespaces)
        apCount = Int(numStr) ?? 0
    }
    
    var ibCount = 0
    if let ibRange = promptLower.range(of: "([0-9]+)\\s*ib", options: .regularExpression) {
        let numStr = String(promptLower[ibRange]).replacingOccurrences(of: "ib", with: "").trimmingCharacters(in: .whitespaces)
        ibCount = Int(numStr) ?? 0
    }
    
    // Use CollegeAdmissionsAnalyzer
    let result = CollegeAdmissionsAnalyzer.calculateChances(
        collegeName: collegeName,
        gpa: gpa,
        sat: sat,
        activityTiers: activityTiers,
        apCount: apCount,
        ibCount: ibCount
    )
    
    // Format arrays for JSON
    let strengthsJSON = result.strengths.map { "\"\($0.replacingOccurrences(of: "\"", with: "\\\""))\"" }.joined(separator: ", ")
    let weaknessesJSON = result.weaknesses.map { "\"\($0.replacingOccurrences(of: "\"", with: "\\\""))\"" }.joined(separator: ", ")
    let tipsJSON = result.tips.map { "\"\($0.replacingOccurrences(of: "\"", with: "\\\""))\"" }.joined(separator: ", ")
    
    return """
    {
      "category": "\(result.category)",
      "probability": "\(result.probability)%",
      "strengths": [\(strengthsJSON)],
      "weaknesses": [\(weaknessesJSON)],
      "reasoning": "\(result.reasoning.replacingOccurrences(of: "\"", with: "\\\""))",
      "tips": [\(tipsJSON)]
    }
    """
  }
}
