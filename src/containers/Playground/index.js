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
import QuestionText from '../../components/QuestionText';
import style from './index.style';
@inject(allStores => ({
  navigateToEndgame: allStores.router.navigateToEndgame,
  score: allStores.game.score,
  startGame: allStores.game.startGame,
  handleAnswerPress: allStores.game.handleAnswerPress,
  currentQuestion: allStores.game.currentQuestion,
  currentIndex: allStores.game.currentIndex,
  questions: allStores.game.questions,
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
  };

  state = {
    hasAnswered: false,
  };

  componentDidMount() {
    this.props.startGame();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentIndex != this.props.currentIndex && this.state.hasAnswered) {
      this._questionRef.bounceInRight();
    }
  }

  _handleAnswerPress = answerKey => {
    this.setState({ hasAnswered: true });
    if (this._questionRef) {
      this._questionRef.fadeOutLeft(400);
    }
    this.props.handleAnswerPress(answerKey);
  };

  render() {
    const { isGameRunning, score, currentQuestion } = this.props;
    return (
      <View
        ref={ref => {
          this._questionRef = ref;
        }}
        animation={'bounceInRight'}
      >
        <QuestionText>{currentQuestion.questionText}</QuestionText>
        {currentQuestion.answers &&
          currentQuestion.answers.map(e => {
            return (
              <Button key={e.key} onPressOut={() => this._handleAnswerPress(e.key)}>
                {`${e.key}. ${e.value}`}
              </Button>
            );
          })}
        <Text>{'Score: ' + score}</Text>
      </View>
    );
  }
}
