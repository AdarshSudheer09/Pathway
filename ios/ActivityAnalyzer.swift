import Foundation

// Comprehensive Activity Tier System with Pre-Curated Responses
struct ActivityTier {
    let score: Int
    let rankName: String
    let description: String
    let feedback: String
    let levelUpAction: String
    let keywords: [String]
}

class ActivityAnalyzer {
    
    // MARK: - Tier Definitions (Based on RANK_RUBRIC)
    
    static let tiers: [ActivityTier] = [
        // PLATINUM II (10/10) - International/Olympic Level
        ActivityTier(
            score: 10,
            rankName: "Platinum II",
            description: "International olympiad medalist or equivalent world-class achievement",
            feedback: "You are in the absolute elite tier of high school achievers globally. This is the pinnacle of competitive achievement and will significantly strengthen applications to any institution.",
            levelUpAction: "At this level, focus on leveraging your achievement for research opportunities, mentorship roles, or entrepreneurial ventures that create lasting impact.",
            keywords: [
                // Math/CS Olympiads
                "imo gold", "imo silver", "imo bronze", "imo medalist", "ioi gold", "ioi silver", "ioi bronze", "ioi medalist",
                // Science Olympiads
                "icho gold", "icho silver", "icho medalist", "ibo gold", "ibo silver", "ibo medalist", "ipho gold", "ipho silver", "ipho medalist",
                // Research
                "regeneron sts top 10", "regeneron sts winner", "isef grand prize", "gordon e. moore award", "isef best of category",
                // Entrepreneurship
                "thiel fellow", "thiel fellowship", "$100k+ revenue", "y combinator", "techstars",
                // Innovation
                "breakthrough junior challenge winner", "3m young scientist winner", "google science fair winner",
                // Sports
                "olympic medalist", "olympic gold", "olympic qualifier", "world champion", "national champion swimmer", "national champion tennis", "national champion golf",
                // Arts
                "grammy nominee", "tony award", "major published author", "big 5 publisher",
                // Civic
                "boys nation president", "girls nation president", "ussyp national representative", "national student poet",
                // Publications
                "nature publication", "science publication", "cell publication", "first author nature"
            ]
        ),
        
        // PLATINUM I (9/10) - National Elite/D1 Recruit
        ActivityTier(
            score: 9,
            rankName: "Platinum I",
            description: "Elite national competition finalist or D1 recruited athlete",
            feedback: "You demonstrate exceptional mastery in your field at the national level. This achievement puts you among the top students nationally and is highly impressive to admissions committees.",
            levelUpAction: "Consider expanding your impact through research publications, founding an organization, or pursuing international competitions to reach Platinum II.",
            keywords: [
                // Math/CS
                "usaco camp", "mop red", "mop blue", "mop participant", "us physics team", "physics camp", "mosp",
                // Research Programs
                "rsi participant", "research science institute", "regeneron sts top 40", "regeneron sts finalist",
                // Sports
                "d1 recruited", "d1 commit", "d1 scholarship", "all-american", "national team member", "us national team",
                // Arts
                "youngarts finalist", "presidential scholar arts", "presidential scholar", "juilliard pre-college", "curtis institute",
                // Competitions
                "national science bowl winner", "mathcounts nationals", "science bowl champion",
                // Tech/Robotics
                "vex world champion", "first world champion", "ftc world champion", "frc world champion", "vex worlds",
                // Business
                "deca icdc 1st place", "fbla nationals 1st", "$50k+ revenue",
                // Civic
                "youth poet laureate national", "marshall scholar", "rhodes scholar finalist"
            ]
        ),
        
        // DIAMOND II (8/10) - National Finalist/Top Tier
        ActivityTier(
            score: 8,
            rankName: "Diamond II",
            description: "National olympiad finalist or significant research recognition",
            feedback: "Your achievement demonstrates elite competitiveness at the national stage. This is a standout accomplishment that significantly strengthens your academic profile.",
            levelUpAction: "To reach Platinum level, aim for top placements in national competitions or pursue publication in high-impact journals.",
            keywords: [
                // Math Competitions
                "usamo winner", "usamo qualifier", "usamo", "usajmo winner", "amc 12 perfect score", "amc 10 perfect score",
                // Science Olympiads
                "usnco top 20", "usabo top 20", "usapho top 20", "usnco finalist", "usabo finalist", "usapho finalist",
                // Research
                "regeneron sts scholar", "regeneron sts top 300", "isef finalist", "isef category award", "isef 1st place", "isef 2nd place", "isef 3rd place",
                "jshs national finalist", "siemens finalist", "junior science humanities symposium",
                // Publications
                "first author research", "peer-reviewed publication", "published researcher", "co-author publication",
                // Civic/Leadership  
                "boys nation senator", "girls nation senator", "ussyp participant", "senate youth program",
                "congressional award gold medal", "congressional gold",
                // Tech
                "google summer of code", "gsoc participant", "major open source contributor", "linux contributor", "react contributor",
                // Business
                "thiel fellowship finalist", "$25k+ revenue", "y combinator interview",
                // Arts
                "jimmy awards finalist", "nyo-usa", "all-eastern orchestra", "all-national ensemble",
                // Debate
                "toc champion", "tournament of champions winner", "nsda nationals finalist"
            ]
        ),
        
        // DIAMOND I (7/10) - National Qualifier/Elite Programs
        ActivityTier(
            score: 7,
            rankName: "Diamond I",
            description: "National competition qualifier or highly selective summer program",
            feedback: "You have achieved recognition at the national level, demonstrating strong expertise and dedication. This is highly competitive for top universities.",
            levelUpAction: "Focus on advancing to finalist rounds in national competitions or publishing original research to reach Diamond II.",
            keywords: [
                // Math/CS
                "usaco platinum", "aime qualifier", "aime score 10+", "amc 12 distinction", "amc 10 distinction",
                "usajmo qualifier", "mathcounts state winner",
                // Science
                "science olympiad nationals", "usnco high honors", "usabo semifinalist",
                // Debate/Speech
                "nsda nationals", "nsda nationals breaker", "national speech debate", "toc qualifier", "tournament of champions qualifier",
                // Research/Summer Programs
                "tasp participant", "telluride association", "mites participant", "wharton lbw", "leadamerica",
                "yygs participant", "yale young global scholars", "ssp participant", "garcia program", "clark scholar",
                // Scholarships/Awards
                "coolidge senator finalist", "coca-cola scholar", "gates scholar", "national merit finalist",
                "leda scholar", "questbridge finalist", "posse scholar",
                // International Programs
                "nsli-y participant", "congress bundestag", "yes abroad",
                // Arts
                "all-national music", "all-state music first chair", "scholastic art gold medal", "scholastic national gold",
                "youngarts merit", "youngarts honorable mention", "nfaa winner",
                // Civic
                "boys state governor", "girls state governor", "state board education representative", "us senate page",
                // Publications
                "published author", "journal publication", "conference presentation"
            ]
        ),
        
        // GOLD II (6/10) - State Champion/Strong Leadership
        ActivityTier(
            score: 6,
            rankName: "Gold II",
            description: "State champion or significant leadership/research achievement",
            feedback: "You demonstrate strong competitive success and leadership at the state or regional level. This is solid for selective universities.",
            levelUpAction: "Aim for national-level competition participation or publications to advance to Diamond tier.",
            keywords: [
                // Math/CS
                "usaco gold division", "amc 12 honor roll", "amc 10 honor roll", "mathcounts state top 10",
                // Science
                "usnco honors", "usabo semifinalist", "hosa international top 10", "hosa ilc top 10", "science olympiad state medal",
                // Music/Arts
                "all-state music", "all-state band", "all-state orchestra", "all-state choir", "district music chair",
                "scholastic national silver", "scholastic art national silver", "regional art winner",
                // Leadership
                "student body president", "asb president", "class president senior", "school president",
                "model un head delegate", "mun secretary general", "debate team captain",
                // Publications
                "school newspaper editor-in-chief", "yearbook editor-in-chief", "literary magazine editor",
                "undergraduate journal publication", "research symposium presenter",
                // Tech/Entrepreneurship
                "app 10000+ downloads", "app 10000+ users", "published app 10k", "startup $10k revenue",
                "hackathon national winner", "congressional app challenge winner", "technovation winner",
                "ncwit winner", "ncwit national winner",
                // Business
                "deca icdc finalist", "deca internationals", "fbla nationals finalist", "bpa nationals",
                // Sports
                "state champion", "state championship team", "all-state athlete", "state player of year",
                // Science Fair
                "state science fair winner", "regional science fair grand prize"
            ]
        ),
        
        // GOLD I (5/10) - Regional Champion/Selective Programs
        ActivityTier(
            score: 5,
            rankName: "Gold I",
            description: "Regional champion or selective program participant",
            feedback: "You show strong achievement and dedication with regional recognition. This is competitive for most universities.",
            levelUpAction: "Target state-level competitions or pursue more selective opportunities to reach Gold II.",
            keywords: [
                // Math/CS
                "usaco silver division", "aime participant", "aime qualifier", "mathcounts regional winner",
                // History/Social Studies
                "national history day state winner", "nhd state", "history day state champion",
                // Science
                "science olympiad regional champion", "tsa state medalist", "technology student association state",
                // Summer Programs
                "cosmos participant", "uc cosmos", "yygs yale", "notre dame leadership seminar",
                "hoby ambassador", "hoby delegate", "nylc participant",
                // Leadership
                "governor's school participant", "governor's school delegate", "city council youth advisor",
                "mayor's youth council", "youth commission",
                // Civic
                "boys state delegate", "girls state delegate", "american legion boys state", "american legion girls state",
                // Sports
                "all-conference athlete", "conference champion", "state qualifier", "district champion",
                "varsity captain", "team captain", "varsity letter 3+ years",
                // Service
                "president's volunteer service award gold", "pvsa gold medal", "congressional award silver",
                "1000+ volunteer hours", "500+ service hours",
                // Tech
                "app 1000-10000 users", "app published", "hackathon regional winner", "regional hackathon 1st",
                "first robotics regional winner", "vex state champion",
                // Music/Arts
                "all-region music", "district music all-star", "county honor band", "regional art exhibition"
            ]
        ),
        
        // SILVER II (4/10) - State Competitor/School Leadership
        ActivityTier(
            score: 4,
            rankName: "Silver II",
            description: "State-level competitor or significant school leadership",
            feedback: "You demonstrate solid involvement with competitive participation or leadership. This shows well-roundedness for college applications.",
            levelUpAction: "Focus on winning at the state level or expanding the impact of your leadership role significantly.",
            keywords: [
                // Business/Career
                "fbla state qualifier", "fbla state competitor", "deca state qualifier", "deca state",
                "skillsusa state", "bpa state", "fccla state",
                // Science
                "science olympiad regional medalist", "science olympiad medal", "hosa state competitor",
                // Debate/MUN
                "model un gavel award", "mun gavel", "mun best delegate", "debate state qualifier",
                // Arts
                "all-district band", "all-district orchestra", "all-district choir", "district honor ensemble",
                "community theater lead role", "lead role musical", "school musical lead",
                "scholastic regional silver key", "scholastic art regional silver", "regional art award",
                // Leadership
                "student body vice president", "student body vp", "asb vice president",
                "class president", "junior class president", "sophomore class president",
                "club founder", "founded organization", "started club", "created non-profit",
                // Publications
                "newspaper editor", "school newspaper editor", "yearbook editor", "yearbook section editor",
                "literary magazine founder", "school publication editor",
                // Tech
                "app 100-1000 users", "app on app store", "published mobile app",
                "hackathon top 10", "regional hackathon finalist", "hackathon finalist",
                "open source contributor", "github contributor",
                // Academic Honors
                "national merit semifinalist", "ap scholar with distinction", "ap scholar",
                "state history day participant", "history day state qualifier",
                // Competitions
                "mathcounts chapter winner", "amc school winner", "science bowl regional"
            ]
        ),
        
        // SILVER I (3/10) - Club Officer/Varsity Athlete
        ActivityTier(
            score: 3,
            rankName: "Silver I",
            description: "Multi-club officer or varsity athlete with achievements",
            feedback: "You show consistent commitment and growth in your activities. This demonstrates reliability and engagement.",
            levelUpAction: "Pursue competitive opportunities or expand your leadership impact to reach Silver II level.",
            keywords: [
                // Leadership
                "club officer", "club president", "club vice president", "club secretary", "club treasurer",
                "multi-club officer", "officer in multiple clubs", "student council representative",
                "student government", "class representative",
                "youth group leader", "youth ministry leader", "religious youth leader",
                // Scouting
                "eagle scout", "gold award", "girl scout gold award", "silver award", "eagle rank",
                // Sports
                "varsity starter", "varsity player", "varsity athlete 2+ years",
                "all-league honorable mention", "all-league team", "league all-star",
                "regional qualifier athletics", "district qualifier", "sectional qualifier",
                // Arts/Music
                "school musical lead role", "lead in school play", "theater lead",
                "band section leader", "orchestra section leader", "choir section leader",
                "first chair", "principal player", "concertmaster",
                "scholastic art regional honorable mention", "regional art honorable mention",
                // Service
                "150+ volunteer hours", "200+ community service", "300+ service hours",
                "president's volunteer service award bronze", "president's volunteer service award silver",
                "pvsa bronze", "pvsa silver",
                // Academic
                "4-5 ap courses", "5+ ap classes", "ib diploma candidate",
                "peer tutor", "tutoring coordinator", "math tutor", "writing center tutor",
                // Pre-Professional
                "shadowing experience", "shadowed doctor", "shadowed lawyer", "shadowed engineer",
                "internship", "summer intern", "research assistant", "lab assistant",
                "bank intern", "real estate intern", "marketing intern",
                "tutoring business", "started tutoring business", "private tutor",
                // Honors
                "national merit commended", "national merit commended scholar",
                "national honor society", "nhs member", "nhs", "beta club", "mu alpha theta",
                "honor roll 3+ years", "consistent honor roll", "dean's list"
            ]
        ),
        
        // BRONZE II (2/10) - Active Member/Part-time Work
        ActivityTier(
            score: 2,
            rankName: "Bronze II",
            description: "Active participation with some responsibility",
            feedback: "You demonstrate consistent participation and developing skills. Continue building on this foundation.",
            levelUpAction: "Seek officer positions in clubs or pursue competitive opportunities to reach Silver tier.",
            keywords: [
                // Sports
                "jv captain", "junior varsity captain", "jv team captain",
                "varsity member", "varsity team member", "made varsity team",
                "intramural referee", "intramural coordinator", "intramural captain",
                "lifeguard certified", "lifeguard", "swim instructor", "coaching assistant",
                // Arts/Music
                "band member", "orchestra member", "choir member", "ensemble member",
                "school play cast", "theater ensemble", "drama club member",
                "stage crew", "tech crew", "lighting crew", "sound crew",
                "private music lessons", "instrument lessons", "voice lessons",
                "art club member", "photography club", "film club member",
                // Work Experience
                "cashier", "retail associate", "sales associate", "store clerk",
                "server", "waiter", "waitress", "food service",
                "babysitter", "childcare provider", "nanny",
                "lawn care", "landscaping", "lawn mowing business",
                "dog walker", "pet sitter",
                // Leadership
                "club secretary", "club treasurer", "club historian",
                "founded school club", "started interest club", "created school organization",
                // Certifications
                "cpr certified", "first aid certified", "cpr first aid",
                "comptia it fundamentals", "comptia a+",
                "certified solidworks associate", "cswa", "solidworks certification",
                "excel certification", "microsoft office specialist",
                // Online Learning
                "coursera certificate", "edx certificate", "online course completion",
                "udemy certification", "codecademy completion",
                // Competitions/Awards
                "local essay contest", "essay contest honorable mention", "writing contest participant",
                "student of the month", "student of week", "citizenship award",
                "spelling bee participant", "geography bee", "history bee"
            ]
        ),
        
        // BRONZE I (1/10) - General Participation
        ActivityTier(
            score: 1,
            rankName: "Bronze I",
            description: "General participation and involvement",
            feedback: "You're building experience through participation. Focus on developing depth in one or two key areas.",
            levelUpAction: "Aim for leadership roles or consistent long-term commitment to move to Bronze II tier.",
            keywords: [
                // Hobbies/Personal Interest
                "hobby", "hobbies", "personal interest",
                "fitness", "gym member", "workout", "exercise",
                "gaming", "video games", "esports participant",
                "reading club", "book club", "avid reader",
                "photography", "amateur photographer", "photography interest",
                "blogging", "blog writer", "personal blog",
                "cooking", "baking", "culinary interest", "recreational cooking",
                "drawing", "sketching", "painting hobby",
                // School Clubs (General Member)
                "chess club", "chess club member",
                "anime club", "anime club member",
                "gardening club", "environmental club member",
                "film club", "movie club",
                "art club member", "visual arts club",
                "language club", "french club", "spanish club", "german club",
                "debate club member", "speech club member",
                "key club member", "interact club", "kiwanis",
                "coding club member", "computer science club",
                "robotics club member", "stem club",
                // Community Service (Basic)
                "library volunteer", "library assistant",
                "church choir", "church volunteer", "religious service",
                "animal shelter volunteer", "animal shelter helper",
                "park cleanup", "environmental cleanup", "beach cleanup",
                "soup kitchen volunteer", "food bank volunteer",
                "nursing home volunteer", "hospital volunteer",
                // Academic (Basic)
                "honor roll", "honor roll student",
                "perfect attendance", "attendance award",
                "1-2 ap courses", "taking ap classes", "honors student",
                "peer tutor", "study group", "homework helper",
                // Athletics (Recreational)
                "jv team", "junior varsity", "jv athlete",
                "intramural sports", "intramurals participant",
                "recreational league", "community sports", "club sports",
                "track and field participant", "cross country member",
                "soccer player", "basketball player", "volleyball player",
                "tennis player", "swimming", "baseball player",
                // General Involvement
                "club member", "active club participant",
                "school event volunteer", "school spirit",
                "pep band", "pep club", "spirit squad",
                "student ambassador", "school tour guide"
            ]
        )
    ]
    
    // MARK: - Analysis Function
    
    static func analyzeActivity(description: String, position: String, organization: String) -> (score: Int, rankName: String, description: String, feedback: String, levelUp: String) {
        
        let combinedText = "\(position) \(organization) \(description)".lowercased()
        
        // Find best matching tier based on keywords
        var bestMatch: ActivityTier = tiers.last! // Default to Bronze I
        var maxMatches = 0
        
        for tier in tiers {
            let matchCount = tier.keywords.filter { combinedText.contains($0) }.count
            if matchCount > maxMatches {
                maxMatches = matchCount
                bestMatch = tier
            }
        }
        
        // If no keyword matches, use heuristics
        if maxMatches == 0 {
            bestMatch = heuristicAnalysis(text: combinedText)
        }
        
        return (
            score: bestMatch.score,
            rankName: bestMatch.rankName,
            description: bestMatch.description,
            feedback: bestMatch.feedback,
            levelUp: bestMatch.levelUpAction
        )
    }
    
    // MARK: - Heuristic Analysis Fallback
    
    private static func heuristicAnalysis(text: String) -> ActivityTier {
        var score = 1
        
        // Leadership indicators
        if text.contains("president") || text.contains("founder") { score += 2 }
        else if text.contains("captain") || text.contains("lead") { score += 1 }
        
        // Competition indicators
        if text.contains("national") || text.contains("international") { score += 3 }
        else if text.contains("state") || text.contains("regional") { score += 2 }
        
        if text.contains("winner") || text.contains("champion") || text.contains("first place") { score += 2 }
        else if text.contains("finalist") || text.contains("award") { score += 1 }
        
        // Impact indicators
        if text.contains("founded") || text.contains("raised $") || text.contains("published") { score += 1 }
        
        score = min(score, 10)
        
        return tiers.first { $0.score == score } ?? tiers.last!
    }
}
