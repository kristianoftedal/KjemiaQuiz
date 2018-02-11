/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
import React, { Component } from 'react';
import { Text, Alert, Image } from 'react-native';
import { View } from 'react-native-animatable';
import PopupDialog from 'react-native-popup-dialog';
import { inject, observer } from 'mobx-react/native';
import PhotoView from 'react-native-photo-view';
import { times } from 'lodash';
import Button from 'apsl-react-native-button';
import DropdownAlert from 'react-native-dropdownalert';
import QuestionWrapper from '../../components/QuestionWrapper';
import LevelUp from '../../components/LevelUp';
import ScoreText from '../../components/ScoreText';
import style from './index.style';
import answersUtils from '../../utils/answersUtils';
import AnswerTile from './AnswerTile';
import AnimateNumber from '../../components/AnimateNumber';
import audioService from '../../services/audio';
import ProgressBar from './ProgressBar';
import periodicIcon from '../../images/periodicIcon.png';
import periodicTable from '../../images/periodicTable.png';
import metrics from '../../config/metrics';

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
  currentLevelIndex: allStores.game.currentLevelIndex
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
    currentLevelIndex: 0,
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
        this.dropdown.alertWithType('success', 'Riktig', '');
      } else {
        audioService.playFailureSound();
        this.dropdown.alertWithType('error', 'Feil', '');
      }
      if (prevProps.currentLevelIndex !== this.props.currentLevelIndex) {
        const opacity = this.animatedValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, 1, 0]
        })
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
    const { previousScore, score, currentQuestion } = this.props;
    let questionImage = null;

    const imageWidth = metrics.DEVICE_WIDTH * 0.95;
    const imageHeight = metrics.DEVICE_HEIGHT * 0.85;
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
            <Button
              title="Periodisk tabell"
              onPress={() => {
                this.popupDialog.show();
              }}
              style={style.periodicButton}>
              <Image style={style.periodicIcon} source={periodicIcon}/>
            </Button>
          </View>
        </View>
        <PopupDialog
          width={0.95}
          height={0.80}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
          <View>
            <PhotoView
              source={periodicTable}
              minimumZoomScale={0.5}
              maximumZoomScale={3}
              androidScaleType="center"
              onLoad={() => console.log("Image loaded!")}
              style={{width: imageWidth, height: imageHeight}} />
          </View>
        </PopupDialog>
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
