/* @flow */
import { StyleSheet } from 'react-native';
import metrics from '../../config/metrics';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 5,
    width: metrics.DEVICE_WIDTH * 0.99,
  },
  header: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 30,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleWrapper: {
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  toggleLabel: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    flex: 1,
    flexGrow: 9,
    fontSize: 13,
    alignSelf: 'center',
  },
  toggleSwitch: {
    flex: 2,
    marginBottom: 2,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  categoryWrapper: {
    marginBottom: 10,
  },
  picker: {
    color: 'white',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 22,
    marginTop: 2,
    marginBottom: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  difficultyWrapper: {
    marginTop: 7,
    marginBottom: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH * 0.99,
  },
  radioButtonLabel: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    marginRight: 2,
  },

  textFree: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    textAlign: 'center',
    fontSize: 9,
    marginTop: 2,
    marginLeft: 2,
    marginRight: 8,
    lineHeight: 15,
  },
  radioButton: {},
});
