import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ExploreStack from './Explore';
import LikesStack from './Likes';
import BluetoothExplore from './BluetoothExplore';
import LocationExploreStack from './LocationExplore';
import ChatStack from './Chat';
import CustomHeader from './customHeader';
import CustomTabBar from './customTabBar';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        header: (props) => <CustomHeader {...props} />,
      }}
    >
      <Tab.Screen name="ExploreStack" component={ExploreStack} />
      <Tab.Screen name="LikesStack" component={LikesStack} />
      <Tab.Screen name="BluetoothView" component={BluetoothExplore} />
      <Tab.Screen name="LocationExploreStack2" component={LocationExploreStack} />
      <Tab.Screen name="ChatStack" component={ChatStack} />
    </Tab.Navigator>
  );
}
