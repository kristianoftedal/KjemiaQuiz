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
  },
  header: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  tile: {
    width: tileSize,
    height: tileSize,
  },
  tileText: {
    fontSize: 40,
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
});
