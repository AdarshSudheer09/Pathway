import Foundation
import FoundationModels

@objc(LocalLLMBridge)
public class LocalLLMBridge: NSObject {

  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  // Check if device supports Foundation Models (iPhone 15 Pro+)
  @objc(hasFoundationModelsSupport:rejecter:)
  func hasFoundationModelsSupport(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    let isAvailable = SystemLanguageModel.default.availability == .available
    resolve(isAvailable)
  }

  @objc(generateResponse:resolver:rejecter:)
  func generateResponse(_ prompt: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
    
    // TESTING: Always use tier-based analysis (comment out to restore Apple Intelligence check)
    DispatchQueue.global(qos: .userInitiated).async {
        let response = self.tierBasedAnalysis(prompt: prompt)
        // Simulate processing delay for realistic UX
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.9) {
            resolve(response)
        }
    }
    return
    
    /* ORIGINAL CODE (uncomment to restore):
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
    */
  }
  
  // MARK: - Tier-Based Analysis (Fallback for older devices)
  
  private func tierBasedAnalysis(prompt: String) -> String {
    let promptLower = prompt.lowercased()
    
    print("[Tier Analysis] Routing prompt (first 200 chars): \(String(promptLower.prefix(200)))")
    
    // Determine type of analysis - CHECK ACTIVITY FIRST (more specific)
    // Activity prompts contain "Activity:" field or explicit activity/impact keywords
    if promptLower.contains("activity:") || 
       (promptLower.contains("activity") && (promptLower.contains("impact") || promptLower.contains("evaluate this activity"))) ||
       promptLower.contains("role:") || 
       promptLower.contains("position:") {
        print("[Tier Analysis] → Routing to Activity Analyzer")
        return analyzeActivity(prompt: prompt)
    } 
    // College chances prompts explicitly ask about admissions/chances
    else if (promptLower.contains("college") || promptLower.contains("university")) && 
            (promptLower.contains("chances") || promptLower.contains("admissions") || promptLower.contains("probability")) {
        print("[Tier Analysis] → Routing to College Analyzer")
        return analyzeCollegeChances(prompt: prompt)
    } 
    else {
        // Generic fallback - try activity analysis as default
        print("[Tier Analysis] → No clear match, defaulting to Activity Analyzer")
        return analyzeActivity(prompt: prompt)
    }
  }
  
  // MARK: - Activity Analysis Using Tier System
  
  private func analyzeActivity(prompt: String) -> String {
    // The prompt format is: Activity: "${position} at ${organization}: ${description}"
    // We need to extract these parts or use the whole thing
    
    var position = ""
    var organization = ""
    var description = ""
    
    // 1. Try to find the explicit delimiters <<<ACTIVITY_START>>> and <<<ACTIVITY_END>>>
    if let startRange = prompt.range(of: "<<<ACTIVITY_START>>>"),
       let endRange = prompt.range(of: "<<<ACTIVITY_END>>>") {
        
        // Extract exact content between delimiters
        let activityText = String(prompt[startRange.upperBound..<endRange.lowerBound]).trimmingCharacters(in: .whitespacesAndNewlines)
        
        // Try to split by " at " or ": " to parse components
        // Default assumption: Position at Organization: Description
        
        // Remove quotes if present
        let cleanedText = activityText.replacingOccurrences(of: "\"", with: "")
        
        if let atRange = cleanedText.range(of: " at ", options: .caseInsensitive) {
            position = String(cleanedText[..<atRange.lowerBound])
            let rest = String(cleanedText[atRange.upperBound...])
            
            if let colonRange = rest.range(of: ": ") {
                organization = String(rest[..<colonRange.lowerBound])
                description = String(rest[colonRange.upperBound...])
            } else {
                organization = rest
            }
        } else {
            // No " at " found, check for colon separator for simple Description or Position: Description
            if let colonRange = cleanedText.range(of: ": ") {
                position = String(cleanedText[..<colonRange.lowerBound]) // treat first part as position/title
                description = String(cleanedText[colonRange.upperBound...])
            } else {
                // Treat whole thing as description
                description = cleanedText
            }
        }
        
    } else if let activityRange = prompt.range(of: "Activity:", options: .caseInsensitive) {
        // 2. Fallback to extracting everything after "Activity:" up to the next newline
        let substring = String(prompt[activityRange.upperBound...])
        let activityText: String
        
        if let newlineRange = substring.range(of: "\n") {
            activityText = String(substring[..<newlineRange.lowerBound]).trimmingCharacters(in: .whitespacesAndNewlines)
        } else {
            activityText = substring.trimmingCharacters(in: .whitespacesAndNewlines)
        }
        
        // Remove quotes if present
        let cleanedText = activityText.replacingOccurrences(of: "\"", with: "")
        
        // Try to split by " at " to get position and rest
        if let atRange = cleanedText.range(of: " at ", options: .caseInsensitive) {
            position = String(cleanedText[..<atRange.lowerBound])
            let rest = String(cleanedText[atRange.upperBound...])
            
            // Try to split rest by ": " to get organization and description
            if let colonRange = rest.range(of: ": ") {
                organization = String(rest[..<colonRange.lowerBound])
                description = String(rest[colonRange.upperBound...])
            } else {
                // No description separator, use it all as organization
                organization = rest
            }
        } else {
            // No " at " found, use entire line as description
            description = cleanedText
        }
    } else {
        // 3. Fallback: try parsing structured format from newlines
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
    }
    
    // If we still don't have a description, use the entire prompt
    if description.isEmpty {
        description = prompt
    }
    
    // Use ActivityAnalyzer with the extracted (or full prompt) information
    let result = ActivityAnalyzer.analyzeActivity(
        description: description,
        position: position,
        organization: organization
    )
    
    // Properly escape strings for JSON
    let escapedDescription = result.description.replacingOccurrences(of: "\"", with: "\\\"")
                                              .replacingOccurrences(of: "\n", with: "\\n")
    let escapedFeedback = result.feedback.replacingOccurrences(of: "\"", with: "\\\"")
                                        .replacingOccurrences(of: "\n", with: "\\n")
    let escapedLevelUp = result.levelUp.replacingOccurrences(of: "\"", with: "\\\"")
                                       .replacingOccurrences(of: "\n", with: "\\n")
    let escapedRankName = result.rankName.replacingOccurrences(of: "\"", with: "\\\"")
    
    let jsonResponse = """
    {
      "score": \(result.score),
      "rank_name": "\(escapedRankName)",
      "rank_description": "\(escapedDescription)",
      "brutal_feedback": "\(escapedFeedback)",
      "level_up_action": "\(escapedLevelUp)"
    }
    """
    
    print("[Activity Analyzer] Returning JSON: \(jsonResponse)")
    
    return jsonResponse
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
