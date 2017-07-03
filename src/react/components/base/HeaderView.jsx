
/** Header */

import React, { Component } from 'react';
import * as styles from "./HeaderView.less";

export class HeaderView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <header id="header" className={styles.header}>
            <div id="headerContainer" className={styles.headerContainer}>
                <div id="logoWrapper" className={styles.logoWrapper}>
                    <span className={styles.logoText}>{this.props.headerTitle}</span>
                </div>
            </div>
        </header>
        )
    }
}
