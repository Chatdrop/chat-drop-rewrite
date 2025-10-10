import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginStack from './Login';
import ForgotPassword from './ForgotPassword';

const PublicStackNavigator = createNativeStackNavigator();

const PublicStack = () => {
  return (
    <PublicStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <PublicStackNavigator.Screen 
        name="Login" 
        component={LoginStack}
      />
      <PublicStackNavigator.Screen 
        name="ForgotPassword" 
        component={ForgotPassword}
      />
    </PublicStackNavigator.Navigator>
  );
};

export default PublicStack;
