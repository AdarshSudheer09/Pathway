import { Platform, NativeModules } from 'react-native';
import {
  Activity, UserProfile, CollegeAnalysis,
  ActivityImpactAnalysis, ResumeData, BragSheetData,
  NarrativeAnalysis, Project
} from "../types";

// --- DATA CONSTANTS (SOURCE OF TRUTH) ---
const RANK_RUBRIC = `
01 | Bronze I
- Hobbies: Casual fitness, gaming, reading, photography, blogging (low reach), recreational cooking.
- School Clubs: General member in Chess, Anime, Gardening, Film, Art, or Language clubs.
- Community: Local library volunteer, church choir, animal shelter assistant, park cleanup.
- Academics: Honor Roll, Perfect Attendance, taking 1-2 AP/IB courses, school-level peer tutor.
- Athletics: JV team member, Intramural sports, recreational league participant.

02 | Bronze II
- Sports: JV Captain, Varsity member (non-starter), Intramural referee, lifeguard certified.
- Arts: Band/Orchestra/Choir (regular member), School play ensemble, Stage crew, private music lessons.
- Jobs: Cashier, server, retail, babysitting, lawn mowing, CPR/First Aid certified.
- Leadership: Secretary/Treasurer of a niche club, founder of a casual/interest-based school club.
- Tech: CompTIA IT Fundamentals+, Certified SolidWorks Associate (CSWA), completed a Coursera/EdX cert.
- Awards: Local essay contest (honorable mention), school-wide "Student of the Month."

03 | Silver I
- Leadership: Multi-club officer, Student Council Representative, Youth Group Leader, Eagle Scout/Gold Award.
- Sports: Varsity Starter, All-League honorable mention, Regional qualifier in individual sports (Cross Country/Track).
- Arts: Lead role in school musical, Section Leader in Band, Scholastic Art & Writing Regional Honorable Mention.
- Academic/Service: 150+ Volunteer hours, President’s Volunteer Service Award (Bronze/Silver), 4-5 AP courses.
- Pre-Professional: Shadowing a professional (20+ hours), Real estate intern, Bank teller, local tutoring business.
- Awards: National Merit Commended, National Honor Society (NHS) member, Beta Club, Honor Roll (3+ years).

04 | Silver II
- Competitions: FBLA/DECA State Placer, SkillsUSA State Placer, Science Olympiad Regional Medalist, MUN Gavel.
- Arts: All-District Band/Orchestra, Lead in community theater, Scholastic Art & Writing Regional Silver Key.
- Leadership: Student Body VP, Class President, Founder of a local non-profit (documented impact).
- Journalism: Newspaper Editor, Yearbook Editor-in-Chief, Literary Magazine Founder.
- Tech: Published App (100-1000 users), Top 10% in Regional Hackathon, open-source contributor (minor).
- Awards: National Merit Semifinalist, AP Scholar with Distinction, State History Day Participant.

05 | Gold I
- Competitions: USACO Silver, AIME Qualifier, National History Day (NHD) State Winner, TSA State Medalist.
- Summer: COSMOS (UC), Yale Young Global Scholars (YYGS), Notre Dame Leadership Seminars, HOBY Delegate.
- Sports: All-Conference selection, State-level individual qualifier, Varsity Captain (multiple years).
- Service: President’s Volunteer Service Award (Gold), Congressional Award (Bronze/Silver).
- Civic: Governor’s School (Standard), City Council Youth Advisor, Boys/Girls State Delegate.
- Tech: Published App (1,000-10,000 users), Winner at regional Hackathon, FIRST Dean's List Finalist.

06 | Gold II
- Competitions: USACO Gold, AMC 12 Honor Roll, USNCO Honors, USABO Semifinalist, HOSA ILC Top 10.
- Arts: All-State Music (Band/Orchestra), Scholastic Art & Writing National Silver, All-Eastern/All-Regional Music.
- Academic: Publication in an undergraduate research journal, 1st author in high school research symposium.
- Leadership: Student Body President (Large school), DECA ICDC Finalist, Model UN Head Delegate.
- Tech: Published App (10,000+ users), Major Tech Internship (local startup), National Hackathon Winner.
- Awards: Congressional App Challenge Winner (District), PEYA Regional Winner, NCWIT National Winner.

07 | Diamond I
- Competitions: USACO Platinum, USAMO/USAJMO Qualifier, AIME Top Score, NSDA Nationals Breaker.
- Research: Published as 1st or 2nd author in a peer-reviewed journal (Q1/Q2 Impact).
- Elite Summer: TASP, Bank of America Student Leaders, Wharton LBW, MITES, Governor's School (Highly Selective).
- Arts: All-National Music Participant, Scholastic Gold Medal (National), YoungArts Winner (Merit/Honorable Mention).
- Civic: Boys/Girls State Governor, State Board of Education Student Representative, US Senate Page.
- Awards: Coolidge Senator (Finalist), National Merit Finalist, LEDA Scholar, NSLI-Y Participant.

08 | Diamond II
- Competitions: USNCO/USABO/USAPhO Top 20 (Finalist), USAMO Winner, IPPF Top 32, CyberPatriot National Top Scorer.
- Research: Regeneron STS Scholar (Top 300), ISEF Category Award (1st-3rd), JSHS National Finalist.
- Civic: Boys/Girls Nation Senator, United States Senate Youth Program (USSYP), Congressional Award Gold.
- Tech: Google Summer of Code (GSoC) Participant, High-traffic Open Source Contributor (e.g., React, Linux).
- Entrepreneurship: Founder of revenue-generating startup ($50k+ revenue), Thiel Fellowship Finalist.
- Arts: National High School Musical Theatre Awards (Jimmy Awards) Finalist, NYO-USA Member.

09 | Platinum I
- Competitions: USACO Camp, MOP (Red/Blue), US Physics Team (Top 24), National Science Bowl Winner.
- Elite Research: RSI (Research Science Institute) Participant, Regeneron STS Top 40 (Finalist).
- Sports: D1 Recruited Athlete (Top 10 program), National Team Member (Olympic Developmental).
- Arts: YoungArts Finalist, Presidential Scholar in the Arts, Juilliard Pre-College (Advanced).
- Civic: Youth Poet Laureate (National), National Student Poet.
- Tech: VEX Robotics World Champion, DECA ICDC 1st Place.

10 | Platinum II
- Olympiads: IMO/IChO/IBO/IPhO/IOI Medalist (International stage).
- Research: Regeneron STS Top 10, ISEF Grand Prize Winner (Gordon E. Moore Award).
- Societal: Thiel Fellow, Major published Author (Big 5 publishers), NYT Editorial Contest Winner.
- Innovation: Breakthrough Junior Challenge Winner, 3M Young Scientist Winner.
- Athletics: Individual National Champion (Swimming, Tennis, Golf, etc.), Olympic Medalist.
- Leadership: Boys/Girls Nation President, USSYP National Representative.
`;

// --- UNIVERSAL LOCAL AI BRIDGE (FOUNDATION MODELS) ---
console.log("--------------------------------------------------");
console.log("AVAILABLE MODULES:", Object.keys(NativeModules).filter(key => key.includes("Local")));
console.log("--------------------------------------------------");
const LocalLLM = NativeModules.LocalLLMBridge;

const callLocalAI = async (prompt: string, isJson: boolean = false): Promise<any> => {
  console.log(`[Foundation AI] Generating... Prompt length: ${prompt.length}`);
  try {
    if (LocalLLM && LocalLLM.generateResponse) {
      // 1. Send the prompt to the on-device Foundation Model
      const response = await LocalLLM.generateResponse(prompt);

      if (!response) {
        throw new Error("Model returned empty response");
      }

      // 2. Handle JSON parsing robustly (Models often wrap JSON in markdown)
      // 2. Handle JSON parsing robustly (Models often wrap JSON in markdown)
      if (isJson) {
        try {
          // Robust JSON Sanitizer
          let cleanText = response.trim();

          // 1. Remove Markdown Code Blocks
          if (cleanText.includes("```")) {
            cleanText = cleanText.replace(/```json/g, "").replace(/```/g, "");
          }

          // 2. Find the first '{' and the last '}'
          const firstOpen = cleanText.indexOf('{');
          const lastClose = cleanText.lastIndexOf('}');

          if (firstOpen !== -1 && lastClose !== -1) {
            cleanText = cleanText.substring(firstOpen, lastClose + 1);
          }

          // 3. Trailing Comma Fix (Common LLM Error)
          // Replaces ", }" with "}" and ", ]" with "]"
          cleanText = cleanText.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

          return JSON.parse(cleanText);
        } catch (parseError) {
          console.log("JSON Parse Error caught. Retrying with loose recovery...");
          // Attempt basic recovery
          try {
            // Sometimes quotes are escaped incorrectly
            let fixed = response.replace(/'/g, '"');
            // Try to fix trailing commas again on original
            fixed = fixed.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
            const first = fixed.indexOf('{');
            const last = fixed.lastIndexOf('}');
            if (first !== -1 && last !== -1) {
              fixed = fixed.substring(first, last + 1);
              return JSON.parse(fixed);
            }
            return null;
          } catch (e) {
            console.log("Final JSON recovery failed.");
            return null;
          }
        }
      }

      return response.trim();
    }

    // Fallback if Bridge is missing
    console.warn("Local AI Bridge not found.");
    return null;

  } catch (e) {
    console.error("Local AI Error:", e);
    return null;
  }
};

// --- 1. POLISH DESCRIPTION ---
export const polishDescription = async (
  rawNotes: string,
  targetMajor: string
): Promise<string> => {
  const prompt = `
  Task: Rewrite this activity description for a Common App activity list.
  Context: Student applying for ${targetMajor}.
  Constraint: STRICTLY under 150 words. Use strong active verbs.
  Input: "${rawNotes}"
  Output: Just the text.`;

  try {
    const result = await callLocalAI(prompt);
    if (!result) return rawNotes;
    return result;
  } catch (error) {
    console.log('Error in polishDescription (using original):', error);
    return rawNotes;
  }
};

// --- 2. SUGGEST NEXT STEPS ---
export const suggestNextSteps = async (
  activity: Activity,
  targetMajor: string
): Promise<string[]> => {
  const prompt = `
  Role: College Admissions Consultant.
  Student Activity: ${activity.position} at ${activity.organization}. ${activity.description}.
  Target Major: ${targetMajor}.
  Task: Provide 3 specific, impressive "Next Steps" or projects *you* (the student) can do within this activity to increase *your* admission chances for *your* major.
  Constraint: Address the student directly as "you". Make it personal and encouraging but ambitious.
  Output JSON: { "steps": ["Step 1", "Step 2", "Step 3"] }`;

  try {
    const result = await callLocalAI(prompt, true);
    if (!result || !result.steps) {
      return [
        `Lead a specialized project related to ${targetMajor}.`,
        "Quantify your impact with specific metrics.",
        "Document your process for a portfolio."
      ];
    }
    return result.steps;
  } catch (error) {
    console.log('Error in suggestNextSteps (using fallback):', error);
    return [
      `Lead a specialized project related to ${targetMajor}.`,
      "Quantify your impact with specific metrics.",
      "Document your process for a portfolio."
    ];
  }
};

// --- 2. MAJOR-SPECIFIC TOP SCHOOLS MAPPING ---
const MAJOR_TOP_SCHOOLS: { [key: string]: string } = {
  "Business Administration": "UPenn (Wharton), MIT (Sloan), UC Berkeley (Haas), UMich (Ross), NYU (Stern)",
  "Nursing": "UPenn, Johns Hopkins, Duke, Emory, University of Washington",
  "Psychology": "Stanford, Yale, UCLA, Harvard, UC Berkeley",
  "Biology": "Harvard, MIT, Stanford, Johns Hopkins, UC Berkeley",
  "Computer Science": "Carnegie Mellon, MIT, Stanford, UC Berkeley, UIUC",
  "Engineering": "MIT, Stanford, Georgia Tech, Caltech, UC Berkeley",
  "Communications": "Northwestern, USC, UPenn, NYU, UT Austin",
  "Finance": "UPenn (Wharton), NYU (Stern), UMich (Ross), MIT (Sloan), UC Berkeley (Haas)",
  "Education": "Vanderbilt (Peabody), Harvard, Stanford, UW-Madison, Columbia (Teachers College)",
  "Criminal Justice": "Northeastern, UC Irvine, Florida State, Penn State, University of Maryland",
  "Accounting": "UT Austin (McCombs), BYU (Marriott), UIUC (Gies), UPenn (Wharton), UMich (Ross)",
  "Political Science": "Harvard, Princeton, Stanford, Yale, UC Berkeley",
  "Economics": "Harvard, MIT, Stanford, Princeton, UChicago",
  "Kinesiology": "UMich, UVA, UF, UT Austin, USC",
  "Marketing": "UPenn (Wharton), UMich (Ross), NYU (Stern), UT Austin (McCombs), UC Berkeley (Haas)",
  "Health": "Johns Hopkins, UPenn, Harvard, Duke, UNC Chapel Hill",
  "English": "Yale, Harvard, UC Berkeley, Princeton, Columbia",
  "History": "Yale, Princeton, Harvard, Stanford, UC Berkeley",
  "Sociology": "Harvard, UC Berkeley, Princeton, Stanford, UChicago",
  "Art": "RISD, Yale, SAIC, MICA, CalArts",
  "Mathematics": "MIT, Princeton, Harvard, Stanford, UC Berkeley",
  "Mechanical Engineering": "MIT, Georgia Tech, Stanford, UC Berkeley, UMich",
  "Environmental Science": "UC Berkeley, Stanford, Harvard, University of Washington, Cornell",
  "Information Technology": "Carnegie Mellon, Cornell, Georgia Tech, MIT, Purdue",
  "International Relations": "Georgetown (Walsh), Harvard, Princeton, Stanford, Columbia",
  "Social Work": "WashU (Brown), UMich, UChicago, Columbia, UC Berkeley",
  "Chemistry": "Caltech, MIT, UC Berkeley, Harvard, Stanford",
  "Design": "RISD, Parsons, Carnegie Mellon, Pratt, ArtCenter",
  "Physics": "Caltech, MIT, Harvard, Princeton, Stanford",
  "Agricultural Sciences": "Cornell, UC Davis, Texas A&M, Iowa State, Purdue",
  "Music": "Juilliard, Curtis, Eastman (UR), Berklee, USC (Thornton)",
  "Film": "USC (Cinematic Arts), NYU (Tisch), UCLA, AFI, Chapman",
  "Biochemistry": "Harvard, MIT, Johns Hopkins, UC Berkeley, Stanford",
  "Philosophy": "NYU, Rutgers, Princeton, Pittsburgh, Harvard",
  "Architecture": "Cornell, Rice, MIT, Cal Poly SLO, Cooper Union",
  "Civil Engineering": "UC Berkeley, Georgia Tech, UMich, UIUC, MIT",
  "Public Health": "Johns Hopkins, Harvard, UNC Chapel Hill, UMich, Emory",
  "Nutrition": "Cornell, UC Davis, UNC Chapel Hill, NYU, Tufts",
  "Anthropology": "Harvard, UChicago, UC Berkeley, Stanford, UMich",
  "Computer Engineering": "MIT, Stanford, Carnegie Mellon, UC Berkeley, Georgia Tech",
  "Data Science": "UC Berkeley, Carnegie Mellon, MIT, Stanford, NYU",
  "Neuroscience": "Johns Hopkins, Harvard, MIT, Stanford, UPenn",
  "Journalism": "Northwestern (Medill), Missouri, Columbia, USC, ASU (Cronkite)",
  "Forensic Science": "Penn State, Loyola Chicago, George Washington, TAMU, UCF",
  "Hospitality": "Cornell (Nolan), UNLV, MSU, UCF, Houston (Conrad Hilton)",
  "Interior Design": "SCAD, Pratt, RISD, NYSID, Cincinnati",
  "Public Relations": "USC, UF, UGA, UT Austin, Boston University",
  "Electrical Engineering": "MIT, Stanford, UC Berkeley, Georgia Tech, UIUC",
  "Animal Science": "UC Davis, Cornell, TAMU, Purdue, Florida State",
  "Legal Studies": "UC Berkeley, Northwestern, WashU, Rice, Vanderbilt"
};

// Helper to find closest major match
const findClosestMajor = (targetMajor: string): string => {
  const normalized = targetMajor.toLowerCase();
  for (const major of Object.keys(MAJOR_TOP_SCHOOLS)) {
    if (normalized.includes(major.toLowerCase()) || major.toLowerCase().includes(normalized)) {
      return major;
    }
  }
  return "Computer Science"; // Default fallback
};

// --- 3. ANALYZE IMPACT (1-10 Ranking Scale) ---
export const analyzeActivityImpact = async (activity: Activity, targetMajor?: string): Promise<ActivityImpactAnalysis> => {
  const majorMatch = targetMajor ? findClosestMajor(targetMajor) : "Computer Science";
  const topSchools = MAJOR_TOP_SCHOOLS[majorMatch];

  const prompt = `
  Role: Admissions Officer at a prestigious university (e.g., USC, NYU, UMich, Georgetown level - NOT Ivy but highly selective).
  Task: Evaluate this activity using the 1-10 rubric. Be realistic but fairly harsh.

  RUBRIC:
  ${RANK_RUBRIC}

  **EXPLICIT SCORE MAPPING**:
  - Bronze I = 1/10, Bronze II = 2/10 (Basic participation)
  - Silver I = 3/10, Silver II = 4/10 (Local leadership/competition)
  - Gold I = 5/10, Gold II = 6/10 (State/Regional achievement)
  - Diamond I = 7/10, Diamond II = 8/10 (National achievement)
  - Platinum I = 9/10, Platinum II = 10/10 (International/Elite)

  **APPLICANT'S TARGET MAJOR**: ${targetMajor || "Not specified"}
  **TOP SCHOOLS FOR THIS MAJOR**: ${topSchools}

  Activity: "${activity.position} at ${activity.organization}: ${activity.description}"
  ${activity.isMajorRelated ? `**USER NOTE**: The applicant has explicitly marked this activity as RELATED to their major (${targetMajor}). Trust this assertion and evaluate accordingly.` : ''}

  **IMPORTANT SCORING ADJUSTMENTS**:
  - **CRITICAL**: Reserve 9-10/10 (Platinum) for ONLY national olympiad winners, international competitions, elite research (ISEF Grand Prize, RSI, etc.)
  - **Major Relevance**: Use "SEMANTIC INFERENCE" to determine relevance.
    * If marked as "**USER NOTE**: ... RELATED":
      1. **DEFAULT TRUST**: Assume there is a connection you might not see immediately (e.g., soft skills, leadership application).
      2. **EXCEPTION**: ONLY overrule this if the activity is **OBJECTIVELY and COMPLETELY** unrelated causing a logical contradiction (e.g. 'Walking my dog' for 'Nuclear Engineering').
      3. If there is even a *slight* arguable connection (e.g., 'Volunteering' -> 'CS' via 'Service/Community Impact' or 'Teaching'), **TRUST THE USER**.
    * Look for TRANSFERABLE SKILLS or ALLIED FIELDS (e.g., Math Club -> Physics Major = RELATED; Debate -> Political Science/Law = RELATED).
    * DIRECT KEYWORD MATCH IS NOT REQUIRED.
    * If activity is semantically related to ${targetMajor}, boost score by 0.5-1 point MAXIMUM.
    * DO NOT give 7+ just because it's major-related. A basic CS club for CS major is still 2-3/10.
    * Only exceptional, high-impact major-related activities deserve 6+/10.
  - **Major Irrelevance**: If activity is completely unrelated (no transferable skills or semantic link) to ${targetMajor}, reduce score by 0.5 point.
  - **Cliché Activities**: Standard club memberships (NHS, Key Club, etc.) without leadership → Reduce score.
  - **Tech/Apps**: 10k+ users = Gold II (6/10), 100k+ = Diamond I (7/10), NOT Platinum
  - **Competitions**: State = Silver II (4/10), National = Gold/Diamond (6-8/10), International = Platinum (9-10/10)
  - **Research**: Published in undergraduate journal = Gold II (6/10), Peer-reviewed Q1 = Diamond (7-8/10)
  
  **SCORING REALITY CHECK**:
  - Most activities should be 2-6/10 range
  - 7-8/10 = National-level achievement (USAMO qualifier, ISEF finalist, etc.)
  - 9-10/10 = International/Olympic level ONLY

  **CRITICAL INSTRUCTIONS**:
  1. Match activity to rank based on rubric and adjustments above. Be FAIR but REALISTIC for ${topSchools} standards.
  2. Assign score based on EXPLICIT MAPPING. If activity has major relevance or significant metrics, adjust accordingly.
  3. For rank_description: One sentence assessment mentioning major relevance if applicable.
  4. For brutal_feedback: Be honest but constructive. Mention if activity is cliché or lacks major connection.
  5. For level_up_action: 
     - Reference what **${topSchools}** specifically looks for in ${targetMajor} applicants
     - Suggest SPECIFIC next steps related to their major and current position
     - Example: "For ${majorMatch} at ${topSchools.split(',')[0]}, demonstrate..."

  **Example**: "Generic club membership unrelated to major" → Lower score
  Output JSON: {
    "score": Integer (1-10, exact mapping),
    "rank_name": "String (e.g., Silver I)",
    "rank_description": "One sentence assessment - NO listing of other activities",
    "brutal_feedback": "Harsh critique addressing 'you'",
    "level_up_action": "Specific, RELATED next step to reach next rank"
  }`;

  try {
    const result = await callLocalAI(prompt, true);
    if (!result) {
      return {
        score: 3,
        rank_name: "Silver I",
        rank_description: "Basic multi-club participation without significant leadership impact",
        brutal_feedback: "Your activity shows participation but lacks any competitive achievements or measurable impact.",
        level_up_action: "To reach Silver II (4/10), win a state-level competition in your field or lead a regional initiative with documented results."
      };
    }
    return result;
  } catch (error) {
    console.log('Error in analyzeActivityImpact (using fallback):', error);
    return {
      score: 3,
      rank_name: "Silver I",
      rank_description: "Basic multi-club participation without significant leadership impact",
      brutal_feedback: "Your activity shows participation but lacks any competitive achievements or measurable impact.",
      level_up_action: "To reach Silver II (4/10), win a state-level competition in your field or lead a regional initiative with documented results."
    };
  }
};

// --- 4. COLLEGE CHANCES ---
import { COLLEGE_DATABASE } from './collegeData';

export const analyzeCollegeChances = async (
  profile: UserProfile,
  activities: Activity[],
  projects: Project[],
  collegeName: string
): Promise<CollegeAnalysis> => {

  // Fetch Real College Data FIRST
  const collegeInfo = COLLEGE_DATABASE[collegeName];
  const acceptanceRate = collegeInfo ? collegeInfo.acceptanceRate : "50%"; // Default to 50% if unknown
  const acceptanceRateNum = parseFloat(acceptanceRate.replace('%', '')) || 50;

  const activitySummary = activities.map(a =>
    `- ${a.position} at ${a.organization} (${a.type}): ${a.description} (${a.hoursPerWeek} hrs/wk)${a.isMajorRelated ? ' [USER-FLAGGED: MAJOR RELATED]' : ''}`
  ).join("\n");

  const projectSummary = projects.map(p =>
    `- Project: ${p.title} (${p.description}) [Skills: ${p.skills || 'N/A'}]${p.isMajorRelated ? ' [USER-FLAGGED: MAJOR RELATED]' : ''}`
  ).join("\n");

  const apCount = parseInt(profile.apCount || "0");
  const ibCount = parseInt(profile.ibCount || "0");
  const honorsCount = parseInt(profile.honorsCount || "0");
  const rawScore = (apCount * 1) + (ibCount * 1) + (honorsCount * 0.5);
  const rigorScore = Math.min(10, Math.ceil(rawScore));

  // Count high-tier activities (T1, T2, T3)
  const tier1Activities = activities.filter(a => a.tier === 1).length;
  const tier2Activities = activities.filter(a => a.tier === 2).length;
  const tier3Activities = activities.filter(a => a.tier === 3).length;
  const topTierCount = tier1Activities + tier2Activities + tier3Activities;
  const hasStrongECs = topTierCount >= 2; // 2+ activities in top 3 tiers = strong

  // Determine if this is a T20 school (very competitive and prestigious)
  const isT20School = acceptanceRateNum < 10;
  const isHighlySelective = acceptanceRateNum >= 10 && acceptanceRateNum < 25;
  const isSelective = acceptanceRateNum >= 25 && acceptanceRateNum < 40;

  const avgSatStr = collegeInfo?.avgSAT || "1300-1500"; // Fallback to competitive range if missing

  // Pre-calculate SAT logic to prevent hallucinations
  const userSat = parseInt(profile.satScore || "0");
  const nationalAvg = 1200;
  // Parse college average (handle "1400-1560")
  const collegeAvg = parseInt(avgSatStr.split('-')[0]) || 1400; // conservative lower bound
  const userGpa = parseFloat(profile.gpa || "0.0");

  let satAnalysisContext = "";
  if (userSat > 1500) {
    satAnalysisContext = `FACT: User SAT (${userSat}) is ELITE and SIGNIFICANTLY ABOVE national average (${nationalAvg}). It is a major asset.`;
  } else if (userSat > collegeAvg) {
    satAnalysisContext = `FACT: User SAT (${userSat}) is ABOVE the college's lower average (${collegeAvg}). It is a strength.`;
  } else if (userSat < collegeAvg) {
    satAnalysisContext = `FACT: User SAT (${userSat}) is BELOW the college's average (${collegeAvg}). This is a weakness.`;
  }

  // Pre-calculate GPA Context (Using User's Specific Tier List)
  let gpaContext = "";
  if (userGpa >= 4.0) {
    gpaContext = "FACT: User GPA is 4.0 (PERFECT). This is the highest possible score. It is IDEAL for Ivy League/Top Tier.";
  } else if (userGpa >= 3.7) {
    gpaContext = "FACT: User GPA is ~3.7 (Excellent). Competitive for Ivies, Strong for UCs.";
  } else if (userGpa >= 3.5) {
    gpaContext = "FACT: User GPA is ~3.5 (Very Good). Below typical for Ivies, but Competitive for State/UCs.";
  } else if (userGpa >= 3.3) {
    gpaContext = "FACT: User GPA is ~3.3 (Good). Too low for Ivies, Marginal for UCs, Acceptable for State.";
  } else if (userGpa >= 3.0) {
    gpaContext = "FACT: User GPA is ~3.0 (Good). way below typical for Ivies, somewhat marginal for UCs, Acceptable for State.";
  } else {
    gpaContext = "FACT: User GPA is Below 3.0. This is a significant weakness for competitive schools.";
  }

  // --- HARSH COLLEGE LIST (Strictly enforce rigorous standards for these) ---
  const EXTREME_HARSH_COLLEGES = [
    "California Institute of Technology", "Caltech", "Harvard University", "Harvard", "Stanford University", "Stanford",
    "Columbia University", "Columbia", "Massachusetts Institute of Technology", "MIT", "Princeton University", "Princeton",
    "Yale University", "Yale", "Minerva University", "Minerva", "Brown University", "Brown", "University of Chicago", "UChicago",
    "Duke University", "Duke", "Johns Hopkins University", "JHU", "Northwestern University", "Northwestern",
    "University of Pennsylvania", "UPenn", "Penn", "Dartmouth College", "Dartmouth", "Vanderbilt University", "Vanderbilt",
    "Rice University", "Rice", "Cornell University", "Cornell", "Pomona College", "Pomona", "Swarthmore College", "Swarthmore",
    "Williams College", "Williams", "Amherst College", "Amherst", "Bowdoin College", "Bowdoin",
    "Claremont McKenna College", "CMC", "Harvey Mudd College", "Harvey Mudd", "Georgetown University", "Georgetown",
    "Carnegie Mellon University", "CMU", "Washington University in St. Louis", "WashU", "Tufts University", "Tufts",
    "University of Notre Dame", "Notre Dame", "Emory University", "Emory", "University of California, Los Angeles", "UCLA",
    "University of California, Berkeley", "UC Berkeley", "Cal", "University of Southern California", "USC",
    "New York University", "NYU", "Northeastern University", "Northeastern", "Boston College", "BC",
    "University of Michigan", "UMich", "Ann Arbor", "University of Virginia", "UVA",
    "Georgia Institute of Technology", "Georgia Tech", "GT", "Cooper Union", "Franklin W. Olin College of Engineering", "Olin",
    "Barnard College", "Barnard", "Wellesley College", "Wellesley", "United States Naval Academy", "USNA", "Navy",
    "United States Military Academy", "West Point", "Army", "United States Air Force Academy", "USAFA", "Air Force",
    "Colby College", "Colby", "Bates College", "Bates", "Davidson College", "Davidson"
  ];

  const isHarshCollege = EXTREME_HARSH_COLLEGES.some(c =>
    collegeName.toLowerCase() === c.toLowerCase() ||
    collegeName.toLowerCase().includes(c.toLowerCase())
  );

  let evaluationTone: string;
  let ecWeight: string;

  if (isHarshCollege) {
    evaluationTone = `
    You are a BRUTALLY RUTHLESS Senior Admissions Dean at an Ultra-Selective (Sub-5%) institution. Your office is a graveyard of perfect applications.
    
    CRITERIA FOR 2025:
    1. ACADEMIC HYGIENE: A 4.0 GPA and 1580+ SAT are not "strengths"; they are the bare minimum ticket to have your file opened. If a student has an SAT under a 1450, they are functionally invisible unless they are a world-class athlete or a generational legacy.
    2. THE "POINTY" ARCHETYPE: You actively despise "well-rounded" students. "President of 5 clubs" signals a lack of focus. You want "pointy" students who have achieved mastery in a singular, narrow domain. You are looking for the next Nobel laureate, Olympic medalist, or tech unicorn founder—not a high achiever who follows a checklist.
    3. INSTITUTIONAL PRIORITY & YIELD: You are building a diverse "class ecosystem." If the school needs a rare instrumentalist, a specific type of researcher, or a student from an underrepresented rural zip code, that student gets in over the suburban valedictorian.
    4. AI SCRUTINY: You are hyper-aware of AI-generated content. If an essay feels too balanced, uses "ChatGPT-isms" (e.g., 'tapestry', 'delve', 'testament'), or lacks raw, gritty, specific human vulnerability, it is an automatic REJECT. Authenticity is the only currency left.
    
    PROBABILITY LOGIC:
    - 0-10%: The "Standard Excellence" trap. 4.0/1600 but generic ECs (Tier 3-4). This is the "Dullest" part of the pile.
    - 11-35%: Competitive. Strong stats + a verified "Major Spike" (e.g., USACO camp, USAPHO qualification, USAMO, USABO, USAJMO, any olympiad level qualification, or top 100 in any subject or section in the country relating to the major, RSI, published first-author research in a Q1 journal).
    - 36-70%: Elite/Hooked. Multiple Tier 1 achievements plus a major institutional hook (D1 recruit, major donor, specialized talent needed for the class).
  `;

    ecWeight = `
    RATING SYSTEM:
    - TIER 1 (The "God Tier"): International Olympiad Gold Medalist (IMO, IOI, IPhO), Research published in a peer-reviewed professional journal, $100k+ Revenue Startup, or a nationally recognized social movement. These are the only "Safe" bets.
    - TIER 2 (National Elite): AIME top scorer, National Merit Finalist, USABO Semifinalist, founder of a high-impact non-profit with verified $10k+ fundraising, or a top-tier summer program (TASP, MITES, SSP).
    - TIER 3 (Regional Leader): State-level awards, Student Body President of a massive school, Varsity Captain of a state-championship team. At this level, this is considered "Average."
    - TIER 4/5 (The "Filler"): General club membership, local volunteering, honor roll. If an applicant has 10 of these but zero Tier 1-2, they are viewed as "Resume Stuffers" and rejected for lack of impact.
    
    MANDATORY "EVIDENCE-OF-WORK": In 2025, titles like 'President' or 'Founder' are meaningless without artifacts. You demand proof: GitHub links with 200+ commits, portfolio websites, verified impact reports, or published abstracts. If it's not verifiable, it's considered fabricated.
  `;

  } else if (acceptanceRateNum < 25) {
    evaluationTone = `
    You are evaluating for a Top 30 Highly Selective university. You are the "Guardians of the Yield." Your primary fear is being used as a "Safety" for a student who is actually destined for an Ivy League school.
    
    CRITERIA:
    - YIELD PROTECTION & INTEREST: You are looking for "High Probability Yield." Did the student visit? Did they open every single email? Did they follow the school on social media? If a student has Ivy-level stats but zero "Demonstrated Interest," you will Waitlist them immediately to protect your stats.
    - THE "FIT" FACTOR: Your school has a specific culture (e.g., "The Work Hard/Play Hard" vibe of UMich or the "Quirky" vibe of UChicago). If the student’s personality doesn't bleed through the essay, they are out.
    - MAJOR-SPECIFIC RIGOR: If they applied for Computer Science, Engineering, or Nursing, your standards for Math/Science are 5x higher than for other majors. A 'B' in AP Calculus is a death sentence for a CS applicant here.
    - GEOGRAPHIC ASSET: You are looking to diversify your map. A student from the Midwest or a rural area has a massive advantage over a student from a hyper-competitive tech hub like the Bay Area or NYC.
  `;

    ecWeight = `
    - TIER 2-3 MANDATORY: You expect to see at least two "Deep Commitments"—activities held for 3+ years with measurable progression in responsibility.
    - IMPACT-OVER-INVOLVEMENT: You don't care that they joined a club; you care about how the club *changed* because they were in it. Did they increase membership by 50%? Did they raise $5,000? 
    - ALIGNMENT: The "Story" must make sense. If a Pre-Med student has zero clinical volunteering but spent 400 hours doing Graphic Design, you find the application "Confused." You want to see a clear path leading to the chosen major.
    - LEADERSHIP DEPTH: You prefer a student who was a "Manager" at a local job for 2 years over a student who did three different week-long "leadership seminars."
  `;

  } else if (acceptanceRateNum <= 50) {
    evaluationTone = `
    You are a Selective AO at a strong regional or flagship university. You focus on "The Growth Arc" and "Campus Contribution." You are looking for the "Engine" of the student body—the kids who will show up and actually run the campus organizations.
    
    CRITERIA:
    - THE UPWARD TREND: You are forgiving of a bad 9th-grade year if the 10th-12th grade shows a consistent, aggressive climb in rigor and grades.
    - MERIT SCHOLARSHIP PIPELINE: You use high SAT/ACT scores as a primary "Hook" to pull in top-tier talent from other states. A 1500+ student is your "Golden Goose" for merit aid.
    - COMMUNITY CONTRIBUTION: You want to know: "Will this kid be an active member of our dorms and clubs, or will they just sit in their room?"
    - RESILIENCE: You look for students who have faced some form of adversity—be it financial, personal, or academic—and pushed through it.
  `;

    ecWeight = `
    - RELIABILITY & GRIT: You value a 3-year consistent part-time job (Retail, Service, Tutoring) more than a 2-week expensive "Pay-to-Play" internship. It shows the student can handle a schedule.
    - TIER 3-4 VALUE: Being a "Captain," "Editor," or "Lead" is a very strong signal of potential here. You want to see that peers trust this student to lead.
    - BREADTH: Unlike elite schools, you actually like "Well-Rounded" kids. A student who does Sports, Theater, and Coding is an asset to a campus that needs multi-talented participants.
    - VOLUNTEERISM: You look for genuine community heart. 100+ hours of consistent service is a major "green flag."
  `;

  } else {
    evaluationTone = `
    You are a FAIR and ENCOURAGING Admissions Officer at an accessible university (>50% acceptance). Your primary mission is "Success Prediction"—you are trying to determine if this student has the foundational skills to graduate in 4 years.
    
    CRITERIA:
    - ACADEMIC READINESS: If their GPA is above your 75th percentile and they have passed their core Math/English requirements, they are effectively a "Lock."
    - RED FLAG CHECK: You are looking for reasons NOT to admit—major disciplinary issues, a total 12th-grade collapse (Senioritis), or missing graduation requirements.
    - PERSONAL CHARACTER: You value "Grit" above all else. Did they work while in school? Did they take care of younger siblings? These are the students who tend to succeed at your institution.
    - ESSAY WEIGHT: If the stats are borderline, the essay becomes the 100% deciding factor. You want to see effort and a desire to be at your school specifically.
  `;

    ecWeight = `
    - GENERAL INVOLVEMENT: Any Tier 3-5 activity is a positive "Checkmark." You just want to see that the student is a social, functional human being who participated in life outside the classroom.
    - LIFE RESPONSIBILITIES: You give massive credit for "Family Responsibilities." If a student couldn't do clubs because they had to work or babysit, you count that as a Tier 3-level commitment.
    - RECOGNITION: School-level awards (Student of the Month, Honor Roll) carry weight here as indicators of a positive attitude and reliability.
  `;
  }

  const collegeDifficulty = collegeInfo?.difficulty || 'Moderate';

  // Determine "killer major" penalty
  const KILLER_MAJORS = ['Computer Science', 'CS', 'Engineering', 'Computer Engineering', 'Electrical Engineering',
    'Mechanical Engineering', 'Finance', 'Business', 'Nursing', 'Data Science'];
  const isKillerMajor = KILLER_MAJORS.some(major =>
    profile.targetMajor.toLowerCase().includes(major.toLowerCase())
  );

  const prompt = `You are an Admissions Evaluator for ${collegeName}. Use the "Base Gravity" model. BE BRUTALLY HARSH.

**BASE GRAVITY CALCULATION:**
Start: ${acceptanceRateNum}% acceptance rate${isKillerMajor ? ` → ${(acceptanceRateNum * (isT20School ? 0.5 : 0.7)).toFixed(1)}% for competitive major "${profile.targetMajor}"` : ''}

**CATEGORY DEFINITIONS:**
- Ultra Reach = <= 10% probability (extremely unlikely)
- Reach = 11-35% probability (unlikely)
- Target = 36-70% probability (competitive)
- Safety = 71-99% probability (likely admit)

${isT20School ? `**ELITE T20 MODE (<10%): EXTREME HARSHNESS - "THE LOTTERY"**
BE MERCILESS. "Good" is NOT enough. "Great" is NOT enough.

- Perfect Stats (4.0/1600): This is merely the entry ticket. 0% boost. It guarantees NOTHING.
- Perfect Stats (4.0/1600): This is the entry ticket.
- **STATS CHECK**:
  *   IF STATS BELOW AVERAGE: AUTOMATIC <5% (Ultra Reach). Stop here.
  *   IF STATS GOOD/PERFECT but Weak ECs (No Tier 1): Max 15-25% (Reach) -> NOT Ultra Reach.
- "Well-Rounded": This is a weakness. We want a SPIKE (World-class talent).
- 1 Tier 1 Activity: Competitive. 20-30% range (Reach).
- "Well-Rounded": This is a weakness. We want a SPIKE (World-class talent).
- 1 Tier 1 Activity: Still barely competitive. Max 15-20% (Reach).
- Multiple Tier 1s: This is the ONLY path to "Target" (35%+).
- Default Verdict: Assume REJECTION (<10%) unless proven otherwise by exceptional, rare achievements.

If they are "President of Math Club" and "Captain of Tennis" with no major awards -> ULTRA REACH (<5%).` : acceptanceRateNum < 30 ? `**HIGHLY SELECTIVE MODE (10-30%): STATS ARE EVERYTHING**
Tier 1-2 activities DON'T MATTER. GPA and SAT are PRIMARY.

IF STATS WAY ABOVE AVERAGE (3.9+ GPA, 1500+ SAT):
  - AUTOMATIC Target or Safety (55-85%)
  - Good ECs = Safety (70-85%)
  - Mediocre ECs = Target (55-70%)
  
IF STATS ABOVE AVERAGE (0.1+ GPA, 50+ SAT):
  - AUTOMATIC Target (45-60%) regardless of ECs.
  
IF STATS AT AVERAGE:
  - Reach (25-40%). Good ECs add +10%.
  
IF STATS BELOW AVERAGE:
  → Reach (15-30%) or Ultra Reach (<15%).
  
ECs ONLY affect Target vs Safety, NOT whether you get in.` : acceptanceRateNum < 50 ? `**SELECTIVE MODE (30-50%): STATS ARE EVERYTHING**
Tier 1-2 activities DON'T MATTER. GPA and SAT are PRIMARY.

IF STATS ABOVE AVERAGE:
  → AUTOMATIC Target (50-65%) regardless of how bad ECs are.
  
IF STATS AT AVERAGE:
  → Reach (35-50%). Good ECs can push to 50%.
  
IF STATS BELOW AVERAGE:
  → Reach (20-35%) or Ultra Reach.
  
ECs ONLY decide Target vs Safety, NOT admission.` : `**ACCESSIBLE MODE (>50%): STATS ARE EVERYTHING**
🚫 FORBIDDEN: Never say "Tier 1", "Tier 2", "Spike", "National", or "Elite".
Tier 1-2 activities DON'T MATTER. GPA and SAT are PRIMARY.

IF STATS GOOD (3.7+ GPA, 1400+ SAT):
  → AUTOMATIC Safety (75-90%) even with terrible ECs.
  → Mediocre/Bad ECs = Target (60-70%).
  
IF STATS ABOVE AVERAGE:
  → AUTOMATIC Target (55-70%) regardless of ECs.
  
IF STATS AT AVERAGE:
  → Target (45-60%).
  
IF STATS BELOW AVERAGE:
  → Reach (25-40%).
  
ECs ONLY decide exact % within Target/Safety range.

CRITICAL: NEVER mention "Tier 1" or "Tier 2" activities in your feedback.
Focus feedback on GPA, SAT, course rigor, and general involvement level.`}

**APPLICANT:**
GPA: ${profile.gpa} | SAT: ${profile.satScore} | Major: ${profile.targetMajor}
Rigor: ${apCount} APs, ${ibCount} IBs, ${honorsCount} Honors

**ACTIVITIES${acceptanceRateNum > 50 ? ' (general involvement):' : ' (Tier 1-2 = National/Elite, Tier 3 = Regional):'}**
${acceptanceRateNum > 50 ? '' : `Tier 1-2: ${tier1Activities + tier2Activities} (${tier1Activities + tier2Activities >= 2 ? '✅ SPIKE' : '⚠️ NO SPIKE'})\n`}${activitySummary}

**PROJECTS:**
${projectSummary}

**CALCULATION STEPS:**
1. Start with base ${isKillerMajor ? `adjusted rate: ${(acceptanceRateNum * (isT20School ? 0.5 : 0.7)).toFixed(1)}%` : `rate: ${acceptanceRateNum}%`}
2. Apply academic modifiers (stats vs. school average)
3. Apply EC "Anti-Gravity" (Tier 1-2 = major boost${isT20School ? ', required for competitive chance' : ''})
4. **MAJOR ALIGNMENT CHECK (CRITICAL)**:
   - READ \`profile.targetMajor\`.
   - SCAN \`activities\` and \`projects\` for SEMANTIC RELEVANCE.
   - **USER OVERRIDE**: If an item is marked "[USER-FLAGGED: MAJOR RELATED]", you MUST treat it as highly relevant, even if it seems unrelated.
   - **INFERENCE RULE**: Use "Transferable Skills Logic". (e.g., Math Club is HIGHLY RELEVANT for Physics/CS/Engineering majors; Art Portfolio is RELEVANT for Architecture).
   - **IF ALIGNMENT IS WEAK** (No direct or indirect connection): PENALIZE PROBABILITY (-10% to -20%). "Undecided" or weak fit is a rejection factor for top schools.
   - **IF ALIGNMENT IS STRONG** (Strong direct or semantic connection): BOOST PROBABILITY (+5% to +15%).
5. ${isKillerMajor ? `Major penalty if no major-specific Tier 1-2 spike (-20-40%)` : 'No major penalty'}
6. Final probability: ONE specific % (never 100%, cap at 99%)

${acceptanceRateNum > 50 ? `🚫 CRITICAL REMINDER FOR ${collegeName} (${acceptanceRate} acceptance):
You are STRICTLY FORBIDDEN from using these words: "Tier 1", "Tier 2", "spike", "national activities", "elite activities"
Use instead: "strong involvement", "leadership experience", "meaningful activities", "commitment"
` : ''}**OUTPUT (JSON only):**
{
  "category": "Safety|Target|Reach|Ultra Reach",
  "probability": "XX%",
  "strengths": ["Specific strength 1 (e.g. '99th percentile SAT')", "Specific strength 2 (e.g. 'National Science Fair Winner')"],
  "weaknesses": ["Specific weakness 1", "Specific weakness 2"],
  "reasoning": "2-3 paragraphs: Explain the decision based ONLY on the profile and school standards. DO NOT mention 'Base Gravity', 'math', 'calculations', 'modifiers', or 'points'. Be BRUTALLY honest.${acceptanceRateNum > 50 ? ' NEVER mention Tier 1 or Tier 2 - focus on stats and general involvement.' : ''}",
  "tips": ["Tip 1: Specific action item", "Tip 2: Specific action item", "Tip 3: Specific action item"]
}

**RULES FOR OUTPUT:**
1. **Tips**: MUST be an array of separate strings. Do NOT combine them into one paragraph.
2. **Strengths**: Must be specific to the user, DO NOT just say '2-3 genuine positives'.
3. **Reasoning**: Focus on the 'Why', do not explain the 'How' (no meta-talk about the AI's math).
4. **Tips Logic**: 
   - IF probability is <= 70%: YOU MUST PROVIDE 3 SPECIFIC TIPS.
   - IF probability is > 70% (Safety): PROVIDE 3 "Next Level" tips (e.g. "Apply for Honors College", "Merit Scholarship strategies").
   - **CRITICAL**: Tips must be PERSONALIZED to the Major (${profile.targetMajor}).
     * BAD: "Join a club."
     * GOOD: "Since you are applying for Engineering, join the Robotics team to demonstrate technical skills."
   - **Format**: Frame advice based on precedent. Use phrases like "Successful ${collegeName} applicants often...", "Previous admits to this major...", "At ${collegeName}, they value...", etc.
   - Focus on specific programs, traditions, or values of ${collegeName}.

**CRITICAL: Use Difficulty Rating "${collegeDifficulty}" to calibrate your evaluation**
- "Very Hard" (Ivies, etc): Be extremely rigorous, even perfect stats = Reach/Ultra Reach
- "Hard" (UCLA, etc): Strong stats needed, be moderately strict
- "Moderate" (State schools): Solid stats = Target/Safety
- "Safety": Strong applicants should get 80-95% easily

**Major: ${profile.targetMajor}** - Adjust for major competitiveness at ${collegeName}`;
  try {
    const result = await callLocalAI(prompt, true);

    if (!result) {
      return {
        category: 'Reach',
        probability: 'Simulated',
        reasoning: `(Simulation) based on ${acceptanceRate} acceptance rate.Real AI analysis failed.`,
        tips: ["Focus on essays.", "Demonstrate interest.", "Highlight leadership."]
      };
    }

    // --- FORCE CATEGORY BASED ON PROBABILITY (USER RULE ENFORCEMENT) ---
    // We do this to ensure the AI doesn't hallucinate a "Target" for a 5% chance.
    try {
      const probStr = result.probability || "0%";
      let probNum = parseInt(probStr.replace(/[^0-9]/g, ''), 10); // Remove non-numeric, parse int

      if (!isNaN(probNum)) {
        // Cap at 99% - never give 100%
        if (probNum >= 100) {
          probNum = 99;
          result.probability = "99%";
        }

        // Enforce correct category mapping
        if (probNum <= 10) {
          result.category = "Ultra Reach";
        } else if (probNum <= 35) {
          result.category = "Reach";
        } else if (probNum <= 70) {
          result.category = "Target";
        } else {
          result.category = "Safety";
        }
      }
    } catch (e) {
      console.log("Error enforcing category logic:", e);
    }

    return result;
  } catch (error) {
    console.log('Error in analyzeCollegeChances (using fallback):', error);
    return {
      category: 'Reach',
      probability: 'Simulated',
      reasoning: `(Simulation) based on ${acceptanceRate} acceptance rate.Real AI analysis failed due to an error.`,
      tips: ["Focus on essays.", "Demonstrate interest.", "Highlight leadership."]
    };
  }
};

// ... (Generate Resume and Brag Sheet omitted, they remain unchanged) ...



// --- 5. GENERATE RESUME ---

// Helper function to calculate dates from grade levels
const calculateDatesFromGrades = (gradeLevels: number[], graduationYear: number): string => {
  if (!gradeLevels || gradeLevels.length === 0) return "Dates not specified";

  const sortedGrades = [...gradeLevels].sort();
  const startGrade = sortedGrades[0];
  const endGrade = sortedGrades[sortedGrades.length - 1];

  // Calculate years: graduation year - (12 - grade)
  const startYear = graduationYear - (12 - startGrade);
  const endYear = graduationYear - (12 - endGrade);

  const startMonth = "September";
  const endMonth = "June";

  if (startYear === endYear) {
    return `${startMonth} ${startYear} - ${endMonth} ${endYear} `;
  }
  return `${startMonth} ${startYear} - ${endMonth} ${endYear} `;
};

// Helper function to parse dates for sorting (same logic as pdfGenerator)
const parseDateForSorting = (dateStr: string): number => {
  if (!dateStr) return 0;

  // Handle "Present" - give it the highest value (future date)
  if (dateStr.toLowerCase().includes('present')) {
    return new Date(2099, 11).getTime();
  }

  // Handle date ranges like "June 2023 - August 2024" or "2023 - 2024"
  // Use the LAST date (end date, which is the most recent)
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-').map(s => s.trim());
    dateStr = parts[parts.length - 1]; // Use the end date for sorting
  }

  // Month name to number mapping (0-11 for JavaScript Date)
  const monthMap: { [key: string]: number } = {
    'january': 0, 'jan': 0,
    'february': 1, 'feb': 1,
    'march': 2, 'mar': 2,
    'april': 3, 'apr': 3,
    'may': 4,
    'june': 5, 'jun': 5,
    'july': 6, 'jul': 6,
    'august': 7, 'aug': 7,
    'september': 8, 'sep': 8, 'sept': 8,
    'october': 9, 'oct': 9,
    'november': 10, 'nov': 10,
    'december': 11, 'dec': 11
  };

  // Extract month and year from formats like "June 2024", "August 2026", etc.
  const lowerStr = dateStr.toLowerCase().trim();
  let month = 0; // Default to January
  let year = 0;

  // Try to find a month name
  for (const [monthName, monthNum] of Object.entries(monthMap)) {
    if (lowerStr.includes(monthName)) {
      month = monthNum;
      break;
    }
  }

  // Extract year (4 digits)
  const yearMatch = dateStr.match(/\d{4}/);
  if (yearMatch) {
    year = parseInt(yearMatch[0]);
  }

  // If we found a year, create a proper date with the month
  if (year > 0) {
    return new Date(year, month).getTime();
  }

  // Last resort: try to parse as a full date string
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed.getTime();
  }

  return 0;
};

export const generateResume = async (
  profile: UserProfile,
  activities: Activity[],
  projects: Project[]
): Promise<ResumeData> => {
  // FILTER: Only include activities/projects marked for resume (default to true if not set)
  const resumeActivities = activities.filter(a => a.includeInResume !== false);
  const resumeProjects = projects.filter(p => p.includeInResume !== false);
  // Sort activities by END DATE ONLY (LATEST FIRST)
  // If both have "Present", use START DATE as tiebreaker
  const sortedActivities = [...resumeActivities].sort((a, b) => {
    const endDateA = a.endDate || '';
    const endDateB = b.endDate || '';
    const endTimeA = parseDateForSorting(endDateA);
    const endTimeB = parseDateForSorting(endDateB);

    if (endTimeB !== endTimeA) {
      return endTimeB - endTimeA;
    }

    const startDateA = a.startDate || '';
    const startDateB = b.startDate || '';
    return parseDateForSorting(startDateB) - parseDateForSorting(startDateA);
  });

  // Sort projects by END DATE ONLY (LATEST FIRST)
  // If both have "Present", use START DATE as tiebreaker
  const sortedProjects = [...resumeProjects].sort((a, b) => {
    const endDateA = a.endDate || '';
    const endDateB = b.endDate || '';
    const endTimeA = parseDateForSorting(endDateA);
    const endTimeB = parseDateForSorting(endDateB);

    if (endTimeB !== endTimeA) {
      return endTimeB - endTimeA;
    }

    const startDateA = a.startDate || '';
    const startDateB = b.startDate || '';
    return parseDateForSorting(startDateB) - parseDateForSorting(startDateA);
  });
  // Calculate dates for each activity (using sorted activities)
  // Add NUMBER prefix to force AI to preserve order
  const activityList = sortedActivities.map((a, index) => {
    const dates = a.startDate && a.endDate
      ? `${a.startDate} - ${a.endDate} `
      : calculateDatesFromGrades(a.gradeLevels, profile.graduationYear);

    // Tier 1-2 = BEST (exceptional), Tier 8-10 = WORST
    const priority = a.isStarred ? "[STARRED - USER'S #1 ACTIVITY]" :
      (a.tier && a.tier <= 2) ? "[EXCEPTIONAL - Tier 1-2]" : "";

    return `#${index + 1} ${priority} ${a.position} at ${a.organization} (${dates}) - ${a.description} `;
  }).join("\n");

  // Format projects list (using sorted projects)
  // Add NUMBER prefix to force AI to preserve order
  const projectList = sortedProjects.map((p, index) => {
    const dates = p.startDate && p.endDate
      ? `${p.startDate} - ${p.endDate} `
      : "Dates not specified";
    const skills = p.skills ? ` [Skills: ${p.skills}]` : "";
    // Tier 1-2 = BEST for projects too
    const priority = (p.tier && p.tier <= 2) ? "[EXCEPTIONAL]" : "";
    return `#${index + 1} ${priority} ${p.title} (${dates})${skills} - ${p.description} `;
  }).join("\n");

  const prompt = `
  Role: Expert Resume Writer for competitive college applicants.
    Task: Create a one - page professional resume data structure with BOTH Experience and Projects sections.
      Profile: ${profile.name}, Class of ${profile.graduationYear}, Major: ${profile.targetMajor}, GPA: ${profile.gpa}.

  Activities(for Experience section):
  ${activityList}

  Projects(for Projects section):
  ${projectList}

  ** CRITICAL INSTRUCTIONS:**
    1. Write a compelling 2 - sentence Professional Summary.
  
  2. ** BULLET POINT RULES - READ CAREFULLY:**
     
     ** THE DEFAULT IS 2 BULLETS.PERIOD.**
     
     ** ONLY give 3 bullets if the activity meets ONE of these criteria:**
    - Has tag[STARRED - USER'S #1 ACTIVITY]
      - Has tag[EXCEPTIONAL - Tier 1 - 2]
  - Has tag[EXCEPTIONAL](for projects)
     
     ** DO NOT give 3 bullets for:**
    - Generic club memberships(even if they sound important)
  - Volunteer work without the tags above
    - Leadership roles without the tags above
      - Activities related to the major(unless they have a tag)

        ** EXAMPLES TO FOLLOW:**
          - #1 Debate Club Member(no tag) → 2 bullets ✓
  - #2[STARRED] Robotics Captain → 3 bullets ✓
  - #3 Volunteer at Hospital(no tag) → 2 bullets ✓
  - #4[EXCEPTIONAL - Tier 1 - 2] Research Intern → 3 bullets ✓
  - #5 Math Club President(no tag) → 2 bullets ✓ (yes, even presidents get 2 if not tagged)
     
      ** VERIFICATION:** Before outputting, count your bullets.If more than 1 - 2 activities have 3 bullets, you did it wrong.
     
  3. ** Experience Section:**
    - Focus on impact, metrics, and leadership
      - Keep bullets under 120 characters each
        - Use action verbs

  4. ** Projects Section:**
    - Include skills used
      - Same bullet rules apply

  5. ** CRITICAL - PRESERVE NUMBERED ORDER:**
    - Activities and projects are PREFIXED with #1, #2, #3, etc.
      - ** DO NOT REORDER ** - Output them in THE EXACT SAME SEQUENCE
    - #1 in input → #1 in your output(first item in experience array)
      - #2 in input → second item in experience array
        - They are ALREADY SORTED by end date(latest first)
          - The first activity(#1) has the LATEST end date
            - The last activity has the EARLIEST end date

  6. Use the EXACT dates provided - DO NOT make up dates.
   
   7. Infer relevant skills from both activities and projects.

  Output JSON:
  {
    "summary": "...",
      "education": { "school": "...", "gradYear": "...", "gpa": "...", "coursework": "..." },
    "experience": [{ "role": "...", "organization": "...", "dates": "exact dates", "bullets": ["2 bullets for most, 3 for starred/exceptional ONLY"] }],
      "projects": [{ "title": "...", "skills": "...", "dates": "exact dates", "bullets": ["2 bullets for most, 3 for exceptional ONLY"] }],
        "skills": ["..."],
          "awards": ["..."]
  } `;

  try {
    const result = await callLocalAI(prompt, true);
    if (!result) {
      return {
        summary: "Student summary...",
        education: { school: "HS", gradYear: "2026", gpa: "4.0", coursework: "AP" },
        experience: [],
        projects: [],
        skills: [],
        awards: []
      };
    }

    // POST-AI SAFETY: Re-sort experience and projects to guarantee correct order
    // This ensures correct order even if AI disobeys our instructions
    if (result.experience && result.experience.length > 0) {
      result.experience.sort((a: { dates: string }, b: { dates: string }) => {
        const endDateA = a.dates.split(' - ').pop() || '';
        const endDateB = b.dates.split(' - ').pop() || '';
        const endTimeA = parseDateForSorting(endDateA);
        const endTimeB = parseDateForSorting(endDateB);

        if (endTimeB !== endTimeA) {
          return endTimeB - endTimeA;
        }

        const startDateA = a.dates.split(' - ')[0] || '';
        const startDateB = b.dates.split(' - ')[0] || '';
        return parseDateForSorting(startDateB) - parseDateForSorting(startDateA);
      });
    }

    if (result.projects && result.projects.length > 0) {
      result.projects.sort((a: { dates: string }, b: { dates: string }) => {
        const endDateA = a.dates.split(' - ').pop() || '';
        const endDateB = b.dates.split(' - ').pop() || '';
        const endTimeA = parseDateForSorting(endDateA);
        const endTimeB = parseDateForSorting(endDateB);

        if (endTimeB !== endTimeA) {
          return endTimeB - endTimeA;
        }

        const startDateA = a.dates.split(' - ')[0] || '';
        const startDateB = b.dates.split(' - ')[0] || '';
        return parseDateForSorting(startDateB) - parseDateForSorting(startDateA);
      });
    }

    return result;
  } catch (error) {
    console.log('Error in generateResume (using fallback):', error);
    return {
      summary: "Student summary...",
      education: { school: "HS", gradYear: "2026", gpa: "4.0", coursework: "AP" },
      experience: [],
      projects: [],
      skills: [],
      awards: []
    };
  }
};

// --- 6. GENERATE BRAG SHEET ---
export const generateBragSheet = async (
  profile: UserProfile,
  activities: Activity[]
): Promise<BragSheetData> => {
  // Pass full activity details for accurate brag sheet generation
  const activityDetails = activities.map(a =>
    `${a.position} at ${a.organization}: ${a.description} (${a.type})`
  ).join("\n");

  const prompt = `
  Role: College Counselor writing a CONCISE \"Brag Sheet\" for a teacher recommendation letter.
  Task: Create a BRIEF narrative summary based on REAL activities.BE CONCISE - quality over quantity.
    Profile: ${profile.name}, Major: ${profile.targetMajor}.

  Activities(process these, don't copy verbatim):
  ${activityDetails}

  ** CRITICAL INSTRUCTIONS **:
    1. introaryStatement: 2 - 3 sentences MAX summarizing the student's profile.
  2. academicHighlight: 1 - 2 sentences about academic strengths / achievements.
  3. keyExperiences: Pick the TOP 3 - 4 most impressive activities ONLY.For each:
    - Title: Activity name
  - Narrative: 2 - 3 sentences of IMPACT(not description).What did they achieve / create / change ?
    4. personalQualities: List 2 - 3 qualities MAX that are EVIDENCED by their activities.

  ** PROCESSING RULES **:
    - SYNTHESIZE information, don't copy user text word-for-word
  - Focus on IMPACT and RESULTS, not descriptions
  - Be punchy and specific
  - Skip generic / weak activities

  Output JSON:
    {
      "introaryStatement": "2-3 sentences",
      "academicHighlight": "1-2 sentences",
      "keyExperiences": [{ "title": "Activity Name", "narrative": "2-3 sentences of IMPACT" }],  // MAX 3-4 items
      "personalQualities": ["Quality 1", "Quality 2"]  // MAX 2-3 items
    }`;

  try {
    const result = await callLocalAI(prompt, true);
    if (!result) {
      return {
        introaryStatement: "Strong student with diverse interests.",
        academicHighlight: "Maintains high academic performance.",
        keyExperiences: [],
        personalQualities: []
      };
    }
    return result;
  } catch (error) {
    console.log('Error in generateBragSheet (using fallback):', error);
    return {
      introaryStatement: "Strong student with diverse interests.",
      academicHighlight: "Maintains high academic performance.",
      keyExperiences: [],
      personalQualities: []
    };
  }
};

// --- 7. ANALYZE ARCHETYPES ---
export const analyzeStudentArchetypes = async (
  profile: UserProfile,
  activities: Activity[],
  projects: Project[]
): Promise<NarrativeAnalysis> => {
  // Format activities with tier information
  const activityList = activities.map(a => {
    const tierInfo = a.tier ? ` [Tier ${a.tier} / 10]` : '';
    const starred = a.isStarred ? ' [⭐ STARRED]' : '';
    return `- ${a.position} at ${a.organization}(${a.type})${starred}${tierInfo}: ${a.description}`;
  }).join("\n");

  // Format projects
  const projectList = projects.map(p => {
    const skills = p.skills ? ` [Skills: ${p.skills}]` : '';
    const tierInfo = p.tier ? ` [Tier ${p.tier} / 10]` : '';
    return `- ${p.title}${tierInfo}${skills}: ${p.description}`;
  }).join("\n");

  // Count AP/IB/Honors courses
  const apCount = parseInt(profile.apCount || "0");
  const ibCount = parseInt(profile.ibCount || "0");
  const honorsCount = parseInt(profile.honorsCount || "0");

  // Get top-tier activities (Tier 1-3)
  const topActivities = activities.filter(a => a.tier && a.tier <= 3);
  const starredActivity = activities.find(a => a.isStarred);

  const prompt = `
  Role: College Strategy Consultant.
    Goal: Analyze this student's comprehensive profile to generate 3 distinct "Archetypes" that frame their unique application narrative.
  
  Rules:
    1. Intersectionality: Combine fields(e.g., CS + Art, STEM + Social Impact, Business + Tech).
    2. No Clichés: Avoid generic labels like "Hard Worker" or "Well-Rounded Student".
    3. Evidence - Based: Each archetype MUST cite specific activities, projects, or achievements from the profile.
    4. Address the student directly as "you" in the analysis_summary(e.g., "Your profile shows..." instead of "The student's profile...").
    5. Create exactly 3 unique archetypes, each with a creative name and memorable tagline.
    6. Use ALL available data: academics, activities, projects, and any standout achievements.

  ** STUDENT PROFILE:**
  
  ** Academic Stats:**
    - Target Major: ${profile.targetMajor}
  - GPA: ${profile.gpa || 'Not specified'} / 4.0
    - SAT Score: ${profile.satScore || 'Not specified'}
  - Course Rigor: ${apCount} AP courses, ${ibCount} IB courses, ${honorsCount} Honors courses
    - Graduation Year: ${profile.graduationYear}
  ${starredActivity ? `- Starred Activity (Most Important): ${starredActivity.position} at ${starredActivity.organization}` : ''}
  ${topActivities.length > 0 ? `- Top-Tier Activities (Tier 1-3): ${topActivities.length} exceptional activities` : ''}
  
  ** Activities(${activities.length} total):**
    ${activityList || 'No activities listed'}
  
  ** Projects(${projects.length} total):**
    ${projectList || 'No projects listed'}

  ** ANALYSIS INSTRUCTIONS:**
    Based on the COMPLETE profile above(academics + activities + projects), identify 3 distinct narrative angles that:
  1. Highlight intersections between different interests / fields
  2. Emphasize unique combinations of skills or experiences
  3. Show how different parts of the profile work together to tell a story
  
  For example:
  - If they have strong CS activities + art projects → "Creative Technologist"
    - If they have research + entrepreneurship → "Scholar-Innovator"
      - If they have STEM + community service → "Tech for Good Advocate"

  Output JSON Format:
  {
    "analysis_summary": "2-3 sentences on overall profile strength, addressing the student as 'you'. Reference SPECIFIC activities, projects, or stats.",
      "narratives": [
        {
          "archetype_name": "Creative, Compelling Title",
          "tagline": "A memorable 5-8 word tagline that captures their unique brand"
        }
      ]
  }
  
  Examples of good archetypes:
  - archetype_name: "Tech-Driven Social Innovator", tagline: "Building apps that change communities"
    - archetype_name: "Interdisciplinary STEM Leader", tagline: "Where robotics meets environmental science"
      - archetype_name: "Creative Technologist", tagline: "Coding with an artist's eye"
        - archetype_name: "Research-Focused Entrepreneur", tagline: "From lab bench to startup launch"

  CRITICAL: You MUST generate exactly 3 narratives with BOTH archetype_name AND tagline for each.Base them on REAL activities and projects from the profile above.`;

  try {
    const result = await callLocalAI(prompt, true);
    if (!result) {
      return {
        analysis_summary: "Strong potential. Connect AI for deep analysis.",
        narratives: []
      };
    }
    return result;
  } catch (error) {
    console.log('Error in analyzeStudentArchetypes (using fallback):', error);
    return {
      analysis_summary: "Strong potential. Connect AI for deep analysis.",
      narratives: []
    };
  }
};

// --- FEATURE 8: IVY LEAGUE INTERVIEWER ---
// Note: We no longer need the complex Interviewer object for this simplified flow
import { Interviewer } from "../types";

export const startInterview = async (profile: UserProfile, activities: Activity[], collegeName: string) => {
  const firstAct = activities.length > 0 ? activities[0] : null;

  // Inject the user's REAL first activity if available
  const actContext = firstAct
    ? `Ask specifically about their role as ${firstAct.position} at ${firstAct.organization} (${firstAct.description}).Do not be generic.`
    : "Ask why they want to major in " + profile.targetMajor;

  const prompt = `
  Role: Alex, Senior Interviewer from ${collegeName}.
  Persona: Professional, inquisitive, but specific to ${collegeName} 's culture.
  Task: Start the interview.Introduce yourself simply as Alex.Ask the first hard question based on the context below.
    Context: Student is applying for ${profile.targetMajor}.
      Instruction: ${actContext}
  Output: Just the text of what you say.No 'Alex:' prefix.`;

  try {
    const result = await callLocalAI(prompt);
    return result || `Hello, I'm Alex. I've reviewed your application.Tell me about your interest in ${profile.targetMajor}.`;
  } catch (error) {
    console.log('Error in startInterview (using fallback):', error);
    // Provide contextual fallback based on profile
    if (firstAct) {
      return `Hello, I'm Alex from ${collegeName}. I see you were ${firstAct.position} at ${firstAct.organization}. Tell me about that experience.`;
    }
    return `Hello, I'm Alex from ${collegeName}. I've reviewed your application. What draws you to ${profile.targetMajor}?`;
  }
};

export const continueInterview = async (history: { role: string, text: string }[], userResponse: string, collegeName: string) => {
  // Use Foundation Model directly via callLocalAI
  const lastFew = history.slice(-3).map(h => `${h.role}: ${h.text}`).join("\n");

  // Enriched prompt for the Generative Model
  const prompt = `
  Role: Alex, Senior Interviewer from ${collegeName}.
  History:
  ${lastFew}
  
  User Answer: ${userResponse}
  
  Task: Respond to the User's answer. 
  Rules: Stay in character as Alex. Ask a follow-up question. Keep it short (1-2 sentences). Be realistic.
  Output: Just the text.`;

  try {
    const response = await callLocalAI(prompt);
    return response || "That's interesting. Can you tell me more about how that impacted your team?";
  } catch (error) {
    console.log('Error in continueInterview (using contextual fallback):', error);

    // Generate dynamic fallback responses based on conversation context
    const fallbackResponses = [
      "I appreciate your perspective. How do you think this experience has prepared you for college?",
      "That's helpful context. What would you say is your biggest strength?",
      "Interesting. Can you tell me about a challenge you've faced and how you overcame it?",
      "I see. What specific aspects of our program interest you most?",
      "Thank you for sharing. How do you envision contributing to our campus community?",
      "That gives me good insight. What's a recent accomplishment you're proud of?"
    ];

    // Use conversation length to cycle through different responses
    const responseIndex = history.length % fallbackResponses.length;
    return fallbackResponses[responseIndex];
  }
};

// --- 8. INTERVIEW FEEDBACK ---
export const generateInterviewFeedback = async (history: { role: string, text: string }[], unsafeContentCount: number = 0) => {
  const fullConv = history.map(h => `${h.role}: ${h.text}`).join("\n");

  // Calculate user word count to detect silence/low effort
  const userText = history.filter(h => h.role === 'user').map(h => h.text).join(" ");
  const userWordCount = userText.split(/\s+/).length;
  const isSilent = userWordCount < 5;

  if (isSilent) {
    return {
      score: 1,
      impression: "Silent / Unresponsive",
      strengths: ["None shown"],
      weaknesses: ["Did not answer questions", "Complete lack of preparation"],
      verdict: "Definite Reject"
    };
  }

  const prompt = `
  Role: Senior Admissions Dean reviewing an Alumni Interview Report.
  Conversation:
  ${fullConv}

  Task: Evaluate the student's performance with BRUTAL REALISM.
  
  CRITICAL GRADING RULES:
  1. **SILENCE/SHORT ANSWERS**: If the user said very little (one word answers), missed the point, or was silent, SCORE MUST BE < 3. Verdict: "Reject".
  2. If the student was rude, dismissive, short, or said they "hate" the college: SCORE MUST BE 1/10. Verdict: "Reject".
  3. If the student gave generic answers (e.g. "I work hard"): Max Score 4/10.
  4. High scores (8-10) are RESERVED for students who showed deep research and specific "spikes".
  5. **CHECK THE CONVERSATION**: Did the user actually answer the questions? If not, fail them.

  Output JSON:
  {
    "score": Integer (1-10),
    "impression": "String (e.g. 'Arrogant and unprepared' or 'Polished but robotic')",
    "strengths": ["String", "String"],
    "weaknesses": ["String", "String"],
    "verdict": "String (e.g. 'Strong Admit', 'Likely Reject', 'Definite Reject')"
  }`;

  const result = await callLocalAI(prompt, true);
  if (!result) {
    return {
      score: Math.max(1, 3 - unsafeContentCount),
      impression: "Simulation: AI Failed.",
      strengths: ["N/A"],
      weaknesses: unsafeContentCount > 0
        ? ["System Error", `${unsafeContentCount} inappropriate response${unsafeContentCount > 1 ? 's' : ''} flagged`]
        : ["System Error"],
      verdict: "Error"
    };
  }

  // Apply penalty: subtract 1 point per flagged message, minimum score of 1
  if (unsafeContentCount > 0) {
    result.score = Math.max(1, result.score - unsafeContentCount);

    // Add weakness about inappropriate content if not already mentioned
    const inappropriateWeakness = `${unsafeContentCount} inappropriate or unprofessional response${unsafeContentCount > 1 ? 's' : ''} during interview`;
    if (!result.weaknesses) {
      result.weaknesses = [inappropriateWeakness];
    } else if (!result.weaknesses.some((w: string) => w.toLowerCase().includes('inappropriate') || w.toLowerCase().includes('unprofessional'))) {
      result.weaknesses.push(inappropriateWeakness);
    }
  }

  return result;
};