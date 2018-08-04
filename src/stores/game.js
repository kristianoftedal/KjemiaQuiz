/* @flow */
/**
 * Here you can find the entire logic of the game.
 */
import { action, computed, observable } from 'mobx';
import { getQuestionsSet, getQuestionsSetByCriterias } from '../questions/questionHelper';
import metrics from '../config/metrics';
import subjectStore from './subject';
import { getXp, getLevelIndex, setXp, setLevelIndex } from '../services/xpService';

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
  @observable totalByCategory = {};
  @observable currentXp = 0;
  @observable currentLevelIndex = 0;
  @observable isLevelUp = false;
  @observable isAdTime = false;
  @observable hasSubscription = false;
  @observable levelUpProgress = 0;
  @observable answeredQuestions = [];
  @observable levels = [];

  @action
  setBaseline() {
    this.score = 0;
    this.currentIndex = 0;
    this.isEndgame = false;
    this.previousScore = 0;
    this.isGameRunning = true;
    this.isCorrectAnswer = false;
    this.correctCount = 0;
    this.answeredQuestions = [];
    this.totalByCategory = {};
    this.isLevelUp = false;
    this.isAdTime = false;
    this.levels = subjectStore.getLevels();
  }

  getLevels = async () => {
    this.currentXp = await getXp();
    this.currentLevelIndex = await getLevelIndex();
  };

  @action
  resetGame = () => {
    this.setBaseline();
    this.isCustomizedGame = false;
  }

  @action
  startGame = (hasSubscription) => {
    this.hasSubscription = hasSubscription;
    this.setBaseline();
    this.buildQuiz();
  };

  @action
  initPlayer = () => {
    this.getLevels().then(() => {
      this.computeLevelUpProgress();
    });
  };

  @action
  setCustomizedGame = (categories, difficulty, count) => {
    this.setBaseline();
    this.isCustomizedGame = true;
    this.correctCount = 0;
    this.questions = getQuestionsSetByCriterias(categories, difficulty, count, this.hasSubscription);
  };

  @action
  buildQuiz = () => {
    if (!this.isCustomizedGame) {
      this.questions = getQuestionsSet(30, this.hasSubscription);
    }
  };

  @action
  handleGoBack= () => {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex--;
    }
  };

  @action
  handleAnswerPress = async answerKey => {
    this.isLevelUp = false;
    this.isCorrectAnswer = false;
    this.previousScore = this.score;
    let totalByCategory = this.totalByCategory[this.currentQuestion.category];
    if (!totalByCategory) {
      totalByCategory = { correct: 0, total: 0 };
    }
    if (this.answeredQuestions.includes(this.currentQuestion.id)) {
      if (this.currentQuestion.solution === answerKey) {
        this.isCorrectAnswer = true;
      }
    } else {
      this.answeredQuestions.push(this.currentQuestion.id);
      if (this.currentQuestion.solution === answerKey) {
        if (this.currentQuestion.difficulty === 'Lett') {
          this.score += 50;
          this.currentXp += 50;
        } else if (this.currentQuestion.difficulty === 'Middels') {
          this.score += 100;
          this.currentXp += 100;
        } else if (this.currentQuestion.difficulty === 'Vanskelig') {
          this.score += 200;
          this.currentXp += 200;
        } else {
          this.score += 50;
          this.currentXp += 50;
        }
        let nextScore = this.levels[this.currentLevelIndex + 1].score;
        let test = this.currentXp >= nextScore;
        if (this.currentXp >= nextScore) {
          this.currentLevelIndex += 1;
          this.isLevelUp = true;
        } else {
          this.isLevelUp = false;
        }
        this.isCorrectAnswer = true;
        this.correctCount++;
        totalByCategory.correct++;
        setXp(this.currentXp).then(() => {
          setLevelIndex(this.currentLevelIndex);
        });
      }
      totalByCategory.total++;
      this.totalByCategory[this.currentQuestion.category] = totalByCategory;
    }
    if (this.currentIndex < this.questions.length) {
      this.currentIndex++;
    }
    if (this.currentIndex === this.questions.length) {
      this.isEndgame = true;
    }
    if (!this.hasSubscription && !this.isLevelUp && this.currentIndex !== 0 && this.currentIndex % 6 === 0 && this.currentIndex !== this.questions.length && this.currentIndex - 1 !== this.questions.length) {
      this.isAdTime = true;
    } else {
      this.isAdTime = false;
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
  get currentLevel() {
    return this.levels[this.currentLevelIndex];
  }
  @computed
  get getProgress() {
    if (this.questions.length === 0) {
      return 0;
    }
    const quizProgress = this.currentIndex / this.questions.length * 100;
    return quizProgress * metrics.DEVICE_WIDTH / 100;
  }

  nextLevelThreshold = () => {
    if (this.currentLevelIndex + 1 > this.levels.length || this.currentLevelIndex === 0) {
      return this.levels[this.currentLevelIndex].score;
    }
    const nextLevelThreshold = this.levels[this.currentLevelIndex + 1].score;
    return nextLevelThreshold;
  };

  currentLevelThreshold = () => {
    if (this.currentLevelIndex === 0) {
      return 0;
    }
    const prev = this.levels[this.currentLevelIndex].score;
    return prev;
  }

  computeLevelUpProgress() {
    const threshold = this.nextLevelThreshold();
    const currentVal = this.currentXp - this.currentLevelThreshold();
    const levelUpPercentage = (currentVal / threshold) * 100;
    this.levelUpProgress = ((levelUpPercentage * (metrics.DEVICE_WIDTH - 70))/ 100);
  }

  @computed
  get correctPercentage() {
    const correctPercentage = this.correctCount / this.questions.length * 100 || 0;
    return correctPercentage;
  }
}
