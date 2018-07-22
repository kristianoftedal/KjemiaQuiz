/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
import React, { Component } from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import PropTypes from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/prop-types';
import { inject, observer } from 'mobx-react/native';
import { Text, Alert, Image } from 'react-native';
import { View } from 'react-native-animatable';
import PhotoView from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-native-photo-view';
import Button from 'apsl-react-native-button';
import PeriodicTable from '../../../components/PeriodicTable';
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
      level: props.level,
    };
  }

  _togglePeriodicTable = () => {
    const visible = !this.state.visible;
    this.setState({visible: visible});
  }

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
            onPress={() => this._togglePeriodicTable()}
            style={style.periodicButton}>
            <Image style={style.periodicIcon} source={periodicIcon}/>
          </Button>
        </View>
        <PeriodicTable visible={this.state.visible} onClose={this._togglePeriodicTable}/>
      </View>
    );
  }
}
