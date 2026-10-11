import VideoImage from '@/screens/homescreen/VideoImage';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChatScreen from '../../screens/homescreen/chatScreen';
import SettingScreen from '../../screens/homescreen/settingScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={({ route }: { route: { name: string } }) => ({
                tabBarIcon: ({
                    focused,
                    color,
                    size,
                }: {
                    focused: boolean;
                    color: string;
                    size: number;
                }) => {
                    let iconName: keyof typeof Ionicons.glyphMap = 'home';

                    if (route.name === 'Chat') {
                        iconName = focused ? 'chatbubble' : 'chatbubble-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Video') {
                        iconName = focused ? 'image' : 'image-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={'#5a33a998'} />;
                },
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute', // Float above the screen content
                    bottom: insets.bottom + 12, // Lift off the bottom edge
                    marginHorizontal: 50, // Space from both sides (left/right get overridden by the default start/end: 0)
                    height: 64,
                    borderRadius: 32, // Fully rounded ends (half of height)
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1, // Remove default top border
                    elevation: 10, // Shadow for Android
                    shadowColor: '#5a33a998', // Shadow for iOS
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.12,
                    shadowRadius: 12,
                    paddingTop: 8,
                    paddingBottom: 8, // Override default safe-area padding
                    borderWidth: 1,
                    borderColor: '#5a33a998'
                
                },
                tabBarBadgeStyle: {
                    color: 'black',
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontFamily: 'sans serif',
                    fontWeight: 300,
                    color: 'black'
                },
            })}
        >
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Video" component={VideoImage} />
            <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
    );
}