import LoginScreenCarousel from '@/component/LoginScreenCarousel/LoginScreenCarousel';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const LoginScreen = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    // 0 -> 42% (Login Mode), 1 -> 85% (Register Mode)
    const snapPoints = useMemo(() => ['50%', '95%'], []);
    const [isRegister, setIsRegister] = useState(false);

    const toggleMode = () => {
        if (isRegister) {
            bottomSheetRef.current?.snapToIndex(0);
            setIsRegister(false);
        } else {
            bottomSheetRef.current?.snapToIndex(1);
            setIsRegister(true);
        }
    };

    return (
        <GestureHandlerRootView style={styles.flexOne}>
            <LoginScreenCarousel>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={snapPoints}
                    index={0}
                    enablePanDownToClose={false}
                    backgroundStyle={styles.sheetBackground}
                    handleIndicatorStyle={styles.sheetHandle}
                    onChange={(index) => {
                        // Keep UI state synced if user manually drags sheet up/down
                        setIsRegister(index === 1);
                    }}
                >
                    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
                        <Text style={styles.headerTitle}>
                            {isRegister ? 'Create Account' : 'Welcome Back'}
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {isRegister
                                ? 'Fill in your details to get started'
                                : 'Sign in to continue to your account'}
                        </Text>

                        <View style={styles.formContainer}>
                            {isRegister && (
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Full Name</Text>
                                    <TextInput
                                        style={styles.inputBox}
                                        placeholder="John Doe"
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>
                            )}

                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Email Address</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="name@example.com"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <TextInput
                                    style={styles.inputBox}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry
                                />
                            </View>

                            {isRegister && (
                                <View style={styles.inputWrapper}>
                                    <Text style={styles.inputLabel}>Confirm Password</Text>
                                    <TextInput
                                        style={styles.inputBox}
                                        placeholder="Confirm your password"
                                        placeholderTextColor="#9CA3AF"
                                        secureTextEntry
                                    />
                                </View>
                            )}

                            {!isRegister && (
                                <TouchableOpacity style={styles.forgotPassword}>
                                    <Text style={styles.forgotPasswordText}>
                                        Forgot Password?
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={styles.primaryButton}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.primaryButtonText}>
                                    {isRegister ? 'Sign Up' : 'Log In'}
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.footerRow}>
                                <Text style={styles.footerText}>
                                    {isRegister
                                        ? 'Already have an account? '
                                        : "Don't have an account? "}
                                </Text>
                                <TouchableOpacity onPress={toggleMode}>
                                    <Text style={styles.footerLink}>
                                        {isRegister ? 'Log In' : 'Sign Up'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </BottomSheetScrollView>
                </BottomSheet>
            </LoginScreenCarousel>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    flexOne: {
        flex: 1,
    },
    sheetBackground: {
        backgroundColor: '#fefefead',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    sheetHandle: {
        backgroundColor: '#D1D5DB',
        width: 36,
        height: 4,
        borderRadius: 2,
    },
    contentContainer: {
        paddingHorizontal: 30,
        paddingTop: 12,
        paddingBottom: 35,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        gap: 14,
    },
    inputWrapper: {
        width: '100%',
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
    },
    inputBox: {
        width: '100%',
        height: 48,
        backgroundColor: '#F9FAFB',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#111827',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: -4,
        marginBottom: 4,
    },
    forgotPasswordText: {
        color: '#6365f1b3',
        fontSize: 13,
        fontWeight: '600',
    },
    primaryButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#6366F1', // Accent Indigo color
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#6B7280',
    },
    footerLink: {
        fontSize: 14,
        fontWeight: '700',
        color: '#6366F1',
    },
});

export default LoginScreen;