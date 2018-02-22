import React, { Component } from 'react';
import { StatusBar, Text, Linking, Platform, UIManager, LayoutAnimation } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
}))

@observer
export default class Endgame extends Component {
  _headerRef;
  _bodyRef;

  state = {
    hasHeaderAppeared: false,
    hasPressedButton: false,
  };

  componentDidMount() {
    if (this._headerRef) {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
    }
  }

  _handleBackPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToHome();
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
          <Text style={style.header}>Om kjemia</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <View style={style.textPart}>
              <View>
                <Text style={style.subHeader}>Vi er blablalblalba</Text>
                <Text style={style.text}>Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat.</Text>
              </View>
              <View>
                <Text style={style.subHeader}>Vi er blablalblalba</Text>
                <Text style={style.text}>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
              </View>
            </View>
            <Button style={style.button} onPressOut={this._handleOpenKjemia}>
              <Text style={style.buttonText}>Kjemia.no</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleBackPress}>
              <Text style={style.buttonText}>Tilbake til start</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}
