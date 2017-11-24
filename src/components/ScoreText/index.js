/** 
 * React-Native `<Text />` component does not scale the text based on the device size.  
 * This component does, and it also provides a nice interface for using custom fonts and style.  
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-animatable';
import styles from './index.style';

const ScoreText = props => {
  const { children, ...otherProps } = props;
  const text = (
    <Text style={styles.text} {...otherProps}>
      {children}
    </Text>
  );
  return <View style={styles.wrapper}>{text}</View>;
};

export default ScoreText;
