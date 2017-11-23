/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, Text, LayoutAnimation } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame,
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
      this._headerRef.bounceInRight(1000).then(() => {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
      });
    }
  }

  _handleButtonPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToPlayground();
  };
  render() {
    const { hasHeaderAppeared, hasPressedButton } = this.state;
    return (
      <View>
        <StatusBar hidden={true} />
        <View
          ref={ref => {
            this._headerRef = ref;
          }}
        >
          <Text style={inlineStyle.welcome}> Velkommen til kjemia-appen!!!</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <Button style={inlineStyle.button} onPressOut={this._handleButtonPress}>
              <Text style={inlineStyle.buttonText}>Hurtigstart</Text>
            </Button>
            <Button style={inlineStyle.button} onPressOut={this._handleButtonPress}>
              <Text style={inlineStyle.buttonText}>Velg selv</Text>
            </Button>
            <Text style={inlineStyle.instructions}>{instructions}</Text>
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
  button: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 22,
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: 'white',
  },
  welcome: {
    color: 'white',
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
