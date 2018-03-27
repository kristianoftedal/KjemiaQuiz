/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-animatable';
import Overlay from 'react-native-modal-overlay';
import styles from './index.style';


export default class LevelUp extends Component {
  constructor(props) {
    super();
    this.state = {
      visible: props.visible,
      level: props.level,
    };
  }
  render() {
    return (
      <Overlay visible={this.state.visible}
        closeOnTouchOutside animationType="zoomIn"
        containerStyle={styles.container}
        childrenWrapperStyle={styles.overlayWrapper}
        animationDuration={500}
        onClose={() => this.setState({visible: false})}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>🔥🔥 LEVEL UP!!! 🔥🔥</Text>
          <Text style={styles.header}>{this.state.level.value}</Text>
          <Image style={styles.image} source={this.state.level.imageSource} />
          <Text style={styles.text}>
            {this.state.level.text}
          </Text>
        </View>
      </Overlay>
    );
  }
};
