
import React from 'react';

import { Router, Route, Switch } from 'react-router';

import { IntroView } from '../intro/IntroView.jsx';
import { ErrorView } from '../error/ErrorView.jsx';
import { DashboardView } from '../dashboard/DashboardView.jsx';

export let routes = (
    <Switch>
        <Route exact path="/" component={IntroView} />
        <Route path="/dashboard" component={DashboardView} />
        <Route path="*" component={ErrorView} />
    </Switch>
)