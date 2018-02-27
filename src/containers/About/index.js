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
export default class Endgame extends Component {
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
          <Text style={style.header}>Om kjemia</Text>
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
                  Kjemia er en utdanningsbedrift drevet av Carl-Joachim Isachsen (t.v.) og Håvard Ryan (t.h.) 
                  som spesialiserer seg på undervisning i Kjemi 1, Kjemi 2, Naturfag, Biologi 1 og Biologi 2.
                  Carl-Joachim og Håvard har tilsammen over ti års undervisningserfaring og er fungerende skriftlige og 
                  muntlige sensorer i Kjemi 1, Kjemi 2 og Naturfag. I 2017 ga de ut, i samarbeid med Fagbokforlaget, 
                  to eksamensoppgavehefter i Kjemi 1 og Kjemi 2 med hundrevis av eksamensrelevante oppgaver 
                  som kan fåes kjøpt her. Carl-Joachim og Håvard driver også én-til-én undervisning i Oslo-området.
                  Ytterligere informasjon om Kjemia finner du på vår hjemmeside.
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
