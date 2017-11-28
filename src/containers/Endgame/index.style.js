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
    padding: 20,
  },
  subHeader: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  header: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    margin: 5,
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
  resultWrapper: {
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  resultHeader: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 5,
  },
  resultLabel: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    flex: 1,
    flexGrow: 9,
    alignSelf: 'center',
  },
  resultPercentage: {
    flex: 2,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'flex-end',
    fontFamily: 'Permanent Marker',
    color: 'white',
  },
  circle: {    
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
  },
});
