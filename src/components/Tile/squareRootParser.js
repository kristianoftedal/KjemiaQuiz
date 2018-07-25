import React from 'react';
import { View, Text } from 'react-native';
import uuid from 'uuid';
import styles from './index.style';
import formulaParser from './formulaParser';
import CustomText from '../CustomText';

const squareRootParser = (question) => {
  if (question == null) return (<Text/>);
  const parts = question.split('$');
  const restructuredText = [];
  for (let i = 0; i < parts.length; i += 1) {
    if (parts[i] === '√') {
      restructuredText.push(<Text style={styles.squareRoot}>{parts[i]}</Text>);
    } else if (parts[i] === '') {
      // do nothing
    } else {
      restructuredText.push(
        <View style={styles.postSquareRoot}>
          <CustomText style={styles.postSquareRoot}>
            {formulaParser(parts[i])}
          </CustomText>
        </View>);
    }
  }
  return restructuredText;
};

export default squareRootParser;
