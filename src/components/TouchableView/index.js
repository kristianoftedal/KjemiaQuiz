/* @flow */
/**
 * A simple cross platform component that handles the default touchable feedback.
 */
import React from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { View, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import env from '../../config/env';

const TouchableView = props => {
  const { isRippleDisabled, rippleColor, children, style } = props;
  if (env.IS_MATERIAL_DESIGN_SUPPORTED && !isRippleDisabled) {
    console.warn('is ripple?' + isRippleDisabled);
    const background = TouchableNativeFeedback.Ripple(rippleColor, false);
    console.warn('is style?' + style);
    return (
      <TouchableNativeFeedback background={background}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  } else {
    console.warn('is ripple?' + isRippleDisabled);
    return <TouchableOpacity style={style}>{children}</TouchableOpacity>;
  }
};

export default TouchableView;
