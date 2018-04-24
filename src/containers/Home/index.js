/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StatusBar, Text, Linking, Platform, UIManager, LayoutAnimation } from 'react-native';
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
  navigateToAbout: allStores.router.navigateToAbout,
  navigateToBadges: allStores.router.navigateToBadges,
  navigateToChemForm: allStores.router.navigateToChemForm,
  navigateToSubscription: allStores.router.navigateToSubscription,
  progress: allStores.game.levelUpProgress,
  level: allStores.game.currentLevel,
  initPlayer: allStores.game.initPlayer,
  resetGame: allStores.game.resetGame,
  hasSubscription: allStores.subscription.hasSubscription,
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
    this.props.resetGame();
    this.props.initPlayer();
    if (this._headerRef) {
      this._headerRef.fadeInRight(1200).then(() => {
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
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

  _handleAboutPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToAbout();
  };

  _handleChemFormPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToChemForm();
  };

  _handleBadgesPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToBadges();
  };

  _handleSubscriptionPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToSubscription();
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
          <Text style={style.header}>Naturfagsappen</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <View key={this.props.progress}>
              <LevelProgress level={this.props.level.value} progress={this.props.progress} />
            </View>
            <Button style={style.button} onPressOut={this._handleStartPress}>
              <Text style={style.buttonText}>Hurtigstart</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleSelectionPress}>
              <Text style={style.buttonText}>Velg selv</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleBadgesPress}>
              <Text style={style.buttonText}>Troféer</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleAboutPress}>
              <Text style={style.buttonText}>Om Kjemia</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleSubscriptionPress}>
              <Text style={style.buttonText}>Abonnement</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}
