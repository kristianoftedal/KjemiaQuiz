import React, { Component } from 'react';
import { StatusBar, Image, Text, Linking, } from 'react-native';
import { View } from 'react-native-animatable';
import { inject, observer } from 'mobx-react/native';
import Button from 'apsl-react-native-button';
import style from './index.style';
import about from '../../images/about.png'
import questionParser from '../../components/QuestionWrapper/questionParser';
import answerParser from '../../components/Tile/answerParser';

@inject(allStores => ({
  navigateToHome: allStores.router.navigateToHome,
}))

@observer
export default class ChemForm extends Component {

  _handleBackPress = async () => {
    this.props.navigateToHome();
  };

  printQuestion(question) {
    if (question.indexOf('*') > -1) {
      return questionParser(question);
    }
    return question;
  }

  printAnswer(answer) {
    if (question.indexOf('*') > -1) {
      return answerParser(answer);
    }
    return answer;
  }

  render() {
    return (
    <View style={style.body}>
        <View
          style={style.container}
          ref={ref => {
            this._bodyRef = ref;
          }}
        >
        <View style={style.textPart}>
          <View>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            {this.printQuestion('hva er srsdfs blabla bla?')}
          </View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              {this.printQuestion('hva er → *SO_4|^2-| * blabla bla?')}
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              {this.printQuestion('hva er *NO_3|* blabla bla?')}
            </View>
          </View>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
              {this.printQuestion('hva er *Cr_2|O_7|^2-|* blabla bla?')}
            </View>
          </View><View>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            {this.printQuestion('A) *SO_4|^2-|*')}
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            {this.printQuestion('B) *NO_3|* ')}
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
            {this.printQuestion('C) *Cr_2|O_7|^2-|*')}
          </View>
        </View>
        </View>
        <Button style={style.button} onPressOut={this._handleBackPress}>
          <Text style={style.buttonText}>Tilbake til start</Text>
        </Button>
      </View>
    </View>
    );
  }
}
