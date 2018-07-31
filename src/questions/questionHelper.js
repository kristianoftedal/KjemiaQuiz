import { NATURFAG, KJEMI1, KJEMI2, S1, ONET, GEO, FYSIKK1, R1, ONEP } from '../stores/constants';
import naturfagQuestions from '../questions/naturfag/questions.json';
import naturfagFreeQuestions from '../questions/naturfag/freeQuestions.json';
import kjemi1Questions from '../questions/kjemi1/questions.json';
import kjemi1FreeQuestions from '../questions/kjemi1/freeQuestions.json';
import kjemi2Questions from '../questions/kjemi2/questions.json';
import kjemi2FreeQuestions from '../questions/kjemi2/freeQuestions.json';
import fysikk1Questions from '../questions/fysikk1/questions.json';
import fysikk1FreeQuestions from '../questions/fysikk1/freeQuestions.json';
import geografiQuestions from '../questions/geografi/questions.json';
import geografiFreeQuestions from '../questions/geografi/freeQuestions.json';
import oneTQuestions from '../questions/1t/questions.json';
import oneTFreeQuestions from '../questions/1t/freeQuestions.json';
import s1Questions from '../questions/s1/questions.json';
import s1FreeQuestions from '../questions/s1/freeQuestions.json';
import r1Questions from '../questions/r1/questions.json';
import r1FreeQuestions from '../questions/r1/freeQuestions.json';
import onePQuestions from '../questions/1p/questions.json';
import onePFreeQuestions from '../questions/1p/freeQuestions.json';

export const getQuestions = (subject) => {
  if (subject === NATURFAG) {
    return naturfagQuestions;
  }
  if (subject === KJEMI1) {
    return kjemi1Questions;
  }
  if (subject === KJEMI2) {
    return kjemi2Questions;
  }
  if (subject === FYSIKK1) {
    return fysikk1Questions;
  }
  if (subject === ONET) {
    return oneTQuestions;
  }
  if (subject === S1) {
    return s1Questions;
  }
  if (subject === GEO) {
    return geografiQuestions;
  }
  if (subject === R1) {
    return r1Questions;
  }
  if (subject === ONEP) {
    return onePQuestions;
  }
  return naturfagQuestions;
};

export const getFreeQuestions = (subject) => {
  if (subject === NATURFAG) {
    return naturfagFreeQuestions;
  }
  if (subject === KJEMI1) {
    return kjemi1FreeQuestions;
  }
  if (subject === KJEMI2) {
    return kjemi2FreeQuestions;
  }
  if (subject === FYSIKK1) {
    return fysikk1FreeQuestions;
  }
  if (subject === ONET) {
    return oneTFreeQuestions;
  }
  if (subject === S1) {
    return s1FreeQuestions;
  }
  if (subject === GEO) {
    return geografiFreeQuestions;
  }
  if (subject === R1) {
    return r1FreeQuestions;
  }
  if (subject === ONEP) {
    return onePFreeQuestions;
  }
  return naturfagFreeQuestions;
};
