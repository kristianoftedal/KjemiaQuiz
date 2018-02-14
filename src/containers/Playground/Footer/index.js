/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react/native';
import { Text, Alert, Image } from 'react-native';
import { View } from 'react-native-animatable';
import PopupDialog from 'react-native-popup-dialog';
import PhotoView from 'react-native-photo-view';
import Button from 'apsl-react-native-button';
import style from './index.style';
import ScoreText from '../../../components/ScoreText';
import AnimateNumber from '../../../components/AnimateNumber';
import GoBackButton from './GoBackButton';
import periodicIcon from '../../../images/periodicIcon.png';

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
  score: allStores.game.score,
  currentQuestion: allStores.game.currentQuestion,
  currentIndex: allStores.game.currentIndex,
  previousScore: allStores.game.previousScore,
  currentLevelIndex: allStores.game.currentLevelIndex,
}))
@observer
export default class Playground extends Component {


  static defaultProps = {
    dialog: null
  };

  render() {
    const { previousScore, score, dialog } = this.props;
    return (
      <View style={style.footerWrapper}>
        <View style={style.footerLayout}>
          <GoBackButton />
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
          <Button
            title="Periodisk tabell"
            onPress={() => {
              dialog.show();
            }}
            style={style.periodicButton}>
            <Image style={style.periodicIcon} source={periodicIcon}/>
          </Button>
        </View>
      </View>
    );
  }
}
