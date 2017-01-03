import React from 'react';
import { render } from 'react-dom';
import { Router, createRoutes, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import rawRoutes from './client/app/routes';
import storeFactory from 'app/configureStore';
import injectTapEventPlugin from 'react-tap-event-plugin';
const initialState = {};
const store = storeFactory(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(rawRoutes);

injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
