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
    width: width,
    height: height,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    borderRadius: 20,
    padding: 10,
    width: width,
    height: height,
  },
  headerWrapper: {
    alignSelf: 'stretch',
    width: metrics.DEVICE_WIDTH * 0.7,
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
  subscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 10,
    lineHeight: 14,
  },
  superscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    lineHeight: 14,
    fontSize: 10,
  },
  fraction: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  top: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    lineHeight: 12,
    textAlignVertical: 'top',
  },
  bottom: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    lineHeight: 12,
    marginTop: 1,
  },
  postSquareRoot: {
    borderTopColor: 'white',
    borderTopWidth: 1,
  },
});
