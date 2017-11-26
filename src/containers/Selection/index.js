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
import categories from '../../questions/categories'
@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToEndgame: allStores.router.navigateToEndgame,
}))
@observer
export default class Selection extends Component {
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

  _handleStartPress = async () => {
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
          <Text style={style.header}>Velg vanskelighetsgrad og kategorier</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
          <CustomMultiPicker
            options={categories}
            search={false} // should show search bar?
            multiple={true} //
            placeholderTextColor={'#757575'}
            returnValue={"label"} // label or value
            callback={(res)=>{ console.log(res) }} // callback, array of selected items
            rowBackgroundColor={"#eee"}
            rowHeight={40}
            rowRadius={5}
            iconColor={"#00a2dd"}
            iconSize={30}
            selectedIconName={"ios-checkmark-circle-outline"}
            unselectedIconName={"ios-radio-button-off-outline"}
            scrollViewHeight={130}
            selected={[1,2]} // list of options which are selected by default
          />
            <Button style={style.button} onPressOut={this._handleButtonPress}>
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
