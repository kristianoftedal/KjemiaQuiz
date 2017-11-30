import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderColor: 'white',
    borderWidth: 1,
    margin: 20,
    borderRadius: 20,
    height: 25,
  },
  levelBar: {
    marginTop: 4,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 6,
    height: 15,
    alignSelf: 'flex-start',
    width: 90,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: 'white',
  },
});
