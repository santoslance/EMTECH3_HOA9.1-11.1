// Messageutils.js

export const createTextMessage = (text) => ({
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Unique ID based on timestamp and random number
    type: 'text',
    text,
  });
  
  export const createImageMessage = (uri) => ({
    id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Unique ID based on timestamp and random number
    type: 'image',
    uri,
  });

  export const createLocationMessage = (latitude, longitude) => {
    const locationText = `Latitude: ${latitude}, Longitude: ${longitude}`;
    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;  // Google Maps URL

    return {
        id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: 'location',
        text: locationText,
        mapLink,  // Store the map link to open the location in Google Maps
    };
};

  
  // Sample predefined messages
  export const createSampleMessages = () => [
    createTextMessage('Hello'), // Sample text
    createTextMessage('World'), // Another sample text
    createImageMessage('https://unsplash.it/300/300'), // Corrected image path
  ];
  