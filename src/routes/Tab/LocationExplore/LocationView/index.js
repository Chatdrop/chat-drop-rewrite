import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LocationView = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Location View</Text>
      <Text style={styles.subText}>Map-based interface</Text>
      <Text style={styles.subText}>Filter/Sort modals available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default LocationView;
