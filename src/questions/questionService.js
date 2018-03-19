import { find } from 'lodash';
import questionImages from './questionImages';
import shuffle from '../utils/shuffle';

import db from '../config/db';
let questions = require('./questions.json');

const getRandomNumber = (max, blackList) => {
  const randomNumber = Math.floor(Math.random() * max);
  return blackList.includes(randomNumber) ? getRandomNumber(max, blackList) : randomNumber;
};

export const getQuestionsSet = max => {
  const ceiling = max || questions.length;
  let questionsSet = [];
  const alreadyPickedNumbers = [];
  let number = 0;
  questions = shuffle(questions);
  for (let i = 0; i < ceiling; i++) {
    number = getRandomNumber(ceiling, alreadyPickedNumbers);
    let question = questions[number];
    alreadyPickedNumbers.push(number);
    if (question.imageId && question.imageId !== '') {
      const image = find(questionImages, { id: question.imageId });
      if (image) {
        question.image = image.src;
      }
    }
    questionsSet.push(question);
  }
  questionsSet = shuffle(questionsSet);
  return questionsSet;
};

export const getQuestionsSetByCriterias = (categories, difficulty, count) => {
  if (difficulty) {
    questions = questions.filter(e => e.difficulty === difficulty);
  }
  if (categories) {
    questions = questions.filter(q => categories.map(x => x.value).indexOf(q.category > -1));
  }
  if (count > questions.length) {
    count = questions.length;
  }
  const ceiling = count || questions.length;
  const selectedCategories = categories.filter(e => e.isSelected);
  const categoryCeiling = ceiling / selectedCategories.length;
  let number = 0;
  let questionsSet = [];
  let alreadyPickedNumbers = [];
  questions = shuffle(questions);
  if (categories) {
    for (let i = 0; i < selectedCategories.length; i++) {
      alreadyPickedNumbers = [];
      const selectedCategory = selectedCategories[i].value;
      for (let j = 0; j < categoryCeiling; j++) {
        let qPerCategory = questions.filter(e => e.category === selectedCategory);
        number = getRandomNumber(categoryCeiling, alreadyPickedNumbers);
        alreadyPickedNumbers.push(number);
        let question = qPerCategory[number];
        if (!question) continue;
        if (question.imageId && question.imageId !== '') {
          const image = find(questionImages, { id: question.imageId });
          if (image) {
            question.image = image.src;
          }
        }
        questionsSet.push(question);
      }
    }
    questionsSet = shuffle(questionsSet);
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
