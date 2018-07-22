/* @flow */
/**
 * A HOC on src/component/Tile that customizes it a bit for the board.  
 * It adds styles and animations when the Tile appears/disappears.
 */
import React, { Component } from '../../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { Alert, Text } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';

@inject(allStores => ({
  handleGoBack: allStores.game.handleGoBack,
}))

@observer
export default class GoBackButton extends Component {

  _handleBackPress = () => {
    this.props.handleGoBack();
  };

  render() {
    return(
    <Button onPress={this._handleBackPress} style={style.backButton}>
      <Text style={style.buttonText}>&lt;</Text>
    </Button>);
  }
}
