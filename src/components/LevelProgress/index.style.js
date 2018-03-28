import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 20,
    justifyContent: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    height: 25,
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Permanent Marker',
  },
  levelBar: {
    marginTop: 4,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 6,
    height: 15,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'white',
  },
});
