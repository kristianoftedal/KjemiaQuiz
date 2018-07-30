
import formulaParser from './formulaParser';
import fractionParser from './fractionParser';
import binomialParser from './binomialParser';
import squareRootParser from './squareRootParser';
import styles from './index.style';

const prettyPrint = (text) => {
  if (!text) {
    return (<Text></Text>);
  }
  if (text.indexOf('#') > -1) {
    return fractionParser(text);
  }
  if (text.indexOf('@') > -1) {
    return binomialParser(text);
  }
  if (text.indexOf('$') > -1) {
    return squareRootParser(text);
  }
  if (text.indexOf('*') > -1 && text.indexOf('#') > -1) {
    return fractionParser(text);
  }
  if (text.indexOf('*') > -1 && text.indexOf('@') > -1) {
    return binomialParser(text);
  }
  if (text.indexOf('*') > -1 && !text.indexOf('#') > -1) {
    return formulaParser(text);
  }
  return (<Text style={styles.text}>{text}</Text>);
};

export default prettyPrint;
