import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native-animatable';
import PropTypes from 'prop-types';
import style from './index.style';

const DEFAULT_SIZE_MULTIPLIER = 0.7;
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.2;

export default class RadioButton extends Component {
  static propTypes = {
    size: PropTypes.number,
    innerColor: PropTypes.string,
    outerColor: PropTypes.string,
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    size: 16,
    innerColor: 'dodgerblue',
    outerColor: 'dodgerblue',
    disabled: false,
    isSelected: false,
    onPress: () => null,
  };

  render() {
    const { size, innerColor, outerColor, isSelected, onPress, disabled } = this.props;
    const outerStyle = {
      borderColor: disabled ? '#bdc3c7' : outerColor,
      width: size + size * DEFAULT_SIZE_MULTIPLIER,
      height: size + size * DEFAULT_SIZE_MULTIPLIER,
      borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
      borderWidth: size * DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER,
      marginRight: 5,
    };

    const innerStyle = {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: disabled ? '#bdc3c7' : innerColor,
    };

    return (
      <TouchableOpacity style={[style.radio, outerStyle]} onPress={onPress} disabled={disabled}>
        {isSelected ? <View style={innerStyle} {...this.props} /> : null}
      </TouchableOpacity>
    );
  }
}
