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
    marginBottom: 20,
  },
  footerWrapper: {
    flexDirection: 'column',
    backgroundColor: '#34495e',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'Raleway-Regular',
  },
  footerLayout: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e',
  },
  text: {
    marginTop: 20,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    height: 50,
  },
  questionFeedback: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20, 
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
  }
});
