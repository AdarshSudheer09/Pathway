import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign-In with the CLIENT_ID from your screenshot
GoogleSignin.configure({
    webClientId: '399855551434-bmn7prt0s94b46poo5nucduc0bbqjobj.apps.googleusercontent.com',
});

class AuthService {
    // Subscribe to auth state changes
    subscribe(onUserChanged: (user: FirebaseAuthTypes.User | null) => void): () => void {
        return auth().onAuthStateChanged(onUserChanged);
    }

    // Get current user
    getCurrentUser(): FirebaseAuthTypes.User | null {
        return auth().currentUser;
    }

    // Sign Up with Email/Password
    async signUp(email: string, pass: string): Promise<void> {
        try {
            await auth().createUserWithEmailAndPassword(email, pass);
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('That email address is already in use!');
            }
            if (error.code === 'auth/invalid-email') {
                throw new Error('That email address is invalid!');
            }
            throw error;
        }
    }

    // Sign In with Email/Password
    async signIn(email: string, pass: string): Promise<void> {
        try {
            await auth().signInWithEmailAndPassword(email, pass);
        } catch (error: any) {
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                throw new Error('Invalid email or password');
            }
            throw error;
        }
    }

    // NEW: Sign In with Google
    async signInWithGoogle(): Promise<void> {
        try {
            // 1. Check if device has Google Play Services (required for Android)
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // 2. Get the user's ID token from Google
            const response = await GoogleSignin.signIn();

            // Check if response data exists
            if (!response.data) {
                throw new Error('Google Sign-In failed: No user data received');
            }

            const idToken = response.data.idToken;
            if (!idToken) {
                throw new Error('No ID token found in Google response');
            }

            // 3. Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // 4. Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            throw error;
        }
    }

    // Sign Out
    async signOut(): Promise<void> {
        try {
            // Sign out from Firebase
            await auth().signOut();
            // Also sign out from Google to allow account switching
            await GoogleSignin.signOut();
        } catch (error) {
            console.error("Sign out error:", error);
        }
    }
}

export const authService = new AuthService();