import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import match from 'react-router/lib/match';
import { Provider } from 'react-redux';
import { routes } from './client/app/routes';

import storeFactory from 'app/configureStore';

const initialState = window.__INITIAL_STATE__ || {};

const store = storeFactory(initialState);

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

render(
    <Provider store={store}>
        <Router children={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('app')
);
