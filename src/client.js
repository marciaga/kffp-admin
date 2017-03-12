import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppRoutes from './client/app/routes';
import storeFactory from './client/app/configureStore';
import App from './client/app/components';

const history = createHistory();
const initialState = {};
const store = storeFactory(initialState, history);

injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App routes={<AppRoutes />} />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
