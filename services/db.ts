import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Activity, Honor, UserProfile, College, Project } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'pathway_profile',
  ACTIVITIES: 'pathway_activities',
  HONORS: 'pathway_honors',
  COLLEGES: 'pathway_colleges',
  PROJECTS: 'pathway_projects',
};

class DatabaseService {

  // --- Core Storage Logic (Dual Mode) ---
  private async getItem(key: string) {
    const user = auth().currentUser;
    if (user) {
      try {
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          return doc.data()?.[key] || null;
        }
        return null;
      } catch (e) {
        console.error('Firestore get error', e);
        return null;
      }
    } else {
      // Guest Mode
      try {
        const data = await AsyncStorage.getItem(key);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.error('AsyncStorage get error', e);
        return null;
      }
    }
  }

  private async setItem(key: string, value: any) {
    const user = auth().currentUser;
    if (user) {
      try {
        await firestore().collection('users').doc(user.uid).set({
          [key]: value
        }, { merge: true });
      } catch (e) {
        console.error('Firestore save error', e);
      }
    } else {
      // Guest Mode
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error('AsyncStorage save error', e);
      }
    }
  }

  // --- Cloud Sync Feature ---
  // Call this after successful login to migrate local data to cloud
  async syncToCloud() {
    const user = auth().currentUser;
    if (!user) return;

    try {
      const profile = await AsyncStorage.getItem(STORAGE_KEYS.PROFILE);
      const activities = await AsyncStorage.getItem(STORAGE_KEYS.ACTIVITIES);
      const honors = await AsyncStorage.getItem(STORAGE_KEYS.HONORS);
      const colleges = await AsyncStorage.getItem(STORAGE_KEYS.COLLEGES);
      const projects = await AsyncStorage.getItem(STORAGE_KEYS.PROJECTS);

      const batchData: any = {};
      if (profile) batchData[STORAGE_KEYS.PROFILE] = JSON.parse(profile);
      if (activities) batchData[STORAGE_KEYS.ACTIVITIES] = JSON.parse(activities);
      if (honors) batchData[STORAGE_KEYS.HONORS] = JSON.parse(honors);
      if (colleges) batchData[STORAGE_KEYS.COLLEGES] = JSON.parse(colleges);
      if (projects) batchData[STORAGE_KEYS.PROJECTS] = JSON.parse(projects);

      if (Object.keys(batchData).length > 0) {
        await firestore().collection('users').doc(user.uid).set(batchData, { merge: true });
        console.log("Synced local data to cloud for user " + user.uid);
      }
    } catch (e) {
      console.error("Error syncing to cloud:", e);
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