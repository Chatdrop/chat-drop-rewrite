import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import StyledText from '../StyledText';

const SmallTouchableBox = ({ icon, title, onPress, width }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.card, width }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
        {icon}
      </View>
      
      <StyledText style={styles.title} weight="bold">
        {title}
      </StyledText>
      
      <StyledText style={styles.buyText}>
        Satın Al
      </StyledText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 24,
    padding: 12,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    textAlign: 'left',
  },
  buyText: {
    fontSize: 12,
    opacity: 0.7,
    fontWeight: '400',
  },
});

export default SmallTouchableBox;

