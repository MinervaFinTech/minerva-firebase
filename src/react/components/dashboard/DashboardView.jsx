
/** Header */

import React, { Component } from 'react';
import Minerva from "../../../assets/minerva.jpg";
import * as styles from "./DashboardView.less";

import { firebaseApp } from "../base/FirebaseManager";

export class DashboardView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        firebaseApp.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;
                user.getToken().then(function (accessToken) {
                    document.getElementById('introContentInfo').textContent = JSON.stringify({
                        phoneNumber: phoneNumber,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
                });
                firebaseApp.database().ref('/loginData/' + uid).once('value').then(function (snapshot) {
                    document.getElementById('introContentLogin').textContent = JSON.stringify(snapshot.val());
                });
            } else {
                // User is signed out.
                document.getElementById('introContentInfo').textContent = 'Not Logged In';
            }
        }, function (error) {
            console.log(error);
        });
    }
    render() {
        return (
            <div id="introContainer" className={styles.introContainer}>
                <div id="introHeading" className={styles.introHeading}>
                    <div id="introHeadingMain" className={styles.introHeadingMain}>Dashboard</div>
                    <div id="introHeadingCaption" className={styles.introHeadingCaption}>Welcome</div>
                </div>
                <div id="introContent" className={styles.introContent}>
                    <div id="introContentLogin" className={styles.introContentLogin}>
                        Web Dashboard<br />
                        Coming Soon!
                    </div>
                    <div id="introContentTinImage" className={styles.introContentTinImage}>
                        <div className={styles.tinImgWrapper}>
                            <img className={styles.tinImg} src={Minerva} />
                        </div>
                    </div>
                    <div id="introContentInfo" className={styles.introContentInfo}>
                        Mobile Apps<br />
                        Coming Soon!
                    </div>
                </div>
            </div>
        )
    }
}
