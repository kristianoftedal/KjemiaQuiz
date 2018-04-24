/**
 * IOS
 */
import { action, computed, observable } from 'mobx';
import { Platform, NativeModules, Alert } from 'react-native';
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
    getSubscription().then((receiptData) => {
      if (Platform.OS === 'ios') {
        this.validate(receiptData).then((isValid) => {
          this.hasSubscription = isValid;
          if (!isValid) {
            InAppUtils.receiptData((error, receiptData)=> {
              if(error) {
                Alert.alert('itunes Error', 'Receipt not found.');
              } else {
                this.validate(receiptData).then((isValid) => {
                  this.hasSubscription = isValid;
                  if (!isValid) {
                    // this.restore();
                  }
                });
                //send to validation server
              }
            });
          }
        });
        
        if (!subscription) {
          // this.restore();
        }
      }
    })
  }

  restore = () => {
    InAppUtils.restorePurchases((error, response) => {
      if(error) {
         Alert.alert('itunes Error', 'Could not connect to itunes store.');
      } else {
        debugger;
         Alert.alert('Restore Successful', 'Successfully restores all your purchases.');
         this.hasSubscription = true;
         if (response.length === 0) {
           Alert.alert('No Purchases', "We didn't find any purchases to restore.");
           return;
         }
         response.forEach((purchase) => {
           debugger;
           if (purchase.productIdentifier === 'no.kjemia.naturfagsappen') {
             // Handle purchased product.
             setSubscription(purchase);
           }
         });
      }
    });
  }

  @action
  purchaseMade = purchase => {
    this.hasSubscription = true;
    setSubscription(purchase);
  }

  async validate(receiptData) {
    try {
        const validationData = await validateReceipt(receiptData);
        // check if Auto-Renewable Subscription is still valid
        // validationData['latest_receipt_info'][0].expires_date > today
        debugger;
        return validationData['latest_receipt_info'][0].expires_date > today;
    } catch(err) {
        console.log(err.valid, err.error, err.message);
        return false;
    }
  }

  @computed
  get currentLevel() {
    return levels[this.currentLevelIndex];
  }
}
