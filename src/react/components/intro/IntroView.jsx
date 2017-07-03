
/** Header */

import React, { Component } from 'react';
import Minerva from "../../../assets/minerva.jpg";
import * as styles from "./IntroView.less";

import { firebaseApp, loadFirebaseUI } from '../base/FirebaseManager'

export class IntroView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        loadFirebaseUI('#firebaseui-auth-container','./dashboard');
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
