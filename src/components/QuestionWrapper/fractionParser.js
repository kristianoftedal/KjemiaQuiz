import React from 'react';
import { View, Text } from 'react-native';
import CustomText from '../CustomText';
import uuid from 'uuid';
import styles from './index.style';
import formulaParser from './formulaParser';

const fractionParser = (question) => {
  debugger;
  if (question == null) return (<Text/>);

  const parts = question.split('#');
  const restructuredText = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].indexOf('/') > -1) {
      const fraction = parts[i].split('/');
      restructuredText.push(
        <View>
          <View style={styles.fraction}>
          <CustomText key={uuid.v4()} withShadow={true} size={14} style={styles.top}>
            {formulaParser(fraction[0])}
          </CustomText>
          </View>
          <View>
          <CustomText key={uuid.v4()} withShadow={true} size={14} style={styles.bottom}>
            {formulaParser(fraction[1])}
          </CustomText>
          </View>
        </View>
      );
    } else {
      restructuredText.push(
        <CustomText key={uuid.v4()} withShadow={true} style={styles.text}>
          {parts[i]}
        </CustomText>
      );
    }
    
  }
  return restructuredText;
}

export default fractionParser;