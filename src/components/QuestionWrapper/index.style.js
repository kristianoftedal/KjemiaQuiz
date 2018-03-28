import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const width = metrics.DEVICE_WIDTH;
export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#34495e',
    marginTop: 5,
    marginBottom: 5,
    padding: 5,
    paddingBottom: 5,
    width: width,
    alignItems: 'center',
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  text: {
    color: 'white',
    //fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
    lineHeight: 19,
  },
  subscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    lineHeight: 15,
    marginTop: 19,
  },
  superscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    lineHeight: 15,
  }
});
