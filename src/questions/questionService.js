const getRandomNumber = () => {
  return Math.floor(Math.random() * 7);
};

export const getQuestionsSet = () => {
  const questions = require('./questions.json');
  const questionsSet = [];
  for (let i = 0; i < 7; i++) {
    questionsSet.push(questions[getRandomNumber()]);
  }
  return questionsSet;
};
