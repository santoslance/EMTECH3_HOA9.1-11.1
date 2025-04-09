import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert, Image, Modal, StatusBar, Text, TouchableOpacity } from 'react-native';
import Status from '../../components/Status';
import Toolbar from '../../components/Toolbar';
import { createSampleMessages, createTextMessage, createImageMessage, createLocationMessage } from '../../components/Messageutils';

export default function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [messages, setMessages] = useState([]);  // Initialize with an empty array (no messages)
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePressCamera = () => {
    const imageUri = "https://unsplash.it/300/300"; // You can replace with any image URI
    const newImageMessage = createImageMessage(imageUri);

    setMessages((prevMessages) => {
      return [...prevMessages, newImageMessage];  // Add the new image message to the end of the list
    });

    Alert.alert("Camera", "New image displayed!");
  };

  const handlePressLocation = () => {
    // Create a new location message with predefined coordinates
    const newMessage = createLocationMessage(37.78825, -122.4324);
  
    setMessages((prevMessages) => [
      ...prevMessages,  // Keep existing messages
      newMessage,  // Add the new message at the end of the array
    ]);
  
    setIsFocused(false);
  };

  const handleChangeFocus = (focused) => {
    setIsFocused(focused);
  };

  const handleSubmit = (newMessage) => {
    if (newMessage.trim()) {
      const newTextMessage = createTextMessage(newMessage); 
      setMessages((prevMessages) => [
        ...prevMessages,  
        newTextMessage,   
      ]);
    } else {
      Alert.alert("Please enter a message!");
    }
  };

  const handleImagePress = (uri) => {
    setSelectedImage(uri);
    setIsImageModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsImageModalVisible(false);
    setSelectedImage(null);
  };

  const renderMessage = ({ item }) => {
    return (
      <View style={[styles.messageContainer, item.type === 'text' && styles.textMessage]}>
        {item.type === 'text' && (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        {item.type === 'location' && (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>
              Location: {item.text}
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.mapLink)}>
              <Text style={styles.mapLink}>Open in Google Maps</Text>
            </TouchableOpacity>
          </View>
        )}
        {item.type === 'image' && (
          <TouchableOpacity onPress={() => handleImagePress(item.uri)}>
            <Image
              source={{ uri: item.uri }}
              style={styles.imageMessage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      </View>
    );
};


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Status />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMessage}
      />

      <Modal visible={isImageModalVisible} transparent={true} animationType="fade" onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalOverlay} onPress={handleCloseModal} />
          <View style={styles.modalContent}>
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} resizeMode="contain" />
          </View>
        </View>
      </Modal>

      <Toolbar
        isFocused={isFocused}
        onPressCamera={handlePressCamera}
        onPressLocation={handlePressLocation}
        onChangeFocus={handleChangeFocus}
        onSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 5,
    marginBottom: 0.5,
    justifyContent: 'flex-end',
  },
  textMessage: {
    alignSelf: 'flex-end',
  },
  messageBubble: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  imageWrapper: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  imageMessage: {
    width: 300,
    height: 300,
    borderRadius: 1,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  fullScreenImage: {
    width: 300,
    height: 300,
    borderRadius: 5,
  },
});
