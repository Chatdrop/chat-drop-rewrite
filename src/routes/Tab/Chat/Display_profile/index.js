import { Image, View, Dimensions } from "react-native";
import { StyleSheet, ScrollView, TouchableOpacity, Modal, Platform } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused, useTheme, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSnapshot } from 'valtio';
import { appStore } from '../../../../stores/app_store';
import StyledTextInput from "../../../../components/StyledTextInput";
import { styleConstants } from '../../../../config/styleConstants';
import Svg, { Path } from 'react-native-svg';

// Components
import StringCard from "../../../../components/ProfileFormCards/StringCard";
import MetaCard from "../../../../components/ProfileFormCards/MetaCard";
import StyledText from "../../../../components/StyledText";
import TextButton from "../../../../components/TextButton";
import RoundButton from "../../../../components/RoundButton";

// Icons
import XIcon from "../../../../assets/svg/x.svg";
import LikeIcon from "../../../../assets/svg/like.svg";
import ChatIcon from "../../../../assets/svg/chat.svg";
import ThunderIcon from "../../../../assets/icons/thunder.png";
import StarIcon from "../../../../assets/icons/star.png";

// Icon components
const ThunderIconComponent = () => (
  <Image source={ThunderIcon} style={{width: 28, height: 28, tintColor: 'white'}} />
);

const StarIconComponent = () => (
  <Image source={StarIcon} style={{width: 28, height: 28, tintColor: 'white'}} />
);

// Filler data for the profile
const mockProfile = {
  first_name: "Kate",
  birth_unixmill: new Date('1991-06-15').getTime(),
  location: "Istanbul, Turkey",
  lastSeen: "3h ago",
  distance: "20m",
  matchPercentage: 89,
  isPremium: false, // Premium status
  photo_urls: [
    'https://picsum.photos/400/600?random=1',
    'https://picsum.photos/400/600?random=2', 
    'https://picsum.photos/400/600?random=3',
    'https://picsum.photos/400/600?random=4'
  ],
  content: "Merhaba! Ben Emma, fotoğrafçılık ve seyahat etmeyi seven biriyim. Yeni yerler keşfetmek ve farklı kültürlerle tanışmak beni heyecanlandırıyor. Boş zamanlarımda kitap okumayı ve doğa yürüyüşleri yapmayı seviyorum.",
  tagline: "Hayatı keşfetmek ve güzel anılar biriktirmek için buradayım!",
  whoAmI: "I am a software engineer",
  profession: "Yazılım Mühendisi",
  workplace: "Tech Company A.Ş.",
  school: "İstanbul Teknik Üniversitesi",
  motivation: [1, 3] // Mock selected motivation IDs
};

const mockMotivationChoices = [
  { uid: 1, name: "Arkadaşlık" },
  { uid: 2, name: "Romantik İlişki" },
  { uid: 3, name: "Sohbet" },
  { uid: 4, name: "Eğlence" }
];

const CustomCheckbox = ({ isChecked, onPress, style, theme }) => (
  <TouchableOpacity 
    onPress={onPress} 
    style={[
      {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 2,
        backgroundColor: 'transparent',
        borderColor: "white"
      },
      isChecked ? { backgroundColor: theme.colors.primary } : {}, 
      style
    ]}
  >
    {isChecked && (
      <View style={{
        width: 12,
        height: 12,
        borderRadius: 6,
      }} />
    )}
  </TouchableOpacity>
);

const Chat_ui_profile = ({ route }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation();
  const appSnap = useSnapshot(appStore);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportChecked, setReportChecked] = useState(false);
  const [reportText, setReportText] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const color = () => (appSnap.isVisible ? theme.colors.onlineGreen : theme.colors.offlineRed);

  const formatDate = (unixMill) => {
    const date = new Date(unixMill);
    return date.toLocaleDateString('tr-TR');
  };

  const calculateAge = (birthUnixMill) => {
    const today = new Date();
    const birthDate = new Date(birthUnixMill);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Mock case - can be "chat", "swipe", or "map"
  const mockCase = "swipe";

  const focus = useIsFocused();

  useEffect(() => {
    if (!focus) {
      return;
    }
  }, [focus]);

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: "center",
      paddingBottom: 20,
    },
    header: {
      paddingBottom: 12,
      paddingTop: insets.top - 20,
      paddingHorizontal: styleConstants.padding,
      backgroundColor: theme.colors.background,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: Platform.OS === "android" ? 15 : -5,
    },
    headerButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      borderColor: color(),
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2.5,
    },
    profileCircle: {
      width: 33,
      height: 33,
      borderRadius: 16.5,
      backgroundColor: theme.colors.primary,
    },
    photosContainer: {
      width: `${100 - (2 * styleConstants.padding / Dimensions.get('window').width * 100)}%`,
      height: Platform.OS === 'ios' ? 500 : 480,
      position: 'relative',
      marginHorizontal: styleConstants.padding,
      marginTop: 10,
      borderRadius: 30,
      overflow: 'hidden',
    },
    photoImage: {
      width: '100%',
      height: '100%',
      borderRadius: 30,
    },
    photoIndicators: {
      position: 'absolute',
      top: 20,
      width: '90%',
      alignSelf: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    indicator: {
      flex: 1,
      height: 5,
      backgroundColor: 'white',
      borderRadius: 10,
    },
    photoTouchAreas: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      flexDirection: 'row',
    },
    profileInfoHeader: {
      width: '100%',
      paddingHorizontal: styleConstants.padding,
      paddingTop: Platform.OS === 'ios' ? 10 : 15,
      paddingBottom: 15,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    leftInfoSection: {
      flex: 1,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Platform.OS === 'ios' ? 8 : 6,
      flexWrap: 'wrap',
      gap: Platform.OS === 'ios' ? 10 : 8,
    },
    nameText: {
      fontSize: Platform.OS === 'ios' ? 28 : 26,
      fontWeight: 'bold',
      color: 'white',
    },
    lastSeenPill: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 18,
    },
    lastSeenText: {
      fontSize: 13,
      fontWeight: '600',
      color: 'white',
    },
    locationText: {
      fontSize: 15,
      color: theme.colors.text + 'CC',
    },
    rightInfoSection: {
      alignItems: 'flex-end',
      gap: 10,
    },
    distanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    distanceText: {
      fontSize: 13,
      color: 'white',
    },
    locationIcon: {
      marginLeft: 2,
    },
    matchButton: {
      borderWidth: 0.3,
      borderColor: 'white',
      borderRadius: 22,
      paddingHorizontal: 18,
      paddingVertical: 6,
    },
    matchText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: 'white',
    },
    section: {
      width: `${100 - (2 * styleConstants.padding / Dimensions.get('window').width * 100)}%`,
      marginHorizontal: styleConstants.padding,
      paddingVertical: 10,
      backgroundColor: theme.colors.card,
      marginTop: 20,
      borderRadius: 30,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.colors.text,
    },
    sectionText: {
      fontSize: 16,
      color: theme.colors.text + 'CC',
      lineHeight: 24,
    },
    detailItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border + '40',
    },
    detailLabel: {
      fontSize: 16,
      color: theme.colors.text + '99',
    },
    detailValue: {
      fontSize: 16,
      color: theme.colors.text,
      fontWeight: '500',
    },
    outerModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.9)',
      height: '100%',
    },
    modalView: {
      margin: 0,
      backgroundColor: theme.colors.background,
      borderRadius: 0,
      padding: 35,
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,

    },
    modalText: {
      marginBottom: 30,
      textAlign: "center"
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: "100%",
      gap: 20,
    },
    input: {
      backgroundColor: theme.colors.card,
      color: "white",
      padding: 10,
      height: 100
    },
    swipeButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: styleConstants.padding,
      paddingVertical: 20,
      gap: 15,
      marginTop: 10,
      marginBottom: 10,
    },
    premiumCard: {
      backgroundColor: '#E8336C',
      borderRadius: 36,
      padding: 30,
      height: 300,
      width: `${100 - (2 * styleConstants.padding / Dimensions.get('window').width * 100)}%`,
      marginHorizontal: styleConstants.padding,
      marginTop: 20,
      justifyContent: 'space-between',
    },
    premiumIconCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
    },
    premiumTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 10,
    },
    premiumSubtitle: {
      fontSize: 15,
      color: 'white',
      lineHeight: 22,
      marginBottom: 15,
    },
    premiumButton: {
      backgroundColor: '#000000',
      borderRadius: 25,
      paddingVertical: 15,
      alignItems: 'center',
    },
    premiumButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    }
  });

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.headerButton}
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

          {/* Profile Button */}
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate('ProfileStack', { screen: 'ProfileMain' })}
          >
            <View style={styles.profileCircle} />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Modals */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.outerModal}>
          <View style={styles.modalView}>
            <StyledText title2 bold style={styles.modalText}>
              Eşleşmeyi Sonlandırmak İstediğinizden Emin Misiniz?
            </StyledText>
            <View style={styles.modalButtons}>
              <TextButton 
                flex={1} 
                onPress={() => {toggleModal(); /* Handle Yes */}} 
                padding={10} 
                backgroundColor={theme.colors.primary}
              >
                <StyledText bold> Evet</StyledText>
              </TextButton>
              <TextButton 
                flex={1} 
                onPress={() => {toggleModal(); /* Handle No */}} 
                padding={10} 
                backgroundColor={theme.colors.card}
              >
                <StyledText bold>Hayır</StyledText>
              </TextButton>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={blockModalVisible}
        onRequestClose={() => setBlockModalVisible(false)}
      >
        <View style={styles.outerModal}>
          <View style={styles.modalView}>
            <StyledText title2 bold style={styles.modalText}>
              Kullanıcıyı Engellemek Üzeresiniz
            </StyledText>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
              <CustomCheckbox 
                isChecked={reportChecked} 
                onPress={() => setReportChecked(!reportChecked)}
                theme={theme}
              />
              <StyledText bold color={"white"} style={{ marginLeft: 10 }}>
                Şikayet etmek ister misiniz?
              </StyledText>
            </View>
            {reportChecked && (
              <View style={{marginTop: 30}}>
                <StyledTextInput
                  style={styles.input}
                  onChangeText={setReportText}
                  value={reportText}
                  placeholder="Şikayetiniz Nedir?"
                />
              </View>
            )}
            <View style={[styles.modalButtons, {marginTop: 35}]}>
              <TextButton 
                flex={1} 
                onPress={() => {setBlockModalVisible(false); /* Handle Yes */}} 
                padding={10} 
                backgroundColor={theme.colors.primary}
              >
                <StyledText bold> Evet</StyledText>
              </TextButton>
              <TextButton 
                flex={1} 
                onPress={() => {setBlockModalVisible(false); /* Handle No */}} 
                padding={10} 
                backgroundColor={theme.colors.card}
              >
                <StyledText bold>Hayır</StyledText>
              </TextButton>
            </View>
          </View>
        </View>
      </Modal>

      {/* Report Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={reportModalVisible}
        onRequestClose={() => setReportModalVisible(false)}
      >
        <View style={styles.outerModal}>
          <View style={styles.modalView}>
            <StyledText title2 bold style={styles.modalText}>
              Kullanıcıyı Şikayet Et
            </StyledText>
            <View style={{marginTop: 10}}>
              <StyledTextInput
                style={styles.input}
                onChangeText={setReportText}
                value={reportText}
                placeholder="Şikayetiniz Nedir?"
              />
            </View>
            <View style={[styles.modalButtons, {marginTop: 35}]}>
              <TextButton 
                flex={1} 
                onPress={() => {
                  setReportModalVisible(false);
                  setReportText('');
                  /* Handle Report Submit */
                }} 
                padding={10} 
                backgroundColor={theme.colors.primary}
              >
                <StyledText bold>Gönder</StyledText>
              </TextButton>
              <TextButton 
                flex={1} 
                onPress={() => {
                  setReportModalVisible(false);
                  setReportText('');
                }} 
                padding={10} 
                backgroundColor={theme.colors.card}
              >
                <StyledText bold>İptal</StyledText>
              </TextButton>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.container}>

        {/* Profile Info Header */}
        <View style={styles.profileInfoHeader}>
          <View style={styles.leftInfoSection}>
            <View style={styles.nameRow}>
              <StyledText style={styles.nameText}>
                {mockProfile.first_name}, {calculateAge(mockProfile.birth_unixmill)}
              </StyledText>
              <View style={styles.lastSeenPill}>
                <StyledText style={styles.lastSeenText}>Seen {mockProfile.lastSeen}</StyledText>
              </View>
            </View>
            <StyledText style={styles.locationText}>{mockProfile.location}</StyledText>
          </View>

          <View style={styles.rightInfoSection}>
            <View style={styles.distanceRow}>
              <StyledText style={styles.distanceText}>{mockProfile.distance} Uzaklıkta</StyledText>
              <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" style={styles.locationIcon}>
                <Path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="white"
                />
              </Svg>
            </View>
            <View style={styles.matchButton}>
              <StyledText style={styles.matchText}>%{mockProfile.matchPercentage} Matched</StyledText>
            </View>
          </View>
        </View>

        {/* Fotoğraflar */}
        <View style={styles.photosContainer}>
          <Image
            source={{ uri: mockProfile.photo_urls[selectedPhotoIndex] }}
            style={styles.photoImage}
          />

          {/* Fotoğraf indikatörleri */}
          <View style={styles.photoIndicators}>
            {mockProfile.photo_urls.map((_, i) => (
              <View 
                key={i}
                style={[
                  styles.indicator,
                  { opacity: i === selectedPhotoIndex ? 1 : 0.6 }
                ]} 
              />
            ))}
          </View>

          {/* Sağ/Sol dokunma alanları */}
          <View style={styles.photoTouchAreas}>
            <TouchableOpacity 
              activeOpacity={1}
              style={{ flex: 1 }}
              onPress={() => {
                setSelectedPhotoIndex(prev => 
                  prev === 0 
                    ? mockProfile.photo_urls.length - 1 
                    : prev - 1
                );
              }}
            />
            <TouchableOpacity 
              activeOpacity={1}
              style={{ flex: 1 }}
              onPress={() => {
                setSelectedPhotoIndex(prev => 
                  prev === mockProfile.photo_urls.length - 1 
                    ? 0 
                    : prev + 1
                );
              }}
            />
          </View>
        </View>

        {/* Hakkımda (String) */}
        <View style={styles.section}>
          <StringCard
            title="Hakkımda"
            value={mockProfile.content}
            onChangeText={(t) => { /* Stub function */ }}
            placeholder="Hakkımda"
            editable={false}
          />
        </View>

        {/* Amacım (String) */}
        <View style={styles.section}>
          <StringCard
            title="Amacım"
            value={mockProfile.tagline}
            onChangeText={(t) => { /* Stub function */ }}
            placeholder="Amacım"
            editable={false}
          />
        </View>

        {/* Meslek (String) */}
        <View style={styles.section}>
          <StringCard
            title="Meslek"
            value={mockProfile.profession}
            onChangeText={(t) => { /* Stub function */ }}
            placeholder="Meslek"
            editable={false}
          />
        </View>

        {/* Premium Card - Only show if user is not premium */}
        {!mockProfile.isPremium && (
          <View style={styles.premiumCard}>
            <View style={styles.premiumIconCircle}>
              <Image source={ThunderIcon} style={{width: 32, height: 32, tintColor: 'white'}} />
            </View>
            
            <StyledText style={styles.premiumTitle}>
              Premium alın, hızlı bağlantı kurun!
            </StyledText>
            
            <StyledText style={styles.premiumSubtitle}>
              Premium ile sınırsız beğeni, yorum ve mesajlaşmaya başlayın!
            </StyledText>
            
            <TouchableOpacity 
              style={styles.premiumButton}
              onPress={() => {
                navigation.navigate('ProfileStack', { screen: 'SubscriptionFeatures' });
              }}
            >
              <StyledText style={styles.premiumButtonText}>Premium'a Geçin</StyledText>
            </TouchableOpacity>
          </View>
        )}

        {/* Çalıştığı Yer (String) */}
        <View style={styles.section}>
          <StringCard
            title="Çalıştığı Yer"
            value={mockProfile.workplace}
            onChangeText={(t) => { /* Stub function */ }}
            placeholder="Çalıştığı Yer"
            editable={false}
          />
        </View>

        {/* Okul (String) */}
        <View style={styles.section}>
          <StringCard
            title="Okul"
            value={mockProfile.school}
            onChangeText={(t) => { /* Stub function */ }}
            placeholder="Okul"
            editable={false}
          />
        </View>

        {/* Doğum Tarihi (String) */}
        <View style={styles.section}>
          <StringCard
            title="Doğum Tarihi"
            value={formatDate(mockProfile.birth_unixmill)}
            onChangeText={(t) => { /* Stub function */ }}
            placeholder="Doğum Tarihi"
            editable={false}
          />
        </View>

        {/* İlgi Alanı (MetaCard) */}
        <View style={styles.section}>
          <MetaCard
            title="İlgi Alanı"
            value={mockProfile.motivation}
            onChange={(selectedItems) => { /* Stub function */ }}
            choices={mockMotivationChoices}
            is_multi={true}
            editable={false}
          />
        </View>

        {mockCase === "chat" && (
          <>
            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              marginTop: 15,
            }}>
              <TextButton padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content>Paylaş</StyledText>
              </TextButton>
            </View>

            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              marginTop: 10,
            }}>
              <TextButton onPress={toggleModal} padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content>Kaldır</StyledText>
              </TextButton>
            </View>

            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              marginTop: 10,
            }}>
              <TextButton onPress={() => setBlockModalVisible(true)} padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content color={theme.colors.primary}>Engelle</StyledText>
              </TextButton>
            </View>

            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              marginTop: 10,
              marginBottom: 20,
            }}>
              <TextButton onPress={() => setReportModalVisible(true)} padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content color={theme.colors.primary}>Raporla</StyledText>
              </TextButton>
            </View>
          </>
        )}

        {(mockCase === "swipe" || mockCase === "map") && (
          <>
            {/* Additional Action Buttons */}
            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              marginTop: 15,
            }}>
              <TextButton padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content>Paylaş</StyledText>
              </TextButton>
            </View>

            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              marginTop: 10,
            }}>
              <TextButton onPress={() => setBlockModalVisible(true)} padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content color={theme.colors.primary}>Engelle</StyledText>
              </TextButton>
            </View>

            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              marginTop: 10,
            }}>
              <TextButton onPress={() => setReportModalVisible(true)} padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content color={theme.colors.primary}>Raporla</StyledText>
              </TextButton>
            </View>

            {/* Swipe Action Buttons */}
            <View style={styles.swipeButtonsContainer}>
              <RoundButton 
                Icon={ThunderIconComponent} 
                size={56} 
                iconSize={28} 
                backgroundColor='#F21D5B' 
                borderWidth={0}
                onPress={() => console.log('Super Like pressed')}
              />
              <RoundButton 
                Icon={LikeIcon} 
                size={56} 
                iconSize={56} 
                backgroundColor='#FFFFFF' 
                color="black"
                borderWidth={0}
                onPress={() => console.log('Like pressed')}
              />
              <RoundButton 
                size={38} 
                iconSize={16} 
                backgroundColor='transparent' 
                Icon={XIcon}
                borderWidth={1.5}
                borderColor='white'
                onPress={() => console.log('Pass pressed')}
              />
              <RoundButton 
                Icon={ChatIcon} 
                size={56} 
                backgroundColor='white' 
                iconSize={56} 
                color="black"
                borderWidth={0}
                onPress={() => console.log('Chat pressed')}
              />
              <RoundButton 
                Icon={StarIconComponent} 
                size={56} 
                backgroundColor='black' 
                iconSize={28}
                borderWidth={0}
                onPress={() => console.log('Star pressed')}
              />
            </View>
          </>
        )}

        </View>
      </ScrollView>
    </View>
  );
};

export default Chat_ui_profile;