/**
 * A super-simple MobX routing solution.
 */
import { observable } from 'mobx';
import 



export default class RouterStore {
  @observable topic = 'NATURFAG';
  @observable levels = null;
  @observable freeQuestions = null;
  @observable questions = null;
  @observable hasSubscription = null;
  @observable questionImages = null;
  @observable categories = null;

  naturfagSelected = () => {
    this.currentScreen = 'HOME';
  };

  kjemi1Selected = () => {
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
  }

  navigateToChemForm = () => {
    this.currentScreen = 'CHEMFORM';
  };

  navigateToSubscription = () => {
    this.currentScreen = 'SUBSCRIPTION';
  };
}
