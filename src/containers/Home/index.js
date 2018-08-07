/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { StatusBar, ScrollView, Text, Platform, UIManager, LayoutAnimation } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
import audioService from '../../services/audio';
import { NATURFAG, KJEMI1, KJEMI2, S1, ONET, GEO, FYSIKK1, R1, ONEP } from '../../stores/constants';

@inject(allStores => ({
  selectSubject: allStores.subject.selectSubject,
  navigateToGameMenu: allStores.router.navigateToGameMenu,
  navigateToAbout: allStores.router.navigateToAbout,
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

  _handleSelectSubject = async (subject) => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(500), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.selectSubject(subject);
    this.props.navigateToGameMenu();
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
      <ScrollView >
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
          <View>
            <Text style={style.subjectHeader}>
              VG1
            </Text>
            <View style={style.subjectContainer}>
              <Button style={style.button} onPress={() => this._handleSelectSubject(NATURFAG)}>
                <Text style={style.buttonText}>Naturfag</Text>
              </Button>
              <Button style={style.button} onPress={() => this._handleSelectSubject(GEO)}>
                <Text style={style.buttonText}>Geografi</Text>
              </Button>
              <Button style={style.button} onPress={() => this._handleSelectSubject(ONET)}>
                <Text style={style.buttonText}>1T</Text>
              </Button>
              <Button style={style.button} onPress={() => this._handleSelectSubject(GEO)}>
                <Text style={style.buttonText}>Naturfag Yrkesskole</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null} isDisabled={true}>
                <Text style={style.buttonText}>1P</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null}  isDisabled={true}>
                <Text style={style.buttonText}>1P-Y</Text>
              </Button>
            </View>
          </View>
          <View>
            <Text style={style.subjectHeader}>
              VG2
            </Text>
            <View style={style.subjectContainer}>
              <Button style={style.button} onPress={() => this._handleSelectSubject(KJEMI1)}>
                <Text style={style.buttonText}>Kjemi 1</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null} isDisabled={true}>
                <Text style={style.buttonText}>Bio 1</Text>
              </Button>
              <Button style={style.button} onPress={() => this._handleSelectSubject(FYSIKK1)}>
                <Text style={style.buttonText}>Fysikk1</Text>
              </Button>
              <Button style={style.button} onPress={() => this._handleSelectSubject(S1)}>
                <Text style={style.buttonText}>S1</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null} isDisabled={true}>
                <Text style={style.buttonText}>R1</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null} isDisabled={true}>
                <Text style={style.buttonText}>2P</Text>
              </Button>
            </View>
          </View>
          <View>
            <Text style={style.subjectHeader}>
              VG3
            </Text>
            <View style={style.subjectContainer}>
              <Button style={style.button} onPress={() => this._handleSelectSubject(KJEMI2)}>
                <Text style={style.buttonText}>Kjemi 2</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null} isDisabled={true}>
                <Text style={style.buttonText}>Bio 2</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null} isDisabled={true}>
                <Text style={style.buttonText}>R2</Text>
              </Button>
              <Button style={style.button} onPress={() => this._handleSelectSubject(R1)}>
                <Text style={style.buttonText}>Naturfag Påbygg</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null} isDisabled={true}>
                <Text style={style.buttonText}>S2</Text>
              </Button>
              <Button style={style.buttonToCome} onPress={() => null} isDisabled={true}>
                <Text style={style.buttonText}>2P-Y</Text>
              </Button>
            </View>
          </View>
          <View style={style.container}>
            <Button style={style.aboutButton} onPressOut={this._handleAboutPress}>
              <Text style={style.buttonText}>Om Kjemia</Text>
            </Button>
          </View>
        </View>
        )}
        </View>
      </ScrollView>
    );
  }
}
