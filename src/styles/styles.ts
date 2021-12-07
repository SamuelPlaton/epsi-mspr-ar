import { StyleSheet } from 'react-native';

/**
 * @name genericStyles
 * @description Our reusable generic stylesheet.
 */
const genericStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  center: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  titleText: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    width: '80%',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
  },
  rowBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowStart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginXAuto: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  iconSmall: {
    width: 30,
    height: 30,
    margin: 5,
  },
  iconMedium: {
    width: 50,
    height: 50,
    margin: 5,
  },
  iconLarge: {
    width: 70,
    height: 70,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'powderblue',
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 250,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginVertical: 10,
    marginBottom: 25,
  },
  label: {
    width: 250,
    fontSize: 15,
    color: 'black',
  },
});

export default genericStyles;
