import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import StyledText from '../StyledText';
import Svg, { Path } from 'react-native-svg';

const SettingsItem = ({ 
  title, 
  subtitle, 
  value, 
  onPress, 
  showArrow = true,
  leftIcon = null,
  rightComponent = null
}) => {
  const content = (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <View style={styles.textContainer}>
          <StyledText style={styles.title}>{title}</StyledText>
          {subtitle && <StyledText style={styles.subtitle}>{subtitle}</StyledText>}
        </View>
      </View>
      
      <View style={styles.rightContent}>
        {rightComponent ? (
          rightComponent
        ) : (
          <>
            {value && <StyledText style={styles.value}>{value}</StyledText>}
            {showArrow && (
              <Svg width={10} height={16} viewBox="0 0 10 16" fill="none">
                <Path
                  d="M1 1L8 8L1 15"
                  stroke="#8E8E93"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            )}
          </>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#1C1C1E',
    borderBottomWidth: 0.5,
    borderBottomColor: '#38383A',
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  value: {
    fontSize: 17,
    color: '#8E8E93',
  },
});

export default SettingsItem;

