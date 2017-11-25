/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, Text, LayoutAnimation, Linking } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
import audioService from '../../services/audio';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToHome: allStores.router.navigateToHome,
  score: allStores.game.score,
}))
@observer
export default class Home extends Component {
  _headerRef;
  _bodyRef;

  state = {
    hasHeaderAppeared: false,
    hasPressedButton: false,
  };

  componentDidMount() {
    if (this._headerRef) {
      this._headerRef.fadeInRight(1000).then(() => {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
        audioService.initSounds();
      });
    }
  }

  _handleBackPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToHome();
  };
  _handleReplayPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToPlayground();
  };


  _handleOpenKjemia = async () => {
    Linking.openURL('http://kjemia.no');
  };

  render() {
    const { hasHeaderAppeared, hasPressedButton } = this.state;
    return (
      <View style={style.body}>
        <StatusBar hidden={true} />
        <View
          ref={ref => {
            this._headerRef = ref;
          }}
        >
          <Text style={style.header}>Din score {this.props.score}</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <Button style={style.button} onPressOut={this._handleBackPress}>
              <Text style={style.buttonText}>Tilbake til start</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleReplayPress}>
              <Text style={style.buttonText}>spill igjen</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleOpenKjemia}>
              <Text style={style.buttonText}>Bestill time på Kjemia.no</Text>
            </Button>
          </View>
        )}
      </View>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
