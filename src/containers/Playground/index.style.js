/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  questionSize: {
    width: metrics.TILE_SIZE,
    height: metrics.TILE_SIZE,
  },
  answerWrapper: {
    padding: 10,
  },
  questionsWrapper: {
    flex: 1,
    marginBottom: 40,
    // flexDirection: 'column',
  },
  scoreWrapper: {
    flexDirection: 'column',
  },
});
