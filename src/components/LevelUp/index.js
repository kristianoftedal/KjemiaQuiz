/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-animatable';
import Overlay from 'react-native-modal-overlay';
import styles from './index.style';

const LevelUp = props => {
  const { level, visible } = props;
  
  return (
    <Overlay visible={visible}
      closeOnTouchOutside animationType="zoomIn"
      containerStyle={styles.container}
      childrenWrapperStyle={styles.overlayWrapper}
      animationDuration={500}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>🔥🔥 LEVEL UP!!! 🔥🔥</Text>
        <Text style={styles.header}>{level.title}</Text>
        <Image style={styles.image} source={level.imageSource} />
        <Text style={styles.text}>
          {level.text}
        </Text>
      </View>
    </Overlay>
  );
};

export default LevelUp;
