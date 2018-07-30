/* @flow */
/**
 * The core of the game.
 * It links the Board to the MobX store and navigates to the Endgame screen when needed.
 */
<<<<<<< HEAD
import React, { Component } from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react';
import PropTypes from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/prop-types';
=======
import React, { Component } from 'react';
>>>>>>> master
import { inject, observer } from 'mobx-react/native';
import { Image, Text } from 'react-native';
import { View } from 'react-native-animatable';
<<<<<<< HEAD
import PhotoView from '../../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-native-photo-view';
=======
>>>>>>> master
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
    this.setState({visible: visible});
  }

  _toggleExplanation = () => {
    const visible = !this.state.showExplanation;
    this.setState({showExplanation: visible});
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
            onPress={() => this._toggleExplanation()}
            style={style.explanationButton}>
             <Text style={style.buttonText}>?</Text>
          </Button>
          <Button
            title="Periodisk tabell"
            onPress={() => this._togglePeriodicTable()}
            style={style.periodicButton}>
            <Image style={style.periodicIcon} source={periodicIcon}/>
          </Button>
        </View>
        <PeriodicTable visible={this.state.visible} onClose={this._togglePeriodicTable}/>
        <Explanation 
          visible={this.state.showExplanation}
          text="5,00 g er massen til *Zn(OH)_2|*. Det første du må gjøre er å finne ut hvor mange mol 5,00 g *Zn(OH)_2|* tilsvarer. Husk: veien om mol er veien til mål. Dette finner du ved å dele 5,00 g på den molare massen til *Zn(OH)_2|*. 5,00 g ÷ 99,424 g/mol = 0,050 mol. 0,050 er stoffmengden *Zn(OH)_2|*. Stoffmengden av hydrogen er dobbelt så stor som stoffmengden *Zn(OH)_2|*, fordi det er tilsammen 2 *OH^-|*-ioner som begge inneholder ett hydrogen i *Zn(OH)_2|*. Først ganger du stoffmengden med 2, deretter ganger du med den molare massen til hydrogen. Da får du: 2 ∙ 0.050 mol = 0.101 mol. 0.101 mol ∙ 1.008 g/mol = 1,109 g." 
          onClose={this._toggleExplanation} />
      </View>
    );
  }
}
