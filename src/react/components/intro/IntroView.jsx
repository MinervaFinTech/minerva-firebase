
/** Header */

import React, { Component } from 'react';
import Minerva from "../../../assets/minerva.jpg";
import * as styles from "./IntroView.less";


import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

export class IntroView extends Component {
    constructor(props) {
        super(props);
        console.log('the great firebase = '+firebase);
    }
    componentDidMount() {
        var config = {
            apiKey: "AIzaSyDYXK1XqA1IeJZCFX7wUKfMPrf2_vw908E",
            authDomain: "minerva-ae094.firebaseapp.com",
            databaseURL: "https://minerva-ae094.firebaseio.com",
            projectId: "minerva-ae094",
            storageBucket: "minerva-ae094.appspot.com",
            messagingSenderId: "930386897254"
        };
        console.log('the great firebase = '+firebase);
        var firebaseApp = firebase.initializeApp(config);
        var uiConfig = {
            signInSuccessUrl: './dashboard',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };

        // Initialize the FirebaseUI Widget using Firebase.
        var ui = new firebaseui.auth.AuthUI(firebaseApp.auth());
        
        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
    }
    render() {

        return (
        <div id="introContainer" className={styles.introContainer}>
            <div id="introHeading" className={styles.introHeading}>
                <div id="introHeadingMain" className={styles.introHeadingMain}>Stock Trade Monitor</div>
                <div id="introHeadingCaption" className={styles.introHeadingCaption}>make informed decisions</div>
            </div>
            <div id="introContent" className={styles.introContent}>
                <div id="introContentLogin" className={styles.introContentLogin}>
                    <div id="firebaseui-auth-container"></div>
                </div>
                <div id="introContentTinImage" className={styles.introContentTinImage}>
                    <div className={styles.tinImgWrapper}>
                        <img className={styles.tinImg} src={Minerva} />
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
