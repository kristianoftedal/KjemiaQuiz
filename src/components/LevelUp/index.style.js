import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const width = metrics.DEVICE_WIDTH * 0.95;
const height = metrics.DEVICE_HEIGHT * 0.70;
const imageWidth = metrics.DEVICE_WIDTH * 0.7;
const imageHeight = metrics.DEVICE_HEIGHT * 0.30;

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayWrapper: {
    backgroundColor: '#3498db',
    borderRadius: 20,
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    width: width,
    height: height,
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
  text: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    margin: 5,
    lineHeight: 20,
  },
  image: {
    height: imageHeight,
    width: imageWidth,
  },
});
