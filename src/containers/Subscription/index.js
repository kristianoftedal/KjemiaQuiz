import React, { Component } from 'react';
import { StatusBar, Alert, Text, Linking, Platform, UIManager, LayoutAnimation, NativeModules } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
var InAppUtils = require('NativeModules').InAppUtils;

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
  purchaseMade: allStores.subscription.purchaseMade,
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
    InAppUtils.restorePurchases((error, response) => {
      if(error) {
         Alert.alert('itunes Error', 'Could not connect to itunes store.');
      } else {
         Alert.alert('Restore Successful', 'Successfully restores all your purchases.');
         
         if (response.length === 0) {
           Alert.alert('No Purchases', "We didn't find any purchases to restore.");
           return;
         }
   
         response.forEach((purchase) => {
           if (purchase.productIdentifier === 'com.xyz.abc') {
             // Handle purchased product.
           }
         });
      }
   });
  }

  _handleOnPurchase = async () => {
    this.setState({ loading: true });
    if (Platform.OS === 'ios') {
      InAppUtils.purchaseProduct(this.products[0], (error, response) => {
        debugger;
        this.setState({ loading: false });
        if (error) {
          Alert.alert('Feil!', error);
        }
        // NOTE for v3.0: User can cancel the payment which will be available as error object here.
        if(response && response.productIdentifier) {
          Alert.alert('Purchase Successful', 'Your Transaction ID is ' + response.transactionIdentifier);
          this.setState({ purchase: resposne });
          this.props.purchaseMade(response.transactionReceipt);
        }
      });
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
          <Text style={style.header}>Kjøp på fullversjonen av Naturfagsappen</Text>
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
                  {this.state.product.title}
                </Text>
                  <Text style={style.text}>
                    Abonner på premium for å sikre deg alle spørsmålene og ingen reklame
                  </Text>
                  <Text style={style.text}>
                    Pris: {this.state.product.priceString} / per mnd 
                  </Text>
                  <Text style={style.text}>
                    Fornyes automatisk hver måned
                  </Text>
                  <Text style={style.text}>
                    Betalingen vil bli belastet til iTunes-kontoen nå kjøpet bekreftes.
                    Abonnementet vil automatisk fornyes med mindre automatisk fornyelse skrues av minst 24 timer før
                    slutten av inneværende periode. Kontoen vil bli belastet innen for 24 timer av slutten på inneværende periode.
                    Abonnementet-innstillinger kan styres ved å gå inn på brukeres konto-innstillinger..
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
              {/* <Button style={style.button} onPressOut={this._handleOnRestore}>
                <Text style={style.buttonText}>Gjenopprett kjøp</Text>
               </Button> */}
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
