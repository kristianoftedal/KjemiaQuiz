import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';
import SplashScreen from 'react-native-splash-screen';
import RouterStore from './stores/router';
import SubscriptionStore from './stores/subscription';
import GameStore from './stores/game';
import App from './containers/App';

const gameStore = new GameStore();
const routerStore = new RouterStore();
const subscriptionStore = new SubscriptionStore();
const subjectStore = new subjectStore();

export class KjemiaQuiz extends Component {
  
  componentDidMount() {
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider router={routerStore} game={gameStore} subscription={subscriptionStore} subject={subjectStore}>
        <App />
      </Provider>
    );
  }
}

export default KjemiaQuiz;
