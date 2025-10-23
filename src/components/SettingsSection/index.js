import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from '../StyledText';

const SettingsSection = ({ title, children }) => {
  return (
    <View style={styles.container}>
      {title && <StyledText style={styles.title}>{title}</StyledText>}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    backgroundColor: '#1C1C1E',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 16,
  },
});

export default SettingsSection;

