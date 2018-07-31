/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StatusBar, Text, Platform, UIManager, LayoutAnimation } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
import audioService from '../../services/audio';

@inject(allStores => ({
  selectNaturfag: allStores.topic.selectNaturfag,
  selectKjemi1: allStores.topic.selectKjemi1,
  selectKjemi2: allStores.topic.selectKjemi2,
  selectFysikk1: allStores.topic.selectFysikk1,
  selectGeografi: allStores.topic.selectGeografi,
  selectS1: allStores.topic.selectS1,
  selectOneT: allStores.topic.selectOneT,
  navigateToGameMenu: allStores.router.navigateToGameMenu,
}))

@observer
export default class Home extends Component {
  _headerRef;
  _bodyRef;

  state = {
    hasHeaderAppeared: false,
    hasPressedButton: false,
    init: true,
  };

  componentDidMount() {
    if (this._headerRef) {
      const fadeTime = 1400;
      this._headerRef.fadeInRight(fadeTime).then(() => {
        this.setState({ init: false });
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

  _handleSelectSubject = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToPlayground();
  };

  _handleAboutPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToAbout();
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
          <Text style={style.header}>Realfagsappen</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <Button style={style.button} onPressOut={this._handleStartPress}>
              <Text style={style.buttonText}>Naturfag</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleSelectionPress}>
              <Text style={style.buttonText}>Kjemi 1</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleBadgesPress}>
              <Text style={style.buttonText}>Kjemi 2</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleAboutPress}>
              <Text style={style.buttonText}>S1</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleSubscriptionPress}>
              <Text style={style.buttonText}>1T</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleSubscriptionPress}>
              <Text style={style.buttonText}>Fysikk1</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleSubscriptionPress}>
              <Text style={style.buttonText}>Geografi</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleAboutPress}>
              <Text style={style.buttonText}>Om Kjemia</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}
