import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tile: {
    zIndex: 2,
  },
  depth: {
    zIndex: 1,
  },
  textWrapper: {
    flexDirection: 'row', 
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    margin: 4,
    padding: 4,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 18,
  },
  subscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 10,
    lineHeight: 14,
    marginTop: 10,
  },
  superscript: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    lineHeight: 14,
    fontSize: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  fraction: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  top: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    lineHeight: 12,
    textAlignVertical: 'top',
  },
  bottom: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    lineHeight: 12,
    marginTop: 1,
  },
  binomial: {
  },
  squareRoot: {
    fontSize: 23,
  },
  postSquareRoot: {
    borderTopColor: 'white',
    borderTopWidth: 1,
  }
});
