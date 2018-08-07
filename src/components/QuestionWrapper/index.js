/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-animatable';
import styles from './index.style';
import QuestionImage from '../QuestionImage';
import prettyPrint from './prettyPrint';


const printQuestion = (question) => {
  if (question == null) {
    return (<Text/>);
  }
  
  return (<View style={styles.textWrapper}>
      {prettyPrint(question)}
  </View>);
}

const QuestionWrapper = props => {
  const { children, image, text, ...otherProps } = props;
  const prettyText = 
      printQuestion(text);
  if (image) {
    const questionImage = <QuestionImage imageName={image} />;
    return (
      <View style={styles.wrapper}>
          {prettyText}
        {questionImage}
      </View>
    );
  }
  return <View style={styles.wrapper}>{prettyText}</View>;
};

export default QuestionWrapper;
