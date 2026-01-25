import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  TextInput, Alert, Dimensions, ActivityIndicator, Share
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Plus, Trash2, Save, Sparkles, Printer, GraduationCap,
  BookOpen, Clock, ChevronRight, User, School, FileText,
  TrendingUp, ArrowRight, Home, Download, Settings,
  Search, X, MapPin, DollarSign, RotateCcw, Gavel,
  Lightbulb, ArrowLeft, CheckCircle2, AlertCircle, MessageCircle, Mic, StopCircle, Send, Star
} from 'lucide-react-native';
import { startInterview, continueInterview, generateInterviewFeedback } from './services/gemini';
// --- IMPORTS FROM YOUR FILE STRUCTURE ---
import { db } from './services/db';
import {
  polishDescription, suggestNextSteps, analyzeCollegeChances,
  analyzeActivityImpact, generateResume, generateBragSheet,
  analyzeStudentArchetypes, hasFoundationModelsSupport
} from './services/gemini';
import { generateResumePDF, generateBragSheetPDF } from './services/pdfGenerator';
import { COLLEGE_DATABASE } from './services/collegeData';
import {
  Activity, UserProfile, ActivityType, College,
  ActivityImpactAnalysis, ResumeData, BragSheetData, Project
} from './types';

const { width } = Dimensions.get('window');

// Helper function to validate date ranges
const validateDateRange = (startDate: string | undefined, endDate: string | undefined): boolean => {
  if (!startDate || !endDate || endDate.toLowerCase().includes('present')) {
    return true; // If either is missing or end is "Present", it's valid
  }

  const parseDate = (dateStr: string): Date => {
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
      return new Date(year, month);
    }

    // Try to parse the date string directly
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }

    return new Date(0); // Fallback to epoch
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  return end >= start;
};

// --- SUB-COMPONENTS (UI Only) ---

const TopBar = ({ setView, profile }: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.topBar, { paddingTop: insets.top + 10 }]}>
      <View style={s.logoRow}>
        <View style={s.logoIcon}><Text style={s.logoP}>P</Text></View>
        <Text style={s.logoText}>Pathway</Text>
      </View>
      <TouchableOpacity style={s.profileBtn} onPress={() => setView('profile')}>
        <User size={16} color="#a1a1aa" />
        <Text style={s.profileBtnTxt}>{profile?.name?.split(' ')[0] || 'Student'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const BottomNav = ({ view, setView, isInterviewActive }: any) => {
  const mainTabs = ['dashboard', 'colleges', 'interview', 'export'];
  // Only hide nav on profile page - ALWAYS show on interview page
  if (view === 'profile') return null;
  if (!mainTabs.includes(view)) return null;
  return (
    <View style={s.navContainer}>
      <View style={s.navBar}>
        <NavTab active={view === 'dashboard'} icon={Home} onPress={() => setView('dashboard')} />
        <NavTab active={view === 'colleges'} icon={School} onPress={() => setView('colleges')} />
        <NavTab active={view === 'interview'} icon={MessageCircle} onPress={() => setView('interview')} />
        <NavTab active={view === 'export'} icon={Download} onPress={() => setView('export')} />
      </View>
    </View>
  );
};

const NavTab = ({ active, icon: Icon, onPress }: any) => (
  <TouchableOpacity onPress={onPress} style={s.navTab}>
    <Icon size={24} color={active ? '#fff' : '#52525b'} strokeWidth={active ? 2.5 : 2} />
    {active && <View style={s.navActiveDot} />}
  </TouchableOpacity>
);

const ActivityCard = ({ activity, onEdit, onStar, isExample }: any) => {
  const getTierColor = (t?: number) => {
    // Tier 1 = 10/10 (best), Tier 10 = 1/10 (worst)
    if (!t) return { text: '#71717a', bg: '#18181b', border: '#27272a' };

    if (t <= 2) {
      // Tier 1-2: Green (Exceptional)
      return { text: '#34d399', bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.3)' };
    } else if (t <= 4) {
      // Tier 3-4: Yellow (Great)
      return { text: '#facc15', bg: 'rgba(250, 204, 21, 0.1)', border: 'rgba(250, 204, 21, 0.3)' };
    } else if (t <= 6) {
      // Tier 5-6: Blue (Good)
      return { text: '#60a5fa', bg: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.3)' };
    } else if (t <= 8) {
      // Tier 7-8: Orange (Average)
      return { text: '#fb923c', bg: 'rgba(251, 146, 60, 0.1)', border: 'rgba(251, 146, 60, 0.3)' };
    } else {
      // Tier 9-10: Red (Weak)
      return { text: '#f87171', bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.3)' };
    }
  };
  const style = getTierColor(activity.tier);

  return (
    <View style={[s.card, isExample && s.exampleCard]}>
      <View style={s.cardHeader}>
        <View style={s.cardBadgeRow}>
          <Text style={s.cardTypeBadge}>{activity.type}</Text>
          {activity.tier && (
            <View style={[s.tierBadge, { backgroundColor: style.bg, borderColor: style.border }]}>
              <Text style={[s.tierBadgeText, { color: style.text }]}>Tier {activity.tier}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            onStar?.(activity);
          }}
          style={{ padding: 4 }}
        >
          {activity.isStarred ?
            <Star fill="#fbbf24" color="#fbbf24" size={20} /> :
            <Star color="#52525b" size={20} />
          }
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => onEdit(activity)}>
        <View style={s.dotRow}>
          {[9, 10, 11, 12].map(g => (
            <View key={g} style={[s.gradeDot, activity.gradeLevels.includes(g) && s.gradeDotActive]} />
          ))}
        </View>
        <Text style={s.cardTitle}>{activity.position}</Text>
        <Text style={s.cardOrg}>{activity.organization}</Text>
        <Text style={s.cardDesc} numberOfLines={2}>{activity.description || 'No description added...'}</Text>
        <View style={s.cardFooter}>
          <View style={s.footerItem}><Clock size={14} color="#52525b" /><Text style={s.footerText}>{activity.hoursPerWeek} hrs/wk</Text></View>
          <View style={s.footerItem}><BookOpen size={14} color="#52525b" /><Text style={s.footerText}>{activity.weeksPerYear} wks/yr</Text></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// --- FEATURE: INTERVIEW CONSTANTS ---
import { Interviewer } from './types';

const INTERVIEW_COLLEGES = [
  { id: 'harvard', name: "Harvard", color: "#A51C30" },
  { id: 'yale', name: "Yale", color: "#00356B" },
  { id: 'princeton', name: "Princeton", color: "#FF6000" },
  { id: 'stanford', name: "Stanford", color: "#8C1515" },
  { id: 'upenn', name: "UPenn", color: "#011F5B" },
  { id: 'columbia', name: "Columbia", color: "#0046A6" },
  { id: 'dartmouth', name: "Dartmouth", color: "#00693E" },
  { id: 'brown', name: "Brown", color: "#4E3629" },
  { id: 'duke', name: "Duke", color: "#003087" },
  { id: 'northwestern', name: "Northwestern", color: "#4E2A84" },
  { id: 'rice', name: "Rice", color: "#00205B" },
  { id: 'vanderbilt', name: "Vanderbilt", color: "#CFAE70" },
  { id: 'tufts', name: "Tufts", color: "#3E8EDE" },
  { id: 'emory', name: "Emory", color: "#002878" },
  { id: 'mit', name: "MIT", color: "#A31F34" },
  { id: 'georgetown', name: "Georgetown", color: "#041E42" },
];

import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';

const InterviewSection = ({ profile, activities, onActiveChange, onBack }: any) => {
  const [chat, setChat] = useState<{ role: 'ai' | 'user', text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [selectedCollege, setSelectedCollege] = useState(INTERVIEW_COLLEGES[0]); // Harvard default
  const [hasStarted, setHasStarted] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [unsafeContentCount, setUnsafeContentCount] = useState(0);

  const scrollViewRef = React.useRef<ScrollView>(null);

  // Check device capability on mount
  useEffect(() => {
    const checkCapability = async () => {
      const hasAI = await hasFoundationModelsSupport();
      if (!hasAI) {
        Alert.alert(
          'Feature Unavailable',
          'Interview feature is only available for devices iPhone 15 Pro and above.',
          [{ text: 'OK', onPress: () => onBack() }]
        );
      }
    };
    checkCapability();
  }, []);

  // Auto-start interview on first mount (if device is compatible)
  useEffect(() => {
    const initInterview = async () => {
      const hasAI = await hasFoundationModelsSupport();
      if (hasAI && !hasStarted && profile) {
        startSession();
        setHasStarted(true);
      }
    };
    initInterview();
  }, [profile, hasStarted]);

  // Restart when college changes AFTER initial start
  useEffect(() => {
    if (hasStarted && chat.length > 0) {
      startSession();
    }
  }, [selectedCollege.id]);

  const startSession = async () => {
    setLoading(true);
    setFeedback(null);
    setUnsafeContentCount(0); // Reset counter for new session
    const q1 = await startInterview(profile, activities, selectedCollege.name);
    setChat([{ role: 'ai' as const, text: q1 }]);
    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");

    const newHistory = [...chat, { role: 'user' as const, text: userMsg }];
    setChat(newHistory);
    setLoading(true);

    // Count user messages to auto-end interview
    const userMessageCount = newHistory.filter(msg => msg.role === 'user').length;

    // Error handling is now in gemini.ts, but keep try-catch as safety net
    try {
      // Auto-end after 7 user messages
      if (userMessageCount >= 7) {
        const closingMsg = `Thank you so much for taking the time to chat with me today. It's been a pleasure learning about your experiences and aspirations. I think we have everything we need. Best of luck with your application!`;
        setChat([...newHistory, { role: 'ai' as const, text: closingMsg }]);
        setLoading(false);
        // Auto-trigger grading after a short delay
        setTimeout(async () => {
          setLoading(true);
          const report = await generateInterviewFeedback(newHistory, unsafeContentCount);
          setFeedback(report);
          setLoading(false);
        }, 1500);
        return;
      }

      const aiMsg = await continueInterview(newHistory, userMsg, selectedCollege.name);
      setChat([...newHistory, { role: 'ai' as const, text: aiMsg }]);
    } catch (error) {
      // This should rarely happen now, but keep as final safety net
      console.log('Unexpected error in handleSend:', error);
      setUnsafeContentCount(prev => prev + 1);
      const fallbackMsg = "Let's continue. What motivated you to apply to our program?";
      setChat([...newHistory, { role: 'ai' as const, text: fallbackMsg }]);
    }
    setLoading(false);
  };

  const endSession = async () => {
    setLoading(true);
    const report = await generateInterviewFeedback(chat, unsafeContentCount);
    setFeedback(report);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -10 : 0}
    >
      <View style={[s.container, { flex: 1, marginTop: -20 }]}>
        {/* College Dropdown - Hidden when typing */}
        {!isInputFocused && (
          <View style={{ marginBottom: 15 }}>
            <Text style={s.label}>Interviewer College</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              {INTERVIEW_COLLEGES.map((col) => (
                <TouchableOpacity
                  key={col.id}
                  onPress={() => setSelectedCollege(col)}
                  style={[
                    s.chipItem,
                    selectedCollege.id === col.id && { backgroundColor: col.color, borderColor: col.color }
                  ]}
                >
                  <Text style={[s.chipText, selectedCollege.id === col.id && { color: '#fff' }]}>{col.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Chat Interface - Auto-started, no selection screen */}
        {!feedback && (
          <>
            <View style={[s.chatHeader, isInputFocused && { marginTop: 15 }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View style={[s.intAvatarSmall, { backgroundColor: selectedCollege.color }]}>
                  <Text style={s.intAvatarTxtSmall}>{selectedCollege.name.substring(0, 1)}</Text>
                </View>
                <View>
                  <Text style={s.chatTitle}>Alex</Text>
                  <Text style={s.chatSub}>{selectedCollege.name} • Admissions</Text>
                </View>
              </View>
              {chat.length > 0 && (
                <TouchableOpacity onPress={endSession} style={s.endBtn}>
                  <StopCircle size={16} color="#f87171" />
                  <Text style={s.endBtnTxt}>End & Grade</Text>
                </TouchableOpacity>
              )}
            </View>

            <ScrollView
              style={s.chatContainer}
              contentContainerStyle={{ paddingBottom: 20 }}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {chat.map((msg, i) => (
                <View key={i} style={[s.bubble, msg.role === 'user' ? s.userBubble : s.aiBubble]}>
                  <Text style={s.bubbleText}>{msg.text}</Text>
                </View>
              ))}
              {loading && <Text style={s.typing}>Alex is thinking...</Text>}
            </ScrollView>

            <View style={s.inputRow}>
              <TextInput
                style={s.chatInput}
                value={input}
                onChangeText={setInput}
                placeholder="Type your answer..."
                placeholderTextColor="#52525b"
                onSubmitEditing={handleSend}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              <TouchableOpacity onPress={handleSend} style={s.sendBtn}>
                <Send size={20} color="#000" />
              </TouchableOpacity>
            </View>
          </>
        )}

        {feedback && (
          <View style={s.analysisCard}>
            <Text style={s.sectionTitle}>Interview Report Card</Text>
            <View style={s.rowGap}>
              <Text style={s.scoreTxt}>{feedback.score}/10</Text>
              <View>
                <Text style={s.scoreRank}>{feedback.verdict}</Text>
                <Text style={s.scoreLabel}>{feedback.impression}</Text>
              </View>
            </View>

            <View style={[s.feedbackBox, { borderColor: '#4ade80', backgroundColor: 'rgba(74,222,128,0.1)' }]}>
              <Text style={[s.feedbackTitle, { color: '#4ade80' }]}>Strengths</Text>
              {feedback.strengths.map((str: string, i: number) => <Text key={i} style={[s.feedbackTxt, { flexWrap: 'wrap', flexShrink: 1 }]}>• {str}</Text>)}
            </View>

            <View style={[s.feedbackBox, { borderColor: '#f87171', backgroundColor: 'rgba(248,113,113,0.1)' }]}>
              <Text style={[s.feedbackTitle, { color: '#f87171' }]}>Weaknesses</Text>
              {feedback.weaknesses.map((str: string, i: number) => <Text key={i} style={[s.feedbackTxt, { flexWrap: 'wrap', flexShrink: 1 }]}>• {str}</Text>)}
            </View>

            <TouchableOpacity style={s.saveBtn} onPress={() => { setChat([]); setFeedback(null); onBack?.(); }}>
              <Text style={s.saveBtnTxt}>Back to Menu</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [aiSupported, setAiSupported] = useState(false);

  useEffect(() => {
    // Check for Foundation Model support on mount
    const checkSupport = async () => {
      const supported = await hasFoundationModelsSupport();
      setAiSupported(supported);
    };
    checkSupport();
  }, []);
  // 1. ALL HOOKS DEFINED UNCONDITIONALLY AT THE TOP
  const [view, setView] = useState('dashboard');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);

  // Editor State
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [analysisExpanded, setAnalysisExpanded] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [impactAnalysis, setImpactAnalysis] = useState<ActivityImpactAnalysis | null>(null);

  // Export State
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [bragSheetData, setBragSheetData] = useState<BragSheetData | null>(null);

  // College Search
  const [collegeSearch, setCollegeSearch] = useState("");
  const [collegeResults, setCollegeResults] = useState<string[]>([]);

  // Interview Active State
  const [isInterviewActive, setIsInterviewActive] = useState(false);

  // Foundation Models capability
  const [hasAdvancedAI, setHasAdvancedAI] = useState(true); // Default to true, will check on mount

  // ScrollView ref for auto-scroll
  const scrollViewRef = useRef<ScrollView>(null);

  // 2. DATA LOADING EFFECT
  useEffect(() => {
    const init = async () => {
      await db.seedIfEmpty();
      refreshData();
      // Check if device supports advanced AI features (resume/brag sheet)
      const hasAI = await hasFoundationModelsSupport();
      setHasAdvancedAI(hasAI);
    };
    init();
  }, []);

  const refreshData = async () => {
    setProfile(await db.getProfile());
    setActivities(await db.getActivities());
    setProjects(await db.getProjects());
    setColleges(await db.getColleges());
  };

  // Helper to navigate and scroll to top
  const navigateToView = (newView: string) => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    setView(newView);
  };


  // 3. HANDLERS
  const handleSaveActivity = async () => {
    if (editingActivity) {
      // Validate date range
      if (!validateDateRange(editingActivity.startDate, editingActivity.endDate)) {
        Alert.alert(
          "Invalid Dates",
          "End date cannot be before start date. Please check your dates.",
          [{ text: "OK" }]
        );
        return;
      }

      // Save activity with the current analysis if it exists
      const activityToSave = impactAnalysis
        ? { ...editingActivity, impactAnalysis }
        : editingActivity;

      await db.saveActivity(activityToSave);
      refreshData();
      navigateToView('dashboard');
      setAiSuggestions([]);
      setImpactAnalysis(null);
      setAnalysisExpanded(true);
    }
  };

  const handleDeleteActivity = (id: string) => {
    Alert.alert("Delete Activity", "Are you sure? This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete", style: "destructive", onPress: async () => {
          await db.deleteActivity(id);
          refreshData();
          setView('dashboard');
        }
      }
    ]);
  };

  // Project Handlers
  const handleSaveProject = async () => {
    if (editingProject) {
      // Validate date range
      if (!validateDateRange(editingProject.startDate, editingProject.endDate)) {
        Alert.alert(
          "Invalid Dates",
          "End date cannot be before start date. Please check your dates.",
          [{ text: "OK" }]
        );
        return;
      }

      await db.saveProject(editingProject);
      refreshData();
      navigateToView('dashboard');
      setEditingProject(null);
    }
  };

  const handleDeleteProject = (id: string) => {
    Alert.alert("Delete Project", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete", style: "destructive", onPress: async () => {
          await db.deleteProject(id);
          refreshData();
        }
      }
    ]);
  };

  const handleNewProject = () => {
    setEditingProject({
      id: Date.now().toString(),
      title: "",
      description: "",
      skills: "",
      startDate: "",
      endDate: "",
      portfolio: "",
      includeInResume: true
    });
    navigateToView('project-editor');
  };

  const handlePolishProjectDescription = async () => {
    if (!editingProject?.description) return;
    setAiLoading(true);
    const polished = await polishDescription(editingProject.description, profile?.targetMajor || 'General');
    setEditingProject({ ...editingProject, description: polished });
    setAiLoading(false);
  };


  const handleAnalyzeStrategy = async () => {
    if (!profile || activities.length === 0) return;
    setAiLoading(true);
    const result = await analyzeStudentArchetypes(profile, activities, projects);
    const updated = { ...profile, archetype: result.narratives[0]?.archetype_name, narrativeAnalysis: result };
    await db.saveProfile(updated);
    setProfile(updated);
    setAiLoading(false);
  };

  const handleSearchCollege = (term: string) => {
    setCollegeSearch(term);
    if (term.length > 1) {
      const lowerTerm = term.toLowerCase();
      const matches = Object.keys(COLLEGE_DATABASE).filter(c => {
        // Match Name
        if (c.toLowerCase().includes(lowerTerm)) return true;
        // Match Abbreviation
        const info = COLLEGE_DATABASE[c];
        if (info.abbreviations && info.abbreviations.some((abbr: string) => abbr.toLowerCase().includes(lowerTerm))) return true;

        return false;
      });
      setCollegeResults(matches.slice(0, 10));
    } else {
      setCollegeResults([]);
    }
  };

  const handleSelectCollege = async (name: string) => {
    if (colleges.find(c => c.name === name)) {
      Alert.alert("Exists", "College already added!");
      setCollegeSearch("");
      setCollegeResults([]);
      return;
    }
    const newCollege: College = { id: Date.now().toString(), name, status: 'Interested' };
    await db.saveCollege(newCollege);
    setCollegeSearch("");
    setCollegeResults([]);
    refreshData();
  };

  const handleStarActivity = async (activity: Activity) => {
    // If this activity is already starred, unstar it
    if (activity.isStarred) {
      const updated = { ...activity, isStarred: false };
      await db.saveActivity(updated);
    } else {
      // Unstar all other activities first
      const updatedActivities = activities.map(a =>
        a.id === activity.id
          ? { ...a, isStarred: true }
          : { ...a, isStarred: false }
      );

      // Save all updated activities
      for (const act of updatedActivities) {
        await db.saveActivity(act);
      }
    }
    refreshData();
  };

  const handlePolish = async () => {
    if (!editingActivity) return;
    setAiLoading(true);
    const polished = await polishDescription(editingActivity.description, profile?.targetMajor || 'General');
    setEditingActivity({ ...editingActivity, description: polished });
    setAiLoading(false);
  };

  const handleAnalyzeImpact = async () => {
    if (!editingActivity) return;

    // Check if core content hasn't changed
    const contentHash = `${editingActivity.position}|${editingActivity.organization}`;
    const storedHash = editingActivity.contentHash || '';
    const storedDescLength = editingActivity.descriptionLength || 0;
    const currentDescLength = editingActivity.description?.length || 0;

    // Calculate description change percentage
    const descLengthChange = storedDescLength > 0
      ? Math.abs(currentDescLength - storedDescLength) / storedDescLength
      : 1;

    // If core (position/org) is same AND description hasn't changed significantly (less than 30%)
    // AND analysis is already visible (expanded), use cached result seamlessly
    if (editingActivity.tier && storedHash === contentHash && descLengthChange < 0.3 && impactAnalysis && analysisExpanded) {
      // Show loading animation for natural UX (pretend to recalculate)
      setAiLoading(true);

      // Simulate AI processing time (500-800ms)
      await new Promise<void>(resolve => setTimeout(() => resolve(), 500 + Math.random() * 300));

      // Display the same analysis (no actual AI call, no changes)
      setAnalysisExpanded(true);
      setAiLoading(false);
      return;
    }

    // If analysis section is NOT visible/expanded, allow recalculation even without major changes
    // This handles the case where user closed it and wants to see it again
    if (editingActivity.tier && storedHash === contentHash && descLengthChange < 0.3 && (!impactAnalysis || !analysisExpanded)) {
      // Use cached score/rank but generate fresh feedback text
      setAiLoading(true);

      // Simulate loading
      await new Promise<void>(resolve => setTimeout(() => resolve(), 500 + Math.random() * 300));

      // Convert tier back to score to maintain consistency
      const cachedScore = 11 - (editingActivity.tier || 5);

      // Generate rank name based on cached score
      const getRankName = (score: number): string => {
        if (score >= 10) return 'Diamond I';
        if (score >= 9) return 'Platinum I';
        if (score >= 8) return 'Gold II';
        if (score >= 7) return 'Gold I';
        if (score >= 6) return 'Silver III';
        if (score >= 5) return 'Silver II';
        if (score >= 4) return 'Silver I';
        if (score >= 3) return 'Bronze II';
        if (score >= 2) return 'Bronze I';
        return 'Iron';
      };

      // Show cached result with consistent score/rank
      setImpactAnalysis({
        score: cachedScore,
        rank_name: getRankName(cachedScore),
        rank_description: `Your activity maintains a Tier ${editingActivity.tier} ranking based on impact, leadership, and competitiveness.`,
        brutal_feedback: `Your current tier (${editingActivity.tier}) reflects the strength of this activity. To improve your ranking, consider making more substantial changes to your role, achievements, or description.`,
        level_up_action: `To reach the next tier, expand the scope of your role or achieve measurable competitive results that demonstrate greater impact.`
      });

      setAnalysisExpanded(true);
      setAiLoading(false);
      return;
    }

    // Significant change detected or first analysis - run AI
    setAiLoading(true);
    const analysis = await analyzeActivityImpact(editingActivity, profile?.targetMajor);
    console.log('[Activity Impact] Analysis result:', JSON.stringify(analysis, null, 2));
    setImpactAnalysis(analysis);
    setAnalysisExpanded(true); // Auto-expand when new analysis comes in
    // Convert score (1-10) to tier: tier 1 = 10/10, tier 10 = 1/10
    // Formula: tier = 11 - score
    const tier = 11 - analysis.score;

    // CRITICAL: Update the activity with the NEW baseline immediately
    // This ensures future comparisons use this version as the reference point
    const updatedActivity = {
      ...editingActivity,
      tier,
      contentHash, // NEW baseline: current position|organization
      descriptionLength: currentDescLength // NEW baseline: current description length
    };

    setEditingActivity(updatedActivity);
    setAiLoading(false);
  };

  const handleGenerateResume = async () => {
    if (!hasAdvancedAI) {
      Alert.alert(
        'Feature Unavailable',
        'Resume generation requires iPhone 15 Pro or newer with Apple Intelligence support.',
        [{ text: 'OK' }]
      );
      return;
    }
    if (!profile) return;
    setAiLoading(true);
    const data = await generateResume(profile, activities, projects);
    setResumeData(data);
    setView('resume');
    setAiLoading(false);
  };

  const handleGenerateBragSheet = async () => {
    if (!hasAdvancedAI) {
      Alert.alert(
        'Feature Unavailable',
        'Brag Sheet generation requires iPhone 15 Pro or newer with Apple Intelligence support.',
        [{ text: 'OK' }]
      );
      return;
    }
    if (!profile) return;
    setAiLoading(true);
    const data = await generateBragSheet(profile, activities);
    setBragSheetData(data);
    setView('brag-sheet');
    setAiLoading(false);
  };

  const handleDownloadResume = async () => {
    if (!resumeData || !profile) return;

    try {
      const pdfPath = await generateResumePDF(resumeData, profile);

      await Share.share({
        url: `file://${pdfPath}`,
        title: `${profile.name} - Resume`
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF resume');
    }
  };

  const handleDownloadBragSheet = async () => {
    if (!bragSheetData || !profile) return;

    try {
      const pdfPath = await generateBragSheetPDF(bragSheetData, profile);

      await Share.share({
        url: `file://${pdfPath}`,
        title: `${profile.name} - Brag Sheet`
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('Error', 'Failed to generate PDF brag sheet');
    }
  };

  const handleAnalyzeCollege = async (college: College) => {
    if (!profile) return;
    setAiAnalysisLoading(college.id);
    const analysis = await analyzeCollegeChances(profile, activities, projects, college.name);
    const updated = { ...college, analysis };
    await db.saveCollege(updated);
    refreshData();
    setAiAnalysisLoading(null);
  };

  // 4. MAIN RENDER
  return (
    <SafeAreaProvider>
      <View style={s.root}>
        {/* Only show TopBar on main screens */}
        {['dashboard', 'colleges', 'interview', 'export', 'profile'].includes(view) && (
          <TopBar setView={setView} profile={profile} />
        )}

        {view === 'interview' ? (
          <InterviewSection profile={profile} activities={activities} onActiveChange={setIsInterviewActive} onBack={() => setView('dashboard')} />
        ) : (
          <>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={s.scrollContent}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
            >
              {/* --- VIEW: DASHBOARD --- */}
              {view === 'dashboard' && (
                <View style={s.container}>
                  {profile?.narrativeAnalysis ? (
                    <View style={s.brandCard}>
                      <View style={s.brandHeader}>
                        <Lightbulb color="#818cf8" size={24} />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                          <Text style={s.brandTitle}>Your Personal Brand</Text>
                          <Text style={s.brandSub}>Application Theme & Strategy</Text>
                        </View>
                        <TouchableOpacity onPress={handleAnalyzeStrategy} disabled={aiLoading} style={s.refreshBtn}>
                          {aiLoading ? <ActivityIndicator color="#fff" size="small" /> : <RotateCcw size={14} color="#fff" />}
                        </TouchableOpacity>
                      </View>
                      <Text style={s.brandSummary}>{profile.narrativeAnalysis.analysis_summary}</Text>
                      <View style={s.archContainer}>
                        {profile.narrativeAnalysis.narratives.map((nar: any, i: number) => (
                          <View key={i} style={s.archItem}>
                            <Text style={s.archName}>{nar.archetype_name}</Text>
                            <Text style={s.archTag}>"{nar.tagline}"</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : (
                    <View style={s.heroCard}>
                      <Sparkles color="#60a5fa" size={32} />
                      <Text style={s.heroTitle}>Discover Your Archetype</Text>
                      <Text style={s.heroSub}>Let AI analyze your story.</Text>
                      <TouchableOpacity style={s.heroBtn} onPress={handleAnalyzeStrategy} disabled={aiLoading}>
                        <Text style={s.heroBtnTxt}>{aiLoading ? "Analyzing..." : "Find My Personal Brand"}</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  <View style={s.sectionHead}>
                    <Text style={s.sectionTitle}>Activities</Text>
                    <TouchableOpacity
                      style={s.addBtn}
                      onPress={() => {
                        setEditingActivity({ id: Date.now().toString(), position: '', organization: '', description: '', type: ActivityType.OTHER, gradeLevels: [], hoursPerWeek: 0, weeksPerYear: 0, isTimingSchoolYear: false, isTimingBreak: false, isTimingAllYear: false, includeInResume: true });
                        navigateToView('editor');
                        setImpactAnalysis(null);
                      }}
                    >
                      <Plus color="#000" size={16} />
                      <Text style={s.addBtnTxt}>Add Activity</Text>
                    </TouchableOpacity>
                  </View>


                  {/* Sorted Activities with See All */}
                  {(() => {
                    const sortedActivities = [...activities].sort((a, b) => {
                      const aDate = a.endDate || (a.gradeLevels.length > 0 ? `${profile?.graduationYear! - (12 - Math.max(...a.gradeLevels))}` : '0');
                      const bDate = b.endDate || (b.gradeLevels.length > 0 ? `${profile?.graduationYear! - (12 - Math.max(...b.gradeLevels))}` : '0');
                      return bDate.localeCompare(aDate);
                    });
                    const displayActivities = showAllActivities ? sortedActivities : sortedActivities.slice(0, 2);
                    return (
                      <>
                        {displayActivities.map(act => (
                          <ActivityCard
                            key={act.id}
                            activity={act}
                            onEdit={(a: any) => {
                              setEditingActivity(a);
                              navigateToView('editor');
                              // Load saved analysis if it exists
                              setImpactAnalysis(a.impactAnalysis || null);
                              setAnalysisExpanded(true);
                            }}
                            onStar={handleStarActivity}
                          />
                        ))}
                        {activities.length === 0 && <Text style={s.emptyTxt}>No activities added yet.</Text>}
                        {activities.length > 2 && !showAllActivities && (
                          <TouchableOpacity style={s.seeAllBtn} onPress={() => setShowAllActivities(true)}>
                            <Text style={s.seeAllTxt}>See All ({activities.length} total)</Text>
                          </TouchableOpacity>
                        )}
                        {showAllActivities && activities.length > 2 && (
                          <TouchableOpacity style={s.seeAllBtn} onPress={() => setShowAllActivities(false)}>
                            <Text style={s.seeAllTxt}>Show Less</Text>
                          </TouchableOpacity>
                        )}
                      </>
                    );
                  })()}

                  {/* Projects Section */}
                  <View style={[s.sectionHead, { marginTop: 30 }]}>
                    <Text style={s.sectionTitle}>Projects</Text>
                    <TouchableOpacity style={s.addBtn} onPress={handleNewProject}>
                      <Plus color="#000" size={16} />
                      <Text style={s.addBtnTxt}>Add Project</Text>
                    </TouchableOpacity>
                  </View>

                  {(() => {
                    const sortedProjects = [...projects].sort((a, b) => {
                      const aDate = a.endDate || a.startDate || '0';
                      const bDate = b.endDate || b.startDate || '0';
                      return bDate.localeCompare(aDate);
                    });
                    const displayProjects = showAllProjects ? sortedProjects : sortedProjects.slice(0, 2);
                    return (
                      <>
                        {displayProjects.map(proj => (
                          <TouchableOpacity key={proj.id} style={s.card} onPress={() => { setEditingProject(proj); navigateToView('project-editor'); }}>
                            <View style={s.cardHeader}>
                              <Text style={s.cardTitle}>{proj.title || 'Untitled Project'}</Text>
                              <TouchableOpacity onPress={() => handleDeleteProject(proj.id)}>
                                <Trash2 size={18} color="#71717a" />
                              </TouchableOpacity>
                            </View>
                            {proj.skills && <Text style={s.cardTech}>{proj.skills}</Text>}
                            <Text style={s.projectCardDesc} numberOfLines={2}>{proj.description}</Text>
                            {proj.portfolio && <Text style={s.cardLink}>{proj.portfolio}</Text>}
                          </TouchableOpacity>
                        ))}
                        {projects.length === 0 && <Text style={s.emptyTxt}>No projects added yet.</Text>}
                        {projects.length > 2 && !showAllProjects && (
                          <TouchableOpacity style={s.seeAllBtn} onPress={() => setShowAllProjects(true)}>
                            <Text style={s.seeAllTxt}>See All ({projects.length} total)</Text>
                          </TouchableOpacity>
                        )}
                        {showAllProjects && projects.length > 2 && (
                          <TouchableOpacity style={s.seeAllBtn} onPress={() => setShowAllProjects(false)}>
                            <Text style={s.seeAllTxt}>Show Less</Text>
                          </TouchableOpacity>
                        )}
                      </>
                    );
                  })()}
                </View>
              )}

              {/* --- VIEW: EDITOR --- */}
              {view === 'editor' && editingActivity && (
                <View style={[s.container, { marginTop: 80 }]}>
                  <TouchableOpacity onPress={() => setView('dashboard')} style={s.backBtn}>
                    <ArrowLeft color="#a1a1aa" size={20} /><Text style={s.backTxt}>Back</Text>
                  </TouchableOpacity>

                  <Text style={s.sectionTitle}>Core Details</Text>
                  <Text style={s.label}>Role / Position</Text>
                  <TextInput style={s.input} value={editingActivity.position} onChangeText={t => setEditingActivity({ ...editingActivity, position: t })} placeholder="Founder, Captain..." placeholderTextColor="#52525b" />

                  <Text style={s.label}>Organization</Text>
                  <TextInput style={s.input} value={editingActivity.organization} onChangeText={t => setEditingActivity({ ...editingActivity, organization: t })} placeholder="Club Name..." placeholderTextColor="#52525b" />

                  <Text style={s.sectionTitle}>Time & Scope</Text>
                  <Text style={s.label}>Grade Levels</Text>
                  <View style={s.rowGap}>
                    {[9, 10, 11, 12].map(g => (
                      <TouchableOpacity key={g} onPress={() => {
                        const levels = editingActivity.gradeLevels.includes(g) ? editingActivity.gradeLevels.filter(l => l !== g) : [...editingActivity.gradeLevels, g].sort();
                        setEditingActivity({ ...editingActivity, gradeLevels: levels });
                      }} style={[s.gradeBtn, editingActivity.gradeLevels.includes(g) && s.gradeBtnActive]}>
                        <Text style={[s.gradeBtnTxt, editingActivity.gradeLevels.includes(g) && s.gradeBtnTxtActive]}>{g}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={[s.rowGap, { marginTop: 20 }]}>
                    <View style={{ flex: 1 }}>
                      <Text style={s.label}>Hours/Week</Text>
                      <TextInput style={s.input} keyboardType="numeric" value={String(editingActivity.hoursPerWeek || '')} onChangeText={t => setEditingActivity({ ...editingActivity, hoursPerWeek: parseInt(t) || 0 })} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.label}>Weeks/Year</Text>
                      <TextInput style={s.input} keyboardType="numeric" value={String(editingActivity.weeksPerYear || '')} onChangeText={t => setEditingActivity({ ...editingActivity, weeksPerYear: parseInt(t) || 0 })} />
                    </View>
                  </View>

                  <Text style={s.label}>Activity Dates (Optional)</Text>
                  <View style={s.rowGap}>
                    <View style={{ flex: 1 }}>
                      <Text style={[s.label, { fontSize: 10 }]}>Start Date</Text>
                      <TextInput
                        style={s.input}
                        value={editingActivity.startDate || ''}
                        onChangeText={t => setEditingActivity({ ...editingActivity, startDate: t })}
                        placeholder="e.g., September 2021"
                        placeholderTextColor="#52525b"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={[s.label, { fontSize: 10 }]}>End Date</Text>
                      <TextInput
                        style={s.input}
                        value={editingActivity.endDate || ''}
                        onChangeText={t => setEditingActivity({ ...editingActivity, endDate: t })}
                        placeholder="e.g., June 2024"
                        placeholderTextColor="#52525b"
                      />
                    </View>
                  </View>

                  <Text style={s.sectionTitle}>Narrative</Text>
                  <Text style={s.label}>Description ({editingActivity.description.split(' ').length}/150 words)</Text>
                  <View>
                    <TextInput style={[s.input, s.textArea]} multiline value={editingActivity.description} onChangeText={t => setEditingActivity({ ...editingActivity, description: t })} />
                  </View>

                  <View style={s.rowGap}>
                    <TouchableOpacity style={s.actionBtn} onPress={handleAnalyzeImpact} disabled={aiLoading}>
                      {aiLoading ? (
                        <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
                      ) : (
                        <Gavel size={18} color="#fff" />
                      )}
                      <Text style={s.actionBtnTxt}>{aiLoading ? "Judging..." : "Judge Impact"}</Text>
                    </TouchableOpacity>
                  </View>

                  {impactAnalysis && (
                    <View style={s.analysisCard}>
                      <TouchableOpacity
                        style={s.analysisHeader}
                        onPress={() => setAnalysisExpanded(!analysisExpanded)}
                      >
                        <View style={s.rowGap}>
                          <View>
                            <Text style={s.label}>Score</Text>
                            <Text style={s.scoreTxt}>{impactAnalysis.score}/10</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Text style={s.scoreRank}>{impactAnalysis.rank_name}</Text>
                            <Text style={s.scoreLabel}>{impactAnalysis.rank_description}</Text>
                          </View>
                        </View>
                        <View style={s.minimizeBtn}>
                          {analysisExpanded ? (
                            <ChevronRight size={20} color="#a1a1aa" style={{ transform: [{ rotate: '90deg' }] }} />
                          ) : (
                            <ChevronRight size={20} color="#a1a1aa" />
                          )}
                        </View>
                      </TouchableOpacity>
                      {analysisExpanded && (
                        <>
                          <View style={[s.feedbackBox, { borderColor: '#f87171', backgroundColor: 'rgba(248,113,113,0.1)' }]}>
                            <Text style={[s.feedbackTitle, { color: '#f87171' }]}>Feedback</Text>
                            <Text style={s.feedbackTxt}>{impactAnalysis.brutal_feedback}</Text>
                          </View>
                          <View style={[s.feedbackBox, { borderColor: '#60a5fa', backgroundColor: 'rgba(96,165,250,0.1)' }]}>
                            <Text style={[s.feedbackTitle, { color: '#60a5fa' }]}>Level Up</Text>
                            <Text style={s.feedbackTxt}>{impactAnalysis.level_up_action}</Text>
                          </View>
                        </>
                      )}
                    </View>
                  )}

                  {/* NEW: Major Related Toggle */}
                  <TouchableOpacity
                    style={[s.checkboxRow, { marginTop: 20, marginBottom: 5 }]}
                    onPress={() => setEditingActivity({ ...editingActivity, isMajorRelated: !editingActivity.isMajorRelated })}
                  >
                    <View style={[s.checkbox, editingActivity.isMajorRelated && s.checkboxChecked]}>
                      {editingActivity.isMajorRelated && <Text style={s.checkmark}>✓</Text>}
                    </View>
                    <Text style={s.checkboxLabel}>Related to Major ({profile?.targetMajor?.trim() || 'Target Major'})</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[s.checkboxRow, { marginTop: 20, marginBottom: 10 }]}
                    onPress={() => setEditingActivity({ ...editingActivity, includeInResume: !editingActivity.includeInResume })}
                  >
                    <View style={[s.checkbox, (editingActivity.includeInResume !== false) && s.checkboxChecked]}>
                      {(editingActivity.includeInResume !== false) && <Text style={s.checkmark}>✓</Text>}
                    </View>
                    <Text style={s.checkboxLabel}>Include in Resume</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={s.saveBtn} onPress={handleSaveActivity}>
                    <Text style={s.saveBtnTxt}>Save Changes</Text>
                  </TouchableOpacity>

                  {editingActivity.id && (
                    <TouchableOpacity style={s.deleteBtn} onPress={() => handleDeleteActivity(editingActivity.id)}>
                      <Trash2 color="#f87171" size={18} /><Text style={s.deleteBtnTxt}>Delete Activity</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}


              {/* --- VIEW: PROJECT EDITOR --- */}
              {view === 'project-editor' && editingProject && (
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                  <View style={[s.container, { marginTop: 80 }]}>
                    <TouchableOpacity onPress={() => setView('dashboard')} style={s.backBtn}>
                      <ArrowLeft color="#a1a1aa" size={20} /><Text style={s.backTxt}>Back</Text>
                    </TouchableOpacity>

                    <Text style={s.sectionTitle}>Project Details</Text>
                    <Text style={s.label}>Project Title</Text>
                    <TextInput style={s.input} value={editingProject.title} onChangeText={t => setEditingProject({ ...editingProject, title: t })} placeholder="My Awesome Project" placeholderTextColor="#52525b" />

                    <Text style={s.label}>Description</Text>
                    <View>
                      <TextInput style={[s.input, s.textArea]} multiline value={editingProject.description} onChangeText={t => setEditingProject({ ...editingProject, description: t })} placeholder="Describe what you built..." placeholderTextColor="#52525b" />
                    </View>

                    <Text style={s.label}>Skills/Methods Used (Optional)</Text>
                    <TextInput style={s.input} value={editingProject.skills || ''} onChangeText={t => setEditingProject({ ...editingProject, skills: t })} placeholder="e.g., Watercolor & Acrylic, Financial Modeling, Python & R" placeholderTextColor="#52525b" />

                    <Text style={s.label}>Dates (Optional)</Text>
                    <View style={s.rowGap}>
                      <View style={{ flex: 1 }}>
                        <Text style={[s.label, { fontSize: 10 }]}>Start</Text>
                        <TextInput style={s.input} value={editingProject.startDate || ''} onChangeText={t => setEditingProject({ ...editingProject, startDate: t })} placeholder="Jan 2024" placeholderTextColor="#52525b" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={[s.label, { fontSize: 10 }]}>End</Text>
                        <TextInput style={s.input} value={editingProject.endDate || ''} onChangeText={t => setEditingProject({ ...editingProject, endDate: t })} placeholder="Present" placeholderTextColor="#52525b" />
                      </View>
                    </View>

                    <Text style={s.label}>Portfolio/Reference Link (Optional)</Text>
                    <TextInput style={s.input} value={editingProject.portfolio || ''} onChangeText={t => setEditingProject({ ...editingProject, portfolio: t })} placeholder="Portfolio, publication, presentation, GitHub, etc." placeholderTextColor="#52525b" />

                    <TouchableOpacity
                      style={[s.checkboxRow, { marginTop: 20, marginBottom: 5 }]}
                      onPress={() => setEditingProject({ ...editingProject, isMajorRelated: !editingProject.isMajorRelated })}
                    >
                      <View style={[s.checkbox, editingProject.isMajorRelated && s.checkboxChecked]}>
                        {editingProject.isMajorRelated && <Text style={s.checkmark}>✓</Text>}
                      </View>
                      <Text style={s.checkboxLabel}>Related to Major ({profile?.targetMajor?.trim() || 'Target Major'})</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[s.checkboxRow, { marginTop: 20, marginBottom: 10 }]}
                      onPress={() => setEditingProject({ ...editingProject, includeInResume: !editingProject.includeInResume })}
                    >
                      <View style={[s.checkbox, (editingProject.includeInResume !== false) && s.checkboxChecked]}>
                        {(editingProject.includeInResume !== false) && <Text style={s.checkmark}>✓</Text>}
                      </View>
                      <Text style={s.checkboxLabel}>Include in Resume</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={s.saveBtn} onPress={handleSaveProject}>
                      <Save color="#000" size={18} />
                      <Text style={s.saveBtnTxt}>Save Project</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAvoidingView>
              )}

              {/* --- VIEW: COLLEGES --- */}
              {view === 'colleges' && (
                <View style={s.container}>
                  <View style={s.searchContainer}>
                    <Search color="#a1a1aa" size={20} style={s.searchIcon} />
                    <TextInput style={s.searchInput} placeholder="Search colleges..." placeholderTextColor="#52525b" value={collegeSearch} onChangeText={handleSearchCollege} />
                    {collegeSearch !== "" && <TouchableOpacity onPress={() => handleSearchCollege("")}><X color="#a1a1aa" size={20} /></TouchableOpacity>}
                  </View>
                  {collegeResults.length > 0 && (
                    <View style={s.dropdown}>
                      {collegeResults.map(name => (
                        <TouchableOpacity key={name} style={s.dropdownItem} onPress={() => handleSelectCollege(name)}>
                          <Text style={s.dropdownTxt}>{name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {/* --- NEW EMPTY STATE LOGIC --- */}
                  {colleges.length === 0 ? (
                    <View style={s.emptyCollegesContainer}>
                      <School size={80} color="#3f3f46" strokeWidth={1} style={{ opacity: 0.5 }} />
                      <Text style={s.emptyCollegesTitle}>Your College List is Empty</Text>
                      <Text style={s.emptyCollegesSub}>
                        Search for a university above to add it to your list and let AI calculate your admission chances.
                      </Text>
                    </View>
                  ) : (
                    // Existing list of cards
                    colleges.map(col => {
                      const info = COLLEGE_DATABASE[col.name];
                      return (
                        <View key={col.id} style={s.collegeCard}>
                          <View style={s.rowGap}>
                            <Text style={s.collegeName}>{col.name}</Text>
                            <TouchableOpacity onPress={() => db.deleteCollege(col.id).then(refreshData)}><Trash2 size={18} color="#52525b" /></TouchableOpacity>
                          </View>
                          {info && (
                            <View style={s.collegeStats}>
                              <Text style={s.statTxt}>{info.acceptanceRate} Acc</Text>
                              <Text style={s.statTxt}>•</Text>
                              <Text style={s.statTxt}>{info.avgSAT} SAT</Text>
                            </View>
                          )}

                          {col.analysis ? (
                            <View style={s.aiBox}>
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <View>
                                  <View style={s.rowGap}>
                                    <Text style={s.aiProb}>{col.analysis.category}: {col.analysis.probability}</Text>
                                  </View>

                                  {/* Strengths Section */}
                                  {col.analysis.strengths && col.analysis.strengths.length > 0 && (
                                    <View style={{ marginTop: 12 }}>
                                      <Text style={[s.feedbackTitle, { color: '#34d399', fontSize: 12, marginBottom: 6 }]}>✓ Strengths</Text>
                                      {col.analysis.strengths.map((strength, idx) => (
                                        <Text key={idx} style={[s.aiReason, { fontSize: 11, marginBottom: 4, color: '#a1a1aa' }]}>
                                          • {strength}
                                        </Text>
                                      ))}
                                    </View>
                                  )}

                                  {/* Weaknesses Section */}
                                  {col.analysis.weaknesses && col.analysis.weaknesses.length > 0 && (
                                    <View style={{ marginTop: 10 }}>
                                      <Text style={[s.feedbackTitle, { color: '#fbbf24', fontSize: 12, marginBottom: 6 }]}>⚠ Areas to Address</Text>
                                      {col.analysis.weaknesses.map((weakness, idx) => (
                                        <Text key={idx} style={[s.aiReason, { fontSize: 11, marginBottom: 4, color: '#a1a1aa' }]}>
                                          • {weakness}
                                        </Text>
                                      ))}
                                    </View>
                                  )}

                                  <Text style={[s.aiReason, { marginTop: 12 }]}>{col.analysis.reasoning}</Text>

                                  {/* Tips Section */}
                                  {col.analysis.tips && col.analysis.tips.length > 0 && (
                                    <View style={{ marginTop: 12 }}>
                                      <Text style={[s.feedbackTitle, { color: '#60a5fa', fontSize: 12, marginBottom: 6 }]}>💡 Improvement Tips</Text>
                                      {col.analysis.tips.map((tip, idx) => (
                                        <Text key={idx} style={[s.aiReason, { fontSize: 11, marginBottom: 4, color: '#a1a1aa' }]}>
                                          {idx + 1}. {tip}
                                        </Text>
                                      ))}
                                    </View>
                                  )}
                                </View>
                                <TouchableOpacity onPress={() => handleAnalyzeCollege(col)} style={{ padding: 5 }}>
                                  <ActivityIndicator size="small" color="#52525b" animating={aiAnalysisLoading === col.id} style={aiAnalysisLoading !== col.id && { display: 'none' }} />
                                  {aiAnalysisLoading !== col.id && <Trash2 size={16} color="#52525b" style={{ display: 'none' }} />}
                                  {/* Using a text button for Recalculate to be safe on icons, or reuse an existing icon if I knew it. 
                                  Actually, I'll just put a small text button below. 
                              */}
                                </TouchableOpacity>
                              </View>

                              <TouchableOpacity
                                style={s.recalcBtn}
                                onPress={() => handleAnalyzeCollege(col)}
                                disabled={aiAnalysisLoading === col.id}
                              >
                                {aiAnalysisLoading === col.id ? (
                                  <ActivityIndicator color="#a1a1aa" size="small" />
                                ) : (
                                  <Text style={s.recalcBtnTxt}>Recalculate Chances</Text>
                                )}
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <TouchableOpacity style={s.analyzeBtn} onPress={() => handleAnalyzeCollege(col)} disabled={aiAnalysisLoading === col.id}>
                              {aiAnalysisLoading === col.id ? <ActivityIndicator color="#fff" /> : <Text style={s.analyzeBtnTxt}>Analyze Chances</Text>}
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    })
                  )}
                </View>
              )}

              {/* InterviewSection moved to top level */}

              {/* --- VIEW: EXPORT --- */}
              {view === 'export' && (
                <View style={s.container}>
                  <Text style={s.sectionTitle}>Export Documents</Text>
                  {aiLoading && <Text style={s.loadingTxt}>Generating with AI...</Text>}

                  <TouchableOpacity style={s.exportCard} onPress={handleGenerateBragSheet} disabled={aiLoading}>
                    <Printer size={32} color="#fff" />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text style={s.exportTitle}>Teacher Brag Sheet</Text>
                      <Text style={s.exportSub}>AI-written narrative for recommendation letters.</Text>
                    </View>
                    <ArrowRight color="#52525b" />
                  </TouchableOpacity>

                  <TouchableOpacity style={s.exportCard} onPress={handleGenerateResume} disabled={aiLoading}>
                    <FileText size={32} color="#fff" />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text style={s.exportTitle}>Professional Resume</Text>
                      <Text style={s.exportSub}>Polished one-page resume.</Text>
                    </View>
                    <ArrowRight color="#52525b" />
                  </TouchableOpacity>
                </View>
              )}

              {/* --- PREVIEW: RESUME --- */}
              {view === 'resume' && resumeData && (
                <View style={s.printPage}>
                  <Text style={s.printName}>{profile?.name}</Text>
                  <Text style={s.printContact}>{profile?.email} | {profile?.graduatingClass || `Class of ${profile?.graduationYear}`}</Text>

                  <Text style={s.printHeader}>EXPERIENCE</Text>
                  {resumeData.experience.map((exp: any, i: number) => (
                    <View key={i} style={s.printItem}>
                      <View style={s.printItemHeader}>
                        <Text style={[s.printBold, { flex: 1, flexShrink: 1 }]}>{exp.role}</Text>
                        <Text style={s.printDate}>{exp.dates}</Text>
                      </View>
                      <Text style={s.printItalic}>{exp.organization}</Text>
                      <View style={s.printBulletList}>
                        {exp.bullets.map((b: string, j: number) => (
                          <View key={j} style={s.printBulletItem}>
                            <Text style={s.printBulletDot}>•</Text>
                            <TextInput
                              style={s.printBulletText}
                              value={b}
                              onChangeText={(text) => {
                                if (text.trim() === '' && b.trim() !== '') {
                                  Alert.alert('Delete Line', 'Do you want to delete this bullet point?', [
                                    { text: 'Cancel', style: 'cancel' },
                                    {
                                      text: 'OK', onPress: () => {
                                        const updated = { ...resumeData };
                                        updated.experience[i].bullets.splice(j, 1);
                                        setResumeData(updated);
                                      }
                                    }
                                  ]);
                                } else {
                                  const updated = { ...resumeData };
                                  updated.experience[i].bullets[j] = text;
                                  setResumeData(updated);
                                }
                              }}
                              multiline
                            />
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}

                  {/* Projects Section */}
                  {resumeData.projects && resumeData.projects.length > 0 && (
                    <>
                      <Text style={s.printHeader}>PROJECTS</Text>
                      {resumeData.projects.map((proj: any, i: number) => (
                        <View key={i} style={s.printItem}>
                          <View style={s.printItemHeader}>
                            <Text style={[s.printBold, { flex: 1, flexShrink: 1 }]}>{proj.title}</Text>
                            <Text style={s.printDate}>{proj.dates}</Text>
                          </View>
                          {proj.skills && <Text style={s.printSkills}>{proj.skills}</Text>}
                          {proj.bullets && proj.bullets.length > 0 && (
                            <View style={s.printBulletList}>
                              {proj.bullets.map((b: string, j: number) => (
                                <View key={j} style={s.printBulletItem}>
                                  <Text style={s.printBulletDot}>•</Text>
                                  <TextInput
                                    style={s.printBulletText}
                                    value={b}
                                    onChangeText={(text) => {
                                      if (text.trim() === '' && b.trim() !== '') {
                                        Alert.alert('Delete Line', 'Do you want to delete this bullet point?', [
                                          { text: 'Cancel', style: 'cancel' },
                                          {
                                            text: 'OK', onPress: () => {
                                              const updated = { ...resumeData };
                                              updated.projects![i].bullets.splice(j, 1);
                                              setResumeData(updated);
                                            }
                                          }
                                        ]);
                                      } else {
                                        const updated = { ...resumeData };
                                        updated.projects![i].bullets[j] = text;
                                        setResumeData(updated);
                                      }
                                    }}
                                    multiline
                                  />
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      ))}
                    </>
                  )}

                  {/* Skills Section */}
                  {resumeData.skills && resumeData.skills.length > 0 && (
                    <>
                      <Text style={s.printHeader}>SKILLS</Text>
                      <Text style={s.printBody}>{resumeData.skills.join(', ')}</Text>
                    </>
                  )}

                  {/* Awards Section */}
                  {resumeData.awards && resumeData.awards.length > 0 && (
                    <>
                      <Text style={s.printHeader}>AWARDS & HONORS</Text>
                      <View style={s.printBulletList}>
                        {resumeData.awards.map((award: string, i: number) => (
                          <View key={i} style={s.printBulletItem}>
                            <Text style={s.printBulletDot}>•</Text>
                            <Text style={s.printBulletText}>{award}</Text>
                          </View>
                        ))}
                      </View>
                    </>
                  )}

                  <TouchableOpacity style={[s.saveBtn, { marginTop: 20 }]} onPress={handleDownloadResume}>
                    <Download color="#000" size={18} style={{ marginRight: 8 }} />
                    <Text style={s.saveBtnTxt}>Download Resume</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={s.closePreviewBtn} onPress={() => setView('export')}><Text style={s.closePreviewTxt}>Close Preview</Text></TouchableOpacity>
                </View>
              )}

              {/* --- PREVIEW: BRAG SHEET --- */}
              {view === 'brag-sheet' && bragSheetData && (
                <View style={s.printPage}>
                  <Text style={s.printName}>{profile?.name}</Text>
                  <Text style={s.printContact}>Target Major: {profile?.targetMajor}</Text>

                  <View style={s.printBox}>
                    <Text style={s.printHeader}>About Me</Text>
                    <TextInput
                      style={[s.printBody, { borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }]}
                      value={bragSheetData.introaryStatement}
                      onChangeText={(text) => setBragSheetData({ ...bragSheetData, introaryStatement: text })}
                      multiline
                    />
                  </View>

                  <Text style={s.printHeader}>Key Experiences</Text>
                  {bragSheetData.keyExperiences.map((exp: any, i: number) => (
                    <View key={i} style={{ marginBottom: 15 }}>
                      <TextInput
                        style={[s.printBold, { borderBottomWidth: 1, borderBottomColor: '#e5e5e5' }]}
                        value={exp.title}
                        onChangeText={(text) => {
                          const updated = { ...bragSheetData };
                          updated.keyExperiences[i].title = text;
                          setBragSheetData(updated);
                        }}
                      />
                      <TextInput
                        style={[s.printBody, { borderBottomWidth: 1, borderBottomColor: '#e5e5e5', marginTop: 4 }]}
                        value={exp.narrative}
                        onChangeText={(text) => {
                          const updated = { ...bragSheetData };
                          updated.keyExperiences[i].narrative = text;
                          setBragSheetData(updated);
                        }}
                        multiline
                      />
                    </View>
                  ))}

                  <TouchableOpacity style={[s.saveBtn, { marginTop: 20 }]} onPress={handleDownloadBragSheet}>
                    <Download color="#000" size={18} style={{ marginRight: 8 }} />
                    <Text style={s.saveBtnTxt}>Download Brag Sheet</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={s.closePreviewBtn} onPress={() => setView('export')}><Text style={s.closePreviewTxt}>Close Preview</Text></TouchableOpacity>
                </View>
              )}

              {/* --- VIEW: PROFILE EDITOR --- */}
              {view === 'profile' && profile && (
                <View style={s.container}>
                  <TouchableOpacity onPress={() => setView('dashboard')} style={s.backBtn}>
                    <ArrowLeft color="#a1a1aa" size={20} /><Text style={s.backTxt}>Back</Text>
                  </TouchableOpacity>
                  <Text style={s.sectionTitle}>Edit Profile</Text>

                  <Text style={s.label}>Name</Text>
                  <TextInput style={s.input} value={profile.name} onChangeText={t => setProfile({ ...profile, name: t })} />

                  <Text style={s.label}>Email Address</Text>
                  <TextInput
                    style={s.input}
                    value={profile.email}
                    onChangeText={t => setProfile({ ...profile, email: t })}
                    placeholder="student@example.com"
                    placeholderTextColor="#52525b"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  <Text style={s.label}>Graduating Class</Text>
                  <TextInput
                    style={s.input}
                    value={profile.graduatingClass}
                    onChangeText={t => setProfile({ ...profile, graduatingClass: t })}
                    placeholder="e.g., Class of 2026"
                    placeholderTextColor="#52525b"
                  />
                  <Text style={s.label}>Target Major</Text>
                  <TextInput style={s.input} value={profile.targetMajor} onChangeText={t => setProfile({ ...profile, targetMajor: t })} />
                  <Text style={s.label}>GPA (on a 4-point scale)</Text>
                  <TextInput style={s.input} value={profile.gpa} onChangeText={t => setProfile({ ...profile, gpa: t })} />
                  <Text style={s.label}>SAT</Text>
                  <TextInput style={s.input} value={profile.satScore} onChangeText={t => setProfile({ ...profile, satScore: t })} />

                  <Text style={s.sectionTitle}>Course Rigor</Text>
                  <View style={s.rowGap}>
                    <View style={{ flex: 1 }}>
                      <Text style={s.label}>AP Classes</Text>
                      <TextInput style={s.input} keyboardType="numeric" value={profile.apCount} onChangeText={t => setProfile({ ...profile, apCount: t })} placeholder="0" placeholderTextColor="#52525b" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.label}>IB Classes</Text>
                      <TextInput style={s.input} keyboardType="numeric" value={profile.ibCount} onChangeText={t => setProfile({ ...profile, ibCount: t })} placeholder="0" placeholderTextColor="#52525b" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={s.label}>Honors</Text>
                      <TextInput style={s.input} keyboardType="numeric" value={profile.honorsCount} onChangeText={t => setProfile({ ...profile, honorsCount: t })} placeholder="0" placeholderTextColor="#52525b" />
                    </View>
                  </View>

                  <Text style={[s.label, { marginTop: 20 }]}>School Course Offerings</Text>
                  <Text style={{ color: '#71717a', fontSize: 12, marginBottom: 10 }}>Check which course types your school offers</Text>

                  <TouchableOpacity
                    style={s.checkboxRow}
                    onPress={() => setProfile({ ...profile, offersHonors: !profile.offersHonors })}
                  >
                    <View style={[s.checkbox, profile.offersHonors && s.checkboxChecked]}>
                      {profile.offersHonors && <Text style={s.checkmark}>✓</Text>}
                    </View>
                    <Text style={s.checkboxLabel}>School offers Honors classes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={s.checkboxRow}
                    onPress={() => setProfile({ ...profile, offersAP: !profile.offersAP })}
                  >
                    <View style={[s.checkbox, profile.offersAP && s.checkboxChecked]}>
                      {profile.offersAP && <Text style={s.checkmark}>✓</Text>}
                    </View>
                    <Text style={s.checkboxLabel}>School offers AP classes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={s.checkboxRow}
                    onPress={() => setProfile({ ...profile, offersIB: !profile.offersIB })}
                  >
                    <View style={[s.checkbox, profile.offersIB && s.checkboxChecked]}>
                      {profile.offersIB && <Text style={s.checkmark}>✓</Text>}
                    </View>
                    <Text style={s.checkboxLabel}>School offers IB classes</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={s.saveBtn} onPress={() => { db.saveProfile(profile); setView('dashboard'); }}>
                    <Text style={s.saveBtnTxt}>Save Profile</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
            <BottomNav view={view} setView={setView} isInterviewActive={isInterviewActive} />
          </>
        )
        }
      </View >
    </SafeAreaProvider >
  );
}

// --- STYLES ---

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  scrollContent: { paddingBottom: 100 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#27272a', backgroundColor: '#000' },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: { width: 32, height: 32, backgroundColor: '#2563eb', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  logoP: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  logoText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  profileBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  profileBtnTxt: { color: '#a1a1aa', marginLeft: 6 },
  container: { padding: 20 },



  // --- NEW EMPTY STATE STYLES ---
  emptyCollegesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#27272a',
    borderStyle: 'dashed',
    borderRadius: 24,
    marginTop: 20,
    paddingVertical: 60,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(24,24,27,0.3)', // Subtle background fill
  },
  emptyCollegesTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign: 'center',
  },
  emptyCollegesSub: {
    color: '#71717a',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 20,
  },

  // Chat Styles
  chipItem: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#18181b', marginRight: 10, borderWidth: 1, borderColor: '#27272a' },
  chipText: { color: '#a1a1aa', fontWeight: 'bold' },
  styleCard: { width: 160, height: 110, padding: 15, borderRadius: 16, backgroundColor: '#18181b', marginRight: 10, borderWidth: 1, borderColor: '#27272a', justifyContent: 'center' },
  styleCardActive: { backgroundColor: '#1e1b4b', borderColor: '#60a5fa' },
  styleTitle: { color: '#fff', fontWeight: 'bold', fontSize: 13, marginBottom: 6 },
  styleVibe: { color: '#a1a1aa', fontSize: 11, fontStyle: 'italic' },

  intAvatarSmall: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  intAvatarTxtSmall: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  chatSub: { color: '#a1a1aa', fontSize: 11 },

  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  chatTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  endBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(248,113,113,0.1)', padding: 8, borderRadius: 12 },
  endBtnTxt: { color: '#f87171', fontSize: 12, fontWeight: 'bold' },
  chatContainer: { height: 400, marginBottom: 20 },
  bubble: { padding: 15, borderRadius: 16, marginBottom: 10, maxWidth: '85%' },
  aiBubble: { backgroundColor: '#27272a', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  userBubble: { backgroundColor: '#2563eb', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  bubbleText: { color: '#fff', fontSize: 15, lineHeight: 22 },
  typing: { color: '#52525b', fontSize: 12, marginLeft: 10, fontStyle: 'italic' },
  inputRow: { flexDirection: 'row', gap: 10 },
  chatInput: { flex: 1, backgroundColor: '#18181b', borderRadius: 25, paddingHorizontal: 20, color: '#fff', height: 50 },
  sendBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },

  // Dashboard
  heroCard: { backgroundColor: '#18181b', padding: 24, borderRadius: 24, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#27272a' },
  heroTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 12, textAlign: 'center' },
  heroSub: { color: '#a1a1aa', marginTop: 4, marginBottom: 16, textAlign: 'center' },
  heroBtn: { backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 20 },
  heroBtnTxt: { fontWeight: 'bold', color: '#000' },
  brandCard: { backgroundColor: '#1e1b4b', padding: 20, borderRadius: 24, marginBottom: 24, borderWidth: 1, borderColor: '#312e81' },
  brandHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  brandTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  brandSub: { color: '#818cf8', fontSize: 12 },
  refreshBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20 },
  brandSummary: { color: '#e0e7ff', fontSize: 14, lineHeight: 20, marginBottom: 15 },
  archContainer: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  archItem: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 10, borderRadius: 12, flex: 1, minWidth: 100 },
  archName: { color: '#818cf8', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  archTag: { color: '#fff', fontSize: 11, fontStyle: 'italic', marginTop: 2 },

  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginTop: 10, marginBottom: 10 },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24 },
  addBtnTxt: { color: '#000', fontWeight: 'bold' },
  emptyTxt: { color: '#52525b', textAlign: 'center', marginTop: 20 },

  // Card
  card: { backgroundColor: '#18181b', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#27272a' },
  exampleCard: { opacity: 0.6, borderStyle: 'dashed' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  cardBadgeRow: { flexDirection: 'row', gap: 8 },
  cardTypeBadge: { color: '#a1a1aa', fontSize: 10, fontWeight: 'bold', backgroundColor: '#27272a', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, overflow: 'hidden' },
  tierBadge: { borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  tierBadgeText: { fontSize: 10, fontWeight: 'bold' },
  dotRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  gradeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#27272a' },
  gradeDotActive: { backgroundColor: '#a1a1aa' },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  cardOrg: { color: '#a1a1aa', fontSize: 14, fontWeight: '500', marginBottom: 12 },
  cardDesc: { color: '#71717a', fontSize: 14, lineHeight: 20 },
  cardFooter: { flexDirection: 'row', gap: 16, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#27272a' },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footerText: { color: '#52525b', fontSize: 12 },

  // Editor
  label: { color: '#a1a1aa', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#09090b', borderWidth: 1, borderColor: '#27272a', borderRadius: 12, padding: 14, color: '#fff', fontSize: 16 },
  textArea: { height: 120, textAlignVertical: 'top' },
  rowGap: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  gradeBtn: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#27272a', justifyContent: 'center', alignItems: 'center' },
  gradeBtnActive: { backgroundColor: '#fff' },
  gradeBtnTxt: { color: '#52525b', fontWeight: 'bold' },
  gradeBtnTxtActive: { color: '#000' },
  aiIconBtn: { position: 'absolute', bottom: 10, right: 10, padding: 8, backgroundColor: 'rgba(37,99,235,0.1)', borderRadius: 8 },
  actionBtn: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, backgroundColor: '#2e1065', padding: 14, borderRadius: 12, marginTop: 20 },
  actionBtnTxt: { color: '#fff', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 30, flexDirection: 'row', justifyContent: 'center' },
  saveBtnTxt: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20 },
  deleteBtnTxt: { color: '#f87171', fontWeight: 'bold' },
  analysisCard: { marginTop: 20, padding: 20, backgroundColor: '#000', borderWidth: 1, borderColor: '#3f3f46', borderRadius: 16 },
  analysisHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' },
  minimizeBtn: { marginLeft: 10 },
  scoreTxt: { color: '#fff', fontSize: 32, fontWeight: '900' },
  scoreRank: { color: '#fff', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  scoreLabel: { color: '#71717a', fontSize: 10 },
  feedbackBox: { padding: 12, borderRadius: 10, borderWidth: 1, marginTop: 12 },
  feedbackTitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
  feedbackTxt: { color: '#e4e4e7', fontSize: 13, lineHeight: 18 },

  // Nav
  navContainer: { position: 'absolute', bottom: 30, left: 0, right: 0, alignItems: 'center' },
  navBar: { flexDirection: 'row', backgroundColor: 'rgba(24,24,27,0.95)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 40, gap: 32, borderWidth: 1, borderColor: '#27272a' },
  navTab: { alignItems: 'center', justifyContent: 'center' },
  navActiveDot: { width: 4, height: 4, backgroundColor: '#fff', borderRadius: 2, marginTop: 4 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  backTxt: { color: '#a1a1aa', fontWeight: '500' },

  // Colleges
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181b', borderRadius: 16, paddingHorizontal: 15, marginBottom: 10 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: '#fff', paddingVertical: 14, fontSize: 16 },
  dropdown: { backgroundColor: '#18181b', borderRadius: 12, maxHeight: 200, marginBottom: 20 },
  dropdownItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#27272a' },
  dropdownTxt: { color: '#e4e4e7' },
  collegeCard: { backgroundColor: 'rgba(24,24,27,0.5)', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#27272a' },
  collegeName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  collegeStats: { flexDirection: 'row', gap: 10, marginVertical: 10 },
  statTxt: { color: '#a1a1aa', fontSize: 12, fontFamily: 'monospace' },
  aiBox: { backgroundColor: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 12, marginTop: 10 },
  aiProb: { color: '#c084fc', fontWeight: 'bold', fontSize: 12, marginBottom: 4 },
  aiReason: { color: '#a1a1aa', fontSize: 12, lineHeight: 18 },
  analyzeBtn: { marginTop: 10, backgroundColor: 'rgba(37,99,235,0.2)', padding: 12, borderRadius: 10, alignItems: 'center' },
  analyzeBtnTxt: { color: '#60a5fa', fontWeight: 'bold', fontSize: 12 },
  recalcBtn: { backgroundColor: '#27272a', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, marginTop: 15, alignSelf: 'flex-start' },
  recalcBtnTxt: { color: '#fff', fontSize: 13, fontWeight: 'bold' },

  // Export
  exportCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181b', padding: 20, borderRadius: 16, marginBottom: 15, borderWidth: 1, borderColor: '#27272a' },
  disabledCard: { opacity: 0.5, backgroundColor: '#0f0f0f' },
  exportTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  disabledText: { color: '#71717a' },
  exportSub: { color: '#71717a', fontSize: 12, marginTop: 2 },
  disabledSubText: { color: '#52525b' },
  loadingTxt: { color: '#60a5fa', textAlign: 'center', marginBottom: 20 },

  // Print Preview (Matches PDF Output)
  printPage: { backgroundColor: '#fff', flex: 1, margin: 0, padding: 20, paddingTop: 20 },
  printName: { color: '#000', fontSize: 22, fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 5 },
  printContact: { color: '#666', textAlign: 'center', fontSize: 11, marginBottom: 20 },
  printSummary: { color: '#18181b', fontSize: 11, lineHeight: 18, marginBottom: 16 },
  printHeader: { color: '#000', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', borderBottomWidth: 2, borderBottomColor: '#000', marginBottom: 8, marginTop: 16, paddingBottom: 3, letterSpacing: 0.5 },
  printBody: { color: '#18181b', fontSize: 11, lineHeight: 18, marginBottom: 12 },
  printItem: { marginBottom: 12 },
  printItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
  printBold: { color: '#000', fontSize: 11, fontWeight: 'bold' },
  printDate: { color: '#666', fontSize: 10, flexShrink: 0, marginLeft: 8 },
  printItalic: { color: '#444', fontSize: 10, fontStyle: 'italic', marginBottom: 4 },
  printSkills: { color: '#444', fontSize: 10, marginBottom: 4 },
  printBulletList: { marginTop: 4, marginBottom: 4, paddingLeft: 0 },
  printBulletItem: { flexDirection: 'row', marginBottom: 3, alignItems: 'flex-start' },
  printBulletDot: { color: '#18181b', fontSize: 11, marginRight: 8, marginTop: 1, width: 10 },
  printBulletText: { color: '#18181b', fontSize: 10, lineHeight: 16, flex: 1, padding: 0, margin: 0 },
  printBox: { backgroundColor: '#f4f4f5', padding: 15, borderRadius: 8, marginBottom: 10 },
  closePreviewBtn: { backgroundColor: '#000', padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 30, marginBottom: 50 },
  closePreviewTxt: { color: '#fff', fontWeight: 'bold' },

  // See All Button Styles
  seeAllBtn: { backgroundColor: '#18181b', padding: 12, borderRadius: 8, alignItems: 'center', marginTop: 15, borderWidth: 1, borderColor: '#27272a' },
  seeAllTxt: { color: '#60a5fa', fontSize: 14, fontWeight: '500' },

  // Project Card Styles
  cardTech: { fontSize: 11, color: '#818cf8', marginTop: 4, fontWeight: '500' },
  cardLink: { fontSize: 10, color: '#60a5fa', marginTop: 6 },
  projectCardDesc: { fontSize: 13, color: '#a1a1aa', marginTop: 8, lineHeight: 18 },

  // Checkbox Styles
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#52525b', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  checkmark: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  checkboxLabel: { color: '#fff', fontSize: 14 },
});