/**
 * IOS
 */
import { observable } from 'mobx';

export default class SubscriptionStore {
  @observable hasSubscription = true;
  @observable subscriptionId = null;
}
