import React, { Component } from 'react';
import { StatusBar, Alert, Text, Linking, Platform, UIManager, LayoutAnimation, NativeModules } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
const InAppBilling = require("react-native-billing");
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
        // update store here.
      });      
    } else if (Platform.OS === 'android') {
      InAppBilling.getSubscriptionDetails(this.products[0]).then()
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
    Linking.openURL('http://kjemia.no/privacy');
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
          Alert.alert('Vi kan herved bekreftet at ditt abonnement har startet :)', '');
          this.setState({ purchase: response });
          this.props.purchaseMade(response.transactionReceipt);
        }
      });
    }
    if (Platform.OS === 'android') {
      // To be sure the service is close before opening it
      await InAppBilling.close();
      try {
        await InAppBilling.open();
        if (!await InAppBilling.isSubscribed(this.products[0])) {
          const details = await InAppBilling.subscribe(productId);
          console.log('You purchased: ', details);
        }
        const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId);
        const productDetails = await InAppBilling.getProductDetails(productId);
        console.log(productDetails);
      } catch (err) {
        console.log(err);
        this.setState({hasError: true});
      } finally {
        await InAppBilling.consumePurchase(productId);
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
                  Price: {this.state.product.priceString} / per mnd 
                </Text>
                <Text style={style.textPayment}>
                  Fornyes automatisk hver måned
                </Text>
                <Text style={style.textPayment}>
                  Betalingen vil bli belastet til iTunes-kontoen når kjøpet bekreftes.
                  Avtalen vil automatisk fornyes med mindre automatisk fornyelse skrues av minst 24 timer før
                  slutten av inneværende periode. Kontoen vil bli belastet innenfor 24 timer av slutten på inneværende periode.
                  Abonnement kan styres av brukeren og automatisk fornyelse kan bli slått av ved gå til brukeres kontoinnstillinger etter kjøp.
                </Text>
              </View>
            }
            { this.state.loading &&
              <View style={style.textPart}>
                <Text style={style.text}>
                  Kontakter iTunes...
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
                  <Text style={style.buttonText}>Personvernserlæring</Text>
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
