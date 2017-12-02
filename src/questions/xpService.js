import { AsyncStorage } from 'react-native';

export const getXp = async () => {
  const responseXp = await AsyncStorage.getItem('currentLevelXp');
  const xp = JSON.parse(responseXp) || 0;
  return xp;
};

export const getLevelIndex = async () => {
  const responseIndex = await AsyncStorage.getItem('currentLevelIndex');
  const index = JSON.parse(responseIndex) || 0;
  return index;
};

export const setLevelIndex = async index => {
  await AsyncStorage.setItem('currentLevelIndex', JSON.stringify(index));
};
export const setXp = async xp => {
  await AsyncStorage.setItem('currentLevelXp', JSON.stringify(xp));
};
