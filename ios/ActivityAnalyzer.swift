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
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 10,
            rankName: "Platinum II",
            description: "International olympiad medalist or equivalent world-class achievement",
            feedback: "You are in the absolute elite tier of high school achievers globally. This is the pinnacle of competitive achievement and will significantly strengthen applications to any institution.",
            levelUpAction: "At this level, focus on leveraging your achievement for research opportunities, mentorship roles, or entrepreneurial ventures that create lasting impact.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // MATH OLYMPIADS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // IMO - International Mathematical Olympiad
                "imo", "imo gold", "imo silver", "imo bronze", "imo medalist", "imo medal", "imo medallist",
                "imo 1st", "imo 1st place", "imo first", "imo first place", "imo #1",
                "imo 2nd", "imo 2nd place", "imo second", "imo second place", "imo #2",
                "imo 3rd", "imo 3rd place", "imo third", "imo third place", "imo #3",
                "imo winner", "imo champion", "imo top 10", "imo top 3", "imo finalist",
                "imo gold medal", "imo gold medalist", "imo gold medallist",
                "imo silver medal", "imo silver medalist", "imo bronze medal", "imo bronze medalist",
                "international math olympiad", "international math olympiad gold", "international math olympiad silver",
                "international math olympiad bronze", "international math olympiad medalist", "international math olympiad medal",
                "international math olympiad 1st", "international math olympiad first", "international math olympiad winner",
                "international math olympiad champion", "international math olympiad top",
                "international mathematical olympiad", "international mathematical olympiad gold", "international mathematical olympiad medalist",
                "international mathematical olympiad medal", "international mathematical olympiad winner",
                "international mathematics olympiad", "international mathematics olympiad gold",
                "team usa imo", "usa imo team", "imo team usa", "imo usa", "usa imo", "us imo team",
                "imo team member", "imo representative", "imo participant gold", "imo participant silver",
                "represented usa at imo", "representing usa at imo", "competed for usa at imo",
                "competed at imo", "competed in imo", "participated in imo",
                "won imo gold", "won imo silver", "won imo medal", "earned imo gold", "earned imo medal",
                "placed 1st imo", "placed first imo", "placed 2nd imo", "placed 3rd imo",
                "top scorer imo", "high scorer imo", "perfect score imo",
                
                // ═══════════════════════════════════════════════════════
                // CS/INFORMATICS OLYMPIADS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // IOI - International Olympiad in Informatics
                "ioi", "ioi gold", "ioi silver", "ioi bronze", "ioi medalist", "ioi medal", "ioi medallist",
                "ioi 1st", "ioi 1st place", "ioi first", "ioi first place", "ioi #1",
                "ioi 2nd", "ioi 2nd place", "ioi second", "ioi second place",
                "ioi 3rd", "ioi 3rd place", "ioi third", "ioi third place",
                "ioi winner", "ioi champion", "ioi top 10", "ioi top 3", "ioi finalist",
                "ioi gold medal", "ioi gold medalist", "ioi silver medal", "ioi bronze medal",
                "international olympiad in informatics", "international olympiad in informatics gold",
                "international olympiad in informatics silver", "international olympiad in informatics medalist",
                "international olympiad informatics", "international olympiad informatics gold",
                "international olympiad informatics medalist", "international informatics olympiad",
                "international informatics olympiad gold", "informatics olympiad medal", "informatics olympiad gold",
                "team usa ioi", "usa ioi team", "ioi team usa", "ioi usa", "usa ioi", "us ioi team",
                "ioi team member", "ioi representative", "represented usa at ioi", "competed for usa at ioi",
                "won ioi gold", "won ioi silver", "won ioi medal", "earned ioi gold",
                "placed 1st ioi", "placed first ioi", "top scorer ioi",
                
                // ═══════════════════════════════════════════════════════
                // SCIENCE OLYMPIADS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // ICHO - Chemistry
                "icho", "icho gold", "icho silver", "icho bronze", "icho medalist", "icho medal",
                "icho 1st", "icho 1st place", "icho first", "icho first place",
                "icho 2nd", "icho 2nd place", "icho 3rd", "icho 3rd place",
                "icho winner", "icho champion", "icho gold medal", "icho gold medalist",
                "international chemistry olympiad", "international chemistry olympiad gold",
                "international chemistry olympiad silver", "international chemistry olympiad medalist",
                "international chemistry olympiad medal", "chemistry olympiad gold medal",
                "chemistry olympiad international gold", "chemistry olympiad medal",
                "team usa icho", "usa icho team", "icho team usa", "icho usa",
                "represented usa at icho", "won icho gold", "earned icho medal",
                
                // IBO - Biology
                "ibo", "ibo gold", "ibo silver", "ibo bronze", "ibo medalist", "ibo medal",
                "ibo 1st", "ibo 1st place", "ibo first", "ibo first place",
                "ibo 2nd", "ibo 2nd place", "ibo 3rd", "ibo 3rd place",
                "ibo winner", "ibo champion", "ibo gold medal", "ibo gold medalist",
                "international biology olympiad", "international biology olympiad gold",
                "international biology olympiad silver", "international biology olympiad medalist",
                "international biology olympiad medal", "biology olympiad gold medal",
                "biology olympiad international gold", "biology olympiad medal",
                "team usa ibo", "usa ibo team", "ibo team usa", "ibo usa",
                "represented usa at ibo", "won ibo gold", "earned ibo medal",
                
                // IPhO - Physics
                "ipho", "ipho gold", "ipho silver", "ipho bronze", "ipho medalist", "ipho medal",
                "ipho 1st", "ipho 1st place", "ipho first", "ipho first place",
                "ipho 2nd", "ipho 2nd place", "ipho 3rd", "ipho 3rd place",
                "ipho winner", "ipho champion", "ipho gold medal", "ipho gold medalist",
                "international physics olympiad", "international physics olympiad gold",
                "international physics olympiad silver", "international physics olympiad medalist",
                "international physics olympiad medal", "physics olympiad gold medal",
                "physics olympiad international gold", "physics olympiad medal",
                "team usa ipho", "usa ipho team", "ipho team usa", "ipho usa",
                "represented usa at ipho", "won ipho gold", "earned ipho medal",
                
                // Other International Science Olympiads
                "iao gold", "international astronomy olympiad gold", "astronomy olympiad gold",
                "ieso gold", "international earth science olympiad gold",
                "ijso gold", "international junior science olympiad gold",
                
                // ═══════════════════════════════════════════════════════
                // RESEARCH COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Regeneron STS (Science Talent Search)
                "regeneron sts", "regeneron sts top 10", "regeneron sts top ten", "regeneron sts winner",
                "regeneron sts 1st", "regeneron sts 1st place", "regeneron sts first", "regeneron sts first place",
                "regeneron sts 2nd", "regeneron sts 3rd", "regeneron sts champion",
                "regeneron sts grand prize", "regeneron sts top award",
                "regeneron science talent search", "regeneron science talent search top 10",
                "regeneron science talent search winner", "regeneron science talent search 1st place",
                "sts winner", "sts top 10", "sts finalist top 10", "sts champion",
                "sts 1st place", "sts first place", "sts grand prize",
                "science talent search winner", "science talent search top 10",
                "won regeneron sts", "won sts", "placed 1st sts", "top 10 regeneron sts",
                
                // ISEF (International Science and Engineering Fair)
                "isef grand prize", "isef grand award", "isef grand prize winner",
                "isef 1st place grand", "isef first place grand", "isef grand champion",
                "gordon e. moore award", "gordon moore award", "moore award isef",
                "isef best of category", "isef category winner", "isef top award", "isef best in show",
                "intel isef grand prize", "regeneron isef grand prize",
                "international science and engineering fair grand prize",
                "won isef grand prize", "won gordon moore award", "earned isef grand prize",
                "isef category 1st place", "isef first place overall", "isef grand prize recipient",
                
                // ═══════════════════════════════════════════════════════
                // ENTREPRENEURSHIP - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Thiel Fellowship
                "thiel fellow", "thiel fellowship", "thiel fellowship winner", "thiel fellowship recipient",
                "peter thiel fellowship", "peter thiel fellow", "20 under 20 thiel", "thiel 20 under 20",
                "selected for thiel fellowship", "awarded thiel fellowship", "won thiel fellowship",
                "thiel foundation fellow", "thiel foundation fellowship",
                
                // Revenue Achievements
                "$100k+ revenue", "$100k revenue", "$100k+ in revenue", "$100k in revenue",
                "100k+ revenue", "100k revenue", "100k+ in revenue", "100k in revenue",
                "$100,000+ revenue", "$100,000 revenue", "$100000 revenue", "$100000+ revenue",
                "six figure revenue", "six-figure revenue", "6 figure revenue", "6-figure revenue",
                "$150k+ revenue", "$200k+ revenue", "$250k+ revenue", "$500k+ revenue",
                "$1m+ revenue", "$1m revenue", "$1 million revenue", "million dollar revenue",
                "seven figure revenue", "7 figure revenue",
                "generated $100k+", "generated $100k", "made $100k+",  "earned $100k+ revenue",
                "company revenue $100k+", "startup revenue $100k+", "business $100k+ revenue",
                
                // Y Combinator
                "y combinator", "y combinator accepted", "y combinator acceptance",
                "yc accepted", "yc acceptance", "yc startup", "yc company", "yc backed",
                "y combinator backed", "y combinator funded", "yc funded",
                "accepted to y combinator", "accepted to yc", "admitted to y combinator",
                "got into y combinator", "got into yc", "joined y combinator", "joined yc",
                
                // TechStars
                "techstars", "techstars accepted", "techstars acceptance", "techstars accelerator",
                "techstars backed", "techstars funded", "techstars program", "techstars company",
                "accepted to techstars", "admitted to techstars", "joined techstars",
                
                // ═══════════════════════════════════════════════════════
                // INNOVATION AWARDS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                "breakthrough junior challenge", "breakthrough junior challenge winner",
                "breakthrough junior challenge 1st", "breakthrough junior challenge first",
                "breakthrough junior challenge champion", "breakthrough prize winner",
                "breakthrough junior winner", "won breakthrough junior challenge",
                "3m young scientist", "3m young scientist winner", "3m young scientist 1st place",
                "3m young scientist champion", "won 3m young scientist",
                "google science fair", "google science fair winner", "google science fair 1st place",
                "google science fair grand prize", "google science fair champion",
                "won google science fair", "google science fair top award",
                
                // ═══════════════════════════════════════════════════════
                // SPORTS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Olympics
                "olympic medalist", "olympic medal", "olympics medalist", "olympics medal",
                "olympic gold", "olympic gold medal", "olympic gold medalist", "olympics gold",
                "olympic silver", "olympic silver medal", "olympic silver medalist", "olympics silver",
                "olympic bronze", "olympic bronze medal", "olympic bronze medalist", "olympics bronze",
                "olympic qualifier", "olympics qualifier", "qualified for olympics", "qualified for olympic games",
                "olympic games medalist", "olympic games qualifier", "olympic trials qualifier",
                "competed in olympics", "participated in olympics", "olympic athlete",
                "made olympic team", "olympic team member", "us olympic team",
                "won olympic medal", "earned olympic medal",
                
                // World Championships
                "world champion", "world championship winner", "world championship gold",
                "world championship 1st", "world championship 1st place", "world championship first place",
                "world champion in", "world championship medalist", "world championship medal",
                "won world championship", "world title", "world champion title",
                "global champion", "international champion",
                
                // National Championships (Tier 1 Sports)
                "national champion", "national championship winner", "national champion swimmer",
                "national swimming champion", "usa swimming national champion",
                "national champion tennis", "national tennis champion", "usta national champion",
                "national champion golf", "national golf champion", "usga champion",
                "national champion track", "national champion cross country",
                "junior national champion", "youth national champion",
                
                // ═══════════════════════════════════════════════════════
                // ARTS & PERFORMING ARTS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Grammy
                "grammy", "grammy nominee", "grammy nominated", "grammy nomination",
                "grammy award", "grammy winner", "won grammy", "earned grammy nomination",
                "nominated for grammy", "grammy finalist",
                
                // Tony Award
                "tony award", "tony award winner", "tony award nominee", "tony nomination",
                "won tony award", "earned tony nomination", "nominated for tony",
                "tony award finalist",
                
                // Publishing
                "major published author", "published author", "published with major publisher",
                "big 5 publisher", "big five publisher", "big 5 published", "big five published",
                "penguin random house", "penguin random house published", "published by penguin random house",
                "harpercollins", "harpercollins published", "published by harpercollins",
                "simon schuster", "simon and schuster", "simon & schuster published",
                "macmillan", "macmillan published", "published by macmillan",
                "hachette", "hachette published", "published by hachette",
                "traditionally published", "traditional publishing deal",
                "book published major publisher", "novel published major publisher",
                
                // ═══════════════════════════════════════════════════════
                // CIVIC LEADERSHIP - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Boys/Girls Nation
                "boys nation president", "boys nation prez", "president of boys nation",
                "american legion boys nation president", "elected president boys nation",
                "girls nation president", "girls nation prez", "president of girls nation",
                "american legion girls nation president", "elected president girls nation",
                
                // Senate Youth Program
                "ussyp", "ussyp delegate", "ussyp representative", "ussyp participant",
                "ussyp national representative", "us senate youth program",
                "us senate youth program delegate", "us senate youth program representative",
                "senate youth program", "senate youth program delegate", "senate youth program participant",
                "united states senate youth program",
                
                // National Student Poet
                "national student poet", "national youth poet laureate", "national student poet laureate",
                "student poet laureate", "youth poet laureate", "us poet laureate",
                
                // ═══════════════════════════════════════════════════════
                // TOP-TIER PUBLICATIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Nature
                "nature", "nature publication", "published in nature", "nature paper",
                "nature journal", "nature article", "nature author",
                "first author nature", "lead author nature", "co-author nature",
                "paper in nature", "article in nature", "published nature",
                "nature communications", "nature methods", "nature genetics",
                
                // Science (AAAS)
                "science publication", "published in science", "science paper",
                "science journal", "science aaas", "science article", "science author",
                "first author science", "lead author science", "co-author science",
                "paper in science", "article in science", "published science",
                "science advances", "science immunology",
                
                // Cell
                "cell publication", "published in cell", "cell paper",
                "cell journal", "cell press", "cell article", "cell author",
                "first author cell", "lead author cell", "co-author cell",
                "paper in cell", "article in cell", "published cell",
                "cell reports", "cell stem cell",
                
// ═══════════════════════════════════════════════════════════
                // ADDITIONAL INTERNATIONAL COMPETITIONS
                // ═══════════════════════════════════════════════════════
                "intel sts winner", "siemens competition winner", "siemens westinghouse winner",
                "coca cola scholar", "coca-cola scholar", "coca cola scholarship",
                "davidson fellow", "davidson fellowship", "davidson fellows",
                "national merit $2500", "national merit scholarship $2500",
                
                // International Debate
                "world schools debate champion", "wsdc champion", "world schools champion",
                "international debate champion", "world debate champion",
                
                // International Linguistics
                "ilo gold", "international linguistics olympiad gold",
                "naclo absolute winner", "naclo international"
            ]
        ),
        
        // PLATINUM I (9/10) - National Elite/D1 Recruit
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 9,
            rankName: "Platinum I",
            description: "Elite national competition finalist or D1 recruited athlete",
            feedback: "You demonstrate exceptional mastery in your field at the national level. This achievement puts you among the top students nationwide and is highly impressive to admissions committees.",
            levelUpAction: "Consider expanding your impact through research publications, founding an organization, or pursuing international competitions to reach Platinum II.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // MATH COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // USACO Camp
                "usaco camp", "usaco training camp", "usaco camp invitation", "usaco camp participant",
                "usaco camp invited", "invited to usaco camp", "usaco camp attendee", "usaco camp selection",
                "usa computing olympiad camp", "usaco training program", "usaco national camp",
                
                // MOP (Math Olympiad Program)
                "mop", "mop red", "mop blue", "mop black", "mop participant", "mop attendee",
                "mop invitation", "mop invited", "invited to mop", "mop student",
                "math olympiad program", "mathematical olympiad program", "matholy program",
                "mop red mop", "mop blue mop", "mopred", "mopblue",
                "mosp", "mosp participant", "mosp camp", "mosp attendee", "mosp invited",
                "mathematical olympiad summer program",
                "attended mop", "attended mosp", "selected for mop", "selected for mosp",
                
                // US Physics Team
                "us physics team", "us physics team member", "usa physics team", "usapho team",
                "physics team usa", "team usa physics", "us physics olympiad team",
                "physics camp", "physics olympiad camp", "usapho camp", "physics training camp",
                "us physics team selection", "selected for us physics team",
                "made us physics team", "competed for us physics team",
                
                // ═══════════════════════════════════════════════════════
                // ELITE RESEARCH PROGRAMS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // RSI (Research Science Institute)
                "rsi", "rsi participant", "rsi attendee", "rsi scholar", "rsi fellow", "rsi student",
                "rsi admitted", "rsi accepted", "rsi selection", "rsi program",
                "research science institute", "research science institute participant",
                "research science institute attendee", "research science institute scholar",
                "rsi mit", "mit rsi", "rsi at mit", "cee rsi",
                "admitted to rsi", "accepted to rsi", "selected for rsi", "invited to rsi",
                "attended rsi", "rsi summer", "rsi research",
                
                // Regeneron STS Top 40/Finalist
                "regeneron sts top 40", "regeneron sts top 40 finalist", "regeneron sts finalist",
                "regeneron science talent search top 40", "regeneron science talent search finalist",
                "sts top 40", "sts finalist", "sts top 40 finalist",
                "regeneron finalist", "regeneron scholar", "regeneron sts scholar",
                "regeneron sts semi-finalist", "regeneron semi-finalist",
                "selected regeneron sts finalist", "named regeneron sts finalist",
                
                // ═══════════════════════════════════════════════════════
                // D1 ATHLETIC RECRUITING - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // D1 Recruitment
                "d1", "d1 recruited", "d1 recruit", "d1 recruitment", "d1 commitment",
                "d1 commit", "d1 committed", "d1 scholarship", "d1 offer",
                "division 1", "division 1 recruited", "division 1 recruit", "division1",
                "division one", "division one recruited", "division i", "division i recruited",
                "d1 athletic scholarship", "d1 full scholarship", "d1 full ride",
                "d1 signed", "d1 scholarship offer", "d1 verbal commit",
                "committed to d1", "committed d1", "committing to d1",
                "recruited by d1", "recruiting by d1 school", "d1 recruiting",
                "ncaa d1", "ncaa division 1", "ncaa division one",
                "power 5 recruited", "power five recruited", "powerconference recruited",
                "d1 program", "d1 college", "d1 university",
                
                // All-American
                "all-american", "all american", "all-american athlete", "all american athlete",
                "high school all-american", "prep all-american", "hs all-american",
                "all american selection", "all-american team", "all american honors",
                "named all-american", "selected all-american", "earned all-american",
                "first team all-american", "all-american first team",
                "second team all-american", "all-american second team",
                
                // National Team
                "national team", "national team member", "national team selection",
                "us national team", "usa national team", "team usa", "us team",
                "made national team", "selected for national team", "selected to national team",
                "national team athlete", "national team selection", "national team candidate",
                "junior national team", "youth national team", "u18 national team", "u19 national team",
                "competed for national team", "represented national team",
                
                // ═══════════════════════════════════════════════════════
                // ARTS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // YoungArts
                "youngarts", "youngarts finalist", "youngarts national finalist",
                "nfaa youngarts", "nfaa youngarts finalist", "nfaa finalist",
                "national foundation for advancement in the arts", "nfaa winner",
                "youngarts week", "youngarts miami", "youngarts scholarship",
                "selected youngarts finalist", "named youngarts finalist",
                "youngarts winner", "youngarts award",
                
                // Presidential Scholar in the Arts
                "presidential scholar", "presidential scholar arts", "presidential scholar in the arts",
                "us presidential scholar", "us presidential scholar in arts",
                "presidential scholar nominee", "presidential scholar candidate",
                "presidential scholar finalist", "nominated presidential scholar",
                "presidential scholars program",
                
                // Elite Music Conservatories/Pre-College
                "juilliard", "juilliard pre-college", "juilliard precollege", "juilliard pre college",
                "juilliard student", "juilliard pre-college student", "juilliard admitted",
                "accepted to juilliard pre-college", "juilliard pre-college program",
                "curtis", "curtis institute", "curtis institute student", "curtis institute admitted",
                "curtis young artist", "accepted to curtis", "curtis pre-college",
                "manhattan school of music", "msm pre-college", "msm precollege",
                "manhattan school pre-college", "msm student",
                "colburn", "colburn school", "colburn conservatory", "colburn student",
                "new england conservatory", "nec pre-college", "nec prep",
                "cleveland institute", "cim pre-college",
                
                // ═══════════════════════════════════════════════════════
                // NATIONAL COMPETITIONS - EXHAUSTIVE COVERAGE
                //═══════════════════════════════════════════════════════
                // National Science Bowl
                "national science bowl", "national science bowl winner", "national science bowl champion",
                "national science bowl 1st place", "national science bowl 1st", "national science bowl first place",
                "national science bowl 2nd", "national science bowl 3rd", "national science bowl top 5",
                "science bowl nationals", "science bowl national champion", "science bowl nationals winner",
                "science bowl champion", "doe science bowl", "doe science bowl champion",
                "won national science bowl", "placed 1st national science bowl",
                "science bowl national competition winner",
                
                // MATHCOUNTS Nationals
                "mathcounts nationals", "mathcounts national competition", "mathcounts national competitor",
                "mathcounts nationals top 10", "mathcounts nationals top", "mathcounts national champion",
                "mathcounts nationals 1st place", "mathcounts nationals winner",
                "mathcounts national finalist", "mathcounts countdown round",
                "mathcounts nationals participant", "competed at mathcounts nationals",
                "won mathcounts nationals", "placed at mathcounts nationals",
                
                // ═══════════════════════════════════════════════════════
                // ROBOTICS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // VEX Worlds
                "vex", "vex worlds", "vex world championship", "vex robotics world championship",
                "vex worlds champion", "vex world champion", "vex robotics world champion",
                "vex worlds 1st place", "vex worlds first place", "vex world championship winner",
                "vex worlds finalist", "vex worlds top 10", "vex worlds competitor",
                "vex world championship finalist", "competed at vex worlds",
                "won vex worlds", "vex worlds division winner", "vex worlds excellence award",
                
                // FIRST Robotics Worlds
                "first", "first worlds", "first world championship", "first robotics world championship",
                "first world champion", "first robotics world champion", "frc world champion",
                "first world championship winner", "first worlds champion",
                "frc", "frc worlds", "frc world championship", "frc worlds champion",
                "frc einstein", "frc einstein field", "frc championship",
                "ftc", "ftc worlds", "ftc world championship", "ftc worlds champion",
                "ftc world champion", "ftc world championship winner",
                "competed at first worlds", "competed at frc worlds", "competed at ftc worlds",
                "won first worlds", "won frc worlds", "first championship finalist",
                
                // ═══════════════════════════════════════════════════════
                // BUSINESS COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // DECA ICDC
                "deca icdc", "deca international", "deca internationals",
                "deca icdc 1st place", "deca icdc first place", "deca icdc winner", "deca icdc champion",
                "deca icdc 1st", "deca icdc first", "deca icdc finalist", "deca icdc top 10",
                "deca international career development conference",
                "deca international 1st", "deca internationals champion",
                "won deca icdc", "placed 1st deca icdc", "deca icdc medalist",
                "deca icdc gold", "deca icdc glass trophy",
                
                // FBLA Nationals
                "fbla nationals", "fbla national leadership conference", "fbla nlc",
                "fbla nationals 1st place", "fbla nationals first place", "fbla nationals winner",
                "fbla national champion", "fbla nationals champion", "fbla nationals 1st",
                "fbla nationals top 10", "fbla nationals finalist",
                "won fbla nationals", "placed 1st fbla nationals",
                
                // Revenue (Tier 1: $50k+)
                "$50k+ revenue", "$50k revenue", "$50k+ in revenue", "$50k in revenue",
                "50k+ revenue", "50k revenue", "50k+ in revenue", "50k in revenue",
                "$50,000+ revenue", "$50,000 revenue", "$50000 revenue",
                "$60k+ revenue", "$75k+ revenue", "$80k+ revenue", "$90k+ revenue",
                "generated $50k+", "generated $50k", "made $50k+", "earned $50k+ revenue",
                "company revenue $50k+", "startup revenue $50k+", "business $50k+ revenue",
                "five figure revenue high", "high five figure revenue",
                
                // ═══════════════════════════════════════════════════════
                // CIVIC LEADERSHIP - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // National Youth Poet Laureate
                "youth poet laureate", "youth poet laureate national", "national youth poet laureate",
                "national student poet", "student poet laureate",
                "selected youth poet laureate", "named youth poet laureate",
                
                // Rhodes/Marshall Scholarships
                "marshall", "marshall scholar", "marshall scholarship", "marshall scholarship winner",
                "marshall scholarship recipient", "won marshall scholarship",
                "selected for marshall", "marshall finalist",
                "rhodes", "rhodes scholar", "rhodes scholarship", "rhodes finalist",
                "rhodes scholar finalist", "rhodes scholarship finalist",
                "rhodes scholarship candidate", "rhodes finalist",
                
                // ═══════════════════════════════════════════════════════
                // DEBATE - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                "toc champion", "tournament of champions champion", "toc winner",
                "toc finals", "toc finalist", "tournament of champions winner",
                "won toc", "won tournament of champions",
                "nsda nationals champion", "nsda nationals winner", "nsda nationals finalist",
                "national speech and debate", "national speech debate champion",
                
                // ═══════════════════════════════════════════════════════
                // ADDITIONAL ELITE PROGRAMS
                // ═══════════════════════════════════════════════════════
                "clark scholar", "clark scholars program", "texas techclark scholars",
                "garcia program", "garcia research", "garcia program garcia",
                "ssa program", "student science training", "student science training program",
                "simons summer research", "mir program mit",
                "sharp program", "stanford institutes of medicine summer research program"
            ]
        ),
        
        // DIAMOND II (8/10) - National Finalist/Top Tier
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 8,
            rankName: "Diamond II",
            description: "National olympiad finalist or significant research recognition",
            feedback: "Your achievement demonstrates elite competitiveness at the national stage. This is a standout accomplishment that significantly strengthens your academic profile.",
            levelUpAction: "To reach Platinum level, aim for top placements in national competitions or pursue publication in high-impact journals.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // MATH OLYMPIAD QUALIFIERS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // USAMO (USA Mathematical Olympiad)
                "usamo", "usamo qualifier", "usamo qualified", "usamo participant", "usamo competitor",
                "usamo winner", "usamo top scorer", "usamo high scorer", "usamo perfect score",
                "usa mathematical olympiad", "usa math olympiad", "us amo",
                "qualified for usamo", "made usamo", "selected for usamo",
                "usamo qualification", "usamo bronze", "usamo silver", "usamo gold",
                "usamo top 12", "usamo top 20", "usamo top 30",
                
                // USAJMO (USA Junior Mathematical Olympiad)
                "usajmo", "usajmo winner", "usajmo qualifier", "usajmo qualified", "usajmo participant",
                "usa junior mathematical olympiad", "usa junior math olympiad",
                "qualified for usajmo", "made usajmo",
                "usajmo top scorer", "usajmo perfect score", "usajmo high scorer",
                
                // AMC (American Mathematics Competition) Perfect Scores
                "amc perfect score", "amc 12 perfect score", "amc 10 perfect score",
                "amc 12 perfect", "amc 10 perfect", "perfect amc 12", "perfect amc 10",
                "amc 150", "amc 12 150", "amc 10 120", "perfect score amc",
                "scored perfect amc", "perfect scored on amc",
                
                // ═══════════════════════════════════════════════════════
                // SCIENCE OLYMPIAD SEMI-FINALISTS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // USNCO (Chemistry)
                "usnco", "usnco top 20", "usnco top 50", "usnco finalist", "usnco study camp",
                "usnco high honors", "usnco camp", "usnco national finalist",
                "us national chemistry olympiad", "usa chemistry olympiad",
                "chemistry olympiad finalist", "chemistry olympiad top 20",
                "qualified for usnco camp", "selected for usnco camp",
                
                // USABO (Biology)
                "usabo", "usabo top 20", "usabo top 50", "usabo finalist", "usabo semifinalist",
                "usabo semi-finalist", "usabo camp finalist", "usabo national finalist",
                "us biology olympiad", "usa biology olympiad",
                "biology olympiad finalist", "biology olympiad semifinalist",
                "qualified for usabo camp", "usabo semifinalist",
                
                // USAPhO (Physics)
                "usapho", "usapho top 20", "usapho top 50", "usapho finalist", "usapho semifinalist",
                "usapho semi-finalist", "usapho camp", "usapho national finalist",
                "us physics olympiad", "usa physics olympiad",
                "physics olympiad finalist", "physics olympiad semifinalist",
                "qualified for usapho camp",
                
                // USACO (Computing)
                "usaco platinum", "usaco plat", "usaco platinum division", "usaco plat division",
                "usaco gold", "usaco gold division", "promoted to usaco platinum",
                "made usaco platinum", "reached usaco platinum",
                
                // ═══════════════════════════════════════════════════════
                // RESEARCH COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Regeneron STS
                "regeneron sts scholar", "regeneron sts top 300", "regeneron sts semifinalist",
                "regeneron science talent search scholar", "regeneron science talent search semifinalist",
                "sts scholar", "sts top 300", "sts semifinalist", "sts semi-finalist",
                "selected regeneron sts scholar", "named regeneron sts scholar",
                
                // ISEF (International Science and Engineering Fair)
                "isef", "isef finalist", "isef category award", "isef special award",
                "isef 1st place", "isef first place", "isef 2nd place", "isef second place",
                "isef 3rd place", "isef third place", "isef 4th place", "isef fourth place",
                "isef category 1st", "isef category first", "isef category winner",
                "intel isef", "intel isef finalist", "regeneron isef",  "regeneron isef finalist",
                "international science and engineering fair", "international science fair finalist",
                "won isef category award", "earned isef award", "placed at isef",
                
                // JSHS (Junior Science and Humanities Symposium)
                "jshs", "jshs national finalist", "jshs national", "jshs finalist",
                "junior science and humanities symposium", "junior science humanities symposium",
                "jshs national competition", "jshs nationals", "jshs national symposium",
                "won jshs", "jshs winner", "jshs national winner",
                
                // Siemens Competition
                "siemens", "siemens competition", "siemens finalist", "siemens semifinalist",
                "siemens competition finalist", "siemens westinghouse", "siemens westinghouse finalist",
                "siemens regional finalist", "siemens national finalist",
                
                // ═══════════════════════════════════════════════════════
                // STATE CHAMPIONSHIPS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // State Science Fair
                "state science fair", "state science fair winner", "state science fair champion",
                "state science fair 1st place", "state science fair first place",
                "state science fair 1st", "state science fair first",
                "state science fair gold", "state science fair grand prize",
                "won state science fair", "state fair winner", "state fair champion",
                "state science fair finalist", "state science fair top 3",
                
                // State MATHCOUNTS
                "state mathcounts", "state mathcounts winner", "state mathcounts champion",
                "mathcounts state winner", "mathcounts state champion", "mathcounts state 1st place",
                "mathcounts state first place", "mathcounts state gold",
                "won mathcounts state", "won state mathcounts",
                
                // State Science Olympiad
                "state science olympiad", "state scioly", "science olympiad state",
                "scioly state", "state science olympiad winner", "state science olympiad champion",
                "science olympiad state winner", "science olympiad state champion",
                "state scioly champion", "state scioly winner",
                "state science olympiad 1st place", "state science olympiad gold",
               "won state science olympiad", "won state scioly",
                
                // State Debate
                "state debate", "state debate champion", "state debate winner", "state debate 1st place",
                "debate state champion", "debate state winner", "debate state tournament winner",
                "won state debate", "state debate finalist", "state debate top speaker",
                
                // State Robotics
                "state robotics", "state robotics champion", "state robotics winner",
                "robotics state champion", "robotics state winner", "state robotics 1st place",
                "state vex champion", "state first robotics champion", "state ftc champion",
                "won state robotics", "won state vex", "won state ftc",
                
                // ═══════════════════════════════════════════════════════
                // PUBLICATIONS & RESEARCH - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Peer-Reviewed Publications
                "peer-reviewed publication", "peer reviewed publication", "peer-reviewed paper",
                "peer reviewed paper", "peer-reviewed research", "peer reviewed research",
                "published researcher", "published research paper", "published paper",
                "first author", "first author research", "first author paper", "first author publication",
                "lead author", "lead author research", "lead author paper",
                "co-author", "co-author publication", "co-author paper", "co-author research",
                "author on paper", "author on publication", "research author",
                "journal publication", "journal paper", "published in journal",
                "conference publication", "conference paper", "published at conference",
                
                // ═══════════════════════════════════════════════════════
                // CIVIC LEADERSHIP - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Boys/Girls Nation
                "boys nation", "boys nation senator", "boys nation delegate", "american legion boys nation",
                "elected boys nation senator", "senator at boys nation",
                "girls nation", "girls nation senator", "girls nation delegate", "american legion girls nation",
                "elected girls nation senator", "senator at girls nation",
                
                // Senate Youth Program
                "ussyp", "ussyp participant", "ussyp delegate", "senate youth program",
                "us senate youth program", "senate youth program participant",
                "senate youth program delegate", "selected for ussyp",
                
                // Congressional Award
                "congressional award", "congressional award gold", "congressional award gold medal",
                "congressional gold medal", "congressional gold",
                "earned congressional award gold", "won congressional award",
                
                // ═══════════════════════════════════════════════════════
                // TECH & OPEN SOURCE - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Google Summer of Code
                "google summer of code", "gsoc", "gsoc participant", "gsoc contributor",
                "google summer of code participant", "google summer of code developer",
                "selected for gsoc", "accepted to gsoc", "gsoc project",
                
                // Major Open Source
                "open source contributor", "major open source contributor", "core open source contributor",
                "linux contributor", "linux kernel contributor", "contributed to linux",
                "react contributor", "contributed to react", "react core contributor",
                "tensorflow contributor", "pytorch contributor", "kubernetes contributor",
                "major github contributor", "top github contributor",
                "maintainer open source", "open source maintainer",
                
                // ═══════════════════════════════════════════════════════
                // BUSINESS & ENTREPRENEURSHIP - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                "thiel fellowship finalist", "thiel finalist", "thiel fellowship semi-finalist",
                "thiel fellowship candidate", "thiel fellowship applicant top",
                
                // Revenue ($25k+)
                "$25k+ revenue", "$25k revenue", "$25k+ in revenue", "$25k in revenue",
                "25k+ revenue", "25k revenue", "25k+ in revenue", "25k in revenue",
                "$25,000+ revenue", "$25,000 revenue", "$25000 revenue",
                "$30k+ revenue", "$35k+ revenue", "$40k+ revenue", "$45k+ revenue",
                "generated $25k+", "generated $25k", "made $25k+", "earned $25k+ revenue",
                "company revenue $25k+", "startup revenue $25k+", "business $25k+ revenue",
                
                // Y Combinator Interview
                "y combinator interview", "yc interview", "interviewed at y combinator",
                "interviewed at yc", "y combinator finalist", "yc finalist",
                
                // ═══════════════════════════════════════════════════════
                // ARTS & MUSIC - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Jimmy Awards (Musical Theater)
                "jimmy awards", "jimmy awards finalist", "jimmy awards national finalist",
                "national high school musical theater awards", "nhsmta",
                "nhsmta finalist", "competed at jimmy awards",
                
                // NYO-USA (National Youth Orchestra)
                "nyo-usa", "nyo usa", "national youth orchestra", "national youth orchestra usa",
                "nyo participant", "selected for nyo-usa", "nyo-usa member",
                
                // Regional Orchestras
                "all-eastern orchestra", "all eastern orchestra", "all-eastern ensemble",
                "all-national ensemble", "all national ensemble", "all-national orchestra",
                "national honor ensemble", "national honor orchestra",
                
                // ═══════════════════════════════════════════════════════
                // DEBATE - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                "toc champion", "tournament of champions champion", "toc winner",
                "tournament of champions winner", "won toc", "won tournament of champions",
                "nsda nationals finalist", "nsda national finalist", "nsda nationals breaker",
                "national speech and debate finalist", "national speech debate finalist",
                
                // ═══════════════════════════════════════════════════════
                // SPORTS - D2/D3 RECRUITING
                // ═══════════════════════════════════════════════════════
                "d2 recruited", "d2 recruit", "d2 commitment", "d2 commit", "d2 scholarship",
                "division 2 recruited", "division 2 recruit", "division ii recruited",
                "d2 signed", "d2 athletic scholarship", "committed d2",
                "d3 recruited", "d3 recruit", "d3 commitment", "d3 commit", "d3 scholarship",
                "division 3 recruited", "division 3 recruit", "division iii recruited",
                "d3 signed", "committed d3",
                
                // All-State Athletics
                "all-state", "all state", "all-state athlete", "all-state selection",
                "all state athlete", "named all-state", "selected all-state",
                "first team all-state", "all-state first team",
                "second team all-state", "all-state second team",
                "all-state honors", "earned all-state",
                
                // State MVP/Records
                "state mvp", "state most valuable player", "state player of the year",
                "state player of year", "named state mvp",
                "state record", "state record holder", "holds state record",
                "broke state record", "set state record", "state record in"
            ]
        ),
        
        // DIAMOND I (7/10) - National Qualifier/Elite Programs
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 7,
            rankName: "Diamond I",
            description: "National competition qualifier or highly selective summer program",
            feedback: "You have achieved recognition at the national level, demonstrating strong expertise and dedication. This is highly competitive for top universities.",
            levelUpAction: "Focus on advancing to finalist rounds in national competitions or publishing original research to reach Diamond II.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // MATH COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // AIME (American Invitational Mathematics Examination)
                "aime", "aime qualifier", "aime qualified", "aime qualification", "aime participant",
                "made aime", "qualified for aime", "selected for aime", "invited to aime",
                "aime score", "aime score 10+", "aime score 10", "aime score 11+", "aime score 12+",
                "aime high scorer", "aime distinction", "aime distinguished",
                "american invitational mathematics examination",
                
                // AMC Distinction
                "amc distinction", "amc 12 distinction", "amc 10 distinction",
                "amc distinguished", "amc 12 distinguished", "amc 10 distinguished",
                "amc honor roll", "amc 12 honor roll", "amc 10 honor roll",
                "amc high scorer", "amc top scorer",
                
                // USAJMO Qualifier
                "usajmo qualifier", "usajmo qualified", "qualified for usajmo",
                "usajmo qualification", "usajmo invite", "invited to usajmo",
                
                // MATHCOUNTS State
                "mathcounts state", "mathcounts state winner", "mathcounts state top 10",
                "mathcounts state champion", "mathcounts state finalist",
                "mathcounts state top 4", "mathcounts state countdown",
                
                // ═══════════════════════════════════════════════════════
                // CS COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                "usaco platinum", "usaco plat", "usaco platinum division", "usaco plat division",
                "usaco gold", "usaco gold division", "usaco silver division",
                "promoted to usaco platinum", "promoted to usaco gold",
                "made usaco platinum", "reached usaco platinum",
                "usa computing olympiad platinum", "usa computing olympiad gold",
                
                // ═══════════════════════════════════════════════════════
                // SCIENCE OLYMPIADS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Science Olympiad Nationals
                "science olympiad nationals", "scioly nationals", "science olympiad national tournament",
                "competed at science olympiad nationals", "competed at scioly nationals",
                "science olympiad nationals competitor", "science olympiad nationals participant",
                "qualified for science olympiad nationals", "made science olympiad nationals",
                
                // USNCO High Honors
                "usnco high honors", "usnco honors", "usnco national exam high honors",
                "us national chemistry olympiad high honors",
                
                // USABO Semifinalist
                "usabo semifinalist", "usabo semi-finalist", "usabo top 10%",
                "us biology olympiad semifinalist",
                
                // ═══════════════════════════════════════════════════════
                // ELITE SUMMER PROGRAMS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // TASP/TASS (Telluride Association)
                "tasp", "tasp participant", "tasp attendee", "tasp scholar", "tasp student",
                "tasp admitted", "tasp accepted", "tasp selected", "tasp program",
                "telluride association summer program", "telluride association seminar",
                "tass", "tass participant", "tass attendee", "tass admitted", "tass accepted",
                "telluride association", "telluride seminar", "telluride program",
                "admitted to tasp", "accepted to tasp", "selected for tasp",
                "attended tasp", "attended tass",
                
                // YYGS (Yale Young Global Scholars)
                "yygs", "yygs participant", "yygs attendee", "yygs scholar", "yygs student",
                "yygs admitted", "yygs accepted", "yygs selected",
                "yale young global scholars", "yale global scholars", "yale young scholars",
                "admitted to yygs", "accepted to yygs", "attended yygs",
                
                // SSP (Summer Science Program)
                "ssp", "ssp participant", "ssp attendee", "ssp student", "ssp scholar",
                "ssp admitted", "ssp accepted", "ssp selected",
                "summer science program", "summer science program participant",
                "admitted to ssp", "accepted to ssp", "attended ssp",
                
                // MITES (MIT)
                "mites", "mites participant", "mites attendee", "mites student", "mites scholar",
                "mites admitted", "mites accepted", "mit mites",
                "minority introduction to engineering and science",
                "admitted to mites", "accepted to mites", "attended mites",
                
                // Wharton LBW
                "wharton lbw", "lbw wharton", "leadership in the business world",
                "wharton leadership in the business world", "upenn lbw",
                "lbw participant", "lbw attendee", "lbw admitted",
                "admitted to lbw", "accepted to lbw", "attended lbw",
                
                // Ross Mathematics
                "ross mathematics", "ross program", "ross math program", "ross math",
                "ross mathematics program", "ohio state ross",
                "ross participant", "ross attendee", "ross admitted",
                "admitted to ross", "accepted to ross", "attended ross",
                
                // PROMYS
                "promys", "promys program", "promys participant", "promys attendee",
                "promys admitted", "promys accepted", "boston university promys",
                "admitted to promys", "accepted to promys", "attended promys",
                
                // MathCamp
                "mathcamp", "math camp", "canada/usa mathcamp", "canada usa mathcamp",
                "mathcamp participant", "mathcamp attendee", "mathcamp admitted",
                "admitted to mathcamp", "accepted to mathcamp", "attended mathcamp",
                
                // HCSSiM
                "hcssim", "hampshire college summer studies", "hampshire college summer studies in mathematics",
                "hcssim participant", "hcssim attendee", "hcssim admitted",
                
                // Clark Scholars
                "clark scholars", "clark scholar", "clark scholars program",
                "texas tech clark scholars", "clark scholar participant",
                "admitted to clark scholars", "selected for clark scholars",
                
                // Garcia Program
                "garcia", "garcia program", "garcia research", "garcia scholar",
                "garcia summer scholar", "stony brook garcia",
                "admitted to garcia", "selected for garcia",
                
                // COSMOS
                "cosmos", "cosmos participant", "cosmos attendee", "cosmos cluster",
                "uc cosmos", "cosmos uc", "california cosmos",
                "admitted to cosmos", "attended cosmos",
                
                // ═══════════════════════════════════════════════════════
                // DEBATE & SPEECH - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // NSDA Nationals
                "nsda nationals", "nsda national tournament", "nsda nats",
                "nsda nationals breaker", "nsda nationals qualifier", "nsda nationals competitor",
                "national speech and debate", "national speech and debate association",
                "national speech debate tournament", "competed at nsda nationals",
                "qualified for nsda nationals", "broke at nsda nationals",
                
                // TOC Qualifier
                "toc qualifier", "toc qualified", "tournament of champions qualifier",
                "qualified for toc", "qualified for tournament of champions",
                "toc bid", "toc bids", "earned toc bid",
                
                // ═══════════════════════════════════════════════════════
                // SCHOLARSHIPS & AWARDS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // National Merit
                "national merit", "national merit finalist", "national merit scholarship finalist",
                "nmf", "nmsf finalist", "national merit scholar finalist",
                "named national merit finalist", "selected national merit finalist",
                
                // Coca-Cola Scholar
                "coca-cola scholar", "coca cola scholar", "coca-cola scholarship",
                "coca cola scholarship", "coca-cola scholars program",
                "selected coca-cola scholar", "named coca-cola scholar",
                
                // Gates Scholarship
                "gates scholar", "gates scholarship", "gates scholarship finalist",
                "gates millennium scholar", "bill gates scholar",
                
                // QuestBridge
                "questbridge", "questbridge finalist", "questbridge scholar",
                "questbridge national college match", "questbridge ncm",
                "questbridge finalist", "selected questbridge finalist",
                
                // Posse Scholar
                "posse", "posse scholar", "posse foundation", "posse scholarship",
                "posse foundation scholar", "selected posse scholar",
                
                // LEDA Scholar
                "leda", "leda scholar", "leda scholars program",
                "leadership enterprise for a diverse america",
                
                // Coolidge Senator
                "coolidge", "coolidge senator", "coolidge senator finalist",
                "coolidge scholarship", "coolidge scholars",
                
                // ═══════════════════════════════════════════════════════
                // INTERNATIONAL PROGRAMS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // NSLI-Y
                "nsli-y", "nsli y", "nsliy", "nsli-y participant", "nsli-y scholar",
                "national security language initiative", "nsli-y abroad",
                "admitted to nsli-y", "selected for nsli-y",
                
                // Congress-Bundestag
                "congress bundestag", "congress-bundestag", "cbyx",
                "congress bundestag youth exchange", "germany exchange",
                
                // YES Abroad
                "yes abroad", "kennedy-lugar yes abroad", "yes abroad participant",
                "youth exchange and study",
                
                // ═══════════════════════════════════════════════════════
                // ARTS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // All-State Music Leadership
                "all-state music", "all-state music first chair", "all state first chair",
                "all-state principal", "all-state concertmaster", "all-state section leader",
                
                // Scholastic Art & Writing
                "scholastic art", "scholastic art gold", "scholastic art gold medal",
                "scholastic national gold", "scholastic gold key national",
                "scholastic art & writing", "scholastic art and writing",
                "scholastic writing gold", "scholastic national gold medal",
                
                // YoungArts Merit/Honorable Mention
                "youngarts merit", "youngarts honorable mention", "youngarts hm",
                "nfaa merit", "nfaa honorable mention", "nfaa winner",
                "youngarts recognition", "youngarts award",
                
                // All-National Ensembles
                "all-national", "all-national music", "all-national band",
                "all-national orchestra", "all-national choir",
                "national honor band", "national honor orchestra", "national honor choir",
                
                // ═══════════════════════════════════════════════════════
                // CIVIC LEADERSHIP - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Boys/Girls State Governor
                "boys state governor", "boys state gov", "governor of boys state",
                "elected boys state governor", "american legion boys state governor",
                "girls state governor", "girls state gov", "governor of girls state",
                "elected girls state governor", "american legion girls state governor",
                
                // US Senate Page
                "us senate page", "senate page", "united states senate page",
                "senate page program", "congressional page",
                
                // State Board Positions
                "state board", "state board education", "state board representative",
                "state student board", "student representative state board",
                
                // ═══════════════════════════════════════════════════════
                // PUBLICATIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                "published author", "published book", "self-published author",
                "amazon published", "published novel", "published work",
                "journal publication", "academic journal publication",
                "undergraduate journal", "undergraduate journal publication",
                "conference presentation", "presented at conference", "conference presenter",
                "research conference", "symposium presentation", "symposium presenter",
                "academic conference presentation", "poster presentation"
            ]
        ),
        
        // GOLD II (6/10) - State Champion/Strong Leadership
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 6,
            rankName: "Gold II",
            description: "State champion or significant leadership/research achievement",
            feedback: "You demonstrate strong competitive success and leadership at the state or regional level. This is solid for selective universities.",
            levelUpAction: "Aim for national-level competition participation or publications to advance to Diamond tier.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // MATH/CS COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // USACO Gold
                "usaco gold", "usaco gold division", "usaco gold promoted",
                "promoted to usaco gold", "made usaco gold", "reached usaco gold",
                
                // AMC Honor Roll
                "amc honor roll", "amc 12 honor roll", "amc 10 honor roll",
                "amc 12 distinction", "amc 10 distinction", "amc distinguished",
                "amc high achievement", "amc achievement",
                
                // MATHCOUNTS State Top
                "mathcounts state", "mathcounts state top 10", "mathcounts state top 5",
                "mathcounts state qualifier", "mathcounts state competitor",
                "mathcounts state top", "mathcounts state medal",
                
                // ═══════════════════════════════════════════════════════
                // SCIENCE COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // USNCO Honors
                "usnco honors", "usnco national exam honors", "usnco recognition",
                "us national chemistry olympiad honors",
                
                // USABO Semifinalist (also in Diamond tier but worth including)
                "usabo semifinalist", "usabo semi-finalist",
                
                // HOSA International
                "hosa", "hosa international", "hosa ilc", "hosa international leadership conference",
                "hosa international top 10", "hosa ilc top 10", "hosa nationals top 10",
                "hosa international competitor", "hosa international finalist",
                "hosa nationals", "hosa national competitor",
                
                // Science Olympiad State
                "science olympiad state", "science olympiad state medal", "science olympiad state medalist",
                "scioly state medal", "scioly state", "science olympiad state top",
                "science olympiad state awards", "science olympiad state place",
                
                // ═══════════════════════════════════════════════════════
                // STATE CHAMPIONSHIPS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Generic State Champion
                "state champion", "state championship", "state championship team",
                "state championship winner", "state champ", "won state championship",
                "state title", "won state title", "state championship title",
                
                // State Player of Year
                "state player of year", "state player of the year", "state mvp",
                "named state player of year", "selected state player of year",
                
                // All-State Athlete
                "all-state", "all state", "all-state athlete", "all state athlete",
                "all-state selection", "named all-state", "selected all-state",
                
                // ═══════════════════════════════════════════════════════
                // MUSIC & ARTS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // All-State Music
                "all-state music", "all state music", "all-state musician",
                "all-state band", "all state band", "all-state band member",
                "all-state orchestra", "all state orchestra", "all-state orchestra member",
                "all-state choir", "all state choir", "all-state chorus",
                "selected all-state music", "made all-state band",
                "all-state ensemble", "all state ensemble",
                
                // District Music Leadership
                "district music", "district music chair", "district band chair",
                "district orchestra chair", "district choir chair",
                "district first chair", "district section leader",
                "district principal", "district concertmaster",
                
                // Scholastic Art & Writing National Silver
                "scholastic national silver", "scholastic art national silver",
                "scholastic silver key national", "scholastic national silver key",
                "scholastic art & writing national silver", "scholastic art and writing silver",
                "scholastic writing national silver",
                
                // Regional Art Winner
                "regional art", "regional art winner", "regional art award",
                "regional art competition winner", "regional art champion",
                "won regional art", "regional art prize", "regional art 1st place",
                
                // ═══════════════════════════════════════════════════════
                // LEADERSHIP POSITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Student Body President
                "student body president", "student body pres", "sbp", "asb president",
                "student government president", "student council president",
                "elected student body president", "student body president elected",
                "president of student body", "school president",
                
                // Class President
                "class president", "class president senior", "senior class president",
                "class pres", "president of senior class", "12th grade president",
                "elected class president", "class president elected",
                
                // Model UN Leadership
                "model un", "model un head delegate", "mun head delegate",
                "model un secretary general", "mun secretary general", "mun sec gen",
                "model un president", "mun president", "mun chair",
                "head delegate model un", "secretary general model un",
                
                // Debate Team Captain
                "debate team captain", "debate captain", "captain of debate team",
                "debate team leader", "debate team co-captain",
                "speech and debate captain", "forensics captain",
                
                // ═══════════════════════════════════════════════════════
                // PUBLICATIONS & MEDIA - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // School Newspaper
                "school newspaper", "school newspaper editor-in-chief", "newspaper editor-in-chief",
                "editor-in-chief school newspaper", "eic school newspaper",
                "newspaper eic", "school paper editor-in-chief", "school paper eic",
                "chief editor school newspaper", "editor in chief newspaper",
                
                // Yearbook
                "yearbook", "yearbook editor-in-chief", "yearbook eic",
                "editor-in-chief yearbook", "eic yearbook",
                "chief editor yearbook", "editor in chief yearbook",
                "yearbook chief editor",
                
                // Literary Magazine
                "literary magazine", "literary magazine editor", "literary magazine editor-in-chief",
                "lit mag editor", "lit magazine editor", "literary magazine eic",
                "editor-in-chief literary magazine",
                
                // Research Publications
                "undergraduate journal", "undergraduate journal publication",
                "undergraduate research publication", "undergrad journal",
                "research symposium", "research symposium presenter",
                "presented at research symposium", "symposium presenter",
                
                // ═══════════════════════════════════════════════════════
                // TECH & ENTREPRENEURSHIP - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // App Downloads/Users
                "app", "app 10000+ downloads", "app 10k+ downloads", "app 10000+ users",
                "app 10k+ users", "published app 10k", "app 10000 downloads",
                "10k+ app downloads", "10000+ app users", "app with 10k downloads",
                "mobile app 10k", "mobile app 10000 users",
                
                // Startup Revenue
                "startup", "startup $10k revenue", "startup $10k+ revenue",
                "startup revenue $10k", "$10k startup revenue", "startup 10k revenue",
                "business $10k revenue", "company $10k revenue",
                
                // Hackathons
                "hackathon", "hackathon national", "hackathon national winner",
                "national hackathon", "national hackathon winner", "won national hackathon",
                "hackathon 1st place national",
                
                // Congressional App Challenge
                "congressional app challenge", "congressional app challenge winner",
                "won congressional app challenge", "cac winner",
                "congressional app competition", "house app challenge",
                
                // Technovation
                "technovation", "technovation winner", "technovation champion",
                "won technovation", "technovation finalist",
                
                // NCWIT
                "ncwit", "ncwit winner", "ncwit award", "ncwit national",
                "ncwit national winner", "ncwit aspirations",
                "ncwit aspirations in computing", "ncwit national award",
                
                // ═══════════════════════════════════════════════════════
                // BUSINESS COMPETITIONS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // DECA ICDC
                "deca icdc", "deca icdc finalist", "deca internationals",
                "deca international finalist", "deca icdc competitor",
                "competed at deca icdc", "qualified for deca icdc",
                
                // FBLA Nationals
                "fbla nationals", "fbla nationals finalist", "fbla national finalist",
                "fbla nlc", "fbla nlc finalist", "fbla national leadership conference",
                "competed at fbla nationals", "qualified for fbla nationals",
                
                // BPA Nationals
                "bpa nationals", "bpa national leadership conference",
                "business professionals of america nationals",
                "bpa nlc", "competed at bpa nationals",
                
                // ═══════════════════════════════════════════════════════
                // SCIENCE FAIR - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // State Science Fair
                "state science fair", "state science fair winner", "state science fair champion",
                "won state science fair", "state fair winner",
                "state science fair 1st place", "state science fair gold",
                
                // Regional Science Fair Grand Prize
                "regional science fair", "regional science fair grand prize",
                "regional science fair winner", "regional fair grand prize",
                "won regional science fair", "regional science fair champion",
                "regional science fair 1st place"
            ]
        ),
        
        // GOLD I (5/10) - Selective Program/Regional Winner
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 5,
            rankName: "Gold I",
            description: "Selective program participant or regional competition winner",
            feedback: "Solid achievement demonstrating commitment and capability. You're showing trajectory towards higher-level recognition.",
            levelUpAction: "Aim for state or national placements, increase your leadership scope, or deepen research to publish findings.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // REGIONAL COMPETITION WINNERS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Regional Science Fair
                "regional science fair winner", "regional science fair 1st place", "regional science fair champion",
                "science fair regional winner", "science fair regional champion", "science fair regional 1st",
                "won regional science fair", "regional science fair gold", "regional fair winner",
                "isef regional winner", "isef regional champion", "first place regional science fair",
                "regional science fair top", "regional science fair finalist",
                
                // Regional MATHCOUNTS
                "regional mathcounts winner", "mathcounts regional winner", "mathcounts regional champion",
                "mathcounts chapter winner", "chapter mathcounts winner", "mathcounts chapter champion",
                "won regional mathcounts", "won chapter mathcounts", "mathcounts regional 1st place",
                "mathcounts chapter 1st place", "regional mathcounts gold",
                "mathcounts chapter team winner", "mathcounts regional team winner",
                
                // Regional Debate/Forensics
                "regional debate winner", "regional debate champion", "won regional debate",
                "debate regional winner", "debate regional champion", "regional debate finalist",
                "nfl regional winner", "nsda district winner", "nsda district champion",
                "won nsda district", "won debate districts", "district debate champion",
                "regional speech winner", "regional forensics winner",
                
                // Regional Science Olympiad
                "regional science olympiad winner", "regional scioly winner", "regional science olympiad champion",
                "science olympiad regional winner", "science olympiad regional gold",
                "won regional science olympiad", "regional scioly medal", "science olympiad regional medalist",
                "science olympiad regional 1st place",
                
                // Regional History Day
                "regional history day winner", "nhd regional winner", "history day regional champion",
                "national history day regional winner", "won regional history day",
                "regional history day 1st place",
                
                // ═══════════════════════════════════════════════════════
                // STATE QUALIFIERS (Business/Vocational) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // DECA State Qualifier
                "deca state qualifier", "deca qualified for state", "deca state",
                "deca state conference", "deca state competition", "deca scdc",
                "qualified for deca state", "made deca state", "deca district winner",
                "deca district champion", "won deca districts", "deca district 1st",
                
                // FBLA State Qualifier
                "fbla state qualifier", "fbla qualified for state", "fbla state",
                "fbla state conference", "fbla state competition", "fbla slc",
                "qualified for fbla state", "made fbla state", "fbla district winner",
                "fbla district champion", "won fbla districts", "fbla district 1st",
                
                // HOSA State Qualifier
                "hosa state qualifier", "hosa qualified for state", "hosa state",
                "hosa state conference", "hosa state competition", "hosa slc",
                "qualified for hosa state", "made hosa state", "hosa regional winner",
                "hosa regional champion", "won hosa regionals",
                
                // BPA State Qualifier
                "bpa state qualifier", "bpa qualified for state", "bpa state",
                "bpa state conference", "bpa state competition", "bpa slc",
                "qualified for bpa state", "made bpa state", "bpa regional winner",
                
                // ═══════════════════════════════════════════════════════
                // LEADERSHIP (Varsity Captains/Offices) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Varsity Captain
                "varsity captain", "team captain", "captain varsity", "varsity team captain",
                "captain of varsity", "varsity sport captain", "varsity co-captain",
                "captain varsity team", "football captain", "soccer captain", "basketball captain",
                "tennis captain", "swimming captain", "track captain", "volleyball captain",
                "baseball captain", "hockey captain", "lacrosse captain", "cross country captain",
                "cheer captain", "dance team captain", "wrestling captain", "golf captain",
                
                // 3-4 Year Varsity
                "3-year varsity", "3 year varsity", "three year varsity", "varsity 3 years",
                "4-year varsity", "4 year varsity", "four year varsity", "varsity 4 years",
                "varsity letter 3 years", "varsity letter 4 years",
                "3x varsity", "4x varsity",
                
                // Eagle Scout / Gold Award (High Leadership)
                "eagle scout", "earned eagle scout", "eagle scout rank",
                "gold award", "girl scout gold award", "earned gold award",
                "sea scout quartermaster", "venturing silver award",
                
                // Student Government (Exec Board)
                "student body officer", "student body secretary", "student body treasurer",
                "student body vice president", "student body vp", "asb officer",
                "class president", "junior class president", "sophomore class president",
                "freshman class president",
                
                // ═══════════════════════════════════════════════════════
                // SUMMER PROGRAMS (Selective/Regional) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Governor's Schools
                "governor's school", "gov school", "governors school",
                "attended governor's school", "selected for governor's school",
                "governor's school for the arts", "governor's school for sciences",
                "pgss", "gse", "gsa", "nyssss",
                
                // COSMOS (UC)
                "cosmos", "cosmos recipient", "cosmos participant",
                "california state summer school for mathematics and science",
                "uc cosmos", "cosmos cluster",
                
                // Other Notable Programs
                "iowa young writers", "iowa young writers studio", "iyws",
                "kenyon review", "kenyon review young writers", "kenyon young writers",
                "adroit journal mentorship", "adroit summer mentorship",
                "boa", "bank of america student leader", "boa student leader",
                "sams", "sams cmu", "summer academy for math and science",
                "ua summer engineering", "unite program",
                "university of pennsylvania m&tsi", "m&tsi",
                "launchx", "launch x", "launchx entrepreneurship",
                "leangap", "leangap participant",
                "blue stamp engineering",
                
                // ═══════════════════════════════════════════════════════
                // RESEARCH & INTERNSHIPS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Research Assistant
                "research assistant", "university research assistant", "lab assistant",
                "undergraduate research assistant", "student researcher",
                "research intern", "summer research intern", "intern in research lab",
                "university lab intern", "working in a lab", "wet lab intern",
                "conducted research at university", "mentored research",
                
                // Professional Internships
                "internship", "summer intern", "paid intern", "corporate intern",
                "software engineering intern", "marketing intern", "finance intern",
                "intern at tech company", "intern at startup", "high school intern",
                "bank of america student leader",
                
                // ═══════════════════════════════════════════════════════
                // ARTS & MUSIC (Regional) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Regional/District Honors
                "all-region", "all region", "all-region band", "all-region orchestra", "all-region choir",
                "all-district", "all district", "all-district band", "all-district orchestra", "all-district choir",
                "region band", "region orchestra", "region choir",
                "district band", "district orchestra", "district choir",
                "county band", "county orchestra", "county choir",
                "area band", "area orchestra", "area choir",
                
                // Art Awards
                "regional gold key", "scholastic regional gold",
                "scholastic art regional gold", "scholastic writing regional gold",
                "scholastic gold key", "won gold key", "gold key winner",
                "regional art winner", "county art winner",
                "youngarts merit", "youngarts honorable mention",
                
                // ═══════════════════════════════════════════════════════
                // ENTREPRENEURSHIP ($10k+) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                "$10k+ revenue", "$10k revenue", "$10,000 revenue", "$10,000+ revenue",
                "10k revenue", "10k+ revenue", "10,000 revenue",
                "$15k+ revenue", "$20k+ revenue", "$5k+ turnover", "$10k turnover",
                "five figure revenue", "5 figure revenue",
                "profitable business", "profitable startup",
                "business 1000+ customers", "1000+ customers",
                
                // ═══════════════════════════════════════════════════════
                // SERVICE & AWARDS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // PVSA Gold
                "pvsa gold", "president's volunteer service award gold",
                "presidents volunteer service award gold", "gold pvsa",
                "pvsa gold medal", "national service award gold",
                
                // Congressional Award Silver
                "congressional award silver", "congressional award silver medal",
                "silver congressional award",
                
                // AP Scholars (High)
                "ap scholar with distinction", "national ap scholar",
                "ap capstone diploma", "ib diploma recipient"
            ]
        ),
        
        // SILVER II (4/10) - State Competitor/School Leadership
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 4,
            rankName: "Silver II",
            description: "State-level competitor or significant school leadership",
            feedback: "You demonstrate solid involvement with competitive participation or leadership. This shows well-roundedness for college applications.",
            levelUpAction: "Focus on winning at the state level or expanding the impact of your leadership role significantly.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // SCHOOL LEADERSHIP (Vice President/Secretary) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Student Body VP/Secretary
                "student body vice president", "student body vp", "asb vice president", "asb vp",
                "vice president of student body", "vp student body", "student council vice president",
                "student government vice president", "elected student body vice president",
                "student body secretary", "student council secretary", "student government secretary",
                "asb secretary", "class secretary", "secretary of student body",
                "student body treasurer", "asb treasurer", "student council treasurer",
                
                // Class Officers (VP/Secretary)
                "class vice president", "junior class vice president", "senior class vice president",
                "sophomore class vice president", "freshman class vice president", "class vp",
                "vice president of senior class", "vp of senior class",
                "class secretary", "senior class secretary", "junior class secretary",
                "class treasurer", "senior class treasurer", "junior class treasurer",
                
                // Club Founder/President (Non-Major)
                "club founder", "founded club", "started club", "created club",
                "club co-founder", "co-founded club", "founding president",
                "founded organization", "started organization", "created non-profit",
                "club president", "president of club", "club pres",
                "president of key club", "president of nhs", "president of interact",
                "president of red cross club", "president of unicef club",
                "president of robotics club", "president of coding club",
                "president of debate club", "president of mun club",
                
                // ═══════════════════════════════════════════════════════
                // STATE COMPETITORS (Non-Winners) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // DECA State Competitor
                "deca state competitor", "deca state participant", "competed at deca state",
                "qualified for deca state", "deca state finalist", "deca state qualifier",
                
                // FBLA State Competitor
                "fbla state competitor", "fbla state participant", "competed at fbla state",
                "qualified for fbla state", "fbla state finalist", "fbla state qualifier",
                
                // HOSA State Competitor
                "hosa state competitor", "hosa state participant", "competed at hosa state",
                "qualified for hosa state", "hosa state finalist", "hosa state qualifier",
                
                // Science Olympiad Regional Medalist
                "science olympiad regional medal", "science olympiad regional medalist",
                "scioly regional medal", "scioly regional medalist",
                "science olympiad regional 2nd", "science olympiad regional 3rd",
                "science olympiad regional 4th", "science olympiad regional 5th",
                "science olympiad regional top",
                
                // ═══════════════════════════════════════════════════════
                // PUBLICATIONS (Editors) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Newspaper Editor
                "school newspaper editor", "newspaper editor", "editor of school newspaper",
                "news editor", "sports editor", "features editor", "opinions editor",
                "managing editor", "copy editor", "layout editor", "section editor",
                
                // Yearbook Editor
                "yearbook editor", "editor of yearbook", "yearbook section editor",
                "yearbook copy editor", "yearbook layout editor", "yearbook design editor",
                "yearbook managing editor", "yearbook senior editor",
                
                // Literary Magazine Editor
                "literary magazine editor", "editor of literary magazine", "lit mag editor",
                "poetry editor", "prose editor", "art editor",
                "literary magazine founder", "founded literary magazine",
                
                // ═══════════════════════════════════════════════════════
                // ARTS & MUSIC (School/Local Lead) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // School Musical Lead
                "school musical lead", "lead role school musical", "lead in musical",
                "musical lead role", "star in school musical", "main role musical",
                "school play lead", "lead role school play", "lead in play",
                "drama club president", "thespian society president",
                
                // Community Theater
                "community theater", "community theater lead", "community theater role",
                "local theater production", "cast in community theater",
                
                // District/All-City Honors
                "all-district", "all-city", "all-county",
                "all-district band member", "all-district orchestra member",
                "all-city band", "all-city orchestra", "all-city choir",
                "district honor band", "district honor orchestra", "district honor choir",
                
                // Scholastic Silver Key (Regional)
                "scholastic silver key", "scholastic regional silver",
                "scholastic art silver key", "scholastic writing silver key",
                "won silver key", "silver key winner",
                "regional art silver", "regional writing silver",
                
                // ═══════════════════════════════════════════════════════
                // SPORTS (Varsity/JVs) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Varsity Athlete (2+ Years)
                "varsity athlete", "varsity sports", "varsity member",
                "2-year varsity", "2 year varsity", "two year varsity",
                "varsity letter", "earned varsity letter", "varsity letterman",
                "varsity starter", "starting varsity", "varsity player",
                
                // JV Captain
                "jv captain", "junior varsity captain", "captain of jv",
                "jv team captain", "captain jv team",
                
                // League Honors
                "all-league", "all league", "all-conference", "all conference",
                "all-league selection", "all-conference selection",
                "all-league honorable mention", "all-conference honorable mention",
                "league champion", "conference champion",
                
                // ═══════════════════════════════════════════════════════
                // TECH & SERVICE - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // App Development (Small Scale)
                "published app", "app on app store", "app on play store",
                "created app", "coded app", "developed app",
                "app 100+ downloads", "app 500+ downloads", "app 1000+ downloads",
                "app 100+ users", "app 500+ users", "app 1000+ users",
                
                // Hackathon Participant/Finalist
                "hackathon finalist", "top 10 hackathon", "hackathon winner",
                "won hackathon", "hackathon prize", "best ui hackathon",
                "best design hackathon", "judges choice hackathon",
                
                // Service Awards (Silver/Bronze)
                "pvsa silver", "pvsa bronze", "president's volunteer service award silver",
                "president's volunteer service award bronze",
                "community service award", "service learning award",
                "100+ volunteer hours", "150+ volunteer hours", "200+ volunteer hours",
                
                // ═══════════════════════════════════════════════════════
                // ACADEMIC HONORS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // National Merit Semifinalist/Commended
                "national merit semifinalist", "nmsf", "national merit commended",
                "national merit commended scholar", "commended scholar",
                "national merit scholarship program",
                
                // AP Scholar
                "ap scholar", "ap scholar with honor", "ap scholar award",
                "national ap scholar", "ap award",
                
                // Honor Roll/NHS
                "national honor society", "nhs member", "nhs officer",
                "national honor society member", "national honor society officer",
                "science national honor society", "math honor society",
                "spanish honor society", "french honor society",
                "cum laude society", "dean's list", "honor roll"
            ]
        ),
        
        // SILVER I (3/10) - Club Officer/Varsity Athlete
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 3,
            rankName: "Silver I",
            description: "Multi-club officer or varsity athlete with achievements",
            feedback: "You show consistent commitment and growth in your activities. This demonstrates reliability and engagement.",
            levelUpAction: "Pursue competitive opportunities or expand your leadership impact to reach Silver II level.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // CLUB OFFICERS (Secretary/Treasurer/Others) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Secretary
                "club secretary", "secretary of club", "secretary of organization",
                "key club secretary", "nhs secretary", "fbla secretary", "deca secretary",
                "interact secretary", "red cross secretary", "mun secretary",
                "robotics secretary", "coding club secretary", "art club secretary",
                "drama club secretary", "french club secretary", "spanish club secretary",
                "honor society secretary", "secretary of",
                
                // Treasurer
                "club treasurer", "treasurer of club", "treasurer of organization",
                "key club treasurer", "nhs treasurer", "fbla treasurer", "deca treasurer",
                "interact treasurer", "red cross treasurer", "mun treasurer",
                "robotics treasurer", "coding club treasurer", "art club treasurer",
                "drama club treasurer", "honor society treasurer", "treasurer of",
                
                // Other Officers
                "club historian", "historian of club", "club parliamentarian",
                "club webmaster", "webmaster of club", "club public relations",
                "club pr officer", "pr officer", "public relations officer",
                "social media manager club", "social media officer",
                "club liaison", "event coordinator club", "club event planner",
                "membership coordinator", "recruitment chair",
                "fundraising chair", "fundraising coordinator",
                "board member", "executive board member", "exec board",
                "student council representative", "class representative",
                "student government representative", "student senator",
                
                // ═══════════════════════════════════════════════════════
                // VARSITY SPORTS (1 Year/Awards) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Varsity Achievement
                "varsity letter", "varsity letterman", "earned varsity letter",
                "varsity team member", "member of varsity team", "made varsity",
                "varsity athlete", "on varsity", "varsity football", "varsity soccer",
                "varsity basketball", "varsity baseball", "varsity track",
                "varsity volleyball", "varsity swimming", "varsity tennis",
                "varsity cross country", "varsity wrestling", "varsity lacrosse",
                "varsity cheer", "varsity dance", "varsity golf",
                
                // Team Awards
                "most improved player", "mip award", "most spirited",
                "coaches award", "coach's award", "sportsmanship award",
                "scholar athlete", "scholar-athlete award", "all-academic team",
                "defensive player of the year team", "offensive player of the year team",
                "rookie of the year", "team mvp",
                
                // JV Leadership
                "jv captain", "junior varsity captain", "captain of jv",
                "jv team captain", "captain junior varsity",
                
                // ═══════════════════════════════════════════════════════
                // ARTS & MUSIC (School Leaders) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Section Leaders
                "section leader", "band section leader", "orchestra section leader",
                "choir section leader", "chorus section leader",
                "trumpet section leader", "clarinet section leader", "flute section leader",
                "percussion section leader", "violin section leader", "cello section leader",
                "alto section leader", "soprano section leader", "tenor section leader",
                "bass section leader",
                
                // First Chair/Principal (School Level)
                "first chair", "1st chair", "principal player", "principal chair",
                "first chair trumpet", "first chair violin", "first chair flute",
                "concertmaster school orchestra", "concertmaster school band",
                
                // Marching Band Leadership
                "drum major", "assistant drum major", "marching band leader",
                "color guard captain", "winter guard captain", "drumline captain",
                "pit captain", "battery captain",
                
                // Theater Roles
                "supporting role", "supporting lead", "featured role",
                "student director", "student producer", "stage manager",
                "assistant stage manager", "lead set designer", "lead lighting designer",
                "lead sound designer", "lead costume designer",
                "drama club officer", "thespian officer",
                
                // ═══════════════════════════════════════════════════════
                // SCOUTING & YOUTH GROUPS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Scouting Ranks
                "life scout", "star scout", "boy scout senior patrol leader",
                "senior patrol leader", "patrol leader", "assistant senior patrol leader",
                "girl scout silver award", "silver award", "cadette silver award",
                "girl scout program aide", "venture scout",
                
                // Religious/Youth Groups
                "youth group leader", "youth group core team", "youth ministry leader",
                "retreat leader", "retreat coordinator",
                "sunday school teacher", "hebrew school teacher", "bible school teacher",
                "mosque volunteer leader", "church volunteer leader",
                "camp counselor", "counselor in training", "cit",
                "summer camp counselor", "vbs leader", "vacation bible school leader",
                
                // ═══════════════════════════════════════════════════════
                // SERVICE & WORK - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Service (50-100 Hours)
                "100+ volunteer hours", "100 hours community service",
                "50+ volunteer hours", "50 hours community service",
                "75+ volunteer hours", "significant volunteering",
                "service club member", "key club member", "interact club member",
                "beta club member", "nhs member",
                
                // Work Leadership
                "shift leader", "shift supervisor", "team lead at work",
                "trainer at work", "employee of the month", "lead lifeguard",
                "head lifeguard", "lead instructor", "senior camp counselor",
                "certified referee", "soccer referee", "basketball referee",
                "umpire", "baseball umpire", "lifeguard certified",
                
                // ═══════════════════════════════════════════════════════
                // ACADEMIC & HONOR SOCIETIES - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Honor Societies (Membership)
                "national honor society", "nhs", "inducted into nhs",
                "science national honor society", "snhs",
                "math honor society", "mu alpha theta",
                "english honor society", "nehs",
                "social studies honor society", "rho kappa",
                "spanish honor society", "shh", "french honor society",
                "chinese honor society", "latin honor society",
                "tri-m music honor society", "tri-m",
                "national art honor society", "nahs",
                "international thespian society", "thespian society",
                
                // Awards
                "ap scholar", "ap scholar award",
                "honor roll", "high honor roll", "principal's list",
                "honor roll 4 years", "consistent honor roll",
                "academic letter", "academic excellence award",
                "department award", "subject award", "outstanding student award",
                
                // Tutoring
                "peer tutor", "math tutor", "writing tutor", "science tutor",
                "volunteer tutor", "library volunteer", "reading buddy",
                "tutoring club", "writing center tutor"
            ]
        ),
        
        // BRONZE II (2/10) - Active Member/Part-time Work
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 2,
            rankName: "Bronze II",
            description: "Active participation with some responsibility",
            feedback: "You demonstrate consistent participation and developing skills. Continue building on this foundation.",
            levelUpAction: "Seek officer positions in clubs or pursue competitive opportunities to reach Silver tier.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // SPORTS (JV/Club/Intramural) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // JV Captain/Leader
                "jv captain", "junior varsity captain", "jv team captain",
                "captain of jv", "captain junior varsity", "freshman team captain",
                "sophomore team captain", "frosh/soph captain",
                
                // Varsity Member (Non-Starter/1 Year)
                "varsity member", "varsity team member", "made varsity",
                "varsity roster", "on varsity", "varsity participant",
                "varsity reserve", "varsity backup", "varsity practice squad",
                
                // JV Athlete
                "jv team", "junior varsity team", "jv athlete", "jv player",
                "jv football", "jv soccer", "jv basketball", "jv baseball",
                "jv track", "jv volleyball", "jv tennis", "jv swimming",
                "jv cross country", "jv wrestling", "jv lacrosse",
                "jv cheer", "jv dance", "jv golf",
                
                // Intramural/Club Sports
                "intramural sports", "intramural captain", "intramural referee",
                "club soccer", "club basketball", "recreational sports",
                "rec league", "travel team member", "aauf basketball",
                "club swim team", "club tennis", "club volleyball",
                
                // Sports Roles
                "team manager", "sports manager", "equipment manager",
                "water boy", "water girl", "team assistant",
                "scorekeeper", "statistician", "team stat keeper",
                
                // ═══════════════════════════════════════════════════════
                // ARTS & MUSIC (Members) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Ensemble Member
                "band member", "member of band", "concert band", "jazz band member",
                "marching band member", "pep band member",
                "orchestra member", "member of orchestra", "string orchestra",
                "choir member", "member of choir", "chorus member", "glee club",
                "ensemble member", "musician", "performer",
                
                // Theater Crew/Cast
                "school play cast", "cast member", "ensemble role", "chorus role",
                "theater ensemble", "drama club member", "thespian member",
                "stage crew", "tech crew", "lighting crew", "sound crew",
                "costume crew", "makeup crew", "set crew", "run crew",
                "spotlight operator", "backstage crew", "prop master",
                
                // Visual Arts
                "art club member", "member of art club", "photography club member",
                "film club member", "fashion club member", "anime club member",
                "displayed art", "art exhibition participant", "student art show",
                
                // Lessons
                "private lessons", "music lessons", "piano lessons", "guitar lessons",
                "voice lessons", "singing lessons", "violin lessons", "cello lessons",
                "drum lessons", "art lessons", "drawing classes", "painting classes",
                "dance lessons", "ballet", "tap", "jazz dance", "hip hop dance",
                
                // ═══════════════════════════════════════════════════════
                // WORK EXPERIENCE (Part-Time) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Food Service
                "server", "waiter", "waitress", "host", "hostess", "busser",
                "dishwasher", "food runner", "barista", "starbucks barista",
                "fast food worker", "mcdonalds employee", "chipotle employee",
                "ice cream scooper", "smoothie maker", "bakery assistant",
                "pizza delivery", "sandwich artist", "catering assistant",
                
                // Retail
                "cashier", "retail associate", "sales associate", "store clerk",
                "stocker", "stock clerk", "grocery bagger", "grocery clerk",
                "customer service associate", "front desk", "receptionist",
                "store associate", "clothing store employee",
                
                // Childcare/Tutoring
                "babysitter", "childcare provider", "nanny", "au pair",
                "baby sitting", "occasional babysitter",
                "camp counselor assistant", "cit", "counselor in training",
                "tutor", "homework helper", "after school tutor",
                
                // Manual Labor
                "lawn care", "landscaping", "lawn mowing", "yard work",
                "gardening", "snow shoveling", "snow removal",
                "lifeguard", "certified lifeguard", "pool attendant",
                "swim instructor", "swim teacher",
                "dog walker", "pet sitter", "cat sitter", "house sitter",
                "construction helper", "farm hand", "stable hand",
                "car wash", "detailer", "golf caddy",
                
                // ═══════════════════════════════════════════════════════
                // CLUBS & ORGANIZATIONS (Member) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Club Membership
                "club member", "member of club", "active member",
                "key club member", "nhs member", "fbla member", "deca member",
                "robotics member", "coding club member", "math club member",
                "science club member", "debate club member", "mun member",
                "model un member", "french club member", "spanish club member",
                "history club member", "environmental club member", "green team",
                "gsa member", "bsu member", "asa member", "lsa member",
                "red cross club member", "interact member", "unicef club member",
                "girl up member", "amnesty international member",
                
                // Activity Roles
                "participant", "attendee", "regular attendee",
                "volunteer", "club volunteer", "event volunteer",
                "committee member", "general member",
                
                // ═══════════════════════════════════════════════════════
                // VOLUNTEERING (Local/Limited) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // General Service
                "volunteer", "volunteering", "community service",
                "library volunteer", "shelving books",
                "animal shelter volunteer", "dog walker volunteer",
                "food bank volunteer", "soup kitchen volunteer",
                "nursing home volunteer", "senior center volunteer",
                "park cleanup", "beach cleanup", "trash pickup",
                "church volunteer", "usher", "altar server",
                "hospital volunteer", "candy striper",
                "museum volunteer", "zoo volunteer",
                
                // Service Hours
                "10+ volunteer hours", "20+ volunteer hours", "30+ volunteer hours",
                "40+ volunteer hours", "50+ volunteer hours",
                "10 hours service", "20 hours service", "30 hours service",
                "40 hours service", "50 hours service",
                
                // ═══════════════════════════════════════════════════════
                // CERTIFICATIONS & SKILLS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Safety/Health
                "cpr certified", "first aid certified", "cpr/aed certified",
                "bls certified", "lifeguard certified", "water safety instructor",
                "food handler card", "food safety certification",
                "babysitting certification", "red cross certification",
                
                // Tech/Professional
                "microsoft office specialist", "mos certification",
                "excel certification", "word certification", "powerpoint certification",
                "adobe certified associate", "photoshop certification",
                "certified solidworks associate", "cswa",
                "comptia it fundamentals", "google it support certificate",
                
                // Online Courses
                "coursera", "edx", "udemy", "codecademy", "khan academy",
                "online course", "python course", "java course",
                "web development course", "data science course",
                "certificate of completion",
                
                // ═══════════════════════════════════════════════════════
                // AWARDS & ACADEMIC (Regional/School) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // School Awards
                "student of the month", "student of the week",
                "citizenship award", "perfect attendance",
                "honor roll 1 year", "honor roll 2 years",
                "academic award", "achievement award",
                "most improved student", "effort award",
                
                // Local Competitions
                "spelling bee participant", "school spelling bee",
                "geography bee participant", "school geography bee",
                "science fair participant", "school science fair",
                "history day participant", "school history day",
                "reflections participant", "pta reflections",
                "essay contest participant", "art contest participant"
            ]
        ),
        
        // BRONZE I (1/10) - General Participation
        // ULTRA-COMPREHENSIVE - EVERY POSSIBLE VARIATION
        ActivityTier(
            score: 1,
            rankName: "Bronze I",
            description: "General participation and involvement",
            feedback: "You're building experience through participation. Focus on developing depth in one or two key areas.",
            levelUpAction: "Aim for leadership roles or consistent long-term commitment to move to Bronze II tier.",
            keywords: [
                // ═══════════════════════════════════════════════════════
                // HOBBIES & INTERESTS - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Creative Arts
                "drawing", "sketching", "painting", "painting hobby", "digital art",
                "sculpting", "pottery", "ceramics", "knitting", "crochet",
                "sewing", "embroidery", "jewelry making", "crafting", "origami",
                "calligraphy", "hand lettering", "graphic design hobby",
                "photography", "taking photos", "amateur photographer",
                "filmmaking", "video editing", "youtube channel", "vlogging",
                "writing", "poetry writing", "story writing", "blogging",
                "playing guitar", "playing piano", "playing drums", "ukulele",
                "singing", "beat making", "producing music", "djing",
                
                // Tech/Gaming
                "gaming", "video games", "playing video games", "esports participant",
                "gamer", "streamer", "twitch streamer", "casual gaming",
                "building pcs", "computer building", "tinkering",
                "learning to code", "coding hobby", "programming practice",
                "web design hobby", "app design hobby",
                
                // Intellectual/Learning
                "reading", "avid reader", "book club", "reading books",
                "learning languages", "duolingo", "learning japanese", "learning spanish",
                "solving puzzles", "crosswords", "sudoku", "rubiks cube", "speedcubing",
                "watching documentaries", "history buff", "science enthusiast",
                "astronomy", "stargazing", "telescope",
                
                // Lifestyle/Fitness
                "fitness", "gym member", "going to gym", "working out", "lifting weights",
                "running", "jogging", "walking", "hiking", "cycling", "biking",
                "yoga", "pilates", "meditation", "mindfulness",
                "cooking", "baking", "culinary interest", "trying recipes",
                "gardening", "planting", "taking care of plants",
                "fishing", "camping", "bird watching",
                "collecting", "coin collecting", "stamp collecting", "card collecting",
                
                // ═══════════════════════════════════════════════════════
                // SCHOOL CLUBS (General Member) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Academic/Interest Clubs
                "chess club", "chess club member", "chess team",
                "anime club", "anime club member", "manga club",
                "gardening club", "environmental club member", "eco club",
                "film club", "movie club", "cinema club",
                "art club member", "visual arts club", "ceramics club",
                "language club", "french club", "spanish club", "german club",
                "latin club", "chinese club", "sign language club", "asl club",
                "debate club member", "speech club member", "forensics member",
                "philosophy club", "psychology club", "history club",
                "math club", "science club", "biology club", "chemistry club", "physics club",
                "coding club member", "computer science club", "robotics club member",
                "stem club", "engineering club",
                "book club", "creative writing club", "poetry club",
                
                // Service Clubs (General Member)
                "key club member", "interact club", "kiwanis", "lions club",
                "red cross club", "unicef club", "habitat for humanity club",
                "best buddies", "special olympics volunteer", "peer buddies",
                "animal welfare club", "paws club",
                
                // Cultural Clubs
                "bsu", "black student union", "asa", "asian student association",
                "lsa", "latino student association", "msa", "muslim student association",
                "jewish student union", "christian club", "fca", "fellowship of christian athletes",
                "cultural appreciation club", "diversity club", "gsa", "gay straight alliance",
                
                // ═══════════════════════════════════════════════════════
                // COMMUNITY SERVICE (Basic/One-off) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Event Volunteering
                "volunteer", "volunteering", "helper",
                "school event volunteer", "carnival volunteer", "bake sale volunteer",
                "ticket collector", "usher", "greeter",
                "fun run volunteer", "5k volunteer", "marathon volunteer",
                
                // Community Support
                "library volunteer", "library assistant", "shelving books",
                "food bank volunteer", "sorting food", "canned food drive",
                "soup kitchen", "serving food", "meal packing",
                "clothing drive", "toy drive", "book drive",
                "park cleanup", "beach cleanup", "trash pickup", "litter cleanup",
                "animal shelter volunteer", "walking dogs", "cleaning cages",
                "church volunteer", "mosque volunteer", "temple volunteer",
                "youth group member", "sunday school helper",
                "nursing home volunteer", "visiting seniors", "making cards",
                
                // ═══════════════════════════════════════════════════════
                // ACADEMIC (Basic Stats) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Grades/Attendance
                "honor roll", "honor roll student", "made honor roll",
                "good grades", "passing grades", "gpa", "3.0 gpa", "3.5 gpa",
                "perfect attendance", "attendance award", "never absent",
                
                // Coursework (Intro)
                "taking ap classes", "1-2 ap courses", "first ap class",
                "honors classes", "taking honors", "honors student",
                "ib student", "pre-ib",
                "study group", "study buddy", "homework helper",
                
                // ═══════════════════════════════════════════════════════
                // ATHLETICS (Recreational/Team Member) - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // Team Member (No Varsity Specified)
                "soccer team", "football team", "basketball team", "baseball team",
                "volleyball team", "track team", "cross country team", "tennis team",
                "swim team", "wrestling team", "golf team", "lacrosse team",
                "softball team", "cheerleading", "dance team",
                
                // Recreational
                "intramural sports", "intramurals", "rec league", "rec sports",
                "community sports", "ymca sports", "little league", "pony league",
                "pick up basketball", "pick up soccer", "playing catch",
                "skateboarding", "skating", "rollerblading",
                "skiing", "snowboarding", "surfing", "bodyboarding",
                "bowling", "ping pong", "table tennis", "badminton",
                
                // ═══════════════════════════════════════════════════════
                // GENERAL INVOLVEMENT - EXHAUSTIVE COVERAGE
                // ═══════════════════════════════════════════════════════
                // School Spirit
                "pep club", "school spirit", "spirit squad", "rooting section",
                "attending games", "school dances", "prom committee member",
                "homecoming committee member",
                
                // Miscellaneous
                "student", "high school student",
                "summer camp attendee", "camper",
                "babysitting siblings", "helping at home", "chores",
                "driving", "got license", "learners permit",
                "traveling", "vacation", "family trip"
            ]
        ),
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
