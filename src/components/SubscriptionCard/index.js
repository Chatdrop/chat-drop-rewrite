import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import StyledText from '../StyledText';
import LogoSVG from '../../assets/svg/logo.svg';

const SubscriptionCard = ({ 
  membershipType = 'premium', 
  features = [],
  price = '4,99',
  period = 'aylık',
  onPurchasePress 
}) => {
  const { colors } = useTheme();
  const { width: screenWidth } = useWindowDimensions();
  
  // Responsive değerler
  const scale = screenWidth / 375;
  const responsivePadding = Math.max(16, 20 * scale);
  const responsiveLogoSize = Math.max(24, 28 * scale);
  const responsiveLogoFontSize = Math.max(22, 26 * scale);
  const responsiveBadgePadding = Math.max(20, 24 * scale);
  const responsiveBadgeHeight = Math.max(8, 10 * scale);
  const responsiveTitleFontSize = Math.max(16, 18 * scale);
  const responsiveFeatureFontSize = Math.max(13, 14 * scale);
  const responsivePriceFontSize = Math.max(32, 40 * scale);

  // Üyelik türüne göre renk ve isim belirleme
  const getMembershipConfig = () => {
    switch (membershipType) {
      case 'premium':
        return {
          color: colors.primary,
          label: 'Premium'
        };
      case 'gold':
        return {
          color: '#FB7D1D',
          label: 'Gold'
        };
      case 'platinum':
        return {
          color: colors.lightGrey,
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
            <View style={[styles.iconContainer, { 
              backgroundColor: '#2F2F2F'
            }]}>
              <Text style={styles.iconText}>
                {feature.enabled ? '✓' : '✕'}
              </Text>
            </View>
            <StyledText style={[styles.featureText, { fontSize: responsiveFeatureFontSize }]}>
              {feature.text}
            </StyledText>
          </View>
        ))}
      </View>

      {/* Price */}
      <View style={styles.priceContainer}>
        <StyledText style={[styles.priceText, { fontSize: responsivePriceFontSize }]}>
          {price}$
        </StyledText>
        <StyledText style={[styles.periodText, { fontSize: responsiveFeatureFontSize }]}>
          / {period}
        </StyledText>
      </View>

      {/* Purchase Button */}
      <TouchableOpacity 
        style={styles.purchaseButton} 
        onPress={onPurchasePress}
        activeOpacity={0.8}
      >
        <StyledText style={styles.purchaseButtonText}>Hemen Al</StyledText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 36,
    minHeight: 240,
    width: '100%',
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
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 14,
  },
  featuresContainer: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  featureText: {
    color: '#FFFFFF',
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 16,
  },
  priceText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  periodText: {
    color: '#FFFFFF',
    marginLeft: 4,
  },
  purchaseButton: {
    backgroundColor: '#000000',
    paddingVertical: 16,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubscriptionCard;

