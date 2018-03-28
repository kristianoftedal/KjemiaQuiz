/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text } from 'react-native-animatable';
import Overlay from 'react-native-modal-overlay';
import styles from './index.style';


export default class LevelUp extends Component {
  static propTypes = {
    level: PropTypes.object,
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  };
  constructor(props) {
    super();
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: visible});
  }

  render() {
    return (
      <Overlay visible={this.state.visible}
        closeOnTouchOutside
        animationType="zoomIn"
        containerStyle={styles.container}
        childrenWrapperStyle={styles.overlayWrapper}
        animationDuration={500}
        onClose={() => this.setState({ visible: false })}>
        <View style={styles.wrapper}>
          <Text style={styles.header}>NYTT NIVÅ!!</Text>
          <Text style={styles.header}>{this.props.level.value}</Text>
          <Image style={styles.image} source={this.props.level.imageSource} />
          <Text style={styles.text}>
            {this.props.level.text}
          </Text>
        </View>
      </Overlay>
    );
  }
};
