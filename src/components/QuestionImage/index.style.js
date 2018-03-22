/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const imageWidth = metrics.DEVICE_WIDTH;
const imageHeight = metrics.DEVICE_HEIGHT * 0.35;
export default StyleSheet.create({
  image: {
    height: imageHeight,
    width: imageWidth,
    borderRadius: 2,
    borderColor: '#ffffff',
  },
});
