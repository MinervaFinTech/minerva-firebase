import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    apiKey: "AIzaSyDYXK1XqA1IeJZCFX7wUKfMPrf2_vw908E",
    authDomain: "minerva-ae094.firebaseapp.com",
    databaseURL: "https://minerva-ae094.firebaseio.com",
    projectId: "minerva-ae094",
    storageBucket: "minerva-ae094.appspot.com",
    messagingSenderId: "930386897254"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const loadFirebaseUI = function (domSelector, redirectURL) {
    var firebaseUIConfig = {
        signInSuccessUrl: redirectURL,
        signInOptions: [
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image', // 'audio'
                    size: 'normal', // 'invisible' or 'compact'
                    badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
                },
                defaultCountry: 'IN' // Set default country to the United Kingdom (+44).
            }
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebaseApp.auth());

    // The start method will wait until the DOM is loaded.
    ui.start(domSelector, firebaseUIConfig);
}