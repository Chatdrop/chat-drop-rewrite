import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationView from './LocationView';
import ListView from './ListView';

const LocationExploreStackNavigator = createNativeStackNavigator();

const LocationExploreStack = () => {
  return (
    <LocationExploreStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <LocationExploreStackNavigator.Screen 
        name="LocationView" 
        component={LocationView}
      />
      <LocationExploreStackNavigator.Screen 
        name="ListView" 
        component={ListView}
      />
    </LocationExploreStackNavigator.Navigator>
  );
};

export default LocationExploreStack;
