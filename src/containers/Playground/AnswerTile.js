/* @flow */
/**
 * A HOC on src/component/Tile that customizes it a bit for the board.  
 * It adds styles and animations when the Tile appears/disappears.
 */
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import Tile from '../../components/Tile';
import { observer } from 'mobx-react/native';
import uuid from 'uuid';

@observer
export default class AnswerTile extends Component {
  _tileRef = null;

  _handlePressOut = async () => {
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().bounceOut(300);
    }
    this.props.onTilePress();
  };

  animateFailure = async () => {
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().swing(400);
    }
    if (this._tileRef && this._tileRef.getContainerRef()) {
      await this._tileRef.getContainerRef().bounceOut(450);
    }
  };

  render() {
    const { backgroundColor, text } = this.props;
    return (
      <View key={uuid.v4()} >
        <Tile
          ref={ref => {
            this._tileRef = ref;
          }}
          animation={'bounceIn'}
          backgroundColor={backgroundColor}
          text={text}
          onPressOut={this._handlePressOut}
        />
      </View>
    );
  }
}
