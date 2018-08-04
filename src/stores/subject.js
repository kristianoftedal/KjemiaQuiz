/**
 * A super-simple MobX routing solution.
 */
import { observable, action} from 'mobx';
import { NATURFAG, KJEMI1, KJEMI2, S1, ONET, GEO, FYSIKK1 } from './constants';
import getLevels from '../config/levelProvider';
import getProduct from '../config/productProvider';
import getCategories from '../questions/categoryHelper';
import getImages from '../questions/imageHelper';
import { getQuestions, getFreeQuestions } from '../questions/questionHelper';

export default class RouterStore {
  @observable subject = NATURFAG;
  @observable levels = null;
  @observable freeQuestions = null;
  @observable questions = null;
  @observable questionImages = null;
  @observable categories = null;
  @observable product = null;
  @observable images = null;

  @action
  getProduct = () => {
    return this.product;
  }

  @action
  getLevels = () => {
    return this.levels;
  }

  @action
  getQuestions = () => {
    return this.questions;
  }

  @action
  getFreeQuestions = () => {
    return this.freeQuestions;
  }

  selectSubject = (subject) => {
    this.subject = subject;
    this.levels = getLevels(subject);
    this.freeQuestions = getFreeQuestions(subject);
    this.questions = getQuestions(subject);
    this.product = getProduct(subject);
    this.categories = getCategories(subject);
    this.images = getImages(subject);
  };
}
