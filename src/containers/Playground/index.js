/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Alert, Image } from 'react-native';
import { View } from 'react-native-animatable';
import PopupDialog from 'react-native-popup-dialog';
import { inject, observer } from 'mobx-react/native';
import { times } from 'lodash';
import Button from 'apsl-react-native-button';
import DropdownAlert from 'react-native-dropdownalert';
import QuestionWrapper from '../../components/QuestionWrapper';
import LevelUp from '../../components/LevelUp';
import style from './index.style';
import answersUtils from '../../utils/answersUtils';
import AnswerTile from './AnswerTile';
import audioService from '../../services/audio';
import ProgressBar from './ProgressBar';
import metrics from '../../config/metrics';
import Footer from './Footer';
import {
  AdMobInterstitial,
} from 'react-native-admob'

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
  navigateToEndgame: allStores.router.navigateToEndgame,
  score: allStores.game.score,
  startGame: allStores.game.startGame,
  handleAnswerPress: allStores.game.handleAnswerPress,
  currentQuestion: allStores.game.currentQuestion,
  currentIndex: allStores.game.currentIndex,
  questions: allStores.game.questions,
  isCorrectAnswer: allStores.game.isCorrectAnswer,
  previousScore: allStores.game.previousScore,
  isEndgame: allStores.game.isEndgame,
  isCustomizedGame: allStores.game.isCustomizedGame,
  currentLevelIndex: allStores.game.currentLevelIndex,
  isAdTime: allStores.game.isAdTime,
}))
@observer
export default class Playground extends Component {
  _questionRef = null;
  _playRef = null;

  componentDidMount() {
    this._playRef.fadeIn(1500);
    if (!this.props.isCustomizedGame) {
      this.props.startGame();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAdTime) {
      AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910');
      // AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/2934735716');
      AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
      AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
    if (prevProps.currentIndex !== this.props.currentIndex) {
      if (this.props.isEndgame) {
        this.props.navigateToEndgame();
      }
      this._questionRef.bounceInRight(1000);
      if (this.props.isCorrectAnswer) {
        this.dropdown.alertWithType('success', 'Riktig', '');
        audioService.playSuccessSound();
      } else {
        this.dropdown.alertWithType('error', 'Feil', '');
        audioService.playFailureSound();
      }
    }
  }

  _handleAnswerPress = answerKey => {
    this._questionRef.fadeOutLeft(500);
    this.props.handleAnswerPress(answerKey);
  };

  render() {
    const { previousScore, score, currentQuestion } = this.props;
    let questionImage = null;
    
    if (currentQuestion.image) {
      questionImage = currentQuestion.image;
    }
    const alreadyPickedColors = [];
    times(4, n => {
      const color = answersUtils.getRandomTileColor(alreadyPickedColors);
      alreadyPickedColors.push(color);
    });
    return (
      <View
        style={style.container}
        ref={ref => { this._playRef = ref;}}
      >
        <ProgressBar />
        <View
          style={style.questionsWrapper}
          ref={ref => {this._questionRef = ref;}}
        >
          <QuestionWrapper image={questionImage}>{currentQuestion.questionText}</QuestionWrapper>     
          <View style={style.answerWrapper}>
            {currentQuestion.answers &&
              currentQuestion.answers.map((e, i) => {
                return (
                  <AnswerTile
                    backgroundColor={alreadyPickedColors[i]}
                    key={e.key}
                    text={`${e.key}. ${e.value}`}
                    onTilePress={() => this._handleAnswerPress(e.key)}
                  />
                );
              })}
          </View>
        </View>
        <Footer/>
        <DropdownAlert
          ref={ref => this.dropdown = ref}
          closeInterval={1000}
          imageStyle={null}
          successColor="#2ecc71"
          errorColor="#e74c3c"
        />
      </View>
    );
  }
}
