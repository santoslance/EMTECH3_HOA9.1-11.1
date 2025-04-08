import React from 'react';
import { View, StyleSheet } from 'react-native';
import Status from '../../components/Status';  // Ensure the correct path to Status component

export default function App() {
  return (
    <View style={styles.container}>
      {/* Render the Status component to check network connectivity */}
      <Status />
      
      {/* Other app components can be added here */}
      <View style={styles.content}></View>
      <View style={styles.inputMethodEditor}></View>
      <View style={styles.toolbar}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
  },
});
