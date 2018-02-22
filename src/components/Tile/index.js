/* @flow */
/**
 * The Tile base component (used in HomeScreen and in Playground).
 * It renders a square (the depth), and of top of it another square (the Tile itself) with a bit of
 * space on bottom that get's halved when pressed.
 */
import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import { observer } from 'mobx-react/native';
import { TouchableWithoutFeedback, LayoutAnimation, UIManager, Platform } from 'react-native';
import CustomText from '../CustomText';
import colorUtils from '../../utils/colorUtils';
import metrics from '../../config/metrics';
import audioService from '../../services/audio';
import styles from './index.style';

@observer
export default class Tile extends Component {
  static defaultProps = {
    depth: metrics.TILE_SHADOW_DEPTH,
    borderRadius: metrics.TILE_BORDER_RADIUS,
    backgroundColor: 'red',
    text: '1',
    singlePressOnly: false,
    playSound: audioService.playButtonSound,
  };

  state = {
    isTouched: false,
    hasBeenPressed: false,
  };

  _containerRef = null;

  getContainerRef = () => this._containerRef;

  _handlePressIn = () => {
    const { onPressIn, playSound } = this.props;
    if (this.state.hasBeenPressed) return; // Prevent double presses
    playSound();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.spring();
    this.setState({ isTouched: true });
    if (onPressIn) {
      onPressIn();
    }
    return true;
  };

  _handlePressOut = () => {
    const { onPressOut } = this.props;
    if (this.state.hasBeenPressed) return; // Prevent double presses
    if (onPressOut) {
      onPressOut();
    }
    this.setState({ isTouched: false, hasBeenPressed: true });
  };

  render() {
    const { depth, borderRadius, backgroundColor, text, textStyle, style } = this.props;
    const { isTouched } = this.state;
    const halfDepth = depth / 2; // The bottom gap, needed to shop the the depth
    const tileStyle = {
      marginTop: isTouched ? depth : halfDepth,
      backgroundColor,
      borderRadius,
    };
    const depthStyle = {
      marginTop: -borderRadius,
      height: isTouched ? halfDepth + borderRadius : depth + borderRadius,
      backgroundColor: colorUtils.getDifferentLuminance(backgroundColor, -0.2), // Darker color for the depth
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
    };
    return (
      <TouchableWithoutFeedback
        onPressIn={this._handlePressIn}
        onPressOut={this._handlePressOut}
        delayPressIn={0}
      >
        <View
          ref={ref => {
            this._containerRef = ref;
          }}
        >
          <View style={[styles.tile, tileStyle, style]}>
            <CustomText style={[styles.text, textStyle]} withShadow={true}>
              {text}
            </CustomText>
          </View>
          <View style={[styles.depth, depthStyle]} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
