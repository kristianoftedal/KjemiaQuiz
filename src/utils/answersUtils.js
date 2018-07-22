/* @flow */
import { random } from '../../../../Library/Caches/typescript/2.9/node_modules/@types/lodash';
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

export default {
  getRandomTileColor,
};
