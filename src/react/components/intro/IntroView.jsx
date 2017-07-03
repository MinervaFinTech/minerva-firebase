
/** Header */

import React, { Component } from 'react';
import Minerva from "../../../assets/minerva.jpg";
import * as styles from "./IntroView.less";

import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import { firebaseApp } from '../base/FirebaseManager'

export class IntroView extends Component {
    constructor(props) {
        super(props);
        console.log('the great firebase = ' + firebase);
    }
    componentDidMount() {

        var uiConfig = {
            signInSuccessUrl: './dashboard',
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
