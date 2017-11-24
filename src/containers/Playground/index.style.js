/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  questionSize: {
    width: metrics.TILE_SIZE,
    height: metrics.TILE_SIZE,
  },
  questionsWrapper: {
    flex: 1,
    padding: 10,
    marginBottom: 40,
  },
  scoreWrapper: {
    flexDirection: 'column',
  },
});
