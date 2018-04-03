/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-animatable';
import styles from './index.style';
import QuestionImage from '../QuestionImage';
import questionParser from './questionParser';


const printQuestion = (question) => {
  if (question == null) return (<Text/>);
  if (question.indexOf('*') > -1) {
    return questionParser(question);
  }

  return (
    <Text style={styles.text}>
      {question}
    </Text>
  );
}

const QuestionWrapper = props => {
  const { children, image, text, ...otherProps } = props;
  const prettyText = (
    <Text style={styles.text} {...otherProps}>
      {printQuestion(text)}
    </Text>
  );
  if (image) {
    const questionImage = <QuestionImage imageName={image} />;
    return (
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          {prettyText}
        </View>
        {questionImage}
      </View>
    );
  }
  return <View style={styles.wrapper}>{prettyText}</View>;
};

export default QuestionWrapper;
