/* @flow */
/**
 * Here you can find the entire logic of the game.
 */
import { action, computed, observable } from 'mobx';
import { getQuestionsSet, getQuestionsSetByCriterias } from '../questions/questionService';
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
  @observable isCustomizedGame = false;
  @observable correctByCategory = {};

  @action
  startGame = () => {
    this.score = 0;
    this.currentIndex = 0;
    this.isEndgame = false;
    this.previousScore = 0;
    this.isGameRunning = true;
    this.isCorrectAnswer = false;
    this.isCustomizedGame = false;
    this.correctCount = 0;
    this.buildQuiz();
  };

  @action
  setCustomizedGame = (categories, difficulty, count) => {
    this.score = 0;
    this.currentIndex = 0;
    this.isEndgame = false;
    this.previousScore = 0;
    this.isGameRunning = true;
    this.isCorrectAnswer = false;
    this.correctCount = 0;
    this.isCustomizedGame = true;
    this.correctByCategory = {};
    this.questions = getQuestionsSetByCriterias(categories, difficulty, count);
  };

  @action
  buildQuiz = () => {
    this.questions = getQuestionsSet();
  };

  @action
  handleAnswerPress = async answerKey => {
    this.isCorrectAnswer = false;
    this.previousScore = this.score;
    let correctByCategory = this.correctByCategory[this.currentQuestion.category];
    if (!correctByCategory) {
      correctByCategory = { correct: 0, total: 0 };
    }
    if (this.currentQuestion.solution === answerKey) {
      this.score += 100;
      this.isCorrectAnswer = true;
      this.correctCount++;
      correctByCategory.correct++;
      correctByCategory.total++;
    } else {
      correctByCategory.total++;
    }
    this.correctByCategory[this.currentQuestion.category] = correctByCategory;
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

  @computed
  get correctPercentage() {
    const correctPercentage = this.correctCount / this.questions.length * 100;
    return correctPercentage;
  }
}
