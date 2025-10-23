import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { styleConstants } from '../../../../config/styleConstants';
import CardList from './components/CardList';
import TabBarAwareScrollView from '../../../../components/TabBarAwareScrollView';
import StyledText from '../../../../components/StyledText';
import StyledTextDynamic from '../../../../components/StyledTextDynamic';
import TextButton from '../../../../components/TextButton';
import { useTheme } from '@react-navigation/native';
import EmptyContent from '../../../../components/EmptyContent';

const LikesMain = ({navigation}) => {
  const theme = useTheme();
  
  // Premium status - hardcoded for demo
  const isPremium = false;  // Set to false to show blur effect

  // Filler data for people who liked you
  const [page_data, set_page_data] = useState([
    {
      id: 1,
      photo_url: 'https://picsum.photos/300/400?random=1',
      name: 'Emma',
      age: 25,
      quick_match_accept_key: 'key1'
    },
    {
      id: 2,
      photo_url: 'https://picsum.photos/300/400?random=2',
      name: 'Sofia',
      age: 23,
      liked_you_key: 'key2'
    },
    {
      id: 3,
      photo_url: 'https://picsum.photos/300/400?random=3',
      name: 'Isabella',
      age: 27,
      quick_match_accept_key: 'key3'
    },
    {
      id: 4,
      photo_url: 'https://picsum.photos/300/400?random=4',
      name: 'Mia',
      age: 24,
      liked_you_key: 'key4'
    },
    {
      id: 5,
      photo_url: 'https://picsum.photos/300/400?random=5',
      name: 'Charlotte',
      age: 26,
      quick_match_accept_key: 'key5'
    },
    {
      id: 6,
      photo_url: 'https://picsum.photos/300/400?random=6',
      name: 'Amelia',
      age: 22,
      liked_you_key: 'key6'
    }
  ]);

  const like_press = (i) => {
    console.log(`Liked person at index ${i}`);
    // Remove the person from the list after liking
    set_page_data(page_data.filter((_, index) => index !== i));
  };

  const dispose_press = (i) => {
    console.log(`Disposed person at index ${i}`);
    // Remove the person from the list after disposing
    set_page_data(page_data.filter((_, index) => index !== i));
  };

  return (
    <View>
      <TabBarAwareScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ paddingTop: 115 }}>
        <View style={{ 
          padding: styleConstants.padding, 
          justifyContent: "space-between", 
          alignItems: "center", 
          flexDirection: "row", 
          gap: 20 
        }}>
          <StyledTextDynamic text={"Profilinizi\nBeğenenler"}></StyledTextDynamic>
          {!isPremium && (
            <TextButton 
              padding={10} 
              height={40} 
              backgroundColor={theme.colors.primary}
              onPress={() => navigation.navigate('ProfileStack', { screen: 'SubscriptionFeatures' })}
            >
              <StyledText bold caption>Premium Üyelik Al</StyledText>
            </TextButton>
          )}
        </View>

        <View style={styles.container}>
          {page_data.map((elem, index) => (
            <CardList 
              key={elem.id} 
              disabled={!isPremium} 
              like_press={()=>{like_press(index)}} 
              dispose_press={()=>{dispose_press(index)}}
              {...elem} 
            />
          ))}
          {page_data.length == 0 && <EmptyContent description="Beğenenleriniz yok" />}
        </View>

      </TabBarAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 0,
    padding: styleConstants.padding - 5,
    width: '100%', 
    height: '100%' 
  }
});

export default LikesMain;
