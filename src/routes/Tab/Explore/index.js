import React from 'react';
import { View, StyleSheet } from 'react-native';
import SwipeCard from '../../../components/SwipeCard';
import { useTheme, useNavigation } from '@react-navigation/native';
import Swiper from '../../../components/Swiper';
import TextButton from '../../../components/TextButton';
import StyledText from '../../../components/StyledText';
import { navigationRef } from '../../../utils/navigationRef';

const ExploreStack = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  // Enhanced filler data matching profile attributes
  const user = {
    uid: 1,
    name: 'Emma',
    birthdate: '1998-05-15T00:00:00.000Z',
    photos: [
      'https://picsum.photos/300/400?random=1',
      'https://picsum.photos/300/400?random=2',
      'https://picsum.photos/300/400?random=3',
      'https://picsum.photos/300/400?random=4',
    ],
    location: 'Istanbul, Turkey'
  };

  const handleLike = (userUid) => {
    console.log('Liked user:', userUid);
  };

  const handlePass = (userUid) => {
    console.log('Passed user:', userUid);
  };

  const handleSuperLike = (userUid) => {
    console.log('Super liked user:', userUid);
  };

  const handleChat = (userUid) => {
    console.log('Chat with user:', userUid);
  };

  const handleStar = (userUid) => {
    console.log('Starred user:', userUid);
  };

  const handleExamine = (userUid) => {
    navigationRef.navigate('UserProfileDisplay', { userUid });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Swiper
        onLike={handleLike}
        onPass={handlePass}
        onSuperLike={handleSuperLike}
        onChat={handleChat}
        onStar={handleStar}
        onExamine={handleExamine}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  testButtonContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
});

export default ExploreStack;
