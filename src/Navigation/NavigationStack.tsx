import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';

import ChatListScreen from '@/screens/homescreen/chatScreen';
import DirectChatScreen from '@/screens/homescreen/DirectChatScreen';

import LoginScreen from '@/screens/auth/LoginScreen';
import Dashboard from '../screens/homescreen/dashboard';

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
    // Track authentication state
    const [userLoggedIn, setUserLoggedIn] = useState(true);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
                animation: 'slide_from_right',
            }}
        >
            {userLoggedIn ? (
                // --- AUTHENTICATED STACK ---
                // Users see these screens ONLY when logged in
                <Stack.Group>
                    <Stack.Screen name="Dashboard" component={Dashboard} />
                    <Stack.Screen name="ChatList" component={ChatListScreen} />
                    <Stack.Screen name="DirectChat" component={DirectChatScreen} />
                </Stack.Group>
            ) : (
                // --- UNAUTHENTICATED STACK ---
                // Users see this ONLY when logged out
                <Stack.Group>
                    <Stack.Screen name="Login" component={LoginScreen} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
}