
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDYXK1XqA1IeJZCFX7wUKfMPrf2_vw908E",
    authDomain: "minerva-ae094.firebaseapp.com",
    databaseURL: "https://minerva-ae094.firebaseio.com",
    projectId: "minerva-ae094",
    storageBucket: "minerva-ae094.appspot.com",
    messagingSenderId: "930386897254"
};
export const firebaseApp = firebase.initializeApp(config);