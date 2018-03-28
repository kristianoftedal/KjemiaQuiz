import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tile: {
    zIndex: 2,
  },
  depth: {
    zIndex: 1,
  },
  textWrapper: {
    justifyContent: 'flex-start',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
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
