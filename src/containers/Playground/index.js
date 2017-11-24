/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import { times } from 'lodash';
import QuestionText from '../../components/QuestionText';
import ScoreText from '../../components/ScoreText';
import style from './index.style';
import answersUtils from '../../utils/answersUtils';
import AnswerTile from './AnswerTile';
import AnimateNumber from 'react-native-animate-number';
import audioService from '../../services/audio';
import { Footer } from 'native-base';

@inject(allStores => ({
  navigateToEndgame: allStores.router.navigateToEndgame,
  score: allStores.game.score,
  startGame: allStores.game.startGame,
  handleAnswerPress: allStores.game.handleAnswerPress,
  currentQuestion: allStores.game.currentQuestion,
  currentIndex: allStores.game.currentIndex,
  questions: allStores.game.questions,
  isCorrectAnswer: allStores.game.isCorrectAnswer,
}))
@observer
export default class Playground extends Component {
  _questionRef = null;

  static defaultProps = {
    navigateToEndgame: () => null,
    currentQuestion: {},
    isGameRunning: false,
    score: 0,
    startGame: () => null,
    handleAnswerPress: () => null,
    isCorrectAnswer: false,
  };

  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentIndex !== this.props.currentIndex) {
      this._questionRef.bounceInRight();
      if (this.props.isCorrectAnswer) {
        audioService.playSuccessSound();
      } else {
        audioService.playFailureSound();
      }
    }
  }

  _handleAnswerPress = answerKey => {
    this._questionRef.fadeOutLeft();
    this.props.handleAnswerPress(answerKey);
  };

  render() {
    const { isGameRunning, score, currentQuestion } = this.props;
    const alreadyPickedColors = [];
    times(4, n => {
      const color = answersUtils.getRandomTileColor(alreadyPickedColors);
      alreadyPickedColors.push(color);
    });
    return (
      <View style={style.container}>
        <View
          style={style.questionsWrapper}
          ref={ref => {
            this._questionRef = ref;
          }}
        >
          <QuestionText>{currentQuestion.questionText}</QuestionText>
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
        <View style={style.scoreWrapper}>
          <ScoreText>{'Score: '}<AnimateNumber value={score} interval={5} timing="easeOut" countBy={3}/></ScoreText>
        </View>
      </View>
    );
  }
}
