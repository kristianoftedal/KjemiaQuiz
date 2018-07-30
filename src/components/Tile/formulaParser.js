<<<<<<< HEAD:src/components/Tile/answerParser.js
import React, { Component } from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import { Text, Linking, } from 'react-native';
=======
import React from 'react';
import { Text } from 'react-native';
>>>>>>> master:src/components/Tile/formulaParser.js
import CustomText from '../CustomText';
import uuid from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/uuid';
import styles from './index.style';

const formulaParser = (question, size) => {
  if (question == null) return (<Text/>);

  const parts = question.split('*');
  const restructuredText = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].indexOf('_') > -1 && parts[i].indexOf('^') > - 1) {
      const tempParts = parts[i].split('|');
      for (let j = 0; j < tempParts.length; j++) {
        if (tempParts[j].indexOf('_') > -1) {
          const x = tempParts[j].split('_');
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true} style={styles.text}>
              {x[0]}
            </CustomText>
          );
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true} style={styles.subscript} size={size}>
              {x[1]}
            </CustomText>
          );
        }
        else if (tempParts[j].indexOf('^') > -1) {
          const y = tempParts[j].split('^');
          restructuredText.push(
            <CustomText key={uuid.v4()}  withShadow={true} style={styles.text}>
              {y[0]}
            </CustomText>
          );
          restructuredText.push(
            <CustomText key={uuid.v4()}  withShadow={true} style={styles.superscript} size={size}>
              {y[1]}
            </CustomText>
          );
        } else {
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true} style={styles.text}>
              {tempParts[j]}
            </CustomText>);
        }
      }
    } else if (parts[i].indexOf('_') > -1 ) {
      const tempParts = parts[i].split('|');
      for (let j = 0; j < tempParts.length; j++) {
        if (tempParts[j].indexOf('_') > -1) {
          const x = tempParts[j].split('_');
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true} style={styles.text}>
              {x[0]}
            </CustomText>
          );
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true}  style={styles.subscript} size={size}>
              {x[1]}
            </CustomText>
          );
        } else {
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true} style={styles.text}>
              {tempParts[j]}
            </CustomText>);
        }
      }
    } else if (parts[i].indexOf('^') > -1) {
      const tempParts = parts[i].split('|');
      for (let j = 0; j < tempParts.length; j++) {
        if (tempParts[j].indexOf('^') > -1) {
          const y = tempParts[j].split('^');
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true} style={styles.text}>{
              y[0]}
            </CustomText>
          );
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true} style={styles.superscript} size={size}>
              {y[1]}
            </CustomText>
          );
        } else {
          restructuredText.push(
            <CustomText key={uuid.v4()} withShadow={true} style={styles.text}>
              {tempParts[j]}
            </CustomText>);
        }
      }
    } else if (parts[i] === '') {
      continue;
    } else {
      restructuredText.push(
        <CustomText key={uuid.v4()} withShadow={true} style={styles.text}>
          {parts[i]}
        </CustomText>);
    }
  }
  return restructuredText;
}

export default formulaParser;