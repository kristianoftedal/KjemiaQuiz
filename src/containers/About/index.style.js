/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const tileSize = metrics.DEVICE_WIDTH * 0.26;
const logoWidth = metrics.DEVICE_WIDTH * 0.5;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  header: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  subHeader: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    margin: 5,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
  },
  textPart: {
    marginBottom: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 22,
    marginLeft: 20,
    marginRight: 20,
    minHeight: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});
