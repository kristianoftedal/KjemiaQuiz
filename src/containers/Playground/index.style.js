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
  backButton: {
    flex: 1,
    alignSelf: 'flex-start',
    width: 10,
    borderColor: '#34495e',
    margin: 0,
    marginBottom: 0,
    marginTop: 4,
    marginRight: 20,
  },
  periodicButton: {
    flex: 1,
    alignSelf: 'flex-end',
    width: 10,
    borderColor: '#34495e',
    margin: 0,
    marginBottom: 5,
    marginTop: 0,
    marginRight: 5,
  },
  periodicIcon: {
    width: 70,
    height: 70
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
});
