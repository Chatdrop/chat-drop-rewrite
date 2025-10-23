import React, { useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useNavigation } from '@react-navigation/native';
import { useSnapshot } from 'valtio';
import { appStore } from '../../../stores/app_store';
import StyledText from '../../../components/StyledText';
import SubscriptionCard from '../../../components/SubscriptionCard';
import { styleConstants } from '../../../config/styleConstants';
import Svg, { Path } from 'react-native-svg';

const SubscriptionFeatures = () => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation();
  const appSnap = useSnapshot(appStore);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;

  const color = () => (appSnap.isVisible ? theme.colors.onlineGreen : theme.colors.offlineRed);

  // Subscription data
  const subscriptions = [
    {
      id: 'premium',
      type: 'premium',
      price: '4,99',
      period: 'aylık',
      features: [
        { text: 'Sınırsız Like hakkı', enabled: true },
        { text: 'Haftalık 3 adet Süper Like', enabled: true },
        { text: '2x Öne Çıkarılma', enabled: false },
        { text: '8x Öne Çıkarılma', enabled: false },
        { text: 'Eşleşmeden önce mesajlaşma', enabled: false },
        { text: 'Reklamları kaldır', enabled: false },
        { text: 'Kimin beğendiğini gör', enabled: false },
        { text: 'Sana uygun kişi önerileri', enabled: false },
      ]
    },
    {
      id: 'gold',
      type: 'gold',
      price: '7,99',
      period: 'aylık',
      features: [
        { text: 'Sınırsız Like hakkı', enabled: true },
        { text: 'Haftalık 3 adet Süper Like', enabled: true },
        { text: '2x Öne Çıkarılma', enabled: true },
        { text: '8x Öne Çıkarılma', enabled: true },
        { text: 'Eşleşmeden önce mesajlaşma', enabled: true },
        { text: 'Reklamları kaldır', enabled: false },
        { text: 'Kimin beğendiğini gör', enabled: false },
        { text: 'Sana uygun kişi önerileri', enabled: false },
      ]
    },
    {
      id: 'platinum',
      type: 'platinum',
      price: '10,99',
      period: 'aylık',
      features: [
        { text: 'Sınırsız Like hakkı', enabled: true },
        { text: 'Haftalık 3 adet Süper Like', enabled: true },
        { text: '2x Öne Çıkarılma', enabled: true },
        { text: '8x Öne Çıkarılma', enabled: true },
        { text: 'Eşleşmeden önce mesajlaşma', enabled: true },
        { text: 'Reklamları kaldır', enabled: true },
        { text: 'Kimin beğendiğini gör', enabled: true },
        { text: 'Sana uygun kişi önerileri', enabled: true },
      ]
    }
  ];

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  const handlePurchase = (type) => {
    console.log('Purchase:', type);
    // Add purchase logic here
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, {
        paddingTop: insets.top - 20,
        paddingHorizontal: styleConstants.padding,
      }]}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: Platform.OS === "android" ? 15 : -5,
        }}>
          {/* Back Button */}
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderColor: color(),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2.5,
            }}
            onPress={() => navigation.goBack()}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M15 18l-6-6 6-6"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderColor: color(),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 2.5,
            }}
            onPress={() => {}}
          >
            <View style={{
              width: 33,
              height: 33,
              borderRadius: 16.5,
              backgroundColor: "red"
            }} />
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.titleContainer}>
        <StyledText style={styles.titleText}>Aboneliklerim</StyledText>
      </View>

      {/* Subscription Cards */}
      <View style={styles.cardsContainer}>
        <FlatList
          ref={flatListRef}
          data={subscriptions}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentContainerStyle={{ paddingTop: 10 }}
          renderItem={({ item }) => (
            <View style={{ width: screenWidth, paddingHorizontal: 20 }}>
              <SubscriptionCard
                membershipType={item.type}
                features={item.features}
                price={item.price}
                period={item.period}
                onPurchasePress={() => handlePurchase(item.type)}
              />
            </View>
          )}
        />
      </View>


      <View style={styles.paginationContainer}>
        {subscriptions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              { backgroundColor: activeIndex === index ? '#FFFFFF' : '#666666' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    paddingBottom: 12,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardsContainer: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default SubscriptionFeatures;
