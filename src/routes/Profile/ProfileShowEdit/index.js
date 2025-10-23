import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useSnapshot } from 'valtio';
import { appStore } from '../../../stores/app_store';
import { selfProfileAttributes, putAttribute } from '../../../stores/profile_attributes';
import StyledText from '../../../components/StyledText';
import StyledTextDynamic from '../../../components/StyledTextDynamic';
import { PhotosCard, StringCard, IntCard, MetaCard } from '../../../components/ProfileFormCards';
import Svg, { Path } from 'react-native-svg';
import { styleConstants } from '../../../config/styleConstants';

const ProfileShowEdit = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const appSnap = useSnapshot(appStore);
  const profileSnap = useSnapshot(selfProfileAttributes);

  // Local state for form values
  const defaultPhoto = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400';
  
  // Get photos from store or use default - safely handle Valtio snapshot
  const getPhotos = () => {
    if (profileSnap.photos && Array.isArray(profileSnap.photos) && profileSnap.photos.length > 0) {
      // Convert snapshot to plain array to avoid Valtio proxy issues
      return [...profileSnap.photos];
    }
    return [defaultPhoto];
  };

  // Safely convert all snapshot values to plain values
  const [formData, setFormData] = useState({
    name: profileSnap.name || '',
    surname: profileSnap.surname || '',
    bio: profileSnap.bio || '',
    height: profileSnap.height || '',
    job: profileSnap.job || '',
    workplace: profileSnap.workplace || '',
    school: profileSnap.school || '',
    birthdate: profileSnap.birthdate || '',
    gender: profileSnap.gender ? (Array.isArray(profileSnap.gender) ? [...profileSnap.gender] : profileSnap.gender) : [],
    genderPreference: profileSnap.genderPreference ? (Array.isArray(profileSnap.genderPreference) ? [...profileSnap.genderPreference] : profileSnap.genderPreference) : [],
    motive: profileSnap.motive ? (Array.isArray(profileSnap.motive) ? [...profileSnap.motive] : profileSnap.motive) : [],
    photos: getPhotos()
  });

  const color = () => (appSnap.isVisible ? theme.colors.onlineGreen : theme.colors.offlineRed);

  // Form data update handlers
  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Save handler
  const handleSave = async () => {
    try {
      console.log('Saving profile data:', formData);
      
      // Save each field that has changed
      for (const [key, value] of Object.entries(formData)) {
        if (JSON.stringify(value) !== JSON.stringify(profileSnap[key])) {
          console.log(`Saving ${key}:`, value);
          await putAttribute(key, value);
        }
      }
      
      console.log('Profile saved successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error saving profile:', error);
      // Optionally show an error message to the user
    }
  };

  // Gender and motive options
  const genderOptions = [
    { uid: 'male', name: 'Erkek' },
    { uid: 'female', name: 'Kadın' },
    { uid: 'lgbt', name: 'LGBT' }
  ];

  const motiveOptions = [
    { uid: 'love', name: 'Aşk' },
    { uid: 'friendship', name: 'Arkadaşlık' },
    { uid: 'network', name: 'Network' }
  ];

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
            style={[styles.backButton, { borderColor: color() }]}
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

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.colors.primary }]}
            onPress={handleSave}
          >
            <StyledText style={styles.saveButtonText}>Kaydet</StyledText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <StyledTextDynamic text={"Bilgilerini Düzenle"} />
      </View>

      {/* Content - Form Cards */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Photos Section */}
        <View style={styles.cardWrapper}>
          <StyledText bold action style={styles.sectionTitle}>Galeri</StyledText>
          <PhotosCard
            photos={formData.photos}
            editable={true}
            onChange={(photos) => updateField('photos', photos)}
          />
        </View>

        {/* Name */}
        <View style={styles.cardWrapper}>
          <StringCard
            title="İsim"
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
            placeholder="İsminiz"
            editable={true}
          />
        </View>

        {/* Surname */}
        <View style={styles.cardWrapper}>
          <StringCard
            title="Soyisim"
            value={formData.surname}
            onChangeText={(text) => updateField('surname', text)}
            placeholder="Soyisminiz"
            editable={true}
          />
        </View>

        {/* Bio */}
        <View style={styles.cardWrapper}>
          <StringCard
            title="Ben Kimim"
            value={formData.bio}
            onChangeText={(text) => updateField('bio', text)}
            placeholder="Kendinizi tanıtın"
            editable={true}
          />
        </View>

        {/* Height */}
        <View style={styles.cardWrapper}>
          <IntCard
            title="Boy Ölçüm (cm)"
            value={formData.height ? String(formData.height) : ''}
            onChange={(value) => updateField('height', value)}
            editable={true}
          />
        </View>

        {/* Gender */}
        <View style={styles.cardWrapper}>
          <MetaCard
            title="Cinsiyet"
            value={formData.gender}
            onChange={(value) => updateField('gender', value)}
            choices={genderOptions}
            is_multi={false}
            editable={true}
          />
        </View>

        {/* Gender Preference */}
        <View style={styles.cardWrapper}>
          <MetaCard
            title="Cinsiyet Tercihi"
            value={formData.genderPreference}
            onChange={(value) => updateField('genderPreference', value)}
            choices={genderOptions}
            is_multi={true}
            editable={true}
          />
        </View>

        {/* Motive */}
        <View style={styles.cardWrapper}>
          <MetaCard
            title="Arayışın Ne?"
            value={formData.motive}
            onChange={(value) => updateField('motive', value)}
            choices={motiveOptions}
            is_multi={false}
            editable={true}
          />
        </View>

        {/* Job */}
        <View style={styles.cardWrapper}>
          <StringCard
            title="Mesleğin"
            value={formData.job}
            onChangeText={(text) => updateField('job', text)}
            placeholder="Mesleğinizi yazın"
            editable={true}
          />
        </View>

        {/* Workplace */}
        <View style={styles.cardWrapper}>
          <StringCard
            title="Çalıştığın Yer"
            value={formData.workplace}
            onChangeText={(text) => updateField('workplace', text)}
            placeholder="Çalıştığınız yeri yazın"
            editable={true}
          />
        </View>

        {/* School */}
        <View style={styles.cardWrapper}>
          <StringCard
            title="Okulun"
            value={formData.school}
            onChangeText={(text) => updateField('school', text)}
            placeholder="Okulunuzu yazın"
            editable={true}
          />
        </View>
      </ScrollView>
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
    paddingHorizontal: styleConstants.padding,
    marginBottom: 16,
    marginTop: 10
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: styleConstants.padding,
    paddingBottom: 40,
  },
  cardWrapper: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 12,
  },
});

export default ProfileShowEdit;
