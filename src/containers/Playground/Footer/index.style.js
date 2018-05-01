/* @flow */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  footerWrapper: {
    height: 40,
    backgroundColor: '#0a3d62',
  },
  periodicButton: {
    flex: 1,
    alignSelf: 'flex-end',
    width: 10,
    borderColor: '#0a3d62',
    margin: 0,
    marginBottom: 15,
    marginTop: 0,
  },
  periodicIcon: {
    width: 50,
    height: 50
  },
  footerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a3d62',
  },
  scoreText: {
    marginBottom: 10,
  },
  text: {
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    fontSize: 20,
    height: 30,
  },
});
