/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, StatusBar, Text, LayoutAnimation, Linking } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import LevelProgress from '../../components/LevelProgress';
import style from './index.style';
import audioService from '../../services/audio';

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame,
  navigateToSelection: allStores.router.navigateToSelection,
  progress: allStores.game.getLevelUpProgress,
  level: allStores.game.currentLevel,
  initPlayer: allStores.game.initPlayer,
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
    this.props.initPlayer();
    if (this._headerRef) {
      this._headerRef.fadeInRight(1200).then(() => {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
        audioService.initSounds();
      });
    }
  }

  _handleStartPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToPlayground();
  };
  _handleSelectionPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToSelection();
  };

  _handleOpenKjemia = async () => {
    Linking.openURL('http://kjemia.no');
  };

  render() {
    const { hasHeaderAppeared } = this.state;
    return (
      <View style={style.body}>
        <StatusBar hidden={true} />
        <View
          ref={ref => {
            this._headerRef = ref;
          }}
        >
          <Text style={style.header}>Kjemias naturfag - eksamensquiz!</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <View>
              <LevelProgress level={this.props.level.value} progress={this.props.progress} />
            </View>
            <Button style={style.button} onPressOut={this._handleStartPress}>
              <Text style={style.buttonText}>Hurtigstart</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleSelectionPress}>
              <Text style={style.buttonText}>Velg selv</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleOpenKjemia}>
              <Text style={style.buttonText}>Kjemia.no</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}

const inlineStyle = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
