/**
 * A super-simple MobX routing solution.
 */
import { observable } from 'mobx';

class RouterStore {
  @observable currentScreen = 'HOME';

  navigateToHome = () => {
    this.currentScreen = 'HOME';
  };

  navigateToGameMenu = () => {
    this.currentScreen = 'GAMEMENU';
  };

  navigateToPlayground = () => {
    this.currentScreen = 'PLAYGROUND';
  };

  navigateToEndgame = () => {
    this.currentScreen = 'ENDGAME';
  };

  navigateToSelection = () => {
    this.currentScreen = 'SELECTION';
  };

  navigateToAbout = () => {
    this.currentScreen = 'ABOUT';
  };

  navigateToBadges = () => {
    this.currentScreen = 'BADGES';
  };

  navigateToSubscription = () => {
    this.currentScreen = 'SUBSCRIPTION';
  };
}

export default new RouterStore();