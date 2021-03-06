import { find } from 'lodash';
import questionImages from './questionImages';
import shuffle from '../utils/shuffle';
import questions from './questions.json';
import freeQuestions from './freeQuestions.json';

const snapshotToArray = (snapshot) => {
  var returnArr = [];
  db.ref('/naturfagQuestions').on('value', snapshot => {
    returnArr = snapshot.val();
  });
  return returnArr;
};

const getRandomNumber = (max, blackList) => {
  const randomNumber = Math.floor(Math.random() * max);
  return blackList.includes(randomNumber) ? getRandomNumber(max, blackList) : randomNumber;
};

export const getQuestionsSet = (max, hasSubscription) => {
  const ceiling = max || questions.length;
  
  let questionsSet = [];
  const alreadyPickedNumbers = [];
  let number = 0;
  let questionList = [] 
  
  if (!hasSubscription) {
    questionList = shuffle(freeQuestions);
  } else {
    questionList = shuffle(questions);
  }
  
  for (let i = 0; i < ceiling; i++) {
    number = getRandomNumber(ceiling, alreadyPickedNumbers);
    let question = questionList[number];
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

export const getQuestionsSetByCriterias = (categories, difficulty, count, hasSubscription) => {
  let questionList = [];
  if (!hasSubscription) {
    questionList = shuffle(freeQuestions);
  } else {
    questionList = shuffle(questions);
  }
  if (difficulty) {
    questionList = questionList.filter(e => e.difficulty === difficulty);
  }
  if (categories) {
    const temp = categories.filter(e => e.isSelected);
    questionList = questionList.filter(q => temp.map(x => x.value).indexOf(q.category > -1));
  }
  if (count > questionList.length) {
    count = questionList.length;
  }
  const ceiling = count || questionList.length;
  const selectedCategories = categories.filter(e => e.isSelected);
  const categoryCeiling = ceiling / selectedCategories.length;
  let number = 0;
  let questionsSet = [];
  let alreadyPickedNumbers = [];
  if (categories) {
    for (let i = 0; i < selectedCategories.length; i++) {
      alreadyPickedNumbers = [];
      const selectedCategory = selectedCategories[i].value;
      for (let j = 0; j < categoryCeiling; j++) {
        let qPerCategory = questionList.filter(e => e.category === selectedCategory);
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
