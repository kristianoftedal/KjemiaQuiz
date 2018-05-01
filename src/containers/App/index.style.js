/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,100,0.9)'
  },
});
