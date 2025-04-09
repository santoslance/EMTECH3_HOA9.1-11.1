import React from 'react';
import { Platform, StyleSheet, Text, View, Animated, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default class Status extends React.Component {
  state = {
    info: null,
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      this.setState({ info: state.type });
      this.updateMessageBubble(state.type);
      this.updateStatusBar(state.type);
    });

    this.subscription = NetInfo.addEventListener((state) => {
      this.setState({ info: state.type });
      this.updateMessageBubble(state.type);
      this.updateStatusBar(state.type);
    });
  }

  updateMessageBubble = (connectionType) => {
    const isConnected = connectionType !== 'none';
    Animated.timing(this.state.opacity, {
      toValue: isConnected ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  updateStatusBar = (connectionType) => {
    const isConnected = connectionType !== 'none';
    const backgroundColor = isConnected ? 'green' : 'red';
    const barStyle = isConnected ? 'dark-content' : 'light-content';

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(backgroundColor, true); // true for animated
    }
    StatusBar.setBarStyle(barStyle, true);
  };

  render() {
    const { info } = this.state;
    const isConnected = info !== 'none';

    return (
      <View style={styles.container}>
        <View style={styles.statusBarPlaceholder} />
        <View style={styles.messageContainer} pointerEvents="none">
          <Animated.View
            style={[
              styles.bubble,
              {
                opacity: this.state.opacity,
                backgroundColor: isConnected ? 'white' : 'red',
              },
            ]}
          >
            <Text style={styles.text}>
              {isConnected
                ? 'Connected to the network'
                : 'Disconnected from the network'}
            </Text>
          </Animated.View>
        </View>
      </View>
    );
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  statusBarPlaceholder: {
    height: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    backgroundColor: 'transparent',
  },
  messageContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight + 40,
    left: 0,
    right: 0,
    height: 80,
    alignItems: 'center',
    zIndex: 1,
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    color: 'white',
  },
});
