import firebase from 'react-native-firebase';


const db = firebase.database();
const questionList = [];
db.ref('/naturfagQuestions').once('value').then(snapshot => {
  questionList = snapshot.val();
});

export default questionList;
