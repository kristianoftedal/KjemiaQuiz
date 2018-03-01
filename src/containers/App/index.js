/* @flow */
/**
 * Main application component, handles the routing.
 */

import React, { Component } from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import backgroundImg from '../../images/bg.png';
import playgroundImg from '../../images/background2.jpg';
import Playground from '../Playground';
import Home from '../Home';
import Endgame from '../Endgame';
import Selection from '../Selection';
import About from '../About';
import ChemForm from '../ChemForm';
import styles from './index.style';

@inject(allStores => ({
  currentScreen: allStores.router.currentScreen,
}))
@observer
export default class App extends Component {
  static defaultProps = {
    currentScreen: 'HOME',
  };

  render() {
    let content;
    let bgImg = backgroundImg;
    switch (this.props.currentScreen) {
      case 'HOME':
        content = <Home />;
        break;
      case 'PLAYGROUND':
        bgImg = playgroundImg;
        content = <Playground />;
        break;
      case 'ENDGAME':
        content = <Endgame />;
        break;
      case 'SELECTION':
        content = <Selection />;
        break;
      case 'ABOUT':
        content = <About />;
        break;
      case 'CHEMFORM':
        content = <ChemForm />;
        break;
      default:
        content = <View />;
        break;
    }
    return (
      <ImageBackground source={bgImg} style={styles.container}>
        <StatusBar hidden={true} />
        {content}
      </ImageBackground>
    );
  }
}
