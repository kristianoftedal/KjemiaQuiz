import { NATURFAG, KJEMI1, KJEMI2, S1, ONET, GEO, FYSIKK1, R1, ONEP } from '../stores/constants';


const levelProvider = (topic) => {
  if (topic === NATURFAG) {
    return 'Naturfag';
  }
  if (topic === KJEMI1) {
    return 'Kjemi 1';
  }
  if (topic === KJEMI2) {
    return 'Kjemi 2';
  }
  if (topic === FYSIKK1) {
    return 'Fysikk 1';
  }
  if (topic === ONET) {
    return '1T';
  }
  if (topic === S1) {
    return 'S1';
  }
  if (topic === GEO) {
    return 'Geografi';
  }
  if (topic === ONEP) {
    return '1P';
  }
  if (topic === R1) {
    return 'R1';
  }
  return naturfagLevels;
};

export default levelProvider;