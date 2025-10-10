import { Button, Image, Text, View, TextInput } from "react-native";
import { StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused, useTheme, useNavigation } from "@react-navigation/native";
import StyledTextInput from "../../../../components/StyledTextInput";

// Components
import StringCard from "../../../../components/ProfileFormCards/StringCard";
import IntCard from "../../../../components/ProfileFormCards/IntCard";
import PhotosCard from "../../../../components/ProfileFormCards/PhotosCard";
import MetaCard from "../../../../components/ProfileFormCards/MetaCard";
import StyledText from "../../../../components/StyledText";
import TextButton from "../../../../components/TextButton";

// Filler data for the profile
const mockProfile = {
  first_name: "Emma",
  last_name: "Johnson", 
  birth_unixmill: new Date('1995-06-15').getTime(),
  photo_urls: [
    'https://picsum.photos/400/600?random=1',
    'https://picsum.photos/400/600?random=2', 
    'https://picsum.photos/400/600?random=3',
    'https://picsum.photos/400/600?random=4'
  ],
  content: "Merhaba! Ben Emma, fotoğrafçılık ve seyahat etmeyi seven biriyim. Yeni yerler keşfetmek ve farklı kültürlerle tanışmak beni heyecanlandırıyor. Boş zamanlarımda kitap okumayı ve doğa yürüyüşleri yapmayı seviyorum.",
  tagline: "Hayatı keşfetmek ve güzel anılar biriktirmek için buradayım!",
  motivation: [1, 3] // Mock selected motivation IDs
};

const mockMotivationChoices = [
  { uid: 1, name: "Arkadaşlık" },
  { uid: 2, name: "Romantik İlişki" },
  { uid: 3, name: "Sohbet" },
  { uid: 4, name: "Eğlence" }
];

const Chat_ui_profile = ({ route }) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => setModalVisible(!modalVisible);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [reportChecked, setReportChecked] = useState(false);
  const [reportText, setReportText] = useState('');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const formatDate = (unixMill) => {
    const date = new Date(unixMill);
    return date.toLocaleDateString('tr-TR');
  };

  const CustomCheckbox = ({ isChecked, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.checkboxBase, isChecked ? { backgroundColor: theme.colors.primary } : {}, style]}>
      {isChecked && <View style={styles.checkboxInner} />}
    </TouchableOpacity>
  );

  // Mock case - can be "chat", "swipe", or "map"
  const mockCase = "chat";

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
    headerSection: {
      height: 150,
      width: '100%',
      backgroundColor: theme.colors.card,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    coverPhoto: {
      width: '100%',
      height: '100%',
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    profileImageContainer: {
      position: 'absolute',
      bottom: -75,
      alignSelf: 'center',
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 3,
      borderColor: theme.colors.card,
      backgroundColor: theme.colors.primary,
      elevation: 4,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileImage: {
      width: '90%',
      height: '90%',
      borderRadius: 100,
    },
    infoSection: {
      width: '90%',
      marginTop: 85,
      paddingVertical: 15,
      backgroundColor: theme.colors.card,
      borderRadius: 30,
      alignItems: 'center',
      marginHorizontal: 0,
    },
    userName: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
    },
    userAge: {
      fontSize: 18,
      color: theme.colors.text + '80',
      marginTop: 6,
    },
    section: {
      width: '90%',
      marginHorizontal: 20,
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
    },
    modalView: {
      margin: 20,
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      padding: 35,
      justifyContent: "center",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
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
    checkboxBase: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      borderWidth: 2,
      backgroundColor: 'transparent',
      borderColor: "white"
    },
    checkboxInner: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
    input: {
      backgroundColor: theme.colors.card,
      color: "white",
      padding: 10,
      height: 100
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 10,
      backgroundColor: theme.colors.background,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.card,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  // Check if this is being used as a modal (has navigation.canGoBack())
  const isModal = navigation.canGoBack();

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {isModal && (
        <View style={styles.modalHeader}>
          <StyledText title2 bold>Profil</StyledText>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <StyledText bold style={{ fontSize: 18 }}>×</StyledText>
          </TouchableOpacity>
        </View>
      )}
      
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.container}>
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

        {/* Header Section */}
        <View style={styles.headerSection}>
          <Image
            style={styles.coverPhoto}
            source={{ uri: mockProfile.photo_urls[0] }}
          />
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: mockProfile.photo_urls[0] }}
            />
          </View>
        </View>

        {/* Profile Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.userName}>
            {`${mockProfile.first_name} ${mockProfile.last_name}`}
          </Text>
          <Text style={styles.userAge}>
            {`${new Date().getFullYear() - new Date(mockProfile.birth_unixmill).getFullYear()} yaşında`}
          </Text>
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

        {/* Fotoğraflar */}
        <View style={[styles.section, { padding: 20 }]}>
          <StyledText bold style={[{ marginBottom: 20 }]}>Fotoğraflar</StyledText>
          
          <View style={{ 
            width: '100%', 
            height: 400,
            position: 'relative',
            borderRadius: 20,
            overflow: 'hidden'
          }}>
            <Image
              source={{ uri: mockProfile.photo_urls[selectedPhotoIndex] }}
              style={{ 
                width: '100%', 
                height: '100%',
                borderRadius: 20
              }}
            />

            {/* Fotoğraf indikatörleri */}
            <View style={{ 
              position: 'absolute',
              top: 20,
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              gap: 10
            }}>
              {mockProfile.photo_urls.map((_, i) => (
                <View 
                  key={i}
                  style={{ 
                    flex: 1,
                    height: 5,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: i === selectedPhotoIndex ? 1 : 0.6
                  }} 
                />
              ))}
            </View>

            {/* Sağ/Sol dokunma alanları */}
            <View style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%',
              flexDirection: 'row'
            }}>
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

        {mockCase == "chat" && (
          <>
            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              paddingVertical: 10,
              marginTop: 5,
            }}>
              <TextButton padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content>Paylaş</StyledText>
              </TextButton>
            </View>

            <View style={{
              width: "90%",
              marginTop: 5,
            }}>
              <TextButton onPress={toggleModal} padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content>Kaldır</StyledText>
              </TextButton>
            </View>

            <View style={{
              width: "90%",
              marginHorizontal: '5%',
              paddingVertical: 10,
              marginTop: 5,
            }}>
              <TextButton onPress={() => setBlockModalVisible(true)} padding={10} height={45} backgroundColor={theme.colors.card}>
                <StyledText bold content color={theme.colors.primary}>Engelle</StyledText>
              </TextButton>
            </View>
          </>
        )}

        {(mockCase == "swipe" || mockCase == "map") && (
          <>
            {/* Additional buttons for swipe/map cases can be added here */}
          </>
        )}

        </View>
      </ScrollView>
    </View>
  );
};

export default Chat_ui_profile;