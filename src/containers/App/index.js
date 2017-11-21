/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ImageBackground, Platform, StyleSheet, StatusBar, Text } from 'react-native';
import { Image, View } from 'react-native-animatable';
import backgroundImg from '../../images/bg.png';
import styles from './index.style';
import Button from 'apsl-react-native-button';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
      <ImageBackground source={backgroundImg} style={styles.container}>
        <StatusBar hidden={true} />
        <Text style={inlineStyle.welcome}>Velkommen til kjemia-appen!!!</Text>
        <Button>To get started, edit App.js</Button>
        <Text style={inlineStyle.instructions}>{instructions}</Text>
      </ImageBackground>
    );
  }
}

const inlineStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
