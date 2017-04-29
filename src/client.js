import React from 'react';
import { render } from 'react-dom';
import { Router, createRoutes, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import rawRoutes from './client/app/routes';
import storeFactory from './client/app/configureStore';

const initialState = {};
const store = storeFactory(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(rawRoutes);
const { NODE_ENV } = process.env;

if (window.Raven && (NODE_ENV === 'production' || NODE_ENV === 'staging')) {
    window.Raven.config('https://95f24e80429249a79b2e844e0a21bf72@sentry.io/160847').install();
}

injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
