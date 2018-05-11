/**
 * IOS
 */
import { action, computed, observable } from 'mobx';
import { Platform, NativeModules, Alert } from 'react-native';
import iapReceiptValidator from 'iap-receipt-validator';
import { getReceipt, setReceipt } from '../services/subscriptionStorage';

const { InAppUtils } = NativeModules
const password = 'ec294a7077574dea8f1bd66395171f0a'; // Shared Secret from iTunes connect
const production = false; // use sandbox or production url for validation
const validateReceipt = iapReceiptValidator(password, production);

export default class SubscriptionStore {
  @observable hasSubscription = false;
  @observable subscriptionId = null;

  @action
  init = async () => {
    if (Platform.OS === 'android') {
      InAppBilling.isSubscribed('no.kjemia.naturfagsappen').then(isSubscribed => {
        this.hasSubscription = isSubscribed;
      });
    }
    if (Platform.OS === 'ios') {
      let receiptData = await getReceipt();
      let isValid = await this.validate(receiptData);
      this.hasSubscription = isValid;
      if (!isValid) {
        InAppUtils.receiptData((error, receiptResponse) => {
          if (error) {
            // Alert.alert('iTunes feil', 'Kvittering ikke funnet.');
          } else {
            isValid = this.validate(receiptResponse).then(isValid => {
              this.hasSubscription = isValid;
              if (!isValid) {
                // this.restore();
              } else {
                setReceipt(receiptResponse);
              }
            });
            //send to validation server
          }
        });
      }
      if (!receiptData) {
        // this.restore();
      }
    } else {

    }
  }

  restore = async () => {
    InAppUtils.restorePurchases((error, response) => {
      if(error) {
         Alert.alert('En feil har dessverre oppstått ', 'Vi fikk ikke kontakt med iTunes.');
      } else {
        if (response.length === 0) {
          Alert.alert('Ingen kvittering funnet', "Abonnement ikke gjenopprettet-");
          return;
        }
        response.forEach((purchase) => {
          debugger;
          if (purchase.productIdentifier === 'no.kjemia.naturfagsappen') {
            Alert.alert('Gjenopprettelse gikk fint', 'Vi har gjenopprettet dine kjøp.');
            // Handle purchased product.
            setReceipt(purchase.transactionReceipt);
            this.validate(purchase.transactionReceipt).then(isValid => {
              this.hasSubscription = isValid;
            });
          }
        });
      }
    });
  }

  @action
  purchaseMade = purchase => {
    this.hasSubscription = true;
    setReceipt(purchase);
  }

  @action
  restoreMade = purchase => {
    this.validate(receiptData).then((isValid) => {
      this.hasSubscription = isValid;
      setReceipt(purchase);
    });
  }

  async validate(receiptData) {
    try {
        const validationData = await validateReceipt(receiptData);
        // check if Auto-Renewable Subscription is still valid
        // validationData['latest_receipt_info'][0].expires_date > today
        const kjemiaReceipts = validationData['latest_receipt_info'].filter(e = e => e.product_id === 'no.kjemia.naturfagsappen');
        const expiresDate = Date.parse(kjemiaReceipts[kjemiaReceipts.length - 1].expires_date.replace('Etc/', ''));
        const date = new Date();
        const result = expiresDate > date.getTime();
        return result;
    } catch(err) {
        console.log(err.valid, err.error, err.message);
        return false;
    }
  }
}
