import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const width = metrics.DEVICE_WIDTH;
export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#e74c3c',
    marginBottom: 10,
    borderColor: '#e74c3c',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 10,
    padding: 10,
    width: width,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    //fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 25,
    lineHeight: 25,
  },
});
