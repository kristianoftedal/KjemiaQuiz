import React from 'react';
import { Text } from 'react-native';
import formulaParser from './formulaParser';
import styles from './index.style';

const prettyPrint = text => {
  if (!text) {
    return <Text />;
  }
  if (text.indexOf('*') > -1) {
    return formulaParser(text);
  }
  return <Text style={styles.text}>{text}</Text>;
};

export default prettyPrint;
