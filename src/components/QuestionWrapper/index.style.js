import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const width = metrics.DEVICE_WIDTH;
export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#34495e',
    borderColor: '#34495e',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 5,
    padding: 10,
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
    fontSize: 22,
    lineHeight: 22,
  },
  subscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 11,
    lineHeight: 10,
    marginTop: 12,
  },
  superscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 11,
    lineHeight: 10,
  }
});
