import React from 'react';
import { Text } from 'react-native';
import uuid from 'uuid';
import styles from './index.style';

const questionParser = question => {
  if (question == null) return <Text />;

  const parts = question.split('*');
  const restructuredText = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].indexOf('_') > -1 && parts[i].indexOf('^') > -1) {
      const tempParts = parts[i].split('|');
      for (let j = 0; j < tempParts.length; j++) {
        if (tempParts[j].indexOf('_') > -1) {
          const x = tempParts[j].split('_');
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.text}>
              {x[0]}
            </Text>
          );
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.subscript}>
              {x[1]}
            </Text>
          );
        } else if (tempParts[j].indexOf('^') > -1) {
          const y = tempParts[j].split('^');
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.text}>
              {y[0]}
            </Text>
          );
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.superscript}>
              {y[1]}
            </Text>
          );
        } else {
          restructuredText.push(<Text key={uuid.v4()}>{tempParts[j]}</Text>);
        }
      }
    } else if (parts[i].indexOf('_') > -1) {
      const tempParts = parts[i].split('|');
      for (let j = 0; j < tempParts.length; j++) {
        if (tempParts[j].indexOf('_') > -1) {
          const x = tempParts[j].split('_');
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.text}>
              {x[0]}
            </Text>
          );
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.subscript}>
              {x[1]}
            </Text>
          );
        } else {
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.text}>
              {tempParts[j]}
            </Text>
          );
        }
      }
    } else if (parts[i].indexOf('^') > -1) {
      const tempParts = parts[i].split('|');
      for (let j = 0; j < tempParts.length; j++) {
        if (tempParts[j].indexOf('^') > -1) {
          const y = tempParts[j].split('^');
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.text}>
              {y[0]}
            </Text>
          );
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.superscript}>
              {y[1]}
            </Text>
          );
        } else {
          restructuredText.push(
            <Text key={uuid.v4()} style={styles.text}>
              {tempParts[j]}
            </Text>
          );
        }
      }
    } else {
      restructuredText.push(
        <Text key={uuid.v4()} style={styles.text}>
          {parts[i]}
        </Text>
      );
    }
  }
  return restructuredText;
};

export default questionParser;
