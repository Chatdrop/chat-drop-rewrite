import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LikesMain from './LikesMain';

const LikesStackNavigator = createNativeStackNavigator();

const LikesStack = () => {
  return (
    <LikesStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <LikesStackNavigator.Screen 
        name="LikesMain" 
        component={LikesMain}
      />
    </LikesStackNavigator.Navigator>
  );
};

export default LikesStack;
