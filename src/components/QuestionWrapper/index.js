/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-animatable';
import styles from './index.style';
import QuestionImage from '../QuestionImage';

const QuestionWrapper = props => {
  const { children, image, ...otherProps } = props;
  const text = (
    <Text style={styles.text} {...otherProps}>
      {children}
    </Text>
  );
  if (image) {
    const questionImage = <QuestionImage imageName={image} />;
    return (
      <View style={styles.wrapper}>
        {text}
        {questionImage}
      </View>
    );
  }
  return <View style={styles.wrapper}>{text}</View>;
};

export default QuestionWrapper;
