import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, SafeAreaView, Platform } from 'react-native';
import { authService } from './services/auth';
import { db } from './services/db';

interface LoginScreenProps {
    onLoginSuccess: () => void;
    onSkip: () => void;
}

export const LoginScreen = ({ onLoginSuccess, onSkip }: LoginScreenProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleAuth = async () => {
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        setError('');
        setLoading(true);

        try {
            if (isLogin) {
                await authService.signIn(email, password);
            } else {
                await authService.signUp(email, password);
            }
            await db.syncToCloud();
            onLoginSuccess();
        } catch (e: any) {
            setError(e.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    // NEW: Handler for Google Login
    const handleGoogleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            await authService.signInWithGoogle();
            await db.syncToCloud();
            onLoginSuccess();
        } catch (e: any) {
            setError(e.message || "Google Sign-In failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={s.container}>
            <View style={s.content}>
                <Text style={s.title}>PATHWAY</Text>
                <Text style={s.subtitle}>{isLogin ? "Welcome Back" : "Create Account"}</Text>

                {error ? <Text style={s.error}>{error}</Text> : null}

                {/* Email Inputs */}
                <View style={s.inputContainer}>
                    <Text style={s.label}>Email</Text>
                    <TextInput
                        style={s.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="student@example.com"
                        placeholderTextColor="#666"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>

                <View style={s.inputContainer}>
                    <Text style={s.label}>Password</Text>
                    <TextInput
                        style={s.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••"
                        placeholderTextColor="#666"
                        secureTextEntry
                    />
                </View>

                {/* Email Auth Button */}
                <TouchableOpacity style={s.btn} onPress={handleAuth} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={s.btnTxt}>{isLogin ? "Sign In with Email" : "Create Account"}</Text>
                    )}
                </TouchableOpacity>

                {/* Divider */}
                <View style={s.dividerContainer}>
                    <View style={s.dividerLine} />
                    <Text style={s.dividerText}>OR</Text>
                    <View style={s.dividerLine} />
                </View>

                {/* Google Auth Button */}
                <TouchableOpacity style={s.googleBtn} onPress={handleGoogleLogin} disabled={loading}>
                    <Text style={s.googleBtnTxt}>Sign in with Google</Text>
                </TouchableOpacity>

                {/* Toggles */}
                <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={s.toggleBtn}>
                    <Text style={s.toggleTxt}>
                        {isLogin ? "New here? Create an account" : "Already have an account? Sign In"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={onSkip} style={s.skipBtn}>
                    <Text style={s.skipTxt}>Continue as Guest</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18181b', // inc-950
        justifyContent: 'center',
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 8,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
    },
    subtitle: {
        fontSize: 18,
        color: '#a1a1aa', // inc-400
        textAlign: 'center',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        color: '#a1a1aa',
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#27272a', // inc-800
        borderRadius: 12,
        padding: 16,
        color: '#fff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#3f3f46', // inc-700
    },
    btn: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 10,
    },
    btnTxt: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
    },
    // Styles for the Divider
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#3f3f46', // inc-700
    },
    dividerText: {
        color: '#71717a', // inc-500
        marginHorizontal: 10,
        fontSize: 12,
        fontWeight: '600',
    },
    // Styles for Google Button
    googleBtn: {
        backgroundColor: '#27272a', // Darker background for contrast
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#52525b', // inc-600
    },
    googleBtnTxt: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    error: {
        color: '#f87171',
        textAlign: 'center',
        marginBottom: 16,
    },
    toggleBtn: {
        marginTop: 24,
        alignItems: 'center',
    },
    toggleTxt: {
        color: '#60a5fa', // blue-400
        fontSize: 14,
    },
    skipBtn: {
        marginTop: 30,
        alignItems: 'center',
    },
    skipTxt: {
        color: '#71717a', // inc-500
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});