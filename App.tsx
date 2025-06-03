import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './src/navigation/types';
import TabNavigator from './src/navigation/TabNavigator';
const Stack = createNativeStackNavigator<RootStackParamList>();
function App(): React.JSX.Element {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Entry"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Entry"
            component={require('./src/screens/Entry').default}
          />
          <Stack.Screen
            name="Userdetails"
            component={require('./src/screens/Userdetails').default}
            initialParams={{ phoneNumber: '' }}
          />
          <Stack.Screen
            name="Verification"
            component={require('./src/screens/Verification').default}
          />
          <Stack.Screen
            name="Verifycode"
            component={require('./src/screens/verifycode').default}
            initialParams={{ phoneNumber: '' }}
          />
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
