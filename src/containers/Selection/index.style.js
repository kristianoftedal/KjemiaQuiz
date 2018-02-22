/* @flow */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'stretch',
    justifyContent: 'center',
    padding: 10,
  },
  header: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonLabel: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    marginRight: 5,
  },
  radioButton: {},
});
