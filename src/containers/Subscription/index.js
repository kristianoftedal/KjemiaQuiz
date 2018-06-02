import React, { Component } from 'react';
import { StatusBar, Alert, Text, Linking, Platform, UIManager, LayoutAnimation, NativeModules } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';

import InAppBilling from "react-native-billing";
const InAppUtils = require('NativeModules').InAppUtils;

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
  purchaseMade: allStores.subscription.purchaseMade,
  restore: allStores.subscription.restore,
}))

@observer
export default class Subscription extends Component {
  _headerRef;
  _bodyRef;

  products = [
    'no.kjemia.naturfagsappen',
    'no.kjemia.naturfagsappen.1',
  ];

  constructor(props) {
    super(props);
    this.state = {
      product: null,
      hasHeaderAppeared: false,
      hasPressedButton: false,
      loading: false,
      purchase: null,
      hasError: false,
    }
  }

  componentDidMount() {
    if (this._headerRef) {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
    }
    
    if (Platform.OS === 'ios') {
      InAppUtils.loadProducts(this.products, (error, products) => {
        this.setState({ product: products[0] });
      });      
    } else if (Platform.OS === 'android') {
      InAppBilling.open().then(() => 
        InAppBilling.getSubscriptionDetails(this.products[1]).then(
          (product) =>  this.setState({ product })));
    }
  }

  _handleBackPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToHome();
  };

  _handleOnRestore = async () => {
    this.setState({ loading: true });
    if (Platform.OS === 'ios') {
      await this.props.restore();
      this.setState({ loading: false });
    }
  }

  _termsOfUseClicked = () => {
    Linking.openURL('http://kjemia.no/termsofuse');
  }
  _privacyPolicyClicked = () => {
    Linking.openURL('http://kjemia.no/privacypolicy');
  }

  _handleOnPurchase = async () => {
    this.setState({ loading: true });
    if (Platform.OS === 'ios') {
      InAppUtils.purchaseProduct(this.products[0], (error, response) => {
        this.setState({ loading: false });
        if (error) {
          this.setState({ hasError: true });
          Alert.alert('En feil ved kjøp har oppstått', error);
        }
        if(response && response.productIdentifier) {
          this.setState({ purchase: response });
          this.props.purchaseMade(response.transactionReceipt);
        }
      });
    }
    if (Platform.OS === 'android') {
      // To be sure the service is close before opening it
      await InAppBilling.close();
      try {
        this.setState({ loading: false });
        await InAppBilling.open();
        const isSubscribed = await InAppBilling.isSubscribed(this.products[1]);
        if (!isSubscribed) {
          const details = await InAppBilling.subscribe(this.products[1]);
          const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(this.products[1]);
          this.props.purchaseMade(transactionStatus);
        }
      } catch (err) {
        this.setState({hasError: true});
        Alert.alert('En feil ved kjøp har oppstått', err);
      } finally {
        await InAppBilling.close();
      }
    }
  };

  render() {
    const { hasHeaderAppeared } = this.state;
    return (
      <View style={style.body}>
        <StatusBar hidden={true} />
        <View
          ref={ref => {
            this._headerRef = ref;
          }}
        >
          <Text style={style.header}>Abonner på premium-utgaven av Naturfagsappen!</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
            { this.state.product && !this.state.loading &&
              <View style={style.textPart}>
                <Text style={style.text}>
                  Abonner på premium for å sikre deg alle 1500 spørsmålene og ingen reklame. Gratisversjonen inneholder kun 10% av spørsmålene.
                </Text>
                <Text style={style.textPayment}>
                  Pris: 39 / per mnd 
                </Text>
                <Text style={style.textPayment}>
                  Fornyes automatisk hver måned
                </Text>
                <Text style={style.textPayment}>
                  Betalingen vil bli belastet til iTunes-kontoen når kjøpet bekreftes.
                  Avtalen vil automatisk fornyes med mindre automatisk fornyelse skrues av minst 24 timer før
                  slutten av inneværende periode. Kontoen vil bli belastet innenfor 24 timer av slutten på inneværende periode.
                  Abonnement kan styres av brukeren og automatisk fornyelse kan bli slått av ved gå til brukeres kontoinnstillinger etter kjøp.
                  Enhver ubrukt del av gratisversjonen vil du miste når du går over til abonnementversjonen. Hvis du avslutter ditt abonnement vil du fortsatt kunne bruke gratisversjonen av appen. 
                </Text>
              </View>
            }
            { this.state.loading &&
              <View style={style.textPart}>
                <Text style={style.text}>
                  Kontakter {Platform.OS === 'android' ? 'Play Store' : 'iTunes' }...
                </Text>
              </View>
            }
            { !this.state.loading && 
              <View>
                <Button style={style.button} onPressOut={this._handleOnPurchase}>
                  <Text style={style.buttonText}>Kjøp</Text>
                </Button>
                {
                  this.state.hasError &&
                    <Button style={style.button} onPressOut={this._handleOnRestore}>
                      <Text style={style.buttonText}>Gjenopprett et tidligere kjøp</Text>
                   </Button>
                }
                <Button style={style.button} onPressOut={this._termsOfUseClicked}>
                  <Text style={style.buttonText}>Vilkår for bruk</Text>
                </Button>
                <Button style={style.button} onPressOut={this._privacyPolicyClicked}>
                  <Text style={style.buttonText}>Personvernserklæring</Text>
                </Button>
              </View>
            }
            <Button style={style.button} onPressOut={this._handleBackPress}>
              <Text style={style.buttonText}>Tilbake til start</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}
