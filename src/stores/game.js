/* @flow */
/**
 * Here you can find the entire logic of the game.
 */
import { action, computed, observable } from 'mobx';
import { getQuestionsSet } from '../questions/questionService';

export default class GameStore {
  @observable isGameRunning = false;
  @observable isEndgame = false;
  @observable level = 1;
  @observable score = 0;
  @observable questions = [];
  @observable currentIndex = 0;
  //@observable currentQuestion;

  @action
  startGame = () => {
    this.level = 1;
    this.score = 0;
    this.isGameRunning = true;
    this.buildQuiz();
  };

  @action
  buildQuiz = () => {
    this.questions = getQuestionsSet();
    this.currentIndex = 0;
  };

  @action
  handleAnswerPress = async answerKey => {
    if (this.currentQuestion.solution === answerKey) {
      this.score += 100;
    }
    if (this.currentIndex < this.questions.length) {
      this.currentIndex++;
    }
  };

  @computed
  get currentQuestion() {
    if (this.questions.length === 0) {
      return {};
    }
    return this.questions[this.currentIndex];
  }
}
