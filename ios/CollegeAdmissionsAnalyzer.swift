import Foundation

// Mathematical College Admissions Formula
// For pre-iPhone 15 devices without Apple Intelligence
struct CollegeAdmissionsAnalyzer {
    
    // MARK: - College Database with Weights
    
    struct CollegeData {
        let name: String
        let acceptanceDecimal: Double  // Decimal to multiply by (e.g., 0.034 for Harvard)
        let avgGPA: Double
        let avgSAT: Int
        let difficulty: String
        
        // Weights for scoring (should sum to 1.0)
        let gpaWeight: Double
        let satWeight: Double
        let ecWeight: Double
        let rigorWeight: Double
        
        // College-specific characteristics
        let lookingFor: String  // What the college values most
        let strengthTip: String  // What to do if you're competitive
        let weaknessTip: String  // What to do if you're below average
    }
    
    static let collegeDatabase: [String: CollegeData] = [
        // === T20 SCHOOLS (Very Hard) - EC-Heavy ===
        "harvard": CollegeData(
            name: "Harvard University",
            acceptanceDecimal: 0.034,
            avgGPA: 4.0,
            avgSAT: 1520,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Intellectual curiosity, leadership with social impact, and students who will change the world",
            strengthTip: "Apply REA if Harvard is your top choice. Write essays showcasing intellectual vitality and how you'll contribute to Harvard's community",
            weaknessTip: "You need national-level achievements (ISEF, USAMO, published research) or exceptional entrepreneurial/civic impact to be competitive"
        ),
        "stanford": CollegeData(
            name: "Stanford University",
            acceptanceDecimal: 0.037,
            avgGPA: 4.0,
            avgSAT: 1505,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Innovation, entrepreneurial spirit, and students who think differently and take intellectual risks",
            strengthTip: "Emphasize innovation and unique projects. Stanford values builders and creators - showcase what you've built or founded",
            weaknessTip: "Stanford wants to see you've done something unique. Start a company, build a product, or create significant social impact to stand out"
        ),
        "mit": CollegeData(
            name: "MIT",
            acceptanceDecimal: 0.040,
            avgGPA: 4.0,
            avgSAT: 1540,
            difficulty: "Very Hard",
            gpaWeight: 0.30, satWeight: 0.30, ecWeight: 0.30, rigorWeight: 0.10,
            lookingFor: "STEM excellence, hands-on making/building, and collaborative problem-solving ability",
            strengthTip: "Highlight technical projects and maker activities. MIT values hands-on work - mention hackathons, robotics, research, or building projects",
            weaknessTip: "MIT requires demonstrated STEM passion through competitions (USACO, USAMO, Science Olympiad) or significant technical projects/research"
        ),
        "yale": CollegeData(
            name: "Yale University",
            acceptanceDecimal: 0.045,
            avgGPA: 4.0,
            avgSAT: 1515,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Well-rounded excellence, strong humanities background, and commitment to community service",
            strengthTip: "Apply SCEA if Yale is your first choice. Emphasize intellectual curiosity across disciplines and community engagement",
            weaknessTip: "Yale values diverse interests. Develop depth in 2-3 areas (one academic, one service/leadership) with significant achievements"
        ),
        "princeton": CollegeData(
            name: "Princeton University",
            acceptanceDecimal: 0.056,
            avgGPA: 3.95,
            avgSAT: 1515,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Academic excellence, independent research capability, and contribution to residential college system",
            strengthTip: "Emphasize academic passion and research interests. Princeton values undergraduate research - mention any research experience",
            weaknessTip: "Show academic depth through research, science fairs (ISEF), or scholarly publications. Princeton prioritizes intellectual engagement"
        ),
        "columbia": CollegeData(
            name: "Columbia University",
            acceptanceDecimal: 0.039,
            avgGPA: 4.0,
            avgSAT: 1520,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Urban engagement, core curriculum fit, diverse perspectives, and global awareness",
            strengthTip: "Apply ED if Columbia is your top choice. Show how you'll thrive in NYC and contribute to Columbia's diverse community",
            weaknessTip: "Columbia wants global citizens. Demonstrate international awareness, language skills, or diverse cultural experiences"
        ),
        "upenn": CollegeData(
            name: "UPenn",
            acceptanceDecimal: 0.065,
            avgGPA: 3.95,
            avgSAT: 1510,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Pre-professional ambition, interdisciplinary interests, and collaborative learning",
            strengthTip: "Apply ED to demonstrate strong interest. Highlight business/entrepreneurship activities if applying to Wharton",
            weaknessTip: "Show clear professional goals and how Penn's resources will help you achieve them. Demonstrated interest is crucial"
        ),
        "duke": CollegeData(
            name: "Duke University",
            acceptanceDecimal: 0.060,
            avgGPA: 3.94,
            avgSAT: 1520,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Athletic + academic balance, service leadership, and collaborative spirit",
            strengthTip: "Emphasize athletics, service, and academic balance. Duke values well-rounded students with strong community involvement",
            weaknessTip: "Duke looks for service leadership and athletics. Join community service projects and consider varsity sports if competitive"
        ),
        "brown": CollegeData(
            name: "Brown University",
            acceptanceDecimal: 0.054,
            avgGPA: 3.95,
            avgSAT: 1505,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Intellectual independence, open curriculum fit, creative/interdisciplinary thinking",
            strengthTip: "Show how you'll use the Open Curriculum. Brown wants self-directed learners - emphasize independent projects",
            weaknessTip: "Brown values academic freedom and creativity. Demonstrate self-directed learning through unique courses or independent study"
        ),
        "northwestern": CollegeData(
            name: "Northwestern University",
            acceptanceDecimal: 0.070,
            avgGPA: 3.92,
            avgSAT: 1500,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Pre-professional drive, journalism/performing arts excellence, collaborative learning",
            strengthTip: "Apply ED for best chances. Highlight journalism, theater, or performing arts if relevant to your intended major",
            weaknessTip: "Northwestern values demonstrated interest. Visit campus, attend events, and show specific knowledge of programs in your essays"
        ),
        "caltech": CollegeData(
            name: "Caltech",
            acceptanceDecimal: 0.039,
            avgGPA: 4.0,
            avgSAT: 1560,
            difficulty: "Very Hard",
            gpaWeight: 0.30, satWeight: 0.35, ecWeight: 0.25, rigorWeight: 0.10,
            lookingFor: "Extreme STEM depth, research experience, perfect math/science scores and genuine passion for science",
            strengthTip: "Caltech wants STEM obsession. Emphasize research, olympiad medals (USAMO/USAPHO/USNCO), and technical depth",
            weaknessTip: "Caltech requires elite STEM credentials. Aim for AIME qualifier minimum, ideally USAMO/USAPhO. Research experience is essential"
        ),
        "dartmouth": CollegeData(
            name: "Dartmouth College",
            acceptanceDecimal: 0.062,
            avgGPA: 3.95,
            avgSAT: 1500,
            difficulty: "Very Hard",
            gpaWeight: 0.25, satWeight: 0.25, ecWeight: 0.40, rigorWeight: 0.10,
            lookingFor: "Outdoor/adventure spirit, tight-knit community fit, undergraduate teaching focus",
            strengthTip: "Show you'll thrive in a small college environment. Emphasize leadership in close-knit communities and outdoor activities",
            weaknessTip: "Dartmouth values community and collaboration. Demonstrate leadership in clubs, sports teams, or community organizations"
        ),
        "cornell": CollegeData(
            name: "Cornell University",
            acceptanceDecimal: 0.087,
            avgGPA: 3.90,
            avgSAT: 1480,
            difficulty: "Very Hard",
            gpaWeight: 0.30, satWeight: 0.30, ecWeight: 0.30, rigorWeight: 0.10,
            lookingFor: "Specific school fit (Engineering, Hotel, etc.), work ethic, and practical application of knowledge",
            strengthTip: "Apply to the specific school that matches your interests. Cornell has diverse colleges - show clear fit with one",
            weaknessTip: "Research your intended school within Cornell (e.g., Engineering, Agriculture). Show specific interest in that school's programs"
        ),
        
        // === TOP 30 (Hard) - Balanced ===
        "usc": CollegeData(
            name: "USC",
            acceptanceDecimal: 0.120,
            avgGPA: 3.85,
            avgSAT: 1470,
            difficulty: "Hard",
            gpaWeight: 0.30, satWeight: 0.30, ecWeight: 0.30, rigorWeight: 0.10,
            lookingFor: "Trojan family spirit, entertainment/business interests, strong athletic+academic balance",
            strengthTip: "Apply for merit scholarships if competitive. USC values demonstrated interest - visit campus and attend events",
            weaknessTip: "USC is competitive but holistic. Focus on strong essays showing your personality and how you'll contribute to campus"
        ),
        "ucla": CollegeData(
            name: "UCLA",
            acceptanceDecimal: 0.090,
            avgGPA: 3.92,
            avgSAT: 1435,
            difficulty: "Hard",
            gpaWeight: 0.35, satWeight: 0.30, ecWeight: 0.25, rigorWeight: 0.10,
            lookingFor: "Academic excellence in California context, leadership, service, and overcoming challenges",
            strengthTip: "Strong PIQs (Personal Insight Questions) are crucial. Show leadership, service, and creativity across 4 prompts",
            weaknessTip: "UCLA is stats-heavy for UCs. Retake SAT if below 1450, and ensure GPA is 3.9+ weighted. Use PIQs to stand out"
        ),
        "berkeley": CollegeData(
            name: "UC Berkeley",
            acceptanceDecimal: 0.116,
            avgGPA: 3.90,
            avgSAT: 1430,
            difficulty: "Hard",
            gpaWeight: 0.35, satWeight: 0.30, ecWeight: 0.25, rigorWeight: 0.10,
            lookingFor: "Intellectual curiosity, social awareness, STEM excellence (especially Engineering/CS)",
            strengthTip: "For CS/Engineering, have strong STEM credentials. For L&S, show intellectual breadth across disciplines",
            weaknessTip: "Berkeley EECS/CS is extremely competitive. Have significant CS projects, competitions (USACO), or research to stand out"
        ),
        "georgetown": CollegeData(
            name: "Georgetown University",
            acceptanceDecimal: 0.120,
            avgGPA: 3.89,
            avgSAT: 1460,
            difficulty: "Hard",
            gpaWeight: 0.30, satWeight: 0.30, ecWeight: 0.30, rigorWeight: 0.10,
            lookingFor: "Service commitment, international affairs interest, Jesuit values of cura personalis",
            strengthTip: "Apply EA for best chances. Highlight service, global awareness, and how Georgetown's location/programs fit your goals",
            weaknessTip: "Georgetown values service and global citizenship. Develop significant community service or international experience"
        ),
        "cmu": CollegeData(
            name: "Carnegie Mellon",
            acceptanceDecimal: 0.113,
            avgGPA: 3.88,
            avgSAT: 1500,
            difficulty: "Hard",
            gpaWeight: 0.30, satWeight: 0.35, ecWeight: 0.25, rigorWeight: 0.10,
            lookingFor: "Technical depth (CS/Engineering), interdisciplinary interests, maker/builder mentality",
            strengthTip: "For SCS (Computer Science), show significant coding projects, hackathons, or CS competitions (USACO)",
            weaknessTip: "CMU SCS is extremely selective. Build a strong GitHub portfolio, win hackathons, or get USACO Gold+ for competitiveness"
        ),
        "notre dame": CollegeData(
            name: "Notre Dame",
            acceptanceDecimal: 0.130,
            avgGPA: 3.90,
            avgSAT: 1475,
            difficulty: "Hard",
            gpaWeight: 0.30, satWeight: 0.30, ecWeight: 0.30, rigorWeight: 0.10,
            lookingFor: "Catholic values alignment, service commitment, athletic school spirit and community",
            strengthTip: "Apply REA if Notre Dame is your first choice. Emphasize service, faith (if applicable), and community values",
            weaknessTip: "Notre Dame strongly values service and community. Show significant volunteer work and leadership in service organizations"
        ),
        "umich": CollegeData(
            name: "University of Michigan",
            acceptanceDecimal: 0.180,
            avgGPA: 3.85,
            avgSAT: 1435,
            difficulty: "Hard",
            gpaWeight: 0.35, satWeight: 0.30, ecWeight: 0.25, rigorWeight: 0.10,
            lookingFor: "Academic strength, Michigan pride/fit, leadership in diverse communities",
            strengthTip: "Apply EA for better odds. Write strong 'Why Michigan' essay showing specific knowledge of programs",
            weaknessTip: "Michigan is increasingly selective. Focus on strong grades and test scores, then differentiate through essays"
        ),
        "uva": CollegeData(
            name: "UVA",
            acceptanceDecimal: 0.190,
            avgGPA: 3.87,
            avgSAT: 1430,
            difficulty: "Hard",
            gpaWeight: 0.35, satWeight: 0.30, ecWeight: 0.25, rigorWeight: 0.10,
            lookingFor: "Academic excellence, Jeffersonian values (service, honor), Virginia residency preference",
            strengthTip: "Apply EA and write compelling essays. UVA values demonstrated interest and fit with honor code",
            weaknessTip: "UVA is stats-driven but holistic. Ensure strong academics, then use essays to show character and fit"
        ),
        
        // === MODERATE SELECTIVITY - Stats-Heavy ===
        "uc davis": CollegeData(
            name: "UC Davis",
            acceptanceDecimal: 0.370,
            avgGPA: 3.75,
            avgSAT: 1300,
            difficulty: "Moderate",
            gpaWeight: 0.40, satWeight: 0.35, ecWeight: 0.15, rigorWeight: 0.10,
            lookingFor: "STEM focus (agriculture, biology, veterinary), strong academics, California residency",
            strengthTip: "Strong target if your stats match averages. Use PIQs to highlight STEM interests and community service",
            weaknessTip: "UC Davis is stats-driven. Focus on raising GPA to 3.8+ and SAT to 1350+ for solid chances"
        ),
        "uc irvine": CollegeData(
            name: "UC Irvine",
            acceptanceDecimal: 0.210,
            avgGPA: 3.80,
            avgSAT: 1320,
            difficulty: "Moderate",
            gpaWeight: 0.40, satWeight: 0.35, ecWeight: 0.15, rigorWeight: 0.10,
            lookingFor: "STEM excellence, research interests, diverse California students",
            strengthTip: "Good match for strong STEM students. Highlight research experience or STEM competitions in PIQs",
            weaknessTip: "UCI is becoming more selective. Aim for GPA 3.9+ and SAT 1400+ for better chances"
        ),
        "uc santa barbara": CollegeData(
            name: "UC Santa Barbara",
            acceptanceDecimal: 0.260,
            avgGPA: 3.82,
            avgSAT: 1340,
            difficulty: "Moderate",
            gpaWeight: 0.40, satWeight: 0.35, ecWeight: 0.15, rigorWeight: 0.10,
            lookingFor: "Strong academics, research fit (especially physics/materials), balanced lifestyle",
            strengthTip: "Solid target school. Use PIQs to show research interests and how you'll contribute to campus",
            weaknessTip: "UCSB weighs stats heavily. Target GPA 3.9+ and SAT 1400+ to be competitive"
        ),
        "ucsd": CollegeData(
            name: "UC San Diego",
            acceptanceDecimal: 0.240,
            avgGPA: 3.87,
            avgSAT: 1380,
            difficulty: "Moderate",
            gpaWeight: 0.40, satWeight: 0.35, ecWeight: 0.15, rigorWeight: 0.10,
            lookingFor: "STEM strength (bioengineering, CS, biology), research experience, academic rigor",
            strengthTip: "Competitive for STEM. Highlight research, science competitions, or STEM projects in PIQs",
            weaknessTip: "UCSD is stats-focused. Aim for GPA 4.0+ weighted and SAT 1450+ for engineering/CS majors"
        ),
        "university": CollegeData(
            name: "State University",
            acceptanceDecimal: 0.300,
            avgGPA: 3.70,
            avgSAT: 1250,
            difficulty: "Moderate",
            gpaWeight: 0.40, satWeight: 0.35, ecWeight: 0.15, rigorWeight: 0.10,
            lookingFor: "Strong academics, state residency, well-rounded involvement",
            strengthTip: "Likely acceptance if stats are above average. Focus on showing fit and interest in specific programs",
            weaknessTip: "Raise GPA above 3.7 and SAT above 1300 for solid safety status"
        )
    ]
    
    // MARK: - Scoring Components
    
    static func scoreGPA(gpa: Double, avgGPA: Double) -> Double {
        // Score 0-100 based on GPA relative to college average
        let difference = gpa - avgGPA
        let baseScore = 75.0 // avg applicant
        
        if difference >= 0.2 { return 100.0 }
        else if difference >= 0.1 { return 95.0 }
        else if difference >= 0.0 { return 85.0 }
        else if difference >= -0.1 { return 70.0 }
        else if difference >= -0.2 { return 55.0 }
        else if difference >= -0.3 { return 40.0 }
        else { return 25.0 }
    }
    
    static func scoreSAT(sat: Int, avgSAT: Int) -> Double {
        // Score 0-100 based on SAT relative to college average
        let difference = sat - avgSAT
        
        if difference >= 100 { return 100.0 }
        else if difference >= 50 { return 95.0 }
        else if difference >= 0 { return 85.0 }
        else if difference >= -50 { return 70.0 }
        else if difference >= -100 { return 55.0 }
        else if difference >= -150 { return 40.0 }
        else { return 25.0 }
    }
    
    static func scoreExtracurriculars(activityTiers: [Int]) -> Double {
        // Score 0-100 based on average tier (lower = better)
        if activityTiers.isEmpty { return 40.0 }
        
        let avgTier = Double(activityTiers.reduce(0, +)) / Double(activityTiers.count)
        let topTierCount = activityTiers.filter { $0 <= 3 }.count
        
        var score = 50.0
        
        // Base score from average tier
        if avgTier <= 2.0 { score = 100.0 }        // Elite
        else if avgTier <= 3.0 { score = 90.0 }   // Excellent
        else if avgTier <= 4.0 { score = 75.0 }   // Strong
        else if avgTier <= 5.0 { score = 60.0 }   // Good
        else if avgTier <= 6.0 { score = 45.0 }   // Average
        else { score = 30.0 }                      // Weak
        
        // Bonus for having multiple top-tier activities
        if topTierCount >= 3 { score = min(score + 15, 100) }
        else if topTierCount >= 2 { score = min(score + 10, 100) }
        else if topTierCount >= 1 { score = min(score + 5, 100) }
        
        return score
    }
    
    static func scoreRigor(apCount: Int, ibCount: Int) -> Double {
        // Score 0-100 based on course rigor
        let totalAdvanced = apCount + ibCount
        
        if totalAdvanced >= 12 { return 100.0 }
        else if totalAdvanced >= 10 { return 95.0 }
        else if totalAdvanced >= 8 { return 85.0 }
        else if totalAdvanced >= 6 { return 75.0 }
        else if totalAdvanced >= 4 { return 65.0 }
        else if totalAdvanced >= 2 { return 55.0 }
        else if totalAdvanced >= 1 { return 45.0 }
        else { return 30.0 }
    }
    
    // MARK: - Main Formula
    
    static func calculateChances(
        collegeName: String,
        gpa: Double,
        sat: Int,
        activityTiers: [Int],
        apCount: Int = 0,
        ibCount: Int = 0
    ) -> (category: String, probability: Int, strengths: [String], weaknesses: [String], reasoning: String, tips: [String]) {
        
        // Get college data
        let collegeKey = collegeName.lowercased()
        let college = collegeDatabase[collegeKey] ?? collegeDatabase["university"]!
        
        // STEP 1: Score each component (0-100)
        let gpaScore = scoreGPA(gpa: gpa, avgGPA: college.avgGPA)
        let satScore = scoreSAT(sat: sat, avgSAT: college.avgSAT)
        let ecScore = scoreExtracurriculars(activityTiers: activityTiers)
        let rigorScore = scoreRigor(apCount: apCount, ibCount: ibCount)
        
        // STEP 2: Calculate weighted composite score (0-100)
        let compositeScore = (gpaScore * college.gpaWeight) +
                            (satScore * college.satWeight) +
                            (ecScore * college.ecWeight) +
                            (rigorScore * college.rigorWeight)
        
        // STEP 3: Multiply by college-specific decimal
        var admissionsProbability = compositeScore * college.acceptanceDecimal
        
        // STEP 4: Apply difficulty-based adjustments
        let hasTier1Or2 = activityTiers.contains { $0 <= 2 }
        
        if college.difficulty == "Very Hard" {
            // T20 schools: penalize heavily for weak ECs
            // Exclude from penalty if they have at least 1 Tier 1-2 activity
            if ecScore < 70 && !hasTier1Or2 {
                admissionsProbability *= 0.6
            }
            // Cap maximum probability for T20
            admissionsProbability = min(admissionsProbability, 35.0)
        }
        
        // Cap final probability
        admissionsProbability = min(max(admissionsProbability, 1.0), 95.0)
        
        // STEP 5: Categorize
        let category: String
        if admissionsProbability <= 10 { category = "Ultra Reach" }
        else if admissionsProbability <= 35 { category = "Reach" }
        else if admissionsProbability <= 70 { category = "Target" }
        else { category = "Safety" }
        
        // Generate feedback
        var strengths: [String] = []
        var weaknesses: [String] = []
        
        if gpaScore >= 85 {
            strengths.append("GPA \(String(format: "%.2f", gpa)) is competitive (\(Int(gpaScore))%)")
        } else if gpaScore < 70 {
            weaknesses.append("GPA below typical admits for \(college.name)")
        }
        
        if satScore >= 85 {
            strengths.append("SAT \(sat) is strong (\(Int(satScore))%)")
        } else if satScore < 70 {
            weaknesses.append("SAT below average for \(college.name)")
        }
        
        if ecScore >= 75 {
            strengths.append("Excellent extracurricular profile (\(Int(ecScore))%)")
        } else if ecScore < 60 {
            weaknesses.append("Extracurriculars need more competitive achievements")
        }
        
        if rigorScore >= 85 {
            strengths.append("Strong course rigor with \(apCount + ibCount) advanced courses")
        }
        
        // Reasoning with college-specific context
        let reasoning = "Your composite score is \(Int(compositeScore))/100 (GPA: \(Int(gpaScore)), SAT: \(Int(satScore)), ECs: \(Int(ecScore)), Rigor: \(Int(rigorScore))). " +
                       "Multiplying by \(college.name)'s acceptance decimal (\(String(format: "%.3f", college.acceptanceDecimal))) gives \(Int(admissionsProbability))% probability. " +
                       "You are \(category.lowercased()) for this school. \(college.lookingFor)"
        
        // College-specific tips based on performance
        var tips: [String] = []
        
        // If strong applicant, use strength tip
        if compositeScore >= 80 {
            tips.append(college.strengthTip)
            if ecScore >= 85 {
                tips.append("Your extracurricular profile is exceptional - make sure essays tell your unique story")
            }
        }
        // If weak applicant, use weakness tip
        else if compositeScore < 65 {
            tips.append(college.weaknessTip)
            if gpaScore < 70 {
                tips.append("Focus on raising GPA to at least \(String(format: "%.2f", college.avgGPA - 0.1)) for better chances")
            }
            if satScore < 70 {
                tips.append("Retake SAT aiming for \(college.avgSAT + 50)+ to match typical admits")
            }
        }
        // If borderline, give balanced advice
        else {
            tips.append(college.strengthTip)
            if ecScore < 75 && college.ecWeight >= 0.30 {
                tips.append("This school heavily weights ECs - strengthen your extracurricular profile with competitive achievements")
            }
            if gpaScore < 85 || satScore < 85 {
                tips.append("Improve test scores and grades to increase chances - aim for \(college.avgSAT + 50) SAT and \(String(format: "%.2f", college.avgGPA)) GPA")
            }
        }
        
        // Always add essay tip for competitive schools
        if college.difficulty == "Very Hard" || college.difficulty == "Hard" {
            tips.append("Write compelling essays that demonstrate fit with \(college.name)'s unique culture and values")
        }
        
        return (
            category: category,
            probability: Int(admissionsProbability),
            strengths: strengths,
            weaknesses: weaknesses,
            reasoning: reasoning,
            tips: tips
        )
    }
}
