/* @flow */
import { inRange, random } from 'lodash';
import metrics from '../config/metrics';
import colors from '../config/colors';

/**
 * Gets randomly one of the available tile colors.
 * @param {Array<string>} blacklist - An array with the already picked colors.
 * @return {string} A random color.
 */
const getRandomTileColor = blacklist => {
  const randomIndex = random(0, colors.TILES.length - 1);
  const randomColor = colors.TILES[randomIndex];
  return blacklist.includes(randomColor) ? getRandomTileColor(blacklist) : randomColor;
};

/**
 * Gets a random tile number for a given level.
 * @param {number} level - The current game level.
 * @param {Array<number>} blacklist - An array the already picked numbers.
 * @return {number} A random number.
 */
const getRandomNumber = (level, blacklist = []) => {
  let randomNumber;
  if (level === 1) {
    randomNumber = random(0, 9);
  } else if (level <= 3) {
    randomNumber = random(0, 29);
  } else if (level <= 5) {
    randomNumber = random(-9, 39);
  } else if (level <= 7) {
    randomNumber = random(-29, 69);
  } else {
    randomNumber = random(-99, 99);
  }
  return blacklist.includes(randomNumber) ? getRandomNumber(level, blacklist) : randomNumber;
};

export default {
  getRandomTileColor,
  getRandomNumber,
};
