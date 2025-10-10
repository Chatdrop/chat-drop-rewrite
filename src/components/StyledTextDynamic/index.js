import React from 'react';
import { View, StyleSheet } from 'react-native';
import StyledText from '../StyledText';

const StyledTextDynamic = ({ text, style }) => {
  const splitText = (text) => {
    let lines = "";

    if(text.includes('\\n')) {
      lines = text.split('\\n');
    } else {
      lines = text.split("\n");
    }

    if (lines.length >= 2) {
      return lines;
    }
    return [text];
  };

  const renderText = (text) => {
    const lines = splitText(text);

    if (lines.length === 1) {
      return <StyledText bold style={[style, {fontSize:35, fontWeight: 'bold'}]}>{text}</StyledText>;
    }

    if (lines.length === 2) {
      return (
        <>
          <StyledText style={[style, {fontSize:35, marginBottom:0, fontWeight: "normal"}]}>{lines[0]}</StyledText>
          <StyledText bold style={[style, {fontSize:35, fontWeight: 'bold', letterSpacing: 0.7}]}>{lines[1]}</StyledText>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderText(text)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  }
});

export default StyledTextDynamic;
