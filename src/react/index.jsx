
// ./src/index.jsx
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { BaseView } from './components/base/BaseView.jsx';


render(
    <BrowserRouter>
        <BaseView />
    </BrowserRouter>,
    document.getElementById('bodyWrapper')
);