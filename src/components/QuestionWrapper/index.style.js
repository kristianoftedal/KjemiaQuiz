import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const width = metrics.DEVICE_WIDTH;
export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    backgroundColor: '#0a3d62',
    marginTop: 5,
    padding: 5,
    paddingBottom: 5,
    width: width,
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  text: {
    color: 'white',
    //fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    lineHeight: 18,
    marginBottom: 1,
  },
  subscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 10,
    lineHeight: 8,
    marginTop: 10,
  },
  superscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    lineHeight: 16,
    fontSize: 4,
  },
});
