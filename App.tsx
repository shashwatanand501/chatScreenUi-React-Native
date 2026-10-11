// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigationStack from './src/Navigation/NavigationStack';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
