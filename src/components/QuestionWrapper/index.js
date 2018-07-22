/**
 * React-Native `<Text />` component does not scale the text based on the device size.
 * This component does, and it also provides a nice interface for using custom fonts and style.
 */
import React from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { View } from 'react-native';
import { Text } from 'react-native-animatable';
import styles from './index.style';
import QuestionImage from '../QuestionImage';
import questionParser from './questionParser';


const printQuestion = (question) => {
  if (question == null) return (<Text/>);
  if (question.indexOf('*') > -1) {
    return (<View style={styles.textWrapper}>
      {questionParser(question)}
      </View>);
      
  }
  return (
    <View style={styles.textWrapper}>
      <Text style={styles.text}>
        {question}
      </Text>
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
