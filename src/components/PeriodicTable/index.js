/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-animatable';
import PhotoView from 'react-native-photo-view';
import Overlay from 'react-native-modal-overlay';
import styles from './index.style';
import metrics from '../../config/metrics';
import periodicTable from '../../images/periodicTable.png';

export default class PeriodicTable extends Component {
  constructor(props) {
    super();
    this.state = {
      visible: props.visible,
      level: props.level,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({visible: nextProps.visible});
  }

  render() {
    const imageWidth = metrics.DEVICE_WIDTH * 0.95;
    const imageHeight = metrics.DEVICE_HEIGHT * 0.82;
    return (
      <Overlay visible={this.state.visible}
        closeOnTouchOutside animationType="zoomIn"
        containerStyle={styles.container}
        childrenWrapperStyle={styles.overlayWrapper}
        animationDuration={500}
        onClose={() => this.setState({visible: false})}>
        <View style={styles.wrapper}>
          <PhotoView style={{backgroundColor: 'white'}}
            source={periodicTable}
            minimumZoomScale={2}
            maximumZoomScale={6}
            androidScaleType="center"
            style={{width: imageWidth, height: imageHeight}} />
        </View>
      </Overlay>
    );
  }
};
