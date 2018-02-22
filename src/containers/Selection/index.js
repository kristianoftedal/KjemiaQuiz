/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, Text, Switch, Platform, UIManager, LayoutAnimation } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
import audioService from '../../services/audio';
import categories from '../../questions/categories';
import RadioButton from '../../components/RadioButton';

@inject(allStores => ({
  navigateToPlayground: allStores.router.navigateToPlayground,
  navigateToHome: allStores.router.navigateToHome,
  navigateToEndgame: allStores.router.navigateToEndgame,
  setCustomizedGame: allStores.game.setCustomizedGame,
}))
@observer
export default class Selection extends Component {
  _headerRef;
  _bodyRef;
  constructor(props) {
    super();
    this.state = {
      difficulty: '',
      categories: categories,
      hasHeaderAppeared: false,
      hasPressedButton: false,
      count: 0,
    };
  }

  componentDidMount() {
    if (this._headerRef) {
      this._headerRef.fadeInRight(600).then(() => {
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
          LayoutAnimation.spring();
        }
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
    this.props.setCustomizedGame(this.state.categories, this.state.difficulty, this.state.count);
    this.props.navigateToPlayground();
  };
  _handleBackPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToHome();
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
            <View style={style.difficultyWrapper}>
              <Text style={style.radioButtonLabel}>Lett</Text>
              <RadioButton
                isSelected={this.state.difficulty === 'Lett'}
                onPress={() => this.setState({ difficulty: 'Lett' })}
                innerColor="white"
                outerColor="white"
              />
              <Text style={style.radioButtonLabel}>Middels</Text>
              <RadioButton
                isSelected={this.state.difficulty === 'Middels'}
                onPress={() => this.setState({ difficulty: 'Middels' })}
                innerColor="white"
                outerColor="white"
              />
              <Text style={style.radioButtonLabel}>Vanskelig</Text>
              <RadioButton
                isSelected={this.state.difficulty === 'Vanskelig'}
                onPress={() => this.setState({ difficulty: 'Vanskelig' })}
                innerColor="white"
                outerColor="white"
              />
            </View>
            <View style={style.categoryWrapper}>
              {this.state.categories.map((e, i) => {
                return (
                  <View key={e.value} style={style.toggleWrapper}>
                    <Text style={style.toggleLabel}>{e.value}</Text>
                    <Switch
                      style={style.toggleSwitch}
                      onTintColor={'#3498db'}
                      value={e.isSelected}
                      onValueChange={value => {
                        const categories = this.state.categories;
                        categories[i].isSelected = value;
                        this.setState(categories);
                      }}
                    />
                  </View>
                );
              })}
            </View>

            <View style={style.difficultyWrapper}>
              <Text style={style.radioButtonLabel}>Antall: </Text>
              <Text style={style.radioButtonLabel}>30</Text>
              <RadioButton
                isSelected={this.state.count === 30}
                onPress={() => this.setState({ count: 30 })}
                innerColor="white"
                outerColor="white"
              />
              <Text style={style.radioButtonLabel}>50</Text>
              <RadioButton
                isSelected={this.state.count === 50}
                onPress={() => this.setState({ count: 50 })}
                innerColor="white"
                outerColor="white"
              />
              <Text style={style.radioButtonLabel}>80</Text>
              <RadioButton
                isSelected={this.state.count === 80}
                onPress={() => {
                  this.setState({ count: 80 });
                }}
                innerColor="white"
                outerColor="white"
              />
            </View>
            <Button style={style.button} onPressOut={this._handleStartPress}>
              <Text style={style.buttonText}>Start</Text>
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
