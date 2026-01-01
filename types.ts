export enum ActivityType {
  ACADEMIC = 'Academic',
  ART = 'Art',
  ATHLETICS = 'Athletics',
  COMMUNITY_SERVICE = 'Community Service',
  INTERNSHIP = 'Internship',
  RESEARCH = 'Research',
  OTHER = 'Other'
}

export interface Activity {
  id: string;
  position: string; // Leadership role or position
  organization: string;
  description: string; // Max 150 words
  type: ActivityType;
  gradeLevels: number[]; // 9, 10, 11, 12
  hoursPerWeek: number;
  weeksPerYear: number;
  isTimingSchoolYear: boolean;
  isTimingBreak: boolean;
  isTimingAllYear: boolean;
  tier?: number; // 1 (Top) to 4 (General)
  startDate?: string; // e.g., "September 2021"
  endDate?: string; // e.g., "June 2024" or "Present"
  isStarred?: boolean; // Mark as user's #1 priority activity
  contentHash?: string; // Hash of content for caching analysis
  descriptionLength?: number; // Length of description for cache comparison
  includeInResume?: boolean; // Whether to include this activity in resume (default: true)
  impactAnalysis?: ActivityImpactAnalysis; // Persisted AI analysis result
  isMajorRelated?: boolean; // User-defined flag for major relevance
}

export interface Project {
  id: string;
  title: string;
  description: string;
  skills?: string; // Skills/methods used - works for ANY major (art: "Watercolor, Mixed Media"; business: "Financial Modeling, Market Analysis"; etc.)
  startDate?: string;
  endDate?: string;
  portfolio?: string; // Portfolio link, publication, presentation, etc. - universal for all majors
  tier?: number; // Same 1-10 scale as activities
  includeInResume?: boolean; // Whether to include this project in resume (default: true)
  isMajorRelated?: boolean; // User-defined flag for major relevance
}

export interface Honor {
  id: string;
  title: string;
  level: 'School' | 'State' | 'National' | 'International';
  gradeLevel: number;
  description?: string;
}

export interface Narrative {
  archetype_name: string;
  tagline: string;
  evidence: string[];
  essay_angle: string;
  why_it_works: string;
}

export interface NarrativeAnalysis {
  analysis_summary: string;
  narratives: Narrative[];
}

export interface UserProfile {
  name: string;
  graduationYear: number;
  graduatingClass?: string; // e.g., "Class of 2026"
  targetMajor: string;
  dreamSchool?: string;
  email: string;
  gpa?: string; // Added for chance prediction
  satScore?: string; // Added for chance prediction
  apCount?: string;
  ibCount?: string;
  honorsCount?: string;
  offersHonors?: boolean; // Does school offer Honors classes?
  offersAP?: boolean; // Does school offer AP classes?
  offersIB?: boolean; // Does school offer IB classes?
  archetype?: string; // The primary brand title from AI
  narrativeAnalysis?: NarrativeAnalysis; // The full AI analysis
}

export interface CollegeInfo {
  name: string;
  location: string;
  type: 'Private' | 'Public' | 'Liberal Arts';
  acceptanceRate: string;
  difficulty: 'Very Hard' | 'Hard' | 'Moderate' | 'Safety';
  avgGPA: string;
  avgSAT: string;
  avgACT: string;
  tuition: string;
  culture: string; // "What things they like"
  popularMajors: string[]; // e.g. ["CS", "Econ"]
  admissionsHook: string; // "What they look for"
  applicationStrategy: string; // "How to get in"
  admittedStudentProfile: string; // Stats of previous applicants
  abbreviations: string[]; // e.g. ["MIT", "Mass Tech"]
}

export interface College {
  id: string;
  name: string;
  status: 'Interested' | 'Applying' | 'Submitted' | 'Accepted' | 'Rejected';
  analysis?: CollegeAnalysis;
}

export interface CollegeAnalysis {
  category: 'Ultra Reach' | 'Reach' | 'Target' | 'Safety';
  probability: string; // e.g., "15%", "80%"
  strengths?: string[]; // Specific positive aspects of the application
  weaknesses?: string[]; // Specific gaps or concerns
  reasoning: string;
  tips: string[];
}

export interface ActivityImpactAnalysis {
  score: number; // 1-10 scale
  rank_name: string; // e.g. "Gold II", "Silver I"
  rank_description: string; // Brief description from rubric
  brutal_feedback: string;
  level_up_action: string; // Contextual based on score
}

export interface AIGenerationResult {
  polishedDescription: string;
  nextSteps: string[];
}

export interface ResumeData {
  summary: string;
  education: {
    school: string;
    gradYear: string;
    gpa: string;
    coursework: string;
  };
  experience: {
    role: string;
    organization: string;
    dates: string;
    bullets: string[];
  }[];
  projects?: {
    title: string;
    skills?: string;
    dates: string;
    bullets: string[];
  }[];
  skills: string[];
  awards: string[];
}

export interface BragSheetData {
  introaryStatement: string; // "About Me"
  academicHighlight: string;
  keyExperiences: {
    title: string;
    narrative: string;
  }[];
  personalQualities: string[];
}

export interface Interviewer {
  id: string;
  name: string;
  college: string;
  role: string; // "Alum", "Senior Dean", "Student"
  style: string; // "Skeptical", "Casual", "Intellectual", "Aggressive"
  imageColor: string;
}