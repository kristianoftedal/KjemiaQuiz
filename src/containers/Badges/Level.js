/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-animatable';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import styles from './level.style';


export default class Level extends Component {
  static propTypes = {
    level: PropTypes.object,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  };

  render() {
    if (!this.props.level) return <View/>
    return (
      <Overlay visible={this.props.visible}
        closeOnTouchOutside animationType="zoomIn"
        containerStyle={styles.container}
        childrenWrapperStyle={styles.overlayWrapper}
        animationDuration={500}
        onClose={() => this.props.onClose()}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>{this.props.level.value}</Text>
          <Image style={styles.image} source={this.props.level.imageSource} resizeMode="contain" />
          <Text style={styles.text}>
            {this.props.level.text}
          </Text>
        </View>
      </Overlay>
    );
  }
};
