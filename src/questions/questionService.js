import questionImages from './questionImages';
import { find } from 'lodash';

const getRandomNumber = (max, blackList) => {
  const randomNumber = Math.floor(Math.random() * max);
  return blackList.includes(randomNumber) ? getRandomNumber(max, blackList) : randomNumber;
};

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

  // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

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
  if (difficulty) {
    questions = questions.filter(e => e.difficulty === difficulty);
  }
  if (categories) {
    questions = questions.filter(q => categories.map(x => x.value).indexOf(q.difficulty > -1));
  }
  if (count > questions.length) {
    count = questions.length;
  }
  const ceiling = count || questions.length;
  const ceilingPerCategory = ceiling / categories.length;
  let number = 0;
  const questionsSet = [];
  let alreadyPickedNumbers = [];
  if (categories) {
    for (let i = 0; i < categories.length; i++) {
      let qPerCategory = questions.filter(e >= e.category === categories[j]);
      alreadyPickedNumbers = [];
      for (let j = 0; j < ceiling; j++) {
        number = getRandomNumber(ceiling, alreadyPickedNumbers);
        alreadyPickedNumbers.push(number);
        let question = qPerCategory[number];
        if (question.imageId) {
          question.image = find(questionImages, { id: question.imageId }).image;
        }
        questionsSet.push(question);
      }
    }
    return questionsSet;
  } else {
    let number = 0;
    for (let i = 0; i < ceiling; i++) {
      number = getRandomNumber(ceiling, alreadyPickedNumbers);
      alreadyPickedNumbers.push(number);
      let question = questions[number];
      if (question.imageId) {
        question.image = find(questionImages, { id: question.imageId }).image;
      }
      questionsSet.push(question);
    }
    return questionsSet;
  }
};
