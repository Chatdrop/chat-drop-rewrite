import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  Alert,
  Switch
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { appStore } from '../../../stores/app_store';
import StyledText from '../../../components/StyledText';
import SettingsSection from '../../../components/SettingsSection';
import SettingsItem from '../../../components/SettingsItem';
import SettingsSlider from '../../../components/SettingsSlider';
import SettingsRangeSlider from '../../../components/SettingsRangeSlider';
import { supabase } from '../../../network/supabase';
import { LANGUAGES } from './languages';
import { styleConstants } from '../../../config/styleConstants';
import Svg, { Path } from 'react-native-svg';

const ProfileSettings = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const appSnap = useSnapshot(appStore);

  // Settings state
  const [maxDistance, setMaxDistance] = useState(50);
  const [ageRange, setAgeRange] = useState({ min: 21, max: 26 });
  const [minPhotos, setMinPhotos] = useState(1);
  const [selectedLanguages, setSelectedLanguages] = useState(['tr', 'en']);
  const [location] = useState('Ümraniye, Istanbul');

  const handleLogout = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            await supabase.auth.signOut();
            // Navigation will be handled by auth state listener
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Hesabı Sil',
      'Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Hesabı Sil',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement account deletion
            Alert.alert('Bilgi', 'Hesap silme özelliği yakında eklenecek');
          },
        },
      ]
    );
  };

  const showLanguagePicker = () => {
    const languageOptions = LANGUAGES.map(lang => lang.name);
    const cancelButtonIndex = languageOptions.length;

    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...languageOptions, 'İptal'],
          cancelButtonIndex,
          title: 'Dil Seç',
        },
        (buttonIndex) => {
          if (buttonIndex !== cancelButtonIndex) {
            const selectedLang = LANGUAGES[buttonIndex];
            if (!selectedLanguages.includes(selectedLang.code)) {
              setSelectedLanguages([...selectedLanguages, selectedLang.code]);
            }
          }
        }
      );
    }
  };

  const removeLanguage = (langCode) => {
    setSelectedLanguages(selectedLanguages.filter(code => code !== langCode));
  };

  const getLanguageName = (code) => {
    const lang = LANGUAGES.find(l => l.code === code);
    return lang ? lang.name : code;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, {
        paddingTop: insets.top - 20,
        paddingHorizontal: styleConstants.padding,
      }]}>
        <View style={[
          styles.headerContent,
          { marginTop: Platform.OS === "android" ? 15 : -5 }
        ]}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
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

          {/* Title - Center (absolute positioning) */}
          <View style={styles.titleWrapper}>
            <StyledText style={styles.headerTitle}>Ayarlar</StyledText>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Discovery Section */}
        <SettingsSection title="KEŞİF">
          <SettingsItem
            title="Konum"
            subtitle="Eşleşmeleri her yerde bul"
            value={location}
            onPress={() => {
              Alert.alert('Bilgi', 'Konum seçme özelliği yakında eklenecek');
            }}
          />
          
          <SettingsSlider
            title="Maksimum Mesafe"
            value={maxDistance}
            minimumValue={2}
            maximumValue={160}
            step={1}
            unit=" km"
            onValueChange={setMaxDistance}
          />

          <SettingsRangeSlider
            title="Yaş Aralığı"
            minValue={ageRange.min}
            maxValue={ageRange.max}
            minimumValue={18}
            maximumValue={70}
            onValuesChange={(min, max) => setAgeRange({ min, max })}
          />
        </SettingsSection>

        {/* Account Settings */}
        <SettingsSection title="HESAP AYARLARI">
          <SettingsItem
            title="Telefon Numarası"
            value="+90 555 123 4567"
            onPress={() => {
              Alert.alert('Bilgi', 'Telefon numarası düzenleme yakında eklenecek');
            }}
          />

          <SettingsItem
            title="E-posta"
            value={appSnap.userUid ? 'brkyyilmaz@gmail.com' : 'Yok'}
            onPress={() => {
              Alert.alert('Bilgi', 'E-posta düzenleme yakında eklenecek');
            }}
          />

          <SettingsItem
            title="İlgi Alanları"
            value="Seç"
            onPress={() => {
              Alert.alert('Bilgi', 'İlgi alanları seçme yakında eklenecek');
            }}
          />

          <SettingsSlider
            title="Minimum Fotoğraf Sayısı"
            value={minPhotos}
            minimumValue={1}
            maximumValue={6}
            step={1}
            unit=""
            onValueChange={setMinPhotos}
          />
        </SettingsSection>

        {/* Preferred Languages */}
        <SettingsSection title="TERCİH EDİLEN DİLLER">
          {selectedLanguages.map((langCode) => (
            <SettingsItem
              key={langCode}
              title={getLanguageName(langCode)}
              showArrow={false}
              rightComponent={
                <TouchableOpacity
                  onPress={() => removeLanguage(langCode)}
                  style={styles.removeButton}
                >
                  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                    <Path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#F21D5B"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
              }
            />
          ))}
          
          <SettingsItem
            title="Dil Ekle..."
            showArrow={false}
            onPress={showLanguagePicker}
            leftIcon={
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path
                  d="M12 5V19M5 12H19"
                  stroke="#007AFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            }
          />
        </SettingsSection>

        {/* Premium Discovery */}
        <SettingsSection title="PREMİUM KEŞİF">
          <SettingsItem
            title="Minimum Fotoğraf Sayısı"
            subtitle="Tercihleriniz size uygun kişileri gösterir ancak göreceğiniz kişileri sınırlamaz"
            value={minPhotos.toString()}
            showArrow={false}
          />

          <SettingsItem
            title="Bio Olan"
            showArrow={false}
            rightComponent={
              <Switch
                value={false}
                onValueChange={() => {}}
                trackColor={{ false: '#3A3A3C', true: '#34C759' }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <SettingsItem
            title="İlgi Alanları"
            value="Seç"
            onPress={() => {
              Alert.alert('Bilgi', 'İlgi alanları seçme yakında eklenecek');
            }}
          />

          <SettingsItem
            title="Arıyor"
            value="Seç"
            onPress={() => {
              Alert.alert('Bilgi', 'Arıyor seçimi yakında eklenecek');
            }}
          />

          <SettingsItem
            title="Dil Ekle"
            value="Seç"
            onPress={showLanguagePicker}
          />
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection title="GİZLİLİK">
          <SettingsItem
            title="Çerez Politikası"
            onPress={() => {
              Alert.alert('Bilgi', 'Çerez politikası sayfası yakında eklenecek');
            }}
          />

          <SettingsItem
            title="Gizlilik Politikası"
            onPress={() => {
              Alert.alert('Bilgi', 'Gizlilik politikası sayfası yakında eklenecek');
            }}
          />

          <SettingsItem
            title="Gizlilik Tercihleri"
            onPress={() => {
              Alert.alert('Bilgi', 'Gizlilik tercihleri sayfası yakında eklenecek');
            }}
          />

          <SettingsItem
            title="Eşleşme Grubundan"
            onPress={() => {
              Alert.alert('Bilgi', 'Eşleşme grubu ayarları yakında eklenecek');
            }}
          />
        </SettingsSection>

        {/* Legal */}
        <SettingsSection title="YASAL">
          <SettingsItem
            title="Lisanslar"
            onPress={() => {
              Alert.alert('Bilgi', 'Lisanslar sayfası yakında eklenecek');
            }}
          />

          <SettingsItem
            title="Hizmet Şartları"
            onPress={() => {
              Alert.alert('Bilgi', 'Hizmet şartları sayfası yakında eklenecek');
            }}
          />
        </SettingsSection>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <StyledText style={styles.logoutText}>Çıkış Yap</StyledText>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
            <Path
              d="M24 4C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20S35.04 4 24 4z"
              fill="#F21D5B"
            />
          </Svg>
          <StyledText style={styles.versionText}>Versiyon 1.0.0</StyledText>
        </View>

        {/* Delete Account */}
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDeleteAccount}
        >
          <StyledText style={styles.deleteText}>Hesabı Sil</StyledText>
        </TouchableOpacity>
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
    backgroundColor: '#000',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  titleWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
  },
  removeButton: {
    padding: 4,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 30,
    paddingVertical: 16,
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  versionText: {
    fontSize: 15,
    color: '#8E8E93',
    marginTop: 8,
  },
  deleteButton: {
    marginHorizontal: 16,
    marginTop: 10,
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 17,
    color: '#F21D5B',
    fontWeight: '600',
  },
});

export default ProfileSettings;
