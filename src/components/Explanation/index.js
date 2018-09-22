/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React from 'react';
import { View, Text } from 'react-native';
import Overlay from 'react-native-modal-overlay';
import styles from './index.style';
import prettyPrint from './prettyPrint';

export default (explanantion = props => {
  const prettyText = prettyPrint(props.text);
  return (
    <Overlay
      visible={props.visible}
      closeOnTouchOutside
      animationType="zoomIn"
      containerStyle={styles.container}
      childrenWrapperStyle={styles.overlayWrapper}
      animationDuration={500}
      onClose={() => props.onClose()}
    >
      <View style={styles.explanationWrapper}>
        <View style={styles.wrapper}>
          <View style={styles.headerWrapper}>
            <Text style={styles.header}>Forklaring:</Text>
          </View>
          {prettyText}
        </View>
      </View>
    </Overlay>
  );
});
