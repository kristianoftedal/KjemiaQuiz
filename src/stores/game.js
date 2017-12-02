/* @flow */
/**
 * Here you can find the entire logic of the game.
 */
import { action, computed, observable } from 'mobx';
import { getQuestionsSet, getQuestionsSetByCriterias } from '../questions/questionService';
import metrics from '../config/metrics';
import levels from '../questions/levels';
import { getXp, getLevelIndex, setXp, setLevelIndex } from '../questions/xpService';

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
  @observable currentLevelXp = 0;
  @observable currentLevelIndex = 0;
  @observable isLevelUp = false;
  @observable currentLevel = '';

  setBaseline() {
    this.score = 0;
    this.currentIndex = 0;
    this.isEndgame = false;
    this.previousScore = 0;
    this.isGameRunning = true;
    this.isCorrectAnswer = false;
    this.totalByCategory = {};
  }

  getLevels = async () => {
    this.currentLevelXp = await getXp();
    this.currentLevelIndex = await getLevelIndex();
  };

  @action
  startGame = () => {
    this.setBaseline();
    this.isCustomizedGame = false;
    this.correctCount = 0;
    this.buildQuiz();
  };

  @action
  initPlayer = () => {
    debugger;
    this.getLevels().then(() => {
      if (this.currentLevelXp >= levels[this.currentLevelIndex]) {
        this.currentLevelIndex++;
      }
      console.log(this.currentLevelXp);
      console.log(this.currentLevelIndex);
    });
  };

  @action
  setCustomizedGame = (categories, difficulty, count) => {
    this.setBaseline();
    this.isCustomizedGame = true;
    this.questions = getQuestionsSetByCriterias(categories, difficulty, count);
  };

  @action
  buildQuiz = () => {
    this.questions = getQuestionsSet();
  };

  @action
  handleAnswerPress = async answerKey => {
    this.isCorrectAnswer = false;
    debugger;
    this.previousScore = this.score;
    let totalByCategory = this.totalByCategory[this.currentQuestion.category];
    if (!totalByCategory) {
      totalByCategory = { correct: 0, total: 0 };
    }
    if (this.currentQuestion.solution === answerKey) {
      if (this.currentQuestion.difficulty === 'Lett') {
        this.score += 100;
        this.currentLevelXp += 100;
      } else if (this.currentQuestion.difficulty === 'Middels') {
        this.score += 200;
        this.currentLevelXp += 200;
      } else if (this.currentQuestion.difficulty === 'Vanskelig') {
        this.score += 300;
        this.currentLevelXp += 300;
      } else {
        this.score += 100;
        this.currentLevelXp += 100;
      }
      if (this.currentLevelXp >= levels[this.currentLevelIndex + 1].score) {
        debugger;
        this.currentLevelIndex++;
        this.currentLevel = levels[this.currentLevelIndex].value;
      }
      this.isCorrectAnswer = true;
      this.correctCount++;
      totalByCategory.correct++;
      totalByCategory.total++;
    } else {
      totalByCategory.total++;
    }
    this.totalByCategory[this.currentQuestion.category] = totalByCategory;
    if (this.currentIndex < this.questions.length) {
      this.currentIndex++;
    }
    if (this.currentIndex === this.questions.length) {
      this.isEndgame = true;
    }
    setLevelIndex(this.currentLevelIndex).then(() => console.log('ok'));
    setXp(this.currentLevelXp).then(() => console.log('ok'));
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

  nextLevelThreshold = () => {
    debugger;
    const nextLevelThreshold = levels[this.currentLevelIndex + 1].score;
    return nextLevelThreshold;
  };

  @computed
  get getLevelUpProgress() {
    debugger;
    const levelUpProgress = this.currentLevelXp / this.nextLevelThreshold() * 100;
    return levelUpProgress * metrics.DEVICE_WIDTH / 100;
  }

  @computed
  get correctPercentage() {
    const correctPercentage = this.correctCount / this.questions.length * 100 || 0;
    return correctPercentage;
  }
}
