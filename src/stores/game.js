/* @flow */
/**
 * Here you can find the entire logic of the game.
 */
import { action, computed, observable } from 'mobx';
import { getQuestionsSet, getQuestionsSetByCriterias } from '../questions/questionService';
import metrics from '../config/metrics';
import levels from '../config/levels';
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
  @observable currentXp = 0;
  @observable currentLevelIndex = 0;
  @observable isLevelUp = false;
  @observable isAdTime = false;
  @observable levelUpProgress = 0;
  @observable answeredQuestions = [];

  @action
  setBaseline() {
    this.questions = [];
    this.score = 0;
    this.currentIndex = 0;
    this.isEndgame = false;
    this.previousScore = 0;
    this.isGameRunning = true;
    this.isCorrectAnswer = false;
    this.isCustomizedGame = false;
    this.correctCount = 0;
    this.answeredQuestions = [];
    this.totalByCategory = {};
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
  startGame = () => {
    this.setBaseline();
    this.isCustomizedGame = false;
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
    this.questions = getQuestionsSetByCriterias(categories, difficulty, count);
  };

  @action
  buildQuiz = () => {
    this.questions = getQuestionsSet(30);
  };

  @action
  handleGoBack= () => {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex--;
    }
  };

  @action
  handleAnswerPress = async answerKey => {
    this.isCorrectAnswer = false;
    this.previousScore = this.score;
    let totalByCategory = this.totalByCategory[this.currentQuestion.category];
    if (!totalByCategory) {
      totalByCategory = { correct: 0, total: 0 };
    }
    if (!this.answeredQuestions.includes(this.currentQuestion.id)) {
      totalByCategory.total++;
      this.totalByCategory[this.currentQuestion.category] = totalByCategory;
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
        let nextScore = levels[this.currentLevelIndex + 1].score;
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
          setLevelIndex(this.currentLevelIndex).then(() => console.log('level set'));
        });
      }
    }
    if (this.currentIndex < this.questions.length) {
      this.currentIndex++;
    }
    if (this.currentIndex === this.questions.length) {
      this.isEndgame = true;
    }
    if (this.currentIndex !== 0 && this.currentIndex % 8 === 0 && this.currentIndex !== this.questions.length && this.currentIndex - 1 !== this.questions.length) {
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
    return levels[this.currentLevelIndex];
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
    if (this.currentLevelIndex + 1 > levels.length) {
      return levels[this.currentLevelIndex].score;
    }
    const nextLevelThreshold = levels[this.currentLevelIndex + 1].score;
    return nextLevelThreshold;
  };

  previousLevelThreshold = () => {
    if (this.currentLevelIndex === 0) {
      return 0;
    }
    const prev = levels[this.currentLevelIndex].score;
    return prev;
  }

  computeLevelUpProgress() {
    var threshold = this.nextLevelThreshold();
    var previous = this.previousLevelThreshold();
    var currentVal = this.currentXp - previous;
    const levelUpProgress = (currentVal / threshold) * 100;
    this.levelUpProgress = ((levelUpProgress * metrics.DEVICE_WIDTH )/ 100) * metrics.DEVICE_WIDTH / 100;
  }

  @computed
  get correctPercentage() {
    const correctPercentage = this.correctCount / this.questions.length * 100 || 0;
    return correctPercentage;
  }
}
