import React, { Component } from 'react';
import { Provider } from 'mobx-react/native';
import RouterStore from './stores/router';
import GameStore from './stores/game';
import App from './containers/App';

const gameStore = new GameStore();
const routerStore = new RouterStore();

export class KjemiaQuiz extends Component {
  render() {
    return (
      <Provider router={routerStore} game={gameStore}>
        <App />
      </Provider>
    );
  }
}

export default KjemiaQuiz;
