
import formulaParser from './formulaParser';
import fractionParser from './fractionParser';
import binomialParser from './binomialParser';
import squareRootParser from './squareRootParser';

const prettyPrint = (text) => {
  debugger;
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
  return (<Text>{text}</Text>);
};

export default prettyPrint;
