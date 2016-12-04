import React from 'react';
import { render } from 'react-dom';
import { Router, createRoutes, browserHistory } from 'react-router';
import match from 'react-router/lib/match';
import { Provider } from 'react-redux';
import rawRoutes from './client/app/routes';
import storeFactory from 'app/configureStore';
import { syncHistoryWithStore } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
const initialState = window.__INITIAL_STATE__ || {};
const store = storeFactory(initialState);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(rawRoutes);

browserHistory.listen(location => {
    match({ routes, location }, (error, redirectLocation, routeState) => {
        if (error) {
            // handle
            console.log(error);
        }

        if (!routeState) {
            // handle
        }
        // return routeState
    });
});
injectTapEventPlugin();
render(
    <Provider store={store}>
        <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('app')
);
