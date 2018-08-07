import { AsyncStorage } from 'react-native';
import { NATURFAG, KJEMI1, KJEMI2, S1, ONET, GEO, FYSIKK1, R1, ONEP } from '../stores/constants';

export const getXp = async (subject) => {
  if (subject === NATURFAG) {
      const responseXp = await AsyncStorage.getItem('currentXp');
      const xp = JSON.parse(responseXp) || 0;
      return xp;
  } else {
    const responseXp = await AsyncStorage.getItem('currentXp' + subject);
    const xp = JSON.parse(responseXp) || 0;
    return xp;
  }
};

export const getLevelIndex = async (subject) => {
  if (subject === NATURFAG) {
    const responseIndex = await AsyncStorage.getItem('currentLevelIndex' + subject);
    const index = JSON.parse(responseIndex) || 0;
    return index;
  } else {
    const responseIndex = await AsyncStorage.getItem('currentLevelIndex' + subject);
    const index = JSON.parse(responseIndex) || 0;
    return index;
  }
};

export const setLevelIndex = async (index, subject) => {
  if (subject === NATURFAG) {
    await AsyncStorage.setItem('currentLevelIndex', JSON.stringify(index));
  } else {
    await AsyncStorage.setItem('currentLevelIndex' + subject, JSON.stringify(index));
  }
};
export const setXp = async (xp, subject) => {
  if (subject === NATURFAG) {
    await AsyncStorage.setItem('currentXp', JSON.stringify(xp));
  } else {
    await AsyncStorage.setItem('currentXp' + subject, JSON.stringify(xp));
  }
};
