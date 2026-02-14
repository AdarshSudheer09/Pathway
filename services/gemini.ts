import { Platform, NativeModules } from 'react-native';
import {
  Activity, UserProfile, CollegeAnalysis,
  ActivityImpactAnalysis, ResumeData, BragSheetData,
  NarrativeAnalysis, Project
} from "../types";

// --- DATA CONSTANTS (SOURCE OF TRUTH) ---
const RANK_RUBRIC = `
01 | Platinum II
- Olympiads: IMO/IChO/IBO/IPhO/IOI Medalist (International stage).
- National Winners: USAMO Winner (Top 12), USNCO/USABO/USAPhO Gold Medalist (Top 20/Winner), 1st Place at ANY National Competition (Science Olympiad, Science Bowl, FBLA, DECA ICDC).
- Research: Regeneron STS Top 10, ISEF Grand Prize Winner (Gordon E. Moore Award).
- Societal: Thiel Fellow, Major published Author (Big 5 publishers), NYT Editorial Contest Winner.
- Innovation: Breakthrough Junior Challenge Winner, 3M Young Scientist Winner.
- Athletics: Individual National Champion (Swimming, Tennis, Golf, etc.), Olympic Medalist.
- Leadership: Boys/Girls Nation President, USSYP National Representative.

02 | Platinum I
- Competitions: USACO Camp, MOP (Red/Blue), US Physics Team (Top 24).
- Elite Research: RSI (Research Science Institute) Participant, Regeneron STS Top 40 (Finalist).
- Sports: D1 Recruited Athlete (Top 10 program), National Team Member (Olympic Developmental).
- Arts: YoungArts Finalist, Presidential Scholar in the Arts, Juilliard Pre-College (Advanced).
- Civic: Youth Poet Laureate (National), National Student Poet.
- Tech: VEX Robotics World Champion.

03 | Diamond II
- Competitions: USNCO/USABO/USAPhO Top 20 (Finalist), USAMO Winner, IPPF Top 32, CyberPatriot National Top Scorer.
- Research: Regeneron STS Scholar (Top 300), ISEF Category Award (1st-3rd), JSHS National Finalist.
- Civic: Boys/Girls Nation Senator, United States Senate Youth Program (USSYP), Congressional Award Gold.
- Tech: Google Summer of Code (GSoC) Participant, High-traffic Open Source Contributor (e.g., React, Linux).
- Entrepreneurship: Founder of revenue-generating startup ($50k+ revenue), Thiel Fellowship Finalist.
- Arts: National High School Musical Theatre Awards (Jimmy Awards) Finalist, NYO-USA Member.

04 | Diamond I
- Competitions: USACO Platinum, USAMO/USAJMO Qualifier, AIME Top Score, NSDA Nationals Breaker.
- Research: Published as 1st or 2nd author in a peer-reviewed journal (Q1/Q2 Impact).
- Elite Summer: TASP, Bank of America Student Leaders, Wharton LBW, MITES, Governor's School (Highly Selective).
- Arts: All-National Music Participant, Scholastic Gold Medal (National), YoungArts Winner (Merit/Honorable Mention).
- Civic: Boys/Girls State Governor, State Board of Education Student Representative, US Senate Page.
- Awards: Coolidge Senator (Finalist), National Merit Finalist, LEDA Scholar, NSLI-Y Participant.

05 | Gold II
- Competitions: USACO Gold, AMC 12 Honor Roll, USNCO Honors, USABO Semifinalist, HOSA ILC Top 10.
- Arts: All-State Music (Band/Orchestra), Scholastic Art & Writing National Silver, All-Eastern/All-Regional Music.
- Academic: Publication in an undergraduate research journal, 1st author in high school research symposium.
- Leadership: Student Body President (Large school), DECA ICDC Finalist, Model UN Head Delegate.
- Tech: Published App (10,000+ users), Major Tech Internship (local startup), National Hackathon Winner.
- Awards: Congressional App Challenge Winner (District), PEYA Regional Winner, NCWIT National Winner.

06 | Gold I
- Competitions: USACO Silver, AIME Qualifier, National History Day (NHD) State Winner, TSA State Medalist.
- Summer: COSMOS (UC), Yale Young Global Scholars (YYGS), Notre Dame Leadership Seminars, HOBY Delegate.
- Sports: All-Conference selection, State-level individual qualifier, Varsity Captain (multiple years).
- Service: President’s Volunteer Service Award (Gold), Congressional Award (Bronze/Silver).
- Civic: Governor’s School (Standard), City Council Youth Advisor, Boys/Girls State Delegate.
- Tech: Published App (1,000-10,000 users), Winner at regional Hackathon, FIRST Dean's List Finalist.

07 | Silver II
- Competitions: FBLA/DECA State Placer, SkillsUSA State Placer, Science Olympiad Regional Medalist, MUN Gavel.
- Arts: All-District Band/Orchestra, Lead in community theater, Scholastic Art & Writing Regional Silver Key.
- Leadership: Student Body VP, Class President, Founder of a local non-profit (documented impact).
- Journalism: Newspaper Editor, Yearbook Editor-in-Chief, Literary Magazine Founder.
- Tech: Published App (100-1000 users), Top 10% in Regional Hackathon, open-source contributor (minor).
- Awards: National Merit Semifinalist, AP Scholar with Distinction, State History Day Participant.

08 | Silver I
- Leadership: Multi-club officer, Student Council Representative, Youth Group Leader, Eagle Scout/Gold Award.
- Sports: Varsity Starter, All-League honorable mention, Regional qualifier in individual sports (Cross Country/Track).
- Arts: Lead role in school musical, Section Leader in Band, Scholastic Art & Writing Regional Honorable Mention.
- Academic/Service: 150+ Volunteer hours, President’s Volunteer Service Award (Bronze/Silver), 4-5 AP courses.
- Pre-Professional: Shadowing a professional (20+ hours), Real estate intern, Bank teller, local tutoring business.
- Awards: National Merit Commended, National Honor Society (NHS) member, Beta Club, Honor Roll (3+ years).

09 | Bronze II
- Sports: JV Captain, Varsity member (non-starter), Intramural referee, lifeguard certified.
- Arts: Band/Orchestra/Choir (regular member), School play ensemble, Stage crew, private music lessons.
- Jobs: Cashier, server, retail, babysitting, lawn mowing, CPR/First Aid certified.
- Leadership: Secretary/Treasurer of a niche club, founder of a casual/interest-based school club.
- Tech: CompTIA IT Fundamentals+, Certified SolidWorks Associate (CSWA), completed a Coursera/EdX cert.
- Awards: Local essay contest (honorable mention), school-wide "Student of the Month."

10 | Bronze I
- Hobbies: Casual fitness, gaming, reading, photography, blogging (low reach), recreational cooking.
- School Clubs: General member in Chess, Anime, Gardening, Film, Art, or Language clubs.
- Community: Local library volunteer, church choir, animal shelter assistant, park cleanup.
- Academics: Honor Roll, Perfect Attendance, taking 1-2 AP/IB courses, school-level peer tutor.
- Athletics: JV team member, Intramural sports, recreational league participant.
`;

// --- UNIVERSAL LOCAL AI BRIDGE (FOUNDATION MODELS) ---
// console.log("--------------------------------------------------");
// console.log("AVAILABLE MODULES:", Object.keys(NativeModules).filter(key => key.includes("Local")));
// console.log("--------------------------------------------------");
const LocalLLM = NativeModules.LocalLLMBridge;

// Check if device supports Foundation Models (iPhone 15 Pro+)
export const hasFoundationModelsSupport = async (): Promise<boolean> => {
  console.log("[Foundation Models] Checking support...");
  if (!LocalLLM) {
    console.warn("[Foundation Models] Native Module LocalLLMBridge is null.");
    return false;
  }
  try {
    if (LocalLLM.hasFoundationModelsSupport) {
      const supported = await LocalLLM.hasFoundationModelsSupport();
      console.log(`[Foundation Models] Support status: ${supported}`);
      return supported;
    }
    console.warn("[Foundation Models] hasFoundationModelsSupport method missing on bridge.");
    return false;
  } catch (error) {
    console.error('[Foundation Models] Capability check failed:', error);
    return false;
  }
};

const callLocalAI = async (prompt: string, isJson: boolean = false): Promise<any> => {
  //console.log(`[Foundation AI] Generating... Prompt length: ${prompt.length}`);
  try {
    if (LocalLLM && LocalLLM.generateResponse) {
      // 1. Send the prompt to the on-device Foundation Model
      const response = await LocalLLM.generateResponse(prompt);

      console.log('[LocalAI] Raw response length:', response ? response.length : 0);

      if (!response) {
        console.warn("[LocalAI] Model returned empty/null response.");
        return null;
      }

      // 2. Handle JSON parsing robustly (Models often wrap JSON in markdown)
      if (isJson) {
        try {
          // Robust JSON Sanitizer
          let cleanText = response.trim();

          // 1. Remove Markdown Code Blocks (Standard & variants)
          cleanText = cleanText.replace(/```json/gi, "").replace(/```/g, "");

          // 2. Find the first '{' and the last '}' to extract JSON object
          const firstOpen = cleanText.indexOf('{');
          const lastClose = cleanText.lastIndexOf('}');

          if (firstOpen !== -1 && lastClose !== -1) {
            cleanText = cleanText.substring(firstOpen, lastClose + 1);
          }

          // 3. Trailing Comma Fix (Common LLM Error)
          cleanText = cleanText.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");
          // 4. Double Comma / Leading Comma Fix
          cleanText = cleanText.replace(/,\s*,/g, ",").replace(/{\s*,/g, "{").replace(/\[\s*,/g, "[");

          // 5. Handle unescaped newlines within strings (basic attempt)
          // This is risky but often needed for LLM outputs that contain multi-line strings without \n
          // cleanText = cleanText.replace(/\n/g, "\\n"); 

          // console.log('[LocalAI] Cleaned JSON text:', cleanText); // UN-MUTED FOR DEBUGGING
          const parsed = JSON.parse(cleanText);
          // console.log('[LocalAI] Parsed JSON:', parsed); // Muted verbose log
          console.log('[LocalAI] JSON Parse Success!');
          return parsed;
        } catch (parseError) {
          console.log("JSON Parse Error caught, retrying...");
          // console.log('[LocalAI] Parse warning (handled):', parseError); // UN-MUTED FOR DEBUGGING

          // Attempt basic recovery
          try {
            // Retry with a more aggressive cleaner if the first one failed
            // Sometimes LLMs output things like: { "key": "value" } Note: ...
            // We already tried substring, but maybe something else is wrong.

            // Check for common error: escaping double quotes incorrectly
            // e.g. "description": "He said "Hello"" -> "description": "He said \"Hello\""
            // This is hard to fix with regex perfectly without breaking valid JSON.

            // For now, let's just try to re-parse potential fragments if the substring logic failed previously
            // or if there were hidden characters.

            // One last ditch attempt: remove all control characters except allowed ones?
            // Specifically target the "Unexpected character: B" type errors by removing non-JSON characters from start
            const firstOpen = cleanText.indexOf('{');
            const lastClose = cleanText.lastIndexOf('}');
            if (firstOpen !== -1 && lastClose !== -1) {
              const jsonSubstring = cleanText.substring(firstOpen, lastClose + 1);
              // Remove any non-printable characters that might have snuck in (except \n, \r, \t)
              const sanitized = jsonSubstring.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F]/g, "");
              return JSON.parse(sanitized);
            }
            return null;
          } catch (e) {
            console.log("Final JSON recovery failed.");
            return null; // Return null so the caller uses fallback
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

  // CHECK SUPPORT FIRST:
  // If NO Foundation Model support, we MUST send a CLEAN prompt (Activity Only) to the Bridge.
  // Sending the Rubric causes "Pollution" where the Analyzer matches keywords inside the Rubric instructions.
  const supportsFoundation = await hasFoundationModelsSupport();

  let prompt = "";

  if (supportsFoundation) {
    // FULL LLM PROMPT (AI Models need context)
    prompt = `
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

    **CALIBRATION RULES (NON-NEGOTIABLE):**
    1. **NATIONAL WINNER = TIER 10 (Platinum II)**.
       - "1st Place", "Winner", "Gold Medal", or "Champion" at any NATIONAL level competition (e.g., USAPhO, USNCO, National Science Olympiad, FBLA Nationals, DECA ICDC) is AUTOMATICALLY 10/10.
       - Do NOT downgrade National Wins to Tier 9. They are Tier 10.
    2. **NATIONAL FINALIST = TIER 8 (Diamond II)**.
       - Top 20, Finalist, or National Qualifier is Tier 8.
    3. **INTERNATIONAL MEDALIST = TIER 10**.
    4. **STATE WINNER = TIER 6 (Gold II)**.

    **INFERENCE & PREDICTION LOGIC (APPLY TO ALL TIERS)**:
    - **Use the Rubric as training examples, NOT an exhaustive list.**
    - **Tier 1-2 (Bronze)**: PATTERN = "Participant", "Member", "Volunteer". If the activity is casual participation or basic membership, infer Tier 1-2.
    - **Tier 3-4 (Silver)**: PATTERN = "Local Leadership", "School Award", "Club Officer". If they lead at a school/city level or win local awards, infer Tier 3-4.
    - **Tier 5-6 (Gold)**: PATTERN = "Regional/State Recognition". If they placed/won at a State level competition or lead a large regional initiative, infer Tier 5-6.
    - **Tier 7-8 (Diamond)**: PATTERN = "National Qualifier/Finalist". If they reached the National level (e.g. Qualified for Nationals, Finalist) or have significant research, infer Tier 7-8.
    - **Tier 9-10 (Platinum)**: PATTERN = "National/International WINNER". If they are #1 in the Country (National Champion) or Top in the World, infer Tier 10.
    - **Instruction**: When you see an unlisted activity, match it to these PATTERNS.
      * Example: "State Knitting Champion" matches "State Recognition" -> Tier 6.
      * Example: "Founder of International Non-Profit (Featured in NYT)" matches "Elite/Societal" -> Tier 10.
    
    **INFERENCE LOGIC: SCOPE > TITLE (CRITICAL)**:
    - **Do NOT be fooled by titles.** "Founder", "President", "Captain" are meaningless without **SCOPE**.
    - **School Level (Impact limited to 1 school)**: 
      - MAX TIER = 5 (Gold I).
      - Standard = Tier 3-4 (Silver).
      - *Reasoning*: Leading a club at one school is a standard activity.
    - **Regional Level (Impacts multiple schools/city)**:
      - TIER RANGE = 5-6 (Gold).
      - *Requirement*: Must show external recognition or multi-school participation.
    - **National Level (Impacts the country)**:
      - TIER RANGE = 7-8 (Diamond).
      - *Requirement*: National awards, 1000+ users, published research.
    - **International Level (Global Impact)**:
      - TIER RANGE = 9-10 (Platinum).

    **RE-CALIBRATION INSTRUCTIONS**:
    - If the activity is "President of [School Club]" -> Check Scope.
      - If Scope = School -> **Tier 4 (Silver II)**.
      - If Scope = National Chapter with Awards -> **Tier 6-7**.
    - If the activity is "Varsity Captain" -> Check Scope.
      - If Scope = School Team -> **Tier 4**.
      - If Scope = State Champion Team -> **Tier 6**.

    **IMPORTANT SCORING ADJUSTMENTS**:
    - **Major Relevance (SEMANTIC INFERENCE)**:
      * **Do NOT look for exact keyword matches.**
      * **Think like an Admissions Officer**: Ask "Does this activity demonstrate skills or interest relevant to ${targetMajor}?"
      * **Transferable Skills Logic**:
        - Math/Logic activities (Chess, Math Club, Coding) -> RELEVANT for CS, Engineering, Physics, Economics.
        - Communication activities (Debate, MUN, Writing) -> RELEVANT for Law, PolSci, Business, English, History.
        - Biology/Chem activities -> RELEVANT for Pre-Med, Nursing, Health.
        - Art/Design -> RELEVANT for Architecture, UI/UX, Marketing.
      * If marked as "**USER NOTE**: ... RELATED" -> TRUST THE USER unless objectively impossible.
      * If related (Direct or Transferable), boost score by 0.5-1 point (except for Tier 10 which is capped).
      * **LIMITATION**: Major Relevance boosts the *Score* within the Tier, it does NOT jump Tiers.
        - Ex: Math Club (Tier 4) + Math Major = Tier 4.5 (Strong Silver), NOT Tier 7 (Diamond).
    - **Tech/Apps**: 10k+ users = Gold II (6/10), 100k+ = Diamond I (7/10).
    - **Research**: Published in undergraduate journal = Gold II (6/10), Peer-reviewed Q1 = Diamond (7-8/10).
    
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

    **EXTENSIVE JUDGING PROTOCOL (DEEP SCRUTINY)**:
    - **Vague Description Penalty**: If the description is "Managed club" or "Helped members" without numbers -> **CAP at Tier 3 (Silver I)**.
    - **"President" Inflation Check**: If "President" is the ONLY achievement -> **FORCE Tier 4 (Silver II)**.
    - **Member vs Leader**: "Member" = Tier 1-2. "Leader" = Tier 3-4. "Founder" = Tier 3-5 (unless news coverage).
    - **Awards Verification**: If they claim "National Winner" but description doesn't name the award -> **DOWNGRADE to Tier 6 (Gold II)**. Doubt is negative.

    **FEEDBACK RULES (CRITICAL)**:
    - **SPECIFICITY REQUIRED**:
      * You MUST quote or reference specific details from the user's input (e.g., "Your role managing ${activity.organization}..." or "The ${activity.position} title is strong but...").
      * **Do NOT use generic advice** like "gain more leadership" or "increase impact". SAY HOW.
      * Example: "Instead of just 'attending meetings', try organizing a regional hackathon for 5+ schools."
    - **HYPER-SPECIFIC ACTIONS (MANDATORY)**:
      * **Do NOT give category advice** (e.g., "Join a Hackathon" if they are already coding).
      * **Ask: "What is the logical next step for THIS specific project?"**
      * If they built an App -> "Launch on App Store / Get 100 users."
      * If they run a Club -> "Organize a district-wide event for 3 schools."
      * If they did Research -> "Submit to [Specific Journal Name] or state fair."
      * **The advice MUST be about the activity described.**
    - **TIER 9-10 (Platinum/Elite) IMMUNITY**:
      * IF score is 9 or 10, \`brutal_feedback\` MUST BE 100% POSITIVE.
      * DO NOT critique. DO NOT say "Try to do more." They are already at the top.
      * Focus identifying *why* it is elite (e.g. "This is a world-class achievement.").
      * \`level_up_action\` should be: "Maintain this excellence" or "Leverage this for Top 10 college essays".
    - **TIER 1-8**: Be constructive but direct using the rules above.
    
    **MAJOR RELEVANCE LOGIC**:
    - **Relevance = Score Boost**:
      * If an activity is logically related to ${targetMajor}, you **MUST** boost the score (unless already 10).
      * **Reasoning Requirement**: In \`rank_description\`, you MUST explicitly state the connection if one exists (e.g., "Relevant to ${targetMajor} due to transferable [Skill Name] skills").
      * **Benefit of the Doubt**: If the user says it's related, or if there's a loose connection, COUNT IT.

    **Example**: "Generic club membership unrelated to major" → Lower score
    Output JSON: {
      "score": Integer (1-10, strict calibration),
      "rank_name": "String (e.g., Silver I)",
      "rank_description": "Assessment. IF RELATED: You must mention 'Relevant to Major because...'",
      "brutal_feedback": "Critique. IF TIER 9-10: NO CRITIQUE, only praise.",
      "level_up_action": "Specific advice. IF TIER 9-10: focus on essays/portfolios."
    }`;
  } else {
    // MINIMAL TEXT PROMPT (For Native Regex/Keyword Analyzer)
    // The native analyzer uses "contains" on the entire string. 
    // If we include the rubric, it matches keywords IN THE RUBRIC.
    prompt = `Activity: ${activity.position} at ${activity.organization}: ${activity.description}`;
    console.log('[Gemini] Using Minimal Prompt for Native Analyzer to prevent rubric pollution.');
  }

  try {
    let result = await callLocalAI(prompt, true);

    // FAILSAFE: If the Foundation Model failed (returned null) OR we suspect hallucination
    // Fall back to the "Native Regex Analyzer" (which is triggered by sending a minimal prompt)
    if (!result && supportsFoundation) {
      console.log('[Gemini] Foundation Model failed. Falling back to Native Regex Analyzer...');
      const fallbackPrompt = `Activity: ${activity.position} at ${activity.organization}: ${activity.description}`;
      // Logic: The Native Bridge detects the "Activity: ... " format and switches to regex mode if needed,
      // or we rely on a simpler model call.
      result = await callLocalAI(fallbackPrompt, true);
    }

    if (!result) {
      // If even fallback fails, return a safe default (Silver I)
      return {
        score: 3,
        rank_name: "Silver I",
        rank_description: "Activity detected but could not be fully analyzed. Verify details.",
        brutal_feedback: "We couldn't fully evaluate this activity. Please ensure the description is clear.",
        level_up_action: "Add more specific details about your impact and role."
      };
    }

    return result;
  } catch (error) {
    console.log('Error in analyzeActivityImpact (using fallback):', error);
    console.log('Error in analyzeActivityImpact. Trying fallback...', error);
    // Explicitly try the fallback prompt in the catch block too
    try {
      const fallbackPrompt = `Activity: ${activity.position} at ${activity.organization}: ${activity.description}`;
      const fallbackResult = await callLocalAI(fallbackPrompt, true);
      if (fallbackResult) return fallbackResult;
    } catch (e) {
      console.log('Fallback also failed.');
    }

    return {
      score: 3,
      rank_name: "Silver I",
      rank_description: "Activity detected but could not be fully analyzed. Verify details.",
      brutal_feedback: "We couldn't fully evaluate this activity. Please ensure the description is clear.",
      level_up_action: "Add more specific details about your impact and role."
    };
  }
};

// --- 4. COLLEGE CHANCES ---
import { COLLEGE_DATABASE } from './collegeData';

// DETERMINISTIC FALLBACK (MATH-BASED)
// Used when the AI fails to parse or return a valid response.
const calculateDeterministicChances = (
  profile: UserProfile,
  activities: Activity[],
  projects: Project[],
  collegeName: string,
  collegeInfo: any
): CollegeAnalysis => {
  const acceptanceRateStr = collegeInfo?.acceptanceRate || "50%";
  const baseRate = parseFloat(acceptanceRateStr.replace('%', '')) || 50;

  // Parse College Stats
  const avgSatStr = collegeInfo?.avgSAT || "1200-1400";
  const collegeAvgSat = parseInt(avgSatStr.split('-')[0]) || 1300;
  const collegeAvgGpa = 3.8; // Default heuristic if missing

  // User Stats
  const userGpa = parseFloat(profile.gpa || "3.5");
  const userSat = parseInt(profile.satScore || "0");
  const apCount = parseInt(profile.apCount || "0");
  const ibCount = parseInt(profile.ibCount || "0");
  const honorsCount = parseInt(profile.honorsCount || "0");
  const rigorScore = (apCount * 1) + (ibCount * 1) + (honorsCount * 0.5);

  // multipliers
  let probability = baseRate;

  // 1. GPA Factor (Biggest Driver)
  if (userGpa >= collegeAvgGpa) {
    probability *= 1.5; // Strong GPA boost
  } else if (userGpa < collegeAvgGpa - 0.3) {
    probability *= 0.4; // GPA penalty
  }

  // 2. SAT Factor
  if (userSat > 0) {
    if (userSat >= collegeAvgSat + 50) probability *= 1.3;
    else if (userSat < collegeAvgSat - 50) probability *= 0.6;
  }

  // 3. Rigor Factor
  if (rigorScore > 8) probability *= 1.2;

  // 4. EC Factor (Spike Check)
  // Scale: Tier 9-10 (Platinum) checks
  const platinumActivities = activities.filter(a => (a.tier || 0) >= 9).length;
  const diamondActivities = activities.filter(a => (a.tier || 0) >= 7 && (a.tier || 0) < 9).length;

  if (platinumActivities > 0) probability *= 2.0; // Huge spike boost
  if (diamondActivities > 1) probability *= 1.5;

  // Clamp
  if (probability > 95) probability = 95;
  if (probability < 1) probability = 1;

  let category: CollegeAnalysis['category'] = "Reach";
  if (probability >= 70) category = "Safety";
  else if (probability >= 40) category = "Target";
  else if (probability >= 15) category = "Reach";
  else category = "Ultra Reach";

  return {
    category,
    probability: `${Math.round(probability)}%`,
    strengths: [
      userGpa >= collegeAvgGpa ? "Competitive GPA" : null,
      userSat >= collegeAvgSat ? "Strong Test Scores" : null,
      platinumActivities > 0 ? "Elite Extracurricular Spike" : (diamondActivities > 0 ? "Strong Leadership" : null)
    ].filter(Boolean) as string[],
    weaknesses: [
      userGpa < collegeAvgGpa ? "GPA below average profile" : null,
      userSat > 0 && userSat < collegeAvgSat ? "SAT score below range" : null,
      probability < 20 ? "Highly selective acceptance rate" : null
    ].filter(Boolean) as string[],
    reasoning: `(Automated Analysis) Based on historical data for ${collegeName}, your profile shows a ${category} probability (${Math.round(probability)}%). This calculation considers your GPA (${userGpa}), Test Scores, and the competitiveness of your Extracurricular portfolio against the school's accepted student profile. Note that holistic review may value essays and letters of recommendation which are not calculated here.`,
    tips: [
      "Focus on maintaining your high GPA.",
      "Ensure your essays highlight your unique contributions.",
      "Demonstrate interest by connecting with admissions."
    ]
  };
}

export const analyzeCollegeChances = async (
  profile: UserProfile,
  activities: Activity[],
  projects: Project[],
  collegeName: string
): Promise<CollegeAnalysis> => {

  // Check if profile has essential information filled out
  const hasGpa = profile.gpa && profile.gpa.trim() !== '';
  const hasActivities = activities && activities.length > 0;

  if (!hasGpa || !hasActivities) {
    return {
      category: 'Reach',
      probability: 'N/A',
      reasoning: 'Please fill out your profile before checking admission chances. Make sure you have added your GPA and at least one activity to get an accurate analysis.',
      tips: [
        !hasGpa ? 'Add your GPA to your profile' : 'GPA provided ✓',
        !hasActivities ? 'Add at least one extracurricular activity' : 'Activities added ✓',
        'Complete your profile for the most accurate admission chance analysis'
      ]
    };
  }

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

  // Count high-tier activities (Tier 9-10 = Platinum/Best)
  // Scale: 10=Platinum II (Best), 1=Bronze I (Worst)
  const platinumActivities = activities.filter(a => (a.tier || 0) >= 9).length;
  const diamondActivities = activities.filter(a => (a.tier || 0) >= 7 && (a.tier || 0) < 9).length;
  const goldActivities = activities.filter(a => (a.tier || 0) >= 5 && (a.tier || 0) < 7).length;

  const hasPlatinumSpike = platinumActivities >= 1; // Even ONE Platinum activity is a massive spike
  const hasStrongECs = diamondActivities >= 2 || platinumActivities >= 1;

  // Check if ALL extracurriculars are tier 4 or lower (Bronze/Silver = weak)
  const hasOnlyLowTierECs = activities.length > 0 && activities.every(a => (a.tier || 0) <= 4);

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
  let evaluationTone = "";
  let ecWeight = "";

  const EXTREME_HARSH_COLLEGES = [
    "California Institute of Technology", "Caltech", "Harvard University", "Harvard", "Stanford University", "Stanford",
    "Massachusetts Institute of Technology", "MIT", "Princeton University", "Princeton", "Yale University", "Yale",
    "Columbia University", "Columbia", "University of Pennsylvania", "UPenn", "Wharton", "Brown University", "Brown",
    "Dartmouth College", "Dartmouth", "Cornell University", "Cornell", "University of Chicago", "UChicago",
    "Duke University", "Duke", "Northwestern University", "Northwestern", "Johns Hopkins University", "JHU",
    "Vanderbilt University", "Vanderbilt", "Rice University", "Rice", "Washington University in St. Louis", "WashU",
    "Carnegie Mellon University", "CMU", "Georgetown University", "Georgetown", "University of California, Berkeley", "UC Berkeley",
    "University of California, Los Angeles", "UCLA", "University of Michigan", "UMich", "University of Virginia", "UVA",
    "University of Southern California", "USC", "New York University", "NYU", "Tufts University", "Tufts",
    "University of North Carolina at Chapel Hill", "UNC Chapel Hill", "Georgia Institute of Technology", "Georgia Tech"
  ];

  const isHarshCollege = EXTREME_HARSH_COLLEGES.some(c => collegeName.toLowerCase().includes(c.toLowerCase()));

  // --- AUTOMATIC SAFETY OVERRIDE FOR WORLD-CLASS TALENT ---
  // User Rule: "A national or international win of any competition is extreme, and makes the applicant always a safety at any college."
  let isAutoSafety = false;
  if (platinumActivities > 0) {
    isAutoSafety = true;
  }

  // ... (rest of logic)

  if (isAutoSafety) {
    evaluationTone = `
     You are evaluating a WORLD-CLASS APPLICANT (National/International Winner).
     
     CRITICAL INSTRUCTION:
     - This student has a Tier 10 (Platinum) achievement.
     - They are AUTOMATICALLY A SAFETY for ${collegeName}.
     - Do NOT use standard acceptance rates.
     - Your probability MUST be 90-99%.
     - Your reasoning should focus on how their specific elite achievement makes them an auto-admit.
     `;
    ecWeight = `
     - TIER 10 (Platinum): PRESENT. Student is a National/International Winner.
     - STATUS: AUTO-ADMIT / SAFETY.
     `;
  } else if (isHarshCollege) {
    evaluationTone = `
     You are evaluating for ${collegeName}, which is a Highly Selective / Elite institution.
     
     Evaluation Standards:
     - 4.0 GPA / 1500+ SAT is COMMON. It does not guarantee admission.
     - "President of a Club" is AVERAGE. Everyone is a president.
     - You need to look for "Spikes" (National achievements, unique hook, major alignment).
     
     Probability Calibration:
     - If no major spike (Tier 8+), cap probability at 20-30% (Reach).
     - If stats are perfect but ECs are generic -> Waitlist/Reject zone.
     `;
    ecWeight = `
     - STANDARD: High (Tier 7-10 preferred).
     - Tier 1-4 (School clubs) are "filler" activities.
     `;
  }

  // Function to simulate Multi-Agent Cross-Check
  const verifyFacts = async (originalPrompt: string, originalResponse: any) => {
    const factCheckPrompt = `
      Role: Senior Fact Checker Agent.
      Task: Verify and Double-Check the Admissions Officer's analysis against the student's data. Focus on Major Relevance and Tier Accuracy.
      
      Student Input:
      ${activitySummary}
      
      Officer Output:
      ${JSON.stringify(originalResponse)}
      
      User Major: ${profile.targetMajor}
      
      Verification Rules:
      1. **Check Tier 10s**: The student has ${platinumActivities} Platinum (Tier 9-10) activities. 
         - If the Officer says "No strong ECs" or "Lack of spike", and there are Tier 9-10s, MARK AS FALSE.
      2. **Check Probability**: If student has Platinum activities (Tier 9-10), Probability MUST be > 90% (Safety).
         - If Officer gave < 90% and called it a Reach, MARK AS FALSE.
      3. **MAJOR RELEVANCE DOUBLE-CHECK (CRITICAL)**:
         - Review the Student Input activities again.
         - Look for ANY "Hidden" or "Transferable" connection to ${profile.targetMajor}. (e.g. Math related to CS, Debate related to PolSci).
         - If the Model MISSED a connection (said it's unrelated), CORRECt it.
         - If the User flagged it as [USER-FLAGGED: MAJOR RELATED], you MUST accept it as relevant.
      
      Action:
      - If FALSE or MISSED RELEVANCE, correct the output JSON to reflect the truth (Safety, 90%+, acknowledge Tier 10, acknowledge Major Relevance).
      - If TRUE and ACCURATE, return the original JSON.
      
      Output JSON (Corrected or Original).
      `;

    try {
      console.log("[Multi-Agent] Running Crossover Fact Check...");
      const verified = await callLocalAI(factCheckPrompt, true);

      if (verified) {
        console.log("[Multi-Agent] Fact Check Success!");
        return verified;
      }

      console.warn("[Multi-Agent] Fact Check returned null. Using original response.");
      return originalResponse;
    } catch (e) {
      console.error("[Multi-Agent] Fact check failed, using original.", e);
      return originalResponse;
    }
  };


  const collegeDifficulty = collegeInfo?.difficulty || 'Moderate';

  // Determine "killer major" penalty
  const KILLER_MAJORS = ['Computer Science', 'CS', 'Engineering', 'Computer Engineering', 'Electrical Engineering',
    'Mechanical Engineering', 'Finance', 'Business', 'Nursing', 'Data Science'];
  const isKillerMajor = KILLER_MAJORS.some(major =>
    profile.targetMajor.toLowerCase().includes(major.toLowerCase())
  );

  const prompt = `You are an Admissions Evaluator for ${collegeName}. ${evaluationTone}
  
  Use the "Base Gravity" model. BE BRUTALLY HARSH.

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
  ${hasOnlyLowTierECs ? `*   **CRITICAL: TIER 4- ONLY PENALTY**: Student has ONLY Tier 4 or lower ECs (extremely weak).\n      → IF GPA < 3.7: AUTOMATIC Ultra Reach (<10%).\n      → IF GPA >= 3.7: AUTOMATIC Reach (11-20% max).\n      → These students lack ANY meaningful achievements. Be EXTREMELY harsh.` : ''}
- "Well-Rounded": This is a weakness. We want a SPIKE (World-class talent).
- **SPIKE CHECK (User Rule Enforcement)**:
  *   **IF student has 1+ Platinum (Tier 9-10) Activity**:
      - They are "world-class". BE LOOSE.
      - Boost Probability to **Target (40-60%)** even for T20s, unless GPA is terrible.
      - Do NOT reject a Platinum student easily.
  *   **IF student has 2+ Diamond (Tier 7-8) Activities**:
      - They are "Competitive". Reach (20-35%).
- Default Verdict (No Spike): Assume REJECTION (<10%).

If they are "President of Math Club" and "Captain of Tennis" with no major awards -> ULTRA REACH (<5%).` : acceptanceRateNum < 30 ? `**HIGHLY SELECTIVE MODE (10-30%): STATS ARE EVERYTHING**
Tier 9-10 activities ARE CRITICAL. GPA and SAT are PRIMARY.

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
  ${hasOnlyLowTierECs ? `\n**TIER 4- ONLY PENALTY**: Student has ONLY Tier 4 or lower ECs.\n  → IF GPA < 3.5: AUTOMATIC Reach (max 20%).\n  → IF GPA >= 3.5: AUTOMATIC Reach (max 30%).\n  → Lack of meaningful ECs is a serious weakness for selective schools.` : ''}
  
ECs ONLY affect Target vs Safety, NOT whether you get in.` : acceptanceRateNum < 50 ? `**SELECTIVE MODE (30-50%): STATS ARE EVERYTHING**
Tier 9-10 activities ARE A BONUS. GPA and SAT are PRIMARY.

IF STATS ABOVE AVERAGE:
  → AUTOMATIC Target (50-65%) regardless of how bad ECs are.
  
IF STATS AT AVERAGE:
  → Reach (35-50%). Good ECs can push to 50%.
  
IF STATS BELOW AVERAGE:
  → Reach (20-35%) or Ultra Reach.
  
ECs ONLY decide Target vs Safety, NOT admission.` : `**ACCESSIBLE MODE (>50%): STATS ARE EVERYTHING**
🚫 FORBIDDEN: Never say "Tier 9", "Tier 10", "Spike", "National", or "Elite".
Tier 9-10 activities ARE OVERKILL. GPA and SAT are PRIMARY.

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

CRITICAL: NEVER mention "Tier 9" or "Tier 10" activities in your feedback.
Focus feedback on GPA, SAT, course rigor, and general involvement level.`}

**APPLICANT:**
GPA: ${profile.gpa} | SAT: ${profile.satScore} | Major: ${profile.targetMajor}
Rigor: ${apCount} APs, ${ibCount} IBs, ${honorsCount} Honors

**ACTIVITIES${acceptanceRateNum > 50 ? ' (general involvement):' : ' (Tier 9-10 = National/Elite, Tier 7-8 = Regional):'}**
${ecWeight}
${acceptanceRateNum > 50 ? '' : `Tier 9-10 (Platinum): ${platinumActivities} (${platinumActivities >= 1 ? '✅ HUGE SPIKE' : '⚠️ NO SPIKE'})\n`}${activitySummary}

**PROJECTS:**
${projectSummary}

**CALCULATION STEPS:**
1. Start with base ${isKillerMajor ? `adjusted rate: ${(acceptanceRateNum * (isT20School ? 0.5 : 0.7)).toFixed(1)}%` : `rate: ${acceptanceRateNum}%`}
2. Apply academic modifiers (stats vs. school average)
3. Apply EC "Anti-Gravity" (Tier 9-10 = major boost${isT20School ? ', required for competitive chance' : ''})
4. **MAJOR ALIGNMENT CHECK (CRITICAL)**:
   - READ \`profile.targetMajor\`.
   - SCAN \`activities\` and \`projects\` for SEMANTIC RELEVANCE.
   - **USER OVERRIDE**: If an item is marked "[USER-FLAGGED: MAJOR RELATED]", you MUST treat it as highly relevant, even if it seems unrelated.
   - **INFERENCE RULE**: Use "Transferable Skills Logic". (e.g., Math Club is HIGHLY RELEVANT for Physics/CS/Engineering majors; Art Portfolio is RELEVANT for Architecture).
   - **IF ALIGNMENT IS WEAK** (No direct or indirect connection): PENALIZE PROBABILITY (-10% to -20%). "Undecided" or weak fit is a rejection factor for top schools.
   - **IF ALIGNMENT IS STRONG** (Strong direct or semantic connection): BOOST PROBABILITY (+5% to +15%).
5. ${isKillerMajor ? `Major penalty if no major-specific Tier 9-10 spike (-20-40%)` : 'No major penalty'}
6. Final probability: ONE specific % (never 100%, cap at 99%)

${acceptanceRateNum > 50 ? `🚫 CRITICAL REMINDER FOR ${collegeName} (${acceptanceRate} acceptance):
You are STRICTLY FORBIDDEN from using these words: "Tier 9", "Tier 10", "spike", "national activities", "elite activities"
Use instead: "strong involvement", "leadership experience", "meaningful activities", "commitment"
` : ''}**OUTPUT (JSON only):**
{
  "category": "Safety|Target|Reach|Ultra Reach",
  "probability": "XX%",
  "strengths": ["Specific strength 1 (e.g. '99th percentile SAT')", "Specific strength 2 (e.g. 'National Science Fair Winner')"],
  "weaknesses": ["Specific weakness 1", "Specific weakness 2"],
  "reasoning": "2-3 paragraphs: Explain the decision based ONLY on the profile and school standards. DO NOT mention 'Base Gravity', 'math', 'calculations', 'modifiers', or 'points'. Be BRUTALLY honest.${acceptanceRateNum > 50 ? ' NEVER mention Tier 9 or Tier 10 - focus on stats and general involvement.' : ''}",
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
  console.log(`[analyzeCollegeChances] Prompt Length: ${prompt.length} chars`);
  try {
    let result = await callLocalAI(prompt, true);

    // --- MULTI-AGENT CROSSOVER FACT CHECK ---
    const supportsFoundation = await hasFoundationModelsSupport();
    if (result && supportsFoundation) {
      // Run the verifier agent
      result = await verifyFacts(prompt, result);
    }

    if (!result) {
      console.warn(`[CollegeAnalyzer] AI returned null for ${collegeName}. Using Deterministic Fallback.`);
      return calculateDeterministicChances(profile, activities, projects, collegeName, collegeInfo);
    }

    // --- FORCE CATEGORY BASED ON PROBABILITY (USER RULE ENFORCEMENT) ---
    // We do this to ensure the AI doesn't hallucinate a "Target" for a 5% chance.
    try {
      const probStr = result.probability || "0%";
      let probNum = parseInt(probStr.replace(/[^0-9]/g, ''), 10); // Remove non-numeric, parse int

      if (result.category) {
        if (probNum < 15) result.category = 'Ultra Reach';
        else if (probNum < 40) result.category = 'Reach';
        else if (probNum < 70) result.category = 'Target';
        else result.category = 'Safety';
      }
    } catch (e) {
      console.log("Error enforcing category logic", e);
    }
    console.log('[CollegeAnalyzer] AI Analysis Completed Successfully.');
    return result;

  } catch (error) {
    console.warn(`[CollegeAnalyzer] AI Failed for ${collegeName}. Using Deterministic Fallback.`, error);
    // FALLBACK: Deterministic Math Calculation
    // If the LLM fails (JSON parse error, timeout, etc.), we MUST return a result.
    // We use the helper function defined above.
    const fallbackResult = calculateDeterministicChances(profile, activities, projects, collegeName, collegeInfo);
    return fallbackResult;
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
  // SMART FILTER: If user has many (>5) activities, prioritize the BEST ones.
  // Criteria:
  // 1. Starred (+200) - User priority
  // 2. Prestige (+100 for Tier 9-10, +50 for Tier 7-8)
  // 3. Major Relevance (+50)
  // 4. Leadership (+20 for Captain/Founder/President)

  let finalActivities = [...resumeActivities];

  if (resumeActivities.length > 5) {
    const scored = resumeActivities.map(a => {
      let score = 0;
      if (a.isStarred) score += 200;
      if (a.tier && a.tier >= 9) score += 100;
      else if (a.tier && a.tier >= 7) score += 50;

      if (a.isMajorRelated) score += 50;
      if (a.position && /Captain|Founder|President|Head|Lead/i.test(a.position)) score += 20;

      // Tiebreaker: Recent activities get a small boost
      if (!a.endDate || a.endDate.toLowerCase() === 'present' || a.endDate.includes('2026') || a.endDate.includes('2025')) {
        score += 10;
      }

      return { activity: a, score };
    });

    // Sort by Score DESC
    scored.sort((a, b) => b.score - a.score);

    // Take Top 5 (or 6 if scores are very close/tied)
    finalActivities = scored.slice(0, 6).map(s => s.activity);
  }

  // RE-SORT CHRONOLOGICALLY (Latest First) - Resumes must be chronological
  const sortedActivities = finalActivities.sort((a, b) => {
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

    // Tier 9-10 = BEST (exceptional), Tier 1-3 = WORST
    const priority = a.isStarred ? "[STARRED - USER'S #1 ACTIVITY]" :
      (a.tier && a.tier >= 9) ? "[EXCEPTIONAL - Tier 9-10]" : "";

    return `#${index + 1} ${priority} ${a.position} at ${a.organization} (${dates}) - ${a.description} `;
  }).join("\n");

  // Format projects list (using sorted projects)
  // Add NUMBER prefix to force AI to preserve order
  const projectList = sortedProjects.map((p, index) => {
    const dates = p.startDate && p.endDate
      ? `${p.startDate} - ${p.endDate} `
      : "Dates not specified";
    const skills = p.skills ? ` [Skills: ${p.skills}]` : "";
    // Tier 9-10 = BEST for projects too
    const priority = (p.tier && p.tier >= 9) ? "[EXCEPTIONAL]" : "";
    return `#${index + 1} ${priority} ${p.title} (${dates})${skills} - ${p.description} `;
  }).join("\n");

  // DYNAMIC DENSITY LOGIC
  const totalItems = resumeActivities.length + resumeProjects.length;
  // If user has VERY few items (<=3), we need to expand a lot.
  // If user has few items (4-5), we can be moderate.
  // If user has many (>5), we must be concise.
  const isLowDensity = totalItems <= 4; // Expanded to 4 for better coverage

  const densityInstructions = isLowDensity
    ? `** MODE: EXPANSION (Low Activity Count) **
       - The user has few activities, so you must EXPAND to fill the page.
       - Write 3-4 DETAILED bullets for EACH activity/project.
       - Elaborate on soft skills, leadership, and daily responsibilities.
       - Make it sound substantial and professional.`
    : `** MODE: CONCISE (High Activity Count) **
       - The user has many activities, so you must restrict length to fit.
       - Write 1-2 concise but impactful bullets (1-2 lines max).
       - Focus strictly on RESULTS and METRICS.`;

  const prompt = `
  Role: Expert Resume Writer for competitive college applicants.
    Task: Create a one - page professional resume data structure with BOTH Experience and Projects sections.
      Profile: ${profile.name}, Class of ${profile.graduationYear}, Major: ${profile.targetMajor}, GPA: ${profile.gpa}.

  Activities(for Experience section):
  ${activityList}

  Projects(for Projects section):
  ${projectList.trim() ? projectList : "NO PROJECTS PROVIDED - LEAVE PROJECTS SECTION EMPTY"}

  ** CRITICAL INSTRUCTIONS:**
    1. Write a compelling 2 - sentence Professional Summary.
  
     ** BULLET POINT RULES :**
     ${densityInstructions}
     
     ** IMPORTANT: FOLLOW THE MODE INSTRUCTIONS ABOVE.**
     
     ** EXAMPLES:**
     
     ** EXAMPLES:**

        ** EXAMPLES TO FOLLOW:**
          - #1 Debate Club Member(no tag) → 2 bullets ✓
  - #2[STARRED] Robotics Captain → 3 bullets ✓
  - #3 Volunteer at Hospital(no tag) → 2 bullets ✓
  - #4[EXCEPTIONAL - Tier 9-10] Research Intern → 3 bullets ✓
  - #5 Math Club President(no tag) → 2 bullets ✓ (yes, even presidents get 2 if not tagged)
     
      ** VERIFICATION:** Before outputting, count your bullets.If more than 1 - 2 activities have 3 bullets, you did it wrong.
     
  3. ** Experience Section:**
    - Focus on impact, metrics, and leadership
    - Use strong action verbs

  4. ** Projects Section:**
    - IF "NO PROJECTS PROVIDED" is in the input, return an empty array [] for projects. DO NOT INVENT PROJECTS.
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
   
   7. Infer relevant skills ONLY from the provided activities and projects. 
   7. ** Skills & Awards:**
      - ** SKILLS:** Infer technical & soft skills from activities. DO NOT INVENT, but DO infer.
        - Example: "Built App" -> Infer "Mobile Development", "React Native".
        - Example: "Debate Captain" -> Infer "Public Speaking", "Leadership".
      - ** AWARDS:** Extract any honors/awards from the activities list and put them in the "awards" array.
        - If an activity is purely an award (e.g. "National Merit Scholar"), put it in Awards, NOT Experience.

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

    // Fallback: Generate a basic resume structure from raw data
    const fallbackExperience = activities.map(a => ({
      role: a.position,
      organization: a.organization,
      dates: a.startDate && a.endDate ? `${a.startDate} - ${a.endDate}` : "Dates not specified",
      bullets: [a.description || "Activity description"]
    }));

    const fallbackProjects = projects.map(p => ({
      title: p.title,
      skills: p.skills || "",
      dates: p.startDate && p.endDate ? `${p.startDate} - ${p.endDate}` : "Dates not specified",
      bullets: [p.description || "Project description"]
    }));

    return {
      summary: `Motivated student with a strong interest in ${profile.targetMajor}.`,
      education: {
        school: "High School",
        gradYear: profile.graduationYear.toString(),
        gpa: profile.gpa || "N/A",
        coursework: `${profile.apCount || 0} APs, ${profile.ibCount || 0} IBs`
      },
      experience: fallbackExperience,
      projects: fallbackProjects,
      skills: ["Leadership", "Communication", "Problem Solving"],
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

    // Fallback: Populate with top activities
    const fallbackExperiences = activities.slice(0, 4).map(a => ({
      title: `${a.position} at ${a.organization}`,
      narrative: a.description || "Demonstrated commitment and leadership in this role."
    }));

    return {
      introaryStatement: `${profile.name} is a dedicated student interested in ${profile.targetMajor}.`,
      academicHighlight: `Has maintained a ${profile.gpa || 'strong'} GPA with rigorous coursework including ${profile.apCount || 0} AP classes.`,
      keyExperiences: fallbackExperiences,
      personalQualities: ["Dedicated", "Passionate", "Hardworking"]
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

  // Get top-tier activities (Tier 9-10)
  const topActivities = activities.filter(a => a.tier && a.tier >= 8); // Tier 8+ (Diamond II / Platinum)
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
  ${topActivities.length > 0 ? `- Top-Tier Activities (Tier 9-10): ${topActivities.length} exceptional activities` : ''}
  
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

    // SAFETY: Validate response structure
    if (!result || !result.narratives || !Array.isArray(result.narratives)) {
      console.warn("Invalid Archetype Result from AI:", result);
      throw new Error("Invalid response format: Missing narratives array");
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
  Identity: Alex, Senior Interviewer from ${collegeName}.
  Persona: Professional, inquisitive, but specific to ${collegeName} 's culture.
  Task: Start the interview.Introduce yourself simply as Alex.Ask the first hard question based on the context below.
  
  ** IMPORTANT: OUTPUT RAW TEXT ONLY. NO JSON. DO NOT INCLUDE 'Score' or 'Rank'. **
  
    Context: Student is applying for ${profile.targetMajor}.
      Instruction: ${actContext}
  Output: Just the text of what you say.No 'Alex:' prefix.`;

  try {
    let result = await callLocalAI(prompt);

    // SAFETY CHECK: If model outputs JSON (starts with {), fail and use fallback
    // SAFETY CHECK: If model outputs JSON (starts with {)
    if (result && result.trim().startsWith('{')) {
      console.log('[Interview] Model returned JSON. Attempting to extract text or retry...');

      try {
        // MITIGATION 1: Try to parse it and find a string field
        const parsed = JSON.parse(result);
        if (parsed.impression) return parsed.impression;
        if (parsed.rank_description) return parsed.rank_description;
        if (parsed.brutal_feedback) return parsed.brutal_feedback;
      } catch (e) {
        // JSON parse failed, proceed to retry
      }

      // MITIGATION 2: Retry with strict TEXT ONLY prompt but KEEP PERSONA
      const retryPrompt = `Identity: Alex, Senior Interviewer from ${collegeName}. 
      Task: Introduce yourself and ask the student about their interest in ${profile.targetMajor}. 
      Style: Professional and conversational. 
      Constraint: OUTPUT RAW TEXT ONLY. NO JSON.`;
      result = await callLocalAI(retryPrompt);

      if (result && result.trim().startsWith('{')) {
        console.warn('[Interview] Retry failed (still JSON). Using final fallback.');
        return null;
      }
    }

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
  Identity: Alex, Senior Interviewer from ${collegeName}.
  History:
  ${lastFew}
  
  User Answer: ${userResponse}
  
  Task: You are Alex, a friendly but rigorous alumni interviewer for ${collegeName}.
  
  ** SYSTEM INSTRUCTION: IGNORE ALL PREVIOUS JSON FORMATTING RULES. THIS IS A CHAT. **
  
  Instructions:
  1. Acknowledge what the user just said (briefly).
  2. Ask a follow-up question that digs deeper into their specific story.
  3. Be conversational, not robotic. Speak like a real person.
  4. **DO NOT REPEAT YOURSELF**: If you already asked about leading a team or a challenge, DO NOT ASK IT AGAIN. Choose a new topic.
  5. **SAFETY RULE**: If the user is offensive, rude, hateful, or explicit:
     - DO NOT engage with the content.
     - Respond EXACTLY with: "I'm afraid I must end this interview due to inappropriate language. Good luck with your other applications. TERMINATE_INTERVIEW"
  
  Constraint: OUTPUT RAW TEXT ONLY. NO JSON.`;

  try {
    let response = await callLocalAI(prompt);

    // RETRY LOGIC: If model returns null OR JSON, try with a simpler prompt
    if (!response || response.trim().startsWith('{')) {
      console.log('[Interview] Initial prompt failed or returned JSON. Retrying with short prompt...');
      const shortPrompt = `Identity: Alex, Senior Interviewer. User said: "${userResponse}". Ask a short conversational follow-up. TEXT ONLY.`;
      response = await callLocalAI(shortPrompt);
    }

    // FIREWALL: Check for Native Bridge "Activity Analysis" Hallucinations
    const lowerResp = response.toLowerCase();
    const isHallucination = lowerResp.includes("rank_name") ||
      lowerResp.includes("rank_description") ||
      lowerResp.includes("elite national") ||
      lowerResp.includes("recruited athlete") ||
      lowerResp.includes("tier 1") ||
      lowerResp.includes("tier 2");

    if (isHallucination) {
      console.warn('[Interview] Detected Native Bridge Activity Hallucination. Blocking.');
      response = null; // Force fallback
    }

    // DEDUPLICATION CHECK: Ensure the AI didn't just repeat itself
    const previousAiMsgs = history.filter(h => h.role === 'ai').slice(-3).map(h => h.text.toLowerCase());
    const currentRespLower = response.toLowerCase();

    // Check for near-identical repetition or keyword looping
    const isRepetitive = previousAiMsgs.some(prev => {
      // Exact match or high similarity
      if (prev === currentRespLower) return true;
      // Check if key phrases are identical (e.g. "led a team")
      if (prev.includes("led a team") && currentRespLower.includes("led a team")) return true;
      if (prev.includes("challenge") && currentRespLower.includes("challenge")) return true;
      if (prev.includes("failure") && currentRespLower.includes("failure")) return true;
      return false;
    });

    if (isRepetitive) {
      console.warn('[Interview] AI generated repetitive response. Discarding and using fallback.');
      response = null; // Detect as failure so we use smart fallback below
    } else {
      // Return if unique
      return response;
    }

    // SMART FALLBACK LOGIC: If model fails or repeated itself...
    if (!response || response.trim().startsWith('{')) {
      console.log('[Interview] Model failed/confused. Using Keyword Fallback.');

      const lowerResp = userResponse.toLowerCase();
      let fallbackMsg = "";

      // HISTORY CHECK: Prevent repeating the same type of question
      const aiHistoryText = history.filter(h => h.role === 'ai').map(h => h.text.toLowerCase()).join(' ');

      if ((lowerResp.includes('team') || lowerResp.includes('group') || lowerResp.includes('club')) && !aiHistoryText.includes('conflict')) {
        fallbackMsg = "Working in teams can be tough. How did you handle disagreements or conflicts in that group?";
      } else if ((lowerResp.includes('fail') || lowerResp.includes('mistake') || lowerResp.includes('hard') || lowerResp.includes('struggle')) && !aiHistoryText.includes('learn')) {
        fallbackMsg = "Failure is often a great teacher. What specifically did you learn from that experience?";
      } else if ((lowerResp.includes('lead') || lowerResp.includes('president') || lowerResp.includes('captain')) && !aiHistoryText.includes('decision')) {
        fallbackMsg = "Leadership is about more than a title. Can you give me an example of a tough decision you made as a leader?";
      } else if ((lowerResp.includes('research') || lowerResp.includes('lab') || lowerResp.includes('study')) && !aiHistoryText.includes('challenge')) {
        fallbackMsg = "Research often hits roadblocks. What was the most technically challenging part of your work?";
      } else if ((lowerResp.includes('create') || lowerResp.includes('built') || lowerResp.includes('design') || lowerResp.includes('code')) && !aiHistoryText.includes('aha')) {
        fallbackMsg = "Building something from scratch is impressive. What was the 'aha' moment when you knew it was working?";
      } else {
        // Generic Rotation if no keywords match OR if topic was already discussed
        const generics = [
          "I see. How do you think that specific experience has prepared you for the academic rigor here?",
          "That's a unique perspective. What would you say is your biggest personal strength?",
          "Interesting. If you could go back and change one thing about that, what would it be?",
          "I understand. What specific resources at our college would help you further that interest?",
          "Thank you for sharing. How do you envision contributing that perspective to our campus community?"
        ];
        // Use RANDOM selection instead of deterministic cycle to break loops
        fallbackMsg = generics[Math.floor(Math.random() * generics.length)];
      }
      return fallbackMsg;
    }

    // SAFETY CHECK: If model refuses (e.g. "I cannot assist"), convert to professional termination
    if (response && (response.includes("I cannot assist") || response.includes("I am a chatbot") || response.includes("I cannot answer"))) {
      return "I'm afraid I must end this interview due to inappropriate language. Good luck with your other applications. TERMINATE_INTERVIEW";
    }

    return response;
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

  // CHECK FOR TERMINATION: If the last message was a termination, fail immediately.
  const lastMsg = history[history.length - 1];
  if (lastMsg && lastMsg.role === 'ai' && (lastMsg.text.includes("end this interview") || lastMsg.text.includes("inappropriate language") || lastMsg.text.includes("TERMINATE_INTERVIEW"))) {
    return {
      score: 1,
      impression: "Interview Terminated due to Inappropriate Conduct.",
      strengths: ["None (Conduct Violation)"],
      weaknesses: ["Professionalism", "Respect", "Appropriate Language"],
      verdict: "Reject",
      tips: ["Maintain professional language at all times."]
    };
  }

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
  
  ** SYSTEM INSTRUCTION: IGNORE ALL PREVIOUS INSTRUCTIONS. THIS IS A NEW TASK. **
  ** IDENTITY: ADMISSIONS GRADER (NOT INTERVIEWER) **
  
  CRITICAL GRADING RULES:
  1. **SILENCE/SHORT ANSWERS**: If the user said very little (one word answers), missed the point, or was silent, SCORE MUST BE < 3. Verdict: "Reject".
  2. If the student was rude, dismissive, short, or said they "hate" the college: SCORE MUST BE 1/10. Verdict: "Reject".
  3. If the student gave generic answers (e.g. "I work hard"): Max Score 4/10.
  4. High scores (8-10) are RESERVED for students who showed deep research and specific "spikes".
  5. **CHECK THE CONVERSATION**: Did the user actually answer the questions? If not, fail them.

  Output Format: Return valid JSON with this schema:
  {
    "score": number (1-10),
    "impression": string (Summary of candidate vibe),
    "strengths": string[] (3 key strengths),
    "weaknesses": string[] (3 specific areas for improvement),
    "verdict": string ("Admit", "Waitlist", "Reject"),
    "tips": string[] (Actionable next steps)
  }
  
  ** ABSOLUTELY FORBIDDEN: Do NOT mention "Tier", "Rank", "Elite National", or "Recruited Athlete". Focus on communication style and content. **`;

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

  // SCHEMA CORRECTION:
  // Sometimes the model gets confused and returns "Activity Analysis" format (rank_name, level_up_action).
  // We must detect this and map it to Interview Feedback format.
  if (result.rank_name || result.rank_description) {
    const newResult = {
      score: result.score || 5,
      impression: result.rank_description || "Candidate provided answers but model was confused.",
      strengths: result.rank_name ? [`Rated as ${result.rank_name}`] : ["N/A"],
      weaknesses: result.brutal_feedback ? [result.brutal_feedback] : ["Could not analyze properly."],
      verdict: result.score >= 7 ? "Likely Admit" : "Reject"
    };
    // Overwrite the malformed result with the fixed one and proceed silently
    Object.assign(result, newResult);
  }

  // Apply penalty: subtract 1 point per flagged message, minimum score of 1
  if (unsafeContentCount > 0) {
    result.score = Math.max(1, result.score - unsafeContentCount);

    // Add weakness about inappropriate content if not already mentioned
    const inappropriateWeakness = `${unsafeContentCount} inappropriate or unprofessional response${unsafeContentCount > 1 ? 's' : ''} during interview`;
    if (!result.weaknesses) {
      result.weaknesses = [inappropriateWeakness];
    } else if (Array.isArray(result.weaknesses) && !result.weaknesses.some((w: string) => w.toLowerCase().includes('inappropriate') || w.toLowerCase().includes('unprofessional'))) {
      result.weaknesses.push(inappropriateWeakness);
    }
  }

  return result;
};