/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import styles from './index.style';

export default class ScoreText extends Component {
  state = {
    animatedValue: new Animated.Value(0),
  };
  static defaultProps = {
    score: 0,
  };

  animate() {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: 600,
      easing: Easing.linear,
    }).start(() => this.animate());
  }

  render() {
    const textSize = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [15, 30, 15],
    });
    const { children, score, ...otherProps } = this.props;
    styles.text.fontSize = textSize;
    this.animate();
    const text = (
      <Animated.Text
        style={{
          fontSize: textSize,
          color: 'white',
          fontWeight: 'bold',
          fontFamily: 'Raleway-Regular',
        }}
        {...otherProps}
      >
        {children}
      </Animated.Text>
    );
    return (
      <View key={score} style={styles.wrapper}>
        {text}
      </View>
    );
  }
}
