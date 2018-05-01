/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const logoWidth = metrics.DEVICE_WIDTH * 0.5;

export default StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  header: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  logo: {
    flex: 1,
    marginLeft: metrics.DEVICE_WIDTH * 0.05,
    height: null,
    width: logoWidth,
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
  subscriptionText: {
    color: 'white',
    fontSize: 15,
  }
});
