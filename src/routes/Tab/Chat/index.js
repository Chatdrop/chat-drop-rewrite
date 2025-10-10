import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatList from './ChatList';
import ChatUiActual from './Actual_ui';
import DisplayProfile from './Display_profile';

const ChatStackNavigator = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <ChatStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <ChatStackNavigator.Screen 
        name="ChatList" 
        component={ChatList}
      />
      <ChatStackNavigator.Screen 
        name="ChatUiActual" 
        component={ChatUiActual}
      />
      <ChatStackNavigator.Screen 
        name="DisplayProfile" 
        component={DisplayProfile}
      />
    </ChatStackNavigator.Navigator>
  );
};

export default ChatStack;
