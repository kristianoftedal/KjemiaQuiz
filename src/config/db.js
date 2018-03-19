import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBCSbMVM4PbAKKDDqAs5Sx0reEgqLh8Q9Y',
  authDomain: 'kjema-fda24.firebaseapp.com',
  databaseURL: 'https://kjema-fda24.firebaseio.com',
  projectId: 'kjema-fda24',
  storageBucket: 'kjema-fda24.appspot.com',
  messagingSenderId: '730985198123',
};

firebase.initializeApp(config);

export default firebase;
