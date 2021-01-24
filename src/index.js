import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
// Redux > add provider for redux, then import createStore method to well create store
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Redux > import reducer, then create store with createStore method and pass the reducer to it
import reducer from './store/reducer';

const store = createStore(reducer);

const app = (
    // set the store property to pass it
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
