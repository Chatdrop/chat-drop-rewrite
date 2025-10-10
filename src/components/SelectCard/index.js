import React from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import StyledText from '../StyledText';

const SelectCard = ({ height, backgroundColor, src, text, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={[
        styles.card,
        { height, backgroundColor: src ? 'transparent' : backgroundColor || '#000' },
        isSelected && styles.selectedCardBorder
      ]}
    >
      {src ? (
        <ImageBackground source={src} style={[styles.imageBackground, { height }]} imageStyle={styles.imageBackgroundStyle}>
          <CardContent text={text} isSelected={isSelected} />
        </ImageBackground>
      ) : (
        <CardContent text={text} isSelected={isSelected} />
      )}
    </TouchableOpacity>
  );
};

const CardContent = ({ text, isSelected }) => (
  <View style={styles.content}>
    <StyledText style={[styles.text, isSelected && styles.selectedText]}>
      {text}
    </StyledText>
    
    {isSelected && (
      <View style={styles.checkboxContainer}>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    borderWidth:2,
    width: '100%',
  },
  selectedCardBorder: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 24,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  imageBackgroundStyle: {
    resizeMode: 'cover',
    borderRadius: 24,
  },
  content: {
    position: 'absolute',
    bottom: 25,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#9A9A9A',
    fontSize: 24,
  },
  selectedText: {
    color: '#fff',
  },
  checkboxContainer: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default SelectCard;
