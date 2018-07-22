/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React, { Component } from 'react';
import { View, Image, } from 'react-native';
import { Text } from 'react-native-animatable';
import PhotoView from 'react-native-photo-view';
import Overlay from 'react-native-modal-overlay';
import styles from './index.style';
import metrics from '../../config/metrics';
import periodicTableImg from '../../images/periodicTable.png';

export default periodicTable = props => {
  const imageWidth = metrics.DEVICE_WIDTH * 0.95;
  const imageHeight = metrics.DEVICE_HEIGHT * 0.82;
  return (
    <Overlay visible={props.visible}
      closeOnTouchOutside animationType="zoomIn"
      containerStyle={styles.container}
      childrenWrapperStyle={styles.overlayWrapper}
      animationDuration={500}
      onClose={() => props.onClose()}>
      <View style={styles.wrapper}>
        <PhotoView style={{backgroundColor: 'white'}}
          source={periodicTableImg}
          minimumZoomScale={1}
          maximumZoomScale={6}
          style={{width: imageWidth, height: imageHeight}} />
      </View>
    </Overlay>
  );
}
