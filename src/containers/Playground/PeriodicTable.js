/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Alert, Image } from 'react-native';
import { View } from 'react-native-animatable';
import PhotoView from 'react-native-photo-view';
import style from './index.style';
import periodicTable from '../../images/periodicTable.png';
import metrics from '../../config/metrics';

export default class PeriodicTable extends Component {

  render() {
    const { previousScore, score } = this.props;
    const imageWidth = metrics.DEVICE_WIDTH * 0.95;
    const imageHeight = metrics.DEVICE_HEIGHT * 0.85;
    return (
      <View>
        <PhotoView
          source={periodicTable}
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          androidScaleType="center"
          style={{width: imageWidth, height: imageHeight}} />
      </View>
    );
  }
}
