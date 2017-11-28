import questionImages from './questionImages';
import { find } from 'lodash';

const getRandomNumber = (max, blackList) => {
  const randomNumber = Math.floor(Math.random() * max);
  return blackList.includes(randomNumber) ? getRandomNumber(max, blackList) : randomNumber;
};

export const getQuestionsSet = max => {
  const questions = require('./questions.json');
  const ceiling = max || questions.length;
  const questionsSet = [];
  const alreadyPickedNumbers = [];
  let number = 0;
  for (let i = 0; i < ceiling; i++) {
    let question = questions[i];
    number = getRandomNumber(ceiling, alreadyPickedNumbers);
    alreadyPickedNumbers.push(number);
    if (question.imageId) {
      question.image = find(questionImages, { id: question.imageId }).image;
    }
    questionsSet.push(questions[number]);
  }
  return questionsSet;
};

export const getQuestionsSetByCriterias = (categories, difficulty, count) => {
  let questions = require('./questions.json');
  if (count > questions.length) {
    count = questions.length;
  }
  if (difficulty) {
    questions = questions.filter(e => e.difficulty === difficulty);
  }
  if (categories) {
    questions = questions.filter(q => categories.map(x => x.value).indexOf(q.difficulty > -1));
  }
  const ceiling = count || questions.length;
  const questionsSet = [];
  const alreadyPickedNumbers = [];
  let number = 0;
  for (let i = 0; i < ceiling; i++) {
    let question = questions[i];
    number = getRandomNumber(ceiling, alreadyPickedNumbers);
    alreadyPickedNumbers.push(number);
    if (question.imageId) {
      question.image = find(questionImages, { id: question.imageId }).image;
    }
    questionsSet.push(questions[number]);
  }
  return questionsSet;
};
