
/** The Base View */
/** This view wraps the Header and the Main Views */

import React, { Component } from 'react';

import { HeaderView } from './HeaderView.jsx';
import { routes } from './Routes.jsx';

import * as styles from "./BaseView.less";

var BaseViewInitialState = {
    headerTitle: "Minerva"
}

export class BaseView extends Component {
    constructor(props) {
        super(props);
        this.state = BaseViewInitialState
    }

    render() {
        return (
            <div id="bodyContainer" className={styles.bodyContainer}>

                <div id="headerWrapper" className={styles.headerWrapper}>
                    {/* Header Section Begins */ }
                    <HeaderView headerTitle={this.state.headerTitle}/>
                    {/* Header Section Ends */ }
                </div>

                <div id="mainWrapper" className={styles.mainWrapper}>
                    <main id="main" className={styles.main}>
                        <div id="mainContainer" className={styles.mainContainer}>
                            {routes}
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}
