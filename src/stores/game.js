/* @flow */
/**
 * Here you can find the entire logic of the game.
 */
import { action, computed, observable } from 'mobx';
import { getQuestionsSet } from '../questions/questionService';
import metrics from '../config/metrics';

export default class GameStore {
  @observable isGameRunning = false;
  @observable isEndgame = false;
  @observable level = 1;
  @observable score = 0;
  @observable previousScore = 0;
  @observable questions = [];
  @observable currentIndex = 0;
  @observable isCorrectAnswer = false;
  @observable correctCount = 0;

  @action
  startGame = () => {
    this.score = 0;
    this.currentIndex = 0;
    this.isEndgame = false;
    this.previousScore = 0;
    this.isGameRunning = true;
    this.isCorrectAnswer = false;
    this.correctCount = 0;
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
      this.correctCount++;
    }
    if (this.currentIndex < this.questions.length) {
      this.currentIndex++;
    }
    if (this.currentIndex === this.questions.length) {
      this.isEndgame = true;
    }
  };

  @computed
  get currentQuestion() {
    if (this.questions.length === 0) {
      return {};
    }
    if (this.isEndgame) {
      return {};
    }
    return this.questions[this.currentIndex];
  }
  @computed
  get quizLength() {
    return this.questions.length;
  }

  @computed
  get getProgress() {
    if (this.questions.length === 0) {
      return 0;
    }
    const quizProgress = this.currentIndex / this.questions.length * 100;
    return quizProgress * metrics.DEVICE_WIDTH / 100;
  }
}
