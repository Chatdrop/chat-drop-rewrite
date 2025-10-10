/**
 * Chat Drop React Native App
 * Main application entry point
 *
 * @format
 */

import React from 'react';
import { StatusBar, Text, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import AppRouter from './src/routes/router';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppRouter />
    </SafeAreaProvider>
  );
}

export default App;
