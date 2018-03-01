import React, { Component } from 'react';
import { StatusBar, Image, Text, Linking, } from 'react-native';
import styles from '../components/QuestionWrapper/index.style';

const questionParser = (question) => {
  const parts = question.split('*');
  const restructuredText = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].indexOf('_') > -1 && parts[i].indexOf('^') > - 1) {
      const tempParts = parts[i].split('|');
      for (let j = 0; j < tempParts.length; j++) {
        if (tempParts[j].indexOf('_') > -1) {
          const x = tempParts[j].split('_');
          restructuredText.push(<Text style={styles.text}>{
            x[0]}
          </Text>);restructuredText.push(<Text style={styles.subscript}>{
            x[1]}
          </Text>);
        }
        if (tempParts[j].indexOf('^') > -1) {
          const y = tempParts[j].split('^');
          restructuredText.push(<Text style={styles.text}>{
            y[0]}
          </Text>);restructuredText.push(<Text style={styles.superscript}>{
            y[1]}
          </Text>);
        }
      }
    } else if (parts[i].indexOf('_') > -1 ) {
      const z = parts[i].split('_');
          restructuredText.push(<Text style={styles.text}>{
            z[0]}
          </Text>);restructuredText.push(<Text style={styles.subscript}>{
            z[1].replace('|', '')}
          </Text>);
    } else if (parts[i].indexOf('^') > -1) {
      const w = parts[i].split('^');
      restructuredText.push(<Text style={styles.text}>{
        w[0]}
      </Text>);restructuredText.push(<Text style={styles.superscript}>{
        w[1].replace('|', '')}
      </Text>);
    } else {
      restructuredText.push(
        <Text style={styles.text}>
          {parts[i]}
        </Text>);
    }
  }
  return restructuredText;
}

export default questionParser;