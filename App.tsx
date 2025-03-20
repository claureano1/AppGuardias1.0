/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/Login'
import HomeScreen from './src/Home'
import QrLector from './src/QrLector'
import QrManual from './src/QrManual'
import History from './src/History'


const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">


      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}

        options={{
          headerShown: false,
          title: 'Iniciar sesión',
          headerStyle: {
            backgroundColor: '#fdcc2d', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Wafle QR',
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: '#fdcc2d', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },

        }}
      />

      <Stack.Screen
        name="QrLector"
        component={QrLector}
        options={{
          title: 'Lector QR',
          //  headerBackVisible: false,
          headerStyle: {
            backgroundColor: '#fdcc2d', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },

        }}
      />

      <Stack.Screen
        name="QrManual"
        component={QrManual}
        options={{
          title: 'Ingresar QR',
          headerStyle: {
            backgroundColor: '#fdcc2d', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },

        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          title: 'Historial de visitas',
          headerStyle: {
            backgroundColor: '#fdcc2d', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },

        }}
      />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
