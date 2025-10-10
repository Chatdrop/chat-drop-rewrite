import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AccountSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account Settings</Text>
      <Text style={styles.subText}>Account management</Text>
      <Text style={styles.subText}>Manage account details and security</Text>
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

export default AccountSettings;
