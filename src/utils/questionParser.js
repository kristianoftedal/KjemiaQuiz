import React, { Component } from 'react';
import { StatusBar, Image, Text, Linking, } from 'react-native';
import uuid from 'uuid';
import styles from './index.style';

const questionParser = (question, textStyle, subscriptStyle, superscriptStyle) => {
  const parts = question.split('*');
  const restructuredText = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].indexOf('_') > -1 && parts[i].indexOf('^') > - 1) {
      const tempParts = parts[i].split('|');
      for (let j = 0; j < tempParts.length; j++) {
        if (tempParts[j].indexOf('_') > -1) {
          const x = tempParts[j].split('_');
          restructuredText.push(<Text key={uuid.v4()} style={textStyle}>{
            x[0]}
          </Text>);restructuredText.push(<Text key={uuid.v4()} style={subscriptStyle}>{
            x[1]}
          </Text>);
        }
        if (tempParts[j].indexOf('^') > -1) {
          const y = tempParts[j].split('^');
          restructuredText.push(<Text key={uuid.v4()} style={textStyle}>{
            y[0]}
          </Text>);restructuredText.push(<Text key={uuid.v4()} style={superscriptStyle}>{
            y[1]}
          </Text>);
        }
      }
    } else if (parts[i].indexOf('_') > -1 ) {
      const z = parts[i].split('_');
      restructuredText.push(<Text key={uuid.v4()} style={textStyle}>{
        z[0]}
      </Text>);restructuredText.push(<Text key={uuid.v4()} style={subscriptStyle}>{
        z[1].replace('|', '')}
      </Text>);
    } else if (parts[i].indexOf('^') > -1) {
      const w = parts[i].split('^');
      restructuredText.push(
        <Text key={uuid.v4()} style={textStyle}>
        {
        w[0]
      }
      </Text>);restructuredText.push(<Text key={uuid.v4()} style={superscriptStyle}>{
        w[1].replace('|', '')}
      </Text>);
    } else {
      restructuredText.push(
        <Text key={uuid.v4()} style={textStyle}>
          {parts[i]}
        </Text>);
    }
  }
  return restructuredText;
}

export default questionParser;