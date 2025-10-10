import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileMain from './ProfileMain';
import ProfileShowEdit from './ProfileShowEdit';
import SubscriptionFeatures from './SubscriptionFeatures';
import ProfileSettings from './ProfileSettings';
import AccountSettings from './ProfileSettings/AccountSettings';
import Permissions from './ProfileSettings/Permissions';

const ProfileStackNavigator = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <ProfileStackNavigator.Navigator 
      screenOptions={{ 
        headerShown: false,
        presentation: 'modal'
      }}
    >
      <ProfileStackNavigator.Screen 
        name="ProfileMain" 
        component={ProfileMain}
      />
      <ProfileStackNavigator.Screen 
        name="ProfileShowEdit" 
        component={ProfileShowEdit}
      />
      <ProfileStackNavigator.Screen 
        name="SubscriptionFeatures" 
        component={SubscriptionFeatures}
      />
      <ProfileStackNavigator.Screen 
        name="ProfileSettings" 
        component={ProfileSettings}
        options={{ presentation: 'modal' }}
      />
      <ProfileStackNavigator.Screen 
        name="AccountSettings" 
        component={AccountSettings}
        options={{ 
          presentation: 'modal',
        }}
      />
      <ProfileStackNavigator.Screen 
        name="Permissions" 
        component={Permissions}
        options={{ 
          presentation: 'modal',
        }}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileStack;
