import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';
import SplashScreen from 'react-native-splash-screen';
import RouterStore from './stores/router';
import SubscriptionStore from './stores/subscription';
import GameStore from './stores/game';
import App from './containers/App';
import SubjectStore from './stores/subject';

export class KjemiaQuiz extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider
        router={RouterStore}
        game={GameStore}
        subscription={SubscriptionStore}
        subject={SubjectStore}
      >
        <App />
      </Provider>
    );
  }
}

export default KjemiaQuiz;
