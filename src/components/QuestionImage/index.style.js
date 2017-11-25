/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const imageWidth = metrics.DEVICE_WIDTH * 0.9;
const imageHeight = metrics.DEVICE_HEIGHT * 0.35;
export default StyleSheet.create({
  image: {
    height: imageHeight,
    width: imageWidth,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#2980b9',
  },
});
