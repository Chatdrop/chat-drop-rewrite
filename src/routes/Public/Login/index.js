import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import SmsVerify from './SmsVerify';

const LoginStackNavigator = createNativeStackNavigator();

const LoginStack = () => {
  return (
    <LoginStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <LoginStackNavigator.Screen 
        name="LoginScreen" 
        component={LoginScreen}
      />
      <LoginStackNavigator.Screen 
        name="SmsVerify" 
        component={SmsVerify}
      />
    </LoginStackNavigator.Navigator>
  );
};

export default LoginStack;
