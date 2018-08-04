/* @flow */
/**
 * The time left bar at the top of the Playground screen.
 */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { Animated } from 'react-native';
import { inject } from 'mobx-react/native';
import styles from './index.style';
import metrics from '../../../config/metrics';

@inject(allStores => ({
  progress: allStores.game.getProgress,
}))
export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.previousWidth = 0;
    this._width = new Animated.Value(0); // Added
    this.state = {
      animateValue: new Animated.Value(0),
    };
  }
  static defaultProps = {
    progress: 0,
  };
  animateTo = value => {
    Animated.timing(this._width, {
      toValue: value,
    }).start();
  };

  componentDidMount() {
    Animated.timing(this._width, {
      toValue: this.props.progress,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    this.animateTo(nextProps.progress);
    if (80 * metrics.DEVICE_WIDTH / 100 >= this._width) {
      Animated.timing(this.state.animateValue, {
        toValue: metrics.DEVICE_WIDTH,
      }).start();
    }
  }

  render() {
    // Animate the TimeBar color from grey to red, starting when there are left only 12 seconds
    const backgroundColor = this.state.animateValue.interpolate({
      inputRange: [0, 80 * metrics.DEVICE_WIDTH / 100, metrics.DEVICE_WIDTH],
      outputRange: ['rgba(0,0,0, 0.5)', 'rgba(0,0,0, 0.5)', 'rgba(26, 188, 156, 1)'],
    });
    const width = this._width;
    return (
      <View style={styles.container}>
        <View style={[styles.content, { width, backgroundColor }]} />
      </View>
    );
  }
}
