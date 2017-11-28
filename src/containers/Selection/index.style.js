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
  header: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleWrapper: {
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  toggleLabel: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    flex: 1,
    flexGrow: 9,
    alignSelf: 'center',
  },
  toggleSwitch: {
    flex: 2,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  categoryWrapper: {
    marginBottom: 20,
  },
  picker: {
    color: 'white',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 22,
    minHeight: 50,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  difficultyWrapper: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  radioButtonLabel: {
    fontFamily: 'Permanent Marker',
    color: 'white',
    marginRight: 5,
  },
  radioButton: {
  },
});
