/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const imageWidth = metrics.DEVICE_WIDTH;
const imageHeight = metrics.DEVICE_HEIGHT * 0.30;

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
    fontSize: 18,
    textAlign: 'center',
    marginTop: 25,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 7,
    marginLeft: 8,
    marginRight: 8,
    lineHeight: 18,
  },
  textPayment: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: 11,
    marginTop: 7,
    marginLeft: 8,
    marginRight: 8,
    lineHeight: 15,
  },
  textPart: {
    marginBottom: 7,
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
    borderRadius: 11,
    marginLeft: 10,
    marginRight: 10,
    minHeight: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  image: {
    height: imageHeight,
    width: imageWidth,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
