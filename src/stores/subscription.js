/**
 * IOS
 */
import { action, computed, observable } from 'mobx';
import { Platform, NativeModules } from 'react-native';
import iapReceiptValidator from 'iap-receipt-validator';
import { getSubscription, setSubscription } from '../services/subscriptionStorage';

const { InAppUtils } = NativeModules
const password = 'ec294a7077574dea8f1bd66395171f0a'; // Shared Secret from iTunes connect
const production = false; // use sandbox or production url for validation
const validateReceipt = iapReceiptValidator(password, production);

export default class SubscriptionStore {
  @observable hasSubscription = false;
  @observable subscriptionId = null;

  @action
  init = () => {
    getSubscription().then((subscription) => {
      debugger;
      if (Platform.OS === 'ios') {
        InAppUtils.receiptData((error, receiptData)=> {
          if(error) {
            Alert.alert('itunes Error', 'Receipt not found.');
          } else {
            //send to validation server
          }
        });

      }
    })
  }

  @action
  purchaseMade = purchase => {
    setSubscription(purchase);
  }

  async validate(receiptData) {
    try {
        const validationData = await validateReceipt(receiptData);
        // check if Auto-Renewable Subscription is still valid
        // validationData['latest_receipt_info'][0].expires_date > today
        this.hasSubscription = validationData['latest_receipt_info'][0].expires_date > today;
    } catch(err) {
        console.log(err.valid, err.error, err.message)
    }
  }

  @computed
  get currentLevel() {
    return levels[this.currentLevelIndex];
  }
}
