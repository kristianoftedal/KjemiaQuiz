import React, { Component } from 'react';
import { StatusBar, Image, Text, Linking, Platform, UIManager, LayoutAnimation } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
import about from '../../images/about.png'

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
}))

@observer
export default class About extends Component {
  _headerRef;
  _bodyRef;

  state = {
    hasHeaderAppeared: false,
    hasPressedButton: false,
  };

  componentDidMount() {
    if (this._headerRef) {
        LayoutAnimation.spring();
        this.setState({ hasHeaderAppeared: true });
    }
  }

  _handleBackPress = async () => {
    this.setState({ hasPressedButton: true }); // Prevents button presses while animating to the new screen
    if (this._headerRef && this._bodyRef) {
      await Promise.all([this._headerRef.fadeOutLeft(400), this._bodyRef.fadeOutRight(400)]);
    }
    this.props.navigateToHome();
  };

  _handleOpenKjemia = async () => {
    Linking.openURL('http://kjemia.no');
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
          <Text style={style.header}>Om Kjemia</Text>
        </View>
        {hasHeaderAppeared && (
          <View
            style={style.container}
            ref={ref => {
              this._bodyRef = ref;
            }}
          >
          <View style={style.imageWrapper}>
            <Image source={about} style={style.image} />
          </View>
            <View style={style.textPart}>
              <View>
                <Text style={style.text}>
                  Kjemia er en bedrift drevet av Carl-Joachim Isachsen og Håvard Ryan som spesialiserer seg på undervisning i Naturfag, Kjemi 1, Kjemi 2, Biologi 1, Biologi 2 og alle mattefagene.
                  Kjemia har over ti års erfaring og er sensorer i alle fagene. 
                </Text>
                <Text style={style.text}>
                  I 2017 ga Kjemia ut oppgaveheftene Kjemia 1 og Kjemia 2, sammen med Fagbokforlaget. Ytterligere informasjon om Kjemia og våre produkter finner du på vår hjemmeside.
                </Text>
              </View>
            </View>
            <Button style={style.button} onPressOut={this._handleOpenKjemia}>
              <Text style={style.buttonText}>Kjemia.no</Text>
            </Button>
            <Button style={style.button} onPressOut={this._handleBackPress}>
              <Text style={style.buttonText}>Tilbake til start</Text>
            </Button>
          </View>
        )}
      </View>
    );
  }
}
