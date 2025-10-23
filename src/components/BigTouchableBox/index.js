import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import StyledText from '../StyledText';
import LogoSVG from '../../assets/svg/logo.svg';

const BigTouchableBox = ({ membershipType = 'premium', features = [], onSeeAllPress }) => {
  const { colors } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  
  // Responsive değerler
  const scale = screenWidth / 375; // iPhone 11 Pro bazlı ölçekleme
  const responsivePadding = Math.max(16, 20 * scale);
  const responsiveLogoSize = Math.max(24, 28 * scale);
  const responsiveLogoFontSize = Math.max(22, 26 * scale);
  const responsiveBadgePadding = Math.max(32, 40 * scale);
  const responsiveBadgeHeight = Math.max(12, 16 * scale);
  const responsiveTitleFontSize = Math.max(16, 18 * scale);
  const responsiveFeatureFontSize = Math.max(13, 14 * scale);

  // Üyelik türüne göre renk ve isim belirleme
  const getMembershipConfig = () => {
    switch (membershipType) {
      case 'premium':
        return {
          color: colors.primary, // #F21D5B
          label: 'Premium'
        };
      case 'gold':
        return {
          color: '#FB7D1D',
          label: 'Gold'
        };
      case 'platinum':
        return {
          color: colors.lightGrey, // #9A9A9A
          label: 'Platinum'
        };
      default:
        return {
          color: colors.primary,
          label: 'Premium'
        };
    }
  };

  const config = getMembershipConfig();

  return (
    <View style={[styles.container, { 
      backgroundColor: config.color,
      padding: responsivePadding
    }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <LogoSVG width={responsiveLogoSize} height={responsiveLogoSize} style={styles.logoIcon} />
          <StyledText style={[styles.logoText, { fontSize: responsiveLogoFontSize }]}>Chat Drop</StyledText>
        </View>
        <View style={[styles.badge, {
          paddingHorizontal: responsiveBadgePadding,
          paddingVertical: responsiveBadgeHeight
        }]}>
          <StyledText style={styles.badgeText}>{config.label}</StyledText>
        </View>
      </View>

      {/* Title */}
      <StyledText style={[styles.title, { fontSize: responsiveTitleFontSize }]}>Neleri içeriyor?</StyledText>

      {/* Features List */}
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
            <StyledText style={[styles.featureText, { fontSize: responsiveFeatureFontSize }]}>{feature}</StyledText>
          </View>
        ))}
      </View>

      {/* See All Features Button - Sadece bu kısım tıklanabilir */}
      <TouchableOpacity 
        style={styles.seeAllButton} 
        onPress={onSeeAllPress}
        activeOpacity={0.7}
      >
        <StyledText style={[styles.seeAllText, { fontSize: responsiveFeatureFontSize }]}>See All Features</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 36,
    marginTop: 20,
    minHeight: 240,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 6,
  },
  logoText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
  },
  badgeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  featuresContainer: {
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2F2F2F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#FFFFFF',
    flex: 1,
  },
  seeAllButton: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 0,
  },
  seeAllText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default BigTouchableBox;