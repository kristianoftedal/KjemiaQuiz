import { NATURFAG, KJEMI1, KJEMI2, S1, ONET, GEO, FYSIKK1, R1, ONEP } from '../stores/constants';
import naturfagCategories from './naturfag/categories';
import kjemi1Categories from './kjemi1/categories';
import kjemi2Categories from './kjemi2/categories';
import fysikk1Categories from './fysikk1/categories';
import oneTCategories from './1t/categories';
import s1Categories from './s1/categories';
import geografiCategories from './geografi/categories';
import onePCategories from './1p/categories';
import r1Categories from './1t/categories';

export default getCategories = (subject) => {
  if (subject === NATURFAG) {
    return naturfagCategories;
  }
  if (subject === KJEMI1) {
    return kjemi1Categories;
  }
  if (subject === KJEMI2) {
    return kjemi2Categories;
  }
  if (subject === FYSIKK1) {
    return fysikk1Categories;
  }
  if (subject === ONET) {
    return oneTCategories;
  }
  if (subject === S1) {
    return s1Categories;
  }
  if (subject === GEO) {
    return geografiCategories;
  }
  if (subject === ONEP) {
    return onePCategories;
  }
  if (subject === R1) {
    return r1Categories;
  }
  return naturfagCategories;
};
