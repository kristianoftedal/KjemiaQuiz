/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

<<<<<<< HEAD
import React, { Component } from 'react';
import { StatusBar, Text, Switch, Platform, UIManager, LayoutAnimation } from 'react-native';
=======
import React, { Component } from 'react';
import { Text, Switch, Platform, UIManager, LayoutAnimation } from 'react-native';
>>>>>>> master
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
  hasSubscription: allStores.subscription.hasSubscription,
}))

@observer
export default class Selection extends Component {
  _headerRef;
  _bodyRef;
  constructor(props) {
    super();
    this.state = {
      difficulty: '',
      categories: categories.map(e => ({...e})),
      hasHeaderAppeared: false,
      count: 0,
    };
  }

  componentDidMount() {
    if (this._headerRef) {
        if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental &&
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
        audioService.initSounds();
    }
  }

  _handleStartPress = async () => {
    if (!this.state.difficulty || this.state.count === 0 || this.state.categories.filter(x => x.isSelected).length === 0) return;
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.setCustomizedGame(this.state.categories, this.state.difficulty, this.state.count, this.props.hasSubscription);
    this.setState({ categories: categories.map(e => ({...e}))});
    this.props.navigateToPlayground();
  };

  _handleBackPress = async () => {
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.setState({ categories: categories.map(e => ({...e}))});
    this.props.navigateToHome();
  };

  render() {
    const { hasHeaderAppeared } = this.state;

    return (
      <View style={style.body}>
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
              <Text style={style.radioButtonLabel}>20</Text>
              <RadioButton
                isSelected={this.state.count === 20}
                onPress={() => this.setState({ count: 20 })}
                innerColor="white"
                outerColor="white"
              />
              <Text style={style.radioButtonLabel}>30</Text>
              <RadioButton
                isSelected={this.state.count === 30}
                onPress={() => this.setState({ count: 30 })}
                disabled={this.state.difficulty === 'Vanskelig' && this.state.categories.filter(x => x.isSelected).length < 2}
                innerColor="white"
                outerColor="white"
              />
              <Text style={style.radioButtonLabel}>40</Text>
              <RadioButton
                isSelected={this.state.count === 40}
                onPress={() => {
                  this.setState({ count: 40 });
                }}

                disabled={this.state.difficulty === 'Vanskelig' && this.state.categories.filter(x => x.isSelected).length <= 2}
                innerColor="white"
                outerColor="white"
              />
              <Text style={style.radioButtonLabel}>50</Text>
              <RadioButton
                isSelected={this.state.count === 50}
                onPress={() => {
                  this.setState({ count: 50 });
                }}
                disabled={this.state.difficulty === 'Vanskelig' && this.state.categories.filter(x => x.isSelected).length <= 2}
                innerColor="white"
                outerColor="white"
              />
              <Text style={style.radioButtonLabel}>60</Text>
              <RadioButton
                isSelected={this.state.count === 60}
                onPress={() => {
                  this.setState({ count: 60 });
                }}
                disabled={this.state.difficulty === 'Vanskelig' && this.state.categories.filter(x => x.isSelected).length <= 3}
                innerColor="white"
                outerColor="white"
              />
            </View>
            {!this.hasSubscription &&
              <Text style={style.textFree}>
              I gratisversjonen vil kun 10% av spørsmålene være tilgjengelige
              </Text>

            }
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
