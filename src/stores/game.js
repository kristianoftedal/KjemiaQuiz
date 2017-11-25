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
  @observable previousScore = 0;
  @observable questions = [];
  @observable currentIndex = 0;
  @observable isCorrectAnswer = false;
  //@observable currentQuestion;

  @action
  startGame = () => {
    this.isGameRunning = true;
    this.buildQuiz();
  };

  @action
  buildQuiz = () => {
    this.questions = getQuestionsSet();
  };

  @action
  handleAnswerPress = async answerKey => {
    this.isCorrectAnswer = false;
    this.previousScore = this.score;
    if (this.currentQuestion.solution === answerKey) {
      this.score += 100;
      this.isCorrectAnswer = true;
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
