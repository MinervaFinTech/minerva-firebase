
/** Header */

import React, { Component } from 'react';
import Minerva from "../../../assets/minerva.jpg";
import * as styles from "./ErrorView.less";

export class ErrorView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div id="introContainer" className={styles.introContainer}>
            <div id="introHeading" className={styles.introHeading}>
                <div id="introHeadingMain" className={styles.introHeadingMain}>Error</div>
                <div id="introHeadingCaption" className={styles.introHeadingCaption}>Not Found</div>
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
