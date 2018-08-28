/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { Image, Text } from 'react-native';
import { View } from 'react-native-animatable';
import Button from 'apsl-react-native-button';
import PeriodicTable from '../../../components/PeriodicTable';
import Explanation from '../../../components/Explanation';
import style from './index.style';
import ScoreText from '../../../components/ScoreText';
import AnimateNumber from '../../../components/AnimateNumber';
import GoBackButton from './GoBackButton';
import QuitButton from './QuitButton';
import periodicIcon from '../../../images/periodicIcon.png';

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
  score: allStores.game.score,
  currentQuestion: allStores.game.currentQuestion,
  currentIndex: allStores.game.currentIndex,
  previousScore: allStores.game.previousScore,
}))
@observer
export default class Playground extends Component {
  constructor(props) {
    super();
    this.state = {
      visible: false,
      showExplanation: false,
      level: props.level,
    };
  }

  _togglePeriodicTable = () => {
    const visible = !this.state.visible;
    this.setState({ visible: visible });
  };

  _toggleExplanation = () => {
    const visible = !this.state.showExplanation;
    this.setState({ showExplanation: visible });
  };

  render() {
    const { previousScore, score, dialog } = this.props;
    return (
      <View style={style.footerWrapper}>
        <View style={style.footerLayout}>
          <QuitButton />
          <GoBackButton />
          <ScoreText key={score}>
            {'Score: '}
            <AnimateNumber
              initial={previousScore}
              value={score}
              interval={8}
              timing="easeOut"
              countBy={7}
            />
          </ScoreText>
          <Button
            title="Periodisk tabell"
            onPress={() => this._toggleExplanation()}
            style={style.explanationButton}
          >
            <Text style={style.buttonText}>?</Text>
          </Button>
          <Button
            title="Periodisk tabell"
            onPress={() => this._togglePeriodicTable()}
            style={style.periodicButton}
          >
            <Image style={style.periodicIcon} source={periodicIcon} />
          </Button>
        </View>
        <PeriodicTable visible={this.state.visible} onClose={this._togglePeriodicTable} />
        <Explanation
          visible={this.state.showExplanation}
          text={this.props.currentQuestion.explanation}
          onClose={this._toggleExplanation}
        />
      </View>
    );
  }
}
