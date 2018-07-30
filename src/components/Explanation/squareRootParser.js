
import React from 'react';
import { View, Text } from 'react-native';
import formulaParser from './formulaParser';

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
          <Text style={styles.postSquareRoot}>
            {formulaParser(parts[i])}
          </Text>
        </View>);
    }
  }
  return restructuredText;
};

export default squareRootParser;
