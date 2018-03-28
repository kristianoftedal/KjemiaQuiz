/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React, { Component } from 'react';
import { View, Animated, Easing, Text } from 'react-native';
import style from './index.style';

export default class LevelProgress extends Component {
  state = {
    animatedValue: new Animated.Value(0),
  };
  static defaultProps = {
    score: 0,
    progress: 0,
    level: '',
  };

  componentDidMount() {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const { score, ...otherProps } = this.props;
    const progressStyle = {
      width: this.props.progress,
    };
    return (
      <View style={style.container}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={style.text}>{this.props.level}</Text>
        </View>
        <View key={score} style={[style.wrapper]}>
          <View style={[style.levelBar, progressStyle]} />
        </View>
      </View>
    );
  }
}
