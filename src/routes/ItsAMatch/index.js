import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ImageBackground, 
  Image, 
  TouchableOpacity,
  Platform,
  useWindowDimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LogoSVG from '../../assets/svg/logo.svg';

const ItsAMatch = ({ route, navigation }) => {
  const { matchedUser } = route?.params || {};
  const userPhoto = matchedUser?.photos?.[0] || null;
  const userName = matchedUser?.name || 'kullanıcı';
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  const handleConfirm = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Arka plan görseli (koyu) */}
      {userPhoto && (
        <ImageBackground
          source={{ uri: userPhoto }}
          style={[styles.backgroundImage, { width, height }]}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      )}

      {/* Üst kısım - Logo */}
      <View style={[styles.header, { paddingTop: insets.top + (Platform.OS === 'ios' ? 20 : 30) }]}>
        <LogoSVG width={32} height={32} />
        <Text style={styles.logoText}>Chat Drop</Text>
      </View>

      {/* IT'S A MATCH görseli */}
      <View style={styles.matchImageContainer}>
        <Image
          source={require('../../assets/png/ITsAMATCH.png')}
          style={[styles.matchImage, { width: width * 0.9 }]}
          resizeMode="contain"
        />
      </View>

      {/* Alt kısım - Profil ve Confirm */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 60 }]}>
        {/* Yuvarlak profil fotoğrafı */}
        <View style={styles.profileContainer}>
          {userPhoto ? (
            <Image
              source={{ uri: userPhoto }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileImagePlaceholder} />
          )}
        </View>

        {/* Beyaz kart */}
        <View style={[styles.card, { width: width * 0.85 }]}>
          <Text style={styles.cardText}>
            You're sending {userName} 🖐
          </Text>
          
          {/* Confirm butonu - kartın içinde */}
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    opacity: 0.88,
    gap: 10,
  },
  logoText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  matchImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  matchImage: {
    height: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSection: {
    alignItems: 'center',
  },
  profileContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'rgba(212, 212, 212, 0.81)',
    overflow: 'hidden',
    marginBottom: -70,
    zIndex: 10,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 30,
    paddingTop: 95,
    paddingBottom: 0,
    paddingHorizontal: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: 40,
    paddingBottom: 25,
  },
  confirmButton: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.84)',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1,
  },
});

export default ItsAMatch;
