import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2980b9',
    zIndex: 2,
    marginBottom: 10,
    borderColor: '#2980b9',
    borderWidth: 2,
    borderRadius: 20,
    margin: 20,
  },
  depth: {
    zIndex: 1,
  },
  text: {
    margin: 20,
    color: 'white',
    fontWeight: 'bold',
    //fontFamily: 'Permanent Marker',
    fontSize: 30,
  },
});
