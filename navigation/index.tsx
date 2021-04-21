import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import NotFoundScreen from '../screens/NotFoundScreen';
import ProjectScreen from '../screens/ProjectScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SplashScreen from '../screens/SplashScreen';
import ToDoScreen from '../screens/ToDoScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SettingScreen from '../screens/SettingScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{
          headerShown: false
        }} />
      <Stack.Screen 
        name="SignIn" 
        component={SignInScreen}
        options={{
          headerShown: false 
        }} />
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen}
        options={{
          headerShown: false
        }} />
      <Stack.Screen 
        name="Home" 
        component={ProjectScreen}
        options={{
          headerLeft: () => null,
        }} />
      <Stack.Screen name="ToDo" component={ToDoScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
