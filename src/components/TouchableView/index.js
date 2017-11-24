/* @flow */
/**
 * A simple cross platform component that handles the default touchable feedback.
 */
import React from 'react';
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import env from '../../config/env';

const TouchableView = props => {
  const { isRippleDisabled, rippleColor, children, style } = props;
  if (env.IS_MATERIAL_DESIGN_SUPPORTED && !isRippleDisabled) {
    const background = TouchableNativeFeedback.Ripple(rippleColor, false);
    return (
      <TouchableNativeFeedback background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    return <TouchableOpacity style={style}>{children}</TouchableOpacity>;
  }
};

export default TouchableView;
