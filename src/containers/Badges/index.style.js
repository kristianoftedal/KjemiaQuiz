/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    marginTop: 30,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT * 0.80
  },
  list: {
    width: metrics.DEVICE_WIDTH,
  },
  levelItem: {
    marginBottom: 10,
  },
  thumbnail: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  thumbnailDisabled: {
    height: 70,
    width: 70,
    alignSelf: 'center',
    opacity: 0.5,
  },
  levelTitle: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    flex: 1,
    flexGrow: 9,
    alignSelf: 'center',
    fontSize: 20,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 22,
    minHeight: 30,
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
