import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

const width = metrics.DEVICE_WIDTH;
export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#2980b9',
    marginBottom: 10,
    borderColor: '#2980b9',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 20,
    padding: 10,
    width: width,
  },
  text: {
    color: 'white',
    //fontWeight: 'bold',
    fontFamily: 'Permanent Marker',
    fontSize: 25,
    lineHeight: 25,
  },
});
