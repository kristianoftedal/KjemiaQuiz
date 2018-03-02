import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tile: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  depth: {
    zIndex: 1,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 39,
  },
  subscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    lineHeight: 18,
    marginTop: 22,
  },
  superscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 15,
    lineHeight: 18,
  }
});
