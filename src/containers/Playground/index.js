/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
import React, { Component } from 'react';
import { Text, Alert } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import { times } from 'lodash';
import Button from 'apsl-react-native-button';
import QuestionWrapper from '../../components/QuestionWrapper';
import ScoreText from '../../components/ScoreText';
import style from './index.style';
import answersUtils from '../../utils/answersUtils';
import AnswerTile from './AnswerTile';
import AnimateNumber from '../../components/AnimateNumber';
import audioService from '../../services/audio';
import ProgressBar from './ProgressBar';

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
}))
@observer
export default class Playground extends Component {
  _questionRef = null;
  _playRef = null;
  static defaultProps = {
    navigateToEndgame: () => null,
    navigateToHome: () => null,
    currentQuestion: {},
    isGameRunning: false,
    score: 0,
    previousScore: 0,
    startGame: () => null,
    handleAnswerPress: () => null,
    isCorrectAnswer: false,
    isEndgame: false,
    isCustomizedGame: false,
  };

  componentDidMount() {
    this._playRef.fadeIn(1500);
    if (!this.props.isCustomizedGame) {
      this.props.startGame();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      if (this.props.isEndgame) {
        this.props.navigateToEndgame();
      }
      this._questionRef.bounceInRight(1000);
      if (this.props.isCorrectAnswer) {
        audioService.playSuccessSound();
      } else {
        audioService.playFailureSound();
      }
    }
  }

  _handleAnswerPress = answerKey => {
    this._questionRef.fadeOutLeft(500);
    this.props.handleAnswerPress(answerKey);
  };

  _handleBackPress = () => {
    const onYes = () => {
      this._questionRef.fadeOutLeft(500);
      this.props.navigateToHome();
    };
    Alert.alert(
      'Sikker på at du ønsker å avslutte?',
      '',
      [
        { text: 'Nei', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'Ja',
          onPress: onYes,
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const { isGameRunning, previousScore, score, currentQuestion } = this.props;
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
        ref={ref => {
          this._playRef = ref;
        }}
      >
        <ProgressBar />
        <View
          style={style.questionsWrapper}
          ref={ref => {
            this._questionRef = ref;
          }}
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
        <View style={style.footerWrapper}>
          <View style={style.footerLayout}>
            <Button onPress={this._handleBackPress} style={style.backButton}>
              <Text style={style.buttonText}>&lt;</Text>
            </Button>
            <ScoreText key={score}>
              {'Score: '}
              <AnimateNumber
                initial={previousScore}
                value={score}
                interval={10}
                timing="easeOut"
                countBy={5}
              />
            </ScoreText>
          </View>
        </View>
      </View>
    );
  }
}
