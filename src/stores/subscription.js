/**
 * IOS
 */
import { action, computed, observable } from 'mobx';
import { Platform, NativeModules, Alert } from 'react-native';
import iapReceiptValidator from 'iap-receipt-validator';
import { getReceipt, setReceipt } from '../services/subscriptionStorage';
import InAppBilling from "react-native-billing";

const { InAppUtils } = NativeModules
const password = 'ec294a7077574dea8f1bd66395171f0a'; // Shared Secret from iTunes connect
const production = true; // use sandbox or production url for validation
const validateReceipt = iapReceiptValidator(password, production);

export default class SubscriptionStore {
  @observable hasSubscription = false;
  @observable subscriptionId = null;

  @action
  init = async () => {
    if (Platform.OS === 'android') {
        await InAppBilling.close();
        await InAppBilling.open();
        await InAppBilling.loadOwnedPurchasesFromGoogle();
        this.hasSubscription = await InAppBilling.isSubscribed('no.kjemia.naturfagsappen.1');
        if (!this.hasSubscription) {
          InAppBilling.listOwnedSubscriptions().then(list => {
            this.hasSubscription = list.includes(this.products[0]);
          });
        }
        await InAppBilling.close();
    }
    if (Platform.OS === 'ios') {
      let receiptData = await getReceipt();
      let isValid = await this.validate(receiptData);
      this.hasSubscription = isValid;
      if (!isValid) {
        InAppUtils.receiptData(async (error, receiptResponse) => {
          if (error) {
            // Alert.alert('iTunes feil', 'Kvittering ikke funnet.');
          } else {
            this.hasSubscription = await this.validate(receiptResponse);
            setReceipt(receiptResponse);
          }
        });
      }
    } 
  }

  restore = async () => {
    if (Platform.OS === 'ios') {
      InAppUtils.restorePurchases((error, response) => {
        if(error) {
          Alert.alert('En feil har dessverre oppstått ', 'Vi fikk ikke kontakt med iTunes.');
        } else {
          if (response.length === 0) {
            Alert.alert('Ingen kvittering funnet', "Abonnement ikke gjenopprettet-");
            return;
          }
          response.forEach((purchase) => {
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
    if (Platform.OS === 'ios') {
      try {
          const validationData = await validateReceipt(receiptData);
          const kjemiaReceipts = validationData['latest_receipt_info'].filter(e = e => e.product_id === 'no.kjemia.naturfagsappen');
          const expiresDate = parseInt(kjemiaReceipts[kjemiaReceipts.length - 1].expires_date_ms);
          const date = new Date();
          result = expiresDate > date.getTime();
          return result;
      } catch(err) {
          console.log(err.valid, err.error, err.message);
          return false;
      }
    }
    if (Platform.OS === 'android') {
      const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(this.products[1]);
      this.props.purchaseMade(transactionStatus.purchaseState);
    }
  }
}
