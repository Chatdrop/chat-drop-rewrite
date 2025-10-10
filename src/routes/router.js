import React, { useEffect } from 'react';
import {  NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

// Import all stack navigators
import OnboardingStack from './Onboarding';
import PublicStack from './Public';
import RegisterSetupStack from './RegisterSetup';
import TabNavigator from './Tab';
import ProfileStack from './Profile';
import ItsAMatch from './ItsAMatch';
import UserProfileDisplay from './Tab/Chat/Display_profile';
import { navigationRef } from '../utils/navigationRef';
import { useSnapshot } from 'valtio';
import { appInit, appStore } from '../stores/app_store';
import FullScreenLoading from '../components/FullScreenLoading';
import { DarkTheme } from '../config/themeConfig';


const MainStack = createNativeStackNavigator();

const AppRouter = () => {
  const appSnap = useSnapshot(appStore);

  useEffect(()=>{
    appInit();
  }, []);

  return (
    <NavigationContainer theme={DarkTheme} ref={navigationRef} >
      <MainStack.Navigator screenOptions={{ headerShown: false }}>
        {appSnap.isLoading ? (
          <MainStack.Screen name="Loading" component={FullScreenLoading} />
        ) : !appSnap.onboardingFinished ? (
          <MainStack.Screen 
            name="OnboardingStack" 
            component={OnboardingStack}
          />
        ) : !appSnap.userUid ? (
          <MainStack.Screen name="PublicStack" component={PublicStack} />
        ) : !appSnap.setupComplete ? (
          <MainStack.Screen 
            name="RegisterSetupStack" 
            component={RegisterSetupStack}
          />
        ) : (
          <>
            <MainStack.Screen 
              name="Tab" 
              component={TabNavigator}
            />
            <MainStack.Screen 
              name="ProfileStack" 
              component={ProfileStack}
              options={{ presentation: 'modal' }}
            />
            <MainStack.Screen 
              name="ItsaMatch" 
              component={ItsAMatch}
              options={{ 
                presentation: 'modal',
              }}
            />
            <MainStack.Screen 
              name="UserProfileDisplay" 
              component={UserProfileDisplay}
              options={{ 
                presentation: 'modal',
                headerShown: false
              }}
            />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  centerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AppRouter;
