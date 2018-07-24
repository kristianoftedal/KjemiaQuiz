/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React from 'react';
import { View, Text} from 'react-native';
import PhotoView from 'react-native-photo-view';
import Overlay from 'react-native-modal-overlay';
import styles from './index.style';
import questionParser from './questionParser';
import fractionParser from './fractionParser';

const parsedText = (text) => {
  if (text == null) return (<Text/>);
  if (text.indexOf('*') > -1) {
    return questionParser(text, styles);      
  }
  if (text.indexOf('#') > -1) {
    return fractionParser(text);      
  }
  return (
    <Text style={styles.text}>
      {text}
    </Text>);
}

export default explanantion = props => {
  const prettyText = parsedText(props.text);
  return (
    <Overlay visible={props.visible}
      closeOnTouchOutside animationType="zoomIn"
      containerStyle={styles.container}
      childrenWrapperStyle={styles.overlayWrapper}
      animationDuration={500}
      onClose={() => props.onClose()}>
      <View style={styles.wrapper}>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Forklaring:</Text>
        </View>
        {prettyText}
      </View>
    </Overlay>
  );
}
