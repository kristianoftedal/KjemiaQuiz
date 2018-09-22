import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const width = metrics.DEVICE_WIDTH * 0.8;
const height = metrics.DEVICE_HEIGHT * 0.7;

export default StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
  },
  overlayWrapper: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    padding: 10,
    width: width,
    height: height,
  },
  explanationWrapper: {
    flexDirection: 'column',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    width: width,
    height: height,
  },
  headerWrapper: {
    width: metrics.DEVICE_WIDTH * 0.75,
  },
  header: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    //fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 1,
  },
  newLine: {
    flexBasis: 25,
  },
  subscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    lineHeight: 14,
    marginTop: 7,
  },
  superscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    lineHeight: 10,
    fontSize: 12,
    marginBottom: 10,
  },
});
