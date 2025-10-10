import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Permissions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Permissions</Text>
      <Text style={styles.subText}>App permissions management</Text>
      <Text style={styles.subText}>Manage app permissions and privacy</Text>
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

export default Permissions;
