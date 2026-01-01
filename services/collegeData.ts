import { CollegeInfo } from "../types";

// Helper to generate data efficiently with AI-specific context fields
const create = (
  name: string,
  location: string,
  type: 'Private' | 'Public' | 'Liberal Arts',
  acceptanceRate: string,
  difficulty: 'Very Hard' | 'Hard' | 'Moderate' | 'Safety',
  gpaProfile: string,
  satRange: string,
  tuition: string,
  popularMajors: string[],
  campusVibe: string,
  admissionsHook: string,
  applicationStrategy: string,
  abbreviations: string[] = [],
  commonTraits: string = "High academic achievement and demonstrated leadership."
): CollegeInfo => ({
  name, location, type, acceptanceRate, difficulty,
  avgGPA: gpaProfile,
  avgSAT: satRange,
  avgACT: "28-34",
  tuition,
  culture: campusVibe,
  admittedStudentProfile: `${admissionsHook} Strategy: ${applicationStrategy}. Typical Admitted Student Traits: ${commonTraits}`,
  popularMajors,
  admissionsHook,
  applicationStrategy,
  abbreviations
} as any);

const DB: Record<string, CollegeInfo> = {};

// ==========================================
// TIER 1: HIGH DETAIL HAND-CRAFTED ENTRIES
// ==========================================

DB["Princeton University"] = create(
  "Princeton University", "Princeton, NJ", "Private", "4%", "Very Hard", "3.95+ UW", "1500-1580", "$57,410",
  ["Public Policy", "Economics", "Philosophy", "Computer Science"],
  "Orange bubble, undergraduate focus, eating clubs, senior thesis mandatory.",
  "Intellectual deep-dive. They want scholars who will contribute to 'the nation's service'.",
  "Focus on academic purity and service. Don't sound too pre-professional.",
  ["Princeton", "Pton"],
  "Princeton admits are often scholarly in the truest sense—they love learning for its own sake. They are 'deep divers' who have often conducted independent research or authored papers in high school. The concept of 'In the Nation's Service' is huge; successful applicants often realize this by combining their academic rigor with significant, often policy-oriented, community service. They are intellectual but grounded."
);
DB["MIT"] = create(
  "MIT", "Cambridge, MA", "Private", "4%", "Very Hard", "4.0 UW", "1520-1580", "$57,986",
  ["EECS", "MechE", "Physics", "Math"],
  "Collaborative, intense, 'Mens et Manus' (Mind and Hand), hacking culture.",
  "Maker Portfolio is key. They want builders, not just studiers.",
  "Show hands-on projects. Be quirky and honest, not polished.",
  ["MIT", "Mass Tech"],
  "MIT admits are makers. 'Mens et Manus' (Mind and Hand) is the motto, and they mean it. You cannot just be a bright student; you must be a builder. Successful applicants often submit a Maker Portfolio showing a robot, a coded app, or a complex research project. They are humble, intensely collaborative (psets are done in groups), and have a deep love for STEM that goes beyond grades."
);
DB["Harvard University"] = create(
  "Harvard University", "Cambridge, MA", "Private", "3%", "Very Hard", "4.0 UW", "1480-1580", "$57,261",
  ["Economics", "Government", "CS", "Bio"],
  "The brand. Residential houses are central. Leadership heavy.",
  "Citizen-Leaders. You need a massive 'spike' in one area or world-class leadership.",
  "Focus on your impact on the community. Interview matters.",
  ["Harvard", "Crimson"],
  "Harvard admits are 'Action-Oriented Leaders'. It is not enough to join a club; you must run it, or better yet, start a new one that solves a verified problem. They look for a 'spike'—world-class talent in one specific area—or a 'well-rounded' profile that is simply excellent at everything. The typical admit is confident, articulate, and has already begun to make a measurable impact on their community."
);
DB["Stanford University"] = create(
  "Stanford University", "Stanford, CA", "Private", "3.6%", "Very Hard", "3.96+ UW", "1470-1570", "$56,169",
  ["CS", "Human Bio", "Engineering", "STS"],
  "Duck Syndrome, entrepreneurial, sunny, relaxed on surface but intense.",
  "Intellectual Vitality. They want brilliant independent thinkers.",
  "Write essays that show distinct 'quirk' and innovation.",
  ["Stanford"],
  "Stanford students are 'Intellectually Vital' and often quirky. The admissions office looks for 'Duck Syndrome'—students who are paddling ferociously underwater (working hard) but look calm on the surface. They value innovation and entrepreneurship. Admits often have a 'spike' in a niche field and write essays that are authentic, vulnerable, and creative."
);
DB["Yale University"] = create(
  "Yale University", "New Haven, CT", "Private", "4.5%", "Very Hard", "3.95+ UW", "1480-1580", "$62,250",
  ["History", "Econ", "PolSci", "Drama"],
  "Residential colleges, artsy, humanities focus even for STEM majors.",
  "Global citizens with a heart for community.",
  "Show you are multi-faceted (e.g., Scientist who acts).",
  ["Yale"],
  "Yalies are known for being the 'nicest' of the Ivy League students. They are multi-hyphenates: the bio-chemist who stars in the musical, or the political science major who is a concert cellist. Admissions officers look for 'Global Citizens' who will use their education to improve the world. There is a heavy emphasis on community and the residential college system, so demonstrating social and emotional maturity is key."
);
DB["University of Pennsylvania"] = create(
  "UPenn", "Philadelphia, PA", "Private", "5.9%", "Very Hard", "3.9+ UW", "1480-1570", "$63,452",
  ["Finance (Wharton)", "Nursing", "Econ"],
  "Work hard play hard, pre-professional, social, Greek life.",
  "Interdisciplinary pragmatism. They love dual degrees.",
  "Connect your learning to a specific career outcome.",
  ["UPenn", "Penn", "Wharton"],
  "Penn students are pragmatic and pre-professional. Whether in Wharton or the College, they are often focused on the practical application of their knowledge. Admits are 'doers'—they have started businesses, led non-profits, or conducted actionable research. They are often high-energy networkers who thrive in a fast-paced, urban environment."
);
DB["California Institute of Technology"] = create(
  "Caltech", "Pasadena, CA", "Private", "3%", "Very Hard", "4.0 UW", "1530-1580", "$60,864",
  ["Physics", "CS", "Chem", "Math"],
  "Tiny, honor code, pranks, pure science focus.",
  "Passion for theory. You must love the math behind the science.",
  "Don't apply if you don't love math. Be nerdy.",
  ["Caltech", "CIT"],
  "Caltech is for the pure scientist. It is smaller than most high schools and fiercely academic. Admits are often Olympiad medalists (IMO, IPhO) or have conducted graduate-level research. They must love the theoretical underpinnings of science, not just the application. The Honor Code is central, fostering a community of immense trust. If you don't love math, don't apply."
);
DB["Duke University"] = create(
  "Duke University", "Durham, NC", "Private", "6%", "Very Hard", "3.9+ UW", "1480-1570", "$60,489",
  ["Econ", "Bio", "CS", "PubPol"],
  "School spirit, sports, gothic campus, work hard play hard.",
  "Ambitious, energetic leaders who engage.",
  "Why Duke essay is critical. Mention specific interdisciplinary programs.",
  ["Duke"],
  "Duke students work hard and play hard. Admits are often 'spirited high-achievers'—students who are valedictorians but also captains of their varsity sports teams. They value community and school spirit (Cameron Crazies). Interdisciplinary thinking is a major admissions theme; students who can bridge the gap between engineering and public policy, or biology and ethics, stand out."
);
DB["Brown University"] = create(
  "Brown University", "Providence, RI", "Private", "5%", "Very Hard", "3.94+ UW", "1460-1570", "$62,304",
  ["CS", "Econ", "Bio", "English"],
  "Open Curriculum, happy, collaborative, liberal/hipster.",
  "Independent learners who can design their own path.",
  "Focus on how you will use the Open Curriculum.",
  ["Brown"],
  "Brown students are the architects of their own education. The 'Open Curriculum' attracts independent, self-directed learners who chafe at requirements. Admits are often creative, quirky, and deeply passionate about social justice. They are not afraid to combine disparate interests (e.g., Computer Science and Egyptology) and are looking for a collaborative, non-competitive environment."
);
DB["Johns Hopkins University"] = create(
  "Johns Hopkins", "Baltimore, MD", "Private", "6.5%", "Very Hard", "3.93+ UW", "1510-1570", "$60,480",
  ["BME", "Public Health", "Neuroscience", "IR"],
  "Research powerhouse, intense, pre-med heavy, urban.",
  "Researchers. They want to see clinical or lab experience.",
  "Write about collaboration and research innovation.",
  ["JHU", "Johns Hopkins", "Hopkins"],
  "Hopkins is a research powerhouse. While known for pre-med, admitted students in all majors are often driven by a desire for discovery. They are intense, focused, and often have significant research experience before arriving. Collaboration is increasingly emphasized to combat the competitive stereotype, so showing teamwork in a lab or clinical setting is a plus."
);
DB["Northwestern University"] = create(
  "Northwestern", "Evanston, IL", "Private", "7%", "Very Hard", "3.9+ UW", "1460-1560", "$62,391",
  ["Journalism", "Theater", "Engineering", "Econ"],
  "Midwestern nice, pre-professional, artsy but smart.",
  "Multi-talented. Engineering + Theater is a common vibe.",
  "Show you have skills in two very different areas.",
  ["Northwestern", "NU"],
  "Northwestern students are 'AND' students—Engineering AND Theater, Journalism AND Economics. Admits are often multi-talented and very communicative. The vibe is Midwestern-nice but highly ambitious. It is pre-professional but creative. Successful applicants highlight their diverse interests and how they will combine them using the quarter system."
);
DB["Columbia University"] = create(
  "Columbia University", "New York, NY", "Private", "3.9%", "Very Hard", "3.95+ UW", "1470-1570", "$65,524",
  ["Econ", "PolSci", "CS", "English"],
  "The Core Curriculum, city living, activism, intellectual.",
  "Intellectuals who engage with the real world/city.",
  "Read the books in the Core. Show you are ready for NYC.",
  ["Columbia"],
  "Columbia students are intellectuals who embrace the city. They must love the 'Core Curriculum'—reading the great books of Western civilization. Admits are often independent, mature, and city-ready. They are 'activist-scholars' who use New York City as their lab. If you are looking for a traditional walled-off campus experience, this is not the place; Columbia students engage with the real world daily."
);
DB["Cornell University"] = create(
  "Cornell University", "Ithaca, NY", "Private", "7%", "Very Hard", "3.9+ UW", "1450-1560", "$62,456",
  ["Engineering", "Hotel Mgmt", "Architecture", "AgSci"],
  "Any person any study, gorges, rigorous, cold.",
  "Fit to major. CALS vs Engineering vs Hotel require different profiles.",
  "Why Cornell needs to be specific to the college you apply to.",
  ["Cornell"],
  "Cornell is 'Any Person, Any Study'. Admits are incredibly diverse because the different colleges (Engineering, Hotel, CALS, etc.) look for very different things. A successful Hotelie looks different than an Engineer. Common threads are grit and a lack of pretension. Cornell is rigorous and cold; admits are resilient students who are willing to work incredibly hard. 'Fit to major' is the single most important admissions factor."
);
DB["University of Chicago"] = create(
  "UChicago", "Chicago, IL", "Private", "5%", "Very Hard", "4.0 UW", "1510-1580", "$60,963",
  ["Econ", "Math", "PolSci", "Soc"],
  "Life of the mind, quirky, rigorous core, theory focused.",
  "Unapologetic intellectuals who love debate.",
  "The Uncommon Essay is the most important part.",
  ["UChicago", "Chicago"],
  "UChicago is for the 'Life of the Mind'. Admits are unapologetic intellectuals who love theory and debate. The 'Uncommon Essay' is the filter; if you can't write a creative, quirky essay, you won't fit in. They value independent thinkers who are willing to challenge assumptions. It is rigorous and famous (infamous?) for its intensity."
);
DB["Vanderbilt University"] = create(
  "Vanderbilt University", "Nashville, TN", "Private", "6%", "Very Hard", "3.9+ UW", "1480-1570", "$58,130",
  ["HOD", "Econ", "Bio"],
  "Happiest students, social, Greek life, balance.",
  "High stats + Social skills. Well-rounded.",
  "Demonstrated interest matters.",
  ["Vandy", "Vanderbilt"],
  "Vanderbilt students are 'work hard, play hard' balanced achievers. They have Ivy-level stats but often value a more social, SEC-sports culture. Admits are socially adept, community leaders, and often involved in music or service. ' Demonstrated Interest' is sometimes a factor, so showing you love the school matters."
);
DB["Rice University"] = create(
  "Rice University", "Houston, TX", "Private", "8%", "Very Hard", "4.0 UW", "1490-1580", "$54,960",
  ["Bioengineering", "Architecture", "Sports Mgmt"],
  "Residential colleges, unconventional wisdom, happy, collaborative.",
  "Quirky but community focused.",
  "Highlight community engagement and 'why Rice'.",
  ["Rice"],
  "Rice students are brilliant but kind. The residential college system fosters a supportive, close-knit community often described as 'Hogwarts in Houston'. Admits are collaborative, quirky, and unpretentious. They often have high stats but highlight their inclusive nature and desire to help others in their essays."
);
DB["Washington University in St. Louis"] = create(
  "WashU", "St. Louis, MO", "Private", "11%", "Hard", "3.9+ UW", "1500-1570", "$60,590",
  ["Pre-med", "Business", "Psych"],
  "Midwest friendly, amazing dorms/food, pre-med factory.",
  "High stats + Kindness. They care about personality.",
  "Demonstrated interest is VERY important.",
  ["WashU", "WUSTL"],
  "WashU cares deeply about knowing that you want to attend. They track demonstrated interest heavily. Admits are often 'nice' high achievers—students who are kind, collaborative, and community-minded. It is a pre-med factory, so science admits are rigorous, but the vibe is supportive rather than cutthroat."
);
DB["University of Notre Dame"] = create(
  "Notre Dame", "Notre Dame, IN", "Private", "12%", "Hard", "3.9+ UW", "1420-1550", "$60,301",
  ["Finance", "Econ", "Theology"],
  "Catholic, football, service, alumni network.",
  "Values-based leadership. Service is key.",
  "Focus on how you help others.",
  ["Notre Dame", "ND"],
  "Notre Dame students are famously spirited and service-oriented. The university's Catholic identity is central; admitted students—demonstrated through essays—often show a commitment to using their talents for the greater good. It is one of the few elite universities where 'faith' (of any kind) is a common topic of conversation. Alumni networking is legendary."
);
DB["Georgetown University"] = create(
  "Georgetown University", "Washington, DC", "Private", "12%", "Hard", "3.9+ UW", "1410-1550", "$62,052",
  ["IR (SFS)", "Gov", "Finance"],
  "Jesuit, political, DC location, pre-law.",
  "Global perspective. SFS needs language skills.",
  "Highlight advocacy and global awareness.",
  ["Georgetown", "Gtown"],
  "Georgetown is the heart of DC student life. Admits are politically active, globally aware, and ambitious. The School of Foreign Service (SFS) is world-renowned and attracts students who want to be diplomats or policy makers. Jesuit values ('Men and Women for Others') are taken seriously. If you haven't read the news today, you won't fit in."
);
DB["Emory University"] = create(
  "Emory University", "Atlanta, GA", "Private", "11%", "Hard", "3.8-4.0", "1420-1540", "$57,948",
  ["Bio", "Business", "Nursing"],
  "Liberal arts focus, healthcare adjacent (CDC), southern.",
  "Pre-professional but kind.",
  "Mention 'Emory Scholars' if applicable.",
  ["Emory"],
  "Emory is a powerhouse for healthcare and the liberal arts in the South. Admits are often pre-med or business focused (Goizueta). There is a split vibe between the main Atlanta campus and the smaller, liberal-arts focused Oxford College (which is a great backdoor entry). Students are collaborative, kinder than the average elite student, and deeply involved in research."
);
DB["University of California, Berkeley"] = create(
  "UC Berkeley", "Berkeley, CA", "Public", "11%", "Hard", "3.89+ UW", "Test Blind", "$14k/$44k",
  ["EECS", "Business", "Econ"],
  "Activism, massive, research powerhouse, competitive.",
  "Spikes. Excellence in one area.",
  "PIQs must be direct and show leadership.",
  ["Berkeley", "Cal", "UCB"],
  "Berkeley students are activists and intellectual powerhouses. They are resilient—often having to navigate a massive, bureaucratic system without much hand-holding. Admitted students often have a history of leadership in social justice, research, or spearheading new initiatives. They are independent, gritty, and unafraid to challenge the status quo."
);
DB["University of California, Los Angeles"] = create(
  "UCLA", "Los Angeles, CA", "Public", "9%", "Hard", "4.0 UW", "Test Blind", "$13k/$43k",
  ["Psych", "Bio", "Film"],
  "Sunny, spirited, creative, fast-paced.",
  "Holistic achievers. Academic + Creative.",
  "Show intellectual curiosity in PIQs.",
  ["UCLA", "Bruins"],
  "Bruins are the 'happy warriors' of the academic world. They are incredibly high achieving (4.0 UW is standard) but also demonstrate diverse talents—they are Olympic athletes, concert pianists, or community leaders. Admitted students show a balance of optimism and ambition. They are 'creators' who will take advantage of the LA location."
);
DB["University of Michigan"] = create(
  "UMich", "Ann Arbor, MI", "Public", "18%", "Hard", "3.9+ UW", "1360-1530", "$16k/$55k",
  ["Engineering", "Business", "Psych"],
  "College town, spirited, research, cold.",
  "High stats + Interest. Ross is very hard.",
  "Why Michigan essay must be specific.",
  ["UMich", "Michigan", "U of M"],
  "Michigan is the ultimate 'work hard, play hard' public university. Admits have Ivy-level stats but want the Big House football experience. It is massive, so students must be proactive to find their community. The Ross School of Business is incredibly selective. Successful applicants show a high level of school spirit and a readiness to engage in a very active campus life."
);
DB["University of Virginia"] = create(
  "UVA", "Charlottesville, VA", "Public", "19%", "Hard", "4.3 W", "1390-1530", "$18k/$54k",
  ["Commerce", "Econ", "Bio"],
  "Jeffersonian, honor code, preppy, Greek.",
  "Student self-governance leaders.",
  "Focus on community contribution.",
  ["UVA", "Virginia"],
  "UVA is built on tradition. The 'Honor Code' is a living thing. Admits are often 'student government types'—leaders who take self-governance seriously. It is a Southern ivy with a preppy, social vibe, but the academics are brutal. Out-of-state admission is very competitive; successful applicants often articulate exactly how they will contribute to the university's unique student-run culture."
);
DB["University of North Carolina at Chapel Hill"] = create(
  "UNC Chapel Hill", "Chapel Hill, NC", "Public", "17%", "Hard", "4.4 W", "1370-1500", "$9k/$36k",
  ["Bio", "Journalism", "Business"],
  "Public Ivy, friendly, basketball, research.",
  "Service-oriented leaders.",
  "OOS is very hard, focus on service.",
  ["UNC", "Chapel Hill", "North Carolina"],
  "Carolina is the 'University of the People'. It is incredibly friendly but elite. Out-of-state traits: Admits are top-tier students who show a deep commitment to service and public good. The Morehead-Cain scholarship sets the tone for leadership. It is a basketball school, a research school, and a liberal arts haven all in one."
);
DB["Georgia Institute of Technology"] = create(
  "Georgia Tech", "Atlanta, GA", "Public", "16%", "Hard", "4.0 UW", "1370-1530", "$12k/$33k",
  ["Aerospace", "CS", "MechE"],
  "Nerd pride, rigorous, urban, makers.",
  "Math/Science rigor. Makers.",
  "Discuss projects and building things.",
  ["Georgia Tech", "GT", "Tech"],
  "Georgia Tech is for engineers who want to build the future. It is rigorous and unrelenting. Admits are 'makers'—students who have built robots, coded websites, or conducted research. The vibe is less 'school spirit' and more 'shared struggle' in a bonding way. If you write 'I want to help people' without saying 'by building X', you won't get in."
);
DB["University of Texas at Austin"] = create(
  "UT Austin", "Austin, TX", "Public", "29%", "Hard", "3.8+ UW", "1230-1500", "$11k/$40k",
  ["Business", "CS", "Engineering"],
  "Massive, spirited, weird, Austin vibe.",
  "Top 6% Auto-admit. OOS is brutal.",
  "Fit to major is critical here.",
  ["UT Austin", "UT", "Texas"],
  "UT Austin is massive and spirited. For OOS students, it is harder to get into than many Ivies. Admits must show 'Fit to Major'—applying for CS or Business requires near-perfect stats and specific ECs (e.g., launching a business). The vibe is 'Keep Austin Weird', so creativity and leadership are valued alongside the sheer academic stats."
);
DB["University of Southern California"] = create(
  "USC", "Los Angeles, CA", "Private", "12%", "Hard", "3.9+ UW", "1410-1540", "$63,468",
  ["Film", "Business", "Comms"],
  "Trojan family, spirited, connections, expensive.",
  "Interdisciplinary and networked.",
  "Show ambition and creativity.",
  ["USC", "SC", "Southern Cal"],
  "Trojan Family members are ambitious networkers. They often have an interdisciplinary focus (e.g., 'Business of Cinematic Arts' or 'Engineering + Music'). Admitted students are high-energy leaders who want to change the world and make connections while doing it. They are spirited, collaborative, and career-focused."
);
DB["Carnegie Mellon University"] = create(
  "CMU", "Pittsburgh, PA", "Private", "11%", "Hard", "3.9+ UW", "1490-1570", "$61,344",
  ["CS", "Drama", "Robotics"],
  "Nerd heaven, intense, interdisciplinary arts/tech.",
  "Specific talent in CS or Arts.",
  "Show deep expertise in your field.",
  ["CMU", "Carnegie Mellon"],
  "CMU is intense. It is for the obsessed. Whether it's the Drama students living in the studio or the CS majors coding until 4am, admits are passionate specialists. Interdisciplinary work is encouraged (CS + Art), but you must be elite in your primary domain. 'My Heart is in the Work' is the motto, and they mean it."
);
DB["New York University"] = create(
  "NYU", "New York, NY", "Private", "8%", "Very Hard", "3.8+ UW", "1450-1570", "$58,168",
  ["Business (Stern)", "Arts (Tisch)", "Liberal Studies"],
  "No campus, independent, city life, expensive.",
  "Independent, cosmopolitan, go-getters.",
  "Show you can handle the city.",
  ["NYU"],
  "NYU is not for everyone. It has no campus; the city is your dorm. Admits are independent, mature, and hustlers. They are culturally savvy and often have professional ambitions early on. Stern (Business) and Tisch (Arts) are world-class and require specific profiles (entrepreneurial or artistic), while CAS offers a more traditional liberal arts path in the city."
);
DB["Tufts University"] = create(
  "Tufts", "Medford, MA", "Private", "10%", "Hard", "3.9+ UW", "1440-1550", "$63,804",
  ["IR", "Engineering", "Bio"],
  "Quirky, active citizenship, jumbo pride.",
  "Civically engaged and nice.",
  "Why Tufts essay is very important.",
  ["Tufts"],
  "Tufts is for 'nice' geniuses. The admissions office looks for 'Active Citizens'—students who want to use their intellect to solve civic problems. The International Relations program is huge. Admits are quirky (the essays ask weird questions) and collaborative. If you are cutthroat, go elsewhere."
);
DB["Northeastern University"] = create(
  "Northeastern", "Boston, MA", "Private", "7%", "Very Hard", "4.1 W", "1450-1550", "$59,100",
  ["Business", "CS", "Health Sci"],
  "Co-op focused, career oriented, modern.",
  "Pragmatic career focus.",
  "Focus on the Co-op model.",
  ["NEU", "Northeastern", "NU"],
  "Northeastern is all about the Co-op. Admits are pragmatic and career-focused. They want to work, not just study. The university has risen rapidly in rankings by attracting high-stats students who value experiential learning. If you want to graduate with a full resume and a job offer, this is the place."
);
DB["Boston University"] = create(
  "Boston University", "Boston, MA", "Private", "14%", "Hard", "3.8+ UW", "1390-1500", "$61,050",
  ["Comms", "Business", "Bio"],
  "Urban, large, research, grade deflation.",
  "City-lovers who are resilient.",
  "Why BU needs to mention specific programs.",
  ["BU", "Boston U"],
  "BU is a massive, urban research university. Admits are resilient city-dwellers. Grade deflation is a known concept here, so students must be willing to work hard. It lacks a traditional campus feel but offers the entire city of Boston. Pre-med, Law, and Communications are strong. "
);
DB["Boston College"] = create(
  "Boston College", "Chestnut Hill, MA", "Private", "17%", "Hard", "3.9+ UW", "1420-1530", "$62,950",
  ["Finance", "Econ", "Bio"],
  "Jesuit, service, sports, no Greek life.",
  "Well-rounded service oriented.",
  "Focus on reflection and service.",
  ["BC", "Boston College"],
  "BC is 'Jesuit, Catholic, Private'. It has a traditional campus feel (unlike BU/Northeastern) and a big sports culture. Admits are well-rounded, service-oriented, and often athletic. The Carroll School of Management is elite. Students talk about 'reflection' and 'formation'—Using their education to find their vocation."
);

// ==========================================
// TIER 2: SPECIFIC DATA LOOKUP (SEMI-MANUAL)
// ==========================================
const SPECIFIC_DATA: Record<string, { vibe: string, hook: string, strategy: string, majors: string[], abbreviations: string[], traits: string }> = {
  // --- PUBLIC IVIES & FLAGSHIPS ---
  "University of Washington": {
    vibe: "Rainy, beautiful cherry blossoms, massive research funding, CS is elite.",
    hook: "In-state high achievers or OOS students with specific diverse interests.",
    strategy: "For CS, you need near perfect stats. For others, show community impact.",
    majors: ["Computer Science", "Informatics", "Biology", "Business"],
    abbreviations: ["UW", "UDub", "Washington"],
    traits: "Research-driven, outdoor lovers, tech-savvy, community-minded."
  },
  "University of Texas at Austin": {
    vibe: "Keep Austin Weird, massive scale, football, top tier CS/Business.",
    hook: "Top 6% of TX class (Auto-admit). OOS must be exceptional.",
    strategy: "Fit to major is critical. McCombs and Cockrell are incredibly competitive.",
    majors: ["Business", "Computer Science", "Engineering", "Communications"],
    abbreviations: ["UT", "UT Austin", "Texas"],
    traits: "Spirited, creative, ambitious, Longhorn pride."
  },
  "Georgia Institute of Technology": {
    vibe: "Nerd pride, rigorous engineering, urban campus, makers.",
    hook: "Math/Science rigor. They want to see you building things.",
    strategy: "Discuss specific projects. 'Why Tech' must focus on their maker culture.",
    majors: ["Aerospace", "CS", "Mechanical Engineering", "Industrial Engineering"],
    abbreviations: ["Georgia Tech", "GT", "Tech"],
    traits: "Innovative, resilient, maker-focused, intense."
  },
  "UNC Chapel Hill": {
    vibe: "Public Ivy, friendly southern charm, basketball, research focused.",
    hook: "Service-oriented leaders who want to give back to the community.",
    strategy: "Focus on service and leadership. OOS is harder than Ivies.",
    majors: ["Biology", "Journalism", "Business", "Psychology"],
    abbreviations: ["UNC", "Chapel Hill", "North Carolina", "Tar Heels"],
    traits: "Service-oriented, spirited, collaborative, friendly."
  },
  "University of Virginia": {
    vibe: "Jeffersonian tradition, Honor Code, secret societies, preppy.",
    hook: "Student self-governance. Leaders who take charge.",
    strategy: "Show how you improved your community. 'Citizen-Scholar' ideal.",
    majors: ["Commerce", "Economics", "Biology", "Political Science"],
    abbreviations: ["UVA", "Virginia", "Wahoos"],
    traits: "Honor-bound, student leaders, community pillars, tradition-focused."
  },
  "University of Michigan": {
    vibe: "The ultimate college town, massive school spirit, strong across every discipline.",
    hook: "High stats + 'The Michigan Difference' (Community focus).",
    strategy: "Why Michigan essay must be specific. Ross is extremely competitive.",
    majors: ["Engineering", "Business", "Psychology", "Economics"],
    abbreviations: ["UMich", "Michigan", "U of M"],
    traits: "Spirited, high-achieving, research-driven, resilient."
  },
  "University of Florida": {
    vibe: "Gator Nation, SEC sports, swamp, top-5 public academic dominance.",
    hook: "High stats Floridians. Merit scholars.",
    strategy: "Grades and rigor are king. Essays are used for borderline cases.",
    majors: ["Engineering", "Business", "Biology", "Health Science"],
    abbreviations: ["UF", "Florida", "Gators"],
    traits: "Academic high-performers, spirited, ambitious state leaders."
  },
  "University of Wisconsin Madison": {
    vibe: "Party school meets Ivy education. Frozen lakes, cheese curds, intensity.",
    hook: "Midwestern high achievers. Work hard, play hard.",
    strategy: "Demonstrate you can handle the cold and the rigor. Be genuine.",
    majors: ["Economics", "Computer Science", "Biology", "Psychology"],
    abbreviations: ["UW Madison", "Wisconsin", "Badgers", "Wisca"],
    traits: "Work-hard-play-hard, community-focused, nice, resilient."
  },
  "University of Illinois Urbana-Champaign": {
    vibe: "Cornfields, massive Greek life, top tier engineering/CS globally.",
    hook: "Engineering wizards. Innovation and research.",
    strategy: "Apply to the specific major. Grainger Engineering is a different tier.",
    majors: ["Computer Science", "Electrical Engineering", "Accounting", "Psychology"],
    abbreviations: ["UIUC", "Illinois", "U of I"],
    traits: "Technical wizards, innovators, spirited, humble."
  },
  "Purdue University": {
    vibe: "Astronauts, engineering focus, grit, massive flat campus.",
    hook: "Hard workers. STEM focused students who value practical skills.",
    strategy: "Show grit and problem solving. Engineering First Year is the gatekeeper.",
    majors: ["Engineering", "Computer Science", "Aviation", "Nursing"],
    abbreviations: ["Purdue"],
    traits: "Gritty, practical problem solvers, humble hard workers."
  },
  "University of Maryland College Park": {
    vibe: "Near DC, CS/Engineering powerhouse, diverse, suburban-urban mix.",
    hook: "High stats in-state. Research interest for scholars programs.",
    strategy: "Living-Learning programs are key. Apply early via EA.",
    majors: ["Computer Science", "Engineering", "Biological Sciences", "Criminology"],
    abbreviations: ["UMD", "Maryland", "Terps"],
    traits: "Diverse, research-oriented, career-focused, engaged."
  },
  "Rutgers New Brunswick": {
    vibe: "The State University of NJ. Diverse, research active, buses between campuses.",
    hook: "NJ residents. Strong academic foundation.",
    strategy: "Honors college is the reach goal. Apply to the right school (SAS vs Engineering).",
    majors: ["Computer Science", "Psychology", "Engineering", "Pharmacy"],
    abbreviations: ["Rutgers", "RU"],
    traits: "Resilient, diverse, practical, research-ready."
  },
  "Penn State University": {
    vibe: "Football cult, massive alumni network, 'Happy Valley', spirited.",
    hook: "school spirit, legacies, and PA residents.",
    strategy: "Schreyer Honors College is the target for top students. Apply EA.",
    majors: ["Business", "Engineering", "Information Sciences", "Nursing"],
    abbreviations: ["PSU", "Penn State"],
    traits: "Spirited community members, loyal, active, team players."
  },
  "Ohio State University": {
    vibe: "The --> Ohio State. Massive resources, football, land-grant mission.",
    hook: "Well rounded Ohioans. Morrill Scholars focus on diversity/justice.",
    strategy: "Apply EA. Essays should focus on community and diversity.",
    majors: ["Finance", "Biology", "Psychology", "Marketing"],
    abbreviations: ["OSU", "Ohio State", "Buckeyes"],
    traits: "Community-leaders, spirited, diverse interests, collaborative."
  },

  // --- LIBERAL ARTS ---
  "Williams College": {
    vibe: "Purple bubble, tutorials (2 students 1 prof), stunning Berkshires nature.",
    hook: "Intellectuals who can hold a conversation. Varsity athletes.",
    strategy: "Show you are ready for the tutorial system. Intellectual vitality.",
    majors: ["Economics", "Math", "English", "Biology"],
    abbreviations: ["Williams"],
    traits: "Deeply intellectual, articulate, collaborative, athletic."
  },
  "Amherst College": {
    vibe: "Open curriculum, singing groups, intense writing, Five College Consortium.",
    hook: "Diverse backgrounds, strong writers, intellectual explorers.",
    strategy: "Essays are critical. Focus on how you use your freedom.",
    majors: ["Economics", "Math", "English", "Psychology"],
    abbreviations: ["Amherst"],
    traits: "Intellectually adventurous, strong writers, diverse thinkers."
  },
  "Swarthmore College": {
    vibe: "Quaker roots, intense workload, social justice, 'misery loves company'.",
    hook: "Intellectually curious, humble, wicked smart.",
    strategy: "Show you love to learn for learning's sake. No grade obsession.",
    majors: ["Economics", "Biology", "Political Science", "Engineering"],
    abbreviations: ["Swarthmore", "Swat"],
    traits: "Intense intellectuals, social justice advocates, humble."
  },
  "Pomona College": {
    vibe: "West coast Ivy, Claremont consortium, sunny, relaxed intelligence.",
    hook: "Collaborative, diverse interests (e.g., Chemistry + Poetry).",
    strategy: "Focus on community impact and the consortium benefits.",
    majors: ["Economics", "Computer Science", "Math", "Neuroscience"],
    abbreviations: ["Pomona"],
    traits: "Collaborative, sunny intellectuals, community-builders."
  },
  "Wellesley College": {
    vibe: "The most powerful women's network. Hillary Clinton's alma mater.",
    hook: "Empowered women, future leaders, siblings.",
    strategy: "Why Wellesley: Focus on the women's college environment benefits.",
    majors: ["Economics", "Political Science", "Psychology", "Computer Science"],
    abbreviations: ["Wellesley"],
    traits: "Empowered leaders, articulate, supportive, ambitious."
  },
  "Bowdoin College": {
    vibe: "The Common Good, amazing food, cold but incredibly friendly.",
    hook: "Kind, community-oriented students. 'Bowdoin Hello'.",
    strategy: "The 'Common Good' is real. Show how you help others.",
    majors: ["Government", "Economics", "Math", "Environmental Studies"],
    abbreviations: ["Bowdoin"],
    traits: "Kind, community-oriented, outdoorsy, intellectual."
  },
  "Middlebury College": {
    vibe: "Languages, skiing, environmentalism, rural VT beauty.",
    hook: "Global citizens, outdoorsy scholars, language lovers.",
    strategy: "Demonstrate a love for the outdoors or global awareness.",
    majors: ["Economics", "Political Science", "Environmental Studies", "International Studies"],
    abbreviations: ["Middlebury", "Midd"],
    traits: "Global citizens, language lovers, environmental stewards."
  },
  "Claremont McKenna College": {
    vibe: "Leadership, economics/govt focus, pragmatic, sunny.",
    hook: "Future CEOs and politicians. Practical leadership.",
    strategy: "Show leadership in action. Not just theory, but doing.",
    majors: ["Economics", "Government", "Psychology", "International Relations"],
    abbreviations: ["CMC", "Claremont McKenna"],
    traits: "Pragmatic leaders, ambitious, politically engaged."
  },
  "Carleton College": {
    vibe: "Minnesota nice, quirky, trimester system, frisbee culture.",
    hook: "Intellectuals who don't take themselves too seriously.",
    strategy: "Be quirky and honest. They love genuine personalities.",
    majors: ["Computer Science", "Biology", "Economics", "International Relations"],
    abbreviations: ["Carleton"],
    traits: "Quirky, unpretentious, intellectually curious, nice."
  },
  "Davidson College": {
    vibe: "Honor code, Southern hospitality, Steph Curry, rigorous.",
    hook: "Service oriented, athletic scholars, reputable character.",
    strategy: "The Honor Code is huge. Mention it. Peer recommendation helps.",
    majors: ["Biology", "Political Science", "Economics", "Psychology"],
    abbreviations: ["Davidson"],
    traits: "Honorable, service-oriented, athletic scholars, community pillars."
  },

  // --- TECH & SPECIALIZED ---
  "Carnegie Mellon University": {
    vibe: "Arts + Tech collision. Intense CS/Drama. Tartan plaid.",
    hook: "Savant-level talent in CS, Math, or Drama.",
    strategy: "Apply to the specific college. Show deep, deep expertise.",
    majors: ["Computer Science", "Electrical Engineering", "Drama", "Mechanical Engineering"],
    abbreviations: ["CMU", "Carnegie Mellon"],
    traits: "Obsessive experts, intense, interdisciplinary geniuses."
  },
  "California Polytechnic State University-San Luis Obispo": { // Cal Poly SLO
    vibe: "Learn by Doing. Happiest town in America. Practical skills.",
    hook: "High GPA/Stats. Math/Science heavy.",
    strategy: "MCA Score is everything. Max out your coursework rigor.",
    majors: ["Engineering", "Business", "Agriculture", "Architecture"],
    abbreviations: ["Cal Poly", "SLO", "Cal Poly SLO"],
    traits: "Practical, hands-on learners, career-focused, outdoorsy."
  },

  // --- BOSTON / NY / CITY ---
  "Boston University": {
    vibe: "Urban, massive, grade deflation, research powerhouse.",
    hook: "City lovers who are resilient and independent.",
    strategy: "Why BU: Mention specific research centers or professors.",
    majors: ["Business", "Communication", "Biology", "Health Sciences"],
    abbreviations: ["BU", "Boston U"],
    traits: "Independent, resilient, urban-savvy, ambitious."
  },
  "Northeastern University": {
    vibe: "Co-op program is religion. Modern, career focused, global.",
    hook: "Pragmatic, career-minded students. 'World readiness'.",
    strategy: "It's all about the Co-op. Explain how you will use it.",
    majors: ["Computer Science", "Business", "Engineering", "Health Science"],
    abbreviations: ["NEU", "Northeastern", "NU"],
    traits: "Career-driven, pragmatic, experiential learners."
  },
  "New York University": {
    vibe: "No campus, the city is your school. Independent, expensive.",
    hook: "Independent, cosmopolitan, go-getters.",
    strategy: "Show you can handle the city. Apply to the right school (Stern vs CAS).",
    majors: ["Visual and Performing Arts", "Social Sciences", "Business", "Liberal Arts"],
    abbreviations: ["NYU"],
    traits: "Independent, cosmopolitan, gritty, career-focused."
  },
  "Tufts University": {
    vibe: "Active citizenship, IR powerhouse, quirky, 'Jumbo' pride.",
    hook: "Civically engaged, nice/quirky kids who want to change the world.",
    strategy: "Why Tufts essay is very important. Be specific and weird.",
    majors: ["International Relations", "Biology", "Computer Science", "Engineering"],
    abbreviations: ["Tufts"],
    traits: "Civically engaged, nice, global thinkers, quirky."
  },
  "Boston College": {
    vibe: "Jesuit, service, sports, no Greek life, 'Man for Others'.",
    hook: "Well-rounded service oriented students. Ethical leaders.",
    strategy: "Focus on reflection, service, and the core curriculum.",
    majors: ["Finance", "Economics", "Biology", "Political Science"],
    abbreviations: ["BC", "Boston College"],
    traits: "Service leaders, values-driven, athletic, community-focused."
  },
  "University of Southern California": {
    vibe: "Trojan Family, film/business/game design, school spirit.",
    hook: "Interdisciplinary thinkers with connections. Creative ambition.",
    strategy: "Show ambition. Merit scholarships require early application.",
    majors: ["Business", "Communications", "Visual Arts", "Engineering"],
    abbreviations: ["USC", "SC", "Southern Cal"],
    traits: "Ambitious, creative, networkers, spirited."
  }
};

// ==========================================
// PROGRAMMATIC BULK DATA (500+ ENTRIES)
// ==========================================

const BULK_DATA_SOURCE = [
  // FORMAT: [Name, State, Acceptance Rate, SAT Range]
  // WEST
  ["University of Washington", "WA", "48%", "1240-1460"], ["University of Oregon", "OR", "86%", "1120-1350"],
  ["Oregon State University", "OR", "83%", "1100-1340"], ["Washington State University", "WA", "83%", "1020-1240"],
  ["Gonzaga University", "WA", "76%", "1200-1380"], ["Seattle University", "WA", "85%", "1140-1330"],
  ["Lewis & Clark College", "OR", "68%", "1230-1410"], ["Willamette University", "OR", "80%", "1130-1340"],
  ["Whitman College", "WA", "48%", "1300-1470"], ["University of Puget Sound", "WA", "88%", "1140-1340"],
  ["UC San Diego", "CA", "24%", "Test Blind"], ["UC Santa Barbara", "CA", "26%", "Test Blind"],
  ["UC Irvine", "CA", "21%", "Test Blind"], ["UC Davis", "CA", "37%", "Test Blind"],
  ["UC Santa Cruz", "CA", "47%", "Test Blind"], ["UC Riverside", "CA", "69%", "Test Blind"],
  ["UC Merced", "CA", "89%", "Test Blind"], ["Cal Poly SLO", "CA", "30%", "Test Blind"],
  ["San Diego State", "CA", "34%", "Test Blind"], ["CSU Long Beach", "CA", "40%", "Test Blind"],
  ["San Jose State", "CA", "77%", "Test Blind"], ["Cal Poly Pomona", "CA", "55%", "Test Blind"],
  ["Santa Clara University", "CA", "52%", "1290-1460"], ["Loyola Marymount University", "CA", "41%", "1250-1400"],
  ["University of San Diego", "CA", "53%", "1200-1380"], ["Pepperdine University", "CA", "49%", "1260-1430"],
  ["San Francisco State", "CA", "93%", "Test Blind"], ["CSU Fullerton", "CA", "67%", "Test Blind"],
  ["Chapman University", "CA", "73%", "1190-1380"], ["University of the Pacific", "CA", "93%", "1120-1360"],
  ["Occidental College", "CA", "39%", "1320-1490"], ["Pitzer College", "CA", "18%", "1400-1520"],
  ["Scripps College", "CA", "28%", "1380-1510"], ["Pomona College", "CA", "7%", "1470-1570"],
  ["Claremont McKenna", "CA", "10%", "1440-1550"], ["Harvey Mudd College", "CA", "13%", "1490-1570"],
  ["University of Arizona", "AZ", "87%", "1110-1360"], ["Arizona State University", "AZ", "88%", "1120-1360"],
  ["Northern Arizona University", "AZ", "78%", "1060-1270"], ["University of Utah", "UT", "89%", "1160-1380"],
  ["Brigham Young University", "UT", "66%", "1210-1430"], ["Utah State University", "UT", "93%", "1080-1320"],
  ["University of Colorado Boulder", "CO", "80%", "1170-1390"], ["Colorado State University", "CO", "90%", "1070-1290"],
  ["Colorado School of Mines", "CO", "58%", "1340-1480"], ["University of Denver", "CO", "78%", "1190-1390"],
  ["Colorado College", "CO", "16%", "1360-1510"], ["Regis University", "CO", "81%", "1060-1260"],
  ["University of Nevada Reno", "NV", "88%", "1060-1270"], ["UNLV", "NV", "85%", "1030-1240"],
  ["University of New Mexico", "NM", "97%", "1020-1260"], ["New Mexico State", "NM", "98%", "970-1180"],
  ["University of Idaho", "ID", "73%", "1010-1240"], ["Boise State University", "ID", "84%", "1050-1260"],
  ["Montana State University", "MT", "73%", "1100-1320"], ["University of Montana", "MT", "95%", "1070-1290"],
  ["University of Wyoming", "WY", "97%", "1080-1300"], ["University of Hawaii Manoa", "HI", "73%", "1080-1270"],

  // MIDWEST
  ["University of Illinois Urbana-Champaign", "IL", "45%", "1330-1530"], ["UIC", "IL", "79%", "1080-1310"],
  ["DePaul University", "IL", "70%", "1080-1310"], ["Loyola University Chicago", "IL", "79%", "1150-1360"],
  ["Illinois State University", "IL", "86%", "1020-1230"], ["Bradley University", "IL", "76%", "1070-1280"],
  ["Wheaton College", "IL", "88%", "1230-1440"], ["Knox College", "IL", "73%", "1120-1350"],
  ["Lake Forest College", "IL", "58%", "1150-1340"], ["Augustana College", "IL", "68%", "1130-1340"],
  ["University of Wisconsin Madison", "WI", "49%", "1340-1500"], ["Marquette University", "WI", "87%", "1160-1360"],
  ["UW Milwaukee", "WI", "86%", "1040-1250"], ["Lawrence University", "WI", "72%", "1200-1420"],
  ["Beloit College", "WI", "62%", "1140-1360"], ["University of Minnesota Twin Cities", "MN", "75%", "1280-1470"],
  ["University of St. Thomas", "MN", "77%", "1130-1340"], ["Macalester College", "MN", "28%", "1370-1510"],
  ["Carleton College", "MN", "17%", "1420-1540"], ["St. Olaf College", "MN", "53%", "1250-1470"],
  ["Gustavus Adolphus College", "MN", "74%", "1150-1360"], ["University of Michigan Dearborn", "MI", "54%", "1090-1320"],
  ["Michigan State University", "MI", "83%", "1110-1320"], ["Wayne State University", "MI", "75%", "1000-1220"],
  ["Western Michigan University", "MI", "85%", "1000-1210"], ["Grand Valley State", "MI", "90%", "1050-1240"],
  ["Ohio State University", "OH", "53%", "1270-1420"], ["Miami University", "OH", "88%", "1190-1380"],
  ["University of Cincinnati", "OH", "86%", "1160-1360"], ["Ohio University", "OH", "87%", "1060-1260"],
  ["Case Western Reserve", "OH", "27%", "1410-1530"], ["Oberlin College", "OH", "34%", "1360-1510"],
  ["Kenyon College", "OH", "34%", "1370-1520"], ["Denison University", "OH", "22%", "1300-1470"],
  ["College of Wooster", "OH", "68%", "1190-1400"], ["University of Dayton", "OH", "81%", "1130-1330"],
  ["Xavier University", "OH", "84%", "1090-1290"], ["Indiana University Bloomington", "IN", "82%", "1170-1390"],
  ["Purdue University", "IN", "50%", "1210-1450"], ["University of Notre Dame", "IN", "12%", "1420-1550"],
  ["Butler University", "IN", "82%", "1160-1340"], ["Valparaiso University", "IN", "93%", "1070-1280"],
  ["DePauw University", "IN", "65%", "1110-1340"], ["Wabash College", "IN", "61%", "1110-1310"],
  ["Rose-Hulman", "IN", "73%", "1290-1490"], ["Earlham College", "IN", "73%", "1090-1320"],
  ["University of Iowa", "IA", "86%", "1130-1350"], ["Iowa State University", "IA", "90%", "1080-1330"],
  ["Grinnell College", "IA", "11%", "1430-1550"], ["Drake University", "IA", "69%", "1120-1350"],
  ["Luther College", "IA", "76%", "1080-1320"], ["University of Missouri", "MO", "79%", "1130-1340"],
  ["Saint Louis University", "MO", "71%", "1190-1390"], ["Missouri State", "MO", "88%", "1040-1240"],
  ["Truman State", "MO", "45%", "1140-1340"], ["University of Kansas", "KS", "88%", "1110-1350"],
  ["Kansas State University", "KS", "95%", "1060-1280"], ["Wichita State", "KS", "91%", "980-1190"],
  ["University of Nebraska Lincoln", "NE", "79%", "1120-1370"], ["Creighton University", "NE", "76%", "1170-1370"],

  // SOUTH
  ["University of Florida", "FL", "23%", "1360-1520"], ["Florida State University", "FL", "25%", "1250-1400"],
  ["University of Miami", "FL", "19%", "1300-1460"], ["USF", "FL", "44%", "1170-1340"],
  ["UCF", "FL", "41%", "1190-1360"], ["FIU", "FL", "59%", "1060-1240"],
  ["University of North Florida", "FL", "71%", "1080-1260"], ["Florida Atlantic", "FL", "74%", "1050-1230"],
  ["Rollins College", "FL", "55%", "1130-1310"], ["Stetson University", "FL", "92%", "1090-1290"],
  ["University of Georgia", "GA", "43%", "1270-1450"], ["Georgia Tech", "GA", "16%", "1370-1530"],
  ["Georgia State University", "GA", "67%", "1050-1250"], ["Kennesaw State", "GA", "82%", "1040-1220"],
  ["Georgia Southern", "GA", "89%", "990-1170"], ["Mercer University", "GA", "74%", "1180-1340"],
  ["Agnes Scott College", "GA", "65%", "1140-1340"], ["Spelman College", "GA", "28%", "1080-1250"],
  ["Morehouse College", "GA", "65%", "1030-1200"], ["Berry College", "GA", "68%", "1120-1330"],
  ["UNC Chapel Hill", "NC", "17%", "1370-1500"], ["NC State", "NC", "47%", "1280-1440"],
  ["Wake Forest University", "NC", "20%", "Test Optional"], ["Duke University", "NC", "6%", "1480-1570"],
  ["Davidson College", "NC", "16%", "1390-1510"], ["UNC Wilmington", "NC", "68%", "1210-1360"],
  ["UNC Charlotte", "NC", "80%", "1110-1300"], ["East Carolina University", "NC", "94%", "1070-1220"],
  ["Appalachian State", "NC", "83%", "1100-1280"], ["Elon University", "NC", "74%", "1160-1320"],
  ["High Point University", "NC", "79%", "1100-1280"], ["University of South Carolina", "SC", "64%", "1180-1370"],
  ["Clemson University", "SC", "43%", "1230-1400"], ["College of Charleston", "SC", "76%", "1120-1300"],
  ["Furman University", "SC", "67%", "1240-1420"], ["Wofford College", "SC", "60%", "1200-1370"],
  ["University of Virginia", "VA", "19%", "1390-1530"], ["William & Mary", "VA", "33%", "1360-1510"],
  ["Virginia Tech", "VA", "57%", "1220-1420"], ["James Madison University", "VA", "78%", "1140-1310"],
  ["George Mason University", "VA", "90%", "1130-1340"], ["VCU", "VA", "91%", "1080-1290"],
  ["University of Richmond", "VA", "24%", "1340-1490"], ["Washington and Lee", "VA", "19%", "1410-1530"],
  ["Hampton University", "VA", "47%", "1010-1180"], ["University of Maryland College Park", "MD", "44%", "1340-1490"],
  ["UMBC", "MD", "81%", "1190-1360"], ["Towson University", "MD", "79%", "1070-1250"],
  ["Johns Hopkins", "MD", "6.5%", "1510-1570"], ["Loyola Maryland", "MD", "83%", "1150-1330"],
  ["University of Delaware", "DE", "72%", "1170-1350"], ["West Virginia University", "WV", "90%", "1030-1230"],
  ["University of Kentucky", "KY", "94%", "1090-1310"], ["University of Louisville", "KY", "80%", "1050-1280"],
  ["Centre College", "KY", "63%", "1150-1360"], ["University of Tennessee Knoxville", "TN", "68%", "1170-1360"],
  ["Vanderbilt University", "TN", "6%", "1480-1570"], ["University of Memphis", "TN", "95%", "1010-1230"],
  ["Belmont University", "TN", "96%", "1130-1320"], ["Rhodes College", "TN", "54%", "1260-1440"],
  ["Sewanee", "TN", "52%", "1210-1390"], ["University of Alabama", "AL", "80%", "1110-1380"],
  ["Auburn University", "AL", "44%", "1180-1340"], ["UAB", "AL", "87%", "1090-1340"],
  ["Samford University", "AL", "83%", "1080-1260"], ["University of Mississippi", "MS", "89%", "1020-1250"],
  ["Mississippi State", "MS", "70%", "1030-1280"], ["University of Arkansas", "AR", "79%", "1100-1290"],
  ["LSU", "LA", "71%", "1090-1300"], ["Tulane University", "LA", "11%", "1410-1510"],
  ["Loyola New Orleans", "LA", "99%", "1060-1260"], ["University of Oklahoma", "OK", "73%", "1120-1340"],
  ["Oklahoma State", "OK", "71%", "1060-1280"], ["University of Tulsa", "OK", "37%", "1120-1380"],
  ["UT Austin", "TX", "29%", "1230-1500"], ["Texas A&M", "TX", "63%", "1160-1380"],
  ["Rice University", "TX", "8%", "1490-1580"], ["SMU", "TX", "52%", "1330-1490"],
  ["TCU", "TX", "56%", "1150-1350"], ["Baylor University", "TX", "46%", "1190-1370"],
  ["University of Houston", "TX", "66%", "1140-1330"], ["Texas Tech", "TX", "67%", "1080-1270"],
  ["UT Dallas", "TX", "85%", "1230-1440"], ["UT San Antonio", "TX", "90%", "1020-1210"],
  ["Texas State", "TX", "88%", "1010-1190"], ["Trinity University", "TX", "31%", "1290-1460"],

  // NORTHEAST
  ["Penn State University", "PA", "55%", "1200-1400"], ["University of Pittsburgh", "PA", "49%", "1260-1440"],
  ["Temple University", "PA", "80%", "1130-1350"], ["Drexel University", "PA", "80%", "1190-1390"],
  ["Carnegie Mellon", "PA", "11%", "1490-1570"], ["UPenn", "PA", "6%", "1480-1570"],
  ["Villanova University", "PA", "23%", "1380-1480"], ["Lehigh University", "PA", "37%", "1300-1460"],
  ["Bucknell University", "PA", "33%", "1260-1430"], ["Lafayette College", "PA", "31%", "1270-1430"],
  ["Swarthmore College", "PA", "7%", "1430-1560"], ["Haverford College", "PA", "14%", "1420-1540"],
  ["Bryn Mawr College", "PA", "30%", "1330-1500"], ["Franklin & Marshall", "PA", "36%", "1300-1450"],
  ["Dickinson College", "PA", "35%", "Test Optional"], ["Gettysburg College", "PA", "56%", "Test Optional"],
  ["Rutgers New Brunswick", "NJ", "66%", "1270-1480"], ["Princeton University", "NJ", "4%", "1500-1580"],
  ["The College of New Jersey", "NJ", "62%", "1170-1360"], ["Seton Hall University", "NJ", "75%", "1160-1350"],
  ["Montclair State", "NJ", "88%", "1020-1220"], ["Rowan University", "NJ", "77%", "1060-1280"],
  ["Stevens Institute of Tech", "NJ", "46%", "1360-1500"], ["Stony Brook University", "NY", "49%", "1260-1430"],
  ["Binghamton University", "NY", "42%", "1290-1450"], ["University at Buffalo", "NY", "68%", "1190-1380"],
  ["Cornell University", "NY", "7%", "1450-1560"], ["Columbia University", "NY", "4%", "1470-1570"],
  ["NYU", "NY", "8%", "1450-1570"], ["Fordham University", "NY", "54%", "1280-1450"],
  ["Syracuse University", "NY", "52%", "1180-1380"], ["RIT", "NY", "67%", "1240-1420"],
  ["RPI", "NY", "65%", "1340-1500"], ["University of Rochester", "NY", "35%", "1350-1500"],
  ["Colgate University", "NY", "12%", "1400-1520"], ["Hamilton College", "NY", "12%", "1420-1510"],
  ["Vassar College", "NY", "19%", "1420-1520"], ["Barnard College", "NY", "8%", "1440-1540"],
  ["Skidmore College", "NY", "26%", "1320-1470"], ["Union College", "NY", "47%", "1300-1470"],
  ["Ithaca College", "NY", "71%", "1180-1360"], ["Marist College", "NY", "60%", "1170-1340"],
  ["UConn", "CT", "55%", "1240-1430"], ["Yale University", "CT", "5%", "1480-1580"],
  ["Wesleyan University", "CT", "14%", "Test Optional"], ["Trinity College", "CT", "36%", "1300-1450"],
  ["Quinnipiac University", "CT", "84%", "1090-1280"], ["Fairfield University", "CT", "52%", "1210-1350"],
  ["University of Rhode Island", "RI", "76%", "1080-1260"], ["Brown University", "RI", "5%", "1460-1570"],
  ["Providence College", "RI", "53%", "1200-1360"], ["Bryant University", "RI", "69%", "1120-1290"],
  ["UMass Amherst", "MA", "64%", "1230-1420"], ["UMass Lowell", "MA", "85%", "1150-1320"],
  ["UMass Boston", "MA", "79%", "1050-1250"], ["Harvard University", "MA", "3%", "1480-1580"],
  ["Boston University", "MA", "14%", "1390-1500"],
  ["Northeastern University", "MA", "7%", "1450-1550"], ["Boston College", "MA", "17%", "1420-1530"],
  ["Tufts University", "MA", "10%", "1440-1550"], ["Brandeis University", "MA", "39%", "1370-1500"],
  ["WPI", "MA", "57%", "1320-1480"], ["Williams College", "MA", "8%", "1460-1560"],
  ["Amherst College", "MA", "9%", "1450-1560"], ["Wellesley College", "MA", "13%", "1430-1540"],
  ["Smith College", "MA", "23%", "1380-1500"], ["Mount Holyoke", "MA", "40%", "1350-1490"],
  ["Holy Cross", "MA", "38%", "1290-1430"], ["Babson College", "MA", "22%", "1340-1500"],
  ["Bentley University", "MA", "58%", "1230-1410"], ["Emerson College", "MA", "45%", "1180-1360"],
  ["University of Vermont", "VT", "60%", "1200-1390"], ["Middlebury College", "VT", "11%", "1450-1550"],
  ["UNH", "NH", "87%", "1100-1290"], ["Dartmouth College", "NH", "6%", "1440-1560"],
  ["University of Maine", "ME", "96%", "1040-1260"], ["Bowdoin College", "ME", "9%", "Test Optional"],
  ["Bates College", "ME", "14%", "Test Optional"], ["Colby College", "ME", "8%", "1450-1540"],

  // DC
  ["Georgetown University", "DC", "12%", "1410-1550"], ["George Washington University", "DC", "49%", "1320-1480"],
  ["American University", "DC", "41%", "1280-1440"], ["Howard University", "DC", "35%", "1130-1320"],
  ["Catholic University", "DC", "86%", "1130-1330"],

  // MASSIVE EXPANSION (300+ Additional Schools)
  // -------------------------------------------------------------------------
  // GREAT LAKES & MIDWEST
  ["Ball State University", "IN", "69%", "1080-1240"], ["University of Southern Indiana", "IN", "94%", "990-1170"],
  ["IUPUI", "IN", "83%", "1030-1230"], ["Indiana State University", "IN", "92%", "960-1160"],
  ["Eastern Michigan University", "MI", "84%", "960-1180"], ["Central Michigan University", "MI", "79%", "990-1200"],
  ["Northern Michigan University", "MI", "71%", "970-1190"], ["Oakland University", "MI", "91%", "1010-1230"],
  ["Ferris State University", "MI", "82%", "960-1170"], ["Saginaw Valley State", "MI", "78%", "970-1160"],
  ["University of Toledo", "OH", "95%", "1030-1250"], ["Bowling Green State University", "OH", "79%", "1020-1240"],
  ["Kent State University", "OH", "87%", "1060-1260"], ["University of Akron", "OH", "85%", "1000-1210"],
  ["Wright State University", "OH", "96%", "980-1180"], ["Youngstown State University", "OH", "78%", "950-1150"],
  ["Cleveland State University", "OH", "90%", "1010-1230"], ["John Carroll University", "OH", "88%", "1100-1290"],
  ["Otterbein University", "OH", "83%", "1070-1270"], ["Capital University", "OH", "74%", "1060-1260"],
  ["University of Illinois Chicago", "IL", "79%", "1080-1310"], ["Northern Illinois University", "IL", "70%", "970-1190"],
  ["Southern Illinois University", "IL", "95%", "990-1210"], ["Eastern Illinois University", "IL", "72%", "960-1170"],
  ["Western Illinois University", "IL", "75%", "960-1160"], ["Columbia College Chicago", "IL", "96%", "Test Optional"],
  ["Elmhurst University", "IL", "73%", "1070-1280"], ["North Central College", "IL", "64%", "1080-1280"],
  ["University of Wisconsin Whitewater", "WI", "86%", "1000-1190"], ["University of Wisconsin Eau Claire", "WI", "85%", "1040-1260"],
  ["University of Wisconsin La Crosse", "WI", "82%", "1110-1280"], ["University of Wisconsin Oshkosh", "WI", "89%", "980-1170"],
  ["University of Wisconsin Stevens Point", "WI", "89%", "990-1180"], ["St. Norbert College", "WI", "84%", "1080-1290"],
  ["Carthage College", "WI", "81%", "1050-1250"], ["Concordia University Wisconsin", "WI", "70%", "1040-1260"],

  // PLAINS
  ["University of Northern Iowa", "IA", "86%", "1010-1250"], ["St. Ambrose University", "IA", "74%", "1030-1210"],
  ["Simpson College", "IA", "89%", "1020-1240"], ["Central College", "IA", "72%", "1010-1230"],
  ["Wartburg College", "IA", "79%", "1030-1250"], ["Coe College", "IA", "79%", "1090-1320"],
  ["University of Missouri Kansas City", "MO", "69%", "1080-1330"], ["University of Missouri St. Louis", "MO", "77%", "1060-1270"],
  ["Missouri S&T", "MO", "85%", "1230-1410"], ["Southeast Missouri State", "MO", "86%", "1010-1210"],
  ["University of Central Missouri", "MO", "76%", "990-1190"], ["Lindenwood University", "MO", "75%", "1040-1220"],
  ["Rockhurst University", "MO", "73%", "1080-1280"], ["Webster University", "MO", "56%", "1040-1240"],
  ["Emporia State University", "KS", "87%", "980-1180"], ["Pittsburg State University", "KS", "94%", "1000-1190"],
  ["Fort Hays State University", "KS", "91%", "970-1170"], ["Washburn University", "KS", "99%", "980-1160"],
  ["University of Nebraska Omaha", "NE", "87%", "1030-1240"], ["University of Nebraska Kearney", "NE", "88%", "1010-1210"],
  ["Nebraska Wesleyan University", "NE", "80%", "1070-1280"], ["Chadron State College", "NE", "99%", "960-1140"],

  // SOUTH & SOUTHEAST EXPANSION
  ["University of West Florida", "FL", "48%", "1070-1250"], ["Florida Gulf Coast University", "FL", "74%", "1060-1230"],
  ["Florida Polytechnic University", "FL", "57%", "1200-1370"], ["Florida A&M University", "FL", "32%", "1050-1190"],
  ["Barry University", "FL", "65%", "950-1120"], ["Nova Southeastern University", "FL", "93%", "1060-1280"],
  ["University of Tampa", "FL", "54%", "1100-1260"], ["Eckerd College", "FL", "67%", "1090-1280"],
  ["Ringling College of Art and Design", "FL", "64%", "Test Optional"], ["Flagler College", "FL", "74%", "1060-1230"],
  ["Georgia College & State University", "GA", "80%", "1100-1260"], ["Valdosta State University", "GA", "76%", "980-1160"],
  ["University of West Georgia", "GA", "80%", "960-1140"], ["Columbus State University", "GA", "88%", "950-1140"],
  ["Savannah College of Art and Design", "GA", "82%", "1070-1280"], ["Oglethorpe University", "GA", "81%", "1130-1320"],
  ["Piedmont University", "GA", "70%", "1010-1190"], ["Brenau University", "GA", "89%", "970-1150"],
  ["Western Carolina University", "NC", "85%", "1040-1210"], ["UNC Greensboro", "NC", "91%", "1030-1210"],
  ["North Carolina A&T", "NC", "56%", "990-1150"], ["North Carolina Central", "NC", "84%", "940-1090"],
  ["Winston-Salem State", "NC", "73%", "920-1060"], ["Fayetteville State", "NC", "81%", "920-1060"],
  ["Campbell University", "NC", "87%", "1040-1230"], ["Wingate University", "NC", "86%", "1010-1190"],
  ["Meredith College", "NC", "75%", "1040-1240"], ["Queens University of Charlotte", "NC", "69%", "1060-1230"],
  ["College of Charleston", "SC", "76%", "1120-1300"], ["The Citadel", "SC", "99%", "1050-1220"],
  ["Coastal Carolina University", "SC", "79%", "1020-1190"], ["Winthrop University", "SC", "70%", "980-1170"],
  ["South Carolina State", "SC", "84%", "900-1050"], ["Presbyterian College", "SC", "75%", "1050-1240"],
  ["Old Dominion University", "VA", "95%", "1020-1220"], ["Radford University", "VA", "93%", "970-1160"],
  ["Longwood University", "VA", "87%", "1010-1190"], ["Christopher Newport University", "VA", "85%", "1120-1290"],
  ["University of Mary Washington", "VA", "82%", "1090-1280"], ["Hampden-Sydney College", "VA", "37%", "1080-1270"],
  ["Randolph-Macon College", "VA", "84%", "1060-1250"], ["Roanoke College", "VA", "80%", "1070-1260"],
  ["Hollins University", "VA", "72%", "1090-1290"], ["Sweet Briar College", "VA", "76%", "1060-1260"],
  ["Marshall University", "WV", "97%", "970-1170"], ["West Virginia State", "WV", "96%", "910-1080"],
  ["Western Kentucky University", "KY", "97%", "1020-1230"], ["Eastern Kentucky University", "KY", "64%", "980-1190"],
  ["Northern Kentucky University", "KY", "86%", "1010-1220"], ["Morehead State University", "KY", "77%", "990-1190"],
  ["Bellarmine University", "KY", "86%", "1080-1270"], ["Transylvania University", "KY", "91%", "1070-1290"],
  ["Middle Tennessee State", "TN", "73%", "1020-1230"], ["East Tennessee State", "TN", "85%", "1010-1210"],
  ["Tennessee Tech", "TN", "79%", "1060-1280"], ["Chattanooga", "TN", "83%", "1040-1230"],
  ["Lipscomb University", "TN", "71%", "1100-1300"], ["Union University", "TN", "57%", "1090-1310"],
  ["Christian Brothers University", "TN", "96%", "1030-1220"], ["Lee University", "TN", "75%", "1020-1230"],
  ["University of South Alabama", "AL", "65%", "1030-1230"], ["Troy University", "AL", "95%", "970-1150"],
  ["Jacksonville State University", "AL", "76%", "990-1180"], ["University of North Alabama", "AL", "96%", "1000-1190"],
  ["Tuskegee University", "AL", "30%", "1020-1190"], ["Alabama A&M", "AL", "72%", "920-1060"],
  ["Spring Hill College", "AL", "72%", "1040-1210"], ["Birmingham-Southern", "AL", "66%", "1080-1260"],
  ["University of Southern Mississippi", "MS", "98%", "990-1180"], ["Jackson State University", "MS", "64%", "950-1110"],
  ["Millsaps College", "MS", "68%", "1100-1290"], ["Mississippi College", "MS", "41%", "1050-1240"],
  ["Arkansas State University", "AR", "63%", "1030-1230"], ["University of Central Arkansas", "AR", "91%", "990-1180"],
  ["Hendrix College", "AR", "60%", "1140-1360"], ["Harding University", "AR", "45%", "1060-1280"],
  ["University of Louisiana Lafayette", "LA", "74%", "1030-1220"], ["Louisiana Tech", "LA", "66%", "1070-1260"],
  ["University of New Orleans", "LA", "70%", "980-1170"], ["Xavier University of Louisiana", "LA", "95%", "1010-1180"],
  ["Centenary College of Louisiana", "LA", "63%", "1050-1240"], ["Grambling State", "LA", "42%", "890-1030"],

  // TEXAS & SOUTHWEST EXPANSION
  ["University of North Texas", "TX", "79%", "1060-1260"], ["Texas Woman's University", "TX", "94%", "950-1140"],
  ["Sam Houston State", "TX", "97%", "980-1160"], ["Stephen F Austin State", "TX", "90%", "970-1150"],
  ["Lamar University", "TX", "88%", "940-1120"], ["Texas A&M Corpus Christi", "TX", "88%", "990-1170"],
  ["West Texas A&M", "TX", "91%", "960-1140"], ["Texas Southern University", "TX", "97%", "880-1020"],
  ["Prairie View A&M", "TX", "76%", "890-1030"], ["St. Mary's University", "TX", "86%", "1050-1230"],
  ["St. Edward's University", "TX", "87%", "1070-1250"], ["Abilene Christian University", "TX", "66%", "1040-1250"],
  ["University of Dallas", "TX", "59%", "1130-1340"], ["Southwestern University", "TX", "45%", "1140-1320"],
  ["Austin College", "TX", "51%", "1100-1290"], ["Hardin-Simmons", "TX", "89%", "1010-1200"],
  ["University of Central Oklahoma", "OK", "73%", "980-1180"], ["Northeastern State University", "OK", "99%", "920-1120"],
  ["Oral Roberts University", "OK", "83%", "1000-1210"], ["Oklahoma City University", "OK", "79%", "1060-1260"],

  // NORTHEAST EXPANSION
  ["West Chester University", "PA", "89%", "1060-1230"], ["Bloomsburg University", "PA", "94%", "980-1160"],
  ["Slippery Rock University", "PA", "74%", "1000-1180"], ["Indiana University of PA", "PA", "92%", "960-1150"],
  ["Millersville University", "PA", "92%", "990-1180"], ["Shippensburg University", "PA", "88%", "970-1160"],
  ["Duquesne University", "PA", "88%", "1120-1310"], ["University of Scranton", "PA", "84%", "1120-1300"],
  ["Saint Joseph's University", "PA", "89%", "1110-1300"], ["La Salle University", "PA", "94%", "1000-1200"],
  ["Widener University", "PA", "88%", "1030-1230"], ["Arcadia University", "PA", "82%", "1060-1250"],
  ["Susquehanna University", "PA", "77%", "1060-1260"], ["Juniata College", "PA", "76%", "1100-1310"],
  ["Allegheny College", "PA", "75%", "1120-1320"], ["Ursinus College", "PA", "82%", "1150-1330"],
  ["Muhlenberg College", "PA", "66%", "1120-1340"], ["Washington & Jefferson", "PA", "88%", "1090-1280"],
  ["Kean University", "NJ", "82%", "950-1140"], ["William Paterson", "NJ", "92%", "940-1120"],
  ["Stockton University", "NJ", "85%", "1040-1230"], ["Ramapo College", "NJ", "70%", "1060-1240"],
  ["Rider University", "NJ", "84%", "1010-1210"], ["Monmouth University", "NJ", "84%", "1050-1230"],
  ["Fairleigh Dickinson", "NJ", "87%", "1030-1230"], ["Drew University", "NJ", "79%", "1100-1300"],
  ["CUNY Hunter College", "NY", "48%", "1170-1350"], ["CUNY Baruch College", "NY", "50%", "1230-1390"],
  ["CUNY City College", "NY", "64%", "1040-1250"], ["CUNY Queens College", "NY", "69%", "1040-1220"],
  ["CUNY Brooklyn College", "NY", "51%", "1030-1210"], ["SUNY Geneseo", "NY", "74%", "1160-1340"],
  ["SUNY New Paltz", "NY", "58%", "1090-1270"], ["SUNY Oneonta", "NY", "73%", "1030-1210"],
  ["SUNY Oswego", "NY", "80%", "1060-1240"], ["SUNY Cortland", "NY", "60%", "1100-1250"],
  ["Adelphi University", "NY", "73%", "1080-1280"], ["Hofstra University", "NY", "68%", "1160-1340"],
  ["Pace University", "NY", "83%", "1050-1240"], ["St. John's University", "NY", "85%", "1080-1280"],
  ["New York Institute of Tech", "NY", "80%", "1060-1260"], ["Clarkson University", "NY", "78%", "1160-1350"],
  ["Hobart and William Smith", "NY", "68%", "1220-1390"], ["St. Lawrence University", "NY", "63%", "1200-1380"],


  ["Sarah Lawrence College", "NY", "50%", "Test Optional"], ["Bard College", "NY", "46%", "Test Optional"],
  ["Siena College", "NY", "80%", "1080-1260"], ["Le Moyne College", "NY", "78%", "1070-1260"],
  ["Southern CT State", "CT", "83%", "940-1120"], ["Central CT State", "CT", "77%", "980-1140"],
  ["University of Hartford", "CT", "82%", "1030-1230"], ["Sacred Heart University", "CT", "66%", "1080-1260"],
  ["Connecticut College", "CT", "40%", "1310-1450"], ["Eastern CT State", "CT", "73%", "1010-1190"],
  ["Roger Williams University", "RI", "91%", "1070-1250"], ["Salve Regina University", "RI", "76%", "1080-1260"],
  ["Johnson & Wales University", "RI", "83%", "Test Optional"], ["Rhode Island College", "RI", "88%", "910-1090"],
  ["Bridgewater State", "MA", "88%", "990-1170"], ["Salem State", "MA", "90%", "980-1160"],
  ["Westfield State", "MA", "94%", "970-1150"], ["Worcester State", "MA", "89%", "990-1160"],
  ["Suffolk University", "MA", "87%", "1030-1220"], ["Simmons University", "MA", "76%", "1130-1320"],
  ["Clark University", "MA", "48%", "1240-1420"], ["Wheaton College MA", "MA", "79%", "1170-1350"],
  ["Stonehill College", "MA", "72%", "1120-1300"], ["Endicott College", "MA", "73%", "1080-1260"],
  ["Merrimack College", "MA", "75%", "1040-1230"], ["Hampshire College", "MA", "63%", "Test Blind"],
  ["Wentworth Institute of Tech", "MA", "92%", "1060-1250"], ["Berklee College of Music", "MA", "55%", "Test Optional"],
  ["Keene State College", "NH", "91%", "980-1160"], ["Plymouth State", "NH", "98%", "970-1160"],
  ["Saint Anselm College", "NH", "82%", "1140-1320"], ["Southern NH University", "NH", "86%", "Test Optional"],
  ["University of Southern Maine", "ME", "85%", "960-1170"], ["University of New England", "ME", "90%", "1030-1230"],
  ["College of the Atlantic", "ME", "60%", "1190-1380"], ["Saint Joseph's College ME", "ME", "81%", "980-1170"],

  // WEST & PACIFIC EXPANSION
  ["Western Washington", "WA", "96%", "1110-1320"], ["Central Washington", "WA", "90%", "980-1180"],
  ["Eastern Washington", "WA", "96%", "910-1120"], ["Evergreen State College", "WA", "74%", "Test Optional"],
  ["Saint Martin's University", "WA", "95%", "1000-1190"], ["Pacific Lutheran", "WA", "88%", "1080-1280"],
  ["Portland State University", "OR", "93%", "1010-1220"], ["Southern Oregon University", "OR", "90%", "970-1170"],
  ["University of Portland", "OR", "81%", "1130-1330"], ["George Fox University", "OR", "92%", "1030-1240"],
  ["Linfield University", "OR", "90%", "1020-1220"], ["Reed College", "OR", "30%", "1320-1530"],
  ["CSU Northridge", "CA", "94%", "Test Blind"], ["CSU Sacramento", "CA", "93%", "Test Blind"],
  ["CSU Chico", "CA", "95%", "Test Blind"], ["CSU Fresno", "CA", "95%", "Test Blind"],
  ["CSU San Bernardino", "CA", "91%", "Test Blind"], ["CSU San Marcos", "CA", "93%", "Test Blind"],
  ["Sonoma State University", "CA", "94%", "Test Blind"], ["Humboldt State", "CA", "98%", "Test Blind"],
  ["CSU Monterey Bay", "CA", "96%", "Test Blind"], ["CSU East Bay", "CA", "82%", "Test Blind"],
  ["University of San Francisco", "CA", "71%", "1200-1380"], ["Saint Mary's College of CA", "CA", "70%", "1080-1290"],
  ["Azusa Pacific University", "CA", "87%", "1050-1260"], ["Biola University", "CA", "57%", "1100-1330"],
  ["Point Loma Nazarene", "CA", "82%", "1120-1310"], ["California Lutheran", "CA", "87%", "1090-1280"],
  ["Redlands University", "CA", "82%", "1080-1280"], ["Whittier College", "CA", "84%", "1030-1230"],
  ["Westmont College", "CA", "82%", "1160-1360"], ["Dominican University of CA", "CA", "89%", "1070-1260"],
  ["University of Nevada Las Vegas", "NV", "85%", "1030-1240"], ["Sierra Nevada University", "NV", "60%", "Test Optional"],
  ["New Mexico Tech", "NM", "74%", "1170-1390"], ["Eastern New Mexico", "NM", "50%", "920-1120"],
  ["Idaho State University", "ID", "Undefined%", "Test Optional"], ["College of Idaho", "ID", "46%", "1060-1270"],
  ["Montana Tech", "MT", "91%", "1080-1280"], ["Carroll College", "MT", "76%", "1110-1320"],
  ["Regis University", "CO", "81%", "1060-1260"], ["Western Colorado", "CO", "92%", "1010-1210"],
  ["Fort Lewis College", "CO", "93%", "980-1170"], ["Colorado Mesa", "CO", "80%", "960-1150"]
];



const getSmartDetails = (name: string, state: string, acceptance: string): { vibe: string, hook: string, strategy: string, majors: string[], abbreviations: string[], traits: string } => {
  // 1. Check Specific Data Lookup
  if (SPECIFIC_DATA[name]) {
    return SPECIFIC_DATA[name];
  }

  // 2. Automated Abbreviation Generation
  const abbrs: string[] = [];

  // Handlers for common patterns
  if (name.startsWith("University of California, ")) {
    const city = name.replace("University of California, ", "");
    abbrs.push(`UC ${city}`);
    abbrs.push(`UC${city}`);
  } else if (name.startsWith("California State University, ")) {
    const city = name.replace("California State University, ", "");
    abbrs.push(`CSU ${city}`);
    abbrs.push(`Cal State ${city}`);
  } else if (name.startsWith("University of ")) {
    const rest = name.replace("University of ", "");
    abbrs.push(`U of ${rest}`);
    // Heuristic: If rest is one word, try U+FirstLetter.
    if (!rest.includes(" ") && rest.length < 10) {
      abbrs.push(`U${rest.charAt(0)}`);
      abbrs.push(`U${rest}`);
    }
  }

  // Initials (e.g. "Florida State University" -> "FSU")
  const initials = name.split(' ').filter(w => w[0] === w[0].toUpperCase() && w !== 'of' && w !== 'the' && w !== 'at').map(w => w.charAt(0)).join('').toUpperCase();
  if (initials.length >= 3 && initials.length <= 5) {
    abbrs.push(initials);
  }

  // 3. Advanced Heuristics for the rest
  const accRate = parseInt(acceptance);

  // Categories
  const isTech = name.includes("Tech") || name.includes("Poly") || name.includes("Mines") || name.includes("RPI") || name.includes("WPI") || name.includes("RIT") || name.includes("MIT") || name.includes("Caltech") || name.includes("Embry");

  const isHBCU = ["Howard", "Spelman", "Morehouse", "Hampton", "Tuskegee", "Xavier University of Louisiana", "North Carolina A&T", "Florida A&M", "Morgan State", "Clark Atlanta"].some(n => name.includes(n));

  const isWomens = ["Wellesley", "Smith", "Barnard", "Bryn Mawr", "Mount Holyoke", "Scripps", "Spelman", "Agnes Scott"].some(n => name.includes(n));

  const isArt = ["Art", "Design", "RISD", "SCAD", "Berklee", "School of the Art Institute", "Pratt", "Juilliard", "Manhattan School of Music"].some(n => name.includes(n));

  const isBusiness = ["Babson", "Bentley", "Bryant", "Wharton"].some(n => name.includes(n));

  const isReligious = ["Christian", "Catholic", "Baptist", "Jesuit", "Saint", "St.", "Notre Dame", "Loyola", "Brigham", "Holy", "Franciscan", "Nazarene", "Methodist", "Lutheran", "Presbyterian"].some(n => name.includes(n));

  const isCity = ["New York", "Boston", "Northeastern", "USC", "Miami", "George Washington", "Drexel", "Temple", "Fordham", "San Francisco", "Seattle", "Chicago", "Pitt"].some(n => name.includes(n));

  const isLiberalArts = ["College", "Wesleyan", "Amherst", "Williams", "Swarthmore", "Bowdoin", "Middlebury", "Carleton", "Pomona", "Claremont", "Davidson", "Grinnell", "Oberlin", "Vassar", "Hamilton", "Colgate", "Bates", "Colby", "Smith", "Wellesley", "Bucknell", "Lafayette", "Kenyon", "Denison"].some(n => name.includes(n)) && !name.includes("State") && !name.includes("Boston");

  const isState = name.includes("University of") || name.includes("State") || name.includes("CUNY") || name.includes("SUNY");

  // Defaults
  let majors = ["Business", "Psychology", "Nursing", "Communications", "Biology"];
  let vibe = "Diverse community with broad academic options.";
  let hook = "Solid academic foundation and community involvement.";
  let strategy = "Focus on your GPA and a well-rounded extracurricular list.";

  if (isHBCU) {
    majors = ["Business", "Biology", "Psychology", "Communications", "Political Science"];
    vibe = "Rich history, supportive community, and a focus on Black excellence and leadership.";
    hook = "Leadership potential and a desire to contribute to the legacy of the institution.";
    strategy = "Discuss your heritage, leadership experiences, and how you align with the school's mission.";
  }
  else if (isWomens) {
    majors = ["Economics", "Political Science", "Biology", "English", "Psychology"];
    vibe = "Empowering environment focused on women's leadership and finding your voice.";
    hook = "Strong, independent thinkers who want to make a difference.";
    strategy = "Highlight your leadership roles and how a women-centered education will help you achieve your goals.";
  }
  else if (isArt) {
    majors = ["Graphic Design", "Illustration", "Fine Arts", "Animation", "Fashion Design"];
    vibe = "Creative, expressive, and studio-focused. Talented peers.";
    hook = "Artistic potential and a unique creative voice.";
    strategy = "Your portfolio is EVERYTHING. Grades matter less than your art.";
  }
  else if (isBusiness) {
    majors = ["Entrepreneurship", "Finance", "Marketing", "Management", "Accounting"];
    vibe = "Professional, driven, and focused on ROI. Networking starts day one.";
    hook = "Entrepreneurial spirit and business acumen.";
    strategy = "Show you have started something (a business, a club, a project). Be pragmatic.";
  }
  else if (isTech) {
    majors = ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Data Science", "Architecture"];
    vibe = "Practical, career-focused, often intense engineering culture. Hands-on learning.";
    hook = "Demonstrated aptitude in Math/Science. Maker-mindset and robots.";
    strategy = "Highlight technical projects. Show you can handle calculus-based physics. Math grades matter most.";
  }
  else if (isLiberalArts) {
    majors = ["Economics", "English", "Political Science", "Biology", "Psychology"];
    vibe = "Close-knit, discussion-based classes. Professors know your name. Writing-intensive.";
    hook = "Intellectual curiosity, writing ability, and diverse interests.";
    strategy = "Essays are critical. Show you are a thinker who contributes to class discussions. Connect with professors.";
  }
  else if (isCity) {
    majors = ["Business", "Communications", "International Relations", "Arts", "Economics"];
    vibe = "Fast-paced, urban environment. The city is your campus. Professional internships are prioritized.";
    hook = "Independence, maturity, and professional ambition.";
    strategy = "Show you are ready for the real world. Discuss how you will use the city's resources for internships.";
  }
  else if (isReligious) {
    vibe = "Community-centric, values-driven. Often strong service culture and active campus ministry.";
    hook = "Character, service, and alignment with the school's mission (faith-based or ethical).";
    strategy = "Discuss your values, community service, and ethical leadership. Resume should show volunteering.";
  }
  else if (isState) {
    if (accRate < 45) {
      vibe = "Big school energy, D1 sports, massive research resources, but large class sizes.";
      hook = "High GPA/Test scores relative to residency. Leadership in large organizations.";
      strategy = "If in-state: Stats are king. If out-of-state: Show why this specific program attracts you over your home state options.";
    } else {
      vibe = "Traditional college experience. Football, greek life, and a balance of social/academics.";
      hook = "Reliable academic performance and local community involvement.";
      strategy = "Solid essays and a GPA within range usually secure admission. Apply early.";
    }
  }

  // Refine by State/Region for flavor
  if (state === "CA" && isState) {
    vibe += " Likely commuter heavy or very impacted majors.";
    strategy += " Local area preference often applies. Check impaction criteria.";
  }
  if (state === "NY" && isState) {
    vibe += " Part of the massive SUNY system, good value.";
  }
  if (state === "FL" && isState) {
    vibe += " Bright Futures scholarship drives competition.";
    hook += " High test scores are valued even more.";
  }
  if (state === "MA" && !isState && !isTech && !isLiberalArts) {
    vibe += " Part of the Boston academic ecosystem.";
  }

  const traits = "High academic achievement, leadership, and community impact.";

  return { vibe, hook, strategy, majors, abbreviations: abbrs, traits };
};

// ==========================================
// MANUAL DEEP DIVE BATCH 1: WA / OR
// ==========================================

DB["University of Washington"] = create(
  "University of Washington", "Seattle, WA", "Public", "48%", "Hard", "3.8+ UW", "1240-1460", "$12k/$41k",
  ["Computer Science", "Informatics", "Biology", "Business", "Engineering"],
  "Rain, rigour, and cherry blossoms. A massive research powerhouse with a stunning campus. The Paul G. Allen School (CS) is world-class and separate from general admissions.",
  "In-state high achievers or OOS students with specific diverse interests. Direct to Mayor (DTC) is the only safe path for Engineering/CS.",
  "For CS/Engineering, you need near perfect stats (4.0/1500+). For others, focus on 'Why UW' and community impact. The personal statement is critical for OOS students to stand out from the massive pile.",
  ["UW", "UDub", "Washington"],
  "Admitted students are typically heavily involved in their local communities and have taken the most rigorous coursework available. For CS/Engineering, they are often competitive coders or robotics team leads. OOS admits usually exhibit a specific spike that adds diversity to the campus, such as unique environmental research or leadership in social justice. They are resilient, independent learners who can navigate a massive bureaucratic system."
);

DB["University of Oregon"] = create(
  "University of Oregon", "Eugene, OR", "Public", "86%", "Moderate", "3.6+ W", "1120-1350", "$15k/$43k",
  ["Business", "Psychology", "Journalism", "Architecture", "Environmental Studies"],
  "TrackTown USA. Nike money, school spirit, hippies meets athletes. Stunning green campus.",
  "Well-rounded students who value sustainability and community. 'Ducks' are active.",
  "Show you are more than just grades. Highlight creative endeavors or sports.",
  ["Oregon", "U of O", "Ducks"],
  "Successful applicants often balance solid academics with strong extracurricular involvement, particularly in athletics, student media, or environmental activism. The honors college looks for unique thinkers and strong writers. They value students who are 'outdoorsy' and ready to engage with the Pacific Northwest culture."
);

DB["Oregon State University"] = create(
  "Oregon State University", "Corvallis, OR", "Public", "83%", "Moderate", "3.6+ W", "1100-1340", "$13k/$35k",
  ["Engineering", "Forestry", "Oceanography", "Computer Science"],
  "Friendly, research-focused, land/sea/space grant university. Robots and trees.",
  "Makers and doers. Engineering and science focused students who are down to earth.",
  "Talk about projects. If you built a robot or mapped a forest, tell them.",
  ["OSU", "Oregon State", "Beavers"],
  "Admitted students love to build and explore. The engineering cohort is strong in robotics and systems. Applicants often have hands-on experience in 4-H, FIRST Robotics, or outdoor leadership. They are practical problem solvers rather than abstract theorists."
);

DB["Washington State University"] = create(
  "Washington State University", "Pullman, WA", "Public", "83%", "Moderate", "3.4+ W", "1020-1240", "$12k/$28k",
  ["Veterinary Medicine", "Nursing", "Communication", "Agriculture"],
  "College town isolation, massive school spirit, 'Cougs help Cougs'.",
  "Community-first mindset. Students who want a true campus family experience.",
  "Focus on resilience and community service.",
  ["WSU", "Wazzu", "Washington State"],
  "Cougs are community builders. Admitted students often have consistent long-term involvement in a few clubs rather than a laundry list of activities. There is a strong pipeline for students interested in health sciences and agriculture who have practical experience (shadowing, FFA, etc.)."
);

DB["Gonzaga University"] = create(
  "Gonzaga University", "Spokane, WA", "Private", "76%", "Moderate", "3.7+ W", "1200-1380", "$53,500",
  ["Business", "Nursing", "Engineering", "Political Science"],
  "Jesuit, basketball powerhouse, tight-knit community, service-oriented.",
  "Ethical leaders who want to use their degree for the common good.",
  "Connect your goals to Jesuit values (service, reflection, leadership).",
  ["Gonzaga", "Zags"],
  "Applicants who get in are often captains of their sports teams or leads in service organizations. They highlight 'Cura Personalis' (care for the whole person) in their essays. A consistent record of volunteering, particularly with marginalized communities, is a common trait among the admitted class."
);

DB["Seattle University"] = create(
  "Seattle University", "Seattle, WA", "Private", "85%", "Moderate", "3.6+ W", "1140-1330", "$52,215",
  ["Nursing", "Business", "Computer Science", "Criminal Justice"],
  "Urban, Jesuit, social justice focused, tech-adjacent.",
  "Students who want to be in the city but want a moral framework for their education.",
  "Focus on social impact and why you want to be in Seattle specifically.",
  ["Seattle U", "SU"],
  "Admitted students are deeply engaged with social causes. They often have experience in debate, student government, or activism. They are looking for an education that combines practical career skills (due to Amazon/Microsoft proximity) with ethical reasoning."
);

DB["Lewis & Clark College"] = create(
  "Lewis & Clark College", "Portland, OR", "Private", "68%", "Moderate", "3.9+ W", "1230-1410", "$61,626",
  ["International Affairs", "Environmental Studies", "Psychology", "Biology"],
  "Beautiful wooded campus, global focus, adventurous, liberal/progressive.",
  "Global citizens and environmental stewards. High study abroad participation.",
  "Highlight international interests or environmental projects.",
  ["Lewis & Clark", "L&C"],
  "The typical admit is intellectually curious and socially progressive. They often have experience with Model UN, environmental advocacy, or language learning. They value the small class sizes and close professor relationships, often referencing specific professors in their 'Why Us' essays."
);

DB["Willamette University"] = create(
  "Willamette University", "Salem, OR", "Private", "80%", "Moderate", "3.8+ W", "1130-1340", "$57,300",
  ["Politics", "Economics", "Civic Communication", "Data Science"],
  "Across the street from the State Capitol. Civic engagement central.",
  "Future policy makers and civic leaders. Practical idealists.",
  "Discuss your interest in government, law, or data-driven change.",
  ["Willamette"],
  "Admitted students are often 'news junkies' or involved in student government. They take advantage of the proximity to the state capitol for internships. Resume often includes debate, mock trial, or journalism excellence."
);

DB["Whitman College"] = create(
  "Whitman College", "Walla Walla, WA", "Private", "48%", "Hard", "3.9+ W", "1300-1470", "$61,462",
  ["Biology", "Environmental Studies", "Psychology", "Politics"],
  "Intellectual oasis in rural wheat fields. Collaborative, friendly, outdoorsy.",
  "Unpretentious intellectuals who love both books and hiking.",
  "Show you can create your own fun. Intellectual vitality is key.",
  ["Whitman"],
  "Whitman students are 'nice' but incredibly smart. Admitted applicants often demonstrate a love for the outdoors (hiking, climbing) alongside rigorous academics (IB/AP). They are community builders who don't need a big city to be entertained. Essays often feature deep personal reflection."
);

DB["University of Puget Sound"] = create(
  "University of Puget Sound", "Tacoma, WA", "Private", "88%", "Moderate", "3.5+ W", "1140-1340", "$59,680",
  ["Business", "Psychology", "Music", "Biology"],
  "Pacific Northwest vibe, liberal arts, approachable, music-heavy.",
  "Creative thinkers who are open to new ideas. Strong music/arts programs.",
  "Highlight artistic or musical talents even if not majoring in them.",
  ["Puget Sound", "UPS"],
  "Admitted students are often 'multi-hyphenates'—the biologist who plays cello, or the business major who writes poetry. They value a supportive, non-competitive environment. Demonstrated interest (visiting, interviewing) plays a significant role in admission."
);

// ==========================================
// MANUAL DEEP DIVE BATCH 2: UC SYSTEM
// ==========================================

DB["University of California, San Diego"] = create(
  "UC San Diego", "La Jolla, CA", "Public", "24%", "Hard", "4.0+ UW", "Test Blind", "$14k/$44k",
  ["Biology", "Computer Science", "Engineering", "Economics", "Cognitive Science"],
  "Sun, surf, and serious science. The college system (Revelle, Muir, etc.) defines social life. Intense research focus.",
  "Innovators who fit the specific 'college' philosophy they rank highly. STEM heavy.",
  "Rank your colleges carefully based on GE requirements. Essays should focus on innovation.",
  ["UCSD", "Tritons"],
  "UCSD admits are often serious students who prioritize academics and research over traditional 'college life' (Greek life is smaller here). They align well with the university's separation into six residential colleges, each with its own philosophy. Applicants often have strong STEM spikes, particularly in biology or engineering, and demonstrate a readiness for a rigorous, quarter-system pace."
);

DB["University of California, Santa Barbara"] = create(
  "UC Santa Barbara", "Santa Barbara, CA", "Public", "26%", "Hard", "4.0+ UW", "Test Blind", "$14k/$44k",
  ["Physics", "Economics", "Environmental Science", "Communication", "Biology"],
  "Beachfront campus, happiest students in CA, Nobel laureate faculty. Work hard, play hard.",
  "Collaborative intellectuals who are social. Strong environmental and physics focus.",
  "Show you are balanced. High stats alone aren't enough; personality matters.",
  ["UCSB", "Gauchos"],
  "Gauchos are balanced. The typical admit has stellar grades but also a vibrant social life or deep community involvement. They are often 'happy warriors'—students who take difficult classes (like CCS Physics) but do so with a collaborative spirit. Environmental stewardship and outdoor leadership are common themes in successful applications."
);

DB["University of California, Irvine"] = create(
  "UC Irvine", "Irvine, CA", "Public", "21%", "Hard", "4.0+ UW", "Test Blind", "$14k/$44k",
  ["Biology", "Computer Science", "Psychology", "Business Information Management"],
  "Safe, master-planned perfection, massive Esports culture, strong pre-med.",
  "Gamers, biologists, and serious students. Slightly quieter social scene.",
  "Highlight unique hobbies (like Esports) or serious academic dedication.",
  ["UCI", "Anteaters"],
  "UCI loves students who are 'nerdy' in a good way. It is a hub for Esports and computer game science. Admitted students often have very high GPAs and are looking for a safe, structured environment to excel in. Pre-meds are common, so clinical volunteering or research is a major plus for biology applicants."
);

DB["University of California, Davis"] = create(
  "UC Davis", "Davis, CA", "Public", "37%", "Hard", "3.9+ UW", "Test Blind", "$14k/$44k",
  ["Animal Science", "Agriculture", "Psychology", "Biology", "Engineering"],
  "Bicycles, cows, and kindness. A massive friendly campus with elite agricultural/vet programs.",
  "Down-to-earth high achievers. Future vets and farmers, but also engineers.",
  "Show a lack of pretension. Community service and sustainability are huge.",
  ["UC Davis", "Aggies"],
  "Aggies are nice. That is the defining trait. Admitted students are community-oriented, often with backgrounds in 4-H, sustainability, or animal care. They are high achievers who prefer a collaborative, college-town atmosphere over the intensity of a big city. Engineering and Ag-Science admits have very high stats."
);

DB["University of California, Santa Cruz"] = create(
  "UC Santa Cruz", "Santa Cruz, CA", "Public", "47%", "Moderate", "3.8+ UW", "Test Blind", "$14k/$44k",
  ["Computer Science", "Psychology", "Biology", "Environmental Studies"],
  "Redwoods, misty mornings, counter-culture roots, residential colleges.",
  "Socially progressive, nature-loving intellectuals. 'Keep Santa Cruz Weird'.",
  "Highlight unconventional thinking and social activism.",
  ["UCSC", "Banana Slugs"],
  "The Banana Slug is a proud badge of non-conformity. Admitted students are often passionate about social justice, environmentalism, or game design. They value the residential college system which provides a small liberal arts feel within a research university. Applicants who show a 'spike' in creativity or activism do well here."
);

DB["University of California, Riverside"] = create(
  "UC Riverside", "Riverside, CA", "Public", "69%", "Moderate", "3.6+ UW", "Test Blind", "$14k/$44k",
  ["Business", "Biology", "Psychology", "Computer Science"],
  "Social mobility engine. Diverse, gritty, rising quickly in rankings.",
  "Resilient students, often first-gen, who are hungry for opportunity.",
  "Focus on your journey and resilience. Upward trend in grades is respected.",
  ["UCR", "Highlanders"],
  "UCR values resilience and distance traveled. Many admitted students are first-generation college students or come from underrepresented backgrounds. They look for students who have engaged with their community and shown an upward trajectory in their academics. It is a research powerhouse, so mentioning research interest is a plus."
);

DB["University of California, Merced"] = create(
  "UC Merced", "Merced, CA", "Public", "89%", "Moderate", "3.5+ UW", "Test Blind", "$14k/$44k",
  ["Biology", "Psychology", "Management", "Computer Science. "],
  "The newest UC. Research-focused, intimate, growing, in the Central Valley.",
  "Pioneers. Students who want to build traditions rather than follow them.",
  "Show a pioneering spirit and willingness to help build a community.",
  ["UC Merced", "Bobcats"],
  "Bobcats are builders. As the newest UC, admitted students are those who are excited to start clubs, lead organizations, and define the campus culture. There is a strong emphasis on sustainability and access to education. Students who demonstrate leadership potential and a 'start-up' mindset fit in well."
);

// ==========================================
// MANUAL DEEP DIVE BATCH 3: CA PRIVATES & CSUS
// ==========================================

DB["San Diego State University"] = create(
  "San Diego State University", "San Diego, CA", "Public", "34%", "Moderate", "3.7+ W", "Test Blind", "$8k/$20k",
  ["Business", "Psychology", "Kinesiology", "Computer Science", "Nursing"],
  "Beautiful Spanish-style campus, spirited, party scene but increasingly rigorous academics. A flagship CSU.",
  "Well-rounded students who want the big college experience without the UC research intensity.",
  "Focus on high GPA and A-G compliance. Nursing is extremely competitive.",
  ["SDSU", "Aztecs"],
  "Aztecs are spirited and social. Admitted students often have strong leadership in high school (ASB, team captains) and valid GPAs. The nursing and business programs are highly selective, looking for students with specific experience in those fields. They value diversity and students who contribute to the vibrant campus life."
);

DB["California Polytechnic State University-San Luis Obispo"] = create(
  "Cal Poly SLO", "San Luis Obispo, CA", "Public", "30%", "Hard", "4.0+ W", "Test Blind", "$11k/$30k",
  ["Engineering", "Architecture", "Business", "Agriculture"],
  "'Learn by Doing'. Happiest town in America. Practical skills focus from Day 1.",
  "Pragmatic problem solvers. If you like hands-on work, this is the place.",
  "MCA Score is everything. Take the hardest math/science classes you can.",
  ["Cal Poly", "SLO", "Mustangs"],
  "Cal Poly admits are 'doers'. They are often the students who built the sets for the school play or rebuilt a car engine. The 'Learn by Doing' philosophy attracts students who are ready to work. Admissions are stats-heavy (MCA score), so admitted students usually have maxed out the rigor of their high school curriculum, especially in math."
);

DB["Loyola Marymount University"] = create(
  "LMU", "Los Angeles, CA", "Private", "41%", "Moderate", "3.8+ W", "1250-1420", "$59,000",
  ["Film", "Marketing", "Psychology", "Biochemistry"],
  "Beautiful bluff-top campus overlooking LA. Jesuit values, creative, film-industry connections.",
  "Creative students with a conscience. Service oriented but career focused.",
  "Highlight service and creative portfolios. 'Why LMU' must be specific.",
  ["LMU", "Lions"],
  "LMU lions are service-oriented creatives. The typical admit balances a strong interest in media/arts/business with a commitment to social justice (the Jesuit mission). They are often involved in campus ministry or volunteering while also pursuing internships in the LA entertainment industry."
);

DB["University of San Diego"] = create(
  "University of San Diego", "San Diego, CA", "Private", "50%", "Moderate", "3.8+ W", "1200-1400", "$56,000",
  ["Business", "Finance", "Communication", "Nursing"],
  "The 'Catholic UCLA'. Stunning campus, wealthy, conservative-leaning but changing.",
  "Ashoka Changemaker campus. Students who want to do good + do business.",
  "Focus on ethics and leadership in your essays.",
  ["USD", "Toreros"],
  "Toreros are often polished and polite leaders. Admitted students frequently come from private or Catholic school backgrounds (though not required). They value the small class sizes and personal attention. Business and Nursing applicants are particularly strong academically and professionally driven."
);

DB["Pepperdine University"] = create(
  "Pepperdine University", "Malibu, CA", "Private", "40%", "Hard", "3.7+ UW", "1260-1450", "$63,000",
  ["Business", "Psychology", "Sports Medicine", "Political Science"],
  "Malibu beach views, Christian values, dry campus, rigorous academics.",
  "Faith-based or values-driven students. Community is tight.",
  "Address the spiritual/ethical mission in your application.",
  ["Pepperdine", "Waves"],
  "Pepperdine admits often have a strong spiritual foundation or a deep respect for the university's Christian mission. They are 'sun-kissed scholars'—students who love the beach lifestyle but take their morals and academics seriously. Leadership in youth groups or service trips is a very common trait."
);

DB["Santa Clara University"] = create(
  "Santa Clara University", "Santa Clara, CA", "Private", "50%", "Moderate", "3.7+ UW", "1300-1480", "$59,000",
  ["Business", "Computer Science", "Engineering", "Psychology"],
  "Silicon Valley's Jesuit University. Intense career connections to Tech.",
  "Career-focused but ethical. They want to make money and do good.",
  "Highlight tech/business interests and ethical reasoning.",
  ["Santa Clara", "Broncos"],
  "Broncos are career-ready. Located in the heart of Silicon Valley, admitted students are often laser-focused on internships and networking. They are professionally polished and articulate. Many have started their own small businesses or led coding clubs. The Jesuit value of 'competence, conscience, and compassion' resonates strongly with them."
);

DB["University of San Francisco"] = create(
  "University of San Francisco", "San Francisco, CA", "Private", "70%", "Moderate", "3.6+ W", "1140-1330", "$58,000",
  ["Nursing", "Business", "Computer Science", "Psychology"],
  "In the heart of SF. Social justice, nursing excellence, diverse.",
  "City-lovers who want to engage with urban issues.",
  "Show you are ready for city life and have a passion for equity.",
  ["USF", "Dons"],
  "USF Dons are engaged citizens. They don't just want a campus; they want the city. Admitted students often have a track record of volunteering in urban environments or working with diverse populations. They are independent and resilient, ready to navigate the complexities of San Francisco while pursuing their degree."
);

DB["Chapman University"] = create(
  "Chapman University", "Orange, CA", "Private", "55%", "Moderate", "3.8+ W", "1170-1360", "$62,400",
  ["Film Production", "Business", "Psychology", "Dance"],
  "Dodge Film School is elite. Disney-adjacent, sunny, friendly.",
  "Creative storytellers and business minds. Collaborative spirit.",
  "For Film, portfolio is King. For others, show personality.",
  ["Chapman", "Panthers"],
  "Chapman admits are storytellers. Whether in the film school or the business school, they are communicative and charismatic. There is a strong sense of community and collaboration. Students who are 'connectors'—who bring people together—thrive here. The vibe is friendly, sunny, and optimistic."
);

// ==========================================
// MANUAL DEEP DIVE BATCH 4: PUBLIC GIANTS
// ==========================================

DB["University of Florida"] = create(
  "University of Florida", "Gainesville, FL", "Public", "23%", "Hard", "4.0+ W", "1350-1490", "$6k/$28k",
  ["Engineering", "Business", "Biology", "Health Science"],
  "The Gator Nation is real. Top 5 public university dominance with massive SEC sports culture. Swampy, intense, and fun.",
  "High-achieving Floridians and elite OOS students. Academically rigorous but socially vibrant.",
  "Grades and rigor are king. Essays are used for borderline cases. Innovation Academy is a backdoor.",
  ["UF", "Florida", "Gators"],
  "UF admits are 'academic athletes'. They often have near-perfect GPAs and high test scores (Bright Futures competition is fierce). Admitted students are spirited, ambitious, and ready to engage in a massive university system. They balance difficult STEM coursework with Greek life or club sports. For OOS students, the bar is Ivy-adjacent."
);

DB["University of Wisconsin Madison"] = create(
  "UW Madison", "Madison, WI", "Public", "49%", "Moderate", "3.8+ W", "1340-1510", "$10k/$39k",
  ["Economics", "Computer Science", "Biology", "Psychology"],
  "The ultimate college town. Party school meets Ivy education. Frozen lakes, cheese curds, intensity.",
  "Work-hard-play-hard students. Resilient against the cold. Community focused.",
  "Demonstrate you can handle the cold and the rigor. Be genuine.",
  ["UW Madison", "Wisconsin", "Badgers", "Wisca"],
  "Badgers are resilient. Admitted students embrace the 'work hard, play hard' ethos. They are intellectually serious (Madison is a research giant) but socially active. The ability to balance a rigorous academic load with a vibrant social life is key. They values community, friendliness, and school spirit."
);

DB["University of Illinois Urbana-Champaign"] = create(
  "UIUC", "Champaign, IL", "Public", "45%", "Moderate", "3.8+ W", "1350-1530", "$16k/$33k",
  ["Computer Science", "Electrical Engineering", "Accounting", "Psychology"],
  "Cornfields, massive Greek life, WORLD CLASS Engineering/CS. A tale of two schools (Grainger vs AAS).",
  "Technical wizards and social butterflies. Innovation hub.",
  "Apply to the specific major. Grainger Engineering is a completely different tier (Hard/Very Hard).",
  ["UIUC", "Illinois", "U of I"],
  "UIUC is a dichotomous campus. For CS/Engineering admits, they are elite technical minds—students who have won hackathons or built complex systems. For other majors, invites go to well-rounded, spirited students. The defining trait is 'innovation'; UIUC students love to build things, start companies, and solve problems."
);

DB["Purdue University"] = create(
  "Purdue University", "West Lafayette, IN", "Public", "50%", "Moderate", "3.7+ W", "1210-1450", "$10k/$28k",
  ["Engineering", "Computer Science", "Aviation", "Nursing"],
  "Astronauts, engineering focus, grit, massive flat campus. 'Cradle of Astronauts'.",
  "Gritty, practical problem solvers. Engineering First Year is the gatekeeper.",
  "Show grit and problem solving. Math proficiency is non-negotiable.",
  ["Purdue"],
  "Purdue admits are humble and hardworking. They are the 'grit' capital of the Big Ten. Admitted students often have strong backgrounds in hands-on building or farming (literally or metaphorically). They are less concerned with prestige and more concerned with 'does it work?'. Strong math scores are essential for the STEM admits."
);

DB["University of Maryland College Park"] = create(
  "UMD", "College Park, MD", "Public", "44%", "Moderate", "4.0+ W", "1370-1510", "$11k/$38k",
  ["Computer Science", "Engineering", "Biological Sciences", "Criminology"],
  "Tech powerhouse near DC. Diverse, suburban-urban mix. Massive CS program.",
  "Diverse, research-oriented, career-focused. Living-Learning programs define the experience.",
  "Living-Learning programs are key (Honors, Scholars). Apply early via EA.",
  ["UMD", "Maryland", "Terps"],
  "Maryland admits are ambitious and diverse. They take advantage of the proximity to DC for internships. The Computer Science and Engineering admits are top-tier. Admitted students often show a readiness to engage in 'Living-Learning Communities', signaling they want a smaller community within the large university."
);

DB["Rutgers New Brunswick"] = create(
  "Rutgers", "New Brunswick, NJ", "Public", "66%", "Moderate", "3.7+ W", "1270-1480", "$16k/$33k",
  ["Computer Science", "Psychology", "Engineering", "Pharmacy"],
  "The State University of NJ. Diverse, massive, research active, buses between 5 campuses.",
  "Resilient, diverse, practical, research-ready. 'Jersey Grit'.",
  "Honors college is the reach goal. Apply to the right school (SAS vs Engineering).",
  ["Rutgers", "RU"],
  "Rutgers students have grit. Navigating the 5 campuses requires independence. Admitted students are incredibly diverse and down-to-earth. They are research-ready (Rutgers is a research juggernaut) and often possess a practical, career-oriented mindset. If you want a hand-holding experience, this isn't it."
);

DB["Penn State University"] = create(
  "Penn State", "University Park, PA", "Public", "55%", "Moderate", "3.6+ W", "1200-1400", "$19k/$36k",
  ["Business", "Engineering", "Information Sciences", "Nursing"],
  "Football cult, massive alumni network, 'Happy Valley', spirited. We Are!",
  "Spirited community members, loyal, active, team players. THON is life.",
  "Schreyer Honors College is the target for top students. Apply EA.",
  ["PSU", "Penn State"],
  "Penn State is a family. Admitted students are 'joiners'—they want to be part of something bigger than themselves (like THON, the massive charity dance marathon). They are loyal, spirited, and collaborative. Academic bars vary by major, but the Honors College admits are elite scholars who want the resources of a big school."
);

DB["Ohio State University"] = create(
  "Ohio State University", "Columbus, OH", "Public", "53%", "Moderate", "3.8+ W", "1340-1480", "$12k/$35k",
  ["Finance", "Biology", "Psychology", "Marketing"],
  "The --> Ohio State. Massive resources, football, land-grant mission. A city within a city.",
  "Community-leaders, spirited, diverse interests. 'Buckeyes help Buckeyes'.",
  "Apply EA. Essays should focus on community and diversity.",
  ["OSU", "Ohio State", "Buckeyes"],
  "Ohio State admits are community builders. It is one of the largest universities in the country, so admissions looks for students who can make a big place feel small. They value leadership, diversity of thought, and school spirit. Admitted students are often well-rounded, balancing solid academics with passion projects."
);

// ==========================================
// MANUAL DEEP DIVE BATCH 5: ELITE LIBERAL ARTS
// ==========================================

DB["Williams College"] = create(
  "Williams College", "Williamstown, MA", "Private", "10%", "Very Hard", "4.0 UW", "1470-1560", "$61,460",
  ["Economics", "Math", "English", "Biology"],
  "The Purple Valley. Intense, intimate, tutorial system (Oxford style). Beautiful isolation.",
  "Intellectuals who can hold a conversation. Varsity athletes. Independent thinkers.",
  "Show you are ready for the tutorial system. Intellectual vitality is paramount.",
  ["Williams"],
  "Williams students are intellectually fearless. The famous 'tutorial' system means you can't hide in the back of the class. Admitted students are articulate, collaborative, and often athletic (varsity sports focus is high). They value the close-knit community and the intense professor-student relationships."
);

DB["Amherst College"] = create(
  "Amherst College", "Amherst, MA", "Private", "9%", "Very Hard", "4.0 UW", "1450-1560", "$63,500",
  ["Economics", "Math", "English", "Psychology"],
  "Open curriculum, singing groups, intense writing, Five College Consortium.",
  "Intellectually adventurous, strong writers, diverse thinkers. No barriers to learning.",
  "Essays are critical. Focus on how you use your freedom. 'Intellectual curiosity'.",
  ["Amherst"],
  "Amherst admits are self-directed explorers. With the open curriculum, there are no requirements, so admissions looks for students who will build a coherent yet adventurous path. They are often incredible writers and deep thinkers. Diversity is a major priority, and the community is known for robust intellectual debate."
);

DB["Swarthmore College"] = create(
  "Swarthmore College", "Swarthmore, PA", "Private", "8%", "Very Hard", "4.0 UW", "1470-1560", "$61,992",
  ["Economics", "Biology", "Political Science", "Engineering"],
  "Quaker roots, intense workload, social justice, 'misery loves company' (affectionate).",
  "Intense intellectuals, social justice advocates, humble. 'Intellectuals with a conscience'.",
  "Show you love to learn for learning's sake. No grade obsession allowed.",
  ["Swarthmore", "Swat"],
  "Swatties are intense. They handle a workload that rivals MIT. Admitted students are often deeply concerned with ethical issues and social justice (Quaker tradition). They are humble about their intelligence but ferociously dedicated to their studies. If you want a chill college experience, this is not it."
);

DB["Pomona College"] = create(
  "Pomona College", "Claremont, CA", "Private", "7%", "Very Hard", "4.0 UW", "1470-1550", "$62,000",
  ["Economics", "Computer Science", "Math", "Neuroscience"],
  "West coast Ivy, Claremont consortium, sunny, relaxed intelligence. The best of both worlds.",
  "Collaborative, sunny intellectuals, community-builders. 'Sagehens'.",
  "Focus on community impact and the consortium benefits. Show you are a good roommate.",
  ["Pomona"],
  "Pomona admits are the kids who broke the curve but were nice about it. They value the 'sunny side' of rigor. Being part of the Consortium, successful applicants often explain how they will engage with the other colleges. They are diverse, open-minded, and love the close professor interaction (often dining at professors' homes)."
);

DB["Wellesley College"] = create(
  "Wellesley College", "Wellesley, MA", "Private", "16%", "Hard", "4.0 UW", "1450-1550", "$61,584",
  ["Economics", "Political Science", "Psychology", "Computer Science"],
  "The most powerful women's network. Hillary Clinton's alma mater. Beautiful campus.",
  "Empowered leaders, articulate, supportive, ambitious. 'Women who will'.",
  "Why Wellesley: Focus on the women's college environment benefits.",
  ["Wellesley"],
  "Wellesley women are leaders. Admitted students often have a track record of advocacy and ambition. They specifically choose a women's college for the empowerment and network. They are articulate and poised. Cross-registration with MIT is a common draw for STEM students."
);

DB["Bowdoin College"] = create(
  "Bowdoin College", "Brunswick, ME", "Private", "9%", "Very Hard", "3.9+ UW", "Test Blind", "$61,528",
  ["Government", "Economics", "Math", "Environmental Studies"],
  "The Common Good, amazing food, cold but incredibly friendly. Nature lovers.",
  "Kind, community-oriented, outdoorsy, intellectual. 'The Common Good' is real.",
  "The 'Common Good' approach is key. Show how you help others.",
  ["Bowdoin"],
  "Bowdoin students are famously friendly. Admitted students often have a love for the outdoors (Maine is beautiful but cold) and a deep commitment to the 'Common Good'. It was one of the first test-optional schools, focusing heavily on character and personal qualities. If you are elitist, you won't fit the 'polar bear' vibe."
);

DB["Middlebury College"] = create(
  "Middlebury College", "Middlebury, VT", "Private", "15%", "Hard", "3.9+ UW", "1400-1530", "$62,660",
  ["Economics", "Political Science", "Environmental Studies", "International Studies"],
  "Languages, skiing, environmentalism, rural VT beauty. Global focus.",
  "Global citizens, language lovers, environmental stewards. Outdoorsy.",
  "Demonstrate a love for the outdoors or global awareness. Language schools are elite.",
  ["Middlebury", "Midd"],
  "Midd kids are global. Known for its language schools, admitted students often speak multiple languages or have deep international interests. Environmentalism became a major here (Climate Change activism roots). They are active, outdoorsy students who handle the rural isolation by building a tight community."
);

DB["Claremont McKenna College"] = create(
  "Claremont McKenna College", "Claremont, CA", "Private", "11%", "Very Hard", "3.9+ UW", "1440-1530", "$60,500",
  ["Economics", "Government", "Psychology", "International Relations"],
  "Leadership, economics/govt focus, pragmatic, sunny. The 'Business' liberal arts.",
  "Pragmatic leaders, ambitious, politically engaged. 'Leaders in the Making'.",
  "Show leadership in action. Not just theory, but doing.",
  ["CMC", "Claremont McKenna"],
  "CMC is for doers. It is often called the 'boot camp for leaders'. Admitted students are pragmatic, ambitious, and often interested in business, law, or policy. They value the Athenaeum (nightly speaker series) and the focus on real-world application of the liberal arts. They are generally more pre-professional than their Pomona peers."
);

DB["Carleton College"] = create(
  "Carleton College", "Northfield, MN", "Private", "18%", "Hard", "3.9+ UW", "1420-1540", "$62,600",
  ["Computer Science", "Biology", "Economics", "International Relations"],
  "Minnesota nice, quirky, trimester system, frisbee culture. Intellectual powerhouse.",
  "Quirky, unpretentious, intellectually curious, nice. 'Carls'.",
  "Be quirky and honest. They love genuine personalities.",
  ["Carleton"],
  "Carleton is arguably the nicest top-tier college. Admitted students ('Carls') are intellectually curious but utterly unpretentious. The vibe is 'playful intellect'. They love Ultimate Frisbee and quirky traditions. Because of the location (Northfield, MN), students must really want the specific Carleton community vibe."
);

DB["Davidson College"] = create(
  "Davidson College", "Davidson, NC", "Private", "17%", "Hard", "3.9+ UW", "1370-1510", "$57,300",
  ["Biology", "Political Science", "Economics", "Psychology"],
  "Honor code, Southern hospitality, Steph Curry, rigorous. 'The Southern Dartmouth'.",
  "Honorable, service-oriented, athletic scholars, community pillars.",
  "The Honor Code is huge. Mention it. Peer recommendation helps.",
  ["Davidson"],
  "Davidson is built on trust. The Honor Code means take-home tests and unproctored exams. Admitted students have impeccable character references. It is rigorous and athletic (D1 sports). Students are friendly, mannered, and deeply hardworking. Community service is a massive part of the culture interact."
);

// ==========================================
// MANUAL DEEP DIVE BATCH 4: PUBLIC GIANTS (Midwest/East)
// ==========================================

DB["University of Florida"] = create(
  "University of Florida", "Gainesville, FL", "Public", "23%", "Hard", "4.0+ W", "1350-1490", "$6k/$28k",
  ["Engineering", "Business", "Biology", "Health Science"],
  "The Gator Nation is real. Top 5 public university dominance with massive SEC sports culture. Swampy, intense, and fun.",
  "High-achieving Floridians and elite OOS students. Academically rigorous but socially vibrant.",
  "Grades and rigor are king. Essays are used for borderline cases. Innovation Academy is a backdoor.",
  ["UF", "Florida", "Gators"],
  "UF admits are 'academic athletes'. They often have near-perfect GPAs and high test scores (Bright Futures competition is fierce). Admitted students are spirited, ambitious, and ready to engage in a massive university system. They balance difficult STEM coursework with Greek life or club sports. For OOS students, the bar is Ivy-adjacent."
);

DB["University of Wisconsin Madison"] = create(
  "UW Madison", "Madison, WI", "Public", "49%", "Moderate", "3.8+ W", "1340-1510", "$10k/$39k",
  ["Economics", "Computer Science", "Biology", "Psychology"],
  "The ultimate college town. Party school meets Ivy education. Frozen lakes, cheese curds, intensity.",
  "Work-hard-play-hard students. Resilient against the cold. Community focused.",
  "Demonstrate you can handle the cold and the rigor. Be genuine.",
  ["UW Madison", "Wisconsin", "Badgers", "Wisca"],
  "Badgers are resilient. Admitted students embrace the 'work hard, play hard' ethos. They are intellectually serious (Madison is a research giant) but socially active. The ability to balance a rigorous academic load with a vibrant social life is key. They values community, friendliness, and school spirit."
);

DB["University of Illinois Urbana-Champaign"] = create(
  "UIUC", "Champaign, IL", "Public", "45%", "Moderate", "3.8+ W", "1350-1530", "$16k/$33k",
  ["Computer Science", "Electrical Engineering", "Accounting", "Psychology"],
  "Cornfields, massive Greek life, WORLD CLASS Engineering/CS. A tale of two schools (Grainger vs AAS).",
  "Technical wizards and social butterflies. Innovation hub.",
  "Apply to the specific major. Grainger Engineering is a completely different tier (Hard/Very Hard).",
  ["UIUC", "Illinois", "U of I"],
  "UIUC is a dichotomous campus. For CS/Engineering admits, they are elite technical minds—students who have won hackathons or built complex systems. For other majors, invites go to well-rounded, spirited students. The defining trait is 'innovation'; UIUC students love to build things, start companies, and solve problems."
);

DB["Purdue University"] = create(
  "Purdue University", "West Lafayette, IN", "Public", "50%", "Moderate", "3.7+ W", "1210-1450", "$10k/$28k",
  ["Engineering", "Computer Science", "Aviation", "Nursing"],
  "Astronauts, engineering focus, grit, massive flat campus. 'Cradle of Astronauts'.",
  "Gritty, practical problem solvers. Engineering First Year is the gatekeeper.",
  "Show grit and problem solving. Math proficiency is non-negotiable.",
  ["Purdue"],
  "Purdue admits are humble and hardworking. They are the 'grit' capital of the Big Ten. Admitted students often have strong backgrounds in hands-on building or farming (literally or metaphorically). They are less concerned with prestige and more concerned with 'does it work?'. Strong math scores are essential for the STEM admits."
);

DB["University of Maryland College Park"] = create(
  "UMD", "College Park, MD", "Public", "44%", "Moderate", "4.0+ W", "1370-1510", "$11k/$38k",
  ["Computer Science", "Engineering", "Biological Sciences", "Criminology"],
  "Tech powerhouse near DC. Diverse, suburban-urban mix. Massive CS program.",
  "Diverse, research-oriented, career-focused. Living-Learning programs define the experience.",
  "Living-Learning programs are key (Honors, Scholars). Apply early via EA.",
  ["UMD", "Maryland", "Terps"],
  "Maryland admits are ambitious and diverse. They take advantage of the proximity to DC for internships. The Computer Science and Engineering admits are top-tier. Admitted students often show a readiness to engage in 'Living-Learning Communities', signaling they want a smaller community within the large university."
);

DB["Rutgers New Brunswick"] = create(
  "Rutgers", "New Brunswick, NJ", "Public", "66%", "Moderate", "3.7+ W", "1270-1480", "$16k/$33k",
  ["Computer Science", "Psychology", "Engineering", "Pharmacy"],
  "The State University of NJ. Diverse, massive, research active, buses between 5 campuses.",
  "Resilient, diverse, practical, research-ready. 'Jersey Grit'.",
  "Honors college is the reach goal. Apply to the right school (SAS vs Engineering).",
  ["Rutgers", "RU"],
  "Rutgers students have grit. Navigating the 5 campuses requires independence. Admitted students are incredibly diverse and down-to-earth. They are research-ready (Rutgers is a research juggernaut) and often possess a practical, career-oriented mindset. If you want a hand-holding experience, this isn't it."
);

DB["Penn State University"] = create(
  "Penn State", "University Park, PA", "Public", "55%", "Moderate", "3.6+ W", "1200-1400", "$19k/$36k",
  ["Business", "Engineering", "Information Sciences", "Nursing"],
  "Football cult, massive alumni network, 'Happy Valley', spirited. We Are!",
  "Spirited community members, loyal, active, team players. THON is life.",
  "Schreyer Honors College is the target for top students. Apply EA.",
  ["PSU", "Penn State"],
  "Penn State is a family. Admitted students are 'joiners'—they want to be part of something bigger than themselves (like THON, the massive charity dance marathon). They are loyal, spirited, and collaborative. Academic bars vary by major, but the Honors College admits are elite scholars who want the resources of a big school."
);

DB["Ohio State University"] = create(
  "Ohio State University", "Columbus, OH", "Public", "53%", "Moderate", "3.8+ W", "1340-1480", "$12k/$35k",
  ["Finance", "Biology", "Psychology", "Marketing"],
  "The --> Ohio State. Massive resources, football, land-grant mission. A city within a city.",
  "Community-leaders, spirited, diverse interests. 'Buckeyes help Buckeyes'.",
  "Apply EA. Essays should focus on community and diversity.",
  ["OSU", "Ohio State", "Buckeyes"],
  "Ohio State admits are community builders. It is one of the largest universities in the country, so admissions looks for students who can make a big place feel small. They value leadership, diversity of thought, and school spirit. Admitted students are often well-rounded, balancing solid academics with passion projects."
);

DB["Occidental College"] = create(
  "Occidental College", "Los Angeles, CA", "Private", "38%", "Hard", "3.7+ W", "1250-1450", "$60,500",
  ["Diplomacy", "Economics", "Biology", "Politics"],
  "Obama's first college. Urban liberal arts in LA. Diverse, progressive, intellectual.",
  "Socially conscious intellectuals who want the city resource.",
  "Highlight global awareness and community engagement.",
  ["Oxy", "Occidental"],
  "Oxy students are engaged global citizens. They are the 'activist-scholars' who might intern at a non-profit in Downtown LA in the morning and attend a seminar on political theory in the afternoon. Admitted students value diversity and are often deeply involved in social causes. It is intellectually rigorous but collaborative."
);

DB["Pitzer College"] = create(
  "Pitzer College", "Claremont, CA", "Private", "18%", "Hard", "3.9+ W", "Test Blind", "$60,000",
  ["Environmental Analysis", "Sociology", "Psychology", "Media Studies"],
  "Social justice warrior HQ. One of the Claremonts. 'Provocative' essays.",
  "Activists, environmentalists, and independent thinkers. 'Participant' education.",
  "The supplemental essay is crucial. Be radical and honest.",
  ["Pitzer"],
  "Pitzer admits are not afraid to be different. They are deeply committed to the college's core values of social responsibility and environmental sustainability. Admitted students often have a history of grassroots organizing or unconventional leadership. They are the students who started the recycling program or led the protest."
);

DB["Scripps College"] = create(
  "Scripps College", "Claremont, CA", "Private", "28%", "Hard", "4.0+ W", "1330-1500", "$60,000",
  ["Biology", "Politics", "Psychology", "English"],
  "Top women's college in the West. Beautiful campus, rigorous academics, Claremont consortium.",
  "Empowered leaders, interdisciplinary thinkers. Confident and articulate.",
  "You must answer 'Why a women's college?'.",
  ["Scripps"],
  "Scripps students are confident and articulate. The typical admit is a high achiever who values a supportive, empowering environment. They take full advantage of the Claremont Consortium (taking classes at Pomona/CMC) but are proud of their Scripps identity. Leadership in female-empowerment organizations is a common trait."
);

DB["Harvey Mudd College"] = create(
  "Harvey Mudd College", "Claremont, CA", "Private", "13%", "Very Hard", "4.0 UW", "1490-1570", "$62,500",
  ["Engineering", "Computer Science", "Physics", "Math"],
  "Liberal arts for STEM geniuses. Highest paid graduates. Intense workload.",
  "Collaborative geniuses. Must love the humanities too (HSA requirement).",
  "Show you are a 'whole person' scientist. Not just a robot.",
  ["Harvey Mudd", "HMC", "Mudd"],
  "Mudders are brilliant and collaborative. Admissions looks for students who can survive the intense core curriculum but who are also 'fun'. A dry list of math awards is not enough; they want to see personality, humor, and a genuine interest in the humanities. Collaboration is their core value—'loners' do not fit well here."
);

DB["California State University, Long Beach"] = create(
  "Cal State Long Beach", "Long Beach, CA", "Public", "40%", "Moderate", "3.6+ W", "Test Blind", "$7k/$19k",
  ["Nursing", "Business", "Art", "Psychology", "Film"],
  "The 'Beach'. Diverse, popular, strong arts and nursing. Commuter heavy but vibrant.",
  "Students looking for value and solid career prep in a beach city.",
  "Local preference is real. High stats needed for Nursing/Arts.",
  ["CSULB", "Long Beach State", "The Beach"],
  "CSULB is a destination campus. Admitted students are diverse, coming from all walks of life. The arts and nursing cohorts are particularly talented and competitive. Typical admits are practical and career-focused, often balancing school with work or family responsibilities. They value the inclusivity and the beach vibe."
);

DB["San Jose State University"] = create(
  "San Jose State University", "San Jose, CA", "Public", "75%", "Moderate", "3.5+ W", "Test Blind", "$8k/$20k",
  ["Computer Science", "Engineering", "Animation", "Business"],
  "Feeder for Silicon Valley. Massive engineering/CS output. Practical.",
  "Career-focused techies and artists. Animation program is elite.",
  "Impaction Score is key. Calculate your eligibility index.",
  ["SJSU", "San Jose State"],
  "SJSU is the engine of Silicon Valley. Admitted students in CS and Engineering often have stats that would get them into UCs. They are pragmatic—choosing SJSU for the direct job pipeline into Google/Apple. The Animation/Illustration program is also world-class, attracting incredibly talented artists who have industry-quality portfolios."
);

DB["California State Polytechnic University, Pomona"] = create(
  "Cal Poly Pomona", "Pomona, CA", "Public", "55%", "Moderate", "3.6+ W", "Test Blind", "$7k/$19k",
  ["Engineering", "Architecture", "Computer Science", "Agriculture"],
  "Learn by doing (Wait, the other one?). Massive engineering program, animals, hands-on.",
  "Makers and builders. Less selective than SLO but excellent value.",
  "Focus on your major. Engineering is impacted and harder to get into.",
  ["Cal Poly Pomona", "CPP"],
  "CPP students get their hands dirty. Admitted students are often those who dismantled their toaster to see how it worked. It is a massive engineering school, so admits in those majors have strong math backgrounds. They value the practical, no-nonsense approach to education and the beautiful, sprawling campus."
);

// ==========================================
// MANUAL DEEP DIVE BATCH 6: MOUNTAIN WEST & SOUTHWEST
// ==========================================

DB["University of Arizona"] = create(
  "University of Arizona", "Tucson, AZ", "Public", "87%", "Moderate", "3.4+", "1110-1360", "$13k/$37k",
  ["Business", "Psychology", "Nursing", "Optical Sciences", "Space Sciences"],
  "Bear Down! Massive research uni with incredible space/optics programs. Hot, spirited, diverse.",
  "Spirited students who want big resources. Honors college is the target for high achievers.",
  "Essays are optional but recommended for scholarships/Honors.",
  ["U of A", "Arizona", "Wildcats"],
  "Arizona Wildcats are spirited and resilient. The university is a global leader in space exploration and optics, attracting students who are serious about research. The Honors College admits are competitive and look for 'inquiry'—students who ask big questions. The social scene is vibrant, so fit with a large, active community is key."
);

DB["Arizona State University"] = create(
  "Arizona State University", "Tempe, AZ", "Public", "88%", "Moderate", "3.4+ (Assured Admit)", "1120-1360", "$11k/$30k",
  ["Business", "Engineering", "Innovation", "Psychology"],
  "#1 in Innovation. Massive, sprawling, inclusive. Barrett Honors College is the 'Gold Standard'.",
  "Innovators and entrepreneurs. Students who want to build things.",
  "Barrett Honors College requires a separate, rigorous application. Do it.",
  ["ASU", "Sun Devils"],
  "ASU prides itself on who it includes, not who it excludes. Admitted students are entrepreneurial and ready to take advantage of the massive scale. However, Barrett, The Honors College, is incredibly selective and looks for distinct leadership and intellectual engagement. It's a 'Public Ivy' experience within the larger university."
);

DB["University of Colorado Boulder"] = create(
  "CU Boulder", "Boulder, CO", "Public", "79%", "Moderate", "3.6+ W", "1180-1380", "$13k/$40k",
  ["Aerospace Engineering", "Business", "Physics", "Environmental Studies"],
  "The most beautiful campus in America? Skiing, hiking, and elite Aerospace. 'Public Ivy' feel.",
  "Outdoorsy intellectuals. Engineers who hike. Environmentalists.",
  "Engineering is competitive. Highlight your love for the outdoors/sustainability.",
  ["CU Boulder", "Colorado", "Buffs"],
  "Buffs are active. Admitted students often list hiking, skiing, or climbing as primary extracurriculars. But don't be fooled—the Aerospace and Physics departments are world-class. Successful applicants balance a chill, laid-back demeanor with serious academic ambition, particularly in STEM and environmental fields."
);

DB["Colorado School of Mines"] = create(
  "Colorado School of Mines", "Golden, CO", "Public", "55%", "Hard", "3.9+ W", "1340-1510", "$19k/$40k",
  ["Mechanical Engineering", "Computer Science", "Chemical Engineering", "Geophysics"],
  "Nerd heaven in the mountains. 100% STEM. Intense, collaborative, high ROI.",
  "Problem solvers who love math and rocks. 'Orediggers'.",
  "Math/Science grades are everything. Show you can handle the rigor.",
  ["Mines"],
  "Mines students work harder than almost anyone else. Admitted students are 'STEM-only' types—they love calculus and physics. The vibe is intensely collaborative because everyone is in the trenches together. They value grit, practical problem solving, and often, a love for the mountains that surround the campus."
);

DB["University of Denver"] = create(
  "University of Denver", "Denver, CO", "Private", "64%", "Moderate", "3.7+ W", "1210-1410", "$56,000",
  ["Business", "International Studies", "Psychology", "Biology"],
  "Private university dedicated to the public good. Beautiful campus near the city and mountains.",
  "Balanced students who want city access + mountain weekends. 4D Experience.",
  "Focus on holistic development and study abroad (massive participation).",
  ["DU", "Pioneers"],
  "DU students are explorers. With the unique quarter system and huge study abroad participation, admits are adaptable and global-minded. They value the small class sizes of a private school but heavily utilize the city of Denver for internships. Business and International Relations are standout programs."
);

DB["Colorado College"] = create(
  "Colorado College", "Colorado Springs, CO", "Private", "14%", "Very Hard", "3.9+ UW", "Test Blind", "$64,000",
  ["Environmental Science", "Economics", "Political Science", "Biology"],
  "The Block Plan: One class at a time for 3.5 weeks. Intense focus. Outdoorsy.",
  "Intellectual sprinters. Students who dive deep into one thing.",
  "Why Block Plan? You MUST answer this. It's not for everyone.",
  ["Colorado College", "CC"],
  "CC admits are intense focusers. The Block Plan dictates life here. Successful applicants articulate exactly why studying one subject at a time works for their brain. They are often incredibly active outdoors (Rockies are next door) and adventurous. If you are a multitasker, this might be a nightmare; for CC kids, it's paradise."
);

DB["University of Utah"] = create(
  "University of Utah", "Salt Lake City, UT", "Public", "89%", "Moderate", "3.5+ W", "1160-1380", "$9k/$30k",
  ["Business", "Computer Science", "Engineering", "Game Design"],
  "The 'U'. Massive research funding, beautiful backdrop, elite Game Design program.",
  "Entrepreneurs and gamers. Outdoorsy city-dwellers.",
  "Mention specific programs like EAE (Games) or Lassonde Studios (Simulation).",
  ["Utah", "The U", "Utes"],
  "Utah admits are surprisingly innovative. The Lassonde Entrepreneur Institute attracts students who want to live in a maker-space dorm. Gamers flock here for the top-ranked EAE program. They are distinct from their BYU neighbors—more secular, more urban, and focused on research and innovation."
);

DB["Brigham Young University"] = create(
  "Brigham Young University", "Provo, UT", "Private", "66%", "Moderate", "3.8+ W", "1290-1490", "$6,000",
  ["Accounting", "Business", "Engineering", "Education"],
  "LDS flagship. Incredibly low tuition, high rigor, strict Honor Code.",
  "Values-driven scholars. Most students serve missions. Language skills are high.",
  "Ecclesiasical Endorsement is required. Honor Code commitment is strict.",
  ["BYU", "Cougars"],
  "BYU is unique. Almost all admits are members of the LDS church and agree to a strict honor code (no alcohol, coffee, etc.). They are incredibly disciplined, often older (due to missions), and multilingual. The Accounting and Business programs are elite. They value service, integrity, and family."
);

DB["University of New Mexico"] = create(
  "University of New Mexico", "Albuquerque, NM", "Public", "96%", "Safety", "3.3+", "Test Blind", "$8k/$24k",
  ["Engineering", "Business", "Biology", "Nursing"],
  "Flagship of NM. Adobe campus, high research activity, diverse student body.",
  "Students looking for value and diversity. 'Lobos'.",
  "Scholarships are plentiful for high stats (Amigo Scholarship for OOS).",
  ["UNM", "New Mexico", "Lobos"],
  "UNM admits are community-reflective. As a Hispanic-Serving Institution, it values diversity and inclusion. Students often engage in research early (Sandia Labs is nearby). The vibe is laid-back but prideful of New Mexican culture. It is a massive value proposition for OOS students who get the Amigo scholarship."
);

DB["University of Hawaii at Manoa"] = create(
  "University of Hawaii at Manoa", "Honolulu, HI", "Public", "73%", "Moderate", "3.5+", "1080-1280", "$12k/$34k",
  ["Marine Biology", "Business", "Asian Studies", "Travel Industry Management"],
  "Paradise with textbooks. Top Marine Bio and Earth Science. diverse.",
  "Ocean lovers, diverse students, those seeking 'Aloha Spirit'.",
  "Respect the culture. Don't just treat it like a 4-year vacation.",
  ["UH Manoa", "Hawaii", "Rainbow Warriors"],
  "UH Manoa students respect the land ('Aina). Obviously, Marine Biology and Oceanography admits are in heaven here. The student body is incredibly diverse, with strong Asian and Pacific Islander representation. Successful admits from the mainland show maturity and a genuine interest in the unique cultural and biological landscape, not just surfing."
);

// Misc West/Southwest added by user
DB["California State University, Fullerton"] = create(
  "Cal State Fullerton", "Fullerton, CA", "Public", "53%", "Moderate", "3.6+ W", "Test Blind", "$7k/$19k",
  ["Business", "Communications", "Animation", "Psychology"],
  "The commuter giant with elite Animation and Business. Disneyland neighbor.",
  "Career-focused creatives and business minds.",
  "Animation is portfolio based and competitive.",
  ["CSUF", "Titans"],
  "CSUF is a massive engine of opportunity. Admits to the Business school are practical and networking-focused. The hidden gem is the Animation/Illustration program, which feeds directly into Disney/Pixar and requires a stellar portfolio. For most, it's a practical, no-nonsense path to a degree."
);

DB["University of the Pacific"] = create(
  "University of the Pacific", "Stockton, CA", "Private", "79%", "Moderate", "3.5+ W", "1130-1360", "$53,000",
  ["Pre-Dentistry", "Pharmacy", "Engineering", "Business"],
  "Accelerated programs (2+3 Pharmacy, 3+3 Law). Oldest chartered uni in CA.",
  "Pre-health professionals in a hurry. Focused and driven.",
  "Highlight interest in their accelerated professional programs.",
  ["UOP", "Pacific"],
  "UOP admits are often on the fast track. The university is famous for its accelerated dental and pharmacy programs, attracting students who know exactly what they want to do and want to finish early. They are focused, professional, and career-oriented, valuing the small class sizes and direct access to professional schools."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 7: ILLINOIS & CHICAGO
// ==========================================

DB["University of Illinois Chicago"] = create(
  "UIC", "Chicago, IL", "Public", "79%", "Moderate", "3.4+ W", "1030-1260", "$14k/$28k",
  ["Nursing", "Business", "Psychology", "Computer Science"],
  "Urban, diverse, commuter-heavy but growing. Massive medical district connections.",
  "City students who value diversity and hustle. Pre-health focus.",
  "Great option for pre-med/nursing due to the massive medical center.",
  ["UIC", "Flames"],
  "UIC is Chicago's public research university. Admits are incredibly diverse and often gritty city-dwellers. The connection to the Illinois Medical District makes it a goldmine for pre-health students who want direct shadowing and research experience. It's a place for students who want to be in the real world, not a bubble."
);

DB["DePaul University"] = create(
  "DePaul University", "Chicago, IL", "Private", "70%", "Moderate", "3.6+ W", "1080-1300", "$43,000",
  ["Business", "Film", "Computer Science", "Accounting"],
  "Largest Catholic uni in the US. Two campuses (Loop & Lincoln Park). Career focus.",
  "Service-minded urbanites. Film and Theater scene is huge.",
  "Demonstrate interest in the city and service (Vincentian values).",
  ["DePaul", "Blue Demons"],
  "DePaul students capitalize on the city. Whether taking classes in the Loop (business/tech) or Lincoln Park (arts/liberal arts), admits are career-focused and practical. The Film and Theater programs are standouts, using Cinespace studios. They value the Vincentian mission of service to the poor and marginalized."
);

DB["Loyola University Chicago"] = create(
  "Loyola Chicago", "Chicago, IL", "Private", "79%", "Moderate", "3.7+ W", "1130-1320", "$50,000",
  ["Nursing", "Business", "Biology", "Psychology"],
  "Stunning lakeside campus. Jesuit values. Pre-med powerhouse.",
  "Service-oriented leaders + serious pre-health students.",
  "Highlight service and ethics. 'Ramblers' care about the world.",
  ["Loyola", "LUC", "Ramblers"],
  "Loyola admits are often 'people for others'. The Jesuit identity is strong, attracting students committed to social justice. It is also a massive pre-health engine; admission to the Nursing program is competitive. Students love the dual-nature of the campus (quiet Rogers Park vs. downtown Water Tower)."
);

DB["Illinois State University"] = create(
  "Illinois State University", "Normal, IL", "Public", "86%", "Safety", "3.3+", "1020-1220", "$15k/$26k",
  ["Education", "Business", "Nursing", "Agriculture"],
  "The original teaching college of IL. Friendly, massive quad, insurance hub.",
  "Future teachers and business leaders. Down to earth.",
  "Education program is one of the largest in the US.",
  ["ISU", "Redbirds"],
  "ISU is the heart of teacher education in Illinois. Admits are friendly, community-oriented, and often aspire to be educators or business professionals (State Farm HQ is next door). The vibe is quintessentially 'college'—big quad, big spirit, and a supportive, non-cutthroat academic environment."
);

DB["Bradley University"] = create(
  "Bradley University", "Peoria, IL", "Private", "75%", "Moderate", "3.6+ W", "1080-1280", "$39,000",
  ["Game Design", "Engineering", "Nursing", "Business"],
  "Mid-size private with big-time resources. Game Design is world-class.",
  "Makers and healers. Students who want personal attention.",
  "Game design portfolio is key for that major.",
  ["Bradley", "Braves"],
  "Bradley is a hidden gem for Game Design (ranked top 15 globally). Admits for that program are creative techies. For others, Bradley offers a personalized, engineering-heavy education in a smaller setting. Students are practical and close-knit, valuing the mentorship from professors over massive lecture halls."
);

DB["Wheaton College (IL)"] = create(
  "Wheaton College", "Wheaton, IL", "Private", "88%", "Moderate", "3.7+ W", "1220-1440", "$43,000",
  ["Biblical Studies", "Biology", "English", "Music"],
  "The 'Harvard of Evangelical schools'. Serious academics, serious faith.",
  "Deeply faithful scholars. C.S. Lewis lovers. Community covenant.",
  "Faith statement is required. Only apply if you align with the mission.",
  ["Wheaton"],
  "Wheaton is intellectually and spiritually rigorous. Admits must sign a Community Covenant. They are often deeply well-read, articulate, and committed to their Christian faith. The vibe is intense but supportive—students debate theology over lunch. It is a niche, but elite within that niche."
);

DB["Knox College"] = create(
  "Knox College", "Galesburg, IL", "Private", "73%", "Moderate", "3.5+ W", "1160-1380", "$54,000",
  ["Creative Writing", "Psychology", "Economics", "Biology"],
  "Abraham Lincoln debated here. Historic, intellectual, quirky, progressive.",
  "Independent thinkers who want to change the world. Creative writing hub.",
  "Show your quirks and intellectual vitality. 'Freedom to Flourish'.",
  ["Knox"],
  "Knox students are 'prairie intellectuals'. The college has a rich history of abolitionism and social progress. Admits are often creative writers (program is famous) or social activists. They value the close community and the 'Freedom to Flourish' ethos, which encourages self-designed research and exploration."
);

DB["Lake Forest College"] = create(
  "Lake Forest College", "Lake Forest, IL", "Private", "60%", "Moderate", "3.6+ W", "1180-1360", "$54,000",
  ["Business", "Finance", "Biology", "Politics"],
  "Career-focused liberal arts. Chicago is the classroom. Preppy but diverse.",
  "Networkers. Students who want the liberal arts skills + a job.",
  "Focus on the 'Career Pathways' program in your essays.",
  ["Lake Forest", "Foresters"],
  "Lake Forest is a career accelerator. Located in an affluent suburb but connected to Chicago, admits are laser-focused on internships. The 'Career Pathways' model defines the experience. Students are polished, ambitious, and take advantage of the insane alumni network in Chicago finance and business."
);

DB["Augustana College"] = create(
  "Augustana College", "Rock Island, IL", "Private", "66%", "Moderate", "3.6+ W", "Test Blind", "$48,000",
  ["Biology", "Business", "Accounting", "Speech Pathology"],
  "Viking roots along the Mississippi. Augie Choice grants ($2k) for everyone.",
  "Friendly, active, curious. 50% study abroad.",
  "Mention Augie Choice and what you'd use it for.",
  ["Augustana", "Augie", "Vikings"],
  "Augustana students are 'doers'. The 'Augie Choice' guarantees funding for study abroad or internships, so admits are those who plan to use it. The vibe is friendly and Midwestern-nice. Strong in pre-health and accounting, students are hardworking but collaborative, often heavily involved in music and athletics."
);

// ==========================================
// MANUAL DEEP DIVE BATCH 8: UPPER MIDWEST (WI/MN)
// ==========================================

DB["Marquette University"] = create(
  "Marquette University", "Milwaukee, WI", "Private", "86%", "Moderate", "3.6+ W", "1160-1340", "$48,000",
  ["Biomedical Sciences", "Nursing", "Business", "Communication"],
  "Jesuit excellence in the city. Basketball crazy, service oriented, friendly.",
  "Faith-inspired leaders. 'Be The Difference'. Dedicated.",
  "Service and leadership are key. Serious sports culture.",
  ["Marquette", "Golden Eagles"],
  "Marquette students are spirited and service-driven. Located in downtown Milwaukee, the campus feels urban but contained. Admits strongly identify with the Jesuit mission of 'being the difference'. The Biomedical Sciences program is elite and feeds many into medical/dental school. Students are friendly, collaborative, and loud at basketball games."
);

DB["University of Wisconsin-Milwaukee"] = create(
  "UW Milwaukee", "Milwaukee, WI", "Public", "95%", "Safety", "3.0+", "Test Blind", "$9k/$21k",
  ["Business", "Film", "Architecture", "Engineering"],
  "Urban research university. Diverse, commuter-friendly, near Lake Michigan.",
  "Resilient city students. Arts and Architecture focus.",
  "Great value for city access. Film program is top-tier.",
  ["UWM", "Milwaukee"],
  "UWM is diverse and gritty. It's a top-tier research university that serves a massive variety of students. Admits to the Peck School of the Arts (Film) are creative and talented. For others, it's a practical, career-focused environment. Students often work while in school and value the flexibility and urban connections."
);

DB["Lawrence University"] = create(
  "Lawrence University", "Appleton, WI", "Private", "72%", "Moderate", "3.6+ W", "1210-1440", "$56,000",
  ["Music Performance", "Physics", "Biology", "English"],
  "Conservatory meets Liberal Arts. Intense, musical, intellectual.",
  "Musician-scholars. Creativity is the currency here.",
  "Highlight dual interests (e.g., Physics + Cello).",
  ["Lawrence", "LU"],
  "Lawrence is for the multi-talented. It has a world-class music conservatory embedded in a liberal arts college. Admits are often 'double-threats'—scientists who play jazz, or writers who sing opera. The vibe is collaborative and creative. If you are intellectually curious and appreciate the arts, you will fit right in."
);

DB["Beloit College"] = create(
  "Beloit College", "Beloit, WI", "Private", "67%", "Moderate", "3.4+ W", "Test Blind", "$58,000",
  ["Anthropology", "Creative Writing", "Economics", "Geology"],
  "Historic, quirky, future-focused. 'Beloit College Mindset List'.",
  "Adaptable, pragmatic creatives. 'Beloiters'.",
  "Focus on how you apply knowledge. Career Channels program is big.",
  ["Beloit"],
  "Beloiters are adaptable. The college prides itself on connecting liberal arts to careers (Career Channels). Admitted students are often pragmatic intellectuals—they love learning but also want a job. Anthropology and Geology are surprisingly strong here. The campus is historic (Indian mounds on campus) and the community is tight-knit."
);

DB["University of Minnesota Twin Cities"] = create(
  "UMN Twin Cities", "Minneapolis, MN", "Public", "75%", "Moderate", "3.7+ W", "1310-1490", "$15k/$33k",
  ["Engineering", "Business", "Psychology", "Biological Sciences"],
  "Massive urban research giant. Tunnels (Gopher Way) connect buildings. Big Ten spirit.",
  "Resilient high achievers. Research focused. 'Ski-U-Mah'.",
  "Apply to the specific college. CSE (Engineering) and CBS (Bio) are very hard.",
  ["UMN", "Minnesota", "Gophers"],
  "UMN is a massive engine of research. Admits to the College of Science and Engineering (CSE) are elite, often with Ivy-level stats. Students are resilient (winters are brutal) and independent. They take advantage of the 'Twin Cities' for internships at Fortune 500s (Target, 3M). Diverse, spirited, and academically serious."
);

DB["University of St. Thomas"] = create(
  "University of St. Thomas", "St. Paul, MN", "Private", "77%", "Moderate", "3.6+ W", "1180-1360", "$52,000",
  ["Business", "Engineering", "Journalism", "Education"],
  "Catholic, career-focused, clean, polite. Largest private in MN.",
  "Ethical business leaders. 'Tommies'.",
  "Focus on ethics and career goals. 'Common Good'.",
  ["St. Thomas", "Tommies"],
  "St. Thomas is the premier private university in Minnesota. Admits are often polished, career-oriented, and polite. The Business school is the crown jewel. 'Tommies' value the network and the ethical framework of the education. It feels more like a pre-professional hub than a quirky liberal arts college."
);

DB["Macalester College"] = create(
  "Macalester College", "St. Paul, MN", "Private", "28%", "Hard", "3.9+ W", "1350-1510", "$64,000",
  ["International Studies", "Economics", "Political Science", "Geography"],
  "Global citizenship in the city. UN flag flies here. Scottish roots (Bagpipes).",
  "Globalists, activists, nice intellectuals. Civic engaged.",
  "Demonstrate international interest or civic engagement.",
  ["Macalester", "Mac"],
  "Macalester students are global citizens. Located in a city (unlike Carleton/St. Olaf), admits engage deeply with the urban environment. They are politically active, diverse, and often have lived abroad or speak multiple languages. The vibe is 'intellectual activism'. Bagpipes usage is non-negotiable."
);

DB["St. Olaf College"] = create(
  "St. Olaf College", "Northfield, MN", "Private", "56%", "Moderate", "3.7+ W", "1250-1430", "$58,000",
  ["Music", "Biology", "Mathematics", "English"],
  "Norwegian roots, intensely musical, beautiful limestone campus (The Hill).",
  "Musicians, mathematicians, nice people. 'Um! Yah! Yah!'.",
  "Music portfolio is huge here. Visit the campus.",
  ["St. Olaf", "Oles"],
  "Oles are nice. Like, really nice. St. Olaf is world-famous for its choir and band, so a huge chunk of admits are musicians (even if majoring in Math). The community is incredibly tight. Admission looks for students who value community, faith (ELCA Lutheran roots, though open), and rigorous academics without the cutthroat competition."
);

DB["Gustavus Adolphus College"] = create(
  "Gustavus Adolphus College", "St. Peter, MN", "Private", "73%", "Moderate", "3.6+ W", "Test Blind", "$53,000",
  ["Psychology", "Business", "Biology", "Education"],
  "Swedish roots, stunning views, friendly, Nobel Conference hosts.",
  "Community-builders, curious, balanced. 'Gusties'.",
  "Show fit with the tight community. Nobel scholarship interest.",
  ["Gustavus", "Gusties"],
  "Gusties shine. The college hosts the Nobel Conference every year, reflecting a deep respect for science and peacemaking. Admits are often well-rounded students who play sports, sing in choirs, and do research. The campus is warm and inviting (despite the weather). It's a place for students who want to be known by everyone."
);

// ==========================================
// MANUAL DEEP DIVE BATCH 9: EASTERN MIDWEST (MI, OH, IN)
// ==========================================

DB["Michigan State University"] = create(
  "Michigan State University", "East Lansing, MI", "Public", "88%", "Moderate", "3.4-3.9 W", "1100-1320", "$16k/$41k",
  ["Business", "Communication", "Packaging", "Veterinary Medicine"],
  "Massive, friendly, spirited. A world-class land grant university. 'Spartans Will'.",
  "Friendly, ambitious, diverse. Strongest alumni network in MI outside of UMich.",
  "Essays are crucial for scholarships/Honors College.",
  ["MSU", "Spartans", "State"],
  "Spartans are friendly and tenacious. The campus is huge, but students find their niche quickly. Admitted students often have a 'get it done' attitude. The Honors College is a major draw for high-performing students who want the resources of a big school with smaller class sizes. Packaging and Supply Chain majors are world-elite."
);

DB["Wayne State University"] = create(
  "Wayne State University", "Detroit, MI", "Public", "75%", "Moderate", "3.3+", "1010-1230", "$14k/$30k",
  ["Nursing", "Business", "Engineering", "Social Work"],
  "In the heart of Detroit. Research powerhouse, diverse, career-connected.",
  "Gritty, driven, urban. Students who hustle.",
  "Highlight connection to Detroit's revitalization.",
  ["Wayne State", "WSU"],
  "Wayne State is the heartbeat of Detroit. Admits are often gritty, hard-working students who value the city's resurgence. It is a research heavyweight, particularly in health sciences. The student body is one of the most diverse in the Midwest. Commuters and residents alike engage deeply with the city."
);

DB["Grand Valley State University"] = create(
  "Grand Valley State University", "Allendale, MI", "Public", "90%", "Safety", "3.4+", "1050-1240", "$13k/$19k",
  ["Business", "Education", "Health Professions", "Engineering"],
  "Modern, fast-growing, student-focused. Big school resources, small school feel.",
  "Pragmatic, friendly, WEST Michigan nice.",
  "Great value. Show leadership.",
  ["GVSU", "Lakers"],
  "GVSU has exploded in popularity because it focuses on undergraduates. Admits are often students who want a modern campus and professors (not TAs) teaching their classes. The Seidman College of Business is a strong draw. Students are friendly, practical, and often stay in West Michigan after graduation."
);

DB["Western Michigan University"] = create(
  "Western Michigan University", "Kalamazoo, MI", "Public", "85%", "Moderate", "3.3+", "1000-1200", "$13k/$16k",
  ["Aviation", "Psychology", "Sales", "Jazz Studies"],
  "Kalamazoo Promise vibes. Top-tier Aviation program. Friendly and fun.",
  "Pilots, musicians, and future sales leaders. Diverse interests.",
  "Aviation program requires specific stats/medical checks.",
  ["WMU", "Broncos"],
  "WMU is famous for its Aviation College—one of the best in the world. Admits to that program are disciplined and focused. For others, WMU offers a classic college experience with some unique spikes like a top-ranked Sales program and Jazz Studies. The vibe is laid-back but prideful."
);

DB["Case Western Reserve University"] = create(
  "Case Western Reserve", "Cleveland, OH", "Private", "27%", "Hard", "4.0+ W", "1350-1520", "$61,000",
  ["Biomedical Engineering", "Nursing", "Computer Science", "Biology"],
  "Serious research, serious students. In the heart of Cleveland's culture hub.",
  "Intellectuals, researchers, future doctors. 'Work hard' culture.",
  "Demonstrate interest! They care if you visit/interview.",
  ["CWRU", "Case"],
  "CWRU admits are intense. They are future doctors, researchers, and engineers who want to be in the lab from day one. The connection to the Cleveland Clinic is a massive draw. Successful applicants often have significant research experience in high school. The vibe is 'nerdy chic'—students bond over difficult coursework."
);

DB["Oberlin College"] = create(
  "Oberlin College", "Oberlin, OH", "Private", "34%", "Hard", "3.9+ W", "1340-1530", "$61,000",
  ["Music", "Biology", "English", "Politics"],
  "Progressive capital of the Midwest. Conservatory + College. Historic.",
  "Social justice warriors, virtuoso musicians, independent thinkers.",
  "Show your activism or artistic passion. 'Think one person can change the world?'.",
  ["Oberlin"],
  "Oberlin is intensely progressive. Admits are often activists, artists, and intellectuals who care deeply about checking their privilege and changing the world. The interactions between the Conservatory musicians and the College students create a unique, creative atmosphere. If you want a traditional frat culture, look elsewhere."
);

DB["Kenyon College"] = create(
  "Kenyon College", "Gambier, OH", "Private", "34%", "Hard", "3.9+ W", "1310-1500", "$66,000",
  ["English", "Economics", "Drama", "Political Science"],
  "Writers' paradise. Gothic architecture, 'Lords and Ladies', rural beauty.",
  "Writers, poets, deep thinkers. Literary and friendly.",
  "Your essay matters more here than anywhere else. Write beautifully.",
  ["Kenyon"],
  "Kenyon is for writers. Whether majoring in English or Physics, admits are expected to be articulate and thoughtful. The 'Writers Workshop' culture permeates the campus. Students are friendly, slightly quirky, and love the rural isolation of Gambier. They value deep connection and long conversations."
);

DB["Miami University (Ohio)"] = create(
  "Miami University", "Oxford, OH", "Public", "88%", "Moderate", "3.6+ W", "1160-1370", "$16k/$36k",
  ["Business", "Marketing", "Psychology", "Biology"],
  "The 'Public Ivy' original. Preppy, gorgeous campus, intense Greek life.",
  "Polished, ambitious, social students. Future business leaders.",
  "Farmer School of Business is competitive. Apply EA.",
  ["Miami OH", "Miami"],
  "Miami is arguably the most beautiful campus in the public university system. Admits are often polished, preppy, and socially active. The Farmer School of Business attracts top talent who might settle for Ivy rejects. Greek life is huge. Students are 'work hard, play hard' and value tradition and appearance."
);

DB["University of Cincinnati"] = create(
  "University of Cincinnati", "Cincinnati, OH", "Public", "86%", "Moderate", "3.6+ W", "1120-1350", "$12k/$27k",
  ["Architecture", "Design", "Musical Theatre", "Nursing"],
  "Co-op inventors. Urban, hilly, modern. DAAP program is world-elite.",
  "Creatives and pragmatists. Co-op focused.",
  "DAAP (Design/Arch) is extremely competitive. Portfolio is key.",
  ["Cincinnati", "Cincy", "Bearcats"],
  "Cincinnati invented the Co-op model. Admits are career-ready because they expect to work professional terms during college. The DAAP (Design, Architecture, Art, Planning) college is legendary; admits there are elite creatives. The campus has transformed into a modern, architectural showpiece."
);

DB["Denison University"] = create(
  "Denison University", "Granville, OH", "Private", "22%", "Hard", "3.8+ W", "Test Blind", "$60,000",
  ["Economics", "Biology", "Global Commerce", "Data Analytics"],
  "Hilltop campus, wealthy, career-focused liberal arts. Rising star.",
  "Ambitious, friendly, polished. Career centric.",
  "Show you are a leader. Interview matters.",
  ["Denison"],
  "Denison is on a meteoric rise. It is a liberal arts college that acts like a pre-professional school, with massive investment in career centers and data analytics. Admits are friendly, often athletic, and ambitious. They want the small school feel but with big-city career outcomes."
);

DB["College of Wooster"] = create(
  "College of Wooster", "Wooster, OH", "Private", "56%", "Moderate", "3.6+ W", "1150-1380", "$57,000",
  ["Biology", "Psychology", "History", "Chemistry"],
  "Independent Study (I.S.) for everyone. Mentored research. Hidden gem.",
  "Curious, unpretentious researchers. 'Scots'.",
  "Research interest is key. Everyone does a thesis.",
  ["Wooster", "Fighting Scots"],
  "Wooster is defined by 'I.S.' (Independent Study). Every student works one-on-one with a faculty mentor on a major senior project. Admits are students who are curious and want to create knowledge, not just consume it. The diversity is surprisingly high for a collaborative, unpretentious Ohio school."
);

DB["Indiana University Bloomington"] = create(
  "Indiana University", "Bloomington, IN", "Public", "82%", "Moderate", "3.6+ W", "1160-1380", "$11k/$38k",
  ["Business", "Music", "Informatics", "Psychology"],
  "Kelley School of Business is elite. Jacobs School of Music is elite. Classic campus.",
  "Business sharks, virtuoso musicians, and spirited Hoosiers.",
  "Direct admit to Kelley is the goal (high stats).",
  ["IU", "Indiana", "Hoosiers"],
  "IU is a powerhouse of specific schools. Kelley (Business) and Jacobs (Music) admits are world-class and often turn down Ivies. For the general student body, it's a classic, spirited, beautiful Big Ten experience. Admits are social, ambitious, and proud of the 'Cream and Crimson'."
);

DB["Rose-Hulman Institute of Technology"] = create(
  "Rose-Hulman", "Terre Haute, IN", "Private", "73%", "Hard", "3.9+ W", "1310-1510", "$52,000",
  ["Mechanical Engineering", "Computer Science", "Biomedical Engineering", "Electrical Engineering"],
  "#1 Undergraduate Engineering school. Small, intense, supportive, geeky.",
  "Engineers who want to build, not just research. Collaborative.",
  "Show your projects. 'Why Rose' matters.",
  ["Rose-Hulman", "Rose"],
  "Rose-Hulman is for engineers who want to be engineers, not academics. It tops the rankings for undergrad engineering because the focus is 100% on teaching. Admits are brilliant but practical—they love to tinker. The community is incredibly supportive; students help each other survive the rigor rather than compete."
);

DB["Butler University"] = create(
  "Butler University", "Indianapolis, IN", "Private", "82%", "Moderate", "3.7+ W", "1150-1330", "$44,000",
  ["Business", "Pharmacy", "Dance", "Journalism"],
  "Hinkle Fieldhouse, beautiful campus, 'The Butler Way'.",
  "Friendly, polite, spirited. 'Bulldogs'.",
  "Visit if you can. Demonstrated interest helps.",
  ["Butler"],
  "Butler students are known for being nice (Midwestern polite). The 'Butler Way' emphasizes community and humility. Admits to the Lacy School of Business are polished and professional. The campus is gorgeous and just minutes from downtown Indy, so students are often interning while taking classes."
);

// Misc Ohio/Indiana added by user
DB["University of Dayton"] = create(
  "University of Dayton", "Dayton, OH", "Private", "74%", "Moderate", "3.6+ W", "1140-1340", "$46,000",
  ["Engineering", "Business", "Education", "Marketing"],
  "Catholic (Marianist), community-focused, 'The Porch' culture.",
  "Community-lovers. Service oriented. Engineers.",
  "Community service on resume is a big plus.",
  ["Dayton", "UD", "Flyers"],
  "UD is legendary for its community spirit. Students live in a 'student neighborhood' with porches, creating a unique social bond. Admits are service-oriented (Marianist values) and friendly. The Engineering and Entrepreneurship programs are top-notch, attracting students who want to create ethical solutions."
);

DB["Xavier University"] = create(
  "Xavier University", "Cincinnati, OH", "Private", "84%", "Moderate", "3.5+ W", "1100-1300", "$45,000",
  ["Nursing", "Business", "Montessori Education", "Biology"],
  "Jesuit, basketball rival to UC, service learning.",
  "Engaged, ethical, spirited. 'All For One'.",
  "Jesuit values: Magis (More). Show you want to do more.",
  ["Xavier", "Musketeers"],
  "Xavier admits are 'men and women for others'. The Jesuit identity attracts students who care about social justice and service. Resume often shows leadership in youth groups or retreats. The campus is tight-knit, and students support the Musketeers basketball team religiously."
);

DB["Valparaiso University"] = create(
  "Valparaiso University", "Valparaiso, IN", "Private", "94%", "Safety", "3.4+", "Test Blind", "$43,000",
  ["Meteorology", "Engineering", "Nursing", "Business"],
  "Lutheran roots, elite Meteorology program (storm chasing).",
  "Values-based, curious, nice. Weather nerds love it here.",
  "Mention Meteorology if that's your thing (it's famous).",
  ["Valpo"],
  "Valpo is a place of light and learning. It has a Lutheran heritage that encourages free inquiry. Admits are often grounded, moral, and hard-working. The College of Engineering is excellent for a school its size. The Meteorology program attracts weather enthusiasts from across the country."
);

DB["DePauw University"] = create(
  "DePauw University", "Greencastle, IN", "Private", "58%", "Moderate", "3.6+ W", "Test Blind", "$54,000",
  ["Communication", "Economics", "Music", "Computer Science"],
  "Media Fellows, Management Fellows. Intense Greek life. 'Gold within'.",
  "Leaders, networkers, communicators. Pre-professional liberal arts.",
  "Fellows programs are elite. Apply to them.",
  ["DePauw"],
  "DePauw produces CEOs and broadcasters. The 'Fellows' programs (Media, Management) act like honors colleges and pipeline students into top internships. Admits are socially savvy (monumental Greek life participation) and ambitious. They want the liberal arts foundation but with a clear path to the C-suite."
);

DB["Earlham College"] = create(
  "Earlham College", "Richmond, IN", "Private", "73%", "Moderate", "3.6+ W", "Test Blind", "$49,000",
  ["Biology", "Peace Studies", "Psychology", "Japanese"],
  "Quaker, consensus-based, 'The Epic Journey'. Teachers are 'First Name basis'.",
  "Peacemakers, globalists, quirky intellectuals. Quaker values.",
  "Show you are collaborative and care about community.",
  ["Earlham"],
  "Earlham is distinct. It runs on Quaker principles of consensus (everyone must agree). Admits are deeply principled, often interested in peace and justice. Professors go by their first names. It attracts students who find traditional hierarchy stifling and want a truly egalitarian community."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 10: CENTRAL MIDWEST (IA, MO, KS, NE)
// ==========================================

DB["University of Iowa"] = create(
  "University of Iowa", "Iowa City, IA", "Public", "86%", "Moderate", "3.6+ W", "1130-1360", "$10k/$32k",
  ["English", "Nursing", "Business", "Biology"],
  "UNESCO City of Literature. A Big Ten school where writing is king. Friendly, spirited.",
  "Writers, nurses, and leaders. Community-minded.",
  "Mention the Writer's Workshop or the huge hospital system.",
  ["Alberta", "Hawkeyes", "Iowa"],
  "Iowa is famous for two things: writing and wrestling (and football). Admits to the English/Creative Writing track are joining a legendary tradition. The university hospital is massive, making it a hub for nursing and pre-med students. The vibe is classic college town friendliness with a surprising artistic spike."
);

DB["Iowa State University"] = create(
  "Iowa State University", "Ames, IA", "Public", "90%", "Moderate", "3.4+", "1080-1320", "$10k/$26k",
  ["Engineering", "Agriculture", "Design", "Veterinary Medicine"],
  "Science with practice. Beautiful campus, massive engineering programs. Innovation hub.",
  "Inventors, farmers (modern), and engineers. Practical and friendly.",
  "Innovation pitch in essay helps. Show you like to build.",
  ["ISU", "Cyclones"],
  "Iowa State is an engine of innovation. Admits to the College of Engineering are practical problem solvers. It's a land-grant university, so agriculture and veterinary medicine are also elite. Students are friendly, rigorous, and love the beautiful, park-like campus. They are 'makers' at heart."
);

DB["Grinnell College"] = create(
  "Grinnell College", "Grinnell, IA", "Private", "11%", "Very Hard", "4.0 UW", "1420-1540", "$61,000",
  ["Economics", "Biology", "Computer Science", "Political Science"],
  "Intellectual oasis in cornfields. Massive endowment, self-governance, social justice.",
  "Brilliant, independent, socially conscious. 'Grinnellians'.",
  "Demonstrate ability to govern yourself. Intellectual vitality is paramount.",
  ["Grinnell"],
  "Grinnell is a powerhouse. With an endowment rivaling the Ivies, it attracts brilliant, progressive students who want autonomy. 'Self-Gov' is the rule—students make their own social rules. Admits are intensely intellectual and often go on to earn PhDs. They handle the rural isolation by building a hyper-active on-campus community."
);

DB["Drake University"] = create(
  "Drake University", "Des Moines, IA", "Private", "67%", "Moderate", "3.6+ W", "1140-1350", "$48,000",
  ["Journalism", "Actuarial Science", "Pharmacy", "Law (3+3)"],
  "Drake Relays. Des Moines capital connections. Professional focus.",
  "Future professionals. Journalists and actuaries. Driven.",
  "Highlight career goals. It's a very pre-professional school.",
  ["Drake", "Bulldogs"],
  "Drake punches above its weight in professional placement. It is a national leader in Actuarial Science and Journalism. Admits are often ambitious students who treat college as a launchpad. The proximity to Des Moines (insurance capital) means internships are plentiful. The vibe is busy and professional."
);

DB["Luther College"] = create(
  "Luther College", "Decorah, IA", "Private", "64%", "Moderate", "3.6+ W", "1100-1320", "$47,000",
  ["Music", "Biology", "Environmental Studies", "Nursing"],
  "Norwegian valley, limestone bluffs, incredible music. Nature focused.",
  "Musicians and hikers. Community-focused and nice.",
  "Music audition is a great way to show interest.",
  ["Luther"],
  "Luther is beautiful. Located in the 'Driftless Region' (hilly), admits love the outdoors. It is also another musical powerhouse (Nordic choir tradition). Students are incredibly friendly and community-oriented. If you want to sing in a choir and hike a bluff before biology class, this is the place."
);

DB["University of Missouri"] = create(
  "Mizzou", "Columbia, MO", "Public", "77%", "Moderate", "3.5+ W", "1120-1330", "$14k/$32k",
  ["Journalism", "Business", "Health Professions", "Engineering"],
  "The world's first Journalism school. SEC sports. Traditional college town.",
  "Journalists and spirited leaders. 'Tigers'.",
  "Mention the 'Missouri Method' (learning by doing) for J-School.",
  ["Mizzou", "Missouri"],
  "Mizzou is the Mecca for journalism. Admits to the J-School are serious, often running school newspapers or blogs. Access to real newsrooms (NBC affiliate, etc.) is the draw. For others, it's a spirited SEC school with strong honors programs and a classic Greek life scene."
);

DB["Saint Louis University"] = create(
  "Saint Louis University", "St. Louis, MO", "Private", "70%", "Moderate", "3.8+ W", "1210-1410", "$52,000",
  ["Physical Therapy", "Nursing", "Aviation", "Business"],
  "Jesuit, urban, medical focus. Billikens. Flight school.",
  "Healers and pilots. Service-oriented urbanites.",
  "Medical scholars program is direct admit (very hard). Apply early.",
  ["SLU", "Billikens"],
  "SLU is a major medical and aviation hub. Admits to the 6-year Physical Therapy or Medical Scholars programs are elite stats-wise. The Jesuit mission drives a strong culture of service in the city. Students are friendly, career-focused, and proud to be 'Billikens' (a unique mascot for a unique school)."
);

DB["Missouri State University"] = create(
  "Missouri State University", "Springfield, MO", "Public", "88%", "Safety", "3.4+", "1040-1230", "$8k/$17k",
  ["Business", "Education", "Nursing", "Agriculture"],
  "Public affairs mission. Large, friendly, affordable. Ozarks region.",
  "Community-minded students looking for value.",
  "Highlight volunteer work (Public Affairs mission).",
  ["Missouri State", "MSU", "Bears"],
  "Missouri State has a statewide mandate for 'Public Affairs'. Admits are expected to be good citizens. It offers a massive college feel at a very affordable price. The College of Business is the largest in the region. Students are down-to-earth and friendly."
);

DB["Truman State University"] = create(
  "Truman State University", "Kirksville, MO", "Public", "45%", "Moderate", "3.8+ W", "1140-1360", "$9k/$17k",
  ["Biology", "Business", "Psychology", "English"],
  "The 'Harvard of the Midwest' (Public Liberal Arts). Intelligent, affordable.",
  "Smart, quirky students who want value. Intellectuals.",
  "Show intellectual curiosity. It's a serious academic school.",
  ["Truman", "Bulldogs"],
  "Truman State is unique: a public liberal arts college with selective admissions. Admits are often high-stats students who want an intellectual environment without the private school price tag. The vibe is collaborative and nerdy in a good way. Undergraduate research is the norm here."
);

DB["University of Kansas"] = create(
  "University of Kansas", "Lawrence, KS", "Public", "88%", "Moderate", "3.4+ (Assured)", "1120-1350", "$11k/$28k",
  ["Journalism", "Engineering", "Business", "Nursing", "Architecture"],
  "Rock Chalk Jayhawk! Basketball history, spirited, beautiful hill-top campus.",
  "Spirited, friendly, proud. 'Jayhawks'.",
  "Honors program offers smaller classes. Design/Architecture is strong.",
  ["KU", "Kansas", "Jayhawks"],
  "KU is steeped in tradition. 'Rock Chalk' is a chant known globally. Admits are spirited and social. The Architecture and Design programs are top-tier and require portfolios. Lawrence is often voted one of the best college towns—artsy, musical, and young. Students love the balance of fun and rigor."
);

DB["Kansas State University"] = create(
  "Kansas State University", "Manhattan, KS", "Public", "95%", "Safety", "3.2+", "1060-1280", "$10k/$26k",
  ["Agriculture", "Engineering", "Architecture", "Business"],
  "The 'Little Apple'. Friendly, family atmosphere, land-grant focus.",
  "Family-oriented, hardworking, researching. 'Wildcats'.",
  "Mention 'K-State Family'. It's a real cultural thing.",
  ["K-State", "KSU", "Wildcats"],
  "K-State is famous for the 'K-State Family' vibe. It is incredibly welcoming. Admits often have backgrounds in agriculture or engineering. The Biosecurity research here is world-leading. Students are humble, hardworking, and deeply loyal to the university."
);

DB["Wichita State University"] = create(
  "Wichita State University", "Wichita, KS", "Public", "91%", "Safety", "3.2+", "Test Blind", "$9k/$18k",
  ["Aerospace Engineering", "Business", "Criminal Justice", "Health Professions"],
  "Innovation campus. Massive aviation industry connections (Air Capital of the World).",
  "Hands-on learners. Future aerospace engineers.",
  "Highlight desire for applied learning/internships.",
  ["Wichita State", "Shockers"],
  "Wichita State is an applied learning machine. Located in the 'Air Capital', its Aerospace Engineering program is intimately connected to industry (Spirit, Textron). Admits are students who want to intern while they learn. The 'Innovation Campus' draws makers and entrepreneurs."
);

DB["University of Nebraska-Lincoln"] = create(
  "University of Nebraska-Lincoln", "Lincoln, NE", "Public", "79%", "Moderate", "3.5+", "1120-1360", "$10k/$27k",
  ["Business", "Engineering", "Agriculture", "Journalism"],
  "Go Big Red. Massive football culture, friendly, software engineering prowess.",
  "Loyal, hardworking, nice. 'Huskers'.",
  "Raikes School (CS + Business) is Ivy-level competitive. Look it up.",
  ["UNL", "Nebraska", "Huskers"],
  "UNL is the heart of the state. 'Nice' is a real cultural value here. While general admission is accessible, the Jeffrey S. Raikes School of Computer Science and Management is incredibly elite and attracts top tech talent. Students are loyal, spirited, and value the high quality of life in Lincoln."
);

DB["Creighton University"] = create(
  "Creighton University", "Omaha, NE", "Private", "76%", "Moderate", "3.5+ W", "1170-1350", "$47,000",
  ["Nursing", "Business", "Biology", "Neuroscience"],
  "Jesuit, pre-health focus. Omaha opportunities. Caring community.",
  "Service-oriented, serious, friendly. 'Bluejays'.",
  "Emphasize service and leadership. Pre-med track is huge.",
  ["Creighton", "Bluejays"],
  "Creighton is a pre-health powerhouse. The Jesuit values permeate the education, creating doctors and nurses who care about the 'whole person'. Admits are often serious students with significant volunteer hours. The Heider College of Business is also well-connected in Omaha (home to Warren Buffett)."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 11: FLORIDA
// ==========================================

DB["Florida State University"] = create(
  "Florida State University", "Tallahassee, FL", "Public", "24%", "Hard", "3.8+ W", "1250-1420", "$6k/$22k",
  ["Criminology", "Film", "Political Science", "Business"],
  "Spirited, researched-focused, beautiful brick campus. 'Unconquered'.",
  "Leaders, creatives (Film school is elite), and spirited scholars.",
  "Film School is incredibly competitive (separate app).",
  ["FSU", "Seminoles", "Noles"],
  "FSU has transformed into a top-tier public university. The vibe is classic collegiate—massive spirit, Greek life, and sports—but the academic rigor is serious. The College of Motion Picture Arts is world-famous. Admits are often leaders who want the 'big state school' experience with elite research opportunities."
);

DB["University of Miami"] = create(
  "University of Miami", "Coral Gables, FL", "Private", "19%", "Hard", "3.8+ W", "1300-1480", "$59,000",
  ["Marine Science", "Business", "Pre-Med", "Music"],
  "The 'U'. Wealthy, glamorous, diverse, sunny. Work hard, play very hard.",
  "Ambitious, cosmopolitan, social. Future CEOs and doctors.",
  "Demonstrated interest is HUGE. Visit or track emails.",
  ["UMiami", "The U", "Canes"],
  "The U is a brand. Admits are often cosmopolitan, wealthy, and confident. It is incredibly diverse, reflecting Miami's international flavor. Marine Science is top-tier (Rosenstiel School). The social scene is intense and flashy. Students here are 'academic hustlers'—they network aggressively and enjoy the Miami lifestyle."
);

DB["University of South Florida"] = create(
  "University of South Florida", "Tampa, FL", "Public", "44%", "Moderate", "3.6+ W", "1200-1350", "$6k/$17k",
  ["Health Sciences", "Business", "Engineering", "Psychology"],
  "Fastest-rising research university. Urban, diverse, medical focus.",
  "Gritty researchers and future healthcare pros. 'Bulls'.",
  "Pre-med/Pre-health is the dominant culture here.",
  ["USF", "Bulls"],
  "USF is a research juggernaut on the rise. Admits often choose USF for its massive medical complex and research funding. The vibe is urban and driven; it's less of a 'party school' than FSU/UF and more of a career accelerator, especially for students aiming for medical school or healthcare administration."
);

DB["University of Central Florida"] = create(
  "University of Central Florida", "Orlando, FL", "Public", "36%", "Moderate", "3.6+ W", "1180-1360", "$6k/$22k",
  ["Engineering", "Computer Science", "Hospitality", "Game Design"],
  "Space U. Massive, modern, industry-connected. Pipeline to NASA/Disney.",
  "Innovators, engineers, hospitality leaders. 'Charge On'.",
  "Rosen College (Hospitality) is world #1. Mention it if applying.",
  ["UCF", "Knights"],
  "UCF is massive but feels connective. It was founded to support the space program, so Engineering and CS are its DNA. Admits are often future Disney imagineers (Game Design) or NASA engineers. The Rosen College of Hospitality is elite. Students are friendly, modern, and take advantage of Orlando's booming industry."
);

DB["Florida International University"] = create(
  "Florida International University", "Miami, FL", "Public", "64%", "Moderate", "3.5+ W", "1100-1280", "$6k/$19k",
  ["International Business", "Hospitality", "Psychology", "Computer Science"],
  "Miami's public research hub. Incredible diversity. International focus.",
  "Global citizens, hustlers, diverse urbanites. 'Paws Up'.",
  "International Business program is elite. Highlight bilingual skills.",
  ["FIU", "Panthers"],
  "FIU is one of the largest and most diverse universities in the nation. Admits are true 'citizens of the world', often bilingual and planning influential careers in Latin America and beyond. The International Business program is a standout. It's a commuter-heavy school with a vibrant, hustle-heavy culture."
);

DB["University of North Florida"] = create(
  "University of North Florida", "Jacksonville, FL", "Public", "71%", "Moderate", "3.4+", "1080-1250", "$6k/$20k",
  ["Business", "Logistics", "Nursing", "Coastal Biology"],
  "Hidden gem in a nature preserve. Small classes, business focus.",
  "Nature lovers and business students. Relaxed but focused.",
  "Transportation/Logistics flagship program is a major differentiator.",
  ["UNF", "Ospreys"],
  "UNF is a hidden gem. Located on a nature preserve, the campus is beautiful and calm. Admits love the smaller class sizes compared to UF/FSU. The Transportation and Logistics program is one of the best in the country, attracting career-focused students. The vibe is chill, outdoorsy, and supportive."
);

DB["Florida Atlantic University"] = create(
  "Florida Atlantic University", "Boca Raton, FL", "Public", "75%", "Moderate", "3.4+", "1060-1240", "$5k/$17k",
  ["Business", "Ocean Engineering", "Neuroscience", "Accounting"],
  "Beachside innovation. Rapidly growing reputation. Diverse.",
  "Entrepreneurs and ocean lovers. 'Winning in Paradise'.",
  "Ocean Engineering is a niche, elite program here.",
  ["FAU", "Owls"],
  "FAU has exploded in popularity (and basketball success). Admits are drawn to the location (Boca Raton) and the growing research profile. It offers unique programs like Ocean Engineering leading to direct industry jobs. Students are diverse, energetic, and proud of the university's newfound national spotlight."
);

DB["Rollins College"] = create(
  "Rollins College", "Winter Park, FL", "Private", "55%", "Moderate", "3.5+ W", "Test Blind", "$58,000",
  ["Business", "Communication", "Psychology", "International Business"],
  "Mr. Rogers' neighborhood. Beautiful, wealthy, personalized, relationship-based.",
  "Social, polished, community-minded. Mentorship seekers.",
  "Show you value small classes and global citizenship.",
  ["Rollins", "Tars"],
  "Rollins is arguably the most beautiful campus in Florida. Admits are often students who want a personalized, relationship-based education (Mr. Rogers is the most famous alum). The student body is polished and often affluent. 'Global Citizenship' is the core curriculum. The vibe is friendly, sunny, and relationship-driven."
);

DB["Stetson University"] = create(
  "Stetson University", "DeLand, FL", "Private", "72%", "Moderate", "3.5+ W", "1100-1300", "$54,000",
  ["Music", "Business", "Sound Engineering", "Law (3+3)"],
  "Historic, charming, musical. Oldest private uni in FL.",
  "Musicians, lawyers, and entrepreneurs. Unique mix.",
  "School of Music is conservatory-level. Audition matters.",
  ["Stetson", "Hatters"],
  "Stetson is a place of history and music. The School of Music is elite, so the campus is always filled with sound. Admits are deeply involved students—often leaders in student government or first-chair musicians. The business school is also strong. The 'Hatter' mascot reflects the unique, slightly quirky but traditional vibe."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 12: GEORGIA
// ==========================================

DB["University of Georgia"] = create(
  "UGA", "Athens, GA", "Public", "35%", "Hard", "4.0+ W", "1270-1490", "$12k/$31k",
  ["Business", "Psychology", "Biology", "Journalism"],
  "Classic college town (Athens). Greek life capital. Terry Business is elite. 'Go Dawgs'.",
  "Social, ambitious, spirited leaders. Future business tycoons.",
  "Terry College of Business is competitive. Demonstrated leadership is key.",
  ["UGA", "Georgia", "Bulldogs"],
  "UGA is the quintessential southern flagship. Located in Athens (one of the best college towns in the US), it balances intense academics with a massive social scene. Admits are often student body presidents or captains. The Terry College of Business is a major draw, placing students into top finance and consulting roles in Atlanta."
);

DB["Georgia State University"] = create(
  "Georgia State University", "Atlanta, GA", "Public", "66%", "Moderate", "3.4+", "1060-1280", "$11k/$29k",
  ["Business", "Computer Science", "Psychology", "Film"],
  "Campus IS the city. Diverse, unconventional, career-focused. No gates.",
  "Urban hustlers. Independent students who want city access.",
  "Highlight grit and career focus. It's not a traditional campus.",
  ["GSU", "Georgia State", "Panthers"],
  "Georgia State has no gates—it is woven into downtown Atlanta. Admits are independent and diverse; staying in a 'bubble' is impossible here. It is a massive engine for social mobility and career connection. Students often intern at Fortune 500s (Delta, Coke) just blocks from their dorms. The film program is booming."
);

DB["Kennesaw State University"] = create(
  "Kennesaw State University", "Kennesaw, GA", "Public", "68%", "Moderate", "3.3+", "1050-1230", "$6k/$17k",
  ["Nursing", "Business", "Engineering", "Education"],
  "Suburban powerhouse. Modern, fast-growing. 'Owl Nation'.",
  "Practical, suburban students. Future nurses and managers.",
  "Nursing program is highly competitive. Apply early.",
  ["Kennesaw", "KSU", "Owls"],
  "KSU has transformed from a commuter school to a major residential university. It offers a modern, suburban campus experience. Admits to the Nursing program are top-tier. The vibe is practical and friendly; students appreciate the new facilities and the close proximity to Atlanta without the downtown chaos."
);

DB["Georgia Southern University"] = create(
  "Georgia Southern University", "Statesboro, GA", "Public", "91%", "Safety", "3.2+", "1030-1200", "$6k/$17k",
  ["Business", "Nursing", "Engineering", "Education"],
  "Traditional, friendly, spirited. 'The GATA spirit'.",
  "Friendly, small-town feeling, spirited.",
  "Show you value tradition and community.",
  ["Georgia Southern", "Eagles"],
  "Georgia Southern offers the classic 'big college' experience in a smaller town. Admits love the friendly, Southern hospitality vibe. Football game days are legendary. It's a place for students who want a strong community and a traditional campus life without the crushing pressure of a flagship."
);

DB["Mercer University"] = create(
  "Mercer University", "Macon, GA", "Private", "75%", "Moderate", "3.7+ W", "1180-1360", "$41,000",
  ["Engineering", "Business", "Pre-Med", "Music"],
  "Service-focused, historic, innovative. 'Mercer On Mission'.",
  "Service leaders. Future professionals with a conscience.",
  "Mercer On Mission is a huge draw. Mention service interest.",
  ["Mercer", "Bears"],
  "Mercer is defined by service. 'Mercer On Mission' sends students globally to solve real problems (like fitting prosthetics). Admits are academic but deeply compassionate. The Engineering and Pre-health tracks are strong. The Macon campus is historic and beautiful, fostering a tight-knit community of changemakers."
);

DB["Agnes Scott College"] = create(
  "Agnes Scott College", "Decatur, GA", "Private", "68%", "Moderate", "3.7+ W", "Test Blind", "$46,000",
  ["Psychology", "Public Health", "Neuroscience", "Business"],
  "SUMMIT curriculum. Global learning for women. Innovative and inclusive.",
  "Global leaders. Empowered women. 'Scotties'.",
  "Discuss the SUMMIT curriculum (Global learning + Leadership).",
  ["Agnes Scott"],
  "Agnes Scott is small but mighty. The SUMMIT curriculum guarantees every student a global travel experience and leadership training. Admits are inclusive, intellectual, and ambitious women (and non-binary students). Located in cool/artsy Decatur, the vibe is progressive and empowering."
);

DB["Spelman College"] = create(
  "Spelman College", "Atlanta, GA", "Private", "28%", "Hard", "3.8+ W", "1160-1330", "$28,000",
  ["Biology", "Psychology", "Political Science", "Economics"],
  "#1 HBCU. Elite liberal arts for women. Producing global leaders.",
  "Confident, brilliant Black women. 'Spelmanites'.",
  "Leadership and advocacy for Black women are central themes.",
  ["Spelman"],
  "Spelman is legendary. It is an incubator for Black female excellence. Admits are often high-achieving leaders who want a sisterhood that affirms their identity while pushing them academically. The alumni network is incredibly powerful. Students are poised, articulate, and ready to change the world."
);

DB["Morehouse College"] = create(
  "Morehouse College", "Atlanta, GA", "Private", "58%", "Moderate", "3.3+", "Test Blind", "$29,000",
  ["Business", "Biology", "Political Science", "Sociology"],
  "The only college for Black men. MLK's alma mater. 'Morehouse Men'.",
  "Leaders, brothers, change-agents. Disciplined and ambitious.",
  "Focus on leadership and the responsibility of being a Morehouse Man.",
  ["Morehouse"],
  "Morehouse is a brotherhood. It is the only college in the world dedicated to educating Black men. Admits step into a tradition of leadership (MLK, Spike Lee). The expectation is high: 'Morehouse Men' are expected to lead and serve. The campus culture is dignified, spirited, and deeply supportive."
);

DB["Berry College"] = create(
  "Berry College", "Rome, GA", "Private", "62%", "Moderate", "3.7+ W", "1140-1340", "$40,000",
  ["Animal Science", "Business", "Education", "Nursing"],
  "World's largest campus (27,000 acres). Work Experience Program for everyone.",
  "Hardworking, outdoorsy, community-focused. 'Head, Heart, and Hands'.",
  "The Work Program is verified experience. Show you are ready to work.",
  ["Berry", "Vikings"],
  "Berry is stunning—it has the world's largest campus, filled with deer and trails. But the 'Berry Work Experience Program' is the real hook; every student is guaranteed a paid job on campus (from farming to marketing). Admits are humble, hardworking students who value graduation with a full resume."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 13: CAROLINAS
// ==========================================

DB["North Carolina State University"] = create(
  "NC State", "Raleigh, NC", "Public", "47%", "Moderate", "3.8+ W", "1250-1430", "$9k/$29k",
  ["Engineering", "Computer Science", "Animal Science", "Design"],
  "The 'Think and Do' pack. Research Triangle tech hub. Practical, nice, spirited.",
  "Problem solvers, makers, and engineers. Down-to-earth.",
  "Engineering is very competitive. Highlight 'doing' (projects/building).",
  ["NC State", "Wolfpack"],
  "NC State is the engineering workhorse of the Research Triangle. Unlike its neighbor UNC (liberal arts focus), State is all about 'Think and Do'. Admits are practical, often having built robots or run businesses in high school. The vibe is friendly and less pretentious. The College of Design is a hidden jewel (extremely selective)."
);

DB["Wake Forest University"] = create(
  "Wake Forest University", "Winston-Salem, NC", "Private", "21%", "Hard", "3.9+ W", "Test Blind", "$62,000",
  ["Business", "Biology", "Communication", "Politics"],
  "Work Forest. Intense academics, massive Greek life, ACC sports in a small school.",
  "Hardworking, polished, social, spirited. Future leaders.",
  "The interview is critical (and weirdly creative). Be ready to talk.",
  ["Wake Forest", "Wake"],
  "Wake Forest is nicknamed 'Work Forest' for a reason. The academic rigor is intense. Admits are often student body presidents who want the resources of a big ACC school (sports!) but the class sizes of a liberal arts college. Greek life is dominant. Students are polished, ambitious, and very busy."
);

DB["UNC Wilmington"] = create(
  "UNC Wilmington", "Wilmington, NC", "Public", "68%", "Moderate", "3.6+ W", "1180-1320", "$7k/$21k",
  ["Marine Biology", "Nursing", "Business", "Psychology"],
  "Beach vibes, serious Marine Science. Laid back but growing fast.",
  "Ocean lovers and chilled-out scholars. Friendly.",
  "Marine Bio is the flagship. Show ocean interest.",
  ["UNCW", "Seahawks"],
  "UNCW is the premiere coastal university in NC. Marine Biology attracts students from all over. The campus culture is laid-back and outdoorsy (surfboards in dorms is real). However, the Nursing and Business programs are increasingly competitive. It's for students who want balance: study hard, beach hard."
);

DB["UNC Charlotte"] = create(
  "UNC Charlotte", "Charlotte, NC", "Public", "79%", "Moderate", "3.4+ W", "1080-1280", "$7k/$20k",
  ["Computer Science", "Finance", "Engineering", "Nursing"],
  "Urban, modern, connection to banking capital. Light rail to uptown.",
  "Career-focused, diverse, city-lovers. 'Niner Nation'.",
  "Highlight career goals (Fintech/Banking) to fit the city vibe.",
  ["UNCC", "Charlotte", "Niners"],
  "UNC Charlotte is the fastest-growing university in the UNC system. It is inextricably linked to the city of Charlotte (a massive banking hub). Admits to the Belk College of Business or the College of Computing are often looking for direct pipelines to jobs at Bank of America or Wells Fargo. The vibe is modern and driven."
);

DB["East Carolina University"] = create(
  "East Carolina University", "Greenville, NC", "Public", "92%", "Safety", "3.2+", "1020-1200", "$7k/$23k",
  ["Nursing", "Business", "Education", "Public Health"],
  "Pirate Nation. Intense spirit, massive nursing school, serving the rural east.",
  "Spirited, grit, community-focused. 'Undaunted'.",
  "Nursing is the crown jewel. Mention service to rural areas.",
  ["ECU", "Pirates"],
  "ECU has more school spirit than schools ten times its prestige. 'Pirate Nation' is loud and proud. Beyond the party reputation lies a serious mission to serve rural NC, producing more nurses and teachers than anyone else. Admits are often unpretentious, friendly, and ready to get their hands dirty in clinicals or classrooms."
);

DB["Appalachian State University"] = create(
  "Appalachian State University", "Boone, NC", "Public", "83%", "Moderate", "3.5+ W", "1100-1280", "$8k/$23k",
  ["Education", "Business", "Sustainable Development", "Psychology"],
  "Mountain paradise. Friendly, outdoorsy, massive football culture (Giant Killers).",
  "Hikers, future teachers, and community lovers. 'Mountaineers'.",
  "Fit is key: You must love the mountains/cold.",
  ["App State", "App"],
  "App State inspires fanatic loyalty. Located in the Blue Ridge Mountains, admits are almost always outdoor enthusiasts. It was founded as a teachers college and remains elite for Education. The 'App Family' vibe is real—students hold doors open and smile. Football game days in 'The Rock' are electric."
);

DB["Elon University"] = create(
  "Elon University", "Elon, NC", "Private", "74%", "Moderate", "3.7+ W", "1160-1360", "$42,000",
  ["Business", "Communications", "Acting", "Music Theatre"],
  "Most beautiful campus? Study Abroad capital. Engaged learning.",
  "Polished, engaged, global travelers. 'Phoenix'.",
  "The 'Elon Experiences' (internships/study abroad) are mandatory. Mention them.",
  ["Elon", "Phoenix"],
  "Elon has skyrocketed in reputation. It is the national model for 'high-impact' learning—study abroad and internships are baked into the DNA. Admits are often polished, good communicators, and active in student orgs. The campus looks like a botanical garden. Music Theatre and Business are standout competitive majors."
);

DB["High Point University"] = create(
  "High Point University", "High Point, NC", "Private", "79%", "Moderate", "3.3+", "Test Blind", "$40,000",
  ["Business", "Sales", "Communications", "Interior Design"],
  "The 'Premier Life Skills' university. Upscale amenities, entrepreneurial focus.",
  "Aspiring entrepreneurs. Students who want value-added amenities.",
  "Show you want to be a 'job creator' or leader. Growth mindset.",
  ["HPU", "High Point"],
  "HPU is unique/controversial. It markets itself on 'Life Skills' and luxurious amenities (steakhouses, concierge). Admits are students who buy into the entrepreneurial, growth-mindset philosophy of President Qubein. The sales and business programs are strong. It attracts students who want a polished, service-heavy college experience."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 27: OHIO REGIONALS
// ==========================================

DB["University of Toledo"] = create(
  "University of Toledo", "Toledo, OH", "Public", "95%", "Moderate", "3.3+", "Test Blind", "$11k/$20k",
  ["Engineering", "Pharmacy", "Nursing", "Business"],
  "Rockets. Engineering co-op is mandatory. Medical center on campus.",
  "Engineers, healthcare-focused, gritty. 'Rockets'.",
  "College of Engineering has a mandatory co-op program (paid work).",
  ["UToledo", "Rockets"],
  "UToledo is an engineering and healthcare powerhouse in NW Ohio. The Engineering program requires co-ops (paid internships), ensuring graduates are job-ready. Having its own Medical Center (UTMC) is a massive boon for nursing/pre-med students. Admits are gritty and career-driven."
);

DB["Bowling Green State University"] = create(
  "Bowling Green State University", "Bowling Green, OH", "Public", "79%", "Moderate", "3.3+", "1020-1240", "$13k/$21k",
  ["Education", "Aviation", "Business", "Psychology"],
  "Classic college town. Teacher factory. Aviation hub. Friendly.",
  "Social, friendly, educators. 'Falcons'.",
  "One of the largest producer of teachers in the country. Aviation is also elite.",
  ["BGSU"],
  "BGSU provides the quintessential college town experience—the town is the university. It is historically one of the Midwest's premier teacher-training institutions. The Aviation program (with its own airport) is another flagship. Admits are typically social, friendly, and community-oriented."
);

DB["Kent State University"] = create(
  "Kent State University", "Kent, OH", "Public", "87%", "Moderate", "3.4+", "1060-1260", "$12k/$21k",
  ["Fashion Design", "Journalism", "Nursing", "Aeronautics"],
  "Fashion School is top tier. May 4th history. Activist roots. Artsy.",
  "Creative, activist, expressive. 'Golden Flashes'.",
  "The Fashion School is world-class (top 5 in US).",
  ["Kent State", "KSU"],
  "Kent State is known globally for its history (May 4th) and its Fashion School. The Fashion program draws students from NY/LA to Ohio. It has a streak of activism and creativity that separates it from other Ohio publics. Admits are often expressive, liberal, and arts-focused."
);

DB["University of Akron"] = create(
  "University of Akron", "Akron, OH", "Public", "83%", "Moderate", "3.2+", "1020-1230", "$12k/$18k",
  ["Polymer Science", "Engineering", "Nursing", "Business"],
  "Polymers/Plastics capital of the world. Engineering focus. Urban commuter mix.",
  "Innovators, engineers, practical. 'Zips'.",
  "Polymer Science/Engineering is arguably #1 in the world.",
  ["Akron", "Zips"],
  "The University of Akron is the world leader in Polymer Science (rubbers/plastics). If you want to be a materials engineer, this is the place. Beyond that, it is a solid urban research university. Admits are often local commuters or serious engineering students attracted by the Polymer reputation."
);

DB["Wright State University"] = create(
  "Wright State University", "Dayton, OH", "Public", "95%", "Moderate", "3.1+", "Test Blind", "$10k/$19k",
  ["Engineering", "Nursing", "Theatre", "Business"],
  "Accessible. Excellence in disability services. Named after Wright Bros.",
  "Inclusive, diverse, practical. 'Raiders'.",
  "Nationally ranked for disability accessibility and support services.",
  ["Wright State"],
  "Wright State is named after the Wright Brothers and stays true to that innovative spirit. It is nationally famous for being one of the most wheelchair-friendly and accessible campuses in America. Engineering and Theatre (Tom Hanks supports it) are strong. Admits are diverse and value inclusivity."
);

DB["Youngstown State University"] = create(
  "Youngstown State University", "Youngstown, OH", "Public", "81%", "Safety", "3.0+", "Test Blind", "$10k/$16k",
  ["Engineering", "Education", "Business", "Health/Human Services"],
  "Steel city grit. Additive Manufacturing (3D Printing) hub. Affordable.",
  "Resilient, hard-working, local. 'Penguins'.",
  "Leader in Additive Manufacturing research.",
  ["YSU", "Penguins"],
  "YSU is the anchor of the Mahoning Valley. It defines grit. It has reinvented itself as a national hub for Additive Manufacturing (3D Printing). It is incredibly affordable. Admits are often first-generation students with a strong work ethic looking to rebuild the region."
);

DB["Cleveland State University"] = create(
  "Cleveland State University", "Cleveland, OH", "Public", "89%", "Moderate", "3.2+", "1040-1250", "$12k/$17k",
  ["Urban Affairs", "Law", "Business", "Engineering"],
  "Downtown Cleveland. Engaged learning. Urban. Commuter heavy.",
  "Urban, connected, ambitious. 'Vikings'.",
  "Levin College of Urban Affairs is highly ranked.",
  ["CSU", "Cleveland State"],
  "CSU is woven into downtown Cleveland. 'Engaged Learning' is the motto—students use the city as a lab. The Levin College of Urban Affairs is one of the best in the nation. Admits are city-lovers who want to intern in city hall, major law firms, or hospitals right down the street."
);

DB["John Carroll University"] = create(
  "John Carroll University", "University Heights, OH", "Private", "84%", "Moderate", "3.6+ W", "1160-1340", "$46,000",
  ["Business", "Communications", "Biology", "Education"],
  "Jesuit. Service. Leadership. Alumni network in Cleveland is massive.",
  "Service-oriented, polished, leaders. 'Blue Streaks'.",
  "Boler College of Business has huge local pull.",
  ["John Carroll", "JCU"],
  "JCU is Cleveland's Jesuit university. The alumni network effectively runs the business community in Cleveland. The focus is on 'Service requiring leadership'. Admits are usually polished, community-minded students who want a classical education with strong career outcomes."
);

DB["Otterbein University"] = create(
  "Otterbein University", "Westerville, OH", "Private", "83%", "Moderate", "3.5+ W", "Test Blind", "$34,000",
  ["Nursing", "Education", "Theatre", "Equine Science"],
  "Suburban charm. Theatre is Broadway-good. Equine center.",
  "Creative, caring, animal-lovers. 'Cardinals'.",
  "Theatre/Acting and Equine Science are unique standouts.",
  ["Otterbein"],
  "Otterbein is a hidden gem in the suburbs of Columbus. Its Theatre program is shockingly good, sending many grads to Broadway. It also has a full Equine Science program (horses on campus). Admits are generally kind, creative, and community-focused."
);

DB["Capital University"] = create(
  "Capital University", "Bexley, OH", "Private", "74%", "Moderate", "3.4+", "Test Blind", "$39,000",
  ["Music", "Nursing", "Business", "Law"],
  "Lutheran. Conservatory of Music. Law School. Bexley is upscale.",
  "Musical, professional, friendly. 'Comets'.",
  "Conservatory of Music is excellent. Located in beautiful Bexley.",
  ["Capital"],
  "Capital is located in Bexley, an upscale neighborhood of Columbus. It is famous for its Conservatory of Music and its Law School. The vibe is professional but intimate. Admits are often musicians or nursing students who value the small class sizes and safe, beautiful location."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 28: ILLINOIS REGIONALS
// ==========================================

DB["Northern Illinois University"] = create(
  "NIU", "DeKalb, IL", "Public", "71%", "Moderate", "3.2+", "1020-1230", "$14k/$14k",
  ["Business", "Engineering", "Nursing", "Visual Arts"],
  "Huskies. Research focused. Diverse. Near Chicago.",
  "Diverse, ambitious, resilient. 'Huskies'.",
  "College of Business and Visual Arts are notably strong.",
  ["NIU"],
  "NIU is a major research institution west of Chicago. It prides itself on social mobility—taking diverse, often first-generation students and launching them into careers. The College of Business is highly rated. Admits are typically hardworking residents of the Chicago suburbs."
);

DB["Southern Illinois University"] = create(
  "SIU Carbondale", "Carbondale, IL", "Public", "91%", "Moderate", "3.1+", "1000-1200", "$15k/$15k",
  ["Aviation", "Automotive Technology", "Media", "Forestry"],
  "Salukis. The great outdoors. Hands-on tech programs. Beautiful forest campus.",
  "Outdoorsy, hands-on, relaxed. 'Salukis'.",
  "Automotive Tech and Aviation are world-class niche programs.",
  ["SIU", "Salukis"],
  "SIU Carbondale feels like a different world from Chicago. Located in the Shawnee National Forest, it is gorgeous and outdoorsy. It is famous for high-tech, hands-on programs like Automotive Technology (fixing Teslas/Porsches) and Aviation. Admits love nature and learning by doing."
);

DB["Eastern Illinois University"] = create(
  "Eastern Illinois University", "Charleston, IL", "Public", "68%", "Moderate", "3.1+", "980-1180", "$13k/$16k",
  ["Education", "Business", "Psychology", "Biology"],
  "Teachers college roots. Affordable. Friendly small town.",
  "Friendly, future teachers, rural. 'Panthers'.",
  "Consistently ranked high for value and teacher prep.",
  ["EIU"],
  "EIU is a classic regional public university. It focuses heavily on undergraduate education and teacher preparation. The tuition is very affordable. Admits are generally students from central/southern Illinois looking for a safe, supportive, and cost-effective college experience."
);

DB["Western Illinois University"] = create(
  "Western Illinois University", "Macomb, IL", "Public", "73%", "Safety", "3.0+", "Test Blind", "$13k/$13k",
  ["Law Enforcement", "Agriculture", "Business", "Education"],
  "Leathernecks. Law Enforcement is elite. Rural setting.",
  "Disciplined, service-minded, agricultural. 'Leathernecks'.",
  "Law Enforcement/Criminal Justice program is one of the best in the Midwest.",
  ["WIU", "Leathernecks"],
  "WIU is synonymous with Law Enforcement. Its Criminal Justice program is massive and elite. As the only university with the nickname 'Leathernecks' (authorized by the Marines), it has a disciplined but friendly vibe. Agriculture is also a major focus given the location."
);

DB["Columbia College Chicago"] = create(
  "Columbia College Chicago", "Chicago, IL", "Private", "95%", "Moderate", "3.0+", "Test Blind", "$32,000",
  ["Film", "Music", "Art/Design", "Game Design"],
  "Arts and Media only. Urban loop campus. Creative explosion.",
  "Creatives, non-conformists, artists. 'Renegades'.",
  "It's an arts school. Portfolio matters more than SATs.",
  ["Columbia Chicago"],
  "Columbia College Chicago is a massive arts and media college in the heart of downtown. It is not for accountants. It is for filmmakers, fashion designers, and game developers. The vibe is radically creative, diverse, and non-conformist. Admits are 'makers' who want to turn their art into a career."
);

DB["Elmhurst University"] = create(
  "Elmhurst University", "Elmhurst, IL", "Private", "80%", "Moderate", "3.4+", "1040-1250", "$41,000",
  ["Business", "Nursing", "Education", "Psychology"],
  "Affiliated with United Church of Christ. Arboretum campus. Suburban Chicago.",
  "Community-focused, polished, suburban. 'Bluejays'.",
  "Beautiful arboretum campus near Chicago train lines.",
  ["Elmhurst"],
  "Elmhurst is a picturesque liberal arts college just a train ride away from Chicago. The campus is literally a registered arboretum. It offers a balance of professional preparation (internships in the city) and a small, safe campus community. Admits are often looking for personal attention."
);

DB["North Central College"] = create(
  "North Central College", "Naperville, IL", "Private", "66%", "Moderate", "3.5+ W", "1080-1280", "$44,000",
  ["Business", "Education", "Psychology", "Exercise Science"],
  "Naperville location (top suburb). Athletic powerhouse (D3). Modern.",
  "Athletic, ambitious, suburban. 'Cardinals'.",
  "Naperville location offers incredible internship access.",
  ["North Central", "NCC"],
  "North Central sits in historic downtown Naperville, one of the wealthiest and safest suburbs in America. This location provides students with walkable access to shops and massive internship opportunities. It is a D3 sports dynasty (Track & Field). Admits are active, social, and career-ready."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 29: WISCONSIN REGIONALS
// ==========================================

DB["University of Wisconsin–Whitewater"] = create(
  "UW Whitewater", "Whitewater, WI", "Public", "86%", "Moderate", "3.2+", "Test Blind", "$8k/$17k",
  ["Business", "Education", "Media", "Social Work"],
  "Football powerhouse (D3). Disability services leader. Business school.",
  "Spirited, inclusive, business-minded. 'Warhawks'.",
  "College of Business is largest in WI. Accessibility services are elite.",
  ["UW Whitewater", "UWW"],
  "UW Whitewater is a powerhouse in two ways: It has a massive, highly accredited business school, and its football team wins national championships constantly. It is also, like Wright State, a national leader in disability services. Admits are spirited, practical, and school-pride oriented."
);

DB["University of Wisconsin–Eau Claire"] = create(
  "UW Eau Claire", "Eau Claire, WI", "Public", "77%", "Moderate", "3.5+", "1100-1300", "$9k/$18k",
  ["Nursing", "Business", "Biology", "Music"],
  "Wisconsin's most beautiful campus. 'Music City'. Health prowess.",
  "Friendly, musical, outdoorsy. 'Blugolds'.",
  "Music program is huge (Jazz particularly). Mayo Clinic partnership.",
  ["UW Eau Claire", "UWEC"],
  "UW Eau Claire calls itself 'Wisconsin's Most Beautiful Campus', and with the Chippewa River flowing through it, they might be right. It has a massive reputation for Music (largest jazz festival in the US) and a research partnership with the Mayo Clinic. Admits are friendly, 'Wisconsin nice' students."
);

DB["University of Wisconsin–La Crosse"] = create(
  "UW La Crosse", "La Crosse, WI", "Public", "82%", "Moderate", "3.6+", "1120-1300", "$9k/$18k",
  ["Health Sciences", "Biology", "Psychology", "Exercise Sport Science"],
  "Top ranked regional. Health/Fitness obsessed. scenic bluffs.",
  "Active, fit, health-conscious. 'Eagles'.",
  "The flagship for Physical Therapy, OT, and Sports Science in the system.",
  ["UW La Crosse", "UWL"],
  "UW La Crosse is often considered the academic runner-up to Madison for public students. The students are famously fit and active, surrounded by scenic bluffs. The university dominates in health sciences, PT, and OT. Admits are serious students who love hiking, running, and science."
);

DB["University of Wisconsin–Oshkosh"] = create(
  "UW Oshkosh", "Oshkosh, WI", "Public", "89%", "Moderate", "3.1+", "Test Blind", "$8k/$16k",
  ["Nursing", "Education", "Business", "Radio/TV/Film"],
  "Third largest in WI. Aviation linkage (EAA). Nursing strong.",
  "Hard-working, practical, spirited. 'Titans'.",
  "Nursing and Education are the bread and butter.",
  ["UW Oshkosh", "UWO"],
  "UW Oshkosh is a workhorse university. It produces massive numbers of nurses and teachers. Located near Lake Winnebago, it has a classic campus feel. The EAA AirVenture (world's largest aviation show) happens here, influencing the culture. Admits are gritty and focused on service careers."
);

DB["University of Wisconsin–Stevens Point"] = create(
  "UW Stevens Point", "Stevens Point, WI", "Public", "86%", "Moderate", "3.2+", "Test Blind", "$8k/$17k",
  ["Natural Resources", "Biology", "Fine Arts", "Education"],
  "Sustainability. Forestry/Wildlife. Arts. Central WI.",
  "Nature-lovers, artists, green. 'Pointers'.",
  "College of Natural Resources is the premier program.",
  ["UW Stevens Point", "UWSP"],
  "UWSP is the 'green' campus of the system. Its College of Natural Resources is legendary for forestry, wildlife, and fisheries. Surprisingly, it also has a vibrant Fine Arts scene. Admits are typically wearing flannel, love the woods, and care deeply about the environment."
);

DB["St. Norbert College"] = create(
  "St. Norbert College", "De Pere, WI", "Private", "83%", "Moderate", "3.5+ W", "1100-1300", "$43,000",
  ["Business", "Education", "Biology", "Communication"],
  "Norbertine Catholic. Riverfront campus. Community. Green Bay Packers summer home.",
  "Community-first, welcoming, spirited. 'Green Knights'.",
  "Famous for hosting the Packers training camp. Honest, warm vibe.",
  ["St. Norbert", "SNC"],
  "St. Norbert sits on the Fox River and is famous for its radical hospitality (a Norbertine value). It also hosts the Green Bay Packers training camp, so football is religion here. Admits are often 'midwest nice', looking for a small, warm, faith-based (but open) community."
);

DB["Carthage College"] = create(
  "Carthage College", "Kenosha, WI", "Private", "81%", "Moderate", "3.2+", "1050-1250", "$48,000",
  ["Business", "Nursing", "Marketing", "Biology"],
  "Lake Michigan views (on the beach). NASA partnership. J-Term.",
  "Curious, active, lakeside. 'Firebirds'.",
  "Directly on Lake Michigan. Micro-gravity research with NASA is unique.",
  ["Carthage"],
  "Carthage's campus is an arboretum directly on the shores of Lake Michigan—views are ocean-like. It is famous for its Micro-Gravity team which works with NASA. The 'J-Term' allows for study abroad. Admits are often from the Chicago-Milwaukee corridor, looking for personal attention and a beautiful view."
);

DB["Concordia University Wisconsin"] = create(
  "Concordia Wisconsin", "Mequon, WI", "Private", "70%", "Moderate", "3.3+", "Test Blind", "$32,000",
  ["Nursing", "Pharmacy", "Education", "Business"],
  "Lutheran (LCMS). Lake Michigan bluff. Vocational focus. Conservative.",
  "Faith-focused, service-oriented, conservative. 'Falcons'.",
  "Largest Lutheran university in the US. Pharmacy school is large.",
  ["Concordia"],
  "Concordia Wisconsin is the flagship of the Concordia system. Perched on a bluff overlooking Lake Michigan, the campus is stunning. It is unapologetically Lutheran (LCMS) and conservative. Admits generally share these faith values and are focused on vocational service (Nursing, Pharmacy, Teaching)."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 30: IOWA REGIONALS
// ==========================================

DB["University of Northern Iowa"] = create(
  "University of Northern Iowa", "Cedar Falls, IA", "Public", "76%", "Moderate", "3.3+", "Test Blind", "$9k/$19k",
  ["Education", "Business", "Accounting", "Psychology"],
  "Teacher education capital. Friendly. Safe residential campus.",
  "Future teachers, friendly, community-focused. 'Panthers'.",
  "Begun as a teachers college, it remains the premier place to become an educator in Iowa.",
  ["UNI", "Northern Iowa"],
  "UNI is the 'Goldilocks' university of Iowa—not as massive as Iowa/Iowa State, but big enough to have resources. It is historically the teacher-training capital of the state. The vibe is incredibly safe, friendly, and supportive. Admits are often future educators or business students."
);

DB["St. Ambrose University"] = create(
  "St. Ambrose University", "Davenport, IA", "Private", "73%", "Moderate", "3.3+", "1030-1230", "$34,000",
  ["Nursing", "Occupational Therapy", "Physical Therapy", "Business"],
  "Catholic (Diocesan). Health Sciences powerhouse. Quad Cities.",
  "Service-oriented, health-focused, Bees. 'Fighting Bees'.",
  "Health Sciences (OT, PT, Nursing) are the clear flagship programs.",
  ["St. Ambrose", "SAU"],
  "St. Ambrose is a Catholic university in the Quad Cities known for its massive footprint in health sciences. Its Occupational Therapy (OT) and Physical Therapy (PT) programs are highly competitive. Admits are typically service-minded students looking for a direct path to a healthcare career."
);

DB["Simpson College"] = create(
  "Simpson College", "Indianola, IA", "Private", "89%", "Moderate", "3.4+", "Test Blind", "$44,000",
  ["Management", "Accounting", "Political Science", "Multimedia Journalism"],
  "Just south of Des Moines. CULVER Center (Politics). Opera.",
  "Politically active, singers, leaders. 'Storm'.",
  "Proximity to Des Moines capital makes it a pol-sci hotspot.",
  ["Simpson"],
  "Simpson College punches above its weight in politics because of its proximity to Des Moines (the state capital). The Culver Public Policy Center is a draw. It also has a surprisingly elite Opera program. Admits are often engaged, active students who want internships in the city."
);

DB["Central College"] = create(
  "Central College", "Pella, IA", "Private", "70%", "Moderate", "3.5+", "Test Blind", "$19,000",
  ["Exercise Science", "Business", "Biology", "Education"],
  "Pella (Tulip Time). Study Abroad is huge. Affordable tuition model.",
  "Globally minded, active, friendly. 'Dutch'.",
  "Tuition price reset makes it very affordable. Study abroad culture is massive.",
  ["Central"],
  "Central College is in Pella, famous for its Dutch heritage and tulips. The college is known for a massive commitment to study abroad—nearly everyone goes. They also drastically lowered their 'sticker price' tuition recently to be more transparent. Admits are friendly and adventurous."
);

DB["Wartburg College"] = create(
  "Wartburg College", "Waverly, IA", "Private", "77%", "Moderate", "3.5+", "1020-1260", "$45,000",
  ["Biology", "Music Therapy", "Journalism", "Education"],
  "Lutheran (ELCA). Music is central (Christmas with Wartburg). Science strong.",
  "Musical, faithful, scientific. 'Knights'.",
  "Music Therapy program is one of the oldest and best.",
  ["Wartburg"],
  "Wartburg is a Lutheran college where music is life. 'Christmas with Wartburg' is a televised tradition. But it's not just arts; the Biology/Pre-med placement rates are exceptionally high. Admits are often 'singing scientists'—students who love choir but settle into serious healthcare careers."
);

DB["Coe College"] = create(
  "Coe College", "Cedar Rapids, IA", "Private", "72%", "Moderate", "3.6+", "1100-1320", "$48,000",
  ["Business", "Psychology", "Nursing", "Biology"],
  "Cedar Rapids urban campus. 'Coe Plan'. Research focused.",
  "Urban-focused, researchers, busy. 'Kohawks'.",
  "Being in Cedar Rapids allows for year-round internships.",
  ["Coe"],
  "Coe College calls itself an 'urban' liberal arts college because it is integrated into Cedar Rapids. This allows for the 'Coe Plan', emphasizing internships and community engagement. It has a surprising amount of undergraduate research funding. Admits are busy, resume-building students."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 31: MISSOURI REGIONALS
// ==========================================

DB["University of Missouri–Kansas City"] = create(
  "UMKC", "Kansas City, MO", "Public", "69%", "Moderate", "3.4+", "1060-1280", "$11k/$26k",
  ["Medicine (BA/MD)", "Pharmacy", "Business", "Music (Conservatory)"],
  "Urban KC. 6-year Med program is famous. Jazz heritage. Commuter/Res mix.",
  "Urban, professional, medical-focused. 'Roos'.",
  "BA/MD (6 year medical) program is ultra-competitive and the flagship.",
  ["UMKC", "Kansas City"],
  "UMKC is Kansas City's university. It is famous for its 6-year BA/MD medical program, which attracts brilliant students nationwide. It also houses a world-class Music Conservatory (fitting for a Jazz city). Admits are urban-focused professionals who want to be in the heart of the city."
);

DB["University of Missouri–St. Louis"] = create(
  "UMSL", "St. Louis, MO", "Public", "76%", "Moderate", "3.3+", "1050-1260", "$11k/$28k",
  ["Business", "Criminology", "Nursing", "Optometry"],
  "St. Louis workforce engine. Diverse. Serious students. Optometry school.",
  "Career-focused, urban, diverse. 'Tritons'.",
  "International Business program is consistently ranked in top 20.",
  ["UMSL"],
  "UMSL (pronounced 'um-sull') is the working-class engine of St. Louis. It educates more St. Louisans than any other university. The International Business program is shockingly elite. Admits are often non-traditional or commuter students who are laser-focused on career advancement."
);

DB["Missouri University of Science and Technology"] = create(
  "Missouri S&T", "Rolla, MO", "Public", "81%", "Hard", "3.8+ W", "1280-1460", "$11k/$29k",
  ["Engineering", "Computer Science", "Geology", "Physics"],
  "STEM only. Nerdy heaven. Solar car team. High ROI.",
  "Engineers, gamers, problem-solvers. 'Miners'.",
  "It's an engineering school. St. Pat's celebration is legendary.",
  ["Missouri S&T", "Rolla"],
  "Missouri S&T is one of the best ROI schools in the nation. It is an unapologetic engineering hub located in rural Rolla. The vibe is nerdy and proud—Greek life is huge, but it's filled with engineers. Admits are problem-solvers who want a rigorous technical education and a high starting salary."
);

DB["Southeast Missouri State University"] = create(
  "SEMO", "Cape Girardeau, MO", "Public", "86%", "Safety", "3.2+", "Test Blind", "$9k/$15k",
  ["Education", "Nursing", "Cybersecurity", "Theatre"],
  "River Campus (Arts). Teachers. Cybersecurity. Friendly.",
  "Friendly, creative, river-folk. 'Redhawks'.",
  "River Campus is a dedicated arts campus—unique for a regional public.",
  ["SEMO", "Southeast"],
  "SEMO sits on the Mississippi River. It distinguishes itself with the 'River Campus', a separate campus dedicated entirely to the arts, music, and theatre. It is also a regional hub for cybersecurity and education. Admits are typically friendly students from the Bootheel and St. Louis regions."
);

DB["University of Central Missouri"] = create(
  "UCM", "Warrensburg, MO", "Public", "71%", "Moderate", "3.2+", "1000-1210", "$9k/$16k",
  ["Aviation", "Education", "Criminal Justice", "Nursing"],
  "Aviation (own airport). Teachers college roots. Affordable.",
  "Pilots, teachers, practical. 'Mules'.",
  "Owns its own airport—Aviation program is the standout.",
  ["UCM", "Central Missouri"],
  "UCM is known for two things: Mules (the mascot) and airplanes. It owns its own airport and has a massive professional pilot program. It is also a major producer of teachers. Admits are down-to-earth and practical. The campus is a classic, walkable Midwest environment."
);

DB["Lindenwood University"] = create(
  "Lindenwood University", "St. Charles, MO", "Private", "74%", "Moderate", "3.3+", "Test Blind", "$19,000",
  ["Business", "Game Design", "Education", "Exercise Science"],
  "Historic campus. Massive growth. Scholarship heavy. St. Charles charm.",
  "Active, adaptable, suburban. 'Lions'.",
  "Aggressive with scholarships. High growth in Game Design.",
  ["Lindenwood"],
  "Lindenwood is a historic college that has grown explosively. Located in the beautiful historic district of St. Charles, it feels collegiate but distinct. They are known for generous merit scholarships and a rapidly growing Game Design program. Admits are diverse and often athletes."
);

DB["Rockhurst University"] = create(
  "Rockhurst University", "Kansas City, MO", "Private", "73%", "Moderate", "3.6+ W", "1120-1320", "$41,000",
  ["Business", "Nursing", "Occupational Therapy", "Communication Sciences"],
  "Jesuit KC. 'Magis'. Helzberg School of Management. Leadership.",
  "Service-oriented leaders, polished. 'Hawks'.",
  "Jesuit values in the heart of KC. Nursing/Health is huge.",
  ["Rockhurst"],
  "Rockhurst is Kansas City's Jesuit university. It emphasizes 'Magis' (doing more/excellence) and service. The Helzberg School of Management is well-connected in the KC business world. Admits are often 'men and women for others'—students who want to lead with a conscience."
);

DB["Webster University"] = create(
  "Webster University", "Webster Groves, MO", "Private", "57%", "Moderate", "3.4+", "Test Blind", "$29,000",
  ["Film", "Theatre", "International Relations", "Business"],
  "Global campuses. Conservatory of Theatre Arts is elite. Webster Groves charm.",
  "Creatives, global citizens, performers. 'Gorloks'.",
  "Conservatory of Theatre Arts is a top-tier BFA program.",
  ["Webster"],
  "Webster is a unique mix: a quiet suburban campus in Webster Groves that acts as the hub for a global network of campuses. But its crown jewel is the Conservatory of Theatre Arts, which attracts Broadway-bound talent. Admits are often artistic, international-minded, or chess players (top chess team)."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 32: KANSAS & NEBRASKA REGIONALS
// ==========================================

DB["Emporia State University"] = create(
  "Emporia State University", "Emporia, KS", "Public", "86%", "Safety", "3.1+", "Test Blind", "$7k/$21k",
  ["Education", "Business", "Nursing", "Library Science"],
  "The Teachers College. Hornets. Friendly rural campus.",
  "Educators, friendly, local. 'Hornets'.",
  "Founded as the Kansas State Normal School—Teaching is the DNA.",
  ["Emporia State", "ESU"],
  "Emporia State is known throughout Kansas as 'The Teachers College'. It produces a massive percentage of the state's K-12 educators. The National Teachers Hall of Fame is literally on campus. Admits are friendly, community-focused students dedicated to service and education."
);

DB["Pittsburg State University"] = create(
  "Pittsburg State University", "Pittsburg, KS", "Public", "92%", "Safety", "3.1+", "Test Blind", "$7k/$18k",
  ["Construction Management", "Automotive Technology", "Education", "Nursing"],
  "Gorillas (unique mascot). Technology Center is massive. Hands-on.",
  "Hands-on, spirited, technical. 'Gorillas'.",
  "College of Technology (Construction/Auto) is the flagship.",
  ["Pittsburg State", "Pitt State"],
  "Pitt State is the only university in the US with the 'Gorilla' mascot. It is famous for its massive College of Technology, which draws students nationwide for Construction Management and Automotive tech. Admits are 'makers'—students who want to build, fix, and manage real things."
);

DB["Fort Hays State University"] = create(
  "Fort Hays State University", "Hays, KS", "Public", "88%", "Safety", "3.0+", "Test Blind", "$5k/$15k",
  ["Business", "Informatics", "Education", "Agriculture"],
  "Online giant. Affordable. Western Kansas hub. Tigers.",
  "Digital learners, resilient, western. 'Tigers'.",
  "Tuition is incredibly low. Huge online footprint.",
  ["FHSU", "Fort Hays"],
  "Fort Hays is the educational hub of Western Kansas. It has pioneered online education, making it a massive institution digitally. For on-campus students, it offers an incredibly affordable, intimate experience. Admits are often value-conscious and resilient students from the high plains."
);

DB["Washburn University"] = create(
  "Washburn University", "Topeka, KS", "Public", "100%", "Safety", "3.0+", "Test Blind", "$9k/$19k",
  ["Nursing", "Law (Criminal Justice)", "Business", "Allied Health"],
  "Municipal university. Topeka (Capital city). Icahbods (Top Hat).",
  "Civic-minded, practical, local. 'Ichabods'.",
  "Being in the state capital (Topeka) provides government/law access.",
  ["Washburn"],
  "Washburn is a 'Municipal University', giving it a unique relationship with the city of Topeka. Its mascot, the Ichabod, is iconic. Being in the state capital, the Law and Criminal Justice programs are standout. Admits are often commuters or locals looking for professional degrees."
);

DB["University of Nebraska–Omaha"] = create(
  "UN Omaha", "Omaha, NE", "Public", "82%", "Moderate", "3.2+", "1040-1250", "$8k/$21k",
  ["Business", "Criminology", "Computer Science", "Aviation"],
  "Urban campus. Omaha business connections (Fortune 500s). Bioinformatics.",
  "Urban, career-driven, diverse. 'Mavericks'.",
  "Omaha is a business hub (Warren Buffett). Great internships.",
  ["UNO", "Omaha"],
  "UNO is the metropolitan university of Nebraska. Omaha is home to massive Fortune 500 companies, so the business and tech connections are real. The Aviation institute is also a hidden gem. Admits are often career-focused students who want the city life rather than the traditional Lincoln campus."
);

DB["University of Nebraska–Kearney"] = create(
  "UN Kearney", "Kearney, NE", "Public", "86%", "Safety", "3.1+", "1000-1200", "$7k/$13k",
  ["Education", "Business", "Health Sciences", "Industrial Tech"],
  "Lopers. Undergraduate focus. Safe, residential, rural.",
  "Friendly, rural, future teachers. 'Lopers' (Antelopes).",
  "Health Science dominance—placement into UNMC is high.",
  ["UNK", "Kearney"],
  "UNK is the undergraduate residential hub of central Nebraska. It is safe, friendly, and focused entirely on undergrads. It is a major feeder for the UN Medical Center, so pre-health competition is surprisingly stiff. Admits are often from rural Nebraska, valuing community and safety."
);

DB["Nebraska Wesleyan University"] = create(
  "Nebraska Wesleyan", "Lincoln, NE", "Private", "70%", "Moderate", "3.5+", "1040-1260", "$38,000",
  ["Biology", "Theatre", "Nursing", "Business"],
  "Methodist roots. Lincoln location. High med-school placement.",
  "Academic, supportive, spirited. 'Prairie Wolves'.",
  "86% medical school placement rate. Theatre is also elite.",
  ["NWU", "Wesleyan"],
  "Nebraska Wesleyan is located in Lincoln but feels worlds away from the massive UNL. It is famous for its insane medical school placement rates and a top-tier theatre program. Admits are often high-achieving students who want a smaller, more personal alternative to the big state school down the street."
);

DB["Chadron State College"] = create(
  "Chadron State College", "Chadron, NE", "Public", "100%", "Safety", "3.0+", "Test Blind", "$6k/$7k",
  ["Education", "Rangeland Management", "Business", "Justice Studies"],
  "Pine Ridge escapement. Outdoorsy. Rural isolation. Affordable.",
  "Rugged, outdoorsy, independent. 'Eagles'.",
  "Rangeland Management program is unique to the geography.",
  ["Chadron State", "CSC"],
  "Chadron State is in the Pine Ridge of northwest Nebraska—a rugged, beautiful landscape. It is the only four-year college for hundreds of miles. Admits are independent, rugged, and love the outdoors. The Rangeland Management program takes advantage of the unique geography."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 33: FLORIDA REGIONALS
// ==========================================

DB["University of West Florida"] = create(
  "UWF", "Pensacola, FL", "Public", "48%", "Moderate", "3.6+ W", "1060-1280", "$6k/$19k",
  ["Marine Biology", "Archaeology", "Cybersecurity", "Nursing"],
  "Historic Pensacola. Argo mascot. Marine archaeology. Beach life.",
  "Explorers, beach-lovers, history buffs. 'Argos'.",
  "Maritime Archaeology program is elite due to shipwrecks nearby.",
  ["UWF", "West Florida"],
  "UWF is located in Pensacola, deep in the Florida Panhandle. It has access to some of the best beaches in the world. It is famous for Maritime Archaeology (exploring shipwrecks). Admits are often relaxed, nature-loving students who want a smaller, personal Florida public university."
);

DB["Florida Gulf Coast University"] = create(
  "FGCU", "Fort Myers, FL", "Public", "74%", "Moderate", "3.5+ W", "1060-1260", "$6k/$25k",
  ["Resort Management", "Marine Science", "Business", "Nursing"],
  "Dunk City. Resort vibes. Growth. Sustainability.",
  "Active, sunny, entrepreneurial. 'Eagles'.",
  "Resort & Hospitality Management is a flagship program.",
  ["FGCU", "Gulf Coast"],
  "FGCU is famously known as 'Dunk City' for its basketball exploits. The campus feels like a resort, complete with its own beach on a lake. It is young, modern, and growing fast. Admits are often looking for the Florida lifestyle combined with practical degrees like Hospitality/Resort Management."
);

DB["Florida Polytechnic University"] = create(
  "Florida Poly", "Lakeland, FL", "Public", "56%", "Hard", "3.9+ W", "1290-1460", "$5k/$21k",
  ["Computer Engineering", "Data Science", "Physics", "Mechanical Engineering"],
  "STEM only. Futurism architecture. Calatrava building. Coding.",
  "Innovators, tech-obsessed, quiet. 'Phoenixes'.",
  "The only ALL-STEM public university in Florida.",
  ["Florida Poly"],
  "Florida Poly is the newest university in the system, dedicated 100% to STEM. The main building (designed by Calatrava) looks like a spaceship. It is small, focused, and intense. Admits are tech-obsessed students who want no distractions from coding and engineering."
);

DB["Florida A&M University"] = create(
  "FAMU", "Tallahassee, FL", "Public", "32%", "Hard", "3.8+ W", "1080-1250", "$6k/$18k",
  ["Pharmacy", "Journalism", "Business", "Architecture"],
  "#1 Public HBCU. The Marching 100. Cultural powerhouse. Excellence.",
  "Leaders, culturally proud, ambitious. 'Rattlers'.",
  "Top-ranked public HBCU in the nation for years running.",
  ["FAMU", "A&M"],
  "FAMU is the #1 ranked public HBCU in America. Located in Tallahassee (on the highest of seven hills), it is a cultural and academic powerhouse. The 'Marching 100' band is legendary. The School of Pharmacy and Journalism are top-tier. Admits are ambitious and culturally engaged."
);

DB["Barry University"] = create(
  "Barry University", "Miami, FL", "Private", "60%", "Moderate", "3.1+", "Test Blind", "$32,000",
  ["Nursing", "Social Work", "Education", "Podiatry"],
  "Catholic (Dominican). Tropical campus. Service. Diverse.",
  "Service-minded, diverse, friendly. 'Buccaneers'.",
  "School of Podiatric Medicine is one of the few in the US.",
  ["Barry"],
  "Barry is a Catholic university in Miami Shores with a tropical, palm-tree filled campus. It is one of the most diverse universities in the South. It is famous for health sciences, particularly Podiatry (foot medicine) and Nursing. Admits often value social justice and community service."
);

DB["Nova Southeastern University"] = create(
  "Nova Southeastern", "Fort Lauderdale, FL", "Private", "76%", "Moderate", "3.6+ W", "1080-1320", "$36,000",
  ["Marine Biology", "Osteopathic Medicine (DO)", "Law", "Business"],
  "Shark research. Massive health professions division. Modern.",
  "Ambitious, pre-med, coastal. 'Sharks'.",
  "Direct-admit Dual Admission programs (med/law) are the huge draw.",
  ["NSU", "Nova"],
  "NSU is a research heavy-weight in Fort Lauderdale. It is the place to go for Marine Biology (it has its own Oceanographic Center) or Medicine (it produces more doctors than any other university in FL). The 'Dual Admission' programs are a massive draw for pre-meds. Admits are career-focused 'Sharks'."
);

DB["University of Tampa"] = create(
  "University of Tampa", "Tampa, FL", "Private", "53%", "Moderate", "3.5+", "1170-1320", "$32,000",
  ["International Business", "Marine Science", "Criminology", "Marketing"],
  "Downtown Tampa. The Minarets. Riverwalk. Cosmopolitan.",
  "Urban, fit, social, business-minded. 'Spartans'.",
  "Sykes College of Business is AASCB accredited and elite.",
  ["UT", "Tampa"],
  "UT is located right in downtown Tampa, recognizable by the iconic silver minarets of Plant Hall. It attracts a massive number of students from the Northeast (NJ/NY/MA) looking for sun and city life. It is not a quiet campus; it is urban, active, and business-focused."
);

DB["Eckerd College"] = create(
  "Eckerd College", "St. Petersburg, FL", "Private", "65%", "Moderate", "3.4+", "1130-1340", "$50,000",
  ["Marine Science", "Environmental Studies", "Creative Writing", "International Relations"],
  "Waterfront campus. Pet friendly. Yellow Bikes. Marine Science powerhouse.",
  "Eco-friendly, beachy, intellectual. 'Tritons'.",
  "Marine Science lab is literally on the bay. You can bring pets.",
  ["Eckerd"],
  "Eckerd is arguably the premier Marine Science liberal arts college. Located on the water in St. Pete, it has its own search and rescue team. It is famously pet-friendly (bring your dog/snake). Admits are eco-warriors who wear flip-flops but are serious about science."
);

DB["Ringling College of Art and Design"] = create(
  "Ringling College", "Sarasota, FL", "Private", "64%", "Hard", "3.3+", "Test Blind", "$53,000",
  ["Computer Animation", "Illustration", "Game Art", "Film"],
  "Disney pipeline. Animation powerhouse. Visual arts only.",
  "Creatives, animators, dedicated. 'Armadillos'.",
  "Computer Animation program is often ranked #1 in the world.",
  ["Ringling"],
  "Ringling is the Harvard of Computer Animation. If you watch a Pixar or Disney movie, Ringling grads worked on it. It is an intense, visually focused art school. There are no sports, just art. Admits are incredibly talented visual artists building world-class portfolios."
);

DB["Flagler College"] = create(
  "Flagler College", "St. Augustine, FL", "Private", "74%", "Moderate", "3.4+", "1060-1250", "$24,000",
  ["Public Administration", "Business", "Education", "Coastal Environmental Science"],
  "Hogwarts in Florida (Ponce de Leon Hotel). Historic. Coastal.",
  "History buffs, beach-goers, aesthetic. 'Saints'.",
  "The main building is a gilded age hotel. It is stunning.",
  ["Flagler"],
  "Flagler's campus is the historic Ponce de Leon Hotel in St. Augustine. It is stunningly beautiful—living there feels like a movie. The vibe is laid back, coastal, and historic. Tuition is surprisingly low for a private college. Admits are often aesthetic-driven students who love the beach and history."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 34: GEORGIA REGIONALS
// ==========================================

DB["Georgia College & State University"] = create(
  "GCSU", "Milledgeville, GA", "Public", "61%", "Moderate", "3.6+", "1100-1280", "$9k/$28k",
  ["Nursing", "Business", "Education", "Psychology"],
  "Georgia's public liberal arts college. Historic capital. Southern charm.",
  "Polished, friendly, academic. 'Bobcats'.",
  "Designated as the state's public liberal arts university.",
  ["GCSU", "Milledgeville"],
  "GCSU is unique: it is the public liberal arts university of Georgia. Located in the historic capital Milledgeville, the campus is full of white columns and green lawns. It feels like a private college but at a public price. Admits are often high-achieving students who want a classic Southern college experience."
);

DB["Valdosta State University"] = create(
  "Valdosta State University", "Valdosta, GA", "Public", "76%", "Moderate", "3.2+", "Test Blind", "$6k/$17k",
  ["Business", "Nursing", "Criminal Justice", "Communication"],
  "South Georgia flagship. Spanish Mission architecture. Palms.",
  "Social, spirited, southern. 'Blazers'.",
  "Titletown USA—football is huge here.",
  ["VSU", "Valdosta"],
  "Valdosta State brings the heat—literally. Located on the FL border, it features stunning Spanish Mission architecture and palm trees. It is the educational and cultural hub of South Georgia. Football is religion here. Admits are spirited, social, and looking for a true campus life."
);

DB["University of West Georgia"] = create(
  "University of West Georgia", "Carrollton, GA", "Public", "70%", "Moderate", "3.1+", "Test Blind", "$6k/$17k",
  ["Psychology", "Criminology", "Nursing", "Education"],
  "Go West. Humanistic Psychology (unique). Growing fast.",
  "Diverse, open-minded, growing. 'Wolves'.",
  "One of only two universities in the US with a Humanistic Psychology focus.",
  ["UWG", "West Georgia"],
  "UWG is growing rapidly. It is famous in academic circles for its unique 'Humanistic Psychology' program (alternative to the standard clinical approach). The campus is diverse and energetic. Admits are often first-generation students essentially building the future of the Atlanta metro area."
);

DB["Columbus State University"] = create(
  "Columbus State University", "Columbus, GA", "Public", "78%", "Moderate", "3.0+", "Test Blind", "$6k/$17k",
  ["Theatre", "Music", "Cybersecurity", "Nursing"],
  "RiverPark campus (Arts). Schwob School of Music. Urban/Suburban mix.",
  "Artistic, musical, city-focused. 'Cougars'.",
  "Schwob School of Music is internationally renowned.",
  ["CSU", "Columbus State"],
  "Columbus State is a tale of two campuses: the main suburban campus and the RiverPark arts campus in downtown Columbus. The Schwob School of Music is elite, attracting talent globally. Admits are often musicians or theatre students who love the integrated city-arts vibe."
);

DB["Savannah College of Art and Design"] = create(
  "SCAD", "Savannah, GA", "Private", "82%", "Moderate", "3.3+", "1080-1280", "$40,000",
  ["Fashion", "Animation", "Interior Design", "Film"],
  "The University for Creative Careers. Historic Savannah is the campus. Bee mascot.",
  "Stylish, creative, indefatigable. 'Bees'.",
  "They own Savannah. Restored buildings everywhere. Career focus is obsessive.",
  ["SCAD"],
  "SCAD doesn't have a campus; Savannah IS the campus. They have bought and restored dozens of historic buildings. The vibe is incredibly aesthetic and fashionable—students dress to impress. It is laser-focused on 'Creative Careers', not 'starving artists'. Admits are hustlers with a vision."
);

DB["Oglethorpe University"] = create(
  "Oglethorpe University", "Atlanta, GA", "Private", "67%", "Moderate", "3.5+ W", "1100-1320", "$44,000",
  ["Business", "Communications", "Theatre", "Biology"],
  "Gothic architecture (Hogwarts). Core Curriculum. Brookhaven location.",
  "Intellectual, curious, city-adjacent. 'Stormy Petrels'.",
  "The Core Curriculum is distinct and rigorous.",
  ["Oglethorpe"],
  "Oglethorpe looks like a medieval castle dropped into Brookhaven (Atlanta). Its 'Core Curriculum' is famous for reading the great books. The mascot (Stormy Petrel) is unique. Admits are often intellectual or theatre kids who want a small, safe community with easy access to big-city Atlanta."
);

DB["Piedmont University"] = create(
  "Piedmont University", "Demorest, GA", "Private", "66%", "Moderate", "3.3+", "Test Blind", "$29,000",
  ["Nursing", "Education", "Theatre", "Business"],
  "North Georgia mountains. Intimate. Teacher producer. Lions.",
  "Community-focused, rural, friendly. 'Lions'.",
  "Massive producer of teachers for North Georgia.",
  ["Piedmont"],
  "Piedmont is nestled in the foothills of the North Georgia mountains. It is quiet, safe, and intimate. It has a long history of producing excellent teachers and nurses for the region. Admits are typically community-focused students who prefer the mountains to the city traffic."
);

DB["Brenau University"] = create(
  "Brenau University", "Gainesville, GA", "Private", "89%", "Moderate", "3.2+", "Test Blind", "$32,000",
  ["Nursing", "Occupational Therapy", "Dance", "Fashion"],
  "Women's College (Residential). Health Sciences. Arts.",
  "Empowered, artistic, health-focused. 'Golden Tigers'.",
  "The Women's College is the heart, but they have co-ed graduate programs.",
  ["Brenau"],
  "Brenau is best known for its historic Women's College in Gainesville. It empowers women in fields from Fashion Design to Occupational Therapy. The health science programs are robust. Admits are often looking for the sisterhood and support of a women's college environment."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 35: NORTH CAROLINA REGIONALS
// ==========================================

DB["Western Carolina University"] = create(
  "Western Carolina University", "Cullowhee, NC", "Public", "79%", "Moderate", "3.4+", "1040-1230", "$4k/$8k",
  ["Engineering", "Education", "Nursing", "Forensic Science"],
  "NC Promise ($500 tuition). Smoky Mountains. Pride of the Mountains band.",
  "Outdoorsy, spirited, budget-conscious. 'Catamounts'.",
  "NC Promise makes tuition incredibly cheap ($500/semester for in-state).",
  ["WCU", "Western"],
  "WCU is located deep in the Smoky Mountains—the campus is breathtaking. It is an NC Promise school, meaning tuition is radically affordable. The 'Pride of the Mountains' marching band is the biggest and baddest in the land. Admits are outdoorsy students who want great value."
);

DB["UNC Greensboro"] = create(
  "UNC Greensboro", "Greensboro, NC", "Public", "91%", "Moderate", "3.3+", "1050-1230", "$7k/$22k",
  ["Nursing", "Business", "Psychology", "Music"],
  "Diverse. Artsy. LGBT friendly. Research active.",
  "Diverse, creative, welcoming. 'Spartans'.",
  "School of Nursing and School of Music are both standouts.",
  ["UNCG"],
  "UNCG is one of the most diverse universities in the UNC system. It has a strong reputation for the arts (Music/Theatre) and Nursing. The vibe is incredibly welcoming, inclusive, and a bit artsy. Admits are often looking for a supportive community in a mid-sized city."
);

DB["North Carolina A&T State University"] = create(
  "NC A&T", "Greensboro, NC", "Public", "56%", "Moderate", "3.2+", "1030-1190", "$6k/$20k",
  ["Engineering", "Agriculture", "Business", "Journalism"],
  "Largest HBCU in US. 'GHOE' (Greatest Homecoming on Earth). Engineering powerhouse.",
  "Proud, ambitious, engineers, leaders. 'Aggies'.",
  "Produces more Black engineers than any other campus in America.",
  ["NC A&T", "A&T", "Aggies"],
  "NC A&T is the largest HBCU in the country and an engineering giant. It is simply 'Aggie Pride'. Homecoming (GHOE) is a national cultural event. It is a STEM powerhouse disguised as a party. Admits are ambitious, culturally proud, and ready to work hard."
);

DB["North Carolina Central University"] = create(
  "NC Central", "Durham, NC", "Public", "77%", "Moderate", "3.1+", "950-1120", "$6k/$19k",
  ["Criminal Justice", "Psychology", "Business", "Law"],
  "Eagle Pride. Durham location. Law School. Truth and Service.",
  "Service-minded, resilient, leaders. 'Eagles'.",
  "Has its own Law School—rare for an HBCU.",
  ["NCCU", "Central"],
  "NCCU is in the heart of Durham. It was the first public liberal arts institution for African Americans. It has a highly respected Law School and Criminal Justice program. The motto 'Truth and Service' is taken seriously. Admits are often future lawyers and community leaders."
);

DB["Winston-Salem State University"] = create(
  "Winston-Salem State", "Winston-Salem, NC", "Public", "73%", "Moderate", "3.0+", "Test Blind", "$6k/$16k",
  ["Nursing", "Healthcare Management", "Psychology", "Education"],
  "Healthcare focused HBCU. 'Rams'. Community minded.",
  "Healthcare-focused, caring, spirited. 'Rams'.",
  "Nursing program is massive and highly competitive.",
  ["WSSU"],
  "WSSU is a healthcare engine. It produces a massive number of nurses and health professionals for North Carolina. The vibe is close-knit and supportive ('Ramily'). Admits are overwhelmingly focused on joining the healthcare workforce to serve their communities."
);

DB["Fayetteville State University"] = create(
  "Fayetteville State", "Fayetteville, NC", "Public", "81%", "Safety", "2.9+", "Test Blind", "$5k/$17k",
  ["Nursing", "Psychology", "Criminal Justice", "Business"],
  "Military connected (Fort Liberty). Affordable. Resilience.",
  "Resilient, military-friendly, determined. 'Broncos'.",
  "Huge ties to the military/veteran community due to location.",
  ["FSU", "Fayetteville State"],
  "Fayetteville State is closely tied to Fort Liberty (formerly Bragg), making it incredibly military-friendly. It is an NC Promise school (very cheap). The Nursing and Psychology programs are popular. Admits are often veterans, military dependents, or resilient local students."
);

DB["Campbell University"] = create(
  "Campbell University", "Buies Creek, NC", "Private", "87%", "Moderate", "3.2+", "1040-1250", "$38,000",
  ["Pharmacy", "Law", "Business", "Engineering"],
  "Rural Baptist roots. Professional schools (Law/Med/Pharm). The Creek.",
  "Faith-based, professional, friendly. 'Camels'.",
  "Home to Law, Pharmacy, Osteopathic Medicine, and Engineering schools.",
  ["Campbell"],
  "Campbell is the only university with a 'Camel' mascot. Located in rural Buies Creek, it has transformed into a professional school cluster (Law, Med, Pharmacy, Divinity). It retains a friendly, Baptist-influenced culture. Admits are often future rural doctors, lawyers, and pharmacists."
);

DB["Wingate University"] = create(
  "Wingate University", "Wingate, NC", "Private", "86%", "Moderate", "3.2+", "Test Blind", "$40,000",
  ["Pharmacy", "Sport Management", "Nursing", "Biology"],
  "Near Charlotte. Lab of Difference. Health Sciences.",
  "Active, suburban, health-focused. 'Bulldogs'.",
  "Pharmacy school is a major draw for undergrads.",
  ["Wingate"],
  "Wingate is a small powerhouse just outside Charlotte. It creates value by offering doctoral programs (Pharmacy, PT) right on campus. It markets itself as a 'Lab of Difference'. Admits are often student-athletes (popular D2 sports) or pre-health students."
);

DB["Meredith College"] = create(
  "Meredith College", "Raleigh, NC", "Private", "74%", "Moderate", "3.4+", "1050-1240", "$42,000",
  ["Interior Design", "Biology", "Psychology", "Business"],
  "Women's College. Going Strong. Raleigh connections.",
  "Confident, polished, ambitious women. 'Avenging Angels'.",
  "Interior Design and STEM programs are highly rated.",
  ["Meredith"],
  "Meredith is a historic women's college in Raleigh. Their motto 'Going Strong' reflects the culture of confidence building. The mascot (Avenging Angels) is one of the best. It has strong ties to the Research Triangle functionality. Admits are ambitious women building a professional network."
);

DB["Queens University of Charlotte"] = create(
  "Queens University", "Charlotte, NC", "Private", "77%", "Moderate", "3.4+", "Test Blind", "$40,000",
  ["Nursing", "Business", "Communication", "Biology"],
  "Myers Park location (wealthy/beautiful). Internship guarantee.",
  "Polished, urban-connected, business-minded. 'Royals'.",
  "Every student is guaranteed an internship.",
  ["Queens", "Queens Charlotte"],
  "Queens sits in Myers Park, one of the most beautiful neighborhoods in Charlotte. It feels elite and intimate. They guarantee an internship for every student, leveraging the Charlotte banking hub. Admits are polished, career-ready students who want the city life with a small campus feel."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 36: SC & WV REGIONALS
// ==========================================

DB["The Citadel"] = create(
  "The Citadel", "Charleston, SC", "Public", "99%", "Moderate", "3.4+", "1050-1240", "$13k/$36k",
  ["Business", "Civil Engineering", "Criminal Justice", "Intelligence"],
  "Military College within SC. The Knob Year. Discipline. Honor.",
  "Disciplined, honorable, thick-skinned. 'Bulldogs'.",
  "It is a Senior Military College. You wear a uniform. It is not for everyone.",
  ["The Citadel"],
  "The Citadel is not a normal college. It is a Senior Military College. Freshmen ('Knobs') have a grueling first year of discipline. It produces business leaders and military officers with a distinct code of honor. Admits are disciplined, patriotic, and seeking a challenge unlike any other."
);

DB["Coastal Carolina University"] = create(
  "Coastal Carolina", "Conway, SC", "Public", "79%", "Moderate", "3.2+", "1020-1210", "$11k/$27k",
  ["Marine Science", "PGA Golf Management", "Business", "Communication"],
  "Teal turf. Near Myrtle Beach. Growing fast. Spirited.",
  "Social, beach-loving, spirited. 'Chanticleers'.",
  "Marine Science and Golf Management (PGA) are elite niche majors.",
  ["Coastal", "CCU"],
  "Coastal is famous for its 'Teal Turf' football field and its proximity to Myrtle Beach. The mascot (Chanticleer) is unique. It attracts students from all over the East Coast who want a modern, sunny, social college experience. The Marine Science program is legitimately top-tier."
);

DB["Winthrop University"] = create(
  "Winthrop University", "Rock Hill, SC", "Public", "70%", "Moderate", "3.4+", "1010-1220", "$16k/$30k",
  ["Design", "Education", "Business", "Biology"],
  "Diverse. Artsy. Near Charlotte. Historic campus.",
  "Diverse, creative, friendly. 'Eagles'.",
  "Visual Design and Teacher Education are historic strengths.",
  ["Winthrop"],
  "Winthrop is often called the most diverse public university in SC. Located in Rock Hill (a Charlotte suburb), it has a strong reputation for Visual Arts/Design and Education. The campus is beautiful and walkable. Admits are often creative, inclusive, and community-oriented."
);

DB["South Carolina State University"] = create(
  "SC State", "Orangeburg, SC", "Public", "84%", "Safety", "2.9+", "Test Blind", "$11k/$21k",
  ["Nuclear Engineering", "Business", "Biology", "Education"],
  "HBCU. Only undergraduate Nuclear Engineering program in SC.",
  "Ambitious, STEM-focused, proud. 'Bulldogs'.",
  "Nuclear Engineering program is a massive, unique standout.",
  ["SC State", "SCSU"],
  "SC State is SC's only public HBCU. Uniquely, it has the state's only undergraduate Nuclear Engineering program (due to nearby Savannah River Site). It has a proud history of civil rights activism. Admits are often STEM-focused students looking for a supportive HBCU environment."
);

DB["Presbyterian College"] = create(
  "Presbyterian College", "Clinton, SC", "Private", "70%", "Moderate", "3.4+", "1040-1260", "$43,000",
  ["Pharmacy", "Biology", "History", "Business"],
  "The Blue Hose. Pharmacy School. Honor Code. Small town.",
  "Honorable, close-knit, pre-health. 'Blue Hose'.",
  "The nickname 'Blue Hose' is legendary. Pharmacy school is a draw.",
  ["Presbyterian", "PC"],
  "PC is one of the smallest D1 schools in the nation. Located in tiny Clinton, SC, it is famous for its Honor Code and its strange nickname (Blue Hose). The School of Pharmacy offers a doctoral path. Admits are community-lovers who want a college where everyone knows their name."
);

DB["Marshall University"] = create(
  "Marshall University", "Huntington, WV", "Public", "97%", "Safety", "3.2+", "Test Blind", "$8k/$19k",
  ["Forensic Science", "Medicine", "Business", "Education"],
  "We Are Marshall (Movie). Resilient. Forensic Science leader.",
  "Resilient, gritty, loyal. 'Thundering Herd'.",
  "Forensic Science graduate program is #1 or #2 in the US commonly.",
  ["Marshall"],
  "Marshall is defined by its resilience (the 1970 plane crash and recovery). 'We Are Marshall' isn't just a movie; it's the culture. It is a research university with a friendly, gritty vibe. The Forensic Science program is nationally elite. Admits are loyal and community-proud."
);

DB["West Virginia State University"] = create(
  "West Virginia State", "Institute, WV", "Public", "96%", "Safety", "2.8+", "Test Blind", "$8k/$13k",
  ["Business", "Criminal Justice", "Education", "Biology"],
  "HBCU (Land Grant). Diverse. Affordable. Valley location.",
  "Diverse, local, practical. 'Yellow Jackets'.",
  "An HBCU with a very diverse (majority white) student body today.",
  ["WV State", "WVSU"],
  "WVSU is a historically black university that has evolved into a uniquely diverse, multicultural campus serving the Kanawha Valley. It is incredibly affordable and focuses on undergraduate research. Admits are often first-generation students from the region seeking opportunity."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 37: VIRGINIA REGIONALS
// ==========================================

DB["Old Dominion University"] = create(
  "Old Dominion University", "Norfolk, VA", "Public", "95%", "Moderate", "3.3+", "1020-1230", "$11k/$30k",
  ["Oceanography", "Engineering", "Nursing", "Cybersecurity"],
  "Coastal. Navy ties. Diverse. Research active. Floating dorms (legend).",
  "Diverse, coastal, resilient. 'Monarchs'.",
  "Deep ties to the Navy and NATO (Simulation/Modulation).",
  ["ODU", "Old Dominion"],
  "ODU is Hampton Roads' research university. It is heavily integrated with the Navy and the port, making its Oceanography and Supply Chain programs elite. The student body is very diverse and active. Admits are often pragmatic students who love the water and want real-world connections."
);

DB["Radford University"] = create(
  "Radford University", "Radford, VA", "Public", "93%", "Moderate", "3.2+", "Test Blind", "$11k/$23k",
  ["Nursing", "Education", "Criminal Justice", "Design"],
  "New River Valley. Highlands. Friendly. Teacher roots.",
  "Friendly, outdoorsy, caring. 'Highlanders'.",
  "Nursing and Allied Health are the biggest draws.",
  ["Radford"],
  "Radford sits beautifully in the New River Valley. It feels like a 'classic' college—brick buildings, green lawns, mountains nearby. It focuses heavily on teaching and nursing. Admits are stereotypically friendly and likely to hold the door open for you."
);

DB["Longwood University"] = create(
  "Longwood University", "Farmville, VA", "Public", "88%", "Moderate", "3.3+", "1030-1210", "$13k/$29k",
  ["Education", "Nursing", "Business", "Sociology"],
  "Citizen leadership. Historic. Teacher producer. Small town.",
  "Civic-minded, polite, future teachers. 'Lancers'.",
  "Founded as a teachers college; Education is still the soul.",
  ["Longwood"],
  "Longwood is famous for two things: hosting the VP debate in 2016 and producing great teachers. Located in historic Farmville, it emphasizes 'Citizen Leadership'. It has a very high placement rate for educators. Admits are often community-oriented extroverts."
);

DB["Christopher Newport University"] = create(
  "Christopher Newport University", "Newport News, VA", "Public", "85%", "Moderate", "3.6+ W", "1120-1320", "$15k/$28k",
  ["Business", "Political Science", "Biology", "Psychology"],
  "The Great Lawn. Liberal Arts distinct. Resume building. New facilities.",
  "Polished, ambitious, service-oriented. 'Captains'.",
  "Facilities are incredibly modern/new. Leadership Program is a standout.",
  ["CNU", "Christopher Newport"],
  "CNU is a public university that tries hard to feel like a private one. The campus is immaculate (the Great Lawn). The President's Leadership Program (PLP) attracts high achievers. Admits are typically polite, polished students who want a rigorous, values-based education."
);

DB["University of Mary Washington"] = create(
  "Mary Washington", "Fredericksburg, VA", "Public", "85%", "Moderate", "3.6+ W", "1120-1330", "$13k/$30k",
  ["Political Science", "Historic Preservation", "Psychology", "English"],
  "Public Liberal Arts. Historic Fredericksburg. No football. Intense.",
  "Intellectual, quirky, history-loving. 'Eagles'.",
  "Historic Preservation program is one of the best in the US.",
  ["UMW", "Mary Wash"],
  "UMW is the public liberal arts college of Virginia. Located in historic Fredericksburg (halfway between DC and Richmond), it is a haven for history buffs and political science students. It has no football team, so the culture is more artsy/intellectual than SEC."
);

DB["Hampden-Sydney College"] = create(
  "Hampden-Sydney College", "Hampden-Sydney, VA", "Private", "37%", "Hard", "3.5+", "1090-1280", "$49,000",
  ["Economics", "History", "Government", "Biology"],
  "All-male. The Rhetoric Program. Honor Code. Preppy.",
  "Gentlemen, articulate, honorable. 'Tigers'.",
  "One of only 3 all-male colleges left. Rhetoric proficiency is required.",
  ["H-SC", "Hampden-Sydney"],
  "Hampden-Sydney is an all-male college famous for turning boys into 'gentlemen'. The Rhetoric Program is mandatory, meaning every grad can write and speak persuasively. The vibe is traditional, preppy, and deeply southern. Admits value brotherhood and tradition."
);

DB["Randolph-Macon College"] = create(
  "Randolph-Macon College", "Ashland, VA", "Private", "84%", "Moderate", "3.4+", "1060-1250", "$46,000",
  ["Business", "Biology", "Communication", "Political Science"],
  "Ashland (Center of the Universe). Mentorship. Career focus.",
  "Connected, friendly, ambitious. 'Yellow Jackets'.",
  "The 'Edge' career center is heavily integrated into the curriculum.",
  ["R-MC", "Randolph-Macon"],
  "Randolph-Macon is in Ashland (a cute railroad town). It distinguishes itself with 'The Edge', a massive career preparation program for every student. It's the oldest Methodist college in the US. Admits are often students who want personal mentorship and a guaranteed career plan."
);

DB["Roanoke College"] = create(
  "Roanoke College", "Salem, VA", "Private", "81%", "Moderate", "3.3+", "1100-1300", "$49,000",
  ["Business", "Psychology", "Health Sciences", "History"],
  "Blue Ridge Mountains. Beautiful campus. Intellectual Inquiry.",
  "Inquisitive, active, friendly. 'Maroons'.",
  "Consistently ranked as one of the most beautiful campuses.",
  ["Roanoke"],
  "Roanoke College is set against the Blue Ridge Mountains in Salem. It is a classic residential liberal arts college. The Intellectual Inquiry (INQ) curriculum is the core. Admits are often students who want a beautiful setting, D3 sports, and close relationships with professors."
);

DB["Hollins University"] = create(
  "Hollins University", "Roanoke, VA", "Private", "75%", "Moderate", "3.5+", "Test Blind", "$41,000",
  ["Creative Writing", "English", "Psychology", "Dance"],
  "Women's College. Creative Writing powerhouse. Horses.",
  "Creative, literary, empowered women. 'Green and Gold'.",
  "Creative Writing MFA and undergrad program are world-famous.",
  ["Hollins"],
  "Hollins is a women's college famous for producing writers (Annie Dillard went here). The Creative Writing program is elite. The campus is full of riders (Equestrian team) and writers. Admits are often introspective, artistic, and finding their voice in a supportive sisterhood."
);

DB["Sweet Briar College"] = create(
  "Sweet Briar College", "Sweet Briar, VA", "Private", "76%", "Moderate", "3.4+", "Test Blind", "$23,000",
  ["Engineering", "Equine Studies", "Environmental Science", "Biology"],
  "Women's College. Massive campus (vineyards/stables). Engineering focus.",
  "Engineers, riders, leaders. 'Vixens'.",
  "One of only two ABET-accredited engineering programs at a women's college.",
  ["Sweet Briar"],
  "Sweet Briar came back from the dead (literally almost closed) to reinvent itself. It is a women's college on a massive 3,000-acre land. It focuses on Engineering, Sustainability, and Agriculture. Admits are gritty, hands-on women who might ride horses and build bridges in the same day."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 38: KENTUCKY & TENNESSEE REGIONALS
// ==========================================

DB["Western Kentucky University"] = create(
  "WKU", "Bowling Green, KY", "Public", "97%", "Moderate", "3.3+", "1020-1230", "$11k/$27k",
  ["Journalism", "Meteorology", "Education", "Engineering"],
  "Hilltoppers. Red Towel. Broadcasting/Journalism elite. The Hill.",
  "Spirited, communicators, energetic. 'Hilltoppers'.",
  "Journalism and Broadcasting programs are nationally top-ranked.",
  ["WKU", "Western Kentucky"],
  "WKU sits on 'The Hill' in Bowling Green. It is famous for its spirit (Red Towel) and its elite School of Media & Journalism. If you see a weatherman or broadcaster in the South, they probably went to WKU. Admits are energetic and school-spirited."
);

DB["Eastern Kentucky University"] = create(
  "EKU", "Richmond, KY", "Public", "64%", "Moderate", "3.2+", "950-1150", "$10k/$20k",
  ["Criminal Justice", "Forensic Science", "Fire Science", "Nursing"],
  "Justice & Safety powerhouse. Campus Beautiful. Bluegrass.",
  "Justice-minded, practical, local. 'Colonels'.",
  "College of Justice & Safety (Fire/Police) is the flagship.",
  ["EKU", "Eastern Kentucky"],
  "EKU is the 'Justice School'. Its programs in Criminal Justice, Fire Science, and Forensics are massive and respected nationwide. Located in the Bluegrass region, it serves the region. Admits are often future police officers, fire chiefs, and nurses."
);

DB["Northern Kentucky University"] = create(
  "NKU", "Highland Heights, KY", "Public", "86%", "Moderate", "3.2+", "1020-1220", "$10k/$20k",
  ["Informatics", "Business", "Health Science", "Law"],
  "Cincy suburb. Informatics (Cyber/Data). Commuter friendly.",
  "Tech-savvy, urban-adjacent, modern. 'Norse'.",
  "College of Informatics is a high-tech standout.",
  ["NKU", "Northern Kentucky"],
  "NKU is basically part of the Cincinnati metro area. It is modern and fast-paced. The College of Informatics (Cybersecurity, Data Science) is the crown jewel. Admits are often commuters or tech-focused students looking for jobs in the Cincy business corridor."
);

DB["Morehead State University"] = create(
  "Morehead State", "Morehead, KY", "Public", "77%", "Moderate", "3.1+", "1000-1200", "$9k/$14k",
  ["Space Science", "Education", "Veterinary Tech", "Music"],
  "Space Science Center (NASA ties). Rural. Folk/Bluegrass heritage.",
  "Dreamers, rural, specialized. 'Eagles'.",
  "Space Science program is shocking—they build satellites for NASA here.",
  ["Morehead"],
  "Morehead State is in rural Appalachia, but it builds satellites for NASA. The Space Science Center is world-class. It also celebrates its roots with the Kentucky Center for Traditional Music. Admits are a mix of local students and aerospace nerds drawn to the satellite dishes."
);

DB["Bellarmine University"] = create(
  "Bellarmine University", "Louisville, KY", "Private", "94%", "Moderate", "3.5+", "1080-1270", "$45,000",
  ["Physical Therapy", "Nursing", "Business", "Education"],
  "Catholic (Independent). The Highlands (cool neighborhood). Success focus.",
  "Polished, health-focused, friendly. 'Knights'.",
  "PT and Nursing are the magnets. Location in the Highlands is prime.",
  ["Bellarmine"],
  "Bellarmine is a Catholic university in 'The Highlands', the coolest neighborhood in Louisville. It feels like a private park. The focus is heavily on health professions (PT/Nursing). Admits are often polite, polished, and community-minded students."
);

DB["Transylvania University"] = create(
  "Transylvania University", "Lexington, KY", "Private", "91%", "Moderate", "3.5+", "1080-1320", "$42,000",
  ["Pre-Law", "Pre-Med", "Business", "Psychology"],
  "Pioneers. Historic. Downtown Lexington. Vampire jokes (ignored).",
  "Intellectual, urban, historic. 'Pioneers'.",
  "Oldest university west of the Alleghenies. Elite grad placement.",
  ["Transy", "Transylvania"],
  "Transylvania (Transy) is located right in downtown Lexington. It is the oldest university in Kentucky (Alma mater of Jefferson Davis and multiple VPs). Ignoring the vampire jokes, it is an elite liberal arts college with incredible medical/law school placement. Admits are smart, urban, and history-aware."
);

DB["Middle Tennessee State University"] = create(
  "MTSU", "Murfreesboro, TN", "Public", "73%", "Moderate", "3.2+", "1020-1230", "$9k/$28k",
  ["Audio Production", "Aerospace", "Concrete Industry", "Music Business"],
  "Music City feeder. Concrete Management (Unique). Aerospace.",
  "Music-industry hopefuls, pilots, builders. 'Blue Raiders'.",
  "Department of Recording Industry is one of the world's best.",
  ["MTSU", "Middle Tennessee"],
  "MTSU feeds the Nashville music machine. Its Audio Production and Music Business programs are world-famous. Strangely, it also has the nation's best 'Concrete Industry Management' program. Admits are often aspiring producers or pilots (huge Aerospace program)."
);

DB["East Tennessee State University"] = create(
  "East Tennessee State", "Johnson City, TN", "Public", "84%", "Moderate", "3.2+", "Test Blind", "$9k/$28k",
  ["Medicine", "Pharmacy", "Bluegrass Music", "Digital Media"],
  "Appalachian health hub. Bluegrass/Old Time Music degree. Mountains.",
  "Mountain-loving, health-focused, musicians. 'Buccaneers'.",
  "Only college with a Bluegrass, Old-Time, and Country Music degree.",
  ["ETSU", "East Tennessee"],
  "ETSU is the anchor of the Tri-Cities. It has a full medical and pharmacy school, driving a healthcare focus. But it's most famous for being the only school where you can major in Bluegrass Music. Admits love the mountains and often play the banjo or want to be rural doctors."
);

DB["Tennessee Tech University"] = create(
  "Tennessee Tech", "Cookeville, TN", "Public", "78%", "Moderate", "3.4+", "1080-1280", "$9k/$25k",
  ["Engineering", "Nursing", "Computer Science", "Education"],
  "STEM flagship of TN. Affordable. Cookeville (micropolitan).",
  "Engineers, practical, friendly. 'Golden Eagles'.",
  "Known as the primary engineering public school outside of UTK.",
  ["Tennessee Tech", "TTU"],
  "Tennessee Tech is the 'nerdy' public school of Tennessee in the best way. It produces top-tier engineers at a bargain price. Cookeville is a classic college town. Admits are problem-solvers who want a high-ROI degree without the massive size of UT Knoxville."
);

DB["University of Tennessee at Chattanooga"] = create(
  "UTC", "Chattanooga, TN", "Public", "82%", "Moderate", "3.3+", "1040-1240", "$9k/$25k",
  ["Business", "Nursing", "Engineering", "Psychology"],
  "Gig City. Urban. Outdoor adventure hub. Innovation.",
  "Urban, outdoorsy, connected. 'Mocs'.",
  "Chattanooga is a tech/outdoor boomtown, benefiting grads.",
  ["UTC", "Chattanooga"],
  "UTC sits in the heart of Chattanooga, the 'Gig City' (famous for fast internet and startups). It is also an outdoor mecca (climbing/hiking). The vibe is way cooler and more urban than most regional publics. Admits are hip, outdoorsy, and tech-aware."
);

DB["Lipscomb University"] = create(
  "Lipscomb University", "Nashville, TN", "Private", "71%", "Moderate", "3.5+", "1080-1300", "$36,000",
  ["Nursing", "Education", "Business", "Music"],
  "Christian (Church of Christ). Nashville location. Dove Awards.",
  "Faith-based, polite, musical. 'Bisons'.",
  "Deep ties to the Christian music industry in Nashville.",
  ["Lipscomb"],
  "Lipscomb is a faith-based university in the trendy Green Hills neighborhood of Nashville. It has deep roots in the Church of Christ. The College of Entertainment & the Arts is becoming a powerhouse. Admits are typically faith-centered students who want to break into the Nashville scene."
);

DB["Union University"] = create(
  "Union University", "Jackson, TN", "Private", "53%", "Moderate", "3.6+", "1090-1320", "$36,000",
  ["Nursing", "Theology", "Education", "Pharmacy"],
  "Excellence-driven Christ-centered. Intellectual Baptist.",
  "Serious, faithful, academic. 'Bulldogs'.",
  "Highly intellectual Christian environment. Pharmacy is strong.",
  ["Union"],
  "Union University is serious about being 'Excellence-Driven, Christ-Centered'. It is not a party school; it is for high-achieving Christian students, particularly in Nursing, Pharmacy, and Theology. The campus in Jackson is immaculate. Admits are disciplined and purpose-driven."
);

DB["Christian Brothers University"] = create(
  "CBU", "Memphis, TN", "Private", "87%", "Moderate", "3.2+", "Test Blind", "$35,000",
  ["Engineering", "Business", "Nursing", "Cybersecurity"],
  "Lasallian Catholic. Memphis ties. STEM focus. Diverse.",
  "Diverse, service-minded, practical. 'Buccaneers'.",
  "Strongest engineering private school in Memphis.",
  ["CBU", "Christian Brothers"],
  "CBU is a Lasallian Catholic university in Memphis. It is surprisingly strong in Engineering and STEM for a small liberal arts college. The ethos is 'Enter to Learn, Leave to Serve'. Admits are often diverse local students or engineering hopefuls looking for small classes."
);

DB["Lee University"] = create(
  "Lee University", "Cleveland, TN", "Private", "75%", "Moderate", "3.4+", "1030-1250", "$21,000",
  ["Theology", "Music", "Education", "Psychology"],
  "Church of God. Worship music hub. Voices of Lee. Service.",
  "Worshippers, faithful, musical. 'Flames'.",
  "Voices of Lee (a cappella) is world-famous. Music/Worship is the DNA.",
  ["Lee"],
  "Lee is a Christ-centered liberal arts campus known globally for its music and worship programs ('Voices of Lee'). Located near Chattanooga, it offers a faith-filled, spirited environment. Tuition is very low for a private college. Admits are often musicians or ministry-focused."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 39: ALABAMA & MISSISSIPPI REGIONALS
// ==========================================

DB["University of South Alabama"] = create(
  "University of South Alabama", "Mobile, AL", "Public", "65%", "Moderate", "3.4+", "1060-1260", "$9k/$18k",
  ["Nursing", "Medicine", "Business", "Engineering"],
  "Gulf Coast. Jaguar pride. Med school. Mardi Gras origin.",
  "Laid-back, coastal, health-focused. 'Jaguars'.",
  "It has its own extensive health system and medical school.",
  ["South Alabama", "USA"],
  "USA is located in Mobile, the true birthplace of Mardi Gras. It feels coastal and laid-back. It is the only major public health sciences hub on the Gulf Coast (owning multiple hospitals). Admits are often from the Gulf region, looking for pre-med or nursing in a warm climate."
);

DB["Troy University"] = create(
  "Troy University", "Troy, AL", "Public", "95%", "Moderate", "3.0+", "1030-1200", "$9k/$18k",
  ["Business", "Education", "Nursing", "Criminal Justice"],
  "Troy Trojans. International focus. Military friendly. Historic.",
  "Spirited, military-friendly, global. 'Trojans'.",
  "Known as 'Alabama's International University' due to massive international recruiting.",
  ["Troy"],
  "Troy University is famous for having a 'Trojan' spirit that rivals the big schools. It markets itself as Alabama's International University, attracting students from 75+ countries. It is also incredibly friendly to military/veterans. Admits are spirited and value a global perspective."
);

DB["Jacksonville State University"] = create(
  "Jacksonville State", "Jacksonville, AL", "Public", "76%", "Moderate", "3.1+", "Test Blind", "$10k/$20k",
  ["Education", "Nursing", "Criminal Justice", "Emergency Management"],
  "Gamecocks. Marching Southerners. Friendly. Appalachia foothills.",
  "Spirited, musical, friendly. 'Gamecocks'.",
  "The 'Marching Southerners' are one of the most famous bands in the US.",
  ["JSU", "Jacksonville State"],
  "JSU is located in the foothills of the Appalachians. It is famous for the 'Marching Southerners' (an elite marching band). It focuses on service professions: teachers, nurses, and police officers. Admits are often band kids or community-focused students from North Alabama."
);

DB["University of North Alabama"] = create(
  "University of North Alabama", "Florence, AL", "Public", "90%", "Moderate", "3.2+", "Test Blind", "$10k/$20k",
  ["Music Business", "Nursing", "Education", "Business"],
  "The Shoals (Music history). Leo the Lion (Live mascot). Historic.",
  "Creative, historic, roaring. 'Lions'.",
  "Located in Muscle Shoals/Florence area—Music Business program is huge.",
  ["UNA", "North Alabama"],
  "UNA is in Florence, part of the legendary Muscle Shoals music district. Consequently, its Music Business program is top-tier. It is the oldest public university in Alabama. They have actual live lions on campus. Admits are often creative students drawn to the musical heritage."
);

DB["Tuskegee University"] = create(
  "Tuskegee University", "Tuskegee, AL", "Private", "30%", "Hard", "3.3+", "Test Blind", "$23,000",
  ["Aerospace Engineering", "Animal Science", "Architecture", "Nursing"],
  "Booker T. Washington founding. Airmen history. Vet school. Royalty.",
  "Proud, historic, ambitious. 'Golden Tigers'.",
  "The only HBCU with a fully accredited College of Veterinary Medicine.",
  ["Tuskegee"],
  "Tuskegee is hallowed ground. Founded by Booker T. Washington, home to the Tuskegee Airmen. It has the only Vet School at an HBCU. It is STEM-focused and historically significant. Admits are joining a legacy of Black excellence and leadership."
);

DB["Alabama A&M University"] = create(
  "Alabama A&M", "Huntsville, AL", "Public", "70%", "Moderate", "2.9+", "Test Blind", "$10k/$19k",
  ["Engineering", "Agriculture", "Business", "Education"],
  "Huntsville (Rocket City). HBCU. STEM focus. The Hill.",
  "Tech-savvy, resilient, proud. 'Bulldogs'.",
  "Benefit from location in Huntsville (NASA/Defense hub).",
  ["AAMU", "Alabama A&M"],
  "Alabama A&M is located in Huntsville ('Rocket City'), providing massive opportunities for STEM majors. It is a land-grant HBCU on 'The Hill'. The Engineering and Agricultural programs are strong. Admits are often STEM-oriented students looking for a supportive HBCU culture."
);

DB["Spring Hill College"] = create(
  "Spring Hill College", "Mobile, AL", "Private", "72%", "Moderate", "3.4+", "Test Blind", "$21,000",
  ["Nursing", "Business", "Theology", "Biology"],
  "Jesuit. Oldest in South. Golf course on campus. Avenue of the Oaks.",
  "Faithful, friendly, southern. 'Badgers'.",
  "Oldest Catholic college in the Southeast. Tuition reset makes it affordable.",
  ["Spring Hill", "SHC"],
  "Spring Hill is 100% picturesque Southern Gothic—Spanish moss and the Avenue of the Oaks. It is a Jesuit college (highly academic) in Mobile. They drastically lowered tuition recently. Admits are often Catholic or spiritual students wishing for a thoughtful, beautiful college experience."
);

DB["Birmingham-Southern College"] = create(
  "Birmingham-Southern", "Birmingham, AL", "Private", "66%", "Moderate", "3.5+", "Test Blind", "$21,000",
  ["Business", "Psychology", "Biology", "History"],
  "Small liberal arts. Jan-Term. Intellectual. Close-knit.",
  "Intellectual, close-knit, resilient. 'Panthers'.",
  "Known as the 'Southern Ivy' of Alabama historically.",
  ["BSC", "Birmingham-Southern"],
  "BSC is a small, fierce liberal arts college in Birmingham. It has faced financial challenges but remains open with a dedicated alumni base. It offers an intellectually rigorous 'Jan-Term' and high medical school placement. Admits are fighters who value a classic liberal arts education."
);

DB["University of Southern Mississippi"] = create(
  "Southern Miss", "Hattiesburg, MS", "Public", "98%", "Moderate", "3.2+", "1060-1260", "$9k/$11k",
  ["Polymer Science", "Ocean Engineering", "Nursing", "Arts"],
  "To The Top. Polymer Science (World Class). Golden Eagles. Friendly.",
  "Friendly, gritty, specialized. 'Golden Eagles'.",
  "School of Polymer Science and Engineering is globally elite.",
  ["USM", "Southern Miss"],
  "Southern Miss is famous for one very specific, very elite thing: Polymer Science. If you want to invent new plastics or materials, you go here. It is also known for its friendliness and school spirit. Admits are often local students or materials science savants."
);

DB["Jackson State University"] = create(
  "Jackson State", "Jackson, MS", "Public", "62%", "Moderate", "3.1+", "Test Blind", "$9k/$20k",
  ["Biology", "Education", "Engineering", "Social Work"],
  "Sonic Boom of the South (Band). HBCU flagship. Walter Payton.",
  "Proud, spirited, urban. 'Tigers'.",
  "The 'Sonic Boom of the South' marching band is legendary.",
  ["JSU", "Jackson State"],
  "Jackson State is the urban HBCU flagship of Mississippi. Home to Walter Payton and the legendary 'Sonic Boom of the South'. It is a cultural icon. It produces a massive number of African American teachers and engineers for the state. Admits are proud and spirited."
);

DB["Millsaps College"] = create(
  "Millsaps College", "Jackson, MS", "Private", "68%", "Moderate", "3.5+", "1170-1360", "$41,000",
  ["Business", "Biology", "Pre-Law", "English"],
  "The Harvard of Mississippi. Writing intensive. Beautiful campus.",
  "Intellectual, writers, leaders. 'Majors'.",
  "Consistently ranked the best college in Mississippi.",
  ["Millsaps"],
  "Millsaps is the intellect's choice in Mississippi. It is a Methodist liberal arts college with a reputation for rigorous writing and thinking. The campus is a gated oasis in Jackson. Admits are often the 'smart kids' from around the state who want a serious education."
);

DB["Mississippi College"] = create(
  "Mississippi College", "Clinton, MS", "Private", "40%", "Moderate", "3.5+", "1080-1290", "$20,000",
  ["Nursing", "Education", "Business", "Biology"],
  "Baptist. Oldest in MS. Affordable private. Pre-med strong.",
  "Faithful, conservative, academic. 'Choctaws'.",
  "Strong Baptist identity. Medical school placement is very high.",
  ["Mississippi College", "MC"],
  "Mississippi College is the oldest university in the state and deeply Baptist. It is known for its affordability (for a private school) and its incredibly high medical school acceptance rates. Admits are typically faith-focused students who are serious about their studies."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 40: ARKANSAS & LOUISIANA REGIONALS
// ==========================================

DB["Arkansas State University"] = create(
  "Arkansas State", "Jonesboro, AR", "Public", "63%", "Moderate", "3.3+", "1030-1240", "$9k/$16k",
  ["Nursing", "Business", "Agriculture", "Criminology"],
  "Red Wolves. Delta region. Research growth. International campus (Mexico).",
  "Pack mentality, resilient, global. 'Red Wolves'.",
  "Only US university with a campus in Mexico (Querétaro).",
  ["A-State", "Arkansas State"],
  "A-State is the flagship of northeast Arkansas. It is surprisingly global, hosting a full campus in Querétaro, Mexico. The 'Red Wolves' brand is strong. It serves the Delta region with strong agricultural and nursing programs. Admits are community-focused and increasingly diverse."
);

DB["University of Central Arkansas"] = create(
  "UCA", "Conway, AR", "Public", "91%", "Moderate", "3.4+", "1040-1250", "$10k/$17k",
  ["Physical Therapy", "Nursing", "Education", "Film"],
  "The Center of Learning. Conway is the 'City of Colleges'. Purple.",
  "Academic, friendly, central. 'Bears'.",
  "Honors College is consistently ranked as one of the best in the nation.",
  ["UCA", "Central Arkansas"],
  "UCA claims to be 'The Center of Learning' in Arkansas. Located in Conway (a college town), it is famous for its Honors College, which feels like a private liberal arts experience within a public school. The striped purple football field is iconic. Admits are often high-achieving local students."
);

DB["Hendrix College"] = create(
  "Hendrix College", "Conway, AR", "Private", "60%", "Moderate", "3.6+", "1150-1360", "$50,000",
  ["Biology", "Psychology", "Politics", "Biochemistry"],
  "The Odyssey Program. Intellectual. Progressive bubble in AR. Intense.",
  "Intellectual, quirky, active. 'Warriors'.",
  "The Odyssey Program requires engaged learning experiences for graduation.",
  ["Hendrix"],
  "Hendrix is the intellectual jewel of Arkansas. It is known for the 'Odyssey Program', which mandates hands-on learning/travel. The culture is progressive, quirky, and intense ('Harvard of Arkansas'). Admits are smart, open-minded, and often go on to earn PhDs."
);

DB["Harding University"] = create(
  "Harding University", "Searcy, AR", "Private", "45%", "Moderate", "3.5+", "1080-1300", "$24,000",
  ["Nursing", "Education", "Bible", "Business"],
  "Church of Christ. Massive study abroad (HUG). Conservative. Service.",
  "Faithful, conservative, travelers. 'Bisons'.",
  "Harding University in Greece (HUG) is a rite of passage for many.",
  ["Harding"],
  "Harding is the largest private university in Arkansas and deeply Church of Christ. It is socially conservative (strict codes of conduct) but globally focused—the study abroad program is massive. Admits are generally looking for a faith-saturated environment and lifelong community."
);

DB["University of Louisiana at Lafayette"] = create(
  "UL Lafayette", "Lafayette, LA", "Public", "48%", "Moderate", "3.4+", "1050-1260", "$10k/$24k",
  ["Petroleum Engineering", "Nursing", "Computer Science", "Biology"],
  "Ragin' Cajuns. Heart of Acadiana. Culture. Food. Energy.",
  "Spirited, cultural, fun-loving. 'Ragin' Cajuns'.",
  "Only university with 'Cajun' culture as its identity. Petroleum Eng is elite.",
  ["ULL", "Lafayette", "Ragin Cajuns"],
  "ULL is the heart of Cajun country. The 'Ragin' Cajuns' spirit is unbeatable (and the food is better than your school's). It is a world leader in Petroleum Engineering and geology. Admits are often fun-loving, hardworking students who embrace the unique Acadiana culture."
);

DB["Louisiana Tech University"] = create(
  "Louisiana Tech", "Ruston, LA", "Public", "66%", "Moderate", "3.5+", "1100-1300", "$10k/$19k",
  ["Engineering", "Aviation", "Cyber Engineering", "Business"],
  "Quarter system. Engineering powerhouse. Ruston. Innovation.",
  "Engineers, innovators, fast-paced. 'Bulldogs'.",
  "First university in US to offer a Cyber Engineering degree.",
  ["LA Tech", "Louisiana Tech"],
  "Louisiana Tech is the Georgia Tech of the Delta. It runs on a grueling quarter system. It is famous for Engineering and was the first to offer Cyber Engineering. Located in rural Ruston, the campus is the center of life. Admits are serious students looking for high-tech careers."
);

DB["University of New Orleans"] = create(
  "University of New Orleans", "New Orleans, LA", "Public", "77%", "Moderate", "3.1+", "Test Blind", "$9k/$14k",
  ["Naval Architecture", "Film", "Hotel Management", "Jazz"],
  "Lakefront. Commuter/Urban. Naval Architecture is unique. Resilience.",
  "Resilient, urban, varied. 'Privateers'.",
  "Only Naval Architecture & Marine Engineering program in the region.",
  ["UNO", "New Orleans"],
  "UNO sits on the edge of Lake Pontchartrain. It is a lifeline for the city, offering unique programs like Naval Architecture and a direct pipeline into the NOLA film/hospitality industries. It is diverse and resilient. Admits are often 'Privateers' charting their own course in the city."
);

DB["Xavier University of Louisiana"] = create(
  "XULA", "New Orleans, LA", "Private", "95%", "Moderate", "3.3+", "1020-1210", "$26,000",
  ["Pharmacy", "Biology", "Chemistry", "Psychology"],
  "Catholic HBCU. Med School factory. Saint Katharine Drexel.",
  "Ambitious, faithful, scientists. 'Gold Rush'.",
  "#1 in the nation for placing African American students into Med School.",
  ["Xavier", "XULA"],
  "XULA is the only Catholic HBCU in the nation. It is a miracle worker: it consistently sends more African American students to medical school than any other university in the US. The pressure is high, the support is higher. Admits are laser-focused on becoming doctors and pharmacists."
);

DB["Centenary College of Louisiana"] = create(
  "Centenary College", "Shreveport, LA", "Private", "64%", "Moderate", "3.5+", "Test Blind", "$39,000",
  ["Biology", "Business", "Psychology", "Music"],
  "Centenary in Paris. Oldest chartered in LA. Small. Methodist.",
  "Global, close-knit, explorers. 'Ladies and Gents'.",
  "All first-year students go to Paris (Centenary in Paris) for free.",
  ["Centenary"],
  "Centenary is a tiny gem in Shreveport. To prove its global focus, it sends every single freshman to Paris, France, for an immersion class—included in tuition. It is the oldest college in Louisiana. Admits are adventurous students who want a personal, worldly education."
);

DB["Grambling State University"] = create(
  "Grambling State", "Grambling, LA", "Public", "42%", "Moderate", "2.9+", "Test Blind", "$8k/$17k",
  ["Criminal Justice", "Nursing", "Kinesiology", "Mass Communication"],
  "World Famed Tiger Marching Band. HBCU legend. Eddie Robinson.",
  "Proud, spirited, determined. 'Tigers'.",
  "Home of Eddie Robinson (legendary coach). Brand is globally recognized.",
  ["Grambling"],
  "Grambling State is one of the most famous brands in HBCU history. From the 'World Famed' Tiger Marching Band to Coach Eddie Robinson, it is royalty. It focuses on accessible education in criminal justice and nursing. Admits are joining a massive, proud legacy."
);











DB["University of South Carolina"] = create(
  "University of South Carolina", "Columbia, SC", "Public", "64%", "Moderate", "3.7+ W", "1180-1380", "$12k/$33k",
  ["International Business", "Sport Management", "Nursing", "Exercise Science"],
  "Honors College is #1 Public. International Business is #1. SEC spirit.",
  "Spirited, social, business-savvy. Honors students are elite (Ivy stats).",
  "Honors College app is separate and HIGHLY competitive.",
  ["South Carolina", "USC", "Gamecocks"],
  "USC (the East Coast one) is a tale of two schools. The general admit is spirited, social, and loves the SEC culture. But the Honors College admits are legitimate Ivy-caliber students who get incredible perks. The International Business program is the best in the nation, period. The campus is integrated into the capital city."
);

DB["Clemson University"] = create(
  "Clemson University", "Clemson, SC", "Public", "43%", "Hard", "4.0+ W", "1240-1440", "$15k/$38k",
  ["Engineering", "Business", "Nursing", "Architecture"],
  "Orange everywhere. Massive family feel. Football champions. Engineering hub.",
  "Passionate, friendly, spirited. 'All In'.",
  "Demonstrate 'All In' spirit. Legacy/Alumni connection is noted.",
  ["Clemson", "Tigers"],
  "Clemson is a family. The 'All In' motto isn't just marketing. Admits are friendly, fiercely loyal, and often wear orange daily. Academically, Engineering and Business are high-pressure and high-reward. The campus is located on a lake, adding to the idyll. It's less urban than USC, more of a self-contained college town."
);

DB["College of Charleston"] = create(
  "College of Charleston", "Charleston, SC", "Public", "75%", "Moderate", "3.6+ W", "1090-1270", "$12k/$34k",
  ["Marine Biology", "Business", "Historic Preservation", "Communication"],
  "Historic, stunningly beautiful, urban but charming. 'The Cistern'.",
  "Stylish, liberal arts minded, city lovers.",
  "Marine Bio and Historic Preservation match the location perfectly.",
  ["C of C", "Charleston"],
  "C of C is impossibly charming. Located in historic Charleston, the campus feels like a movie set. Admits are often drawn to the aesthetics and the city lifestyle. Academically, it functions like a public liberal arts college. Students are stylish, social, and take advantage of the coastal city location."
);

DB["Furman University"] = create(
  "Furman University", "Greenville, SC", "Private", "67%", "Moderate", "3.7+ W", "1240-1420", "$55,000",
  ["Health Sciences", "Politics", "Business", "Psychology"],
  "The 'Furman Advantage'. Beautiful lake campus. Rigorous liberal arts.",
  "Engaged scholars, pre-health focused, community leaders.",
  "Demonstrate interest! They care about fit and high engagement.",
  ["Furman", "Paladins"],
  "Furman is a jewel of the South. The 'Furman Advantage' guarantees a 4-year path with research and internships. Admits are often high-achieving students who want a close-knit community. The campus is stunning (bell tower by the lake). Students are friendly but academically serious—it's tougher than it looks."
);

DB["Wofford College"] = create(
  "Wofford College", "Spartanburg, SC", "Private", "60%", "Moderate", "3.6+ W", "1160-1340", "$50,000",
  ["Biology", "Business", "Finance", "Government"],
  "Tailgating is a religion. Intense academics, Study Abroad is huge.",
  "Preppy, ambitious, close-knit. 'Terriers'.",
  "Interview is recommended. Show you fit the tight community.",
  ["Wofford", "Terriers"],
  "Wofford is small, traditional, and rigorous. It punches way above its weight in placing graduates into med school and finance in the South. Greek life is massive (something like 80%). Admits are often 'work hard, play hard' types who love the intense community spirit and the mandatory study abroad culture."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 14: VIRGINIA & DMV
// ==========================================

DB["College of William & Mary"] = create(
  "William & Mary", "Williamsburg, VA", "Public", "33%", "Hard", "4.0+ W", "1300-1490", "$18k/$40k",
  ["Government", "International Relations", "Biology", "Business"],
  "The 'Public Ivy' with deep history. Intellectual, quirky, rigorous. 'The Tribe'.",
  "Intellectually curious, quirky, community-minded. Undergraduate research focus.",
  "Optional interview is highly recommended. Show 'quirky' intellect.",
  ["William & Mary", "W&M", "Tribe"],
  "William & Mary is for the truly intellectual. It is the second oldest college in the nation and feels like a private liberal arts college. Admits are often 'smart nerds' who love history, government, and research. Undergraduate research is the norm, not the exception. The vibe is supportive, quirky, and deeply collaborative."
);

DB["Virginia Tech"] = create(
  "Virginia Tech", "Blacksburg, VA", "Public", "57%", "Moderate", "3.9+ W", "1210-1410", "$14k/$33k",
  ["Engineering", "Business", "Architecture", "Computer Science"],
  "Ut Prosim (That I May Serve). Hokie Stone everywhere. Massive engineering + dining.",
  "Service-oriented, friendly, spirited. Engineering is huge.",
  "Engineering is distinct and harder. 'Ut Prosim' in essays is key.",
  ["Virginia Tech", "VT", "Hokies"],
  "Virginia Tech is famous for its food (ranked #1) and its friendly culture. 'Ut Prosim' (That I May Serve) is the motto and students live it. Admits to the College of Engineering were often top of their class. The beautiful Hokie Stone campus in the mountains fosters a fanatic loyalty. It's high-tech with a small-town heart."
);

DB["James Madison University"] = create(
  "JMU", "Harrisonburg, VA", "Public", "78%", "Moderate", "3.6+ W", "1120-1290", "$13k/$30k",
  ["Health Sciences", "Business", "Communication", "Education"],
  "Friendly, purple, Shenandoah Valley. 'JMU Dukes'. Unpretentious.",
  "Friendly, engaging, community-builders. Doors held open.",
  "Demonstrate you are a 'people person'.",
  ["JMU", "James Madison", "Dukes"],
  "JMU is practically defined by friendliness. Students hold doors for each other. Located in the Shenandoah Valley, it attracts students who want a balanced, happy college experience. The College of Business and College of Education are major pipelines. It's often voted 'Best Campus Food' and students are active and social."
);

DB["George Mason University"] = create(
  "George Mason University", "Fairfax, VA", "Public", "90%", "Moderate", "3.4+", "1100-1280", "$13k/$36k",
  ["Computer Science", "Government", "Criminology", "Cybersecurity"],
  "DC's massive suburban powerhouse. Diverse, commuter-friendly, policy hub.",
  "Diverse, career-focused, policy wonks. driven.",
  "Highlight proximity to DC for internships.",
  ["GMU", "Mason"],
  "Mason is a giant. Located just outside DC, it is a primary feeder for government agencies and contractors. Admits are incredibly diverse (majority non-white). Cybersecurity helping government agencies is a common track. It is a place for students who want to work while they learn, often taking Metro into the city."
);

DB["Virginia Commonwealth University"] = create(
  "VCU", "Richmond, VA", "Public", "91%", "Safety", "3.3+", "1060-1250", "$15k/$36k",
  ["Arts", "Business", "Psychology", "Health Administration"],
  "#1 Public Arts School. Urban, gritty, creative, diverse.",
  "Artists, creatives, urbanites. Independent.",
  "Art portfolio is world-class competitive.",
  ["VCU", "Rams"],
  "VCU is an art school wrapped in a research university. The School of the Arts is elite. Admits are creative, diverse, and love the urban, gritty vibe of Richmond. It is also a major medical hub. Students here are independent and often eccentric in the best way."
);

DB["University of Richmond"] = create(
  "University of Richmond", "Richmond, VA", "Private", "24%", "Hard", "3.8+ W", "1280-1460", "$60,000",
  ["Business", "Leadership Studies", "Politics", "Biology"],
  "Gorgeous campus. Jepson School of Leadership. Wealthy, preppy, rigorous.",
  "Ambitious leaders. Preppy and polished.",
  "Jepson School is unique—highlight interest in leadership.",
  ["Richmond", "Spiders"],
  "Richmond is stunning and wealthy. The 'Spiders' benefit from massive resources and the unique Jepson School of Leadership Studies. Admits are often polished, preppy, and ambitious, aiming for careers in law, finance, or politics. The campus is beautiful but can feel like a bubble; successful students break out into the city."
);

DB["Washington and Lee University"] = create(
  "Washington and Lee", "Lexington, VA", "Private", "17%", "Hard", "4.0+ W", "1410-1530", "$60,000",
  ["Business", "Economics", "Journalism", "Politics"],
  "Honor System is absolute. Greek life is 80%+. Historic, wealthy, rigorous.",
  "Gentleman/woman scholars. Honorable, social, elite.",
  "The Honor System is the core. You must address integrity.",
  ["W&L"],
  "W&L is steeped in tradition. The Honor System is so strong that exams are unproctored and students leave laptops unlocked. Admits are elite students who often fit a preppy, Greek-life profile (Greek participation is huge). The 'Speaking Tradition' (saying hi to everyone) makes the campus feel incredibly tight-knit but intense."
);

DB["Hampton University"] = create(
  "Hampton University", "Hampton, VA", "Private", "48%", "Moderate", "3.3+", "Test Blind", "$26,000",
  ["Business", "Psychology", "Journalism", "Marine Science"],
  "Coastal HBCU. 'The Real HU'. Historic, polished, disciplined.",
  "Refined, ambitious professionals. 'Hamptonians'.",
  "Professionalism is key. Leadership roles matter.",
  ["Hampton", "Pirates"],
  "Hampton is 'The Standard of Excellence'. As a prestigious HBCU on the water, admits are expected to be polished and professional (business attire is common for class presentations). The Scripps Howard School of Journalism is standout. Students are proud, disciplined, and hold themselves to high social and academic standards."
);

DB["University of Maryland Baltimore County"] = create(
  "UMBC", "Baltimore, MD", "Public", "81%", "Moderate", "3.6+ W", "1160-1360", "$12k/$28k",
  ["Computer Science", "Information Systems", "Biology", "Psychology"],
  "Chess champions. Meyerhoff Scholars (diversity in STEM). Nerd-chic.",
  "Smart, diverse, driven STEM students. 'Retrievers'.",
  "Meyerhoff Scholars program is world-famous. Apply if eligible.",
  ["UMBC", "Retrievers"],
  "UMBC is cool because it's smart. It is a powerhouse for producing Black M.D./Ph.D. graduates (via Meyerhoff Scholars). The vibe is 'nerdy and proud' (the Chess team defeats Ivies). Admits are focused on STEM and research. It's a commuter-heavy campus that values intelligence over athletics."
);

DB["Towson University"] = create(
  "Towson University", "Towson, MD", "Public", "79%", "Moderate", "3.4+", "1060-1240", "$10k/$25k",
  ["Business", "Education", "Nursing", "Computer Science"],
  "Largest university in Baltimore area. Practical, suburban, teacher-factory roots.",
  "Practical, social, career-ready. Future teachers/nurses.",
  "Great local connections for internships in Baltimore.",
  ["Towson", "Tigers"],
  "Towson is the engine of Baltimore's workforce. Admits are often local, practical students aiming for careers in education, healthcare, or business. The campus is bustling and suburban. It offers a solid, no-nonsense education with a spirited, increasingly residential student life."
);

DB["Loyola University Maryland"] = create(
  "Loyola Maryland", "Baltimore, MD", "Private", "83%", "Moderate", "3.5+ W", "1150-1330", "$53,000",
  ["Business", "Speech Pathology", "Communication", "Marketing"],
  "Jesuit, preppy, lush campus. Sellinger School of Business.",
  "Polished, service-oriented, preppy. 'Greyhounds'.",
  "Jesuit values (Cura Personalis) + Business ambition.",
  ["Loyola MD", "Greyhounds"],
  "Loyola Maryland balances Jesuit values with a preppy East Coast vibe. Admits are often from private/Catholic high schools in the Northeast. The Sellinger School of Business is the main draw. Students are friendly, neatly dressed, and active in service, but definitely enjoy a robust social life."
);

DB["University of Delaware"] = create(
  "University of Delaware", "Newark, DE", "Public", "74%", "Moderate", "3.6+ W", "1160-1350", "$13k/$34k",
  ["Chemical Engineering", "Business", "Nursing", "Education"],
  "Classic college town (Main St). Chemical Engineering excellence. Biden's alma mater.",
  "East Coast suburbanites. Spirited, nice, engineering/business focused.",
  "ChemE is Ivy-level hard. Honors college is a great target.",
  ["UD", "Delaware", "Blue Hens"],
  "UD is the quintessential mid-Atlantic state school. Newark's Main Street is iconic. Admits are often from NJ/NY/PA/DE. While general admission is moderate, Chemical Engineering is globally elite (DuPont heritage). Students are friendly, spirited 'Blue Hens' who love the classic campus feel."
);

DB["West Virginia University"] = create(
  "West Virginia University", "Morgantown, WV", "Public", "90%", "Safety", "3.2+", "1030-1220", "$9k/$25k",
  ["Engineering", "Forensic Science", "Nursing", "Business"],
  "Wild and Wonderful. Mountain spirit, burning couches (historically), strong engineering.",
  "Spirited, resilient, fun-loving. 'Mountaineers'.",
  "Engineering/Forensics are distinct standouts.",
  ["WVU", "West Virginia", "Mountaineers"],
  "WVU students bleed gold and blue. 'Country Roads' is the anthem. Behind the 'party school' reputation is a serious R1 research university, particularly in Engineering and Forensic Science (FBI partnership). Admits are unpretentious, spirited, and love the Appalachian setting. It's a place where everyone fits in."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 15: DEEP SOUTH (KY, TN, AL, MS, AR, LA)
// ==========================================

DB["University of Kentucky"] = create(
  "University of Kentucky", "Lexington, KY", "Public", "94%", "Safety", "3.4+", "1080-1280", "$13k/$32k",
  ["Business", "Nursing", "Engineering", "Communication"],
  "Basketball royalty. Bluegrass region. Friendly, spirited, massive Greek life.",
  "Spirited, social, loyal. 'Wildcats'.",
  "Honors college looks for leadership. Mention 'Big Blue Nation'.",
  ["UK", "Kentucky", "Wildcats"],
  "UK is the heartbeat of the state. 'Big Blue Nation' is a real thing. Admits are generally social, spirited, and friendly. The Nursing and Business colleges given the local economy are strong. It's a quintessential SEC experience (massive sports, Greek life) in a beautiful, horse-country setting."
);

DB["University of Louisville"] = create(
  "University of Louisville", "Louisville, KY", "Public", "80%", "Moderate", "3.5+", "1050-1250", "$12k/$28k",
  ["Business", "Engineering", "Health Sciences", "Music"],
  "Urban, gritty, spirited. Speed School of Engineering is co-op based.",
  "City-lovers, engineers, diverse. 'Cardinals'.",
  "Speed School (Engineering) is distinct/elite. Mentions co-op interest.",
  ["Louisville", "Cards"],
  "UofL is an urban powerhouse. Unlike UK, it's right in the city. The Speed School of Engineering is famous for its mandatory co-op program (students graduate with a year of work experience). Admits are often practical and career-focused. The Health Sciences campus is also a major draw given the hospitals nearby."
);

DB["Centre College"] = create(
  "Centre College", "Danville, KY", "Private", "64%", "Moderate", "3.7+ W", "1160-1370", "$48,000",
  ["Economics", "History", "International Studies", "Biology"],
  "The 'Centre Commitment' (Graduate in 4 years, study abroad, internship). Elite/Tiny.",
  "Intellectuals, leaders, globetrotters. Close-knit.",
  "Highlight study abroad interest (85% study abroad).",
  ["Centre"],
  "Centre is small but mighty. It guarantees study abroad, an internship, and 4-year graduation specifically. Admits are students who want personal attention and a global perspective. It hosted VP debates, showing its outsized influence. The vibe is intellectual, friendly, and very Southern-polite."
);

DB["University of Tennessee Knoxville"] = create(
  "UT Knoxville", "Knoxville, TN", "Public", "68%", "Moderate", "3.7+ W", "1180-1340", "$13k/$31k",
  ["Supply Chain Management", "Business", "Nursing", "Nuclear Engineering"],
  "Rocky Top. Orange everywhere. Supply Chain is elite. Friendly, spirited.",
  "Volunteers (Vols). Spirited, nice, service-oriented.",
  "Supply Chain Management is world-top-5. Highlight it if interested.",
  ["UTK", "Tennessee", "Vols"],
  "It's great to be a Tennessee Vol. The spirit here is unmatched (singing 'Rocky Top'). Academically, the Supply Chain Management program is globally elite, attracting top talent. Admits are friendly, service-oriented ('The Volunteer State'), and love the proximity to the Smoky Mountains."
);

DB["University of Memphis"] = create(
  "University of Memphis", "Memphis, TN", "Public", "94%", "Safety", "3.2+", "Test Blind", "$10k/$24k",
  ["Business", "Supply Chain", "Music", "Nursing"],
  "Urban, logistics hub (FedEx), soulful. Internship driven.",
  "Gritty, diverse, career-ready. 'Tigers'.",
  "Highlight connection to Memphis industry (FedEx/St. Jude).",
  ["Memphis", "Tigers"],
  "U of M is the engine of Memphis. With FedEx HQ nearby, the Supply Chain and Business programs are massive pipelines for jobs. Admits are often diverse, gritty students who value the urban energy and music history of the city. It's a place for students who want to work."
);

DB["Belmont University"] = create(
  "Belmont University", "Nashville, TN", "Private", "88%", "Moderate", "3.7+ W", "1160-1340", "$42,000",
  ["Music Business", "Audio Engineering", "Songwriting", "Nursing"],
  "Music City USA. The pipeline to the music industry. Christian, beautiful, refined.",
  "Musicians, industry hopefuls, polished. 'Bruins'.",
  "Music Business is the flagship. Portfolio/Audition is key for arts.",
  ["Belmont"],
  "Belmont is the music industry's favorite school. Located on a stunning campus in Nashville, it attracts aspiring songwriters, producers, and music execs. It is Christian (but welcoming) and has a polished, 'pretty' vibe. Admits are often talented creatives who are serious about the business side of art."
);

DB["Rhodes College"] = create(
  "Rhodes College", "Memphis, TN", "Private", "54%", "Hard", "3.8+ W", "1280-1450", "$54,000",
  ["Biology", "Business", "English", "International Studies"],
  "Gothic beauty in the city. Service-learning, rigorous, intellectual.",
  "Smart, service-minded, leaders. 'Lynx'.",
  "Service is huge ('The Rhodes Edge'). Show community impact.",
  ["Rhodes"],
  "Rhodes looks like Hogwarts but lives in Memphis. It combines rigorous liberal arts with deep city engagement (service learning is massive). Admits are intellectual and compassionate, often interning at St. Jude Children's Hospital. The Honor Code is central to life here. It's a place for smart students who want to make a difference."
);

DB["Sewanee: The University of the South"] = create(
  "Sewanee", "Sewanee, TN", "Private", "52%", "Moderate", "3.7+ W", "Test Blind", "$52,000",
  ["English", "Ecology", "Economics", "Politics"],
  "The Domain (13,000 acres). Gowns worn to class. Tradition, hiking, writing.",
  "Outdoorsy intellectuals. Tradition-lovers. 'Yea, Sewanee's Right'.",
  "Fit is everything. You must explain why you want 'The Domain'.",
  ["Sewanee"],
  "Sewanee is magical and weird. Students (Gownsmen) wear academic robes to class if they have high GPAs. The campus is a mountain ('The Domain'). Admits are outdoorsy intellectuals—often writers (Tennessee Williams connection) or ecologists. It is isolated, intense, and deeply traditional."
);

DB["University of Alabama"] = create(
  "University of Alabama", "Tuscaloosa, AL", "Public", "76%", "Moderate", "3.6+ W", "1100-1360", "$11k/$31k",
  ["Business", "Public Relations", "Engineering", "Nursing"],
  "Roll Tide. The empire of college football. Massive Greek life, huge merit scholarships.",
  "Spirited, social, polished. Honors College attracts high stats.",
  "National Merit Scholars get full rides. Mention leadership.",
  ["Alabama", "Bama", "Crimson Tide"],
  "Bama is a lifestyle. 'Roll Tide' is a universal greeting. While famous for football and massive Greek life (the 'Machine'), the university aggressively recruits National Merit Scholars with full rides, creating pockets of elite academics. Admits are social, ambitious, and want the quintessential big-college experience."
);

DB["Auburn University"] = create(
  "Auburn University", "Auburn, AL", "Public", "44%", "Moderate", "3.8+ W", "1180-1350", "$12k/$32k",
  ["Engineering", "Business", "Architecture", "Agriculture"],
  "War Eagle. The 'Auburn Family'. Friendly, traditional, engineering powerhouse.",
  "Friendly, conservative/traditional, spirited. 'Auburn Family' is real.",
  "Engineering/Architecture are harder admits. Show interest in the family vibe.",
  ["Auburn", "Tigers", "War Eagle"],
  "Auburn is the 'loveliest village on the plains'. The 'Auburn Family' culture is incredibly tight-knit and friendly. It is an engineering and agricultural powerhouse. Admits are typically conservative, spirited, and value tradition. Architecture is also a top-ranked, rigorous 5-year program."
);

DB["University of Alabama at Birmingham"] = create(
  "UAB", "Birmingham, AL", "Public", "87%", "Moderate", "3.5+ W", "1080-1320", "$9k/$26k",
  ["Biomedical Sciences", "Nursing", "Public Health", "Psychology"],
  "The hospital IS the campus. Medical/Research giant. diverse, urban.",
  "Future doctors and researchers. Diverse and driven.",
  "Pre-med/Pre-health is the vibe. Research interest helps.",
  ["UAB", "Blazers"],
  "UAB is Birmingham's economic engine. It is a massive medical research center. Admits are almost exclusively focused on health professions. The student body is diverse and the vibe is urban and serious. If you want to go to med school, UAB offers incredible access to shadowing and research at the massive onsite hospital."
);

DB["Samford University"] = create(
  "Samford University", "Birmingham, AL", "Private", "83%", "Moderate", "3.6+ W", "1090-1280", "$36,000",
  ["Pharmacy", "Nursing", "Business", "Education"],
  "Christian (Baptist roots), polished, pre-professional. Beautiful suburban campus.",
  "Faith-oriented, nice, polished. Future health pros.",
  "Christian values are central. Pharmacy is a direct-entry draw.",
  ["Samford", "Bulldogs"],
  "Samford is the top-ranked private university in Alabama. It combines Christian values with rigorous pre-professional training (especially Pharmacy and Nursing). Admits are polished, friendly, and community-minded. The campus is immaculate. It attracts students who want a faith-based environment without it being overwhelming."
);

DB["University of Mississippi"] = create(
  "Ole Miss", "Oxford, MS", "Public", "97%", "Safety", "3.3+", "1050-1240", "$9k/$26k",
  ["Accounting", "Pharmacy", "Business", "IMC (Marketing)"],
  "The Grove (Tailgating). Southern charm, intense Greek life, elite Accounting.",
  "Social, charming, spirited. Future accountants and lawyers.",
  "Accounting/Pharmacy schools are elite and competitive.",
  ["Ole Miss", "Rebels"],
  "Ole Miss is the epitome of Southern charm. 'The Grove' is the holy land of tailgating. Greek life is central to the social scene. Academically, the Patterson School of Accountancy is world-class, delivering massive job placement. Admits are social, traditional, and love the small-town feel of Oxford."
);

DB["Mississippi State University"] = create(
  "Mississippi State", "Starkville, MS", "Public", "70%", "Safety", "3.4+", "1040-1260", "$9k/$25k",
  ["Engineering", "Veterinary Medicine", "Agriculture", "Business"],
  "Cowbells. Friendly, unpretentious, research-focused. 'Starkvegas'.",
  "Down-to-earth, engineers, ag-students. 'Bulldogs'.",
  "Engineering and Vet Med are the standouts.",
  ["Mississippi State", "MSU", "Bulldogs"],
  "Mississippi State is the people's university. The clang of cowbells is the soundtrack. It is a major research university for engineering and agriculture. Admits are unpretentious, friendly, and hardworking. The Vet School is one of the few in the region, attracting top animal science students."
);

DB["University of Arkansas"] = create(
  "University of Arkansas", "Fayetteville, AR", "Public", "79%", "Moderate", "3.5+ W", "1120-1300", "$10k/$27k",
  ["Supply Chain", "Business", "Nursing", "Architecture"],
  "Woo Pig Sooie. Wal-Mart money = Elite Business School. Hills and trails.",
  "Spirited, business-minded, outdoorsy. 'Razorbacks'.",
  "Walton College of Business is huge. Supply Chain is elite.",
  ["Arkansas", "Razorbacks", "Hogs"],
  "University of Arkansas is transformed by Northwest Arkansas's boom (Walmart, Tyson). The Walton College of Business is incredibly well-funded and connected. Admits are spirited ('Calling the Hogs' is mandatory) and increasingly come from Texas and coastal states. Fayetteville is hilly, green, and funky."
);

DB["Louisiana State University"] = create(
  "LSU", "Baton Rouge, LA", "Public", "71%", "Moderate", "3.4+", "1090-1290", "$12k/$28k",
  ["Petroleum Engineering", "Business", "Mass Communication", "Agriculture"],
  "Death Valley (Football). Intense spirit, beautiful oaks, oil & gas connections.",
  "Loud, proud, fun-loving. 'Tigers'.",
  "Ogden Honors College is the target for high achievers.",
  ["LSU", "Tigers"],
  "LSU is loud. The spirit in 'Death Valley' is legendary. The campus, with its majestic live oaks, is one of the most beautiful. Admits are social and resilient. Petroleum Engineering is a unique, high-paying major here. Students know how to balance a 'laissez les bon temps rouler' attitude with serious study."
);

DB["Loyola University New Orleans"] = create(
  "Loyola New Orleans", "New Orleans, LA", "Private", "78%", "Moderate", "3.5+ W", "1100-1300", "$45,000",
  ["Music Industry", "Business", "Psychology", "Criminology"],
  "Jesuit creativity in the Big Easy. Next to Tulane. Soulful.",
  "Creative, diverse, service-minded. 'Wolf Pack'.",
  "Music/Arts portfolios are big here. Show zest directly.",
  ["Loyola NO", "Wolf Pack"],
  "Loyola New Orleans is the soulful, creative neighbor to Tulane. It offers a Jesuit education in the heart of Uptown. The College of Music and Media is excellent, attracting aspiring artists. Admits are often quirky, creative, and service-oriented. They love the culture/food/chaos of New Orleans."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 16: TEXAS & OKLAHOMA
// ==========================================

DB["University of Oklahoma"] = create(
  "University of Oklahoma", "Norman, OK", "Public", "72%", "Moderate", "3.6+ W", "1150-1360", "$9k/$28k",
  ["Meteorology", "Business", "Petroleum Engineering", "Journalism"],
  "Boomer Sooner. Meteorology capital of the world. Massive National Merit scholarships.",
  "Spirited, ambitious, friendly. 'Sooners'.",
  "National Merit finalists get massive perks. Mention it.",
  ["OU", "Oklahoma", "Sooners"],
  "OU is a powerhouse. It recruits National Merit Scholars aggressively, creating an elite academic layer within the massive state school. Meteorology is world #1 (National Weather Center is on campus). The spirit is deafening ('Boomer Sooner' played 1000 times). Admits are friendly and value the classic college experience."
);

DB["Oklahoma State University"] = create(
  "Oklahoma State University", "Stillwater, OK", "Public", "70%", "Safety", "3.4+", "1060-1280", "$9k/$24k",
  ["Agriculture", "Engineering", "Veterinary Medicine", "Aviation"],
  "America's Brightest Orange. Friendly, cowboy culture, land-grant mission.",
  "Friendly, hardworking, down-to-earth. 'Cowboys'.",
  "Honors College requires separate essay. Focus on service/leadership.",
  ["OSU", "Oklahoma State", "Cowboys"],
  "Oklahoma State is undeniably friendly. The 'Cowboy Family' vibe is real. It is a land-grant giant with top-tier Agriculture and Veterinary Medicine programs. Admits are often from rural backgrounds or engineering hopefuls who want a collaborative, non-cutthroat environment. Stillwater is the quintessential college town."
);

DB["University of Tulsa"] = create(
  "University of Tulsa", "Tulsa, OK", "Private", "69%", "Moderate", "3.7+ W", "1160-1380", "$45,000",
  ["Cybersecurity", "Petroleum Engineering", "energy Management", "Biology"],
  "Tiny powerhouse. Cyber Corps (NSA/CIA feeder). Rich endowment.",
  "Intellectuals, cyber-nerds, future energy leaders. 'Golden Hurricane'.",
  "Cybersecurity/Cyber Corps is elite. Mention interest in national defense.",
  ["Tulsa", "TU"],
  "TU is a hidden gem. It has a massive endowment for its size. The Cyber Corps program trains students for the NSA/CIA/FBI and pays for school. Petroleum Engineering manages the campus's own drilling simulator. Admits are smart, focused students who want major industry connections in a small school setting."
);

DB["Southern Methodist University"] = create(
  "SMU", "Dallas, TX", "Private", "52%", "Hard", "3.7+ W", "1300-1480", "$60,000",
  ["Business", "Finance", "Performing Arts", "Economics"],
  "Dallas wealth and power. 'Boulevarding' (tailgating). Cox School is elite.",
  "Ambitious, polished, well-connected. Future CEOs.",
  "Cox School of Business Direct Admit is the goal. High stats needed.",
  ["SMU", "Mustangs"],
  "SMU is the gateway to Dallas business. The Cox School of Business connects students directly to the C-suites of the city. 'Boulevarding' is a legendary social tradition. Admits are typically polished, ambitious, and looking to network from day one. The campus is immaculately manicured and wealthy."
);

DB["Texas Christian University"] = create(
  "TCU", "Fort Worth, TX", "Private", "53%", "Moderate", "3.7+ W", "1180-1380", "$54,000",
  ["Business", "Nursing", "Pre-Med", "Communication"],
  "Riff Ram. Purple ties. Fort Worth friendly. Massive school spirit.",
  "Spirited, friendly, community-focused. 'Horned Frogs'.",
  "Neeley School of Business is huge. 'Why TCU' essay matters.",
  ["TCU", "Horned Frogs"],
  "TCU is the 'Goldilocks' school for many—spirited like a state school, intimate like a private one. The Neeley School of Business is a powerhouse. Admits are famously 'nice' (Midwestern nice meets Texas hospitality). School spirit is explosive, centering on the unique Horned Frog mascot."
);

DB["Baylor University"] = create(
  "Baylor University", "Waco, TX", "Private", "56%", "Moderate", "3.7+ W", "1190-1370", "$52,000",
  ["Biology", "Business", "Nursing", "Political Science"],
  "Baptist flagship. Chapel is required. 'Sic Em Bears'. Fast growing research.",
  "Faith-oriented, spirited, ambitious. Pre-health giants.",
  "Faith fit matters. Mention the Christian mission in essays.",
  ["Baylor", "Bears"],
  "Baylor is apologetically Christian. Chapel attendance is required. Admits are often students who want rigorous academics (especially pre-med) within a faithful environment. The 'Baylor Line' (freshmen running onto the football field) creates instant community. Research funding is skyrocketing."
);

DB["University of Houston"] = create(
  "University of Houston", "Houston, TX", "Public", "65%", "Moderate", "3.5+ W", "1140-1320", "$9k/$22k",
  ["Business", "Engineering", "Hospitality", "Architecture"],
  "Energy capital university. Tier One research. Diverse, gritty, driven.",
  "Hustlers, researchers, city-lovers. 'Cougars'.",
  "Wolff Center for Entrepreneurship is #1 in US.",
  ["Houston", "UH", "Cougars"],
  "UH is the engine of Houston. It has shed its commuter image to become a Tier One research powerhouse. The Wolff Center for Entrepreneurship is consistently ranked #1 in the nation. Admits are diverse, gritty, and career-focused, often interning in the massive Houston energy and medical sectors."
);

DB["Texas Tech University"] = create(
  "Texas Tech University", "Lubbock, TX", "Public", "67%", "Moderate", "3.4+", "1070-1240", "$11k/$24k",
  ["Business", "Engineering", "Wind Energy", "Agriculture"],
  "Wreck 'Em. Isolated, massive spirit, friendly. West Texas hospitality.",
  "Spirited, friendly, deeply loyal. 'Red Raiders'.",
  "Whitacre College of Engineering is strong. Show grit.",
  ["Texas Tech", "Tech", "Red Raiders"],
  "Texas Tech is a world unto itself in West Texas. The isolation creates a fanatically loyal community. 'West Texas hospitality' means everyone talks to everyone. It is a leader in wind energy and petroleum engineering. Admits are unpretentious, spirited, and value the massive, fun college experience."
);

DB["University of Texas at Dallas"] = create(
  "UT Dallas", "Richardson, TX", "Public", "84%", "Moderate", "3.8+ W", "1240-1460", "$14k/$39k",
  ["Computer Science", "Engineering", "Business", "Cognitive Science"],
  "Nerd heaven. Chess powerhouse. Massive CS program. Modern and suburban.",
  "Intellectuals, gamers, makers. 'Comets'.",
  "CS and Engineering are elite and rigorous. Mention projects.",
  ["UTD", "UT Dallas"],
  "UTD is cool because it embraces the 'nerd'. The Chess team is world-class. It was founded by the founders of Texas Instruments, so engineering is its soul. Admits are typically high-achieving STEM students who prefer a modern, focused environment over a football-crazy party school."
);

DB["University of Texas at San Antonio"] = create(
  "UT San Antonio", "San Antonio, TX", "Public", "86%", "Safety", "3.3+", "1020-1220", "$10k/$25k",
  ["Cybersecurity", "Business", "Biology", "Psychology"],
  "Cybersecurity powerhouse. HSI (Hispanic Serving). Fast growing.",
  "Diverse, career-focused, urban. 'Roadrunners'.",
  "Cybersecurity program is nationally elite. Mention it.",
  ["UTSA", "Roadrunners"],
  "UTSA is a university on the move. It has one of the nation's top Cybersecurity programs. As a Hispanic Serving Institution, it is vibrant and diverse. Admits are often career-focused students who love the culture and food of San Antonio. The campus vibe is modern and energetic."
);

DB["Texas State University"] = create(
  "Texas State University", "San Marcos, TX", "Public", "88%", "Safety", "3.3+", "1030-1210", "$11k/$23k",
  ["Business", "Communication", "Education", "Criminal Justice"],
  "River floats. Beautiful hilly campus. 'Eat em up Cats'. Rising research.",
  "Social, friendly, outdoorsy. 'Bobcats'.",
  "McCoy College of Business is the academic hub.",
  ["Texas State", "Bobcats"],
  "Texas State is famous for the San Marcos river flowing through campus. But beyond the tubing culture, it is a massive emerging research university. The McCoy College of Business is excellent. Admits are generally friendly, social, and love the hill country aesthetic. It's a 'lifestyle' campus with solid academics."
);

DB["Trinity University"] = create(
  "Trinity University", "San Antonio, TX", "Private", "31%", "Hard", "3.8+ W", "1310-1490", "$51,000",
  ["Business", "Economics", "Biology", "Communication"],
  "The 'Rice' of San Antonio. Huge endowment -> great resources. Merit aid.",
  "Intellectual, ambitious, balanced. 'Tigers'.",
  "Demonstrated interest matters. Highlight the 'big resources, small school' vibe.",
  ["Trinity", "Trinity TX"],
  "Trinity offers an elite liberal arts education with the resources of a massive endowment ($1.7B). The campus is a red-brick architectural gem. Admits are often high-stats students who want personal attention from professors. The vibe is wealthy but intellectually serious. It's the 'Rice' of San Antonio."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 17: PENNSYLVANIA
// ==========================================

DB["Penn State University"] = create(
  "Penn State", "University Park, PA", "Public", "55%", "Moderate", "3.6+ W", "1200-1400", "$18k/$36k",
  ["Business", "Engineering", "Meteorology", "Information Sciences"],
  "We Are. Massive, spirited, research giant in Happy Valley. Alumni network is everywhere.",
  "Spirited, loyal, ambitious. 'Nittany Lions'.",
  "Schreyer Honors College is Ivy-level competitive. Mention it specifically.",
  ["Penn State", "PSU", "Nittany Lions"],
  "Penn State is a universe. 'Happy Valley' isolates students in a massive bubble of spirit and study. The alumni network is legendary for opening doors. Schreyer Honors College is one of the best in the nation. Admits are social, resilient, and want the resources of a massive R1 university."
);

DB["University of Pittsburgh"] = create(
  "University of Pittsburgh", "Pittsburgh, PA", "Public", "49%", "Hard", "3.9+ W", "1250-1440", "$19k/$34k",
  ["Nursing", "Pre-Med", "Biology", "Philosophy"],
  "The Cathedral of Learning. Urban, medical powerhouse. Research intensive.",
  "Urban, intellectual, pre-med focused. 'Panthers'.",
  "Pre-med/Health programs are elite. GAP (Guaranteed Admit) programs exist.",
  ["Pitt", "Panthers"],
  "Pitt is the intellectual heart of Pittsburgh. The Cathedral of Learning (a literal skyscraper university) is iconic. It is a massive medical hub, so pre-med culture is dominant. Admits are often urban-loving intellectuals who want research opportunities at UPMC (the attached hospital giant)."
);

DB["Temple University"] = create(
  "Temple University", "Philadelphia, PA", "Public", "80%", "Moderate", "3.3+", "1080-1280", "$17k/$30k",
  ["Business", "Media", "Art", "Criminal Justice"],
  "Philadelphia's public university. Urban, gritty, diverse. 'Temple Made'.",
  "Hustlers, city-kids, diverse. 'Owls'.",
  "Highlight grit and desire for an urban education.",
  ["Temple", "Owls"],
  "Temple is 'Philadelphia's University'. It is gritty, diverse, and woven into the fabric of North Philly. 'Temple Made' denotes a certain resilience and hustle. Admits are often career-focused and want to be in a major city without the price tag of Penn/Drexel. The Fox School of Business is strong."
);

DB["Drexel University"] = create(
  "Drexel University", "Philadelphia, PA", "Private", "80%", "Moderate", "3.6+ W", "1180-1380", "$59,000",
  ["Engineering", "Computer Science", "Nursing", "Design"],
  "The Co-op School. 5-year degrees with 18 months of paid work. Fast-paced quarters.",
  "Career-driven, intense, practical. 'Dragons'.",
  "Must discuss the Co-op model. It is the reason to go here.",
  ["Drexel", "Dragons"],
  "Drexel is not for the faint of heart. The quarter system is fast, and the Co-op program (mandatory paid internships) means students graduate with real resumes. Admits are pragmatic and career-focused. It's less about 'finding yourself' and more about 'building your career'. The vibe is urban and professional."
);

DB["Villanova University"] = create(
  "Villanova University", "Villanova, PA", "Private", "23%", "Hard", "3.9+ W", "1320-1500", "$60,000",
  ["Business", "Nursing", "Engineering", "Communication"],
  "Augustinian Catholic. Basketball champions. Community-focused, polished, wealthy.",
  "Community-minded, spirited, polished. 'Wildcats'.",
  "Community/Service is distinct here ('Augustinian values').",
  ["Villanova", "Nova"],
  "Villanova has surged into the elite tier. It offers a powerful mix of community (Augustinian values), sports (National Champion basketball), and outcomes (Villanova Business School is top-tier). Admits are often polished, high-achieving, and value a tight-knit, spirited community on the Main Line."
);

DB["Lehigh University"] = create(
  "Lehigh University", "Bethlehem, PA", "Private", "37%", "Hard", "3.8+ W", "1300-1480", "$61,000",
  ["Engineering", "Business", "Computer Science", "Finance"],
  "Work hard, party hard. Mountain Hawk spirit. Industrial roots, strong Greek life.",
  "Engineers who are social. 'Mountain Hawks'.",
  "IDEAS (Engineering + Arts) program is unique. Highlight interdisciplinary interest.",
  ["Lehigh", "Mountain Hawks"],
  "Lehigh is built into the side of a mountain. It has a 'work hard, play hard' reputation with a massive Greek scene. Academically, it bridges Engineering and Business brilliantly. Admits are smart, social, and often look for a traditional collegiate experience with high ROI."
);

DB["Bucknell University"] = create(
  "Bucknell University", "Lewisburg, PA", "Private", "33%", "Hard", "3.7+ W", "1250-1440", "$62,000",
  ["Engineering", "Business", "Economics", "Biology"],
  "Liberal Arts + Engineering. Beautiful campus. Greek life dominant. Preppy/Wealthy.",
  "Ambitious, social, polished. 'Bison'.",
  "Engineering availability in a LAC setting is the hook.",
  ["Bucknell"],
  "Bucknell is a unicorn: a small liberal arts college with a massive Division I sports culture and a College of Engineering. Admits are often wealthy, preppy, and spirited. It feels like a 'mini-university'. The alumni network is fanatic. Students work incredibly hard but the social scene is very active."
);

DB["Lafayette College"] = create(
  "Lafayette College", "Easton, PA", "Private", "31%", "Hard", "3.7+ W", "1250-1430", "$60,000",
  ["Engineering", "Economics", "Government", "Biology"],
  "Engineering in a Liberal Arts setting. 'Cur Non' (Why Not?). Rivalry with Lehigh.",
  "Intellectually curious, spirited, interdisciplinary. 'Leopards'.",
  "Mention 'The Rivalry' (vs Lehigh)—it's huge.",
  ["Lafayette", "Pards"],
  "Lafayette is an engineering-focused liberal arts college. The 'Cur Non' motto encourages students to cross boundaries (e.g., Engineering majors minoring in Poetry). Admits are often multi-talented. The rivalry with nearby Lehigh is the oldest in college football and defines the spirited campus culture."
);

DB["Swarthmore College"] = create(
  "Swarthmore College", "Swarthmore, PA", "Private", "7%", "Very Hard", "4.0+ W", "1430-1560", "$62,000",
  ["Economics", "Biology", "Political Science", "Engineering"],
  "Intellectual intensity. Review of books. Quaker roots. Arboretum campus.",
  "Brilliant, quirky, intense intellectuals. 'Swatties'.",
  "Intellectual curiosity must be off the charts. 'Misery Poker' is a cultural thing.",
  ["Swarthmore", "Swat"],
  "Swarthmore is famously intense. 'Anywhere else it would have been an A' is the unofficial motto. Admits are brilliant, often quirky, and deeply concerned with social justice (Quaker roots). It is an arboretum, so the campus is stunning. It's for students who genuinely love learning for learning's sake."
);

DB["Haverford College"] = create(
  "Haverford College", "Haverford, PA", "Private", "14%", "Hard", "3.9+ W", "1380-1540", "$63,000",
  ["Biology", "Psychology", "Economics", "Political Science"],
  "Honor Code is law (student run). Trust, community, rigorous academics.",
  "Trustworthy, collaborative, intellectual. 'Fords'.",
  "The Honor Code is everything. You MUST discuss trust and community.",
  ["Haverford"],
  "Haverford is defined by its Honor Code. Exams are unproctored and students schedule their own finals. This creates a culture of immense trust and collaboration. Admits are often 'nice geniuses'. It is part of the Tri-College consortium (with Swat and Bryn Mawr), expanding course options significantly."
);

DB["Bryn Mawr College"] = create(
  "Bryn Mawr College", "Bryn Mawr, PA", "Private", "30%", "Hard", "3.8+ W", "1300-1500", "$61,000",
  ["Psychology", "Mathematics", "English", "Biology"],
  "Elite Women's College. Gothic architecture. Intellectual sisterhood. Traditions.",
  "Empowered, brilliant women/non-binary. 'Mawrters'.",
  "Highlight the value of a women's centered education and traditions.",
  ["Bryn Mawr"],
  "Bryn Mawr is a fortress of female intellect. The Gothic architecture looks like a movie set. Traditions (Lantern Night) are sacred. Admits are fiercely intelligent and feminist. Like Haverford, it benefits from the Tri-Co consortium. The vibe is empowering, quirky, and deeply academic."
);

DB["Franklin & Marshall College"] = create(
  "Franklin & Marshall", "Lancaster, PA", "Private", "36%", "Hard", "3.7+ W", "1260-1460", "$63,000",
  ["Government", "Business", "Biology", "Public Health"],
  "Diplomacy and Government. Harry Potter housing system. Pre-professional LAC.",
  "Leaders, politicos, rigorous scholars. 'Diplomats'.",
  "The House System is unique (like Hogwarts). Government/Law are strong.",
  ["F&M"],
  "F&M is a training ground for leaders. The 'House System' sorts students into living-learning communities, fostering deep bonds. It is historically a powerhouse for Government and Pre-law. Admits are often intense and ambitious. The campus is in Lancaster, a cool small city with great food."
);

DB["Dickinson College"] = create(
  "Dickinson College", "Carlisle, PA", "Private", "35%", "Moderate", "3.7+ W", "Test Blind", "$60,000",
  ["International Business", "Biology", "Political Science", "Environmental Science"],
  "Global education. Sustainability. Doers. 'Dickinsonians'.",
  "Global citizens, environmentalists, engaged. Focused on the future.",
  "Global education is the DNA. Discuss language/study abroad.",
  ["Dickinson"],
  "Dickinson was the first college chartered in the US. Today, it is a leader in Global Education (nearly everyone studies abroad) and Sustainability. Admits are engaged citizens who want to solve big problems. The vibe is unpretentious, forward-thinking, and globally minded."
);

DB["Gettysburg College"] = create(
  "Gettysburg College", "Gettysburg, PA", "Private", "48%", "Moderate", "3.6+ W", "1240-1420", "$61,000",
  ["History", "Political Science", "Business", "Health Sciences"],
  "History comes alive. Civil War location. Eisenhower Institute for leadership.",
  "History buffs, leaders, engaged citizens. 'Bullets'.",
  "History/Pol Sci are obvious strengths. Eisenhower Institute is a draw.",
  ["Gettysburg"],
  "Gettysburg College is literally on the battlefield. It is Mecca for history buffs, but the Eisenhower Institute makes it a modern hub for public policy and leadership. Admits are often engaged in student government or service. The vibe is historic, friendly, and surprisingly spirited."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 18: NEW JERSEY
// ==========================================

DB["Rutgers University–New Brunswick"] = create(
  "Rutgers New Brunswick", "New Brunswick, NJ", "Public", "66%", "Moderate", "3.7+ W", "1240-1470", "$16k/$33k",
  ["Computer Science", "Business", "Pharmacy", "Engineering"],
  "The State University of NJ. Massive, diverse, distinct campuses. Oldest in NJ.",
  "Diverse, resilient, ambitious. 'Scarlet Knights'.",
  "It's huge. Mention specific specific school (e.g., SAS, Engineering).",
  ["Rutgers", "RU"],
  "Rutgers is a giant. It feels like five different colleges connected by a bus system (which students love to hate). As a colonial college, it has deep history but offers massive modern research opportunities. Admits are incredibly diverse and gritty. The Honors College is an elite 'school within a school'."
);

DB["The College of New Jersey"] = create(
  "TCNJ", "Ewing, NJ", "Public", "62%", "Moderate", "3.6+ W", "1160-1360", "$17k/$29k",
  ["Education", "Business", "Biology", "Psychology"],
  "Private school feel at a public price. Beautiful Georgian campus. Intense academics.",
  "High-achieving, focused, suburban. 'Lions'.",
  "Education and Biology are flagship programs.",
  ["TCNJ"],
  "TCNJ is often called a 'public Ivy' for a reason. The campus is immaculate and the academics are rigorous, feeling more like a private liberal arts college than a state school. Admits are often high-achieving NJ natives who want quality without the debt. The School of Education is legendary in the region."
);

DB["Seton Hall University"] = create(
  "Seton Hall University", "South Orange, NJ", "Private", "75%", "Moderate", "3.5+ W", "1150-1340", "$48,000",
  ["Business", "Nursing", "Diplomacy", "Sports Management"],
  "Catholic (Diocesan), spirited, close to NYC. School of Diplomacy is elite.",
  "Polished, spirited, career-focused. 'Pirates'.",
  "School of Diplomacy and Int'l Relations is a major differentiator.",
  ["Seton Hall", "SHU"],
  "Seton Hall offers a prime location near NYC with a spirited, Catholic campus culture. The School of Diplomacy (affiliated with the UN) is a standout, attracting future world leaders. The basketball team creates massive school spirit. Admits are generally career-focused and value the internship access to New York."
);

DB["Montclair State University"] = create(
  "Montclair State University", "Montclair, NJ", "Public", "91%", "Safety", "3.2+", "Test Blind", "$13k/$22k",
  ["Education", "Business", "Psychology", "Arts"],
  "Just 12 miles from NYC. Modern, diverse, growing fast. HSI.",
  "Diverse, suburban/urban mix, commuters and residents.",
  "Great value and proximity to NYC internships.",
  ["Montclair State", "MSU"],
  "Montclair State has transformed from a teachers college to a comprehensive research university. It is incredibly diverse (HSI) and modern. The direct train to NYC makes it a sleeper hit for internship access. Admits are often pragmatic students looking for opportunity and value."
);

DB["Rowan University"] = create(
  "Rowan University", "Glassboro, NJ", "Public", "77%", "Moderate", "3.4+", "1090-1280", "$14k/$23k",
  ["Engineering", "Education", "Business", "Radio/TV/Film"],
  "Fastest growing. Innovative Engineering. Glassboro is a college town.",
  "Innovators, engineers, future teachers. 'Profs'.",
  "Henry M. Rowan College of Engineering is elite and hands-on.",
  ["Rowan"],
  "Rowan is an engineering powerhouse on the rise (thanks to a massive endowment). The engineering program is hands-on from day one. It has rapidly expanded into a research university while keeping its roots in teacher education. Admits are practical, hardworking, and excited by the school's rapid growth."
);

DB["Stevens Institute of Technology"] = create(
  "Stevens Institute of Technology", "Hoboken, NJ", "Private", "43%", "Hard", "3.9+ W", "1380-1520", "$60,000",
  ["Computer Science", "Mechanical Engineering", "Business & Tech", "Quant Finance"],
  "The Innovation University. Views of NYC skyline. High ROI. Intense tech focus.",
  "Tech-savvy, ambitious, innovators. 'Ducks'.",
  "ROI is the story. High starting salaries. Tech + Business focus.",
  ["Stevens", "SIT"],
  "Stevens sits on a hill overlooking Manhattan, offering arguably the best views of any campus. It is a high-tech powerhouse. Graduates command massive starting salaries. Admits are 'tech-plus' students—engineers who understand business, or business students who understand code. The vibe is intense, urban, and innovative."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 19: NEW YORK (UPSTATE/SUNY)
// ==========================================

DB["Stony Brook University"] = create(
  "Stony Brook University", "Stony Brook, NY", "Public", "49%", "Hard", "3.7+ W", "1260-1480", "$10k/$28k",
  ["Computer Science", "Biology", "Applied Math", "Psychology"],
  "STEM Giant. Research powerhouse. Diverse, intense, ambitious.",
  "STEM-focused, hard workers, diverse. 'Seawolves'.",
  "Simons Center for Geometry and Physics is world-famous. Research is key.",
  ["Stony Brook", "SBU"],
  "Stony Brook is a STEM juggernaut. It manages Brookhaven National Lab, so the research opportunities are literally world-class. Admits are often serious, high-achieving STEM students (CS and Pre-med dominant). It's a commuter-heavy but vibrant campus where intelligence is currency."
);

DB["Binghamton University"] = create(
  "Binghamton University", "Binghamton, NY", "Public", "41%", "Hard", "3.8+ W", "1300-1490", "$10k/$28k",
  ["Business", "Psychology", "Computer Science", "Integrative Neuroscience"],
  "The Public Ivy of the Northeast. Intellectual, cold, rigorous.",
  "Smart, unpretentious, high-achievers. 'Bearcats'.",
  "PwC Scholars program in School of Management is elite.",
  ["Binghamton", "Bing"],
  "Binghamton is the crown jewel of the SUNY system. It attracts students who got into Ivies but chose to save money. The residential college system creates a tight community (despite the freezing weather). Admits are intellectual, earthy, and unpretentious. The School of Management is a feeder for NYC finance."
);

DB["University at Buffalo"] = create(
  "University at Buffalo", "Buffalo, NY", "Public", "68%", "Moderate", "3.6+ W", "1190-1370", "$10k/$28k",
  ["Engineering", "Pharmacy", "Business", "Architecture"],
  "Flagship of SUNY. Massive, international, snowy research hub.",
  "Resilient, global, research-focused. 'Bulls'.",
  "A flagship R1 option with accessible admissions. Engineering is strong.",
  ["Buffalo", "UB"],
  "UB is massive. It is the flagship research center of SUNY. With a huge international population, the campus feels global. Admits are resilient (it snows... a lot) and research-driven. It offers essentially every major, from Law to Medicine to Architecture, at a high level."
);

DB["Syracuse University"] = create(
  "Syracuse University", "Syracuse, NY", "Private", "52%", "Hard", "3.7+ W", "1210-1400", "$61,000",
  ["Communications", "Architecture", "Sport Management", "Information/Tech"],
  "Newhouse (Media) is #1. School Spirit. Orange everywhere. Snow.",
  "Spirited, communicative, career-ready. 'Orange'.",
  "Newhouse School is impossibly competitive. Architecture is top 5.",
  ["Syracuse", "Cuse", "Orange"],
  "Syracuse is 'New York's College Team'. The spirit is overpowering. Academically, the Newhouse School of Public Communications is the Harvard of media. The Architecture program is also world-class. Admits are social, spirited, and willing to brave the snow for the incredible alumni network."
);

DB["Rochester Institute of Technology"] = create(
  "RIT", "Rochester, NY", "Private", "67%", "Moderate", "3.7+ W", "1270-1450", "$56,000",
  ["Computing", "Engineering", "Art/Design", "Game Design"],
  "Career-focused technophiles. Co-op program is mandatory for many. NTID connection.",
  "Makers, gamers, tech-lovers. 'Tigers'.",
  "Co-op program is huge. National Technical Institute for the Deaf (NTID) is here.",
  ["RIT"],
  "RIT is for makers. It creates career-ready graduates through its massive Co-op program. It is also home to NTID, making it a hub for deaf culture and accessibility. Admits are often 'techies', gamers, or artists who use technology. The vibe is nerdy, creative, and professionally driven."
);

DB["Rensselaer Polytechnic Institute"] = create(
  "RPI", "Troy, NY", "Private", "65%", "Hard", "3.8+ W", "1350-1510", "$62,000",
  ["Engineering", "Computer Science", "Game Design", "Architecture"],
  "Oldest tech university in English-speaking world. Intense, rigorous, nerdy.",
  "Hard-core engineers, scientists, gamers. 'Engineers'.",
  "The Arch: Summer semester mandatory. Serious rigor.",
  ["RPI"],
  "RPI is intense. It is for serious engineers and scientists. 'The Arch' program requires rising juniors to spend a summer on campus and a semester away (interning). Admits are brilliant and focused—often gamers (Games & Sim Arts is elite). It is not a party school; it is a build-the-future school."
);

DB["University of Rochester"] = create(
  "University of Rochester", "Rochester, NY", "Private", "39%", "Hard", "3.8+ W", "1370-1520", "$63,000",
  ["Optics", "Music", "Political Science", "Biology"],
  "Open Curriculum (Build your own). Eastman School of Music. Research intensive.",
  "Intellectual, musical, diverse. 'Yellowjackets'.",
  "Eastman School is a conservatory. Open Curriculum is the main hook.",
  ["Rochester", "U of R"],
  "U of R is a research powerhouse with a liberal arts soul. The unique 'Cluster' curriculum allows total freedom—no required subjects. The Institute of Optics is world-famous, as is the Eastman School of Music. Admits are intellectual omnivores who love the freedom to study disparate topics."
);

DB["Colgate University"] = create(
  "Colgate University", "Hamilton, NY", "Private", "12%", "Very Hard", "3.9+ W", "1370-1520", "$64,000",
  ["Economics", "Political Science", "Biology", "English"],
  "Beautiful isolation. Intense school spirit. Work hard, play hard. Wealthy.",
  "Athletic, ambitious, polished intellectuals. 'Raiders'.",
  "Demonstrated interest matters! Why rural NY?",
  ["Colgate"],
  "Colgate is stunningly beautiful and isolated. This creates a fiercely loyal, intense community. It feels like a 'mini-Dartmouth'—remote, spirited, and wealthy. Admits are often athletic and high-achieving. The liberal arts core is rigorous. Students here work incredibly hard and bond deeply over the isolation."
);

DB["Hamilton College"] = create(
  "Hamilton College", "Clinton, NY", "Private", "12%", "Very Hard", "3.9+ W", "1410-1540", "$65,000",
  ["Economics", "Public Policy", "Writing", "Mathematics"],
  "Open Curriculum. 'Know Thyself'. Writing intensive. Speaking intensive.",
  "Articulate, independent, writers. 'Continentals'.",
  "No core curriculum. Writing is emphasized above all else.",
  ["Hamilton"],
  "Hamilton cares about one thing above all: can you obtain and express an idea? It is 'the writing college'. With no core curriculum, students must be independent. Admits are articulate, thoughtful, and ready to design their own education. The campus is a classic hilltop liberal arts paradise."
);

DB["Skidmore College"] = create(
  "Skidmore College", "Saratoga Springs, NY", "Private", "26%", "Hard", "3.7+ W", "1280-1460", "$63,000",
  ["Business", "English", "Psychology", "Studio Art"],
  "Creative thought matters. 'Creative' is the key word. Saratage Springs is an amazing town.",
  "Arts-oriented, creative, quirky. 'Thoroughbreds'.",
  "Creativity (even in business/science) is the brand.",
  ["Skidmore"],
  "Skidmore is the 'Creative Thought' college. Even business majors here are encouraged to think like artists. Located in Saratoga Springs (a fantastic town), the quality of life is high. Admits are typically artsy, quirky, and open-minded. 'Happy' is a word often used to describe the student body."
);

DB["Union College"] = create(
  "Union College", "Schenectady, NY", "Private", "47%", "Moderate", "3.6+ W", "1230-1420", "$64,000",
  ["Engineering", "Economics", "Biology", "Political Science"],
  "Mother of Fraternities. Engineering + Liberal Arts. Trimester system.",
  "Balanced, social, interdisciplinary. 'Dutchmen'.",
  "Minerva Houses integrate social/academic life.",
  ["Union"],
  "Union was the first college to redefine the curriculum to include engineering. It remains a leader in integrating STEM with the humanities. It is also the 'Mother of Fraternities', so Greek life is historic here. Admits are balanced students who want a rigorous education with a traditional social scene."
);

DB["Ithaca College"] = create(
  "Ithaca College", "Ithaca, NY", "Private", "73%", "Moderate", "3.4+", "Test Blind", "$50,000",
  ["Film", "Theatre", "Physical Therapy", "Music"],
  "Creative, progressive, stunning views (Gorges). Park School of Communications.",
  "Creatives, performers, progressive activists. 'Bombers'.",
  "Park School (Comms) and Theatre are elite conservatories.",
  ["Ithaca", "IC"],
  "Ithaca College sits on the South Hill overlooking Cayuga Lake (and Cornell). It is famous for the Park School of Communications and its top-tier Theatre program. Admits are overwhelmingly creative or entering health professions (PT is huge). The vibe is progressive, artsy, and accepting."
);

DB["Marist College"] = create(
  "Marist College", "Poughkeepsie, NY", "Private", "60%", "Moderate", "3.5+ W", "1210-1380", "$46,000",
  ["Fashion", "Business", "Communication", "Computer Science"],
  "Hudson River views. IBM partnership. Fashion powerhouse. Study abroad.",
  "Polished, career-focused, friendly. 'Red Foxes'.",
  "Fashion program is top ranked globally. Florence campus is a draw.",
  ["Marist"],
  "Marist is defined by the Hudson River. The campus is beautiful. It is famous for its Fashion program and its deep partnership with IBM (tech focus). They also have a full campus in Florence, Italy, where freshmen can start. Admits are polished and career-oriented."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 20: NEW YORK (METRO)
// ==========================================

DB["Fordham University"] = create(
  "Fordham University", "Bronx/Manhattan, NY", "Private", "54%", "Hard", "3.7+ W", "1250-1460", "$60,000",
  ["Business", "Finance", "Communications", "Political Science"],
  "Jesuit University of NY. Two campuses (Rose Hill - Gothic, Lincoln Center - Urban).",
  "Ambitious, cosmopolitan, service-oriented. 'Rams'.",
  "Gabelli School of Business is elite. Choose campus carefully.",
  ["Fordham", "Rams"],
  "Fordham offers two worlds: the classic gothic campus of Rose Hill (Bronx) and the urban intensity of Lincoln Center (Manhattan). It is the Jesuit University of NYC. The Gabelli School of Business is a major pipeline to Wall Street. Admits are ambitious, often looking to intern extensively while studying."
);

DB["Vassar College"] = create(
  "Vassar College", "Poughkeepsie, NY", "Private", "19%", "Hard", "3.9+ W", "1370-1530", "$64,000",
  ["English", "Political Science", "Biology", "Drama"],
  "Seven Sisters history (now co-ed). Intellectual freedom. No core. Beautiful grounds.",
  "Free-thinkers, intellectuals, artistic. 'Brewers'.",
  "No Core Curriculum means you must love intellectual freedom.",
  ["Vassar"],
  "Vassar is an intellectual playground. Historically a women's college (now co-ed), it retains a spirit of radical openness and equality. There is no core curriculum. Admits are often brilliant, artistic, and independent thinkers who want to design their own path. The campus is an arboretum."
);

DB["Barnard College"] = create(
  "Barnard College", "New York, NY", "Private", "8%", "Very Hard", "4.0+ W", "1420-1560", "$62,000",
  ["Psychology", "English", "Economics", "Political Science"],
  "Women's College affiliated with Columbia. In NYC. Best of all worlds.",
  "Empowered, brilliant, city-loving women. 'Bears'.",
  "You get Columbia resources + Women's college support. 'Bold, Beautiful, Barnard'.",
  ["Barnard"],
  "Barnard is unique: an elite women's college that is also one of the undergraduate colleges of Columbia University. Students get the intimate support of a liberal arts college with the resources of an Ivy League research university. Admits are fiercely intelligent urbanites who want to be 'Bold, Beautiful, Barnard'."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 21: CONNECTICUT & RHODE ISLAND
// ==========================================

DB["University of Connecticut"] = create(
  "UConn", "Storrs, CT", "Public", "56%", "Hard", "3.7+ W", "1230-1420", "$18k/$40k",
  ["Business", "Engineering", "Nursing", "Psychology"],
  "Huskymania. Basketball capital. Research powerhouse in a rural setting.",
  "Spirited, resilient, diverse. 'Huskies'.",
  "Basketball is life here. Honors Program is excellent.",
  ["UConn", "Huskies"],
  "UConn is a 'Public Ivy' candidate with unmatched school spirit (11 women's basketball titles). It dominates the rural town of Storrs, creating a vibrant, self-contained campus life. Admits are spirited and resilient (it's cold). The university has massive research funding in engineering and agriculture."
);

DB["Wesleyan University"] = create(
  "Wesleyan University", "Middletown, CT", "Private", "16%", "Hard", "3.9+ W", "Test Blind", "$64,000",
  ["Film", "Economics", "English", "Neuroscience"],
  "The 'Independent' Ivy. Artistic, intellectual, activist. Open Curriculum.",
  "Creative, activist, non-conformist. 'Cardinals'.",
  "Film Studies is one of the best in the world. Activism is central.",
  ["Wesleyan"],
  "Wesleyan is famous for its independent streak. It attracts students who might have gone to Brown or Yale but wanted something edgier. The Film Studies program is legendary (Lin-Manuel Miranda went here). With no core curriculum, admits are expected to be intellectually aggressive and socially conscious."
);

DB["Trinity College"] = create(
  "Trinity College", "Hartford, CT", "Private", "36%", "Hard", "3.7+ W", "1300-1480", "$63,000",
  ["Economics", "Political Science", "Biology", "Engineering"],
  "Liberal Arts in the City. Wealthy, preppy, historic. Bantams.",
  "Ambitious, polished, urban-focused. 'Bantams'.",
  "Urban location (Hartford) is the differentiator from other NESCACs.",
  ["Trinity CT"],
  "Trinity offers a rare NESCAC experience: a liberal arts college in a state capital (Hartford). This provides massive internship access in government and insurance. The campus is stunningly beautiful. Admits are often polished, ambitious, and take advantage of the urban connection."
);

DB["Quinnipiac University"] = create(
  "Quinnipiac University", "Hamden, CT", "Private", "70%", "Moderate", "3.4+", "1080-1280", "$51,000",
  ["Health Sciences", "Nursing", "Business", "Communications"],
  "Sleeping Giant mountain. Polling Institute. Upscale/Modern campus.",
  "Career-focused, friendly, active. 'Bobcats'.",
  "Physician Assistant (PA) and Nursing programs are elite.",
  ["Quinnipiac", "Bobcats"],
  "Quinnipiac is famous for two things: its polling institute and its healthcare programs. The campus is modern and looks like a ski lodge (right next to Sleeping Giant State Park). Admits are overwhelmingly focused on health careers or business. It is a comfortable, upscale suburban campus."
);

DB["Fairfield University"] = create(
  "Fairfield University", "Fairfield, CT", "Private", "56%", "Hard", "3.6+ W", "1210-1370", "$53,000",
  ["Nursing", "Business", "Finance", "Communication"],
  "Jesuit, coastal, near NYC. Polished and pre-professional.",
  "Polished, service-minded, career-driven. 'Stags'.",
  "Dolan School of Business is a major Wall Street feeder.",
  ["Fairfield", "Stags"],
  "Fairfield is a hidden gem for business. Located on the 'Gold Coast' of CT, it has deep ties to NYC finance. As a Jesuit institution, it emphasizes service, but the vibe is distinctly pre-professional and polished. Admits are often looking for a direct path to a career in Manhattan."
);

DB["University of Rhode Island"] = create(
  "University of Rhode Island", "Kingston, RI", "Public", "75%", "Moderate", "3.4+", "1060-1260", "$15k/$32k",
  ["Nursing", "Marine Biology", "Business", "Pharmacy"],
  "Coastal vibe. Pharmacy and Engineering are strong. Beautiful location.",
  "Laid-back, friendly, beach-lovers. 'Rams'.",
  "Marine Bio and Pharmacy are standouts.",
  ["URI", "Rhody"],
  "URI captures the essence of the Ocean State. It is minutes from the beach. The Marine Biology and Ocean Engineering programs are world-class. Admits are often laid-back and friendly, but the Nursing and Pharmacy programs are rigorous and competitive. It balances fun and study well."
);

DB["Providence College"] = create(
  "Providence College", "Providence, RI", "Private", "53%", "Moderate", "3.6+ W", "1200-1380", "$55,000",
  ["Business", "Biology", "Finance", "Education"],
  "Dominican Catholic (Friars). Western Civ core. Spirited basketball.",
  "Faith-oriented, spirited, tight-knit. 'Friars'.",
  "Western Civilization core curriculum is central to the identity.",
  ["Providence", "PC", "Friars"],
  "PC is the only college in the US run by Dominican Friars. You will see friars in white habits walking around campus. The mandatory Western Civilization core curriculum binds all students together intellectually. Admits are often spirited (basketball is huge) and value the tight-knit, faith-based community."
);

DB["Bryant University"] = create(
  "Bryant University", "Smithfield, RI", "Private", "74%", "Moderate", "3.5+ W", "1100-1280", "$48,000",
  ["International Business", "Finance", "Accounting", "Marketing"],
  "Business 100%. The Archway. Career focused. Immersion.",
  "Entrepreneurs, business-minded, disciplined. 'Bulldogs'.",
  "International Business program is huge.",
  ["Bryant", "Bulldogs"],
  "Bryant is all about business. Even the Arts & Sciences students are required to minor in business. The focus is singular: career success. The 'Archway' tradition signifies the transition to alumni hood. Admits are pragmatic, disciplined, and focused on ROI."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 22: MASSACHUSETTS
// ==========================================

DB["University of Massachusetts Amherst"] = create(
  "UMass Amherst", "Amherst, MA", "Public", "63%", "Moderate", "3.7+ W", "1190-1390", "$17k/$37k",
  ["Computer Science", "Business", "Psychology", "Public Health"],
  "ZooMass no more. Research giant. Best campus food in US. College town paradise.",
  "Spirited, foodies, researchers. 'Minutemen'.",
  "Computer Science is ELITE and much harder to get into than general admit.",
  ["UMass", "UMass Amherst"],
  "UMass Amherst has shed its party school image to become a top-tier public research university. The food is consistently ranked #1 in the nation. It is part of the Five College Consortium, letting students take classes at nearby Amherst/Smith/Mt. Holyoke. Computer Science is a flagship, highly competitive program."
);

DB["University of Massachusetts Lowell"] = create(
  "UMass Lowell", "Lowell, MA", "Public", "85%", "Moderate", "3.4+", "1150-1320", "$16k/$34k",
  ["Engineering", "Business", "Criminal Justice", "Sound Recording"],
  "Industrial revolution city. Practical, gritty, engineering-focused.",
  "Makers, engineers, musicians. Underrated value.",
  "Engineering and Sound Recording Technology are the draws.",
  ["UMass Lowell", "UML"],
  "UMass Lowell is a blue-collar engine of innovation. The Engineering program is fantastic and affordable. It also boasts one of the best Sound Recording Technology programs in the country. The campus is urban and gritty, spread across the Merrimack River. Admits are practical and value ROI."
);

DB["University of Massachusetts Boston"] = create(
  "UMass Boston", "Boston, MA", "Public", "79%", "Moderate", "3.3+", "1060-1260", "$15k/$35k",
  ["Nursing", "Business", "Psychology", "Computer Science"],
  "The only public research uni in Boston. Waterfront campus. Diverse commuter hub.",
  "Urban, diverse, resilient commuters.",
  "Great for nursing and business internships in the city.",
  ["UMass Boston", "UMB"],
  "UMass Boston is the city's public option. It is incredibly diverse and sits right on the harbor (stunning views). It is primarily a commuter school, so the social life is what you make of it in the city. The Nursing program is excellent and highly connected to Boston's world-class hospitals."
);

DB["Worcester Polytechnic Institute"] = create(
  "WPI", "Worcester, MA", "Private", "57%", "Hard", "3.8+ W", "Test Blind", "$58,000",
  ["Robotics", "Engineering", "Computer Science", "Game Design"],
  "Theory and Practice. 7-week terms. Projects (IQP/MQP) are mandatory.",
  "Collaborative engineers. Fast-paced learners. 'Goats'.",
  "The Project-based curriculum is unique. You must like teams.",
  ["WPI"],
  "WPI operates on fast 7-week terms. It is defined by its project-based curriculum (IQP and MQP), where students solve real problems, often abroad. It fosters a culture of collaboration, not cutthroat competition. Admits are engineers who want to build things, not just study theory."
);

DB["Brandeis University"] = create(
  "Brandeis University", "Waltham, MA", "Private", "39%", "Hard", "3.8+ W", "1370-1530", "$64,000",
  ["Biology", "Economics", "Psychology", "Jewish Studies"],
  "Social Justice roots. Research intensive. Inclusive and warm.",
  "Intellectual, activist, quirky. 'Judges'.",
  "Social justice is the founding pillar. Mention it.",
  ["Brandeis"],
  "Brandeis was founded by the American Jewish community as a non-sectarian university. It is a Tier 1 research university with the intimacy of a liberal arts college. Social justice is baked into its DNA. Admits are often activists, intellectuals, and deeply compassionate. The vibe is warm and accepting."
);

DB["Williams College"] = create(
  "Williams College", "Williamstown, MA", "Private", "8%", "Very Hard", "4.0+ W", "1460-1560", "$64,000",
  ["Economics", "Mathematics", "Biology", "Art History"],
  "The Purple Valley. Tutorials (2 students, 1 prof). Nature + Intellect.",
  "Brilliant humbles. Nature lovers. 'Ephs'.",
  "The Oxford-style Tutorials are the key academic differentiator.",
  ["Williams"],
  "Williams is often ranked the #1 Liberal Arts College in America. The 'Tutorial' system (2 students, 1 professor) offers unmatched academic intimacy. Nestled in the Berkshires, it is isolated and stunning. Admits are arguably as strong as Harvard admits but prefer nature and community over urban status."
);

DB["Amherst College"] = create(
  "Amherst College", "Amherst, MA", "Private", "9%", "Very Hard", "4.0+ W", "1450-1560", "$66,000",
  ["Economics", "English", "Mathematics", "Political Science"],
  "Open Curriculum. Singing College. Five College Consortium. Intense intellect.",
  "Intellectuals, musicians, focused students. 'Mammoths'.",
  "Open Curriculum allows focus. Being part of 5-Colleges expands options.",
  ["Amherst"],
  "Amherst is the other contender for #1 LAC. It has an Open Curriculum (no requirements) and deep resources. It is part of the Five College Consortium, making it feel bigger than it is. Admits are intellectual heavyweights who want rigorous discussion. The 'Singing College' tradition keeps music central."
);

DB["Wellesley College"] = create(
  "Wellesley College", "Wellesley, MA", "Private", "13%", "Hard", "4.0+ W", "1430-1540", "$64,000",
  ["Economics", "Political Science", "Neuroscience", "English"],
  "Most powerful women's network. Hillary Clinton's alma mater. Cross-reg with MIT.",
  "Ambitious, powerful, articulate women. 'The Blue'.",
  "You can cross-register at MIT. Use that.",
  ["Wellesley"],
  "Wellesley produces women who run the world. The alumni network is terrifyingly powerful. The campus is a landscape masterpiece (Mona Lisa Smile was filmed here). Academically, it is grueling. Admits are ambitious and can cross-register for classes at MIT. It is the gold standard for women's education."
);

DB["Smith College"] = create(
  "Smith College", "Northampton, MA", "Private", "23%", "Hard", "3.9+ W", "1380-1520", "$63,000",
  ["Government", "Engineering", "Economics", "English"],
  "Women's college with engineering. Noho is cool/artsy. House system.",
  "Independent, activist, brilliant women. 'Pioneers'.",
  "Only women's college with its own Engineering school.",
  ["Smith"],
  "Smith is in the cool, artsy town of Northampton. It is unique among women's colleges for having its own accredited Engineering program. The housing system (houses, not dorms) creates fierce loyalty. Admits are independent, progressive, and often artistic. It's a place where you can truly be yourself."
);

DB["Mount Holyoke College"] = create(
  "Mount Holyoke College", "South Hadley, MA", "Private", "40%", "Hard", "3.7+ W", "1320-1480", "$62,000",
  ["Biology", "Psychology", "Economics", "English"],
  "First of the Seven Sisters. Inclusive (trans-friendly). Beautiful waterfalls.",
  "Thoughtful, supportive, global citizens. 'MoHos'.",
  "Traditions (Mountain Day) are huge. Very welcoming community.",
  ["Mount Holyoke", "MHC"],
  "Mount Holyoke is the oldest of the Seven Sisters and arguably the most inclusive. It attracts a global student body. The campus features lakes and waterfalls. Admits are collaborative and supportive; the 'shark' mentality doesn't exist here. It's a place for deep thought and warm community."
);

DB["College of the Holy Cross"] = create(
  "Holy Cross", "Worcester, MA", "Private", "36%", "Hard", "3.8+ W", "1290-1460", "$60,000",
  ["Economics", "Political Science", "Psychology", "English"],
  "Jesuit Liberal Arts. Purple pride. Rigorous and classic.",
  "Service-oriented, athletic, polished. 'Crusaders'.",
  "Jesuit identity is strong ('Men and women for others').",
  ["Holy Cross"],
  "Holy Cross is a premier Jesuit liberal arts college. It sits on a steep hill in Worcester. The education is classically rigorous (Latin/Greek are celebrated). Admits are often athletes or service-oriented leaders who value the Jesuit mission. The alumni network in Boston/NYC finance is exceptionally strong."
);

DB["Babson College"] = create(
  "Babson College", "Wellesley, MA", "Private", "22%", "Hard", "3.8+ W", "1340-1500", "$60,000",
  ["Entrepreneurship", "Finance", "Marketing", "Business Analytics"],
  "#1 for Entrepreneurship involved. Foundations of Management (FME).",
  "Entrepreneurs, hustlers, business-leaders. 'Beavers'.",
  "Everyone starts a business freshman year (FME). You must love business.",
  ["Babson"],
  "Babson is singular: it is the best school in the world for entrepreneurship. Every freshman starts a real company with real money in the FME course. Admits are hustlers—they sold sneakers or ran non-profits in high school. It is small, focused, and intense. If you want to be a founder, go here."
);

DB["Bentley University"] = create(
  "Bentley University", "Waltham, MA", "Private", "58%", "Moderate", "3.6+ W", "1230-1410", "$58,000",
  ["Actuarial Science", "Accounting", "Finance", "Data Analytics"],
  "Business uses technology. Trading room. High ROI.",
  "Quant-focused business students. Professional. 'Falcons'.",
  "Trading room is Wall Street level. Very high placement rates.",
  ["Bentley"],
  "Bentley is the 'Business University'. It focuses on the intersection of business and technology. The Trading Room is impressive. Admits are often 'quant' business students—interested in accounting, actuarial science, or finance. The vibe is professional; students often wear suits to class for presentations."
);

DB["Emerson College"] = create(
  "Emerson College", "Boston, MA", "Private", "42%", "Hard", "3.7+ W", "1200-1400", "$56,000",
  ["Journalism", "Film", "Marketing", "Theatre"],
  "Communications and Arts only. Downtown Boston. Creative hub.",
  "Storytellers, filmmakers, creatives. 'Lions'.",
  "It is niche: Comms and Arts only. Portfolio/Reel is key.",
  ["Emerson"],
  "Emerson is located right on Boston Common. It is dedicated solely to communication and the arts. If you see a student filming on the street in Boston, they go to Emerson. Admits are storytellers—journalists, filmmakers, and actors. It is famously LGBTQ+ friendly and incredibly creative."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 23: NORTHERN NEW ENGLAND
// ==========================================

DB["University of Vermont"] = create(
  "University of Vermont", "Burlington, VT", "Public", "64%", "Moderate", "3.6+ W", "1160-1350", "$19k/$43k",
  ["Environmental Science", "Nursing", "Business", "Biology"],
  "Green Mountains. Progressive, sustainable, outdoorsy. 'Groovy U'.",
  "Outdoorsy, environmentally conscious, progressive. 'Catamounts'.",
  "Environmental focus is genuine and massive.",
  ["UVM", "Vermont", "Catamounts"],
  "UVM is the ultimate 'green' school. Located in Burlington (a fantastic college town), it is a leader in sustainability and environmental science. Admits are almost universally outdoorsy (skiing is life) and progressive. The vibe is chill, smart, and deeply connected to nature."
);

DB["Middlebury College"] = create(
  "Middlebury College", "Middlebury, VT", "Private", "15%", "Hard", "4.0+ W", "1400-1550", "$64,000",
  ["Languages", "Economics", "Environmental Studies", "International Politics"],
  "Language immersion (The Pledges). Ski bowl. Global focus. Isolated intellect.",
  "Global citizens, linguists, skiers. 'Panthers'.",
  "Language Schools are world renowned. Mention global interest.",
  ["Middlebury"],
  "Middlebury is famous for its Language Schools (students sign a pledge to speak only their target language). It is deeply global in outlook. It also owns its own ski mountain (the Snow Bowl). Admits are intellectual, often wealthy, and ready for a rigorous education in a beautiful, isolated setting."
);

DB["University of New Hampshire"] = create(
  "University of New Hampshire", "Durham, NH", "Public", "87%", "Moderate", "3.4+", "1100-1280", "$19k/$37k",
  ["Business", "Marine Biology", "Engineering", "Nursing"],
  "Classic New England campus. Research active. Friendly and spirited.",
  "Friendly, active, research-oriented. 'Wildcats'.",
  "Undergraduate research opportunities are plentiful.",
  ["UNH", "New Hampshire", "Wildcats"],
  "UNH offers the quintessential New England college experience. The campus is beautiful during the fall. It is a land-sea-space grant university, meaning research is happening everywhere. Admits are friendly, often from the region, and appreciate the balance of strong academics and D1 hockey spirit."
);

DB["University of Maine"] = create(
  "University of Maine", "Orono, ME", "Public", "94%", "Safety", "3.2+", "1040-1240", "$11k/$32k",
  ["Marine Science", "Engineering", "Forestry", "Nursing"],
  "The flagship of the north. Research grounded in the land/sea. Hockey is huge.",
  "Down-to-earth, hardy, outdoorsy. 'Black Bears'.",
  "Marine Science and Forestry are unique/elite programs.",
  ["UMaine", "Maine", "Black Bears"],
  "UMaine is the northern anchor of research. It is world-class in fields involving the natural world: Forestry, Marine Science, and Climate Change. Admits are hardy (winters are real), unpretentious, and love the outdoors. Hockey games are the major social event."
);

DB["Bowdoin College"] = create(
  "Bowdoin College", "Brunswick, ME", "Private", "9%", "Very Hard", "4.0+ W", "Test Blind", "$61,000",
  ["Government", "Economics", "Biology", "Environmental Studies"],
  "The Common Good. Loboasters. Intense intellect + kindness. No loans.",
  "Kind, brilliant, community-minded. 'Polar Bears'.",
  "The 'Common Good' isn't just a slogan. It's the admissions criteria.",
  ["Bowdoin"],
  "Bowdoin is special. It famously replaced loans with grants years ago. The food is legendary (lobster bakes). But the culture of 'The Common Good' is what defines it; admits are brilliant but explicitly kind and collaborative. Located on the coast of Maine, it attracts students who love nature and community."
);

DB["Bates College"] = create(
  "Bates College", "Lewiston, ME", "Private", "14%", "Hard", "3.9+ W", "Test Blind", "$60,000",
  ["Economics", "Politics", "Psychology", "Biology"],
  "Short Term (May). Egalitarian (abolitionist roots). No fraternities.",
  "Social justice minded, humble intellectuals. 'Bobcats'.",
  "Test optional pioneer. Social justice roots run deep.",
  ["Bates"],
  "Bates was the first co-ed college in New England and has deep abolitionist roots. That spirit of equality remains; there are no fraternities. The 'Short Term' in May allows for unique, singular course focus. Admits are often down-to-earth, intellectual, and deeply committed to equity."
);

DB["Colby College"] = create(
  "Colby College", "Waterville, ME", "Private", "9%", "Very Hard", "4.0+ W", "1430-1540", "$61,000",
  ["Economics", "Government", "Biology", "Environmental Policy"],
  "Jan Plan. Waterville investment. Intense growth. Global ambition.",
  "Ambitious, global, polished. 'Mules'.",
  "Jan Plan (month of independent study) is a favorite feature.",
  ["Colby"],
  "Colby has transformed itself with massive investment in downtown Waterville and new facilities. It is arguably the most ambitious of the Maine NESCACs. The 'Jan Plan' offers a break for internships or wild courses. Admits are high-achieving, often polished, and looking for a global launchpad from Maine."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 24: WASHINGTON D.C.
// ==========================================

DB["Georgetown University"] = create(
  "Georgetown University", "Washington, D.C.", "Private", "12%", "Very Hard", "4.0+ W", "1380-1550", "$65,000",
  ["International Relations", "Political Science", "Business", "Government"],
  "Jesuit Ivy. SFS (School of Foreign Service) is world #1. Politics central.",
  "Politicos, global leaders, preppy, ambitious. 'Hoyas'.",
  "SFS is the crown jewel. Jesuit values ('Cura Personalis') matter.",
  ["Georgetown", "Hoyas"],
  "Georgetown is the heart of the political world. The Walsh School of Foreign Service (SFS) is practically a requirement for future diplomats. It is the oldest Catholic university in the US, but the vibe is fiercely intellectual and global. Admits are often polished, political junkies who want to be where the decisions happen."
);

DB["George Washington University"] = create(
  "George Washington University", "Washington, D.C.", "Private", "41%", "Hard", "3.8+ W", "1280-1470", "$64,000",
  ["Political Science", "International Affairs", "Journalism", "Public Health"],
  "Foggy Bottom location (next to State Dept). Urban. Internships are life.",
  "Intern-heavy, ambitious, city-dwellers. 'Colonials' (Revolutionaries).",
  "Location is the hook. You are in the city. No campus walls.",
  ["GWU", "GW"],
  "GW is an urban campus integrated directly into Foggy Bottom, blocks from the White House. Students here don't just study; they intern year-round. It is for the student who wants the city to be their campus. The vibe is fast-paced, professional, and politically charged."
);

DB["American University"] = create(
  "American University", "Washington, D.C.", "Private", "36%", "Hard", "3.7+ W", "1220-1390", "$55,000",
  ["International Studies", "Political Science", "Communications", "Public Affairs"],
  "Wonk capital. Idealistic and activist. Traditional campus in the city (Tenleytown).",
  "Activists, policy wonks, global citizens. 'Eagles'.",
  "Most politically active campus in the US. 'Wonks' is their brand.",
  ["American", "AU"],
  "American University is for 'Wonks'—people passionate about policy and change. Unlike GW, it has a traditional gated campus in a quiet neighborhood, offering a retreat from the city. Admits are overwhelmingly progressive, activist, and focused on international service."
);

DB["Howard University"] = create(
  "Howard University", "Washington, D.C.", "Private", "35%", "Hard", "3.6+ W", "1080-1290", "$31,000",
  ["Biology", "Political Science", "Journalism", "Business"],
  "The Mecca. HBCU flagship. Cultural epicenter. Excellence.",
  "Leaders, culturally proud, ambitious. 'Bison'.",
  "HBCU experience is singular. 'The Mecca' of Black education.",
  ["Howard", "The Mecca"],
  "Howard is 'The Mecca'. It is the most prestigious HBCU in the nation and a cultural powerhouse (Alumni: Kamala Harris, Chadwick Boseman). The campus is vibrant, fashionable, and intellectually rigorous. Admits are looking for Black excellence and a supportive, transformative community."
);

DB["Catholic University of America"] = create(
  "Catholic University", "Washington, D.C.", "Private", "85%", "Moderate", "3.5+ W", "1020-1230", "$53,000",
  ["Architecture", "Politics", "Nursing", "Business"],
  "Papal charter. Beautiful green campus. Faith + Politics.",
  "Faith-oriented, friendly, service-minded. 'Cardinals'.",
  "Only university with a diverse Papal charter. Faith is visible.",
  ["CUA", "Catholic"],
  "CUA is the national university of the Catholic Church. It has the largest, greenest campus in DC, situated in Brookland. The vibe is friendlier and less cutthroat than Georgetown. Admits often value the integration of faith and reason, and the Architecture and Nursing programs are hidden gems."
);














// ==========================================
// MANUAL DEEP DIVE BATCH 41: TEXAS REGIONALS (DEEP DIVE)
// ==========================================

DB["University of North Texas"] = create(
  "UNT", "Denton, TX", "Public", "79%", "Moderate", "3.4+", "1060-1280", "$11k/$23k",
  ["Music", "Jazz Studies", "Visual Arts", "Logistics"],
  "Mean Green. Artsy/Jazz powerhouse. Denton (cool town). Creative.",
  "Creative, musical, eclectic. 'Mean Green'.",
  "College of Music (specifically Jazz) is world-renowned.",
  ["UNT", "North Texas"],
  "UNT is the 'cool kid' of Texas public universities. Located in Denton (a famous music town), it has one of the best music schools in the world, especially for Jazz. The vibe is artsy, eclectic, and creative. Admits are often musicians, artists, or just people who want a quirkier campus."
);

DB["Texas Woman's University"] = create(
  "Texas Woman's University", "Denton, TX", "Public", "94%", "Moderate", "3.2+", "Test Blind", "$10k/$22k",
  ["Nursing", "Occupational Therapy", "Health Science", "Education"],
  "Largest state-supported university for women. Co-ed now. Health focus.",
  "Health-focused, supportive, empowered. 'Pioneers'.",
  "College of Nursing is massive and produces thousands of nurses.",
  ["TWU", "Texas Womans"],
  "TWU is in Denton (near UNT). While fully co-ed now, it is historically a women's college and still leans heavily that way. It is a massive healthcare engine, producing more nurses and occupational therapists than almost anyone else in Texas. Admits are laser-focused on healthcare."
);

DB["Sam Houston State University"] = create(
  "Sam Houston State", "Huntsville, TX", "Public", "84%", "Moderate", "3.2+", "1020-1200", "$10k/$22k",
  ["Criminal Justice", "Education", "Forensic Science", "Business"],
  "Criminal Justice powerhouse. Bearkats. Piney Woods.",
  "Justice-minded, practical, spirited. 'Bearkats'.",
  "College of Criminal Justice is consistently ranked Top 5 in the US.",
  ["SHSU", "Sam Houston"],
  "SHSU is the place to go if you want to be in the FBI, police, or corrections. Its Criminal Justice program is elite and massive. Located in historic Huntsville (near the prison museum), it lives its mission. Admits are often pragmatists looking to serve in justice or education."
);

DB["Stephen F. Austin State University"] = create(
  "Stephen F. Austin", "Nacogdoches, TX", "Public", "88%", "Moderate", "3.1+", "1000-1200", "$10k/$22k",
  ["Forestry", "Education", "Business", "Music"],
  "Lumberjacks. Piney Woods. Nature. Axe 'em Jacks.",
  "Outdoorsy, friendly, spirited. 'Lumberjacks'.",
  "Arthur Temple College of Forestry is one of the distinct assets here.",
  ["SFA", "Stephen F Austin"],
  "SFA is deep in the East Texas Piney Woods. Naturally, its Forestry and Agriculture programs are standout. The mascot (Lumberjacks) and hand sign (Axe 'em!) are iconic. It feels like a classic, spirited Texas town. Admits love the outdoors and the small-town vibe."
);

DB["Lamar University"] = create(
  "Lamar University", "Beaumont, TX", "Public", "84%", "Moderate", "3.1+", "980-1180", "$10k/$22k",
  ["Engineering", "Nursing", "Business", "Deaf Studies"],
  "Golden Triangle (Energy). Engineering focus. Deaf Education leader.",
  "Engineers, resilient, local. 'Cardinals'.",
  "Deaf Studies/Audiology generally renowned. strong Engineering ties to local refineries.",
  ["Lamar"],
  "Lamar serves the 'Golden Triangle' energy hub of Texas. Consequently, its engineering graduates get snapped up by local refineries and plants. Uniquely, it is also a national leader in Deaf Studies and Education. Admits are typically career-focused."
);

DB["Texas A&M University-Corpus Christi"] = create(
  "TAMU Corpus Christi", "Corpus Christi, TX", "Public", "87%", "Moderate", "3.3+", "1020-1210", "$10k/$23k",
  ["Marine Biology", "Nursing", "Unmanned Systems", "Environmental Science"],
  "The Island University. On the beach. Drones. Marine Research.",
  "Coastal, researchers, laid-back. 'Islanders'.",
  "Only university in the US located on its own island.",
  ["TAMUCC", "Corpus Christi"],
  "TAMU-CC is 'The Island University', literally located on an island. It is the premier spot for Marine Biology and drone research (UAS) in Texas. Student life involves beaches and water. Admits are researchers who want to study the ocean by living in it."
);

DB["West Texas A&M University"] = create(
  "West Texas A&M", "Canyon, TX", "Public", "89%", "Moderate", "3.2+", "980-1180", "$9k/$10k",
  ["Agriculture", "Business", "Education", "Music"],
  "Panhandle. Buffaloes. Palo Duro Canyon. Agriculture.",
  "Rural, hardworking, friendly. 'Buffaloes'.",
  "Close ties to the massive agriculture/cattle industry of the Panhandle.",
  ["WTAMU", "West Texas"],
  "WTAMU is the flagship of the Texas Panhandle. Located in Canyon (near the stunning Palo Duro Canyon), it is an Agriculture powerhouse. The campus is friendly and deeply Texan. Admits are often rural students or those who love the wide-open spaces of West Texas."
);

DB["Texas Southern University"] = create(
  "Texas Southern", "Houston, TX", "Public", "91%", "Safety", "2.8+", "Test Blind", "$9k/$21k",
  ["Pharmacy", "Law", "Aviation", "Business"],
  "HBCU. Third Ward Houston. Ocean of Soul (Band). Thurgood Marshall Law.",
  "Urban, ambitious, resilient. 'Tigers'.",
  "Home to the Thurgood Marshall School of Law and a Pharmacy school.",
  ["MTSU", "TxSU"],
  "Texas Southern (TSU) is one of the largest HBCUs in the nation, located in the heart of Houston's Third Ward. It is famous for its Law School and Pharmacy School. The 'Ocean of Soul' marching band is legendary. Admits are culturally proud and often aspiring lawyers or pharmacists."
);

DB["Prairie View A&M University"] = create(
  "Prairie View A&M", "Prairie View, TX", "Public", "76%", "Moderate", "3.0+", "960-1130", "$11k/$26k",
  ["Engineering", "Nursing", "Agriculture", "Architecture"],
  "HBCU. The Hill. Marching Storm. Engineering producers.",
  "Spirited, STEM-focused, proud. 'Panthers'.",
  "Produces a huge number of African American engineers and architects.",
  ["PVAMU", "Prairie View"],
  "PVAMU is the second oldest public university in Texas and a legendary HBCU. Known as 'The Hill', it produces massive numbers of Black engineers and architects. The 'Marching Storm' band is a national treasure. Admits are usually looking for the full HBCU experience with high ROI majors."
);

DB["St. Mary's University"] = create(
  "St. Mary's University", "San Antonio, TX", "Private", "86%", "Moderate", "3.4+", "1060-1260", "$34,000",
  ["Law", "Business", "Political Science", "Biology"],
  "Marianist Catholic. Law School pipeline. Family spirit. Service.",
  "Community-focused, faithful, polite. 'Rattlers'.",
  "Direct pipeline to St. Mary's Law School is a big draw.",
  ["St. Mary's", "St Marys"],
  "St. Mary's is the oldest Catholic university in the Southwest. Run by the Marianists, it emphasizes family spirit and adaptation. It is most famous for its Law School—many Texas judges went here. Admits are typically polite, community-minded students."
);

DB["St. Edward's University"] = create(
  "St. Edward's University", "Austin, TX", "Private", "87%", "Moderate", "3.4+", "1080-1280", "$49,000",
  ["Psychology", "Global Studies", "Business", "Video Game Development"],
  "Holy Cross Catholic. Hilltop views of Austin. Social justice. Global.",
  "Socially conscious, global, Austin-cool. 'Hilltoppers'.",
  "Famous for 'Red Doors' and view of downtown Austin.",
  ["St. Edwards", "St Eds"],
  "St. Edward's sits on a hill overlooking downtown Austin. It is Holy Cross Catholic, meaning it is very focused on social justice and the mind-heart connection. The vibe is 'Austin cool' but thoughtful. Admits are often looking for a smaller, more personal alternative to UT Austin."
);

DB["Abilene Christian University"] = create(
  "Abilene Christian", "Abilene, TX", "Private", "64%", "Moderate", "3.5+", "1080-1290", "$40,000",
  ["Business", "Nursing", "Psychology", "Theology"],
  "Christian (Church of Christ). Tech-forward (Mobile Learning). Community.",
  "Faithful, innovative, friendly. 'Wildcats'.",
  "Known for being incredibly tech-forward (gave iPhones/iPads early on).",
  ["ACU"],
  "ACU is a major private Christian university in West Texas. It combines deep faith (Church of Christ) with a surprising focus on technology and innovation. The campus community is incredibly tight-knit. Admits are faith-centered students who want top-tier facilities."
);

DB["University of Dallas"] = create(
  "University of Dallas", "Irving, TX", "Private", "54%", "Moderate", "3.6+", "1130-1360", "$46,000",
  ["English", "Theology", "Politics", "Classics"],
  "Conservative Catholic. The Core (Great Books). Rome Semester. Intellectual.",
  "Intellectual, Catholic, traditional. 'Crusaders'.",
  "The 'rome Semester' is legendary—almost everyone goes.",
  ["UDallas", "U Dallas"],
  "University of Dallas is the 'Smart Catholic School' of Texas. It is famous for a rigorous 'Core Curriculum' based on the Great Books. Almost every sophomore spends a semester at their campus in Rome, Italy. Admits are often intellectual, traditional Catholics who love philosophy."
);

DB["Southwestern University"] = create(
  "Southwestern University", "Georgetown, TX", "Private", "45%", "Moderate", "3.6+", "1140-1340", "$48,000",
  ["Business", "Psychology", "Biology", "Political Science"],
  "First University in Texas. Liberal Arts powerhouse. Paideia (connections).",
  "Intellectual, curious, sunny. 'Pirates'.",
  "The 'Paideia' philosophy encourages connecting different disciplines.",
  ["Southwestern"],
  "Southwestern is Texas' oldest university. It is a premier liberal arts college (think 'Southern Ivy'). Located in Georgetown (a cute town north of Austin), it encourages students to make connections between completely different subjects. Admits are smart, curious students who don't want a mega-university."
);

DB["Austin College"] = create(
  "Austin College", "Sherman, TX", "Private", "54%", "Moderate", "3.5+", "1100-1300", "$44,000",
  ["Pre-Med", "Business", "Psychology", "International Relations"],
  "Kangaroos (Roo). Mentorship. High Med School acceptance. Sherman.",
  "Smart, quirky, spirited. 'Kangaroos'.",
  "The 'Roo' mascot is one of the best. Over 90% med school acceptance rate some years.",
  ["Austin College"],
  "Austin College is NOT in Austin (it's in Sherman), but it IS great. It is known for incredible mentorship and sky-high medical school acceptance rates. The mascot is a Kangaroo. Admits are often high achievers who want personal attention and a quirky, smart community."
);

DB["Hardin-Simmons University"] = create(
  "Hardin-Simmons", "Abilene, TX", "Private", "88%", "Moderate", "3.4+", "1020-1220", "$31,000",
  ["Physical Therapy", "Business", "Theology", "Nursing"],
  "Cowboy Band. Baptist. Western Heritage. Healthcare.",
  "Faithful, western, friendly. 'Cowboys'.",
  "Home to the 'World Famous Cowboy Band'.",
  ["HSU", "Hardin-Simmons"],
  "Hardin-Simmons embraces the text 'Western Heritage'. The Cowboy Band marches in boots and cowboy hats. It is deeply Baptist and strong in healthcare (PT/Nursing). Admits are often faith-focused students who love the traditions of West Texas."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 42: OKLAHOMA REGIONALS
// ==========================================

DB["University of Central Oklahoma"] = create(
  "UCO", "Edmond, OK", "Public", "70%", "Moderate", "3.1+", "980-1180", "$8k/$19k",
  ["Forensic Science", "Education", "Nursing", "Music"],
  "Forensic Science Institute. Metropolitan. Jazz. Bronchos.",
  "Urban, investigative, musical. 'Bronchos'.",
  "W. Roger Webb Forensic Science Institute is one of the best in the nation.",
  ["UCO", "Central Oklahoma"],
  "UCO is a major metropolitan university in Edmond (OKC suburb). It is most famous for its Forensic Science Institute—students come from all over to learn CSI skills. The Jazz program is also elite. Admits are often commuters or students wanting a city vibe."
);

DB["Northeastern State University"] = create(
  "Northeastern State", "Tahlequah, OK", "Public", "95%", "Moderate", "3.0+", "Test Blind", "$7k/$16k",
  ["Optometry", "Education", "Indigenous Studies", "Business"],
  "Tahlequah (Cherokee Nation capital). Optometry school. RiverHawks.",
  "Culturally aware, local, health-focused. 'RiverHawks'.",
  "Home to the only College of Optometry in Oklahoma.",
  ["NSU", "Northeastern State"],
  "NSU is located in Tahlequah, the capital of the Cherokee Nation. It has deep ties to indigenous culture and history (Center for Tribal Studies). It also hosts Oklahoma's only Optometry school. Admits are often local students or those interested in tribal sovereignty and health."
);

DB["Oral Roberts University"] = create(
  "Oral Roberts University", "Tulsa, OK", "Private", "78%", "Moderate", "3.4+", "1020-1250", "$31,000",
  ["Theology", "Nursing", "Business", "Engineering"],
  "Charismatic Christian. Prayer Tower. Whole Person Education. Global.",
  "Spirit-empowered, global, energetic. 'Golden Eagles'.",
  "Famous for 'Whole Person Education' (Mind, Body, Spirit).",
  ["ORU", "Oral Roberts"],
  "ORU is a globally famous Charismatic Christian university. The architecture (Prayer Tower) is futuristic and iconic. Students emphasize 'Whole Person' fitness—physical fitness is literally graded. Admits are typically deeply religious, Spirit-filled students who want a rigorous, faith-first education."
);

DB["Oklahoma City University"] = create(
  "Oklahoma City University", "Oklahoma City, OK", "Private", "70%", "Moderate", "3.5+", "1080-1280", "$33,000",
  ["Dance", "Musical Theatre", "Law", "Nursing"],
  "Performing Arts powerhouse. Broadway pipeline. OCU Stars.",
  "Talented, performers, confident. 'Stars'.",
  "The School of Theatre and Dance sends an insane number of grads to Broadway.",
  ["OCU", "Oklahoma City"],
  "OCU is a performing arts juggernaut. If you see a Rockette or a Broadway star, there is a good chance they went here. It also has a respected Law School. The campus is right in the city. Admits are often wildly talented performers with big dreams."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 43: PENNSYLVANIA DEEP DIVE (PASSHE & PRIVATES)
// ==========================================

DB["West Chester University of Pennsylvania"] = create(
  "West Chester University", "West Chester, PA", "Public", "88%", "Moderate", "3.4+", "1060-1240", "$10k/$22k",
  ["Education", "Business", "Music", "Health Sciences"],
  "Largest PASSHE school. Cute town. Music & Education roots. Spirited.",
  "Social, active, polished. 'Golden Rams'.",
  "School of Music and College of Education are the historical pillars.",
  ["WCU", "West Chester"],
  "West Chester is the giant of the PA state system (PASSHE). Located in an awesome town near Philly, it feels more like a mid-sized state flagship than a regional. It is highly social and spirited. Admits are often looking for the big college experience without the Penn State price tag."
);

DB["Bloomsburg University of Pennsylvania"] = create(
  "Bloomsburg University", "Bloomsburg, PA", "Public", "90%", "Moderate", "3.2+", "Test Blind", "$11k/$23k",
  ["Nursing", "Business", "Audiology", "Education"],
  "Commonwealth U. The Big Fair. Nursing reputation. Hills.",
  "Friendly, gritty, practical. 'Huskies'.",
  "Nursing program is famously rigorous and respected in PA.",
  ["Bloomsburg"],
  "Bloomsburg (now part of Commonwealth University) is famous for two things: The Great Bloomsburg Fair and its Nursing program. The campus sits on a steep hill overlooking the town. Admits are often hard-working students from Eastern PA looking for solid career prep."
);

DB["Slippery Rock University"] = create(
  "Slippery Rock University", "Slippery Rock, PA", "Public", "74%", "Moderate", "3.3+", "1000-1180", "$10k/$18k",
  ["Physical Therapy", "Safety Management", "Education", "Exercise Science"],
  "The Rock. Funny name, serious science. PT powerhouse. Spirit.",
  "Spirited, active, health-focused. 'The Rock'.",
  "Physical Therapy (DPT) and Safety Management are flagship programs.",
  ["Slippery Rock", "The Rock"],
  "Yes, the name is 'Slippery Rock', and they own it ('I chose The Rock'). It is a powerhouse for Health Sciences, especially PT and Exercise Science. Students are incredibly active and spirited. Admits are often future physical therapists or safety pros."
);

DB["Indiana University of Pennsylvania"] = create(
  "IUP", "Indiana, PA", "Public", "92%", "Moderate", "3.2+", "960-1170", "$11k/$19k",
  ["Criminology", "Safety Sciences", "Business", "Psychology"],
  "Cook Honors College. PhD programs. The Oak Grove. Research.",
  "Academic, research-focused, diverse. 'Crimson Hawks'.",
  "Cook Honors College is considered one of the best in the nation.",
  ["IUP"],
  "IUP is a uniqueness in the PA system—it grants PhDs and has a heavy research focus. The Cook Honors College offers a private-school liberal arts experience at a public price. Admits are often smart students who want research opportunities without the tuition debt."
);

DB["Millersville University"] = create(
  "Millersville University", "Millersville, PA", "Public", "88%", "Moderate", "3.2+", "1020-1200", "$11k/$23k",
  ["Meteorology", "Education", "Social Work", "Technology"],
  "Weather center. Teacher factory. Lancaster County. Duck pond.",
  "Friendly, curious, grounded. 'Marauders'.",
  "Meteorology program is a unexpected national standout.",
  ["Millersville"],
  "Millersville is in Amish Country (Lancaster), but it's a high-tech hub for Meteorology (weather nerds love it here). It started as a teacher's college and still produces top educators. Admits are generally friendly, grounded students who appreciate the quiet setting."
);

DB["Shippensburg University"] = create(
  "Shippensburg University", "Shippensburg, PA", "Public", "88%", "Moderate", "3.1+", "980-1160", "$11k/$21k",
  ["Business", "Criminal Justice", "Education", "Psychology"],
  "Ship. John L. Grove College of Business. Raiders. Valley.",
  "Business-minded, pragmatic, social. 'Raiders'.",
  "The Business school is AACSB accredited and highly respected.",
  ["Shippensburg", "Ship"],
  "Shippensburg ('Ship') is the business school of the PASSHE system. The John L. Grove College of Business is excellent. Located in the Cumberland Valley, it's a bit rural but the campus life is active. Admits are often future accountants and managers."
);

DB["Duquesne University"] = create(
  "Duquesne University", "Pittsburgh, PA", "Private", "84%", "Moderate", "3.5+", "1130-1320", "$43,000",
  ["Pharmacy", "Nursing", "Business", "Law"],
  "Catholic (Spiritan). Downtown Pittsburgh (literally). Med/Law/Pharm.",
  "Urban, professional, faithful. 'Dukes'.",
  "Pharmacy and Nursing are the mega-majors here.",
  ["Duquesne"],
  "Duquesne sits on a bluff right in downtown Pittsburgh—the views are insane. It is a Spiritan Catholic university with a huge focus on professional degrees (Pharmacy, Nursing, Law). Admits are city-lovers who want a moral, professional education."
);

DB["University of Scranton"] = create(
  "University of Scranton", "Scranton, PA", "Private", "83%", "Moderate", "3.4+", "1130-1310", "$49,000",
  ["Occupational Therapy", "Nursing", "Business", "Accounting"],
  "Jesuit. Electric City. Community. Kania School of Management.",
  "Friendly, service-oriented, loyal. 'Royals'.",
  "Jesuit education + Health Sciences is the winning formula.",
  ["Scranton"],
  "Scranton is a beloved Jesuit university. Despite The Office jokes, it is a serious academic hub, especially for OT, PT, and Nursing. The community is famously tight-knit ('Scranton Love'). Admits are polite, service-minded students who want the Jesuit ideal of 'Cura Personalis'."
);

DB["Saint Joseph's University"] = create(
  "Saint Joseph's", "Philadelphia, PA", "Private", "83%", "Moderate", "3.4+", "1120-1320", "$49,000",
  ["Food Marketing", "Business", "Biology", "Psychology"],
  "Jesuit. Hawk Hill. The Hawk Will Never Die. Food Marketing (Unique).",
  "Spirited, ambitious, networkers. 'Hawks'.",
  "Food Marketing program is one of a kind and connects to huge Corps.",
  ["SJU", "St Joes", "Saint Josephs"],
  "St. Joe's is 'The Hawk'. The mascot literally flaps its wings the entire basketball game. It is a Jesuit business powerhouse in Philly. The 'Food Marketing' major is unique and gets grads jobs at major food companies. Admits are spirited and career-focused."
);

DB["La Salle University"] = create(
  "La Salle University", "Philadelphia, PA", "Private", "82%", "Moderate", "3.1+", "Test Blind", "$33,000",
  ["Nursing", "Business", "Communication", "Education"],
  "Christian Brothers (Lasallian). Explorers. Practical. Service.",
  "Grit, service-minded, urban. 'Explorers'.",
  "Known for high ROI (Return on Investment) for graduates.",
  ["La Salle"],
  "La Salle, located in Northwest Philly, is a Lasallian Catholic school. It focuses on practical, service-oriented careers (Nursing, Business) and social mobility. It has a 'grittier', real-world vibe compared to some suburban privates. Admits are often first-gen or working-class students aiming high."
);

DB["Widener University"] = create(
  "Widener University", "Chester, PA", "Private", "84%", "Moderate", "3.2+", "Test Blind", "$50,000",
  ["Engineering", "Nursing", "Social Work", "Hospitality"],
  "Civic engagement. Robotics. Leadership. Oskin Leadership Institute.",
  "Leaders, hands-on, civic-minded. 'Pride'.",
  "Engineering and Robotics programs are surprisingly robust.",
  ["Widener"],
  "Widener is all about 'Civic Engagement'. Every student does service learning. Located near Philly, it has strong programs in Engineering and Nursing. The Oskin Leadership Institute is a differentiator. Admits are students who want to lead by doing."
);

DB["Arcadia University"] = create(
  "Arcadia University", "Glenside, PA", "Private", "78%", "Moderate", "3.4+", "1080-1280", "$46,000",
  ["Physical Therapy", "Study Abroad", "Psychology", "Art"],
  "Grey Towers Castle. Study Abroad (Global). PT powerhouse.",
  "Globally minded, adventurers, explorers. 'Knights'.",
  "#1 in Study Abroad participation for years. Campus has a literal castle.",
  ["Arcadia"],
  "Arcadia's campus features a literal castle (Grey Towers), but it's famous for sending students away—its Study Abroad participation is #1 in the US. The Physical Therapy program is also elite. Admits are travelers and adventurers who can't wait to see the world."
);

DB["Susquehanna University"] = create(
  "Susquehanna University", "Selinsgrove, PA", "Private", "76%", "Moderate", "3.4+", "1080-1280", "$52,000",
  ["Business", "Creative Writing", "Biology", "Music"],
  "Global Opportunities (GO) requirement. River Hawks. Business.",
  "Curious, global, polished. 'River Hawks'.",
  "Requires every student to study away (Global Opportunities program).",
  ["Susquehanna"],
  "Susquehanna forces you to leave... in a good way. The 'GO' program requires cross-cultural study away for graduation. The Sigmund Weis School of Business is AACSB accredited regarding elite status. Admits are business-minded students with a global itch."
);

DB["Juniata College"] = create(
  "Juniata College", "Huntingdon, PA", "Private", "73%", "Moderate", "3.6+", "1140-1360", "$53,000",
  ["Biology", "Pre-Health", "Environmental Science", "Business"],
  "POE (Program of Emphasis). No majors. Rural/Mountains. Science.",
  "Intellectual, independent, science-loving. 'Eagles'.",
  "Students create their own 'Program of Emphasis' instead of standard majors.",
  ["Juniata"],
  "Juniata is unique: you don't have a 'major', you design a 'Program of Emphasis' (POE). It is a science powerhouse in rural PA, famous for getting students into medical and PhD programs. Admits are intellectual individualists who want to craft their own path."
);

DB["Allegheny College"] = create(
  "Allegheny College", "Meadville, PA", "Private", "75%", "Moderate", "3.5+", "1160-1380", "$52,000",
  ["Environmental Science", "Political Science", "Biology", "Psychology"],
  "Major/Minor combo required. Unusual Combinations. Oldest in West PA.",
  "Multifaceted, intellectual, curious. 'Gators'.",
  "Requires a Major in one division and a Minor in a completely different one.",
  ["Allegheny"],
  "Allegheny demands you be well-rounded. You MUST declare a major in one field (e.g., Science) and a minor in a totally different one (e.g., Humanities). This 'Unusual Combinations' ethos creates creative thinkers. Admits are smart kids who refuse to be put in a box."
);

DB["Ursinus College"] = create(
  "Ursinus College", "Collegeville, PA", "Private", "80%", "Moderate", "3.4+", "1150-1350", "$57,000",
  ["Biology", "Business", "Psychology", "Health Exercise"],
  "CIE (Common Intellectual Experience). Quest. Intellectual. Bears.",
  "Thinkers, close-knit, inquiring. 'Bears'.",
  "Every freshman takes CIE, a shared philosophy/inquiry course.",
  ["Ursinus"],
  "Ursinus is a 'Colleges That Change Lives' school. It revolves around the 'Common Intellectual Experience' (CIE), a seminar everyone takes. It produces a shocking number of scientists and doctors. Admits are thinkers who want a rigorous, questioning community."
);

DB["Muhlenberg College"] = create(
  "Muhlenberg College", "Allentown, PA", "Private", "66%", "Moderate", "3.5+", "1180-1380", "$57,000",
  ["Theatre", "Biology", "Business", "Psychology"],
  "Theatre powerhouse. Pre-Med powerhouse. Red Doors. Caring.",
  "Artistic, empathetic, smart. 'Mules'.",
  "Top-tier Theatre program AND top-tier Med School acceptance. Rare combo.",
  ["Muhlenberg"],
  "Muhlenberg is famous for a rare duality: it is elite at Theatre/Arts AND elite at Pre-Med/Science. You will find singing doctors here. The vibe is incredibly supportive and friendly ('The Caring College'). Admits are active, talented, and nice."
);

DB["Washington & Jefferson College"] = create(
  "Washington & Jefferson", "Washington, PA", "Private", "48%", "Moderate", "3.5+", "1100-1300", "$50,000",
  ["Pre-Law", "Pre-Med", "Business", "Political Science"],
  "Pre-professional. Magellan Project. Presidents. Historic.",
  "Ambitious, professional, leaders. 'Presidents'.",
  "Insane track record for law and medical school placement.",
  ["W&J", "Washington and Jefferson"],
  "W&J is known for one thing: getting you a job or into grad school. It is a pre-professional machine. The 'Magellan Project' funds students to do summer research anywhere in the world. Admits are ambitious students who have their eye on the prize (JD or MD)."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 44: NEW JERSEY DEEP DIVE
// ==========================================

DB["Kean University"] = create(
  "Kean University", "Union, NJ", "Public", "78%", "Moderate", "3.0+", "980-1160", "$12k/$19k",
  ["Education", "Architecture", "Business", "Psychology"],
  "Wenzhou-Kean (China). Urban access. Teachers. Architecture.",
  "Diverse, urban, global. 'Cougars'.",
  "Has a full, degree-granting campus in Wenzhou, China.",
  ["Kean"],
  "Kean is located just minutes from NYC by train. It is incredibly diverse and has a unique global footprint with a full campus in China (Wenzhou-Kean). The Michael Graves College of Architecture is a standout. Admits are often local students with global aspirations."
);

DB["William Paterson University"] = create(
  "William Paterson", "Wayne, NJ", "Public", "83%", "Moderate", "2.9+", "Test Blind", "$13k/$21k",
  ["Business", "Music (Jazz)", "Communication", "Nursing"],
  "Jazz powerhouse. Diverse. Suburban. Sales program.",
  "Musical, diverse, practical. 'Pioneers'.",
  "Jazz Studies program is world-renowned.",
  ["William Paterson", "WPU"],
  "William Paterson (WPU) is a suburban public university with a secret: it has one of the best Jazz programs in the world. It is also known for its strong Russ Berrie Institute for Professional Sales. Admits are diverse, often first-gen students looking for opportunity."
);

DB["Stockton University"] = create(
  "Stockton University", "Galloway, NJ", "Public", "80%", "Moderate", "3.4+", "1060-1260", "$14k/$21k",
  ["Marine Science", "Hospitality", "Health Science", "Psychology"],
  "Pine Barrens. Atlantic City campus. Beach vibes. Ospreys.",
  "Coastal, environmental, social. 'Ospreys'.",
  "Unique location in the Pinelands Reserve + a campus primarily on the beach.",
  ["Stockton"],
  "Stockton is unique: its main campus is in the pristine Pine Barrens, and it has a new campus right on the Atlantic City boardwalk. Marine Science and Hospitality are the natural stars here. Admits are often beach-lovers and environmentalists."
);

DB["Ramapo College of New Jersey"] = create(
  "Ramapo College", "Mahwah, NJ", "Public", "70%", "Moderate", "3.5+", "1100-1300", "$14k/$24k",
  ["Business", "Nursing", "Biology", "Psychology"],
  "Public Liberal Arts. Beautiful campus. Mountains. Small classes.",
  "Intellectual, nature-loving, tight-knit. 'Roadrunners'.",
  "Designated as New Jersey's Public Liberal Arts College.",
  ["Ramapo"],
  "Ramapo is the 'Public Liberal Arts College' of NJ. It feels like a private school—small classes, beautiful mountain campus—but at a public price. The dorms are consistently ranked #1 in NJ. Admits are smart students who want the liberal arts vibe without the debt."
);

DB["Rider University"] = create(
  "Rider University", "Lawrenceville, NJ", "Private", "84%", "Moderate", "3.2+", "Test Blind", "$36,000",
  ["Business", "Musical Theatre", "Education", "Psychology"],
  "Cranberry. Business focus. Westminster Choir College. Leadership.",
  "Performers, leaders, active. 'Broncs'.",
  "Incorporated the world-famous Westminster Choir College.",
  ["Rider"],
  "Rider is a mix of business and the arts. It swallowed the famous Westminster Choir College, making it a singing powerhouse. The Business school is also central to its identity. Admits are often 'Broncs' who want to lead, perform, or teach."
);

DB["Monmouth University"] = create(
  "Monmouth University", "West Long Branch, NJ", "Private", "84%", "Moderate", "3.3+", "1080-1280", "$44,000",
  ["Business", "Criminal Justice", "Communication", "Marine Policy"],
  "The Shadow of the Great Hall (Annie/Bruce Wayne). Jersey Shore. Coastal.",
  "Coastal, polished, spirited. 'Hawks'.",
  "Wilson Hall is the mansion from the 'Annie' movie (and Bruce Wayne's manor).",
  ["Monmouth"],
  "Monmouth is the college of the Jersey Shore. The campus is stunning, featuring the palace used in the movie 'Annie'. It is just a mile from the beach. Programs in Music Industry, Business, and Marine Policy are strong. Admits are often students who love the shore lifestyle."
);

DB["Fairleigh Dickinson University"] = create(
  "Fairleigh Dickinson", "Teaneck/Madison, NJ", "Private", "87%", "Moderate", "3.1+", "1050-1250", "$38,000",
  ["Business", "Film", "Hospitality", "Nursing"],
  "Two campuses (Metro/Florham). UN ties. Global. Silberman Business.",
  "Global, professional, flexible. 'Knights/Devils'.",
  "Has a 'Consultative Status' with the United Nations (rare).",
  ["FDU", "Fairleigh Dickinson"],
  "FDU has two vibes: the Metro campus (Teaneck, near NYC) is urban and fast; the Florham campus (Madison) is a classic leafy college (on a Vanderbilt estate). It has deep ties to the UN. Admits choose the campus that fits their speed."
);

DB["Drew University"] = create(
  "Drew University", "Madison, NJ", "Private", "72%", "Moderate", "3.4+", "1150-1350", "$43,000",
  ["Political Science", "Theatre", "Biology", "Business"],
  "The Forest. NYC Semesters (UN/Wall St). Launch Career. Intellectual.",
  "Intellectual, creative, nature-loving. 'Rangers'.",
  "Semester on Wall Street / Semester at the UN programs are elite.",
  ["Drew"],
  "Drew is 'The University in the Forest'. It is beautiful and quiet, but a train ride from NYC. It is famous for its immersive NYC semesters (Wall Street, UN, Theatre). Admits are intellectuals who want a nature sanctuary to study in, with easy access to the concrete jungle."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 45: NY DEEP DIVE (CUNY, SUNY, PRIVATES)
// ==========================================

DB["CUNY Hunter College"] = create(
  "Hunter College", "New York, NY", "Public", "46%", "Hard", "3.6+", "1180-1360", "$7k/$19k",
  ["Psychology", "Biology", "English", "Nursing"],
  "Manhattan (Upper East Side). Commuter. Intense. Diversity.",
  "Urban, intellectual, gritty. 'Hawks'.",
  "The crown jewel of CUNY for liberal arts. Location is elite.",
  ["Hunter", "CUNY Hunter"],
  "Hunter is the Ivy of the CUNYs. Located on the Upper East Side, it is intensely academic and diverse. It has no campus—the city is the campus. It is famous for producing Fulbright scholars. Admits are gritty, smart urbanites who want a top-tier education for pennies."
);

DB["CUNY Baruch College"] = create(
  "Baruch College", "New York, NY", "Public", "50%", "Hard", "3.7+", "1220-1390", "$7k/$19k",
  ["Finance", "Accounting", "Marketing", "International Business"],
  "Wall Street pipeline. Zicklin School of Business. Suit & Tie. Value.",
  "Business-savvy, hustlers, professional. 'Bearcats'.",
  "Feeds more students into Wall Street jobs than almost anywhere else.",
  ["Baruch", "CUNY Baruch"],
  "Baruch is the business school of NYC. The Zicklin School is massive and respected. It is a vertical campus in Manhattan. Students are laser-focused on careers ('suits in class' vibe). Admits are hustlers who want the highest ROI in American higher education."
);

DB["CUNY City College of New York"] = create(
  "CCNY", "New York, NY", "Public", "64%", "Moderate", "3.4+", "1040-1250", "$7k/$19k",
  ["Engineering", "Architecture", "Physics", "Liberal Arts"],
  "The Harvard of the Proletariat. Historic. Engineering. Research.",
  "Brilliant, diverse, historic. 'Beavers'.",
  "Produced 10 Nobel laureates (more than most Ivies). Grove School of Engineering is elite.",
  ["CCNY", "City College"],
  "CCNY is 'The Harvard of the Proletariat'. It has a legendary history of producing Nobel Prize winners from immigrant backgrounds. The campus in Harlem is stunningly Gothic. It is the STEM powerhouse of CUNY. Admits are often brilliant students seeking opportunity."
);

DB["CUNY Queens College"] = create(
  "Queens College", "Queens, NY", "Public", "69%", "Moderate", "3.3+", "1040-1220", "$7k/$19k",
  ["Psychology", "Accounting", "Education", "Computer Science"],
  "The Campus CUNY. Diversity. Value. Suburbs in the City.",
  "Diverse, friendly, grounded. 'Knights'.",
  "One of the few CUNYs with a real, grassy campus.",
  ["Queens College", "QC"],
  "Queens College offers a traditional campus feel (grass, trees) within NYC. It is incredibly diverse, reflecting the borough of Queens. It is known for strong programs in Education and Psychology. Admits are often commuters who want a 'college feel' without leaving the city."
);

DB["CUNY Brooklyn College"] = create(
  "Brooklyn College", "Brooklyn, NY", "Public", "50%", "Moderate", "3.3+", "1040-1230", "$7k/$19k",
  ["Business", "Psychology", "Film", "Accounting"],
  "Beautiful campus (Georgian). Diversity. Film school. Value.",
  "Artsy, diverse, smart. 'Bulldogs'.",
  "Looks like a New England liberal arts college dropped into Brooklyn.",
  ["Brooklyn College"],
  "Brooklyn College is famous for its absolutely gorgeous campus—it looks like Harvard. It acts as a magnet for Brooklyn's best and brightest. The Film school is notable. Admits are diverse, smart, and love the borough's unique vibe."
);

DB["SUNY Geneseo"] = create(
  "SUNY Geneseo", "Geneseo, NY", "Public", "74%", "Moderate", "3.6+", "1170-1350", "$9k/$19k",
  ["Education", "Types", "Biology", "Business"],
  "Public Ivy. Honors College vibe. Sunsets. Intellectual.",
  "Smart, community-focused, scenic. 'Knights'.",
  "Consistently ranked as one of the best undergraduate teaching colleges.",
  ["Geneseo"],
  "Geneseo positions itself as the 'Honors College of SUNY'. It is highly selective and feels like a private liberal arts college. The sunsets over the Genesee Valley are legendary. Admits are typically high-achieving students who want an intellectual community at a public price."
);

DB["SUNY New Paltz"] = create(
  "SUNY New Paltz", "New Paltz, NY", "Public", "46%", "Moderate", "3.5+", "1120-1310", "$8k/$18k",
  ["Education", "Fine Arts", "Psychology", "Media"],
  "Hippie/Artsy vibe. Hudson Valley. Mountains. Creative.",
  "Creative, progressive, outdoorsy. 'Hawks'.",
  "Very artsy and progressive reputation. Great location.",
  ["New Paltz"],
  "New Paltz is the 'cool' SUNY. Located in a funky town in the Hudson Valley (near climbing/hiking), it attracts artists, hipsters, and progressives. The Fine Arts and Media programs are top-tier. Admits are often creative spirits who love the mountains."
);

DB["SUNY Oneonta"] = create(
  "SUNY Oneonta", "Oneonta, NY", "Public", "71%", "Moderate", "3.3+", "1000-1200", "$9k/$19k",
  ["Education", "Dietetics", "Music Industry", "Biology"],
  "City of the Hills. Friendly. Music Industry. Teachers.",
  "Friendly, social, supportive. 'Red Dragons'.",
  "Music Industry program is unexpectedly strong.",
  ["Oneonta"],
  "Oneonta is known as the 'City of the Hills'. It is a classic college town. It has a surprisingly strong Music Industry program and a long history of training teachers. The vibe is friendly and unpretentious. Admits are looking for a classic, social college experience."
);

DB["SUNY Oswego"] = create(
  "SUNY Oswego", "Oswego, NY", "Public", "80%", "Moderate", "3.2+", "1060-1230", "$9k/$19k",
  ["Broadcasting", "Zoology", "Meteorology", "Business"],
  "Lake Ontario (Sunsets). Broadcasting. Meteorology. Cold.",
  "Communication-savvy, hardy, friendly. 'Lakers'.",
  "Al Roker went here. Broadcasting and Meteorology are famous.",
  ["Oswego"],
  "Oswego sits directly on Lake Ontario (bring a jacket). It is famous for communications—specifically Broadcasting and Meteorology (Al Roker is an alum). The sunsets are incredible. Admits are often future media pros or scientists who don't fear the snow."
);

DB["SUNY Cortland"] = create(
  "SUNY Cortland", "Cortland, NY", "Public", "60%", "Moderate", "3.3+", "Test Blind", "$9k/$19k",
  ["Physical Education", "Sport Management", "Exercise Science", "Education"],
  "Athletic. Teachers. Cortaca Jug (Football). Fitness.",
  "Athletic, active, spirited. 'Red Dragons'.",
  "One of the best Physical Education teacher programs in the Northeast.",
  ["Cortland"],
  "Cortland is the 'Jock School' of the US in the best way. It is world-famous for Physical Education and Sport Management. The 'Cortaca Jug' football game is a massive annual event. Admits are active, fit, and often aspiring coaches or gym teachers."
);

DB["Adelphi University"] = create(
  "Adelphi University", "Garden City, NY", "Private", "77%", "Moderate", "3.4+", "1100-1300", "$43,000",
  ["Nursing", "Social Work", "Psychology", "Business"],
  "Long Island. Oldest Private on LI. Nursing. Garden City.",
  "Caring, suburban, focused. 'Panthers'.",
  "College of Nursing and Public Health is the flagship.",
  ["Adelphi"],
  "Adelphi was the first private university on Long Island. Located in beautiful Garden City, it is a major hub for Nursing and Social Work. It offers a personalized, suburban education just a train ride from NYC. Admits are often helping-profession oriented."
);

DB["Hofstra University"] = create(
  "Hofstra University", "Hempstead, NY", "Private", "69%", "Moderate", "3.5+", "1160-1350", "$52,000",
  ["Journalism", "Law", "Medicine", "Business"],
  "Presidential Debates. Long Island. Law/Med Schools. Communications.",
  "Ambitious, communicative, active. 'Pride'.",
  "Famous for hosting Presidential Debates.",
  ["Hofstra"],
  "Hofstra is a high-energy campus on Long Island, famous for hosting three consecutive presidential debates. It has its own Law and Medical schools. The Lawrence Herbert School of Communication is elite. Admits are often ambitious students who want big-city access with a campus feel."
);

DB["Pace University"] = create(
  "Pace University", "New York, NY", "Private", "83%", "Moderate", "3.3+", "1060-1250", "$50,000",
  ["Business", "Computer Science", "Performing Arts", "Nursing"],
  "Opportunity. Downtown NYC. Internships. Actors Studio.",
  "Hustlers, career-focused, urban. 'Setters'.",
  "Actors Studio Drama School is legendary.",
  ["Pace"],
  "Pace is all about placement. Located near Wall Street, its motto is 'Opportunitas'. It is famous for getting students internships. The Performing Arts program (Actors Studio) is also world-class. Admits are career-driven urbanites who want to work while they learn."
);

DB["St. John's University"] = create(
  "St. John's University", "Queens, NY", "Private", "85%", "Moderate", "3.4+", "1080-1280", "$47,000",
  ["Pharmacy", "Business", "Criminal Justice", "Sport Management"],
  "Catholic (Vincentian). NYC. Big East Sports. Diversity.",
  "Diverse, spirited, service-minded. 'Red Storm'.",
  "One of the most diverse Catholic universities in the country.",
  ["St Johns", "SJU"],
  "St. John's is New York's team ('Red Storm'). It is a massive Vincentian Catholic university in Queens. It is famous for diversity, Big East basketball, and Pharmacy. Admits are typically spirited, diverse students who want a big-time college experience in the city."
);

DB["New York Institute of Technology"] = create(
  "NYIT", "Long Island/NYC", "Private", "80%", "Moderate", "3.3+", "1060-1260", "$40,000",
  ["Architecture", "Computer Science", "Engineering", "Osteopathic Medicine"],
  "Tech focused. Maker culture. DO Medical School. Two campuses.",
  "Techies, makers, future doctors. 'Bears'.",
  "Has a massive College of Osteopathic Medicine (NYITCOM).",
  ["NYIT"],
  "NYIT is for the makers and doers. It has campuses in Manhattan and Long Island. It is known for Architecture, Engineering, and its DO Medical School. The vibe is practical and tech-forward. Admits are problem solvers building the future."
);

DB["Clarkson University"] = create(
  "Clarkson University", "Potsdam, NY", "Private", "78%", "Moderate", "3.6+", "1160-1350", "$54,000",
  ["Engineering", "Supply Chain", "Business", "Data Science"],
  "Tech powerhouse. Golden Knights. Hockey. North Country.",
  "Analytical, gritty, hockey-loving. 'Golden Knights'.",
  "Graduates have some of the highest starting salaries in the nation.",
  ["Clarkson"],
  "Clarkson is a serious tech school in the chilly North Country (Potsdam). Hockey is huge here. It is famous for high ROI—grads get paid well. Admits are typically engineering or business students who are serious about their careers and don't mind the cold."
);

DB["Hobart and William Smith Colleges"] = create(
  "Hobart and William Smith", "Geneva, NY", "Private", "68%", "Moderate", "3.5+", "1220-1390", "$60,000",
  ["Economics", "Political Science", "Environmental Studies", "Media"],
  "Seneca Lake. Two colleges, one campus. Global focus. Service.",
  "Intellectual, civic-minded, scenic. 'Statesmen/Herons'.",
  "Technically two colleges (Men/Women) that operate as one.",
  ["HWS", "Hobart", "William Smith"],
  "HWS is located on the stunning Seneca Lake. It is historically coordinate colleges (Hobart for men, William Smith for women) that now function as one. It is known for global citizenship and service. Admits are often thoughtful, affluent students who love the Finger Lakes."
);

DB["St. Lawrence University"] = create(
  "St. Lawrence University", "Canton, NY", "Private", "63%", "Moderate", "3.5+", "1200-1380", "$60,000",
  ["Economics", "Biology", "Government", "Environmental Studies"],
  "The North Country. Alumni network. Kenya program. Community.",
  "Friendly, outdoorsy, connected. 'Saints'.",
  "Alumni network is famously loyal and helpful.",
  ["St Lawrence", "SLU"],
  "St. Lawrence is located in the far north of NY (Canton). The isolation creates an incredibly tight-knit community and a rabidly loyal alumni network. The Kenya study abroad program is one of the oldest and best. Admits are friendly, adventurous students who love the outdoors."
);



// ==========================================
// MANUAL DEEP DIVE BATCH 46: NY EXTENSION
// ==========================================

DB["Sarah Lawrence College"] = create(
  "Sarah Lawrence", "Bronxville, NY", "Private", "50%", "Hard", "3.7+", "Test Optional", "$63,000",
  ["Creative Writing", "Theatre", "Psychology", "History"],
  "No grades (evaluations). Donning system. Independent. Writing heavy.",
  "Intellectual, individualistic, writers. 'Gryphons'.",
  "The 'Donning' system (faculty mentorship) is the core. You design your education.",
  ["Sarah Lawrence", "SLC"],
  "Sarah Lawrence is famous for having no majors and no grades—you get narrative evaluations. Every student works one-on-one with a faculty 'Don'. It is a haven for writers and artists. Admits are typically independent, intellectual, and self-directed students who hate standardized testing."
);

DB["Bard College"] = create(
  "Bard College", "Annandale-on-Hudson, NY", "Private", "46%", "Hard", "3.7+", "Test Optional", "$62,000",
  ["Human Rights", "Music", "writing", "Film"],
  "Intellectual. Hudson Valley. Leon Botstein. Civic engagement.",
  "Avant-garde, intellectual, civic-minded. 'Raptors'.",
  "Early College innovator. Very engaged in international human rights.",
  ["Bard"],
  "Bard is an intellectual powerhouse in the Hudson Valley. Led by conductor Leon Botstein, it is a mix of serious arts (conservatory-level music) and serious politics (human rights). Admits are often avant-garde thinkers who want to change the world through art or policy."
);

DB["Siena College"] = create(
  "Siena College", "Loudonville, NY", "Private", "80%", "Moderate", "3.4+", "1080-1260", "$43,000",
  ["Business", "Biology", "Accounting", "Computer Science"],
  "Franciscan. Community. Basketball. Albany area.",
  "Friendly, service-oriented, community-focused. 'Saints'.",
  "Deep Franciscan values. One of the friendliest campuses in NY.",
  ["Siena"],
  "Siena is a Franciscan college near Albany, known for its incredible community spirit and D1 basketball. The 'Siena saint' is the ideal: service-oriented and kind. The Business and Pre-Med programs are strong. Admits are often looking for a close-knit, values-based education."
);

DB["Le Moyne College"] = create(
  "Le Moyne College", "Syracuse, NY", "Private", "78%", "Moderate", "3.4+", "1070-1260", "$38,000",
  ["Nursing", "Business", "Physician Assistant", "Biology"],
  "Jesuit. Syracuse. 'Dolphins'. Caring.",
  "Compassionate, active, smart. 'Dolphins'.",
  "Direct entry PA (Physician Assistant) program is highly coveted.",
  ["Le Moyne"],
  "Le Moyne is the Jesuit college of Syracuse. It is famous for its accelerated Physician Assistant (PA) and Nursing programs. The mascot is a Dolphin. The vibe is classic Jesuit: educating the whole person. Admits are often future healthcare providers."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 47: CONNECTICUT DEEP DIVE
// ==========================================

DB["Southern Connecticut State University"] = create(
  "Southern CT State", "New Haven, CT", "Public", "83%", "Moderate", "3.0+", "940-1120", "$12k/$25k",
  ["Nursing", "Education", "Social Work", "Business"],
  "New Haven. Teachers. Social Justice. Diverse.",
  "Diverse, urban, gritty. 'Owls'.",
  "Top producer of teachers and social workers in CT.",
  ["SCSU", "Southern"],
  "SCSU is located in New Haven (near Yale). It is the educator of Connecticut, producing massive numbers of teachers, nurses, and social workers. It has a strong social justice mission. Admits are often local, diverse students dedicated to public service."
);

DB["Central Connecticut State University"] = create(
  "Central CT State", "New Britain, CT", "Public", "77%", "Moderate", "3.1+", "980-1140", "$12k/$25k",
  ["Business", "Engineering Technology", "Criminology", "Education"],
  "Blue Devils. Commuter/Residential mix. Practical. Value.",
  "Practical, hard-working, social. 'Blue Devils'.",
  "School of Business is AACSB accredited and well-connected in Hartford.",
  ["CCSU", "Central"],
  "CCSU is the largest of the CT state universities. Located near Hartford, it feeds the insurance and business industries. It has a 'Blue Collar Ivy' pride. Admits are often pragmatic students looking for solid ROI and a fun D1 sports atmosphere."
);

DB["University of Hartford"] = create(
  "University of Hartford", "West Hartford, CT", "Private", "82%", "Moderate", "3.2+", "1040-1240", "$44,000",
  ["Music (Hartt)", "Art (Hardware)", "Business", "Engineering"],
  "Hartt School (Music). Art School. Seven schools in one. Diverse.",
  "Creative, diverse, professional. 'Hawks'.",
  "The Hartt School is a world-famous conservatory embedded in the university.",
  ["UHart"],
  "UHart is unique: it houses a world-class conservatory (The Hartt School) and a top-tier Art School (Hartford Art School) alongside a regular university. The campus is a mix of artists, musicians, and business majors. Admits are often creative specialists."
);

DB["Sacred Heart University"] = create(
  "Sacred Heart University", "Fairfield, CT", "Private", "66%", "Moderate", "3.4+", "1100-1280", "$48,000",
  ["Nursing", "Physical Therapy", "Business", "Game Design"],
  "Catholic. Rapid growth. Modern campus. Pioneer pride.",
  "Spirited, modern, ambitious. 'Pioneers'.",
  "One of the fastest growing Catholic universities in the US. Facilities are brand new.",
  ["SHU", "Sacred Heart"],
  "Sacred Heart (SHU) has exploded in popularity. The campus looks like a resort with brand new glass buildings. It is a powerhouse for Health Sciences (PT, Nursing) and Business. Admits are spirited, social, and drawn to the modern, high-energy Catholic vibe."
);

DB["Connecticut College"] = create(
  "Connecticut College", "New London, CT", "Private", "41%", "Hard", "3.8+", "Test Blind", "$64,000",
  ["International Relations", "Environmental Studies", "Psychology", "Arts"],
  "Connections (Curriculum). Arboretum. Honor Code. NESCAC.",
  "Intellectual, global, collaborative. 'Camels'.",
  "The 'Connections' curriculum reinvents general education around a central theme.",
  ["Conn College", "Conn"],
  "Conn College is a NESCAC (Little Ivy) overlooking the Long Island Sound. Its 750-acre Arboretum campus is stunning. The 'Connections' curriculum forces you to link your major to global themes. Admits are intellectual, collaborative, and love the 'Camel' identity."
);

DB["Eastern Connecticut State University"] = create(
  "Eastern CT State", "Willimantic, CT", "Public", "73%", "Moderate", "3.1+", "980-1160", "$12k/$25k",
  ["Liberal Arts", "Psychology", "Business", "Social Work"],
  "Public Liberal Arts. Small classes. Community. Willimantic.",
  "Inclusive, friendly, liberal arts-minded. 'Warriors'.",
  "Designated as Connecticut's Public Liberal Arts University.",
  ["ECSU", "Eastern"],
  "Eastern is the 'Public Liberal Arts University' of CT. It offers small classes and a residential feel at a state price. It focuses on residential life and employability. Admits are students who want to be a name, not a number, without the private school price tag."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 48: RHODE ISLAND DEEP DIVE
// ==========================================

DB["Roger Williams University"] = create(
  "Roger Williams University", "Bristol, RI", "Private", "91%", "Moderate", "3.2+", "1080-1280", "$45,000",
  ["Architecture", "Marine Biology", "Construction Management", "Business"],
  "Waterfront campus. Architecture. Marine Science. Hands-on.",
  "Practical, coastal, active. 'Hawks'.",
  "Architecture and Construction Management are signature, elite programs.",
  ["RWU", "Roger Williams"],
  "RWU is located on a stunning waterfront in Bristol. It is famous for its Architecture school (one of the best in the region) and Marine Biology. It emphasizes 'Experiential Learning'. Admits are often makers, builders, and ocean-lovers."
);

DB["Salve Regina University"] = create(
  "Salve Regina", "Newport, RI", "Private", "73%", "Moderate", "3.3+", "1100-1300", "$48,000",
  ["Nursing", "Administration of Justice", "Business", "History"],
  "Gilded Age mansions. Newport oceanfront. Mercy Catholic. Beauty.",
  "Service-oriented, polished, aesthetic. 'Seahawks'.",
  "Campus is literally set in Gilded Age mansions on the Cliff Walk.",
  ["Salve", "Salve Regina"],
  "Salve Regina has arguably the most beautiful campus in America—it consists of Gilded Age mansions on the Newport Cliff Walk. It is a Mercy Catholic institution. Nursing and Justice are top majors. Admits are often drawn to the stunning beauty and the mission of service."
);

DB["Johnson & Wales University"] = create(
  "Johnson & Wales", "Providence, RI", "Private", "83%", "Moderate", "3.0+", "Test Optional", "$39,000",
  ["Culinary Arts", "Hospitality", "Business", "Fashion Merchandising"],
  "Culinary powerhouse. Career focused. Upside-down curriculum.",
  "Professional, career-driven, hospitable. 'Wildcats'.",
  "World famous for Culinary Arts. You take major classes Day 1.",
  ["JWU", "Johnson and Wales"],
  "JWU is a career university. It is world-famous for Culinary Arts and Hospitality. They use an 'Upside-Down Curriculum', letting you cook or take business classes in your first semester. Admits are laser-focused on their careers, often in food, fashion, or tourism."
);

DB["Rhode Island College"] = create(
  "Rhode Island College", "Providence, RI", "Public", "88%", "Moderate", "2.9+", "950-1120", "$10k/$25k",
  ["Nursing", "Education", "Social Work", "Psychology"],
  "The engine of RI. Diversity. Value. Teachers and Nurses.",
  "Hard-working, diverse, local. 'Anchormen'.",
  "Produces the majority of Nurses and Teachers in Rhode Island.",
  ["RIC"],
  "RIC is the working person's college of Rhode Island. Located in Providence, it is highly diverse and affordable. It produces the state's teachers, nurses, and social workers. Admits are often gritty, first-gen students looking for a path to the middle class."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 49: MASSACHUSETTS STATE & URBAN
// ==========================================

DB["Bridgewater State University"] = create(
  "Bridgewater State", "Bridgewater, MA", "Public", "86%", "Moderate", "3.0+", "1000-1180", "$11k/$17k",
  ["Education", "Aviation", "Criminal Justice", "Business"],
  "Teacher's college roots. Aviation Science. Commuter rail access.",
  "Grounded, friendly, spirited. 'Bears'.",
  "Aviation Science program is the only one of its kind in New England public schools.",
  ["BSU", "Bridgewater"],
  "Bridgewater State is the largest state U in MA outside of UMass. It is famous for training teachers (oldest in America). It also has a rare Aviation Science program with its own flight center. Admits are often practical students looking for a classic college feel."
);

DB["Salem State University"] = create(
  "Salem State", "Salem, MA", "Public", "90%", "Moderate", "2.9+", "980-1150", "$11k/$18k",
  ["Nursing", "Social Work", "Business", "Theatre"],
  "Historic Salem. Diversity. Nursing. Halloween town.",
  "Diverse, resilient, spirited. 'Vikings'.",
  "Located in the witch city. Nursing and Theatre are standouts.",
  ["Salem State"],
  "Salem State is in the heart of historic Salem (yes, the witch trials). It gets crazy in October. It is a diverse, access-oriented institution with a top-tier Nursing program. Admits are often local students or those drawn to the unique history and artsy vibe of Salem."
);

DB["Westfield State University"] = create(
  "Westfield State", "Westfield, MA", "Public", "94%", "Moderate", "2.9+", "990-1160", "$11k/$17k",
  ["Criminal Justice", "Education", "Movement Science", "Business"],
  "Residential vibe. Criminal Justice powerhouse. Western MA.",
  "Active, social, service-minded. 'Owls'.",
  "Most residential of the MA state universities. Criminal Justice is elite.",
  ["Westfield State"],
  "Westfield State feels the most like a private residential college among the MA state schools. It is the go-to place for Criminal Justice in New England. The campus is in Western MA, offering a traditional college town vibe. Admits are often future police officers or teachers."
);

DB["Worcester State University"] = create(
  "Worcester State", "Worcester, MA", "Public", "89%", "Moderate", "3.1+", "1010-1180", "$10k/$16k",
  ["Nursing", "Occupational Therapy", "Business", "Biology"],
  "City of Worcester. Health Sciences. Value. Commuter friendly.",
  "Urban, practical, health-focused. 'Lancers'.",
  "Strong linkages to Worcester's massive medical community.",
  ["Worcester State"],
  "Worcester State is deeply integrated into New England's second-largest city. It is a hub for health sciences (Nursing, OT) due to the local hospitals. Admits are practically-minded students who want to work in the medical or business sectors of Central MA."
);

DB["Suffolk University"] = create(
  "Suffolk University", "Boston, MA", "Private", "88%", "Moderate", "3.3+", "1080-1260", "$45,000",
  ["Law", "Business", "Political Science", "Sociology"],
  "Downtown Boston. Beacon Hill. Law School pipeline. Government.",
  "Urban, professional, political. 'Rams'.",
  "Campus is literally next to the MA State House on Beacon Hill.",
  ["Suffolk"],
  "Suffolk is the university of Beacon Hill. Students rub elbows with legislators and judges. It is famous for its Law School and business connections. There is no 'campus'—the city is the campus. Admits are city-lovers who want to intern in government or finance."
);

DB["Simmons University"] = create(
  "Simmons University", "Boston, MA", "Private", "76%", "Moderate", "3.5+", "1150-1350", "$44,000",
  ["Nursing", "Library Science", "Physical Therapy", "Social Work"],
  "Women-centered (Undergrad). Fenway area. Health/Library Science.",
  "Empowered, intellectual, caring. 'Sharks'.",
  "Traditionally a women's college (now women-centered). Library Science is #1.",
  ["Simmons"],
  "Simmons is a women-centered university in the Fenway area (students can take classes at other Fenway schools). It is premier for Nursing, Social Work, and Library Science. Admits are empowered, smart women looking for a supportive, leadership-focused environment."
);

DB["Wentworth Institute of Technology"] = create(
  "Wentworth", "Boston, MA", "Private", "92%", "Moderate", "3.2+", "1060-1260", "$39,000",
  ["Architecture", "Engineering", "Construction Management", "Design"],
  "Co-op mandatory. Boston/Fenway. Hands-on. Technical.",
  "Makers, builders, pragmatic. 'Leopards'.",
  "Co-op program is mandatory—you WILL graduate with work experience.",
  ["WIT", "Wentworth"],
  "Wentworth is all about building things. Located in Boston, it requires Co-op (work experience) for graduation. If you want to be an Architect, Engineer, or Construction Manager, this is the spot. Admits are pragmatic makers who want a job, not just a degree."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 50: MA PRIVATE & SPECIALIZED
// ==========================================

DB["Clark University"] = create(
  "Clark University", "Worcester, MA", "Private", "48%", "Hard", "3.6+", "1200-1400", "$52,000",
  ["Psychology", "Geography", "Biology", "Global Development"],
  "Liberal Education Effective Practice (LEEP). Psychology history. Change-makers.",
  "Intellectual, progressive, changemakers. 'Cougars'.",
  "Freud spoke here. Geography and Psych are world-class.",
  ["Clark"],
  "Clark is a 'Colleges That Change Lives' school. It is famous because Freud visited (it's a Psych Mecca). The LEEP curriculum emphasizes putting liberal arts into practice. It is also world-renowned for Geography. Admits are progressive intellectuals who want to change the world."
);

DB["Wheaton College Massachusetts"] = create(
  "Wheaton College MA", "Norton, MA", "Private", "79%", "Moderate", "3.4+", "Test Optional", "$60,000",
  ["Business", "Psychology", "Biology", "Neuroscience"],
  "Compass curriculum. Innovation. Beautiful campus. Connections.",
  "Collaborative, interdisciplinary, friendly. 'Lyons'.",
  "The 'Compass' curriculum allows you to design your own path.",
  ["Wheaton MA"],
  "Wheaton (MA) is a hidden gem. It has a stunning campus and a flexible 'Compass' curriculum. It emphasizes interdisciplinary study and innovation. The vibe is collaborative and warm. Admits are often multi-talented students who don't want to be boxed in."
);

DB["Stonehill College"] = create(
  "Stonehill College", "Easton, MA", "Private", "73%", "Moderate", "3.3+", "1100-1280", "$51,000",
  ["Business", "Criminology", "Biology", "Psychology"],
  "Holy Cross (Catholic). Beautiful campus. Service. Community.",
  "Polite, spirited, community-minded. 'Skyhawks'.",
  "Campus is beautiful. Strong sense of moral purpose.",
  ["Stonehill"],
  "Stonehill is a Holy Cross Catholic college (like Notre Dame). The campus is manicured and gorgeous. It balances liberal arts with pre-professional business and science. The vibe is polite, clean-cut, and spirited. Admits are often athletes or student leaders."
);

DB["Endicott College"] = create(
  "Endicott College", "Beverly, MA", "Private", "73%", "Moderate", "3.3+", "1080-1260", "$38,000",
  ["Nursing", "Business", "Hospitality", "Sport Management"],
  "Oceanfront. Internship model (3 required). Career focus. Gulls.",
  "Career-focused, beach-loving, active. 'Gulls'.",
  "Students MUST complete three distinct internships to graduate.",
  ["Endicott"],
  "Endicott is 'The Internship College'. Located on a private beach in Beverly, it requires *three* internships to graduate. You leave with a resume, not just a degree. It is huge for Nursing and Hospitality. Admits are career-driven students who love the ocean."
);

DB["Merrimack College"] = create(
  "Merrimack College", "North Andover, MA", "Private", "75%", "Moderate", "3.2+", "Test Blind", "$45,000",
  ["Business", "Engineering", "Health Science", "Education"],
  "Augustinian Catholic. Rapid growth. Hockey. Community.",
  "Friendly, spirited, up-and-coming. 'Warriors'.",
  "One of the fastest growing colleges in the region. D1 Hockey is huge.",
  ["Merrimack"],
  "Merrimack is an Augustinian Catholic college on the rise. It has new buildings, new D1 sports status, and huge spirit (Hockey is king). It focuses on community and support. Admits are often friendly, active students who want a college that feels like a family."
);

DB["Hampshire College"] = create(
  "Hampshire College", "Amherst, MA", "Private", "60%", "Moderate", "3.3+", "Test Blind", "$54,000",
  ["Media", "Arts", "Social Justice", "Environmental Studies"],
  "Experimental. No grades. No majors. 5-College Consortium. Radical.",
  "Radical, creative, independent. 'Black Sheep'.",
  "You design your own concentration. Part of the 5-College Consortium (take classes at Amherst/Smith/UMass).",
  ["Hampshire"],
  "Hampshire is the experiment that worked. It has no grades and no majors. You design your own inquiry-based curriculum. It attracts free thinkers, activists, and artists. As part of the 5-College Consortium, you can also take classes at UMass or Amherst. Admits are non-conformists."
);

DB["Berklee College of Music"] = create(
  "Berklee College of Music", "Boston, MA", "Private", "54%", "Hard", "N/A (Audition)", "Test Blind", "$48,000",
  ["Music Performance", "Music Production", "Songwriting", "Music Business"],
  "Contemporary Music #1. Jazz/Pop/Rock. Boston. Talent.",
  "Talented, creative, focused. 'Groove'.",
  "The world's premier college for contemporary music (Jazz, Rock, Pop).",
  ["Berklee"],
  "Berklee is the Juilliard of Rock and Roll. It is undisputed as the best place for contemporary music (Jazz, Pop, Production). The halls are filled with future Grammys. You don't apply with SATs; you apply with an audition. Admits are prodigies and dreamers."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 51: NORTHERN NEW ENGLAND DEEP DIVE
// ==========================================

DB["Keene State College"] = create(
  "Keene State", "Keene, NH", "Public", "90%", "Moderate", "2.8+", "Test Blind", "$14k/$24k",
  ["Education", "Safety Studies", "Film", "Architecture"],
  "Classic college town. Pumpkin festival. Liberal Arts. Social.",
  "Social, creative, friendly. 'Owls'.",
  "Main street Keene is the picture-perfect New England town.",
  ["Keene State"],
  "Keene State is the quintessential New England college town school. The big red brick campus is beautiful. It is famous for safety studies, education, and film. The vibe is social and welcoming. Admits are often looking for the classic 'movie' college experience."
);

DB["Plymouth State University"] = create(
  "Plymouth State", "Plymouth, NH", "Public", "92%", "Moderate", "2.8+", "Test Blind", "$14k/$24k",
  ["Meteorology", "Business", "Education", "Criminal Justice"],
  "White Mountains. Skiing. Clusters (Interdisciplinary). Outdoors.",
  "Outdoorsy, active, adventurous. 'Panthers'.",
  "Located in the White Mountains. Meteorology program is elite.",
  ["Plymouth State"],
  "Plymouth State is for the skiers and hikers. Located at the gateway to the White Mountains, it is an outdoor paradise. It is surprisingly strong in Meteorology. Admits are often students who want to study in the morning and hit the slopes in the afternoon."
);

DB["Saint Anselm College"] = create(
  "Saint Anselm College", "Manchester, NH", "Private", "78%", "Moderate", "3.3+", "1100-1280", "$46,000",
  ["Nursing", "Politics", "Criminal Justice", "Business"],
  "Benedictine. Politics (Debates). Nursing. Coffee Shop politics.",
  "Traditional, political, faithful. 'Hawks'.",
  "Home to the NH Institute of Politics—every President visits here.",
  ["Saint Anselm", "St A's"],
  "Saint Anselm ('St. A's') is a Benedictine Catholic college with a huge political footprint. Every primary season, the candidates come here for debates. The Nursing program is also top-tier. Admits are typically traditional, community-focused students."
);

DB["Southern New Hampshire University"] = create(
  "SNHU", "Manchester, NH", "Private", "92%", "Safety", "2.8+", "Test Blind", "$15k (Campus)",
  ["Business", "Game Design", "Creative Writing", "Culinary"],
  "Innovation. Massive Online presence. Campus is intimate. Access.",
  "Pragmatic, diverse, flexible. 'Penmen'.",
  "While famous online, the physical campus is a traditional, close-knit community.",
  ["SNHU"],
  "You've seen the commercials, but the SNHU *campus* in Manchester is a hidden gem. It is a traditional, affordable private college with huge resources due to its online success. Game Design and Creative Writing are strong. Admits are students who want value."
);

DB["University of Southern Maine"] = create(
  "University of Southern Maine", "Portland/Gorham, ME", "Public", "85%", "Moderate", "3.0+", "Test Blind", "$9k/$22k",
  ["Nursing", "Business", "Music", "Public Health"],
  "Portland (Cool city). Urban/Suburban mix. Nursing. Community.",
  "Urban, earthy, engaged. 'Huskies'.",
  "Located in Portland, one of the coolest small cities in the US.",
  ["USM", "Southern Maine"],
  "USM is located in Portland (the coolest city in New England) and Gorham. It is the urban public university of Maine. It attracts hipster vibes, nursing students, and musicians. Admits often love the food and culture scene of Portland."
);

DB["University of New England"] = create(
  "University of New England", "Biddeford, ME", "Private", "90%", "Moderate", "3.1+", "1040-1240", "$41,000",
  ["Marine Science", "Nursing", "Dental Hygiene", "Pre-Med"],
  "Oceanfront. Health Sciences. DO Medical School. Research.",
  "Health-focused, coastal, researchers. 'Nor'easters'.",
  "Home to Maine's only Medical School (DO). Reviewers call it 'vacation land'.",
  ["UNE"],
  "UNE has a campus literally *on* the ocean where the Saco River meets the sea. It is the health science giant of Northern New England, hosting a medical school and vast nursing/dental programs. Admits are almost always future healthcare providers or marine biologists."
);

DB["College of the Atlantic"] = create(
  "College of the Atlantic", "Bar Harbor, ME", "Private", "60%", "Moderate", "3.5+", "Test Blind", "$46,000",
  ["Human Ecology"],
  "One Major (Human Ecology). Bar Harbor. Acadia National Park. Sustainable.",
  "Eco-warriors, independent, nature-lovers. 'Black Flies'.",
  "Only offers ONE major: Human Ecology. You build your own path within it.",
  ["COA"],
  "COA is radically different. It has only one major: Human Ecology. Located in Bar Harbor (next to Acadia National Park), it is dedicated to the relationship between humans and the environment. Admits are passionate environmentalists, artists, and individualists."
);

DB["Saint Joseph's College of Maine"] = create(
  "Saint Joseph's College ME", "Standish, ME", "Private", "81%", "Moderate", "3.0+", "Test Blind", "$41,000",
  ["Nursing", "Business", "Education", "Exercise Science"],
  "Sebago Lake. Catholic (Mercy). Community. Nursing.",
  "Faithful, friendly, lake-life. 'Monks'.",
  "Campus is on the shores of Sebago Lake. Beautiful beach.",
  ["SJC", "Saint Joes ME"],
  "Saint Joe's (Maine) sits right on the shore of Sebago Lake (they have a beach!). It is a Mercy Catholic college with a heavy focus on Nursing and Education. It feels like a summer camp with classes. Admits are often friendly, community-oriented students."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 52: WASHINGTON DEEP DIVE
// ==========================================

DB["Western Washington University"] = create(
  "Western Washington", "Bellingham, WA", "Public", "93%", "Moderate", "3.4+", "Test Blind", "$10k/$26k",
  ["Environmental Science", "Education", "Psychology", "Design"],
  "Bellingham (Cool town). Outdoorsy. Sustainable. Liberal.",
  "Laid-back, outdoorsy, progressive. 'Vikings'.",
  "Located in Bellingham, arguably the best college town in the PNW.",
  ["WWU", "Western"],
  "Western (WWU) is the 'cool' public school in Washington. Located in Bellingham, it is a haven for hikers, environmentalists, and artists. It produces more Peace Corps volunteers than almost anyone. Admits are often progressive students who love the rain and the outdoors."
);

DB["Central Washington University"] = create(
  "Central Washington", "Ellensburg, WA", "Public", "86%", "Moderate", "3.0+", "Test Blind", "$9k/$25k",
  ["Education", "Music", "Aviation", "Business"],
  "Ellensburg (Rural). Windy. Education focus. Music.",
  "Friendly, grounded, spirited. 'Wildcats'.",
  "Top producer of music teachers and pilots in the Northwest.",
  ["CWU", "Central"],
  "Central (CWU) is in the high desert of Ellensburg. It is famous for two things: training teachers (Music Ed is huge) and training pilots (Aviation). The vibe is friendly and small-town. Admits are often looking for a classic campus experience away from the big city."
);

DB["Eastern Washington University"] = create(
  "Eastern Washington", "Cheney, WA", "Public", "95%", "Moderate", "2.9+", "Test Blind", "$8k/$25k",
  ["Business", "Social Work", "Engineering", "Dental Hygiene"],
  "Red Turf (Football). Spokane area. Access. Practical.",
  "Grit, community, practical. 'Eagles'.",
  "Home to the famous 'Red Turf' football field.",
  ["EWU", "Eastern"],
  "Eastern (EWU) is just outside Spokane. It is known for its bright red football field and its commitment to access. It is a major hub for Social Work, Business, and Health Sciences. Admits are often gritty, hard-working students from the Inland Empire."
);

DB["The Evergreen State College"] = create(
  "Evergreen State College", "Olympia, WA", "Public", "98%", "Moderate", "2.8+", "Test Blind", "$9k/$29k",
  ["Environmental Studies", "Arts", "Social Justice", "Media"],
  "Geoduck mascot. No grades. Interdisciplinary. Radical.",
  "Non-conformist, activist, creative. 'Geoducks'.",
  "Mascot is a Geoduck (clam). No majors, no grades—only evaluations.",
  ["Evergreen"],
  "Evergreen is one of the most unique public colleges in the US. The mascot is a clam (Geoduck). There are no grades (evaluations only) and no majors (you build an emphasis). It attracts radicals, artists, and environmentalists who refuse to fit in a box."
);

DB["Saint Martin's University"] = create(
  "Saint Martin's University", "Lacey, WA", "Private", "95%", "Moderate", "3.2+", "Test Optional", "$43,000",
  ["Civil Engineering", "Business", "Nursing", "Education"],
  "Benedictine. Abbey on campus. Community. Service.",
  "Welcoming, diverse, faithful. 'Saints'.",
  "An active Benedictine Abbey is the heart of the campus.",
  ["St Martins"],
  "Saint Martin's is a Benedictine university with an active monastery on campus. The monks teach classes! It is highly inclusive and diverse. Engineering and Business are surprisingly strong for a liberal arts school. Admits value community and hospitality."
);

DB["Pacific Lutheran University"] = create(
  "Pacific Lutheran", "Tacoma, WA", "Private", "86%", "Moderate", "3.4+", "Test Optional", "$49,000",
  ["Nursing", "Business", "Music", "Kinesiology"],
  "Lutheran. Global focus. PNW vibes. Music.",
  "Thoughtful, musical, global. 'Lutes'.",
  "Lutheran tradition of higher education: 'Vocation' is a key theme.",
  ["PLU"],
  "PLU is a Lutheran university in Tacoma with a deep commitment to global service and music. The choir is world-class. The curriculum focuses on finding your 'Vocation' (calling). Admits are often thoughtful students who want to serve the world."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 53: OREGON DEEP DIVE
// ==========================================

DB["Portland State University"] = create(
  "Portland State University", "Portland, OR", "Public", "95%", "Moderate", "3.0+", "Test Blind", "$10k/$29k",
  ["Graphic Design", "Business", "Social Work", "Urban Planning"],
  "Downtown Portland. Urban. Commuter. 'Let Knowledge Serve'.",
  "Urban, independent, diverse. 'Vikings'.",
  "The motto 'Let Knowledge Serve the City' defines the mission.",
  ["PSU", "Portland State"],
  "PSU is *in* downtown Portland. The city is your campus. It is famous for Urban Planning, Social Work, and a killer Graphic Design program. It feels like a part of the city fabric. Admits are independent urbanites who want to live like adults, not dorm dwellers."
);

DB["Southern Oregon University"] = create(
  "Southern Oregon University", "Ashland, OR", "Public", "93%", "Moderate", "3.0+", "Test Blind", "$11k/$28k",
  ["Theatre", "Criminology", "Business", "Environmental Science"],
  "Ashland (Shakespeare). Artsy. Mountains. Theatre.",
  "Creative, dramatic, outdoorsy. 'Raiders'.",
  "Located in Ashland, home of the world-famous Oregon Shakespeare Festival.",
  ["SOU"],
  "SOU is located in Ashland, the artsiest town in Oregon and home to the Shakespeare Festival. Naturally, the Theatre program is incredible. It also offers great access to the Siskiyou Mountains. Admits are often actors, artists, or hikers."
);

DB["University of Portland"] = create(
  "University of Portland", "Portland, OR", "Private", "77%", "Moderate", "3.6+", "Test Optional", "$54,000",
  ["Nursing", "Engineering", "Business", "Education"],
  "Holy Cross (Catholic). The Bluff. Community. Soccer.",
  "Friendly, polite, spirited. 'Pilots'.",
  "Women's Soccer is a national dynasty. Campus sits on a bluff overlooking the city.",
  ["UP", "Portland"],
  "UP sits on 'The Bluff' overlooking Portland. It is a Holy Cross Catholic school (friendly, service-oriented). The Nursing and Engineering programs are top-tier. Women's soccer is legendary (Megan Rapinoe went here). Admits are kind, community-focused high achievers."
);

DB["George Fox University"] = create(
  "George Fox University", "Newberg, OR", "Private", "91%", "Moderate", "3.3+", "Test Blind", "$40,000",
  ["Engineering", "Nursing", "Business", "Theology"],
  "Quaker (Friends). Wine Country. Be Known. Community.",
  "Faithful, intentional, innovative. 'Bruins'.",
  "Christian college with a 'Be Known' promise. Engineering is impressive.",
  ["George Fox", "GFU"],
  "George Fox is a Christian university with Quaker roots located in Oregon wine country. The 'Be Known' promise means professors actually mentor you. Engineering and Nursing are excellent. Admits are typically faith-based students looking for a supportive academic family."
);

DB["Linfield University"] = create(
  "Linfield University", "McMinnville, OR", "Private", "80%", "Moderate", "3.3+", "Test Blind", "$48,000",
  ["Nursing", "Business", "Wine Studies", "Media"],
  "Wine Studies major. McMinnville. Small classes. Nursing.",
  "Curious, engaged, friendly. 'Wildcats'.",
  "First school in the US to offer a major in Wine Studies.",
  ["Linfield"],
  "Linfield is located in the heart of the Willamette Valley wine region (and yes, they have a Wine Studies major). It is a classic liberal arts experience with a massive Nursing school in Portland. Admits are often looking for a tight-knit community with unique regional connections."
);

DB["Reed College"] = create(
  "Reed College", "Portland, OR", "Private", "42%", "Hard", "4.0+", "Test Blind", "$66,000",
  ["Biology", "English", "Psychology", "Physics"],
  "Intellectual powerhouse. Nuclear Reactor. Thesis. Counter-culture.",
  "Brilliant, non-conformist, intense. 'Reedies'.",
  "The only liberal arts college with a student-run nuclear reactor.",
  ["Reed"],
  "Reed is legendary. It is arguably the most intellectual college in the country. Grades aren't shown to students. Everyone writes a thesis. There is a nuclear reactor on campus run by undergrads. Admits are brilliant, quirky intellectuals who love learning for learning's sake."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 54: CSU EXPANSION
// ==========================================

DB["CSU Northridge"] = create(
  "CSU Northridge", "Northridge, CA", "Public", "69%", "Moderate", "3.2+", "Test Blind", "$7k/$19k",
  ["Film", "Music", "Business", "Engineering"],
  "CSUN. LA industry. Film/Arts. Commuter hub.",
  "Creative, hustling, diverse. 'Matadors'.",
  "Located in LA, it is a massive feeder for the Entertainment Industry.",
  ["CSUN"],
  "CSUN is a giant in the San Fernando Valley. It is a top-tier feeder for Hollywood (Film, Music, Business). The campus is diverse and bustling. Admits are often scrappy, creative students who want to break into the LA industry without the private school debt."
);

DB["CSU Sacramento"] = create(
  "CSU Sacramento", "Sacramento, CA", "Public", "94%", "Moderate", "3.1+", "Test Blind", "$7k/$19k",
  ["Criminal Justice", "Government", "Business", "Nursing"],
  "Sac State. Capital city. Government internships. Trees.",
  "Professional, active, green. 'Hornets'.",
  "Located in the state capital—unbeatable for government/policy internships.",
  ["Sac State", "CSU Sac"],
  "Sac State calls itself 'Tree Campus USA'. Located in the capital, it is the place to be for Criminal Justice, Government, and Policy. It is a massive engine of upward mobility. Admits are often future public servants or business leaders in the valley."
);

DB["CSU Chico"] = create(
  "CSU Chico", "Chico, CA", "Public", "96%", "Moderate", "3.0+", "Test Blind", "$7k/$19k",
  ["Business", "Nursing", "Education", "Construction Management"],
  "Chico State. Classical college town. Social. Beautiful.",
  "Social, friendly, spirited. 'Wildcats'.",
  "One of the few 'traditional' residential college towns in the CSU system.",
  ["Chico State", "CSU Chico"],
  "Chico State offers the classic 'college town' experience that is rare in California. The campus is gorgeous (a creek runs through it). It is famous for Business, Construction Management, and a very social student life. Admits are often looking for the quintessential college movie vibe."
);

DB["CSU Fresno"] = create(
  "CSU Fresno", "Fresno, CA", "Public", "97%", "Moderate", "3.0+", "Test Blind", "$7k/$19k",
  ["Agriculture", "Criminology", "Business", "Nursing"],
  "Fresno State. Central Valley. Agriculture. Bulldog Pride.",
  "Proud, agricultural, community-focused. 'Bulldogs'.",
  "The only university with a winery on campus where students make the wine.",
  ["Fresno State"],
  "Fresno State is the pride of the Central Valley. The 'Red Wave' of fans is huge. It is an agricultural powerhouse (they have a winery and farm on campus). Criminology is also elite. Admits are usually proud locals or students passionate about Ag and Food Science."
);

DB["CSU San Bernardino"] = create(
  "CSU San Bernardino", "San Bernardino, CA", "Public", "91%", "Moderate", "3.0+", "Test Blind", "$7k/$19k",
  ["Business", "Psychology", "Criminal Justice", "Nursing"],
  "Inland Empire. Cyber Security. Diversity. Access.",
  "Resilient, diverse, ambitious. 'Coyotes'.",
  "National leader in Cyber Security education.",
  ["CSUSB"],
  "CSUSB is the anchor of the Inlet Empire. The Cyber Security program is nationally famous (NSA designated). The campus is stunningly set against the mountains. Admits are often first-gen students looking for high-tech or business careers."
);

DB["CSU San Marcos"] = create(
  "CSU San Marcos", "San Marcos, CA", "Public", "95%", "Moderate", "3.1+", "Test Blind", "$7k/$19k",
  ["Business", "Nursing", "Kinesiology", "Human Development"],
  "North County SD. Modern. Hills/Stairs. Growth.",
  "Modern, fitness-focused, suburban. 'Cougars'.",
  "Newest CSU campus with modern facilities and lots of stairs.",
  ["CSUSM"],
  "CSUSM is the 'stairmaster' campus—it's built into a hill in North County San Diego. It is modern, clean, and growing fast. Business and Nursing are the draws. Admits are often locals from San Diego/Riverside who want a modern state school experience."
);

DB["Sonoma State University"] = create(
  "Sonoma State", "Rohnert Park, CA", "Public", "94%", "Moderate", "3.0+", "Test Blind", "$7k/$19k",
  ["Business (Wine)", "Psychology", "Liberal Studies", "Sociology"],
  "Wine Country. Residential. Small CSU. Dorms.",
  "Relaxed, social, aesthetic. 'Seawolves'.",
  "Has some of the best dorms in the state system. Wine Business Institute is unique.",
  ["Sonoma State"],
  "Sonoma State is the 'Granola' CSU. Located in wine country, it feels like a private liberal arts college. The dorms are legendary (mostly suites). It is famous for its Wine Business program. Admits are often students who want a smaller, residential public school."
);

DB["Humboldt State"] = create(
  "Humboldt State", "Arcata, CA", "Public", "98%", "Moderate", "2.9+", "Test Blind", "$7k/$19k",
  ["Forestry", "Marine Biology", "Environmental Science", "Art"],
  "Cal Poly Humboldt. Redwoods. Hippie vibe. Science.",
  "Earthy, scientific, independent. 'Lumberjacks'.",
  "Now officially 'Cal Poly Humboldt'. Surrounded by Redwood forests.",
  ["Cal Poly Humboldt", "Humboldt"],
  "Recently renamed 'Cal Poly Humboldt', this school is in the Redwoods. It is a paradise for biologists, foresters, and environmental scientists. The vibe is very 'NorCal'—earthy, artistic, and independent. Admits are students who want to study nature *in* nature."
);

DB["CSU Monterey Bay"] = create(
  "CSU Monterey Bay", "Seaside, CA", "Public", "96%", "Moderate", "2.9+", "Test Blind", "$7k/$19k",
  ["Marine Science", "Computer Science", "Cinematic Arts", "Psychology"],
  "Former Army base. Ocean access. Service learning. Otters.",
  "Service-minded, coastal, friendly. 'Otters'.",
  "Built on a former army base, so housing is plentiful. Marine Science is top-tier.",
  ["CSUMB"],
  "CSUMB is located on the old Fort Ord army base, meaning it has great housing options. It is minutes from the beach. Marine Science is the flagship major. Service learning is required for everyone. Admits are often drawn to the 'Otter' lifestyle: chill and coastal."
);

DB["CSU East Bay"] = create(
  "CSU East Bay", "Hayward, CA", "Public", "96%", "Moderate", "2.9+", "Test Blind", "$7k/$19k",
  ["Business", "Health Sciences", "Psychology", "Computer Science"],
  "Hayward/Oakland. Bay View. Diversity. Access.",
  "Diverse, urban, hustling. 'Pioneers'.",
  "Often cited as the most diverse university in the continental US.",
  ["CSUEB"],
  "CSU East Bay sits on a hill overlooking the entire SF Bay area (the view is crazy). It is incredibly diverse and focuses on access and mobility. It is a major feeder for Bay Area business and healthcare. Admits are practical students ready to work."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 55: CA PRIVATE EXPANSION I
// ==========================================

DB["University of San Francisco"] = create(
  "University of San Francisco", "San Francisco, CA", "Private", "70%", "Moderate", "3.5+", "Test Optional", "$55,000",
  ["Nursing", "Business", "Psychology", "Computer Science"],
  "Jesuit. City center. Social Justice. Diversity.",
  "Urban, compassionate, diverse. 'Dons'.",
  "Motto is 'Change the World from Here'. Campus is in the heart of SF.",
  ["USF"],
  "USF is a Jesuit university in the heart of San Francisco. It combines 'Social Justice' with 'Silicon Valley'. Nursing and Business are huge. The student body is very diverse. Admits are often city-lovers who want to use their education to solve societal problems."
);

DB["Saint Mary's College of California"] = create(
  "Saint Mary's College of CA", "Moraga, CA", "Private", "88%", "Moderate", "3.3+", "Test Blind", "$53,000",
  ["Business", "Psychology", "Kinesiology", "English"],
  "Lasallian (Catholic). Great Books. Seminar. Hills.",
  "Thoughtful, community-focused, articulate. 'Gaels'.",
  "Every student takes 'Seminar' classes based on the Great Books curriculum.",
  ["SMC", "Saint Marys"],
  "Saint Mary's (SMC) is a hidden gem in the Bay Area hills. It is Lasallian Catholic and famous for its 'Great Books' seminar curriculum—everyone reads Plato and Dante. It produces incredible thinkers and writers. Admits are students who want big questions and a small community."
);

DB["Azusa Pacific University"] = create(
  "Azusa Pacific University", "Azusa, CA", "Private", "87%", "Moderate", "3.2+", "Test Optional", "$43,000",
  ["Nursing", "Business", "Psychology", "Music"],
  "Christian (Interdenominational). God First. Community. SoCal.",
  "Faithful, friendly, service-oriented. 'Cougars'.",
  "Largest Christian university on the West Coast.",
  ["APU"],
  "APU is the largest Christian college on the West Coast. Located near LA, it emphasizes 'God First'. Nursing and Music are standouts. The vibe is sunny, friendly, and deeply faith-based. Admits are usually students who want a robust Christian environment with big-school resources."
);

DB["Biola University"] = create(
  "Biola University", "La Mirada, CA", "Private", "60%", "Moderate", "3.5+", "Test Optional", "$46,000",
  ["Cinema Arts", "Business", "Nursing", "Biblical Studies"],
  "Evangelical. Bible minor required. Torrey Honors. Community.",
  "Devout, intellectual, creative. 'Eagles'.",
  "Every student graduates with a minor in Biblical Studies. Film program is elite.",
  ["Biola"],
  "Biola is a premier Evangelical university. Every student gets a Bible minor. The Torrey Honors College is a rigorous great books program. The Film school is one of the best among Christian colleges. Admits are typically serious about their faith and their intellect."
);

DB["Point Loma Nazarene University"] = create(
  "Point Loma Nazarene", "San Diego, CA", "Private", "82%", "Moderate", "3.6+", "Test Optional", "$41,000",
  ["Nursing", "Biology", "Business", "Kinesiology"],
  "Oceanfront (Sunset Cliffs). Nazarene. Surfing. Community.",
  "Sunny, faithful, active. 'Sea Lions'.",
  "Campus is arguably the most scenic in CA, located on the Sunset Cliffs.",
  ["PLNU", "Point Loma"],
  "PLNU is located on the Sunset Cliffs of San Diego—students literally surf between classes. It is a Nazarene Christian school with a strong community feel. Nursing and Pre-Med are top-notch. Admits are often faith-based students who love the ocean and the sun."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 56: CA PRIVATE EXPANSION II
// ==========================================

DB["California Lutheran University"] = create(
  "California Lutheran", "Thousand Oaks, CA", "Private", "87%", "Moderate", "3.4+", "Test Optional", "$48,000",
  ["Business", "Psychology", "Exercise Science", "Biology"],
  "Lutheran. Thousand Oaks. Inclusive. Sports.",
  "Friendly, balanced, supportive. 'Kingsmen'.",
  "Official training site for the LA Rams.",
  ["Cal Lutheran", "CLU"],
  "Cal Lutheran (CLU) is in Thousand Oaks. It is a welcoming, inclusive Lutheran school. It is the training home of the LA Rams, so Sports Management and Exercise Science are huge. Admits are often balanced students looking for a supportive, friendly campus."
);

DB["University of Redlands"] = create(
  "Redlands University", "Redlands, CA", "Private", "82%", "Moderate", "3.5+", "Test Optional", "$56,000",
  ["Business", "Communicative Disorders", "Music", "GIS"],
  "Johnston Center. Bulldog mascot. SoCal. Liberal Arts.",
  "Customizable, spirited, sunny. 'Bulldogs'.",
  "The 'Johnston Center' allows students to design their own majors and contract for grades.",
  ["Redlands"],
  "Redlands is a classic liberal arts college in the Inland Empire. It is famous for the 'Johnston Center', a store-within-a-store where you can build your own major and get narrative evaluations. The mascot is a live Bulldog. Admits are often spirited and creative."
);

DB["Whittier College"] = create(
  "Whittier College", "Whittier, CA", "Private", "79%", "Moderate", "3.2+", "Test Optional", "$49,000",
  ["Kinesiology", "Business", "Psychology", "Political Science"],
  "Quaker roots. Diversity. Nixon's alma mater. LA area.",
  "Diverse, community-minded, adaptable. 'Poets'.",
  "One of the most diverse liberal arts colleges in the country. Mascot is a 'Poet'.",
  ["Whittier"],
  "Whittier is a diverse liberal arts college near LA (Nixon went here). The mascot is a 'Poet' (fierce!). It focuses on interdisciplinarity and access. It is a Hispanic Serving Institution (HSI). Admits are often local students looking for a small, supportive environment."
);

DB["Westmont College"] = create(
  "Westmont College", "Santa Barbara, CA", "Private", "82%", "Moderate", "3.7+", "Test Optional", "$50,000",
  ["Kinesiology", "Economics", "Biology", "English"],
  "Christian Liberal Arts. Santa Barbara. Intellectual. Beauty.",
  "Intellectual, faithful, aesthetic. 'Warriors'.",
  "Often called the 'Amherst of the West' for its rigorous Christian Liberal Arts focus.",
  ["Westmont"],
  "Westmont is a gorgeous Christian liberal arts college in the hills of Montecito (neighbors with Oprah). It is intellectually rigorous and socially conservative. It aims to be the best Christian liberal arts school in the US. Admits are smart, faithful, and love beauty."
);

DB["Dominican University of California"] = create(
  "Dominican University of CA", "San Rafael, CA", "Private", "93%", "Moderate", "3.4+", "Test Optional", "$49,000",
  ["Nursing", "Business", "Psychology", "Education"],
  "Marin County. Catholic. Gardens. Nursing.",
  "Driven, polite, nature-loving. 'Penguins'.",
  "Located in wealthy Marin County. Nursing program is prestigious.",
  ["Dominican CA"],
  "Dominican is located in San Rafael (Marin County), one of the prettiest places in the Bay. It is a small Catholic school with a huge reputation for Nursing and Health Sciences. The campus is a garden. Admits are often future nurses or business leaders."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 57: MOUNTAIN WEST PUBLICS
// ==========================================

DB["University of Nevada Las Vegas"] = create(
  "UNLV", "Las Vegas, NV", "Public", "83%", "Moderate", "3.0+", "Test Blind", "$9k/$25k",
  ["Hospitality", "Business", "Psychology", "Criminal Justice"],
  "Las Vegas. Hospitality #1. Diverse. Urban.",
  "Hustling, social, hospitable. 'Rebels'.",
  "The Hospitality/Hotel Management program is arguably the best in the world.",
  ["University of Nevada Las Vegas"],
  "UNLV is in the entertainment capital of the world. Naturally, its Hospitality and Hotel Management program is world-class (students intern on the Strip). It is a research heavyweight and very diverse. Admits are future hoteliers, event planners, and business moguls."
);

DB["Sierra Nevada University"] = create(
  "Sierra Nevada University", "Incline Village, NV", "Private", "65%", "Moderate", "3.1+", "Test Optional", "$36,000",
  ["Entrepreneurship", "Environmental Science", "Ski Business", "Arts"],
  "Lake Tahoe. Skiing. Entrepreneurship. Small.",
  "Adventurous, entrepreneurial, outdoorsy. 'Eagles'.",
  "Located on the shores of Lake Tahoe. Famous 'Ski Business' and Resort Management program.",
  ["Sierra Nevada"],
  "Sierra Nevada U is *at* Lake Tahoe. It is the school for skiers and snowboarders. They literally have a dedicated 'Ski Business and Resort Management' major. It recently merged/partnered with UNR but maintains its unique vibe. Admits are entrepreneurs who live for the snow."
);

DB["New Mexico Tech"] = create(
  "New Mexico Tech", "Socorro, NM", "Public", "97%", "Moderate", "3.6+", "1180-1380", "$8k/$24k",
  ["Mechanical Engineering", "CS", "Physics", "Mineral Engineering"],
  "STEM focus. High desert. Explosives research. Value.",
  "Geeky, brilliant, hands-on. 'Miners'.",
  "Top value public school. Owns a mountain for explosives testing.",
  ["NMT", "New Mexico Institute of Mining and Technology"],
  "NM Tech is a STEM Disneyland in the high desert. It is small, rigorous, and incredibly cheap. It owns a mountain used for explosives research (students can get involved). It produces brilliant engineers. Admits are smart, unpretentious nerds who love blowing things up (safely)."
);

DB["Eastern New Mexico University"] = create(
  "Eastern New Mexico", "Portales, NM", "Public", "51%", "Moderate", "2.9+", "Test Blind", "$7k/$17k",
  ["Communicative Disorders", "Business", "Education", "Aviation"],
  "Rural. Affordable. Friendly. Tradition.",
  "Friendly, rural, grounded. 'Greyhounds'.",
  "Consistently ranked as one of the most affordable universities in the Southwest.",
  ["ENMU"],
  "ENMU is known for being affordable and friendly. Located in rural Portales, it offers a safe, classic campus life. It is strong in Speech Pathology and Aviation. Admits are often students looking for a solid education without debt."
);

DB["Idaho State University"] = create(
  "Idaho State University", "Pocatello, ID", "Public", "99%", "Moderate", "2.9+", "Test Blind", "$8k/$25k",
  ["Health Sciences", "Business", "Engineering", "Nuclear Science"],
  "Health Science hub. Mountains. Nuclear research. Value.",
  "Active, practical, health-focused. 'Bengals'.",
  "Designated as the state's lead institution for health professions.",
  ["ISU", "Idaho State"],
  "Idaho State (Pocatello) is the health science hub of Idaho. If you want to be a pharmacist, PT, or nurse in Idaho, you likely come here. It also has a unique Nuclear Science program. Admits are practical students who love the outdoors."
);

DB["Montana Technological University"] = create(
  "Montana Tech", "Butte, MT", "Public", "97%", "Moderate", "3.3+", "1100-1280", "$7k/$23k",
  ["Petroleum Engineering", "Mining Engineering", "Nursing", "Data Science"],
  "STEM focus. Mining heritage. High ROI. Tough.",
  "Hard-working, engineering-minded, gritty. 'Orediggers'.",
  "Renowned for Mining and Petroleum Engineering. Graduates have huge starting salaries.",
  ["Montana Tech"],
  "Montana Tech is in Butte (a historic mining town). It is a serious engineering school. The mascot is 'Oredigger'. Graduates often make more money than Ivy Leaguers due to the Mining and Petroleum focus. Admits are gritty STEM students who want high ROI."
);

DB["Western Colorado University"] = create(
  "Western Colorado", "Gunnison, CO", "Public", "92%", "Moderate", "3.1+", "Test Optional", "$10k/$22k",
  ["Business", "Environment and Sustainability", "Exercise Science", "Biology"],
  "High altitude. Skiing (Crested Butte). Outdoors. Small.",
  "Adventurous, hardy, active. 'Mountaineers'.",
  "Located near Crested Butte. The 'Mountain Sports' program is unique.",
  ["Western", "Western State"],
  "Western Colorado is for the mountain lovers. Located in Gunnison (near Crested Butte), it is high-altitude learning. The 'Mountain Sports' team (skiing, trail running, biking) is a varsity sport here. Admits are students who want to study in the morning and climb a peak in the afternoon."
);

DB["Fort Lewis College"] = create(
  "Fort Lewis College", "Durango, CO", "Public", "91%", "Moderate", "3.0+", "Test Blind", "$9k/$19k",
  ["Business", "Engineering", "Adventure Education", "Geology"],
  "Durango. Native American tuition waiver. Mountains. Adventure.",
  "Diverse, adventurous, outdoorsy. 'Skyhawks'.",
  "Offers free tuition to any Native American student from a registered tribe.",
  ["FLC", "Fort Lewis"],
  "Fort Lewis is in Durango, an outdoor mecca. It is famous for offering *free tuition* to Native American students. It has an 'Adventure Education' major. The campus overlooks the San Juan mountains. Admits are diverse and adventurous."
);

DB["Colorado Mesa University"] = create(
  "Colorado Mesa", "Grand Junction, CO", "Public", "80%", "Moderate", "3.1+", "Test Blind", "$9k/$23k",
  ["Nursing", "Business", "Kinesiology", "Criminal Justice"],
  "Western Slope. Desert/Mountains. Rapid growth. Value.",
  "Active, practical, growing. 'Mavericks'.",
  "Fastest growing university in Colorado. Modern campus.",
  ["CMU", "Colorado Mesa"],
  "CMU is on the 'Western Slope' of Colorado in Grand Junction. It is warmer and more desert-like than the rest of CO. The campus is booming with new facilities. It focuses on hands-on learning and health sciences. Admits are often outdoor enthusiasts who prefer the desert vibe."
);


// ==========================================
// MANUAL DEEP DIVE BATCH 58: MOUNTAIN WEST PRIVATES
// ==========================================

DB["The College of Idaho"] = create(
  "College of Idaho", "Caldwell, ID", "Private", "46%", "Moderate", "3.6+", "Test Blind", "$35,000",
  ["Biology", "Business", "Political Economy", "Psychology"],
  "PEAK Curriculum. #1 in Idaho. Liberal Arts. Close-knit.",
  "Multi-talented, intellectual, friendly. 'Yotes'.",
  "The PEAK curriculum requires a major and three minors across different disciplines.",
  ["C of I"],
  "College of Idaho is the best liberal arts college in the region. Its 'PEAK' curriculum is genius: you must have a major and *three* minors in different fields (e.g., Biology major + Art, History, and Skiing minors). It forces you to be well-rounded. Admits are polymaths."
);

DB["Carroll College"] = create(
  "Carroll College", "Helena, MT", "Private", "85%", "Moderate", "3.4+", "1100-1300", "$39,000",
  ["Nursing", "Biology (Pre-Med)", "Anthrozoology", "Civil Engineering"],
  "Catholic (Diocesan). Smart. Outdoors. Anthrozoology.",
  "Smart, faithful, outdoorsy. 'Saints'.",
  "Has a unique 'Anthrozoology' major (human-animal bond). Pre-Med acceptance is elite.",
  ["Carroll"],
  "Carroll is a Catholic college in Helena that punches way above its weight. Its Pre-Med acceptance rate is consistently 85%+. It also has a famous Anthrozoology major (you train horses and dogs!). Admits are smart, faithful students who want rigor and mountains."
);

DB["Regis University"] = create(
  "Regis University", "Denver, CO", "Private", "78%", "Moderate", "3.4+", "1080-1280", "$43,000",
  ["Nursing", "Business", "Neuroscience", "Pharmacy"],
  "Jesuit. Rocky Mountains. Service. Health Science.",
  "Service-oriented, urban, compassionate. 'Rangers'.",
  "The only Jesuit university in the Rocky Mountain West.",
  ["Regis"],
  "Regis is the Jesuit university of the Rockies. Located in Denver, it combines the Jesuit 'men and women for others' mission with big city access. Nursing and Pharmacy are huge. Admits are often looking for a values-based education with a view of the mountains."
);

// Generate the bulk list
BULK_DATA_SOURCE.forEach(([name, state, acceptance, sat]) => {
  if (!DB[name]) {
    let diff: 'Very Hard' | 'Hard' | 'Moderate' | 'Safety' = "Moderate";
    const accRate = parseInt(acceptance);

    // Determine Difficulty Logic
    if (!isNaN(accRate)) {
      if (accRate < 15) diff = "Very Hard";
      else if (accRate < 35) diff = "Hard";
      else if (accRate > 75) diff = "Safety";
    }

    // Determine GPA logic based on difficulty
    let gpa = "3.5+";
    if (diff === "Very Hard") gpa = "3.9+ UW";
    else if (diff === "Hard") gpa = "3.7+ UW";
    else if (diff === "Safety") gpa = "3.0+";

    const details = getSmartDetails(name, state, acceptance);

    DB[name] = create(
      name,
      `${name}, ${state}`,
      name.includes("College") && !name.includes("Boston") ? "Liberal Arts" : "Public", // Rough heuristic
      acceptance,
      diff,
      gpa,
      sat,
      "$15k-$55k", // Generic range for bulk
      details.majors,
      details.vibe,
      details.hook,
      details.strategy,
      details.abbreviations,
      details.traits
    );
  }
});

export const COLLEGE_DATABASE = DB;