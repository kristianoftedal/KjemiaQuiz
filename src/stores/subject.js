/**
 * A super-simple MobX routing solution.
 */
import { observable, action} from 'mobx';
import { NATURFAG, KJEMI1, KJEMI2, S1, ONET, GEO, FYSIKK1 } from './constants';
import titleProvider from '../config/titleProvider';
import levelProvider from '../config/levelProvider';
import getProduct from '../config/productProvider';
import getCategories from '../questions/categoryHelper';
import getImages from '../questions/imageHelper';
import { getQuestions, getFreeQuestions } from '../questions/questionHelper';

class SubjectStore {
  @observable subject = NATURFAG;
  @observable levels = null;
  @observable freeQuestions = null;
  @observable questions = null;
  @observable questionImages = null;
  @observable categories = null;
  @observable product = null;
  @observable images = null;
  @observable title = "";

  @action
  getProduct = () => {
    return this.product;
  }

  @action
  getLevels = () => {
    return this.levels;
  }

  @action
  getFreeQuestions = () => {
    return this.freeQuestions;
  }

  @action
  getCurrentTitle = () => {
    return this.title;
  }

  selectSubject = (subject) => {
    this.subject = subject;
    this.levels = levelProvider(subject);
    this.freeQuestions = getFreeQuestions(subject);
    this.questions = getQuestions(subject);
    this.product = getProduct(subject);
    this.categories = getCategories(subject);
    this.images = getImages(subject);
    this.title = titleProvider(subject);
  };
}

const subjectStore = new SubjectStore();
export default subjectStore;
