import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#34495e',
    zIndex: 2,
    alignSelf: 'stretch',
  },
  depth: {
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Permanent Marker',
    fontSize: 20,
    height: 30,
  },
});
