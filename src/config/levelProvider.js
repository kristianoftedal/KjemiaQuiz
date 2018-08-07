import { NATURFAG, KJEMI1, KJEMI2, S1, ONET, GEO, FYSIKK1, R1, ONEP } from '../stores/constants';
import naturfagLevels from './naturfag/levels';
import kjemi1Levels from './kjemi1/levels';
import kjemi2Levels from './kjemi2/levels';
import fysikk1Levels from './fysikk1/levels';
import s1Levels from './s1/levels';
import oneTLevels from './1t/levels';
import geografiLevels from './geografi/levels';
import onePLevels from './1p/levels';
import r1Levels from './r1/levels';

const levelProvider = (topic) => {
  if (topic === NATURFAG) {
    return naturfagLevels;
  }
  if (topic === KJEMI1) {
    return kjemi1Levels;
  }
  if (topic === KJEMI2) {
    return kjemi2Levels;
  }
  if (topic === FYSIKK1) {
    return fysikk1Levels;
  }
  if (topic === ONET) {
    return oneTLevels;
  }
  if (topic === S1) {
    return s1Levels;
  }
  if (topic === GEO) {
    return geografiLevels;
  }
  if (topic === ONEP) {
    return onePLevels;
  }
  if (topic === R1) {
    return r1Levels;
  }
  return naturfagLevels;
};

export default levelProvider;