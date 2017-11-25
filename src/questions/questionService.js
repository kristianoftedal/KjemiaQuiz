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
