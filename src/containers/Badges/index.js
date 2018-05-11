/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, Platform, Image, UIManager, LayoutAnimation, FlatList, TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
import audioService from '../../services/audio';
import levels from '../../config/levels';
import RadioButton from '../../components/RadioButton';
import Level from '../../components/LevelUp';
import locked from '../../images/padlock.png';

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
  currentLevelIndex: allStores.game.currentLevelIndex,
}))
@observer
export default class Badges extends Component {
  _headerRef;
  _bodyRef;
  constructor(props) {
    super();
    this.state = {
      hasHeaderAppeared: false,
      showLevel: false,
      selectedLevel: { value: 0},
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
    }
  }
  _keyExtractor = (item, index) => item.value;

  _onLevelPress = (selectedLevel, index) => {
    if (!selectedLevel && !index) {
      this.setState({showLevel: false});
      return;
    }
    if (index > this.props.currentLevelIndex) return;
    this.setState({showLevel: !this.state.showLevel, selectedLevel})
  }

  _handleBackPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToHome();
  };


  _renderLevelBadge = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => this._onLevelPress(item, index)}>
        <View style={style.levelItem} key={item.value}>
          <Image
            style={index > this.props.currentLevelIndex ? style.thumbnailDisabled : style.thumbnail}
            source={index > this.props.currentLevelIndex ? locked : item.imageSource}/>
          <Text style={style.levelTitle}>{index > this.props.currentLevelIndex ? '' : item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { hasHeaderAppeared } = this.state;

    return (
      <View style={style.body}>
        <View
          ref={ref => {
            this._headerRef = ref;
          }}
        >
          <Text style={style.header}>Troféer</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            <View style={style.body}>
              <FlatList
                style={style.list}
                keyExtractor={this._keyExtractor}
                data={levels}
                renderItem={this._renderLevelBadge}
              />
            </View>
            <Button style={style.button} onPressOut={this._handleBackPress}>
              <Text style={style.buttonText}>Tilbake til start</Text>
            </Button>
            <Level onClose={this._onLevelPress} level={this.state.selectedLevel} visible={this.state.showLevel} key={this.state.selectedLevel.value}/>
          </View>
        )}
      </View>
    );
  }
}
