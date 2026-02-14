import AsyncStorage from '@react-native-async-storage/async-storage';
import { Activity, Honor, UserProfile, College, Project } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'pathway_profile',
  ACTIVITIES: 'pathway_activities',
  HONORS: 'pathway_honors',
  COLLEGES: 'pathway_colleges',
  PROJECTS: 'pathway_projects',
  HAS_SEEN_TUTORIAL: 'pathway_has_seen_tutorial',
};

class DatabaseService {

  // --- Core Storage Logic (Local AsyncStorage Only) ---
  private async getItem(key: string) {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('AsyncStorage get error', e);
      return null;
    }
  }

  private async setItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('AsyncStorage save error', e);
    }
  }

  async clearLocalData() {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.PROFILE,
      STORAGE_KEYS.ACTIVITIES,
      STORAGE_KEYS.HONORS,
      STORAGE_KEYS.COLLEGES,
      STORAGE_KEYS.PROJECTS
    ]);
  }

  // --- Profile CRUD ---
  async getProfile(): Promise<UserProfile | null> {
    return await this.getItem(STORAGE_KEYS.PROFILE);
  }

  async saveProfile(profile: UserProfile): Promise<void> {
    await this.setItem(STORAGE_KEYS.PROFILE, profile);
  }

  // --- Activities CRUD ---
  async getActivities(): Promise<Activity[]> {
    const data = await this.getItem(STORAGE_KEYS.ACTIVITIES);
    return data || [];
  }

  async saveActivity(activity: Activity): Promise<void> {
    const activities = await this.getActivities();
    const index = activities.findIndex(a => a.id === activity.id);

    // Constraint: 150 word limit strictly enforced at DB layer
    const desc = activity.description || "";
    const words = desc.trim().split(/\s+/);
    if (words.length > 150) {
      activity.description = words.slice(0, 150).join(" ");
    }

    if (index >= 0) {
      activities[index] = activity;
    } else {
      activities.push(activity);
    }
    await this.setItem(STORAGE_KEYS.ACTIVITIES, activities);
  }

  async deleteActivity(id: string): Promise<void> {
    const activities = (await this.getActivities()).filter(a => a.id !== id);
    await this.setItem(STORAGE_KEYS.ACTIVITIES, activities);
  }

  // --- Honors CRUD ---
  async getHonors(): Promise<Honor[]> {
    const data = await this.getItem(STORAGE_KEYS.HONORS);
    return data || [];
  }

  async saveHonor(honor: Honor): Promise<void> {
    const honors = await this.getHonors();
    const index = honors.findIndex(h => h.id === honor.id);
    if (index >= 0) {
      honors[index] = honor;
    } else {
      honors.push(honor);
    }
    await this.setItem(STORAGE_KEYS.HONORS, honors);
  }

  async deleteHonor(id: string): Promise<void> {
    const honors = (await this.getHonors()).filter(h => h.id !== id);
    await this.setItem(STORAGE_KEYS.HONORS, honors);
  }

  // --- College CRUD ---
  async getColleges(): Promise<College[]> {
    const data = await this.getItem(STORAGE_KEYS.COLLEGES);
    return data || [];
  }

  async saveCollege(college: College): Promise<void> {
    const colleges = await this.getColleges();
    const index = colleges.findIndex(c => c.id === college.id);
    if (index >= 0) {
      colleges[index] = college;
    } else {
      colleges.push(college);
    }
    await this.setItem(STORAGE_KEYS.COLLEGES, colleges);
  }

  async deleteCollege(id: string): Promise<void> {
    const colleges = (await this.getColleges()).filter(c => c.id !== id);
    await this.setItem(STORAGE_KEYS.COLLEGES, colleges);
  }

  // --- Projects CRUD ---
  async getProjects(): Promise<Project[]> {
    const data = await this.getItem(STORAGE_KEYS.PROJECTS);
    return data || [];
  }

  async saveProject(project: Project): Promise<void> {
    const projects = await this.getProjects();
    const index = projects.findIndex(p => p.id === project.id);
    if (index >= 0) {
      projects[index] = project;
    } else {
      projects.push(project);
    }
    await this.setItem(STORAGE_KEYS.PROJECTS, projects);
  }

  async deleteProject(id: string): Promise<void> {
    const projects = (await this.getProjects()).filter(p => p.id !== id);
    await this.setItem(STORAGE_KEYS.PROJECTS, projects);
  }

  // --- Tutorial State ---
  async getHasSeenTutorial(): Promise<boolean> {
    const val = await this.getItem(STORAGE_KEYS.HAS_SEEN_TUTORIAL);
    return val === true;
  }

  async setHasSeenTutorial(hasSeen: boolean): Promise<void> {
    await this.setItem(STORAGE_KEYS.HAS_SEEN_TUTORIAL, hasSeen);
  }

  // --- Utility to Seed Data ---
  async seedIfEmpty() {
    const profile = await this.getProfile();
    if (!profile) {
      await this.saveProfile({
        name: "Student Name",
        graduationYear: 2026,
        targetMajor: "Undecided",
        email: "student@example.com",
        dreamSchool: "",
        gpa: "4.0",
        satScore: ""
      });
    }
  }
}

export const db = new DatabaseService();